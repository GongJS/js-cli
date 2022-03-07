import fs from 'fs';
import path from 'path';
import simpleGit, { SimpleGit, StatusResult } from 'simple-git';
import fse from 'fs-extra';
import userHome from 'user-home';
import inquirer from 'inquirer';
import semver from 'semver';
import Listr from 'listr'
import { Observable } from 'rxjs';
import { readFile, writeFile, spinnerStart, log, request, SERVER } from '@js-cli/utils';
import CloudBuild from '@js-cli/cloudbuild';
import Github from './Github';
import Gitee from './Gitee';
import { createComponent } from './ComponentRequest'

interface OssTemplateFileType {
  data: any
  code: number,
  url: string
}

const DEFAULT_CLI_HOME = '.js-cli';
const GIT_ROOT_DIR = '.git';
const GIT_SERVER_FILE = '.git_server';
const GIT_TOKEN_FILE = '.git_token';
const GIT_OWN_FILE = '.git_own';
const GIT_LOGIN_FILE = '.git_login';
const GIT_IGNORE_FILE = '.gitignore';
const GIT_PUBLISH_FILE = '.git_publish';
const GITHUB = 'github';
const GITEE = 'gitee';
const COMPONENT_FILE = '.componentrc';
const REPO_OWNER_USER = 'user';
const REPO_OWNER_ORG = 'org';
const VERSION_RELEASE = 'release';
const VERSION_DEVELOP = 'dev';
const TEMPLATE_TEMP_DIR = 'oss';

const GIT_SERVER_TYPE = [{
  name: 'Github',
  value: GITHUB,
}, {
  name: 'Gitee',
  value: GITEE,
}];

const GIT_OWNER_TYPE = [{
  name: '个人',
  value: REPO_OWNER_USER,
}, {
  name: '组织',
  value: REPO_OWNER_ORG,
}];

const GIT_OWNER_TYPE_ONLY = [{
  name: '个人',
  value: REPO_OWNER_USER,
}];

const GIT_PUBLISH_TYPE = [{
  name: 'OSS',
  value: 'oss',
}];

class Git {
  public name: string; // 项目名称
  public version: string; // 项目版本
  public dir: string; // 源码目录
  public git: SimpleGit; // SimpleGit实例
  public gitServer!: any // GitServer实例
  public homePath!: string // 本地缓存目录
  public user!: any // 用户信息
  public orgs!: any[] // 用户所属组织列表
  public owner!: string // 远程仓库类型
  public login!: string // 远程仓库登录名
  public repo!: string // 远程仓库信息
  public refreshServer!: boolean // 是否强制刷新远程仓库
  public refreshToken!: boolean // 是否强化刷新远程仓库token
  public refreshOwner!: boolean // 是否强化刷新远程仓库类型
  public branch!: string // 本地开发分支
  public remote!: string // 远程分支
  public token!: string // github token
  public buildCmd: string // 构建命令
  public gitPublish!: string // 静态资源服务器类型
  public prod: boolean // 是否正式发布
  public sshUser: string
  public sshIp: string
  public sshPath: string
  constructor({ name, version, dir }: {name: string, version: string, dir: string }, {
    refreshServer = false,
    refreshToken = false,
    refreshOwner = false,
    buildCmd = '',
    prod = false,
    sshUser = '',
    sshIp = '',
    sshPath = ''
  }) {
    if (name.startsWith('@') && name.indexOf('/') > 0) {
      // @js-cli-dev/component -> js-cli-dev_component
      const nameArray = name.split('/');
      this.name = nameArray.join('_').replace('@', '');
    } else {
      this.name = name; // 项目名称
    }
    this.version = version;
    this.dir = dir; // 源码目录
    this.git = simpleGit(dir);
    this.refreshServer = refreshServer;
    this.refreshToken = refreshToken;
    this.refreshOwner = refreshOwner;
    this.buildCmd = buildCmd
    this.prod = prod; // 是否正式发布
    this.sshUser = sshUser;
    this.sshIp = sshIp;
    this.sshPath = sshPath;
  }
  async publish() {
    let ret = false;
    if (this.isComponent()) {
      log.info('', '开始发布组件');
      ret = await this.saveComponentToDB();
    } else {
      await this.preparePublish();
      const cloudBuild = new CloudBuild(this, {
        buildCmd: this.buildCmd,
        type: this.gitPublish,
        prod: this.prod,
      });
      await cloudBuild.prepare();
      await cloudBuild.init();
      ret = await cloudBuild.build() as boolean;
      if (ret) {
        await this.uploadTemplate();
      }
    }
    if (this.prod && ret) {
      await this.uploadComponentToNpm();
      this.runCreateTagTask();
    }
    log.success('物料发布至物料平台完成', `请访问: ${SERVER.materialPlatformUrl}`)
  }
  isComponent() {
    const componentFilePath = path.resolve(this.dir, COMPONENT_FILE);
    return fs.existsSync(componentFilePath) && fse.readJsonSync(componentFilePath);
  }
  // 自动生成远程仓库分支
  runCreateTagTask() {
    const delay = (fn: Function) => setTimeout(fn, 1000);
    const tasks = new Listr([
      {
        title: '自动生成远程仓库Tag',
        task: () => new Listr([{
          title: '创建Tag',
          task: () => {
            return new Observable(o => {
              o.next('正在创建Tag');
              delay(() => {
                this.checkTag().then(() => {
                  o.complete();
                });
              });
            }) as any;
          },
        },
          {
            title: '切换分支到master',
            task: () => {
              return new Observable(o => {
                o.next('正在切换master分支');
                delay(() => {
                  this.checkoutBranch('master').then(() => {
                    o.complete();
                  });
                });
              });
            },
          },
          {
            title: '将开发分支代码合并到master',
            task: () => {
              return new Observable(o => {
                o.next('正在合并到master分支');
                delay(() => {
                  this.mergeBranchToMaster(this.branch).then(() => {
                    o.complete();
                  });
                });
              });
            },
          },
          {
            title: '将代码推送到远程master',
            task: () => {
              return new Observable(o => {
                o.next('正在推送master分支');
                delay(() => {
                  this.pushRemoteRepo('master').then(() => {
                    o.complete();
                  });
                });
              });
            },
          },
          {
            title: '删除本地开发分支',
            task: () => {
              return new Observable(o => {
                o.next('正在删除本地开发分支');
                delay(() => {
                  this.deleteLocalBranch().then(() => {
                    o.complete();
                  });
                });
              });
            },
          },
          {
            title: '删除远程开发分支',
            task: () => {
              return new Observable(o => {
                o.next('正在删除远程开发分支');
                delay(() => {
                  this.deleteRemoteBranch().then(() => {
                    o.complete();
                  });
                });
              });
            },
          },
        ]),
      }]);

    tasks.run();
  }
  getPackageJson() {
    const pkgPath = path.resolve(this.dir, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      throw new Error(`package.json 不存在！源码目录：${this.dir}`);
    }
    return fse.readJsonSync(pkgPath);
  }

  async preparePublish() {
    log.info('', '开始进行云构建前代码检查');
    const pkg = this.getPackageJson();
    if (this.buildCmd) {
      const buildCmdArray = this.buildCmd.split(' ');
      if (buildCmdArray[0] !== 'npm' && buildCmdArray[0] !== 'cnpm' && buildCmdArray[0] !== 'yarn') {
        throw new Error('Build命令非法，必须使用npm或cnpm！');
      }
    } else {
      this.buildCmd = 'npm run build';
    }
    const buildCmdArray = this.buildCmd.split(' ');
    const lastCmd = buildCmdArray[buildCmdArray.length - 1];
    if (!pkg.scripts || !Object.keys(pkg.scripts).includes(lastCmd)) {
      throw new Error(this.buildCmd + '命令不存在！');
    }
    log.success('代码预检查通过');
    const gitPublishPath = this.createPath(GIT_PUBLISH_FILE);
    let gitPublish = readFile(gitPublishPath);
    if (!gitPublish) {
      gitPublish = (await inquirer.prompt({
        type: 'list',
        choices: GIT_PUBLISH_TYPE,
        message: '请选择您想要上传代码的平台',
        name: 'gitPublish',
      })).gitPublish;
      writeFile(gitPublishPath, gitPublish);
      log.success('git publish类型写入成功', `${gitPublish} -> ${gitPublishPath}`);
    } else {
      log.success('git publish类型获取成功', gitPublish);
    }
    this.gitPublish = gitPublish as string;
  }

  async prepare() {
    this.checkHomePath(); // 检查缓存主目录
    await this.checkGitServer(); // 检查用户远程仓库类型
    await this.checkGitToken(); // 获取远程仓库Token
    await this.getUserAndOrgs(); // 获取远程仓库用户和组织信息
    await this.checkGitOwner(); // 确认远程仓库类型
    await this.checkRepo(); // 检查并创建远程仓库
    this.checkGitIgnore(); // 检查并创建.gitignore文件
    await this.checkComponent(); // 组件合法性检查
    await this.init(); // 完成本地仓库初始化
  }
  async checkComponent() {
    let componentFile = this.isComponent();
    if (componentFile) {
      log.info('', '开始检查build结果');
      const buildPath = path.resolve(this.dir, componentFile.buildPath);
      if (!fs.existsSync(buildPath)) {
        log.info('', '无构建结果，开始 build');
        if (!this.buildCmd) {
          this.buildCmd = 'npm run build';
        }
        require('child_process').execSync(this.buildCmd, {
          cwd: this.dir,
        });
        if (!fs.existsSync(buildPath)) {
          throw new Error(`构建结果：${buildPath}不存在！`);
        }
      }
      const pkg = this.getPackageJson();
      if (!pkg.files || !pkg.files.includes(componentFile.buildPath)) {
        throw new Error(`package.json中files属性未添加构建结果目录：[${componentFile.buildPath}]，请在package.json中手动添加！`);
      }
      log.success('build结果检查通过！');
    }
  }

  async init() {
    if (await this.getRemote()) {
      return;
    }
    await this.initAndAddRemote();
    await this.initCommit();
  }

  async commit() {
    // 1.生成开发分支
    await this.getCorrectVersion();
    // 2.检查stash区
    await this.checkStash();
    // 3.检查代码冲突
    await this.checkConflicted();
    // 4.检查未提交代码
    await this.checkNotCommitted();
    // 5.切换开发分支
    await this.checkoutBranch(this.branch);
    // 6.合并远程master分支和开发分支代码
    await this.pullRemoteMasterAndBranch();
    // 7.将开发分支推送到远程仓库
    await this.pushRemoteRepo(this.branch);
  }

  async pullRemoteMasterAndBranch() {
    log.info('', `合并 [master] -> [${this.branch}]`);
    await this.pullRemoteRepo('master');
    log.success('合并远程 [master] 分支代码成功');
    await this.checkConflicted();
    log.info('', '检查远程开发分支');
    const remoteBranchList = await this.getRemoteBranchList();
    if (remoteBranchList.indexOf(this.version) >= 0) {
      log.info('', `合并 [${this.branch}] -> [${this.branch}]`);
      await this.pullRemoteRepo(this.branch);
      log.success(`合并远程 [${this.branch}] 分支代码成功`);
      await this.checkConflicted();
    } else {
      log.success(`不存在远程分支 [${this.branch}]`);
    }
  }

  async checkoutBranch(branch: string) {
    const localBranchList = await this.git.branchLocal();
    if (localBranchList.all.indexOf(branch) >= 0) {
      await this.git.checkout(branch);
    } else {
      await this.git.checkoutLocalBranch(branch);
    }
    // log.success(`分支切换到${branch}`);
  }

  async checkStash() {
    log.info('', '检查stash记录');
    const stashList = await this.git.stashList();
    if (stashList.all.length > 0) {
      await this.git.stash(['pop']);
      log.success('stash pop成功');
    }
  }

  async getCorrectVersion() {
    // 1.获取远程分布分支
    // 版本号规范：release/x.y.z，dev/x.y.z
    // 版本号递增规范：major/minor/patch
    log.info('', '获取代码分支');
    const remoteBranchList = await this.getRemoteBranchList(VERSION_RELEASE);
    let releaseVersion = null;
    if (remoteBranchList && remoteBranchList.length > 0) {
      releaseVersion = remoteBranchList[0];
    }
    log.verbose('线上最新版本号', releaseVersion);
    // 2.生成本地开发分支
    const devVersion = this.version;
    if (!releaseVersion) {
      this.branch = `${VERSION_DEVELOP}/${devVersion}`;
    } else if (semver.gt(this.version, releaseVersion)) {
      log.info('', `当前版本大于线上最新版本 ${devVersion} >= ${releaseVersion}`);
      this.branch = `${VERSION_DEVELOP}/${devVersion}`;
    } else {
      log.info('', '当前线上版本大于本地版本', `${releaseVersion} > ${devVersion}`);
      const incType = (await inquirer.prompt({
        type: 'list',
        name: 'incType',
        message: '自动升级版本，请选择升级版本类型',
        default: 'patch',
        choices: [{
          name: `小版本（${releaseVersion} -> ${semver.inc(releaseVersion, 'patch')}）`,
          value: 'patch',
        }, {
          name: `中版本（${releaseVersion} -> ${semver.inc(releaseVersion, 'minor')}）`,
          value: 'minor',
        }, {
          name: `大版本（${releaseVersion} -> ${semver.inc(releaseVersion, 'major')}）`,
          value: 'major',
        }],
      })).incType;
      const incVersion = semver.inc(releaseVersion, incType);
      this.branch = `${VERSION_DEVELOP}/${incVersion}`;
      this.version = incVersion || '';
    }
    log.verbose('本地开发分支', this.branch);
    // 3.将version同步到package.json
    this.syncVersionToPackageJson();
  }

  syncVersionToPackageJson() {
    const pkg = fse.readJsonSync(`${this.dir}/package.json`);
    if (pkg && pkg.version !== this.version) {
      pkg.version = this.version;
      fse.writeJsonSync(`${this.dir}/package.json`, pkg, { spaces: 2 });
    }
  }

  async getRemoteBranchList(type = VERSION_DEVELOP) {
    const remoteList = await this.git.listRemote(['--refs']);
    let reg: any;
    if (type === VERSION_RELEASE) {
      reg = /.+?refs\/tags\/release\/(\d+\.\d+\.\d+)/g;
    } else {
      reg = /.+?refs\/heads\/dev\/(\d+\.\d+\.\d+)/g;
    }
    return remoteList.split('\n').map(remote => {
      const match = reg.exec(remote);
      reg.lastIndex = 0;
      if (match && semver.valid(match[1])) {
        return match[1];
      }
    }).filter(_ => _).sort((a, b) => {
      if (semver.lte(b, a)) {
        if (a === b) return 0;
        return -1;
      }
      return 1;
    });
  }

  async initCommit() {
    await this.checkConflicted();
    await this.checkNotCommitted();
    if (await this.checkRemoteMaster()) {
      await this.pullRemoteRepo('master', {
        '--allow-unrelated-histories': null,
      });
    } else {
      await this.pushRemoteRepo('master');
    }
  }

  async pullRemoteRepo(branchName: string, options?: any) {
    // log.info('', `同步远程${branchName}分支代码`);
    await this.git.pull('origin', branchName, options)
      .catch(err => {
        log.error('pullRemoteRepo', err.message);
      });
  }

  async pushRemoteRepo(branchName: string) {
    // log.info('', 'pushRemoteRepo', `推送代码至${branchName}分支`);
    await this.git.push('origin', branchName);
    // log.success('推送代码成功');
  }

  async checkRemoteMaster() {
    return (await this.git.listRemote(['--refs'])).indexOf('refs/heads/master') >= 0;
  }

  async checkNotCommitted() {
    const status: StatusResult = await this.git.status();
    if (status.not_added.length > 0 ||
      status.created.length > 0 ||
      status.deleted.length > 0 ||
      status.modified.length > 0 ||
      status.renamed.length > 0
    ) {
      log.verbose('status', JSON.stringify(status));
      await this.git.add(status.not_added);
      await this.git.add(status.created);
      await this.git.add(status.deleted);
      await this.git.add(status.modified);
      await this.git.add(status.renamed as unknown as string);
      let message;
      while (!message) {
        message = (await inquirer.prompt({
          type: 'text' as any,
          name: 'message',
          message: '请输入commit信息：',
        })).message;
      }
      await this.git.commit(message);
      log.success('本次commit提交成功');
    }
  }

  async checkConflicted() {
    log.info('checkConflicted', '代码冲突检查');
    const status = await this.git.status();
    if (status.conflicted.length > 0) {
      throw new Error('当前代码存在冲突，请手动处理合并后再试！');
    }
    log.success('代码冲突检查通过');
  }

  getRemote() {
    const gitPath = path.resolve(this.dir, GIT_ROOT_DIR);
    this.remote = this.gitServer.getRemote(this.login, this.name);
    if (fs.existsSync(gitPath)) {
      log.success('git已完成初始化');
      return true;
    }
  }

  async initAndAddRemote() {
    log.info('', '执行git初始化');
    await this.git.init();
    log.info('', '添加git remote');
    const remotes = await this.git.getRemotes();
    log.verbose('git remotes', JSON.stringify(remotes));
    if (!remotes.find(item => item.name === 'origin')) {
      await this.git.addRemote('origin', this.remote);
    }
  }

  checkHomePath() {
    if (!this.homePath) {
      if (process.env.CLI_HOME_PATH) {
        this.homePath = process.env.CLI_HOME_PATH;
      } else {
        this.homePath = path.resolve(userHome, DEFAULT_CLI_HOME);
      }
    }
    log.verbose('home', this.homePath);
    fse.ensureDirSync(this.homePath);
    if (!fs.existsSync(this.homePath)) {
      throw new Error('用户主目录获取失败！');
    }
  }

  async checkGitServer() {
    const gitServerPath = this.createPath(GIT_SERVER_FILE);
    let gitServer = readFile(gitServerPath);
    if (!gitServer || this.refreshServer) {
      gitServer = (await inquirer.prompt({
        type: 'list',
        name: 'gitServer',
        message: '请选择您想要托管的Git平台',
        default: GITHUB,
        choices: GIT_SERVER_TYPE,
      })).gitServer;
      writeFile(gitServerPath, gitServer);
      log.success('git server写入成功', `${gitServer} -> ${gitServerPath}`);
    } else {
      log.success('git server获取成功', gitServer);
    }
    this.gitServer = this.createGitServer(gitServer as string);
    if (!this.gitServer) {
      throw new Error('GitServer初始化失败！');
    }
  }

  async checkGitToken() {
    const tokenPath = this.createPath(GIT_TOKEN_FILE);
    let token = readFile(tokenPath);
    if (!token || this.refreshToken) {
      log.warn(`token未生成, 请先生成 ${this.gitServer.type} token`, `链接: ${this.gitServer.getTokenUrl()}`);
      token = (await inquirer.prompt({
        type: 'password',
        name: 'token',
        message: '请将token复制到这里',
        default: '',
      })).token;
      writeFile(tokenPath, token);
      log.success('token写入成功', `${token} -> ${tokenPath}`);
    } else {
      log.success('token获取成功', tokenPath);
    }
    this.token = token as string;
    this.gitServer.setToken(this.token);
  }

  async getUserAndOrgs() {
    this.user = await this.gitServer.getUser();
    if (!this.user) {
      throw new Error('用户信息获取失败！');
    }
    // log.verbose('user', this.user);
    this.orgs = await this.gitServer.getOrg(this.user.login);
    if (!this.orgs) {
      throw new Error('组织信息获取失败！');
    }
    // log.verbose('orgs', JSON.stringify(this.orgs));
    log.success(`${this.gitServer.type}` + ' 用户和组织信息获取成功');
  }

  async checkGitOwner() {
    const ownerPath = this.createPath(GIT_OWN_FILE);
    const loginPath = this.createPath(GIT_LOGIN_FILE);
    let owner = readFile(ownerPath);
    let login = readFile(loginPath);
    if (!owner || !login || this.refreshOwner) {
      owner = (await inquirer.prompt({
        type: 'list',
        name: 'owner',
        message: '请选择远程仓库类型',
        default: REPO_OWNER_USER,
        choices: this.orgs.length > 0 ? GIT_OWNER_TYPE : GIT_OWNER_TYPE_ONLY,
      })).owner;
      if (owner === REPO_OWNER_USER) {
        login = this.user.login;
      } else {
        login = (await inquirer.prompt({
          type: 'list',
          name: 'login',
          message: '请选择',
          choices: this.orgs.map((item: {login: string}) => ({
            name: item.login,
            value: item.login,
          })),
        })).login;
      }
      writeFile(ownerPath, owner);
      writeFile(loginPath, login);
      log.success('owner写入成功', `${owner} -> ${ownerPath}`);
      log.success('login写入成功', `${login} -> ${loginPath}`);
    } else {
      log.success('owner获取成功', owner);
      log.success('login获取成功', login);
    }
    this.owner = owner as string;
    this.login = login as string;
  }

  async checkRepo() {
    let repo = await this.gitServer.getRepo(this.login, this.name);
    if (!repo) {
      let spinner = spinnerStart('开始创建远程仓库...');
      try {
        if (this.owner === REPO_OWNER_USER) {
          repo = await this.gitServer.createRepo(this.name);
        } else {
          this.gitServer.createOrgRepo(this.name, this.login);
        }
      } catch (e) {
        log.error('', JSON.stringify(e));
      } finally {
        spinner.stop(true);
      }
      if (repo) {
        log.success('远程仓库创建成功');
      } else {
        throw new Error('远程仓库创建失败');
      }
    } else {
      log.success('远程仓库信息获取成功');
    }
    // log.verbose('repo', repo);
    this.repo = repo;
  }

  checkGitIgnore() {
    const gitIgnore = path.resolve(this.dir, GIT_IGNORE_FILE);
    if (!fs.existsSync(gitIgnore)) {
      writeFile(gitIgnore, `.DS_Store
node_modules


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`);
      log.success(`自动写入${GIT_IGNORE_FILE}文件成功`);
    }
  }

  createGitServer(gitServer = '') {
    if (gitServer === GITHUB) {
      return new Github();
    } else if (gitServer === GITEE) {
      return new Gitee();
    }
    return null;
  }

  createPath(file: string) {
    const rootDir = path.resolve(this.homePath, GIT_ROOT_DIR);
    const filePath = path.resolve(rootDir, file);
    fse.ensureDirSync(rootDir);
    return filePath;
  }

  async deleteLocalBranch() {
    // log.info('开始删除本地开发分支', this.branch);
    await this.git.deleteLocalBranch(this.branch);
    // log.success('删除本地分支成功', this.branch);
  }

  async deleteRemoteBranch() {
    // log.info('开始删除远程分支', this.branch);
    await this.git.push(['origin', '--delete', this.branch]);
    // log.success('删除远程分支成功', this.branch);
  }

  async mergeBranchToMaster(branch: string) {
    // log.info('开始合并代码', `[${branch}] -> [master]`);
    await this.git.mergeFromTo(branch, 'master');
    // log.success('代码合并成功', `[${branch}] -> [master]`);
  }

  async checkTag() {
    // log.info('','获取远程 tag 列表');
    const tag = `${VERSION_RELEASE}/${this.version}`;
    const tagList = await this.getRemoteBranchList(VERSION_RELEASE);
    if (tagList.includes(this.version)) {
      // log.success('远程 tag 已存在', tag);
      await this.git.push(['origin', `:refs/tags/${tag}`]);
      // log.success('远程 tag 已删除', tag);
    }
    const localTagList = await this.git.tags();
    if (localTagList.all.includes(tag)) {
      // log.success('本地 tag 已存在', tag);
      await this.git.tag(['-d', tag]);
      // log.success('本地 tag 已删除', tag);
    }
    await this.git.addTag(tag);
    // log.success('本地 tag 创建成功', tag);
    await this.git.pushTags('origin');
    // log.success('远程 tag 推送成功', tag);
  }

  async uploadTemplate() {
    const TEMPLATE_FILE_NAME = 'index.html';
    if (this.sshUser && this.sshIp && this.sshPath) {
      log.info('','开始下载模板文件');
      let ossTemplateFile = (await request({
        url: '/file/oss',
        params: {
          name: this.name,
          type: this.prod ? 'prod' : 'dev',
          file: TEMPLATE_FILE_NAME,
        },
      })) as unknown as OssTemplateFileType;
      if (ossTemplateFile.code === 0 && ossTemplateFile.data) {
        ossTemplateFile = ossTemplateFile.data;
      }
      log.verbose('模板文件url:', ossTemplateFile.url);
      const response = await request({
        url: ossTemplateFile.url,
      });
      if (response) {
        const ossTempDir = path.resolve(this.homePath, TEMPLATE_TEMP_DIR, `${this.name}@${this.version}`);
        if (!fs.existsSync(ossTempDir)) {
          fse.mkdirpSync(ossTempDir);
        } else {
          fse.emptyDirSync(ossTempDir);
        }
        const templateFilePath = path.resolve(ossTempDir, TEMPLATE_FILE_NAME);
        fse.createFileSync(templateFilePath);
        fs.writeFileSync(templateFilePath, response as unknown as string);
        log.success('模板文件下载成功', templateFilePath);
        log.info('','开始上传模板文件至服务器');
        const uploadCmd = `scp -r ${templateFilePath} ${this.sshUser}@${this.sshIp}:${this.sshPath}`;
        log.verbose('uploadCmd', uploadCmd);
        const ret = require('child_process').execSync(uploadCmd);
        console.log(ret.toString());
        log.success('模板文件上传成功');
        fse.emptyDirSync(ossTempDir);
      }
    }
  }
  async saveComponentToDB() {
    // 1.将组件信息上传至数据库，RDS
    log.info('', '上传组件信息至OSS+写入数据库');
    const componentFile = this.isComponent();
    let componentExamplePath = path.resolve(this.dir, componentFile.examplePath);
    let dirs = fs.readdirSync(componentExamplePath);
    if (dirs.includes('dist')) {
      componentExamplePath = path.resolve(componentExamplePath, 'dist');
      dirs = fs.readdirSync(componentExamplePath);
      componentFile.examplePath = `${componentFile.examplePath}/dist`;
    }
    dirs = dirs.filter(dir => dir.match(/^index(\d)*.html$/));
    componentFile.exampleList = dirs;
    componentFile.exampleRealPath = componentExamplePath;
    const data = await createComponent({
      component: componentFile,
      git: {
        type: this.gitServer.type,
        remote: this.remote,
        version: this.version,
        branch: this.branch,
        login: this.login,
        owner: this.owner,
      },
    });
    if (!data) {
      throw new Error('上传组件失败');
    }
    // 2.将组件多预览页面上传至OSS
    return true;
  }

  async uploadComponentToNpm() {
    // 完成组件上传Npm
    if (this.isComponent()) {
      log.info('', '开始发布NPM');
      require('child_process').execSync('npm publish', {
        cwd: this.dir,
      });
      log.success('NPM发布成功');
    }
  }
}

export default Git

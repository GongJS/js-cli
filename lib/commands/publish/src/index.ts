import Git from '@js-cli/git'
import Command from '@js-cli/command'
import { log } from '@js-cli/utils'
import fse from 'fs-extra'
import fs from 'fs';
import path from 'path'
import { ProjectInfoType } from '@js-cli/init'

class PublishCommand extends Command {
  public projectInfo!: Pick<ProjectInfoType, 'name' | 'version'> & {dir: string}
  public options!: {
    refreshServer: boolean
    refreshToken: boolean
    refreshOwner: boolean
    buildCmd: string
    prod: boolean
    sshUser: string
    sshIp: string
    sshPath: string
  }
  public _argv: any
  public _cmd: any
  constructor(args: any[]) {
    super(args)
  }

  init() {
    this.options = {
      refreshServer: this._cmd[0].refreshServer,
      refreshToken: this._cmd[0].refreshToken,
      refreshOwner: this._cmd[0].refreshOwner,
      buildCmd: this._cmd[0].buildCmd,
      prod: this._cmd[0].prod ? true : false,
      sshUser: this._cmd[0].sshUser,
      sshIp: this._cmd[0].sshIp,
      sshPath: this._cmd[0].sshPath,
    };
  }

  async exec() {
    try {
      const startTime = new Date().getTime();
      // 1.初始化检查
      this.prepare();
      // 2.Git Flow自动化
      const git = new Git(this.projectInfo, this.options);
      await git.prepare(); // 自动化提交准备和代码仓库初始化
      await git.commit(); // 代码自动化提交
      await git.publish();
      // 3.云构建和云发布
      const endTime = new Date().getTime();
      log.info('本次发布耗时：', Math.floor((endTime - startTime) / 1000) + '秒');
    } catch (e) {
      log.error('',  (e as Error).message);
      if (process.env.LOG_LEVEL === 'verbose') {
        console.log(e);
      }
    }
  }

  prepare() {
    // 1.确认项目是否为npm项目
    const projectPath = process.cwd();
    const pkgPath = path.resolve(projectPath, 'package.json');
    log.verbose('package.json', pkgPath);
    if (!fs.existsSync(pkgPath)) {
      throw new Error('package.json不存在！');
    }
    // 2.确认是否包含name、version、build命令
    const pkg = fse.readJsonSync(pkgPath);
    const { name, version, scripts } = pkg;
    log.verbose('package.json', name, version, scripts);
    if (!name || !version || !scripts || !scripts.build) {
      throw new Error('package.json信息不全，请检查是否存在name、version和scripts（需提供build命令）！');
    }
    this.projectInfo = { name, version, dir: projectPath };
  }
}
const publish = (...args: any[]) => {
    return new PublishCommand(args)
  }

publish.publish = publish
export default publish

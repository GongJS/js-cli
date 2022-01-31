'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@js-cli/utils');
var pkgDir = require('pkg-dir');
var path = require('path');
var _pathExists = require('path-exists');
var fse = require('fs-extra');
var semver = require('semver');
var fs = require('fs');
var simpleGit = require('simple-git');
var userHome = require('user-home');
var inquirer = require('inquirer');
var terminalLink = require('terminal-link');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pkgDir__default = /*#__PURE__*/_interopDefaultLegacy(pkgDir);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var _pathExists__default = /*#__PURE__*/_interopDefaultLegacy(_pathExists);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var simpleGit__default = /*#__PURE__*/_interopDefaultLegacy(simpleGit);
var userHome__default = /*#__PURE__*/_interopDefaultLegacy(userHome);
var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);
var terminalLink__default = /*#__PURE__*/_interopDefaultLegacy(terminalLink);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const npminstall = require('npminstall');
const pathExists = _pathExists__default["default"].sync;
class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package 类的 options 参数不能为空');
        }
        if (!utils.isObject(options)) {
            throw new Error('Package 类的 options 参数必需为对象');
        }
        this.targetPath = options.targetPath;
        this.storeDir = options.storeDir;
        this.packageName = options.packageName;
        this.packageVersion = options.packageVersion;
        this.cacheFilePathPrefix = this.packageName.replace('/', '_');
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storeDir) {
                yield this.prepare();
                return pathExists(this.cacheFilePath);
            }
            else {
                return pathExists(this.targetPath);
            }
        });
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storeDir && !pathExists(this.storeDir)) {
                fse__default["default"].mkdirpSync(this.storeDir);
            }
            if (this.packageVersion === 'latest') {
                this.packageVersion = yield utils.http.getNpmLatestVersion(this.packageName);
            }
        });
    }
    getSpecificCacheFilePath(packageVersion) {
        return path__default["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`);
    }
    install() {
        return npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: utils.http.getDefaultRegistry(),
            pkgs: [
                { name: this.packageName, version: this.packageVersion }
            ]
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepare();
            const latestPackageVersion = yield utils.http.getNpmLatestVersion(this.packageName);
            const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion);
            if (!pathExists(latestFilePath)) {
                yield npminstall({
                    root: this.targetPath,
                    storeDir: this.storeDir,
                    registry: utils.http.getDefaultRegistry(),
                    pkgs: [
                        { name: this.packageName, version: latestPackageVersion }
                    ]
                });
                this.packageVersion = latestPackageVersion;
            }
            else {
                this.packageVersion = latestPackageVersion;
            }
        });
    }
    get cacheFilePath() {
        return path__default["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
    }
    _getRootFilePath(targetPath) {
        const dir = pkgDir__default["default"].sync(targetPath);
        if (dir) {
            const pkgFile = require(path__default["default"].resolve(dir, 'package.json'));
            if (pkgFile && pkgFile.main) {
                return path__default["default"].resolve(dir, pkgFile.main);
            }
        }
        return null;
    }
    getRootFilePath() {
        if (this.storeDir) {
            return this._getRootFilePath(this.cacheFilePath);
        }
        else {
            return this._getRootFilePath(this.targetPath);
        }
    }
}

const LOWEST_NODE_VERSION = '12.0.0';
class Command {
    constructor(argv) {
        this._cmd = '';
        if (!argv) {
            throw new Error('参数不能为空');
        }
        if (!Array.isArray(argv)) {
            throw new Error('参数类型必需为数组');
        }
        if (argv.length < 1) {
            throw new Error('参数列表为空');
        }
        this._argv = argv;
        new Promise((resolve, reject) => {
            let chain = Promise.resolve();
            chain = chain.then(() => { this.checkNodeVersion(); });
            chain = chain.then(() => this.initArgs());
            chain = chain.then(() => this.init());
            chain = chain.then(() => this.exec());
            chain.catch(err => utils.log.error('command constructor', err.message));
        });
    }
    initArgs() {
        this._cmd = this._argv[this._argv.length - 1];
        this._argv = this._argv.slice(0, this._argv.length - 1);
    }
    checkNodeVersion() {
        const currentVersion = process.version;
        const lowestVersion = LOWEST_NODE_VERSION;
        if (!semver__default["default"].gte(currentVersion, lowestVersion)) {
            throw new Error(utils.log.warn('checkNodeVersion', `js-cli 需要安装 v${lowestVersion} 以上 node 版本`));
        }
        console.log(process.version);
    }
}

class GitServer {
    constructor() {
        this.isHttpResponse = (response) => {
            return response && response.status;
        };
        this.handleResponse = (response) => {
            if (this.isHttpResponse(response) && response !== 200) {
                return null;
            }
            else {
                return response;
            }
        };
    }
}

const BASE_URL = 'https://api.github.com';
class GithubRequest {
    constructor(token) {
        this.token = token;
        this.service = axios__default["default"].create({
            baseURL: BASE_URL,
            timeout: 5000,
        });
        this.service.interceptors.request.use((config) => {
            config.headers['Authorization'] = `token ${this.token}`;
            return config;
        }, error => {
            Promise.reject(error);
        });
        this.service.interceptors.response.use(response => {
            return response.data;
        }, error => {
            if (error.response && error.response.data) {
                return error.response;
            }
            else {
                return Promise.reject(error);
            }
        });
    }
    get(url, params, headers) {
        return this.service({
            url,
            params,
            method: 'get',
            headers,
        });
    }
    post(url, data, headers) {
        return this.service({
            url,
            data,
            method: 'post',
            headers,
        });
    }
}

class Github extends GitServer {
    getUser() {
        return this.request.get('/user');
    }
    getOrg() {
        return this.request.get(`/user/orgs`, {
            page: 1,
            per_page: 100,
        });
    }
    getRepo(login, name) {
        return this.request
            .get(`/repos/${login}/${name}`)
            .then((response) => {
            return this.handleResponse(response);
        });
    }
    createRepo(name) {
        return this.request.post('/user/repos', {
            name,
        }, {
            Accept: 'application/vnd.github.v3+json',
        });
    }
    createOrgRepo(name, login) {
        return this.request.post(`/orgs/${login}/repos`, {
            name,
        }, {
            Accept: 'application/vnd.github.v3+json',
        });
    }
    setToken(token) {
        this.request = new GithubRequest(token);
    }
    getTokenUrl() {
        return 'https://github.com/settings/tokens';
    }
    getTokenHelpUrl() {
        return 'https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh';
    }
    getRemote(login, name) {
        return `git@github.com:${login}/${name}.git`;
    }
}

const DEFAULT_CLI_HOME = '.js-cli';
const GIT_ROOT_DIR = '.git';
const GIT_SERVER_FILE = '.git_server';
const GIT_TOKEN_FILE = '.git_token';
const GIT_OWN_FILE = '.git_own';
const GIT_LOGIN_FILE = '.git_login';
const GIT_IGNORE_FILE = '.gitignore';
const GITHUB = 'github';
const REPO_OWNER_USER = 'user';
const REPO_OWNER_ORG = 'org';
const VERSION_RELEASE = 'release';
const VERSION_DEVELOP = 'dev';
const GIT_SERVER_TYPE = [{
        name: 'Github',
        value: GITHUB,
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
class Git {
    constructor({ name, version, dir }, { refreshServer = false, refreshToken = false, refreshOwner = false, }) {
        this.name = name;
        this.version = version;
        this.dir = dir; // 源码目录
        this.git = simpleGit__default["default"](dir);
        this.refreshServer = refreshServer;
        this.refreshToken = refreshToken;
        this.refreshOwner = refreshOwner;
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkHomePath(); // 检查缓存主目录
            yield this.checkGitServer(); // 检查用户远程仓库类型
            yield this.checkGitToken(); // 获取远程仓库Token
            yield this.getUserAndOrgs(); // 获取远程仓库用户和组织信息
            yield this.checkGitOwner(); // 确认远程仓库类型
            yield this.checkRepo(); // 检查并创建远程仓库
            this.checkGitIgnore(); // 检查并创建.gitignore文件
            yield this.init(); // 完成本地仓库初始化
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.getRemote()) {
                return;
            }
            yield this.initAndAddRemote();
            yield this.initCommit();
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1.生成开发分支
            yield this.getCorrectVersion();
            // 2.检查stash区
            yield this.checkStash();
            // 3.检查代码冲突
            yield this.checkConflicted();
            // 4.切换开发分支
            yield this.checkoutBranch(this.branch);
            // 5.合并远程master分支和开发分支代码
            yield this.pullRemoteMasterAndBranch();
            // 6.将开发分支推送到远程仓库
            yield this.pushRemoteRepo(this.branch);
        });
    }
    pullRemoteMasterAndBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info(`合并 [master] -> [${this.branch}]`);
            yield this.pullRemoteRepo('master');
            utils.log.success('合并远程 [master] 分支代码成功');
            yield this.checkConflicted();
            utils.log.info('检查远程开发分支');
            const remoteBranchList = yield this.getRemoteBranchList();
            if (remoteBranchList.indexOf(this.version) >= 0) {
                utils.log.info(`合并 [${this.branch}] -> [${this.branch}]`);
                yield this.pullRemoteRepo(this.branch);
                utils.log.success(`合并远程 [${this.branch}] 分支代码成功`);
                yield this.checkConflicted();
            }
            else {
                utils.log.success(`不存在远程分支 [${this.branch}]`);
            }
        });
    }
    checkoutBranch(branch) {
        return __awaiter(this, void 0, void 0, function* () {
            const localBranchList = yield this.git.branchLocal();
            if (localBranchList.all.indexOf(branch) >= 0) {
                yield this.git.checkout(branch);
            }
            else {
                yield this.git.checkoutLocalBranch(branch);
            }
            utils.log.success(`分支切换到${branch}`);
        });
    }
    checkStash() {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info('检查stash记录');
            const stashList = yield this.git.stashList();
            if (stashList.all.length > 0) {
                yield this.git.stash(['pop']);
                utils.log.success('stash pop成功');
            }
        });
    }
    getCorrectVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            // 1.获取远程分布分支
            // 版本号规范：release/x.y.z，dev/x.y.z
            // 版本号递增规范：major/minor/patch
            utils.log.info('获取代码分支');
            const remoteBranchList = yield this.getRemoteBranchList(VERSION_RELEASE);
            let releaseVersion = null;
            if (remoteBranchList && remoteBranchList.length > 0) {
                releaseVersion = remoteBranchList[0];
            }
            utils.log.verbose('线上最新版本号', releaseVersion);
            // 2.生成本地开发分支
            const devVersion = this.version;
            if (!releaseVersion) {
                this.branch = `${VERSION_DEVELOP}/${devVersion}`;
            }
            else if (semver__default["default"].gt(this.version, releaseVersion)) {
                utils.log.info(`当前版本大于线上最新版本 ${devVersion} >= ${releaseVersion}`);
                this.branch = `${VERSION_DEVELOP}/${devVersion}`;
            }
            else {
                utils.log.info('当前线上版本大于本地版本', `${releaseVersion} > ${devVersion}`);
                const incType = (yield inquirer__default["default"].prompt({
                    type: 'list',
                    name: 'incType',
                    message: '自动升级版本，请选择升级版本类型',
                    default: 'patch',
                    choices: [{
                            name: `小版本（${releaseVersion} -> ${semver__default["default"].inc(releaseVersion, 'patch')}）`,
                            value: 'patch',
                        }, {
                            name: `中版本（${releaseVersion} -> ${semver__default["default"].inc(releaseVersion, 'minor')}）`,
                            value: 'minor',
                        }, {
                            name: `大版本（${releaseVersion} -> ${semver__default["default"].inc(releaseVersion, 'major')}）`,
                            value: 'major',
                        }],
                })).incType;
                const incVersion = semver__default["default"].inc(releaseVersion, incType);
                this.branch = `${VERSION_DEVELOP}/${incVersion}`;
                this.version = incVersion || '';
            }
            utils.log.verbose('本地开发分支', this.branch);
            // 3.将version同步到package.json
            this.syncVersionToPackageJson();
        });
    }
    syncVersionToPackageJson() {
        const pkg = fse__default["default"].readJsonSync(`${this.dir}/package.json`);
        if (pkg && pkg.version !== this.version) {
            pkg.version = this.version;
            fse__default["default"].writeJsonSync(`${this.dir}/package.json`, pkg, { spaces: 2 });
        }
    }
    getRemoteBranchList(type = VERSION_DEVELOP) {
        return __awaiter(this, void 0, void 0, function* () {
            const remoteList = yield this.git.listRemote(['--refs']);
            let reg;
            if (type === VERSION_RELEASE) {
                reg = /.+?refs\/tags\/release\/(\d+\.\d+\.\d+)/g;
            }
            else {
                reg = /.+?refs\/heads\/dev\/(\d+\.\d+\.\d+)/g;
            }
            return remoteList.split('\n').map(remote => {
                const match = reg.exec(remote);
                reg.lastIndex = 0;
                if (match && semver__default["default"].valid(match[1])) {
                    return match[1];
                }
            }).filter(_ => _).sort((a, b) => {
                if (semver__default["default"].lte(b, a)) {
                    if (a === b)
                        return 0;
                    return -1;
                }
                return 1;
            });
        });
    }
    initCommit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkConflicted();
            yield this.checkNotCommitted();
            if (yield this.checkRemoteMaster()) {
                yield this.pullRemoteRepo('master', {
                    '--allow-unrelated-histories': null,
                });
            }
            else {
                yield this.pushRemoteRepo('master');
            }
        });
    }
    pullRemoteRepo(branchName, options) {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info(`同步远程${branchName}分支代码`);
            yield this.git.pull('origin', branchName, options)
                .catch(err => {
                utils.log.error('pullRemoteRepo', err.message);
            });
        });
    }
    pushRemoteRepo(branchName) {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info('pushRemoteRepo', `推送代码至${branchName}分支`);
            yield this.git.push('origin', branchName);
            utils.log.success('推送代码成功');
        });
    }
    checkRemoteMaster() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.git.listRemote(['--refs'])).indexOf('refs/heads/master') >= 0;
        });
    }
    checkNotCommitted() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.git.status();
            if (status.not_added.length > 0 ||
                status.created.length > 0 ||
                status.deleted.length > 0 ||
                status.modified.length > 0 ||
                status.renamed.length > 0) {
                utils.log.verbose('status', JSON.stringify(status));
                yield this.git.add(status.not_added);
                yield this.git.add(status.created);
                yield this.git.add(status.deleted);
                yield this.git.add(status.modified);
                yield this.git.add(status.renamed);
                let message;
                while (!message) {
                    message = (yield inquirer__default["default"].prompt({
                        type: 'text',
                        name: 'message',
                        message: '请输入commit信息：',
                    })).message;
                }
                yield this.git.commit(message);
                utils.log.success('本次commit提交成功');
            }
        });
    }
    checkConflicted() {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info('checkConflicted', '代码冲突检查');
            const status = yield this.git.status();
            if (status.conflicted.length > 0) {
                throw new Error('当前代码存在冲突，请手动处理合并后再试！');
            }
            utils.log.success('代码冲突检查通过');
        });
    }
    getRemote() {
        const gitPath = path__default["default"].resolve(this.dir, GIT_ROOT_DIR);
        this.remote = this.gitServer.getRemote(this.login, this.name);
        if (fs__default["default"].existsSync(gitPath)) {
            utils.log.success('git已完成初始化');
            return true;
        }
    }
    initAndAddRemote() {
        return __awaiter(this, void 0, void 0, function* () {
            utils.log.info('执行git初始化');
            yield this.git.init();
            utils.log.info('添加git remote');
            const remotes = yield this.git.getRemotes();
            utils.log.verbose('git remotes', JSON.stringify(remotes));
            if (!remotes.find(item => item.name === 'origin')) {
                yield this.git.addRemote('origin', this.remote);
            }
        });
    }
    checkHomePath() {
        if (!this.homePath) {
            if (process.env.CLI_HOME_PATH) {
                this.homePath = process.env.CLI_HOME_PATH;
            }
            else {
                this.homePath = path__default["default"].resolve(userHome__default["default"], DEFAULT_CLI_HOME);
            }
        }
        utils.log.verbose('home', this.homePath);
        fse__default["default"].ensureDirSync(this.homePath);
        if (!fs__default["default"].existsSync(this.homePath)) {
            throw new Error('用户主目录获取失败！');
        }
    }
    checkGitServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const gitServerPath = this.createPath(GIT_SERVER_FILE);
            let gitServer = utils.readFile(gitServerPath);
            if (!gitServer || this.refreshServer) {
                gitServer = (yield inquirer__default["default"].prompt({
                    type: 'list',
                    name: 'gitServer',
                    message: '请选择您想要托管的Git平台',
                    default: GITHUB,
                    choices: GIT_SERVER_TYPE,
                })).gitServer;
                utils.writeFile(gitServerPath, gitServer);
                utils.log.success('git server写入成功', `${gitServer} -> ${gitServerPath}`);
            }
            else {
                utils.log.success('git server获取成功', gitServer);
            }
            this.gitServer = this.createGitServer(gitServer);
            if (!this.gitServer) {
                throw new Error('GitServer初始化失败！');
            }
        });
    }
    checkGitToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPath = this.createPath(GIT_TOKEN_FILE);
            let token = utils.readFile(tokenPath);
            utils.log.success(1111, this.gitServer.getTokenUrl());
            if (!token || this.refreshToken) {
                utils.log.warn('', `token未生成, 请先生成 Github token， ${terminalLink__default["default"]('链接', this.gitServer.getTokenUrl())}`);
                token = (yield inquirer__default["default"].prompt({
                    type: 'password',
                    name: 'token',
                    message: '请将token复制到这里',
                    default: '',
                })).token;
                utils.writeFile(tokenPath, token);
                utils.log.success('token写入成功', `${token} -> ${tokenPath}`);
            }
            else {
                utils.log.success('token获取成功', tokenPath);
            }
            this.token = token;
            this.gitServer.setToken(this.token);
        });
    }
    getUserAndOrgs() {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = yield this.gitServer.getUser();
            if (!this.user) {
                throw new Error('用户信息获取失败！');
            }
            utils.log.verbose('user', this.user);
            this.orgs = yield this.gitServer.getOrg(this.user.login);
            if (!this.orgs) {
                throw new Error('组织信息获取失败！');
            }
            utils.log.verbose('orgs', JSON.stringify(this.orgs));
            utils.log.success('Github' + ' 用户和组织信息获取成功');
        });
    }
    checkGitOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerPath = this.createPath(GIT_OWN_FILE);
            const loginPath = this.createPath(GIT_LOGIN_FILE);
            let owner = utils.readFile(ownerPath);
            let login = utils.readFile(loginPath);
            if (!owner || !login || this.refreshOwner) {
                owner = (yield inquirer__default["default"].prompt({
                    type: 'list',
                    name: 'owner',
                    message: '请选择远程仓库类型',
                    default: REPO_OWNER_USER,
                    choices: this.orgs.length > 0 ? GIT_OWNER_TYPE : GIT_OWNER_TYPE_ONLY,
                })).owner;
                if (owner === REPO_OWNER_USER) {
                    login = this.user.login;
                }
                else {
                    login = (yield inquirer__default["default"].prompt({
                        type: 'list',
                        name: 'login',
                        message: '请选择',
                        choices: this.orgs.map((item) => ({
                            name: item.login,
                            value: item.login,
                        })),
                    })).login;
                }
                utils.writeFile(ownerPath, owner);
                utils.writeFile(loginPath, login);
                utils.log.success('owner写入成功', `${owner} -> ${ownerPath}`);
                utils.log.success('login写入成功', `${login} -> ${loginPath}`);
            }
            else {
                utils.log.success('owner获取成功', owner);
                utils.log.success('login获取成功', login);
            }
            this.owner = owner;
            this.login = login;
        });
    }
    checkRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            let repo = yield this.gitServer.getRepo(this.login, this.name);
            if (!repo) {
                let spinner = utils.spinnerStart('开始创建远程仓库...');
                try {
                    if (this.owner === REPO_OWNER_USER) {
                        repo = yield this.gitServer.createRepo(this.name);
                    }
                    else {
                        this.gitServer.createOrgRepo(this.name, this.login);
                    }
                }
                catch (e) {
                    utils.log.error('', JSON.stringify(e));
                }
                finally {
                    spinner.stop(true);
                }
                if (repo) {
                    utils.log.success('远程仓库创建成功');
                }
                else {
                    throw new Error('远程仓库创建失败');
                }
            }
            else {
                utils.log.success('远程仓库信息获取成功');
            }
            utils.log.verbose('repo', repo);
            this.repo = repo;
        });
    }
    checkGitIgnore() {
        const gitIgnore = path__default["default"].resolve(this.dir, GIT_IGNORE_FILE);
        if (!fs__default["default"].existsSync(gitIgnore)) {
            utils.writeFile(gitIgnore, `.DS_Store
node_modules
/dist


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
            utils.log.success(`自动写入${GIT_IGNORE_FILE}文件成功`);
        }
    }
    createGitServer(gitServer = '') {
        if (gitServer === GITHUB) {
            return new Github();
        }
        return null;
    }
    createPath(file) {
        const rootDir = path__default["default"].resolve(this.homePath, GIT_ROOT_DIR);
        const filePath = path__default["default"].resolve(rootDir, file);
        fse__default["default"].ensureDirSync(rootDir);
        return filePath;
    }
}

exports.Command = Command;
exports.Git = Git;
exports.Package = Package;

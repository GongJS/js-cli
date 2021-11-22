import { Command, Package } from '@js-cli/models';
import { request, log, spinnerStart, sleep, execSpawn, kebabCase } from '@js-cli/utils';
import fs from 'fs';
import fse from 'fs-extra';
import inquirer from 'inquirer';
import semver from 'semver';
import path from 'path';
import os from 'os';
import glob from 'glob';
import ejs from 'ejs';

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

function getProjectTemplate () {
    return request({
        url: '/project/template'
    });
}

const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';
const TEMPLATE_TYPE_NORMAL = 'normal';
const TEMPLATE_TYPE_CUSTOM = 'custom';
const WHITE_COMMAND = ['npm', 'cnpm'];
const userHome = os.homedir();
class InitCommand extends Command {
    constructor(args) {
        super(args);
        this.projectName = '';
        this.force = false;
        this.projectInfo = {};
        this.template = [];
    }
    init() {
        this.projectName = this._argv[0] || '';
        this.force = !!this._cmd.force;
        log.verbose('projectName', this.projectName);
        log.verbose('force', this.force.toString());
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectInfo = yield this.prepare();
                if (projectInfo) {
                    this.projectInfo = projectInfo;
                    yield this.downloadTemplate();
                    yield this.installTemplate();
                }
            }
            catch (e) {
                log.error('exec', e.message);
                if (process.env.LOG_LEVEL === 'verbose') {
                    console.log(e);
                }
            }
        });
    }
    downloadTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectTemplate } = this.projectInfo;
            this.templateInfo = this.template.find(item => item.npmName === projectTemplate);
            const targetPath = path.resolve(userHome, '.js-cli', 'template');
            const storeDir = path.resolve(userHome, '.js-cli', 'template', 'node_modules');
            const { npmName, version } = this.templateInfo;
            this.templateNpm = new Package({
                targetPath,
                storeDir,
                packageName: npmName,
                packageVersion: version
            });
            if (!(yield this.templateNpm.exists())) {
                const spinner = spinnerStart('正在下载模板...');
                yield sleep();
                try {
                    yield this.templateNpm.install();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    spinner.stop(true);
                    if (yield this.templateNpm.exists()) {
                        log.success('下载模板成功');
                    }
                }
            }
            else {
                const spinner = spinnerStart('正在更新模板...');
                yield sleep();
                try {
                    yield this.templateNpm.update();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    spinner.stop(true);
                    if (yield this.templateNpm.exists()) {
                        log.success('模板更新成功');
                    }
                }
            }
        });
    }
    installTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.templateInfo) {
                if (this.templateInfo.type) {
                    if (!this.templateInfo.type) {
                        this.templateInfo.type = TEMPLATE_TYPE_NORMAL;
                    }
                    if (this.templateInfo.type === TEMPLATE_TYPE_NORMAL) {
                        yield this.installNormalTemplate();
                    }
                    else if (this.templateInfo.type === TEMPLATE_TYPE_CUSTOM) {
                        yield this.installCustomTemplate();
                    }
                    else {
                        throw new Error('无法识别项目模板类型');
                    }
                }
            }
            else {
                throw new Error('项目模板信息不存在！');
            }
        });
    }
    installNormalTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            // 拷贝模板至当前目录
            let spinner = spinnerStart('正在安装模板');
            try {
                const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template');
                const targetPath = process.cwd();
                fse.ensureDirSync(templatePath);
                fse.ensureDirSync(targetPath);
                fse.copySync(templatePath, targetPath);
            }
            catch (e) {
                throw e;
            }
            finally {
                spinner.stop(true);
                log.success('模板安装成功');
            }
            const { installCommand, startCommand } = this.templateInfo;
            const templateIgnore = this.templateInfo.ignore || [];
            const ignore = ['**/node_modules/**', ...templateIgnore];
            yield this.ejsRender({ ignore });
            yield this.execCommand(installCommand, '依赖安装失败');
            yield this.execCommand(startCommand, '项目启动失败');
        });
    }
    installCustomTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            // 查询自定义模版入口信息
            if (yield this.templateNpm.exists()) {
                const rootFile = this.templateNpm.getRootFilePath();
                if (rootFile && fs.existsSync(rootFile)) {
                    log.notice('', '开始执行自定义模板');
                    const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template');
                    const options = {
                        templateInfo: this.templateInfo,
                        projectInfo: this.projectInfo,
                        sourcePath: templatePath,
                        targetPath: process.cwd()
                    };
                    const code = `require('${rootFile}')(${JSON.stringify(options)})`;
                    yield execSpawn('node', ['-e', code], {
                        stdio: 'inherit',
                        cwd: process.cwd()
                    });
                    log.success('自定义模板安装成功');
                }
                else {
                    throw new Error('自定义模板入口文件不存在');
                }
            }
        });
    }
    execCommand(command, errMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            if (command) {
                const cmdArray = command.split(' ');
                const cmd = this.checkCommand(cmdArray[0]);
                if (!cmd) {
                    throw new Error('命令不存在：' + command);
                }
                const args = cmdArray.slice(1);
                ret = yield execSpawn(cmd, args, {
                    stdio: 'inherit',
                    cwd: process.cwd()
                });
                if (ret !== 0) {
                    throw new Error(errMsg);
                }
            }
        });
    }
    checkCommand(cmd) {
        if (WHITE_COMMAND.includes(cmd)) {
            return cmd;
        }
        return null;
    }
    ejsRender(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = process.cwd();
            const projectInfo = this.projectInfo;
            return new Promise((resolve, reject) => {
                glob('**', {
                    cwd: dir,
                    ignore: options.ignore || '',
                    nodir: true
                }, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    Promise.all(files.map(file => {
                        const filePath = path.join(dir, file);
                        return new Promise((resolve1, reject1) => {
                            ejs.renderFile(filePath, projectInfo, {}, (err, result) => {
                                if (err) {
                                    log.verbose('ejsRender', err.toString());
                                    reject1(err);
                                }
                                else {
                                    fse.writeFileSync(filePath, result);
                                    resolve1(result);
                                }
                            });
                        });
                    })).then(() => {
                        resolve(null);
                    }).catch(() => {
                        reject(err);
                    });
                });
            });
        });
    }
    createTemplateChoices() {
        return this.template.map(item => ({
            value: item.npmName,
            name: item.name
        }));
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            const localPath = process.cwd();
            const spinner = spinnerStart('从远程仓库获取模版');
            const template = (yield getProjectTemplate());
            spinner.stop(true);
            if (!template || template.length === 0) {
                throw new Error('项目模版不存在');
            }
            this.template = template;
            if (!this.isDirEmpty(localPath)) {
                let ifContinue = false;
                if (!this.force) {
                    ifContinue = (yield inquirer.prompt({
                        type: 'confirm',
                        name: 'ifContinue',
                        default: false,
                        message: '当前文件夹不为空，是否继续创建项目？'
                    })).ifContinue;
                    if (!ifContinue)
                        return;
                }
                if (ifContinue || this.force) {
                    const { confirmDelete } = yield inquirer.prompt({
                        type: 'confirm',
                        name: 'confirmDelete',
                        default: false,
                        message: '是否确认清空当前目录下对所有文件？'
                    });
                    if (confirmDelete) {
                        fse.emptyDirSync(localPath);
                    }
                }
            }
            return yield this.getProjectInfo();
        });
    }
    getProjectInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            function isValidName(v) {
                return /^[@a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[\/][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v);
            }
            let projectInfo = {};
            let isProjectNameValid = false;
            if (isValidName(this.projectName)) {
                isProjectNameValid = true;
                projectInfo.projectName = this.projectName;
            }
            // 选择项目或组件
            const { type } = yield inquirer.prompt({
                type: 'list',
                name: 'type',
                default: TYPE_PROJECT,
                choices: [{
                        name: '项目',
                        value: TYPE_PROJECT
                    }, {
                        name: '组件',
                        value: TYPE_COMPONENT
                    }],
                message: '请选择初始化类型'
            });
            this.template = this.template.filter(template => template.tag.includes(type));
            const title = type === TYPE_PROJECT ? '项目' : '组件';
            const projectNamePrompt = {
                type: 'input',
                name: 'projectName',
                message: `请输入${title}名称`,
                default: '',
                validate: function (v) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (!isValidName(v)) {
                                reject(`合法${title}名称需满足：1.首字符必需为英文字母或@字符; 2.尾字符必需为英文或数字，不能为字符; 3.字符仅允许'-_@/'`);
                                return;
                            }
                            resolve(true);
                        }, 0);
                    });
                },
                filter: (v) => {
                    return v;
                }
            };
            const projectPrompt = [];
            if (!isProjectNameValid) {
                projectPrompt.push(projectNamePrompt);
            }
            projectPrompt.push({
                type: 'input',
                name: 'projectVersion',
                message: `请输入${title}版本号`,
                default: '1.0.0',
                validate: function (v) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (!(!!semver.valid(v))) {
                                reject('请输入合法对版本号');
                                return;
                            }
                            resolve(true);
                        }, 0);
                    });
                },
                filter: (v) => {
                    if (!!semver.valid(v)) {
                        return semver.valid(v);
                    }
                    else {
                        return v;
                    }
                }
            }, {
                type: 'list',
                name: 'projectTemplate',
                message: `请选择${title}模版`,
                choices: this.createTemplateChoices(),
            });
            if (type === TYPE_PROJECT) {
                const project = yield inquirer.prompt(projectPrompt);
                projectInfo = Object.assign(Object.assign(Object.assign({}, projectInfo), { type }), project);
            }
            else if (type === TYPE_COMPONENT) {
                const descriptionPrompt = {
                    type: 'input',
                    name: 'componentDescription',
                    message: '请输入组件描述信息',
                    default: '',
                    validate: function (v) {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (!v) {
                                    reject('请输入组件描述信息');
                                    return;
                                }
                                resolve(true);
                            }, 0);
                        });
                    },
                };
                projectPrompt.push(descriptionPrompt);
                // 2.获取组件基本信息
                const component = yield inquirer.prompt(projectPrompt);
                projectInfo = Object.assign(Object.assign(Object.assign({}, projectInfo), { type }), component);
            }
            // 生成 className
            if (projectInfo.projectName) {
                projectInfo.name = projectInfo.projectName;
                projectInfo.className = kebabCase(projectInfo.projectName).replace(/^-/, '');
            }
            if (projectInfo.projectVersion) {
                projectInfo.version = projectInfo.projectVersion;
            }
            if (projectInfo.componentDescription) {
                projectInfo.description = projectInfo.componentDescription;
            }
            console.log('projectInfo', projectInfo);
            return projectInfo;
        });
    }
    isDirEmpty(localPath) {
        let fileList = fs.readdirSync(localPath);
        fileList = fileList.filter(file => !file.startsWith('.') && ['node_modules'].indexOf(file) < 0);
        return !fileList || fileList.length <= 0;
    }
}
const init = (...args) => {
    return new InitCommand(args);
};

export { init as default, init };

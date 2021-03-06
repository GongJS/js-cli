import Command from '@js-cli/command'
import Package from '@js-cli/package'
import {log, kebabCase, sleep, spinnerStart, execSpawn, request} from '@js-cli/utils'
import fs from 'fs'
import fse from 'fs-extra'
import inquirer from 'inquirer'
import semver from 'semver'
import path from 'path'
import os from 'os'
import glob from 'glob'
import ejs from 'ejs'

const TYPE_PROJECT = 'project'
const TYPE_COMPONENT = 'component'
const TEMPLATE_TYPE_NORMAL = 'normal'
const TEMPLATE_TYPE_CUSTOM = 'custom'
const WHITE_COMMAND = ['npm', 'cnpm', 'yarn']
const COMPONENT_FILE = '.componentrc';
const userHome = os.homedir()
export interface ProjectInfoType {
    projectName: string
    name: string
    className: string
    version: string
    projectVersion: string
    description: string
    componentDescription: string
    dir: string
}

interface TemplateInfoType {
    name: string
    npmName: string,
    version: string,
    type: 'normal' | 'custom',
    installCommand: string,
    startCommand: string,
    tag: string[],
    ignore: string[]
    buildPath?: string
    examplePath?: string
}

interface TemplateNpmInfoType {
    exists: () => Promise<boolean>
    install: () => void
    update: () => void
    getRootFilePath: () => string | null
    cacheFilePath: string
}

class InitCommand extends Command {
    public projectName: string
    public force: boolean
    public projectInfo: any
    public template: TemplateInfoType[]
    public templateInfo!: TemplateInfoType
    public templateNpm!: TemplateNpmInfoType
    constructor(args: any[]) {
        super(args)
        this.projectName = ''
        this.force = false
        this.projectInfo = {}
        this.template = []
    }
    init () {
        this.projectName = this._argv[0] || ''
        this.force = !!this._cmd.force
        log.verbose('projectName', this.projectName)
        log.verbose('force', this.force.toString())
    }
    async exec() {
        try {
            const projectInfo = await this.prepare()
            if (projectInfo) {
                this.projectInfo = projectInfo
                await this.downloadTemplate()
                await this.installTemplate()
            }
        } catch(e) {
            log.error('exec', (e as unknown as Error).message)
            if (process.env.LOG_LEVEL === 'verbose') {
                console.log(e)
            }
        }
    }

    async downloadTemplate() {
        const { projectTemplate } = this.projectInfo
        this.templateInfo = this.template.find(item => item.npmName === projectTemplate)!
        const targetPath = path.resolve(userHome, '.js-cli', 'template')
        const storeDir = path.resolve(userHome, '.js-cli', 'template', 'node_modules')
        const { npmName, version } = this.templateInfo
        this.templateNpm = new Package({
            targetPath,
            storeDir,
            packageName: npmName,
            packageVersion: version
        })
        if (!(await this.templateNpm.exists())) {
            const spinner = spinnerStart('??????????????????...')
            await sleep()
            try {
                await this.templateNpm.install()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await this.templateNpm.exists()) {
                    log.success('??????????????????')
                }
            }
        } else {
            const spinner = spinnerStart('??????????????????...')
            await sleep()
            try {
                await this.templateNpm.update()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await this.templateNpm.exists()) {
                    log.success('??????????????????')
                }
            }
        }
    }

    async installTemplate() {
        if (this.templateInfo) {
            if (this.templateInfo.type) {
                if (!this.templateInfo.type) {
                    this.templateInfo.type = TEMPLATE_TYPE_NORMAL
                }
                if (this.templateInfo.type === TEMPLATE_TYPE_NORMAL) {
                   await this.installNormalTemplate()
                } else if (this.templateInfo.type === TEMPLATE_TYPE_CUSTOM) {
                    await this.installCustomTemplate()
                } else {
                    throw new Error('??????????????????????????????')
                }
            }
       } else {
           throw new Error('??????????????????????????????')
       }
    }

    async installNormalTemplate() {
        // ???????????????????????????
        let spinner = spinnerStart('??????????????????')
        const targetPath = process.cwd();
        try {
            const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
            const targetPath = process.cwd()
            fse.ensureDirSync(templatePath)
            fse.ensureDirSync(targetPath)
            fse.copySync(templatePath, targetPath)
        } catch(e) {
            throw e
        } finally {
            spinner.stop(true)
            log.success('??????????????????')
        }
        const { installCommand, startCommand } = this.templateInfo
        const templateIgnore = this.templateInfo.ignore || []
        const ignore = ['**/node_modules/**', ...templateIgnore]
        await this.ejsRender({ ignore })
        // ?????????????????????????????????????????????
        await this.createComponentFile(targetPath);
        await this.execCommand(installCommand, '??????????????????')
        await this.execCommand(startCommand, '??????????????????')
    }

    async createComponentFile(targetPath: string) {
        const templateInfo = this.templateInfo;
        const projectInfo = this.projectInfo;
        if (templateInfo.tag.includes(TYPE_COMPONENT)) {
            const componentData = {
                ...projectInfo,
                buildPath: templateInfo.buildPath,
                examplePath: templateInfo.examplePath,
                npmName: templateInfo.npmName,
                npmVersion: templateInfo.version,
            };
            const componentFile = path.resolve(targetPath, COMPONENT_FILE);
            fs.writeFileSync(componentFile, JSON.stringify(componentData));
        }
    }
    async installCustomTemplate() {
        // ?????????????????????????????????
        if (await this.templateNpm.exists()) {
            const rootFile = this.templateNpm.getRootFilePath()
            if (rootFile && fs.existsSync(rootFile)) {
                log.notice('','???????????????????????????')
                const templatePath = path.resolve(this.templateNpm.cacheFilePath, 'template')
                const options = {
                    templateInfo: this.templateInfo,
                    projectInfo: this.projectInfo,
                    sourcePath: templatePath,
                    targetPath: process.cwd()
                }
                const code = `require('${rootFile}').call(null, ${JSON.stringify(options)})`
                await execSpawn('node', ['-e', code], {
                    stdio: 'inherit',
                    cwd: process.cwd()
                })
                log.success('???????????????????????????')
            } else {
                throw new Error('????????????????????????????????????')
            }
        }
    }
    async execCommand(command: string, errMsg: string) {
        let ret
        if (command) {
            const cmdArray = command.split(' ')
            const cmd = this.checkCommand(cmdArray[0])
            if (!cmd) {
                throw new Error('??????????????????' + command)
            }
            const args = cmdArray.slice(1)
            ret = await execSpawn(cmd, args, {
                stdio: 'inherit',
                cwd: process.cwd()
            })
            if (ret !== 0) {
                throw new  Error(errMsg)
            }
        }
    }

    checkCommand(cmd: string) {
        if (WHITE_COMMAND.includes(cmd)) {
            return cmd
        }
        return null
    }

    async ejsRender(options: { ignore: string[] }) {
        const dir = process.cwd()
        const projectInfo = this.projectInfo
        return new Promise((resolve, reject) => {
            glob('**', {
                cwd: dir,
                ignore: options.ignore || '',
                nodir: true
            }, (err, files) => {
                if (err) {
                    reject(err)
                }
                Promise.all(files.map(file => {
                    const filePath = path.join(dir, file)
                    return new Promise((resolve1, reject1) => {
                        ejs.renderFile(filePath, projectInfo, {}, (err, result) => {
                            if (err) {
                                log.verbose('ejsRender', err.toString())
                                reject1(err)
                            } else {
                                fse.writeFileSync(filePath, result)
                                resolve1(result)
                            }
                        })
                    })
                })).then(() => {
                    resolve(null)
                }).catch(() => {
                    reject(err)
                })
            })
        })
    }

    createTemplateChoices() {
        return this.template.map(item => ({
            value: item.npmName,
            name: item.name
        }))
    }
    getProjectTemplate() {
        return request<TemplateInfoType[]>({
            url: '/project/template',
            method: 'get',
        });
    }
    async prepare() {
        const localPath = process.cwd()
        const spinner = spinnerStart('???????????????????????????')
        const template = await this.getProjectTemplate()
        spinner.stop(true)
        if (!template || template?.length === 0) {
            throw new Error('?????????????????????')
        }
        this.template = template
        if (!this.isDirEmpty(localPath)) {
            let ifContinue = false
            if (!this.force) {
                ifContinue = (await inquirer.prompt({
                    type: 'confirm',
                    name: 'ifContinue',
                    default: false,
                    message: '??????????????????????????????????????????????????????'
                })).ifContinue
                if (!ifContinue) return
            }
            if (ifContinue || this.force) {
                const { confirmDelete } = await inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    default: false,
                    message: '???????????????????????????????????????????????????'
                })
                if (confirmDelete) {
                    fse.emptyDirSync(localPath)
                }
            }
        }
        return await this.getProjectInfo()
    }

    async getProjectInfo() {
        function isValidName(v: string) {
            return /^(@[a-zA-Z0-9-_]+\/)?[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v);
        }
        let projectInfo: Partial<ProjectInfoType> = {}
        let isProjectNameValid = false

        if (isValidName(this.projectName)) {
            isProjectNameValid = true
            projectInfo.projectName = this.projectName
        }
        // ?????????????????????
        const { type } = await inquirer.prompt({
            type: 'list',
            name: 'type',
            default: TYPE_PROJECT,
            choices: [{
                name: '??????',
                value: TYPE_PROJECT
            }, {
                name: '??????',
                value: TYPE_COMPONENT
            }],
            message: '????????????????????????'
        })
        this.template = this.template.filter(template => template.tag.includes(type))
        const title = type === TYPE_PROJECT ? '??????' : '??????'
        const projectNamePrompt = {
            type: 'input',
            name: 'projectName',
            message: `?????????${title}??????`,
            default: '',
            validate: function(v: string)  {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!isValidName(v)) {
                            reject(`??????${title}??????????????????1.?????????????????????????????????@??????; 2.???????????????????????????????????????????????????; 3.???????????????'-_@/'`)
                            return
                        }
                        resolve(true)
                    }, 0)
                })
            },
            filter: (v: string) => {
                return v
            }
        }
        const projectPrompt = []
        if (!isProjectNameValid) {
            projectPrompt.push(projectNamePrompt)
        }
        projectPrompt.push({
            type: 'input',
            name: 'projectVersion',
            message: `?????????${title}?????????`,
            default: '1.0.0',
            validate: function (v: string) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!(!!semver.valid(v))) {
                            reject('???????????????????????????')
                            return
                        }
                        resolve(true)
                    }, 0)
                })
            },
            filter: (v: string) => {
                if (!!semver.valid(v)) {
                    return semver.valid(v)
                } else {
                    return v
                }
            }
        }, {
            type: 'list',
            name: 'projectTemplate',
            message: `?????????${title}??????`,
            choices: this.createTemplateChoices(),
        })
        if (type === TYPE_PROJECT) {
            const project = await inquirer.prompt(projectPrompt)
            projectInfo = {
                ...projectInfo,
                type,
                ...project
            }
        } else if (type === TYPE_COMPONENT) {
            const descriptionPrompt = {
                type: 'input',
                name: 'componentDescription',
                message: '???????????????????????????',
                default: '',
                validate: function (v: string) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (!v) {
                                reject('???????????????????????????')
                                return
                            }
                            resolve(true)
                        }, 0)
                    })
                },
            }
            projectPrompt.push(descriptionPrompt)
            // 2.????????????????????????
            const component = await inquirer.prompt(projectPrompt)
            projectInfo = {
                ...projectInfo,
                type,
                ...component
            }
        }
        // ?????? className
        if (projectInfo.projectName) {
            projectInfo.name = projectInfo.projectName
            projectInfo.className = kebabCase(projectInfo.projectName).replace(/^-/, '')
        }
        if (projectInfo.projectVersion) {
            projectInfo.version = projectInfo.projectVersion
        }
        if (projectInfo.componentDescription) {
            projectInfo.description = projectInfo.componentDescription
        }
        return projectInfo
    }

    isDirEmpty(localPath: string) {
        let fileList = fs.readdirSync(localPath)
        fileList = fileList.filter(file =>
            !file.startsWith('.') && ['node_modules'].indexOf(file) < 0
        )
        return !fileList || fileList.length <= 0
    }
}

const init = (...args: any[]) => {
    return new InitCommand(args)
}

init.init = init
export default init

import { Command } from '@js-cli/models'
import { log, kebabCase } from '@js-cli/utils'
import fs from 'fs'
import fse from 'fs-extra'
import inquirer from 'inquirer'
import semver from 'semver'
import getProjectTemplate from './getProjectTemplate'
interface ProjectInfoType {
    projectName: string
    name: string
    className: string
    version: string
    projectVersion: string
    description: string
    componentDescription: string
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
}
const TYPE_PROJECT = 'project'
const TYPE_COMPONENT = 'component'
class InitCommand extends Command {
    public projectName: string
    public force: boolean
    public projectInfo: any
    public template: any[]
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
    
    async downloadTemplate() {}

    async installTemplate() {}

    createTemplateChoices() {
        return this.template.map(item => ({
            value: item.npmName,
            name: item.name
        }))
    }

    async prepare() {
        const localPath = process.cwd()
        const template = (await getProjectTemplate()) as unknown as TemplateInfoType[]
        if (!template || template.length === 0) {
            throw new Error('项目模版不存在')
        }
        this.template = template
        if (!this.isDirEmpty(localPath)) {
            let ifContinue = false
            if (!this.force) {
                ifContinue = (await inquirer.prompt({
                    type: 'confirm',
                    name: 'ifContinue',
                    default: false,
                    message: '当前文件夹不为空，是否继续创建项目？'
                })).ifContinue
                if (!ifContinue) return
            }
            if (ifContinue || this.force) {
                const { confirmDelete } = await inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmDelete',
                    default: false,
                    message: '是否确认清空当前目录下对所有文件？'
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
            return /^[a-zA-Z]+([-][a-zA-Z][a-zA-Z0-9]*|[_][a-zA-Z][a-zA-Z0-9]*|[a-zA-Z0-9])*$/.test(v)
        }
        let projectInfo: Partial<ProjectInfoType> = {}
        let isProjectNameValid = false

        if (isValidName(this.projectName)) {
            isProjectNameValid = true
            projectInfo.projectName = this.projectName
        }
        // 选择项目或组件
        const { type } = await inquirer.prompt({
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
        })
        this.template = this.template.filter(template => template.tag.includes(type))
        const title = type === TYPE_PROJECT ? '项目' : '组件'
        const projectNamePrompt = {
            type: 'input',
            name: 'projectName',
            message: `请输入${title}名称`,
            default: '',
            validate: function(v: string)  {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!isValidName(v)) {
                            reject(`合法${title}名称需满足：1.首字符必需为英文字母; 2.尾字符必需为英文或数字，不能为字符;3.字符仅允许'-_'`)
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
            message: `请输入${title}版本号`,
            default: '1.0.0',
            validate: function (v: string) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!(!!semver.valid(v))) {
                            reject('请输入合法对版本号')
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
            message: `请选择${title}模版`,
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
                message: '请输入组件描述信息',
                default: '',
                validate: function (v: string) {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (!v) {
                                reject('请输入组件描述信息')
                                return
                            }
                            resolve(true)
                        }, 0)
                    })
                },
            }
            projectPrompt.push(descriptionPrompt)
            // 2.获取组件基本信息
            const component = await inquirer.prompt(projectPrompt)
            projectInfo = {
                ...projectInfo,
                type,
                ...component
            }
        }
        // 生成 className
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
        console.log('projectInfo', projectInfo)
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

export default init
import { Command, Package } from '@js-cli/models'
import { log, sleep, spinnerStart } from '@js-cli/utils'
import fse from 'fs-extra'
import path from 'path'
import os from 'os'
import glob from 'glob'
import ejs from 'ejs'

const userHome = os.homedir()
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

interface TemplateNpmInfoType {
    exists: () => Promise<boolean>
    install: () => void
    update: () => void
    getRootFilePath: () => string | null
    cacheFilePath: string
}

class AddCommand extends Command {
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
        console.log('init')
    }
    async exec() {
        console.log('exec')
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
            const spinner = spinnerStart('正在下载模板...')
            await sleep()
            try {
                await this.templateNpm.install()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await this.templateNpm.exists()) {
                    log.success('下载模板成功')
                }
            }
        } else {
            const spinner = spinnerStart('正在更新模板...')
            await sleep()
            try {
                await this.templateNpm.update()
            } catch (e) {
                throw e
            } finally {
                spinner.stop(true)
                if (await this.templateNpm.exists()) {
                    log.success('模板更新成功')
                }
            }
        }
    }

    async installTemplate() {
    }

    async execCommand(command: string, errMsg: string) {

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
}

const add = (...args: any[]) => {
    return new AddCommand(args)
}

export { add }
export default add

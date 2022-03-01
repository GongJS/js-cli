import { Command, Package } from '@js-cli/models'
import { log, sleep, spinnerStart, execAsync } from '@js-cli/utils'
import fse from 'fs-extra'
import path from 'path'
import os from 'os'
import glob from 'glob'
import ejs from 'ejs'
import inquirer from 'inquirer'
import _pathExists from 'path-exists'
const pathExists= _pathExists.sync
import semver from 'semver'
import pkgUp from 'pkg-up'

const userHome = os.homedir()

const PAGE_TEMPLATE = [{
  name: 'Vue2首页模板',
  npmName: 'imooc-cli-dev-template-page-vue2',
  pageName: '',
  version: 'latest',
  targetPath: 'src/views/Home',
  ignore: ['assets/**'],
}];

interface TemplateInfoType {
    name: string
    npmName: string,
    pageName: string
    version: string,
    targetPath: string,
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
    public dir!: string
    public pageTemplate!: TemplateInfoType
    public pageTemplatePackage!: Package
    public targetPath!: string
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
        // 1. 获取页面安装文件夹
        this.dir = process.cwd();
        // 2. 选择页面模板
        this.pageTemplate = await this.getPageTemplate();
        // 3. 安装页面模板
        // 3.0 预检查（目录重名问题）
        await this.prepare();
        // 3.1 下载页面模板至缓存目录
        await this.downloadTemplate();
        // 3.2 将页面模板拷贝至指定目录
        await this.installTemplate();
        // 4. 合并页面模板依赖
        // 5. 页面模板安装完成
    }

    async prepare() {
        // 生成最终拷贝路径
        this.targetPath = path.resolve(this.dir, this.pageTemplate.pageName);
        if (await pathExists(this.targetPath)) {
            throw new Error('页面文件夹已经存在');
        }
    }

    createChoices() {
        return PAGE_TEMPLATE.map(item => ({
            name: item.name,
            value: item.npmName,
        }));
    }
    async getPageTemplate() {
        const pageTemplateName = (await inquirer.prompt({
            type: 'list',
            name: 'pageTemplate',
            message: '请选择页面模板',
            choices: this.createChoices(),
        })).pageTemplate;
        // 2.1 输入页面名称
        const pageTemplate = PAGE_TEMPLATE.find(item => item.npmName === pageTemplateName);
        if (!pageTemplate) {
            throw new Error('页面模板不存在！');
        }
        const { pageName } = await inquirer.prompt({
            type: 'input',
            name: 'pageName',
            message: '请输入页面名称',
            default: '',
            validate: function(value: string)  {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (!value || !value.trim()) {
                            reject('请输入页面名称');
                            return;
                        }
                        resolve(true)
                    }, 0)
                })
            },
        });
        pageTemplate.pageName = pageName.trim();
        return pageTemplate;
    }
    async downloadTemplate() {
        // 缓存文件夹
        const targetPath = path.resolve(userHome, '.js-cli', 'template');
        // 缓存真实路径
        const storeDir = path.resolve(targetPath, 'node_modules');
        const { npmName, version } = this.pageTemplate;
        // 构建Package对象
        const pageTemplatePackage = new Package({
            targetPath,
            storeDir,
            packageName: npmName,
            packageVersion: version,
        });
        // 页面模板是否存在
        if (!await pageTemplatePackage.exists()) {
            const spinner = spinnerStart('正在下载页面模板...');
            await sleep();
            // 下载页面模板
            try {
                await pageTemplatePackage.install();
            } catch (e) {
                throw e;
            } finally {
                spinner.stop(true);
                if (await pageTemplatePackage.exists()) {
                    log.success('下载页面模板成功');
                    this.pageTemplatePackage = pageTemplatePackage;
                }
            }
        } else {
            const spinner = spinnerStart('正在更新页面模板...');
            await sleep();
            // 更新页面模板
            try {
                await pageTemplatePackage.update();
            } catch (e) {
                throw e;
            } finally {
                spinner.stop(true);
                if (await pageTemplatePackage.exists()) {
                    log.success('更新页面模板成功');
                    this.pageTemplatePackage = pageTemplatePackage;
                }
            }
        }
    }

    async installTemplate() {
        log.info('','正在安装页面模板');
        log.verbose('pageTemplate', JSON.stringify(this.pageTemplate));
        // 模板路径
        const templatePath = path.resolve(this.pageTemplatePackage.cacheFilePath, 'template', this.pageTemplate.targetPath);
        // 目标路径
        const targetPath = this.targetPath;
        if (!await pathExists(templatePath)) {
            throw new Error('页面模板不存在！');
        }
        log.verbose('templatePath', templatePath);
        log.verbose('targetPath', targetPath);
        fse.ensureDirSync(templatePath);
        fse.ensureDirSync(targetPath);
        fse.copySync(templatePath, targetPath);
        await this.ejsRender({ targetPath });
        await this.dependenciesMerge({ templatePath, targetPath });
        log.success('安装页面模板成功');
    }

    async execCommand(command: string, cwd: string) {
        let ret;
        if (command) {
            // npm install => [npm, install] => npm, [install]
            const cmdArray = command.split(' ');
            const cmd = cmdArray[0];
            const args = cmdArray.slice(1);
            ret = await execAsync(cmd, args, {
                stdio: 'inherit',
                cwd,
            });
        }
        if (ret !== 0) {
            throw new Error(command + ' 命令执行失败');
        }
        return ret;
    }

    async dependenciesMerge(options: {templatePath: string, targetPath: string}) {
        function objToArray(o: Record<string, string>) {
            const arr: Record<string, string>[] = [];
            Object.keys(o).forEach(key => {
                arr.push({
                    key,
                    value: o[key],
                });
            });
            return arr;
        }

        function arrayToObj(arr: Record<string, string>[]) {
            const o: Record<string, string> = {};
            arr.forEach(item => o[item.key] = item.value);
            return o;
        }

        function depDiff(templateDepArr: {key: string, value: string}[], targetDepArr: {key: string, value: string}[]) {
            let finalDep = [...targetDepArr];
            // 1.场景1：模板中存在依赖，项目中不存在（拷贝依赖）
            // 2.场景2：模板中存在依赖，项目也存在（不会拷贝依赖，但是会在脚手架中给予提示，让开发者手动进行处理）
            templateDepArr.forEach(templateDep => {
                const duplicatedDep = targetDepArr.find(targetDep => templateDep.key === targetDep.key);
                if (duplicatedDep) {
                    log.verbose('查询到重复依赖：', JSON.stringify(duplicatedDep));
                    const templateRange = semver.validRange(templateDep.value)?.split('<')[1];
                    const targetRange = semver.validRange(duplicatedDep.value)?.split('<')[1];
                    if (templateRange !== targetRange) {
                        log.warn('', `${templateDep.key}冲突，${templateDep.value} => ${duplicatedDep.value}`);
                    }
                } else {
                    log.verbose('查询到新依赖：', JSON.stringify(duplicatedDep));
                    finalDep.push(templateDep);
                }
            });
            return finalDep;
        }

        // 处理依赖合并问题
        // 1. 获取package.json
        const { templatePath, targetPath } = options;
        const templatePkgPath = pkgUp.sync({ cwd: templatePath }) || '';
        const targetPkgPath = pkgUp.sync({ cwd: targetPath }) || '';
        const templatePkg = fse.readJsonSync(templatePkgPath);
        const targetPkg = fse.readJsonSync(targetPkgPath);
        // 2. 获取dependencies
        const templateDep = templatePkg.dependencies || {};
        const targetDep = targetPkg.dependencies || {};
        // 3. 将对象转化为数组
        const templateDepArr = objToArray(templateDep);
        const targetDepArr = objToArray(targetDep);
        // 4. 实现dep之间的diff
        const newDep = depDiff(templateDepArr, targetDepArr);
        targetPkg.dependencies = arrayToObj(newDep);
        fse.writeJsonSync(targetPkgPath, targetPkg, { spaces: 2 });
        // 5. 自动安装依赖
        log.info('','正在安装页面模板的依赖')
        await this.execCommand('npm install', path.dirname(targetPkgPath));
        log.success('安装页面模板依赖成功');
    }

    async ejsRender(options: { targetPath: string }) {
        const { targetPath } = options;
        const pageTemplate = this.pageTemplate;
        const { ignore } = pageTemplate;
        return new Promise((resolve, reject) => {
            glob('**', {
                cwd: targetPath,
                nodir: true,
                ignore: ignore || '',
            }, function(err, files) {
                log.verbose('files', JSON.stringify(files));
                if (err) {
                    reject(err);
                } else {
                    Promise.all(files.map(file => {
                        // 获取文件的真实路径
                        const filePath = path.resolve(targetPath, file);
                        return new Promise((resolve1, reject1) => {
                            // ejs文件渲染，重新拼接render的参数
                            ejs.renderFile(filePath, {
                                name: pageTemplate.pageName.toLocaleLowerCase(),
                            }, {}, (err, result) => {
                                if (err) {
                                    reject1(err);
                                } else {
                                    // 重新写入文件信息
                                    fse.writeFileSync(filePath, result);
                                    resolve1(result);
                                }
                            });
                        });
                    }))
                      .then(resolve)
                      .catch(e => reject(e));
                }
            });
        });
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

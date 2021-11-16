import { log, http } from '@js-cli/utils'
import exec from '@js-cli/exec'
import semver from 'semver'
import colors from 'colors'
import rootCheck from 'root-check'
import os from 'os'
import pathExists from 'path-exists'
import path from 'path'
import dotenv from 'dotenv'
import commander from 'commander'
import { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } from '../../../const'

const pkg = require('../package.json')
const userHome = os.homedir()
const program = new commander.Command()

const core = async () => {
    try {
        await prepare()
        registerCommander()
    }  catch (e) {
        if (e instanceof Error) {
            log.error('core', e.message)
        }    
    }
}

const prepare = async() => {
    checkPkgVersion()
    checkNodeVersion()
    rootCheck()
    checkUserHome()
    checkEnv()
    // await checkGlobalUpdate()
}
const checkPkgVersion = () => {
    log.info('package', pkg.version)
}

const checkNodeVersion = () => {
    const currentVersion = process.version
    const lowestVersion = LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`js-cli 需要安装 v${lowestVersion} 以上 node 版本`))
    }
    log.info('node', process.version)
}

const checkUserHome = () => {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前登录用户主目录不存在'))
    }
}

const checkEnv = async () => {
    const dotenvPath = path.resolve(userHome, '.env')
    if (pathExists.sync(dotenvPath)) {
        dotenv.config({
            path: dotenvPath
        })
    }
    createDefaultConfig()
    log.verbose('环境变量', process.env.CLI_HOME_PATH as string)
}

const createDefaultConfig = () => {
    const cliConfig = {
        home: userHome,
        cliHome: ''
    }
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome
}

const checkGlobalUpdate = async () => {
    const currentVersion = pkg.version
    const npmName = pkg.name
    const latestVersion = await http.getNpmSemverVersion(currentVersion, npmName)
    if (latestVersion && semver.gt(latestVersion, currentVersion)) {
        log.warn('checkGlobalUpdate', colors.yellow(`请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本；${latestVersion}`))
    }
}

const registerCommander = () => {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)
        .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');

    program
        .command('init [projectName]')
        .option('-f, --force', '是否强制初始化项目', false)
        .action(exec)

    program.on('option:targetPath', function() {
       process.env.CLI_TARGET_PATH = program.opts().targetPath
    })

    program.on('option:debug', function() {
        if (program.opts().debug) {
            process.env.LOG_LEVEL = 'verbose'
        } else {
            process.env.LOG_LEVEL = 'info'
        }
        log.level = process.env.LOG_LEVEL
        log.verbose('debug', '开启 debug 模式')
    })

    program.on('command:*', function(obj) {
        const availableCommands = program.commands.map(cmd => cmd.name())
        console.log(colors.red('未知命令' + obj[0]))
        if (availableCommands.length > 0) {
            console.log(colors.red('可用命令' + availableCommands.join(',')))
        }
    })

    program.parse(process.argv);

    if (program.args && program.args.length < 1) {
        program.outputHelp()
    }
}
export default core
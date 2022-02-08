import { log, http } from '@js-cli/utils'
import exec from '@js-cli/exec'
import semver from 'semver'
import colors from 'colors'
import rootCheck from 'root-check'
import os from 'os'
import _pathExists from 'path-exists'
import path from 'path'
import dotenv from 'dotenv'
import commander from 'commander'

const userHome = os.homedir()
const pathExists= _pathExists.sync
const program = new commander.Command()
const pkg = require('../package.json')
const DEFAULT_CLI_HOME = '.js-cli'

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
    rootCheck()
    checkUserHome()
    checkEnv()
    await checkGlobalUpdate()
}
const checkPkgVersion = () => {
    log.info('package', pkg.version)
}

const checkUserHome = () => {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前登录用户主目录不存在'))
    }
}

const checkEnv = () => {
    const dotenvPath = path.resolve(userHome, '.env')
    if (pathExists(dotenvPath)) {
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

    program
      .command('add [templateName]')
      .option('-f, --force', '是否强制添加模版')
      .action(exec)

    program
      .command('publish')
      .option('--refreshServer', '强制更新远程Git仓库')
      .option('--refreshToken', '强制更新远程仓库token')
      .option('--refreshOwner', '强制更新远程仓库类型')
      .option('--buildCmd <buildCmd>', '构建命令')
      .option('--prod', '是否正式发布')
      .option('--sshUser <sshUser>', '模板服务器用户名')
      .option('--sshIp <sshIp>', '模板服务器IP或域名')
      .option('--sshPath <sshPath>', '模板服务器上传路径')
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

    process.on('unhandledRejection', (reason, p) => {
        // 我刚刚捕获了一个未处理的promise rejection, 因为我们已经有了对于未处理错误的后备的处理机制（见下面）, 直接抛出，让它来处理
        console.log('unhandledRejection', reason, p);
        throw reason;
    });

    process.on('uncaughtException', (error) => {
        // 我刚收到一个从未被处理的错误，现在处理它，并决定是否需要重启应用
        console.log('uncaughtException', error);
        process.exit(1);
    });
}
export default core

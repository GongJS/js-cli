import { log, http } from '@js-cli/utils'
import semver from 'semver'
import colors from 'colors'
import rootCheck from 'root-check'
import os from 'os'
import pathExists from 'path-exists'
import path from 'path'
import dotenv from 'dotenv'
import minimist from 'minimist'
import { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } from '../../../const'

const pkg = require('../package.json')
const userHome = os.homedir()

const core = () => {
    try {
        checkPkgVersion()
        checkNodeVersion()
        rootCheck()
        checkUserHome()
        checkInputArgs()
        checkEnv()
        checkGlobalUpdate()
    }  catch (e) {
        if (e instanceof Error) {
            log.error('core', e.message)
        }    
    }
}

const checkPkgVersion = () => {
    log.info('version', pkg.version)
}

const checkNodeVersion = () => {
    const currentVersion = process.version
    const lowestVersion = LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`js-cli 需要安装 v${lowestVersion} 以上 node 版本`))
    }
    console.log(process.version)
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

const checkInputArgs = () => {
   const args = minimist(process.argv.slice(2))
   if (args.debug) {
        log.level = 'verbose'
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
}

const checkGlobalUpdate = async () => {
    const currentVersion = pkg.version
    const npmName = pkg.name
    const latestVersion = await http.getNpmSemverVersion(currentVersion, npmName)
    if (latestVersion && semver.gt(latestVersion, currentVersion)) {
        log.warn('checkGlobalUpdate', colors.yellow(`请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本；${latestVersion}`))
    }
}
export default core
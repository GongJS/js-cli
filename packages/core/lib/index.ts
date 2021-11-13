import { log } from '@js-cli/utils'
import semver from 'semver'
import colors from 'colors'
import rootCheck from 'root-check'
import os from 'os'
import pathExists from 'path-exists'
import path from 'path'
import dotenv from 'dotenv'
import { LOWEST_NODE_VERSION, DEFAULT_CLI_HOME } from '../../../const'

const pkg = require('../package.json')
const userHome = os.homedir()

const core = () => {
    try {
        checkPkgVersion()
        checkNodeVersion()
        rootCheck()
        checkUserHome()
        checkEnv()
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
export default core
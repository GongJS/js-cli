import { log } from '@js-cli/utils'
import { Package } from '@js-cli/models'
import path from 'path'

const SETTINGS = {
    init: '@js-cli/core'
}
const CACHE_DIR = 'dependencies'

const exec = async (...args: any[]) => {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH
    let storeDir = ''
    let pkg
    const cmdObj = args[args.length - 1]
    const cmdName = cmdObj.name()
    const packageName = SETTINGS[cmdName as keyof typeof SETTINGS]
    const packageVersion = 'latest'
    if(!targetPath) {
        targetPath = path.resolve(homePath!, CACHE_DIR)
        storeDir = path.resolve(targetPath, 'node_modules') // 缓存目录
        pkg = new Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        })
        if (await pkg.exists()) {
            // 更新 package
            await pkg.update()
        } else {
            // 安装 package
            await pkg.install()
        }
    } else {
        pkg = new Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        })
    }
    log.verbose('targetPath', targetPath)
    log.verbose('homePath', homePath!)
    log.verbose('storeDir', storeDir)
}

export default exec;
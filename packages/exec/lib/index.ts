import { log } from '@js-cli/utils'
import { Package } from '@js-cli/models'
const SETTINGS = {
    init: '@gdx-cli/init'
}
const exec = (...args: any[]) => {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH
    let storeDir = ''
    let pkg
    const cmdObj = args[args.length - 1]
    const cmdName = cmdObj.name()
    const packageName = SETTINGS[cmdName as keyof typeof SETTINGS]
    const packageVersion = 'latest'
    pkg = new Package({
        packageName, 
        packageVersion,
        targetPath,
        storePath: storeDir
    })
    log.verbose('targetPath', targetPath)
    log.verbose('homePath', homePath)
}

export default exec;
import { log, spawn } from '@js-cli/utils'
import { Package } from '@js-cli/models'
import path from 'path'

const SETTINGS = {
    init: '@js-cli/init',
    add: '@js-cli/add',
    publish: '@js-cli/publish'
}
const CACHE_DIR = 'dependencies'

const exec = async (..._args: any[]) => {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH
    let storeDir = ''
    let pkg
    const cmdObj = _args[_args.length - 1]
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
    const rootFile = pkg.getRootFilePath()
    if (rootFile) {
        try {
            const args = Array.from(_args)
            const cmd = args[args.length - 1]
            const o = Object.create(null)
            Object.keys(cmd).forEach(key => {
              if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
                  o[key] = cmd[key]
              }
            })
            args[args.length - 1] = o
            const code = `require('${rootFile}').${cmdName}.call(null, ${JSON.stringify(args)})`
            const child = spawn('node', ['-e', code], {
                cwd: process.cwd(),
                stdio: 'inherit'
            })
            child.on('error', (e: Error) => {
                log.error('spwan on errpr', e.message)
                process.exit(1)
            })
            child.on('exit', (e: number) => {
                log.verbose('spawn success', '命令执行成功')
                process.exit(e)
            })
        } catch (e) {
            log.error('spwan catch error', (e as Error).message)
        }
    }
}

export default exec;

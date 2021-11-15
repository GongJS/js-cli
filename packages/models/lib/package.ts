import { isObject, formatPath, http } from '@js-cli/utils'
import pkgDir from 'pkg-dir'
import path from 'path'
interface PackageOptions {
    targetPath: string;
    storeDir: string;
    packageName: string;
    packageVersion: string;
}
const npminstall = require('npminstall')
class Package {
    public targetPath: string;
    public storeDir: string;
    public packageName: string;
    public packageVersion: string;
    constructor(options: PackageOptions) {
        if (!options) {
            throw new Error('Package 类的 options 参数不能为空')
        }
        if (!isObject(options)) {
            throw new Error('Package 类的 options 参数必需为对象')
        }
        this.targetPath = options.targetPath;
        this.storeDir = options.storeDir;
        this.packageName = options.packageName;
        this.packageVersion = options.packageVersion;
    }

    exists() {
        return false
    }

    install() {
        return npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: http.getDefaultRegistry(),
            pkgs: [
                {name: this.packageName, version: this.packageVersion}
            ]
        })
    }

    update() {

    }
    
    getRootFilePath() {
        const dir = pkgDir.sync(this.targetPath)
        if (dir) {
            const pkgFile = require(path.join(dir, 'package.json'))
            if (pkgFile && pkgFile.main) {
                return formatPath(path.resolve(dir, pkgFile.main))
            }
        }
        return null
    }
}

export default Package
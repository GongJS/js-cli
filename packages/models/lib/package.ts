import { isObject, formatPath } from '@js-cli/utils'
import pkgDir from 'pkg-dir'
import path from 'path'
interface PackageOptions {
    targetPath: string;
    packageName: string;
    packageVersion: string;
}
class Package {
    public targetPath: string;
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
        this.packageName = options.packageName;
        this.packageVersion = options.packageVersion;
    }

    exists() {

    }

    install() {

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
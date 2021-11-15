import { isObject } from '@js-cli/utils'

interface PackageOptions {
    targetPath: string;
    storePath: string;
    packageName: string;
    packageVersion: string;
}
class Package {
    public tatgetPath: string;
    public storePath: string;
    public packageName: string;
    public packageVersion: string;
    constructor(options: PackageOptions) {
        if (!options) {
            throw new Error('Package 类的 options 参数不能为空')
        }
        if (!isObject(options)) {
            throw new Error('Package 类的 options 参数必需为对象')
        }
        this.tatgetPath = options.targetPath;
        this.storePath = options.storePath;
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
        
    }
}

export default Package
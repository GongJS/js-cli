import { isObject, formatPath, http } from '@js-cli/utils'
import pkgDir from 'pkg-dir'
import path from 'path'
import pathExists from 'path-exists'
import fse from 'fs-extra'
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
    public cacheFilePathPrefix: string;
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
        this.cacheFilePathPrefix = this.packageName.replace('/', '_')
    }

    async exists() {
        if (this.storeDir) {
            await this.prepare()
            return pathExists(this.cacheFilePath)
        } else {
            return pathExists(this.targetPath)
        }
    }

    async prepare() {
        if (this.storeDir && !pathExists(this.storeDir)) {
            fse.mkdirpSync(this.storeDir)
        }
        if (this.packageVersion === 'latest') {
            this.packageVersion = await http.getNpmLatestVersion(this.packageName)
        }
    }

    getSpecificCacheFilePath(packageVersion: string) {
        return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`)
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

    async update() {
        await this.prepare()
        const latestPackageVersion = await http.getNpmLatestVersion(this.packageName)
        const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion)
        if (!pathExists(latestFilePath)) {
            await npminstall({
                root: this.targetPath,
                storeDir: this.storeDir,
                registry: http.getDefaultRegistry(),
                pkgs: [
                    {name: this.packageName, version: latestPackageVersion}
                ]
            })
            this.packageVersion = latestPackageVersion
        } else {
            this.packageVersion = latestPackageVersion
        }
    }

    get cacheFilePath() {
        return path.resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`)
    }
    
    private _getRootFilePath(targetPath: string) {
        const dir = pkgDir.sync(targetPath)
        if (dir) {
            const pkgFile = require(path.resolve(dir, 'package.json'))
            if (pkgFile && pkgFile.main) {
                return path.resolve(dir, pkgFile.main)
            }
        }
        return null
    }
    getRootFilePath() {
        if (this.storeDir) {
            return this._getRootFilePath(this.cacheFilePath)
        } else {
           return this._getRootFilePath(this.targetPath)
        }
    }
}

export default Package
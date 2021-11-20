interface PackageOptions {
    targetPath: string;
    storeDir: string;
    packageName: string;
    packageVersion: string;
}
declare class Package {
    targetPath: string;
    storeDir: string;
    packageName: string;
    packageVersion: string;
    cacheFilePathPrefix: string;
    constructor(options: PackageOptions);
    exists(): Promise<boolean>;
    prepare(): Promise<void>;
    getSpecificCacheFilePath(packageVersion: string): string;
    install(): any;
    update(): Promise<void>;
    get cacheFilePath(): string;
    private _getRootFilePath;
    getRootFilePath(): string | null;
}
export default Package;

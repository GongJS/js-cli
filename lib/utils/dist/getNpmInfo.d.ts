export interface NpmInfoData {
    versions: string[];
}
export declare const getDefaultRegistry: (isOriginal?: boolean) => "https://registry.npm.taobao.org" | "https://registry.npmjs.org";
export declare const getNpmSemverVersion: (baseVersion: string, npmName: string, registry?: string) => Promise<string | null>;
export declare const getNpmLatestVersion: (npmName: string, registry?: string) => Promise<string>;

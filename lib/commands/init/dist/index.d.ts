import { Command } from '@js-cli/models';
export interface ProjectInfoType {
    projectName: string;
    name: string;
    className: string;
    version: string;
    projectVersion: string;
    description: string;
    componentDescription: string;
    dir: string;
}
interface TemplateInfoType {
    name: string;
    npmName: string;
    version: string;
    type: 'normal' | 'custom';
    installCommand: string;
    startCommand: string;
    tag: string[];
    ignore: string[];
}
interface TemplateNpmInfoType {
    exists: () => Promise<boolean>;
    install: () => void;
    update: () => void;
    getRootFilePath: () => string | null;
    cacheFilePath: string;
}
declare class InitCommand extends Command {
    projectName: string;
    force: boolean;
    projectInfo: any;
    template: TemplateInfoType[];
    templateInfo: TemplateInfoType;
    templateNpm: TemplateNpmInfoType;
    constructor(args: any[]);
    init(): void;
    exec(): Promise<void>;
    downloadTemplate(): Promise<void>;
    installTemplate(): Promise<void>;
    installNormalTemplate(): Promise<void>;
    installCustomTemplate(): Promise<void>;
    execCommand(command: string, errMsg: string): Promise<void>;
    checkCommand(cmd: string): string | null;
    ejsRender(options: {
        ignore: string[];
    }): Promise<unknown>;
    createTemplateChoices(): {
        value: string;
        name: string;
    }[];
    prepare(): Promise<Partial<ProjectInfoType> | undefined>;
    getProjectInfo(): Promise<Partial<ProjectInfoType>>;
    isDirEmpty(localPath: string): boolean;
}
declare const init: (...args: any[]) => InitCommand;
export { init };
export default init;

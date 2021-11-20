declare abstract class Command {
    _argv: any[];
    _cmd: any;
    constructor(argv: any[]);
    abstract init(): void;
    abstract exec(): void;
    initArgs(): void;
    checkNodeVersion(): void;
}
export default Command;

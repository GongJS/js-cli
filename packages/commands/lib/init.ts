import { Command } from '@js-cli/models'
import { log } from '@js-cli/utils'

class InitCommand extends Command {
    public projectName: string
    public force: boolean
    constructor(args: any[]) {
        super(args)
        this.projectName = ''
        this.force = false
    }
    init () {
        this.projectName = this._argv[0] || ''
        this.force = !!this._cmd.force
        log.verbose('projectName', this.projectName)
        log.verbose('force', this.force.toString())
    }
    exec() {
        
    }
}

const init = (...args: any[]) => {
    return new InitCommand(args)
}

export default init
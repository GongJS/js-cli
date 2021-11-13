import { log } from '@js-cli/utils'
const pkg = require('../package.json')

const core = () => {
    checkPkgVersion()
}

const checkPkgVersion = () => {
    log.info('js-cli', pkg.version)
}

export default core
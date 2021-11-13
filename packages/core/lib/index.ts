import { log } from '@js-cli/utils'
import semver from 'semver'
import colors from 'colors'
import { LOWEST_NODE_VERSION} from '../../../const'
const pkg = require('../package.json')

const core = () => {
    checkPkgVersion()
    checkNodeVersion()
}

const checkPkgVersion = () => {
    log.info('js-cli', pkg.version)
}

const checkNodeVersion = () => {
    const currentVersion = process.version
    const lowestVersion = LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`js-cli 需要安装 v${lowestVersion} 以上 node 版本`))
    }
    console.log(process.version)
}
export default core
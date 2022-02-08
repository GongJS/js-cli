import { log } from '@js-cli/utils'
import semver from 'semver'
const LOWEST_NODE_VERSION = '12.0.0'
abstract class Command {
  public _argv: any[]
  public _cmd: any
  protected constructor(argv: any[]) {
    this._cmd = ''
    if (!argv) {
      throw new Error('参数不能为空')
    }
    if (!Array.isArray(argv)) {
      throw new Error('参数类型必需为数组')
    }
    if (argv.length < 1) {
      throw new Error('参数列表为空')
    }
    this._argv = argv
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve()
      chain = chain.then(() => {this.checkNodeVersion()})
      chain = chain.then(() => this.initArgs())
      chain = chain.then(() => this.init())
      chain = chain.then(() => this.exec())
      chain.catch(err => log.error('command constructor', err.message))
    })
  }
  abstract init(): void
  abstract exec(): void

  initArgs() {
    this._cmd = this._argv[this._argv.length - 1]
    this._argv = this._argv.slice(0, this._argv.length - 1)
  }

  checkNodeVersion() {
    const currentVersion = process.version
    const lowestVersion = LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
      throw new Error(log.warn('checkNodeVersion',  `js-cli 需要安装 v${lowestVersion} 以上 node 版本`)!)
    }
    console.log(process.version)
  }
}

export default Command

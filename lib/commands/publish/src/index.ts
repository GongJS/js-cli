import { Command } from '@js-cli/models'
import { log } from '@js-cli/utils'
import fse from 'fs-extra'
import fs from 'fs';
import path from 'path'
import { ProjectInfoType } from '@js-cli/init'

class PublishCommand extends Command {
  public projectInfo: Partial<ProjectInfoType>

  constructor(args: any[]) {
    super(args)
    this.projectInfo = {}
  }

  init() {
    // 处理参数
    log.verbose('init', this._argv);
  }

  async exec() {
    try {
      const startTime = new Date().getTime();
      // 1.初始化检查
      this.prepare();
      // 2.Git Flow自动化
      // 3.云构建和云发布
      const endTime = new Date().getTime();
      log.info('本次发布耗时：', Math.floor((endTime - startTime) / 1000) + '秒');
    } catch (e) {
      log.error('publish exec', e.message);
      if (process.env.LOG_LEVEL === 'verbose') {
        console.log(e);
      }
    }
  }

  prepare() {
    // 1.确认项目是否为npm项目
    const projectPath = process.cwd();
    const pkgPath = path.resolve(projectPath, 'package.json');
    log.verbose('package.json', pkgPath);
    if (!fs.existsSync(pkgPath)) {
      throw new Error('package.json不存在！');
    }
    // 2.确认是否包含name、version、build命令
    const pkg = fse.readJsonSync(pkgPath);
    const { name, version, scripts } = pkg;
    log.verbose('package.json', name, version, scripts);
    if (!name || !version || !scripts || !scripts.build) {
      throw new Error('package.json信息不全，请检查是否存在name、version和scripts（需提供build命令）！');
    }
    this.projectInfo = { name, version, dir: projectPath };
  }
}
const publish = (...args: any[]) => {
    return new PublishCommand(args)
  }
export { publish }
export default publish

import io, { Socket } from 'socket.io-client';
import { log, request } from '@js-cli/utils';
import { get } from 'lodash';
import inquirer from 'inquirer'

const WS_SERVER = 'http://1.116.156.44:8085';
const TIME_OUT = 5 * 60 * 1000;
const CONNECT_TIME_OUT = 5 * 1000;

const FAILED_CODE = ['prepare failed', 'download failed', 'install failed', 'build failed', 'pre-publish failed', 'publish failed'];
type MsgType = {
  data: {
    action: string,
    payload: {
      message: string
    }
  }
}
function parseMsg(msg: MsgType) {
  const action = get(msg, 'data.action');
  const message = get(msg, 'data.payload.message');
  return {
    action,
    message,
  };
}

class CloudBuild {
  public git: any
  public buildCmd: string
  public timeout: number
  public timer!: NodeJS.Timeout
  public socket!:  typeof Socket
  public prod: string
  constructor(git: any, options: any) {
    this.git = git;
    this.buildCmd = options.buildCmd;
    this.timeout = TIME_OUT;
    this.prod = options.prod;
  }

  doTimeout(fn: Function, timeout: number) {
    this.timer && clearTimeout(this.timer);
    log.info('', '设置任务超时时间：', `${timeout / 1000}秒`);
    this.timer = setTimeout(fn, timeout) as unknown as NodeJS.Timeout;
  }

  init() {
    return new Promise((resolve, reject) => {
      const socket = io(WS_SERVER, {
        query: {
          repo: this.git.remote,
          name: this.git.name,
          branch: this.git.branch,
          version: this.git.version,
          buildCmd: this.buildCmd,
          prod: this.prod,
        },
      });
      socket.on('connect', () => {
        clearTimeout(this.timer);
        const { id } = socket;
        log.success('云构建任务创建成功', `任务ID: ${id}`);
        socket.on(id, (msg: MsgType) => {
          const parsedMsg = parseMsg(msg);
          log.success(parsedMsg.action, parsedMsg.message);
        });
        resolve(null);
      });
      const disconnect = () => {
        clearTimeout(this.timer);
        socket.disconnect();
        socket.close();
      };
      this.doTimeout(() => {
        log.error('','云构建服务连接超时，自动终止');
        disconnect();
      }, CONNECT_TIME_OUT);
      socket.on('disconnect', () => {
        log.success('disconnect', '云构建任务断开');
        disconnect();
      });
      socket.on('error', (err: Error) => {
        log.error('error', '云构建出错！', err);
        disconnect();
        reject(err);
      });
      this.socket = socket;
    });
  }
  async prepare() {
    // 判断是否处于正式发布
    if (this.prod) {
      // 1.获取OSS文件
      const projectName = this.git.name;
      const projectType = this.prod ? 'prod' : 'dev';
      const ossProject = (await request({
        url: '/project/oss',
        params: {
          name: projectName,
          type: projectType,
        },
      })) as any;
      // 2.判断当前项目的OSS文件是否存在
      if (ossProject.code === 0 && ossProject.data.length > 0) {
        // 3.询问用户是否进行覆盖安装
        const cover = (await inquirer.prompt({
          type: 'list',
          name: 'cover',
          choices: [{
            name: '覆盖发布',
            value: true,
          }, {
            name: '放弃发布',
            value: false,
          }],
          default: true,
          message: `OSS已存在 [${projectName}] 项目，是否强行覆盖发布？`,
        })).cover;
        if (!cover) {
          throw new Error('发布终止');
        }
      }
    }
  }

  build() {
    return new Promise((resolve, reject) => {
      let ret = true;
      this.socket.emit('build');
      this.socket.on('build', (msg: MsgType) => {
        const parsedMsg = parseMsg(msg);
        if (FAILED_CODE.indexOf(parsedMsg.action) >= 0) {
          ret = false;
          log.error(parsedMsg.action, parsedMsg.message);
          clearTimeout(this.timer);
          this.socket.disconnect();
          this.socket.close();
          resolve(ret);
        } else {
          log.success(parsedMsg.action, parsedMsg.message);
        }
      });
      this.socket.on('building', (msg: MsgType) => {
        console.log(msg);
      });
      this.socket.on('disconnect', () => {
        resolve(ret);
      });
      this.socket.on('error', (err: Error) => {
        reject(err);
      });
    });
  }
}

export default CloudBuild

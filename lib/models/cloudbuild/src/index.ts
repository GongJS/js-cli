import io, { Socket } from 'socket.io-client';
import { log } from '@js-cli/utils';
import { get } from 'lodash';

const WS_SERVER = 'http://1.116.156.44:8085';
const TIME_OUT = 5 * 60 * 1000;
const CONNECT_TIME_OUT = 5 * 1000;

const FAILED_CODE = ['prepare failed', 'download failed', 'install failed', 'build failed'];
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
  constructor(git: any, options: any) {
    this.git = git;
    this.buildCmd = options.buildCmd;
    this.timeout = TIME_OUT;
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
      socket.on('error', (err) => {
        log.error('error', '云构建出错！', err);
        disconnect();
        reject(err);
      });
      this.socket = socket;
    });
  }

  build() {
    return new Promise((resolve, reject) => {
      this.socket.emit('build');
      this.socket.on('build', (msg: MsgType) => {
        const parsedMsg = parseMsg(msg);
        if (FAILED_CODE.indexOf(parsedMsg.action) >= 0) {
          log.error(parsedMsg.action, parsedMsg.message);
          clearTimeout(this.timer);
          this.socket.disconnect();
          this.socket.close();
        } else {
          log.success(parsedMsg.action, parsedMsg.message);
        }
      });
      this.socket.on('building', (msg: MsgType) => {
        console.log(msg);
      });
    });
  }
}

export default CloudBuild

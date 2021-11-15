import log from './log';
import * as http from './getNpmInfo'

const isObject = (o: any) => {
    return Object.prototype.toString.call(o) === '[object Object]'
}
export { log, http, isObject };
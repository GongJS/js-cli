import path from 'path'
import log from './log';
import * as http from './getNpmInfo'

const isObject = (o: any) => {
    return Object.prototype.toString.call(o) === '[object Object]'
}

const formatPath = (p: string) => {
    if (p && typeof p === "string") {
        const sep = path.sep
        if (sep === '/') {
            return p
        } else {
            return p.replace(/\\/g, '/')
        }
    }
    return p
}
export { log, http, isObject, formatPath };
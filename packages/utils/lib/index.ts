import path from 'path'
import cp from 'child_process'
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

const exec = (command: string, args: string[], options = {}) => {
    const win32 = process.platform === 'win32'
    const cmd = win32 ? 'cmd' : command
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args
    return cp.spawn(cmd, cmdArgs, options || {})
}

const execAsync = (command: string, args: string[], options = {}) => {
    return new Promise(((resolve, reject) => {
        const p = exec(command, args, options)
        p.on('error', e => {
            reject(e)
        })
        p.on('exit', c => {
            resolve(c)
        })
    }))
}
export { log, http, isObject, formatPath, exec, execAsync };
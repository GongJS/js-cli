import path from 'path'
import cp from 'child_process'
import log from './log';
import * as http from './getNpmInfo'

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;

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

const spawn = (command: string, args: string[], options = {}) => {
    const win32 = process.platform === 'win32'
    const cmd = win32 ? 'cmd' : command
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args
    return cp.spawn(cmd, cmdArgs, options || {})
}

const execAsync = (command: string, args: string[], options = {}) => {
    return new Promise(((resolve, reject) => {
        const p = spawn(command, args, options)
        p.on('error', e => {
            reject(e)
        })
        p.on('exit', c => {
            resolve(c)
        })
    }))
}

const spinnerStart = (msg = 'loading', spinnerString = '|/-\\') => {
    const Spinner = require('cli-spinner').Spinner
    const spinner = new Spinner(msg + '%s')
    spinner.setSpinnerString(spinnerString)
    spinner.start()
    return spinner
}

const sleep = () => {
    new Promise(resolve => setTimeout(resolve, 1000))
}


const kebabCase = (str: string) => {
	return str.replace(KEBAB_REGEX, function (match) {
		return '-' + match.toLowerCase();
	});
};

export { log, http, isObject, formatPath, spawn, execAsync, spinnerStart, sleep, kebabCase };
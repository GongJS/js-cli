'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var cp = require('child_process');
var log = require('npmlog');
var axios = require('axios');
var urlJoin = require('url-join');
var semver = require('semver');
var semverSort = require('semver-sort');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var cp__default = /*#__PURE__*/_interopDefaultLegacy(cp);
var log__default = /*#__PURE__*/_interopDefaultLegacy(log);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var urlJoin__default = /*#__PURE__*/_interopDefaultLegacy(urlJoin);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);
var semverSort__default = /*#__PURE__*/_interopDefaultLegacy(semverSort);

log__default["default"].level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log__default["default"].heading = 'js-cli';
log__default["default"].addLevel('success', 2000, { fg: 'green', bold: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const getNpmInfo = (npmName, registry) => {
    if (!npmName) {
        return null;
    }
    const registryUrl = registry || getDefaultRegistry();
    const npmInfoUrl = urlJoin__default["default"](registryUrl, npmName);
    return axios__default["default"].get(npmInfoUrl).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    }).catch((err) => {
        return Promise.reject(err);
    });
};
const getDefaultRegistry = (isOriginal = false) => {
    return isOriginal ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org';
};
const getNpmVersions = (appName, registry = '') => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getNpmInfo(appName, registry);
    if (data) {
        return Object.keys(data.versions);
    }
    else {
        return [];
    }
});
const getNpmSemverVersion = (baseVersion, npmName, registry = '') => __awaiter(void 0, void 0, void 0, function* () {
    const versions = yield getNpmVersions(npmName, registry);
    const newVersions = getSemverVersions(baseVersion, versions);
    if (newVersions && newVersions.length > 0) {
        return newVersions[0];
    }
    return null;
});
const getSemverVersions = (baseVersion, versions) => {
    return semverSort__default["default"].desc(versions.filter(version => semver__default["default"].satisfies(version, `^${baseVersion}`)));
};
const getNpmLatestVersion = (npmName, registry = '') => __awaiter(void 0, void 0, void 0, function* () {
    const versions = yield getNpmVersions(npmName);
    if (versions) {
        return semverSort__default["default"].desc(versions)[0];
    }
    return '';
});

var getNpmInfo$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDefaultRegistry: getDefaultRegistry,
    getNpmSemverVersion: getNpmSemverVersion,
    getNpmLatestVersion: getNpmLatestVersion
});

const BASE_URL = process.env.JS_CLI_BASE_URL ? process.env.JS_CLI_BASE_URL : 'http://1.116.156.44:8085';
const request = axios__default["default"].create({
    baseURL: BASE_URL,
    timeout: 30000,
});
request.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data;
    }
}, (error) => {
    return Promise.reject(error);
});

var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
const isObject = (o) => {
    return Object.prototype.toString.call(o) === '[object Object]';
};
const formatPath = (p) => {
    if (p && typeof p === "string") {
        const sep = path__default["default"].sep;
        if (sep === '/') {
            return p;
        }
        else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
};
const spawn = (command, args, options = {}) => {
    const win32 = process.platform === 'win32';
    const cmd = win32 ? 'cmd' : command;
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
    return cp__default["default"].spawn(cmd, cmdArgs, options || {});
};
const execSpawn = (command, args, options = {}) => {
    return new Promise(((resolve, reject) => {
        const p = spawn(command, args, options);
        p.on('error', e => {
            reject(e);
        });
        p.on('exit', c => {
            resolve(c);
        });
    }));
};
const spinnerStart = (msg = 'loading', spinnerString = '|/-\\') => {
    const Spinner = require('cli-spinner').Spinner;
    const spinner = new Spinner(msg + '%s');
    spinner.setSpinnerString(spinnerString);
    spinner.start();
    return spinner;
};
const sleep = () => {
    new Promise(resolve => setTimeout(resolve, 1000));
};
const kebabCase = (str) => {
    return str.replace(KEBAB_REGEX, function (match) {
        return '-' + match.toLowerCase();
    });
};

Object.defineProperty(exports, 'log', {
    enumerable: true,
    get: function () { return log__default["default"]; }
});
exports.execSpawn = execSpawn;
exports.formatPath = formatPath;
exports.http = getNpmInfo$1;
exports.isObject = isObject;
exports.kebabCase = kebabCase;
exports.request = request;
exports.sleep = sleep;
exports.spawn = spawn;
exports.spinnerStart = spinnerStart;

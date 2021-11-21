'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@js-cli/utils');
var pkgDir = require('pkg-dir');
var path = require('path');
var _pathExists = require('path-exists');
var fse = require('fs-extra');
var semver = require('semver');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var pkgDir__default = /*#__PURE__*/_interopDefaultLegacy(pkgDir);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var _pathExists__default = /*#__PURE__*/_interopDefaultLegacy(_pathExists);
var fse__default = /*#__PURE__*/_interopDefaultLegacy(fse);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);

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

const npminstall = require('npminstall');
const pathExists = _pathExists__default["default"].sync;
class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package 类的 options 参数不能为空');
        }
        if (!utils.isObject(options)) {
            throw new Error('Package 类的 options 参数必需为对象');
        }
        this.targetPath = options.targetPath;
        this.storeDir = options.storeDir;
        this.packageName = options.packageName;
        this.packageVersion = options.packageVersion;
        this.cacheFilePathPrefix = this.packageName.replace('/', '_');
    }
    exists() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storeDir) {
                yield this.prepare();
                return pathExists(this.cacheFilePath);
            }
            else {
                return pathExists(this.targetPath);
            }
        });
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storeDir && !pathExists(this.storeDir)) {
                fse__default["default"].mkdirpSync(this.storeDir);
            }
            if (this.packageVersion === 'latest') {
                this.packageVersion = yield utils.http.getNpmLatestVersion(this.packageName);
            }
        });
    }
    getSpecificCacheFilePath(packageVersion) {
        return path__default["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${packageVersion}@${this.packageName}`);
    }
    install() {
        return npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: utils.http.getDefaultRegistry(),
            pkgs: [
                { name: this.packageName, version: this.packageVersion }
            ]
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prepare();
            const latestPackageVersion = yield utils.http.getNpmLatestVersion(this.packageName);
            const latestFilePath = this.getSpecificCacheFilePath(latestPackageVersion);
            if (!pathExists(latestFilePath)) {
                yield npminstall({
                    root: this.targetPath,
                    storeDir: this.storeDir,
                    registry: utils.http.getDefaultRegistry(),
                    pkgs: [
                        { name: this.packageName, version: latestPackageVersion }
                    ]
                });
                this.packageVersion = latestPackageVersion;
            }
            else {
                this.packageVersion = latestPackageVersion;
            }
        });
    }
    get cacheFilePath() {
        return path__default["default"].resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.packageVersion}@${this.packageName}`);
    }
    _getRootFilePath(targetPath) {
        const dir = pkgDir__default["default"].sync(targetPath);
        if (dir) {
            const pkgFile = require(path__default["default"].resolve(dir, 'package.json'));
            if (pkgFile && pkgFile.main) {
                return path__default["default"].resolve(dir, pkgFile.main);
            }
        }
        return null;
    }
    getRootFilePath() {
        if (this.storeDir) {
            return this._getRootFilePath(this.cacheFilePath);
        }
        else {
            return this._getRootFilePath(this.targetPath);
        }
    }
}

const LOWEST_NODE_VERSION = '12.0.0';
class Command {
    constructor(argv) {
        this._cmd = '';
        if (!argv) {
            throw new Error('参数不能为空');
        }
        if (!Array.isArray(argv)) {
            throw new Error('参数类型必需为数组');
        }
        if (argv.length < 1) {
            throw new Error('参数列表为空');
        }
        this._argv = argv;
        new Promise((resolve, reject) => {
            let chain = Promise.resolve();
            chain = chain.then(() => { this.checkNodeVersion(); });
            chain = chain.then(() => this.initArgs());
            chain = chain.then(() => this.init());
            chain = chain.then(() => this.exec());
            chain.catch(err => utils.log.error('command constructor', err.message));
        });
    }
    initArgs() {
        this._cmd = this._argv[this._argv.length - 1];
        this._argv = this._argv.slice(0, this._argv.length - 1);
    }
    checkNodeVersion() {
        const currentVersion = process.version;
        const lowestVersion = LOWEST_NODE_VERSION;
        if (!semver__default["default"].gte(currentVersion, lowestVersion)) {
            throw new Error(utils.log.warn('checkNodeVersion', `js-cli 需要安装 v${lowestVersion} 以上 node 版本`));
        }
        console.log(process.version);
    }
}

exports.Command = Command;
exports.Package = Package;
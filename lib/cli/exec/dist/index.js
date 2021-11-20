'use strict';

var utils = require('@js-cli/utils');
var models = require('@js-cli/models');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

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

const SETTINGS = {
    init: '@js-cli/init'
};
const CACHE_DIR = 'dependencies';
const exec = (..._args) => __awaiter(void 0, void 0, void 0, function* () {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
    let storeDir = '';
    let pkg;
    const cmdObj = _args[_args.length - 1];
    const cmdName = cmdObj.name();
    const packageName = SETTINGS[cmdName];
    const packageVersion = 'latest';
    if (!targetPath) {
        targetPath = path__default["default"].resolve(homePath, CACHE_DIR);
        storeDir = path__default["default"].resolve(targetPath, 'node_modules'); // 缓存目录
        pkg = new models.Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        });
        if (yield pkg.exists()) {
            // 更新 package
            yield pkg.update();
        }
        else {
            // 安装 package
            yield pkg.install();
        }
    }
    else {
        pkg = new models.Package({
            targetPath,
            storeDir,
            packageName,
            packageVersion
        });
    }
    utils.log.verbose('targetPath', targetPath);
    utils.log.verbose('homePath', homePath);
    utils.log.verbose('storeDir', storeDir);
    const rootFile = pkg.getRootFilePath();
    if (rootFile) {
        try {
            const args = Array.from(_args);
            const cmd = args[args.length - 1];
            const o = Object.create(null);
            Object.keys(cmd).forEach(key => {
                if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
                    o[key] = cmd[key];
                }
            });
            args[args.length - 1] = o;
            const code = `require('${rootFile}').init.call(null, ${JSON.stringify(args)})`;
            const child = utils.spawn('node', ['-e', code], {
                cwd: process.cwd(),
                stdio: 'inherit'
            });
            child.on('error', (e) => {
                utils.log.error('spwan on errpr', e.message);
                process.exit(1);
            });
            child.on('exit', (e) => {
                utils.log.verbose('spawn success', '命令执行成功');
                process.exit(e);
            });
        }
        catch (e) {
            utils.log.error('spwan catch error', e.message);
        }
    }
});

module.exports = exec;

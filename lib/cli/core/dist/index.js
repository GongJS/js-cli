'use strict';

var utils = require('@js-cli/utils');
var exec = require('@js-cli/exec');
require('semver');
var colors = require('colors');
var rootCheck = require('root-check');
var os = require('os');
var _pathExists = require('path-exists');
var path = require('path');
var dotenv = require('dotenv');
var commander = require('commander');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var exec__default = /*#__PURE__*/_interopDefaultLegacy(exec);
var colors__default = /*#__PURE__*/_interopDefaultLegacy(colors);
var rootCheck__default = /*#__PURE__*/_interopDefaultLegacy(rootCheck);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var _pathExists__default = /*#__PURE__*/_interopDefaultLegacy(_pathExists);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var commander__default = /*#__PURE__*/_interopDefaultLegacy(commander);

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

const userHome = os__default["default"].homedir();
const pathExists = _pathExists__default["default"].sync;
const program = new commander__default["default"].Command();
const pkg = require('../package.json');
const DEFAULT_CLI_HOME = '.js-cli';
const core = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prepare();
        registerCommander();
    }
    catch (e) {
        if (e instanceof Error) {
            utils.log.error('core', e.message);
        }
    }
});
const prepare = () => __awaiter(void 0, void 0, void 0, function* () {
    checkPkgVersion();
    rootCheck__default["default"]();
    checkUserHome();
    checkEnv();
    // await checkGlobalUpdate()
});
const checkPkgVersion = () => {
    utils.log.info('package', pkg.version);
};
const checkUserHome = () => {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors__default["default"].red('当前登录用户主目录不存在'));
    }
};
const checkEnv = () => __awaiter(void 0, void 0, void 0, function* () {
    const dotenvPath = path__default["default"].resolve(userHome, '.env');
    if (pathExists(dotenvPath)) {
        dotenv__default["default"].config({
            path: dotenvPath
        });
    }
    createDefaultConfig();
    utils.log.verbose('环境变量', process.env.CLI_HOME_PATH);
});
const createDefaultConfig = () => {
    const cliConfig = {
        home: userHome,
        cliHome: ''
    };
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path__default["default"].join(userHome, process.env.CLI_HOME);
    }
    else {
        cliConfig['cliHome'] = path__default["default"].join(userHome, DEFAULT_CLI_HOME);
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome;
};
const registerCommander = () => {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)
        .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');
    program
        .command('init [projectName]')
        .option('-f, --force', '是否强制初始化项目', false)
        .action(exec__default["default"]);
    program.on('option:targetPath', function () {
        process.env.CLI_TARGET_PATH = program.opts().targetPath;
    });
    program.on('option:debug', function () {
        if (program.opts().debug) {
            process.env.LOG_LEVEL = 'verbose';
        }
        else {
            process.env.LOG_LEVEL = 'info';
        }
        utils.log.level = process.env.LOG_LEVEL;
        utils.log.verbose('debug', '开启 debug 模式');
    });
    program.on('command:*', function (obj) {
        const availableCommands = program.commands.map(cmd => cmd.name());
        console.log(colors__default["default"].red('未知命令' + obj[0]));
        if (availableCommands.length > 0) {
            console.log(colors__default["default"].red('可用命令' + availableCommands.join(',')));
        }
    });
    program.parse(process.argv);
    if (program.args && program.args.length < 1) {
        program.outputHelp();
    }
};

module.exports = core;

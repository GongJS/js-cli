import { log } from '@js-cli/utils';
import exec from '@js-cli/exec';
import 'semver';
import colors from 'colors';
import rootCheck from 'root-check';
import os from 'os';
import _pathExists from 'path-exists';
import path from 'path';
import dotenv from 'dotenv';
import commander from 'commander';

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

const userHome = os.homedir();
const pathExists = _pathExists.sync;
const program = new commander.Command();
const pkg = require('../package.json');
const DEFAULT_CLI_HOME = '.js-cli';
const core = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prepare();
        registerCommander();
    }
    catch (e) {
        if (e instanceof Error) {
            log.error('core', e.message);
        }
    }
});
const prepare = () => __awaiter(void 0, void 0, void 0, function* () {
    checkPkgVersion();
    rootCheck();
    checkUserHome();
    checkEnv();
    // await checkGlobalUpdate()
});
const checkPkgVersion = () => {
    log.info('package', pkg.version);
};
const checkUserHome = () => {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前登录用户主目录不存在'));
    }
};
const checkEnv = () => __awaiter(void 0, void 0, void 0, function* () {
    const dotenvPath = path.resolve(userHome, '.env');
    if (pathExists(dotenvPath)) {
        dotenv.config({
            path: dotenvPath
        });
    }
    createDefaultConfig();
    log.verbose('环境变量', process.env.CLI_HOME_PATH);
});
const createDefaultConfig = () => {
    const cliConfig = {
        home: userHome,
        cliHome: ''
    };
    if (process.env.CLI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
    }
    else {
        cliConfig['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME);
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
        .action(exec);
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
        log.level = process.env.LOG_LEVEL;
        log.verbose('debug', '开启 debug 模式');
    });
    program.on('command:*', function (obj) {
        const availableCommands = program.commands.map(cmd => cmd.name());
        console.log(colors.red('未知命令' + obj[0]));
        if (availableCommands.length > 0) {
            console.log(colors.red('可用命令' + availableCommands.join(',')));
        }
    });
    program.parse(process.argv);
    if (program.args && program.args.length < 1) {
        program.outputHelp();
    }
};

export { core as default };

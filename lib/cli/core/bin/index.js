#! /usr/bin/env node

const importLocal = require('import-local')
if (importLocal(__filename)) {
    console.info('js-cli', '正在使用本地版本')
} else {
    require('../dist')(process.argv.slice(2))
}
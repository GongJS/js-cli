# js-cli

一个基于 `rush`、`pnpm`、`node` 、`typescript` 开发的高性能、易扩展脚手架。

<figure>
    <a href="https://github.com/vuese/vuese/actions"><img src="https://github.com/vuese/vuese/workflows/Node%20CI/badge.svg" alt="build status"/></a>
  <a href="https://github.com/vue-contrib/vuese/blob/monorepo/LICENSE"><img src="https://img.shields.io/github/license/vuese/vuese.svg" alt="License"/></a>
  <a href="https://github.com/vue-contrib/vuese/pull/new"><img src="https://img.shields.io/badge/PRs%20-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"/></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Code style"/></a>
  <a href="https://www.patreon.com/HcySunYang"><img src="https://badgen.net/badge/support%20me/donate/ff00ff" alt="Support me"/></a>
</figure>

## 安装

```shell
npm install @js-cli/core -g or yarn add @js-cli/core -g
```
## 共建

1. Fork 源码
2. 新建分支 `git checkout -b my-new-feature`
3. commit 代码 `git commit`
4. 推送分支: `git push origin my-new-feature`
5. 提 pr

## 开发
在根目录下执行：
1. `rush update` 安装依赖
2. `rush build` ts 转 js
3. `cd lib/cli/core` 进入到脚手架入口目录
4. `pnpm link -g` 注册全局命令 `js-cli`

> 若对 `pnpm`、`rush.js` 不熟悉，请参考 [rush + pnpm + ts + monorepo 脚手架开发之环境篇一](https://juejin.cn/post/7034111809728544799)

## 使用
```
js-cli 命令
```
目前已开发完的命令有:
- `js-cli init`: 根据模版初始化项目
- `js-cli add`: 在项目中添加页面
- `js-cli publish`: 发布项目

更详细的用法请参考文档 [js-cli](https://gongjs.github.io/js-cli/)
> 命令执行成功后，会在用户根目录下创建 `.js-cli` 文件夹用来缓存脚手架相关依赖及安装的模版，后续用户在使用时会自动检测(脚手架、模版)版本并更新到最新版本。

## PR [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

欢迎所有的贡献, 也欢迎提出建议, 使得该脚手架更加完善, 有问题可在 issues 里面提问.

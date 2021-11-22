# js-cli

一个基于 `rush`、`pnpm`、`node` 、`typescript` 开发的高性能、易扩展脚手架.

<figure>
    <a href="https://img.shields.io/circleci/project/github/xuzpeng/fiona-ui/master.svg"><img src="https://img.shields.io/circleci/project/github/xuzpeng/fiona-ui/master.svg"></a>
    <a href="https://img.shields.io/github/languages/count/xuzpeng/fiona-ui.svg"><img src="https://img.shields.io/github/languages/count/xuzpeng/fiona-ui.svg"></a>
    <a href="https://img.shields.io/npm/l/fiona-ui.svg"><img src="https://img.shields.io/npm/l/fiona-ui.svg"></a>
</figure>

## 安装

```shell
npm install @js-cli/core -g or yarn add @js-cli/core -g
```

## 使用
```
js-cli init
```
执行 `js-cli` 命令后按照提示，选择对应的模版即可远程拉取模版并执行相关指令(项目依赖安装、启动项目), 支持 `通用` 和 `自定义` 两种模版格式.

> 首次执行该命令后，会在用户根目录下创建 `.js-cli` 目录用来缓存脚手架相关依赖及安装的模版，后续用户在使用时会自动检测(脚手架、模版)版本并更新到最新版本。

## 创建新模版
- 1. 执行 `js-cli init` 命令后，选择 `项目 -> 基础模版`, 模版下载完成后，把新模版文件都拷贝到基础模版的 `template` 文件夹下，把 `package.json` 文件中的 `name`、 `version` 换成 cjs 语法 `<%= className %>` 、 `<%= version %>`, 这两个字段的值由用户在模版初始化的时候输入
- 2. 通过 `npm publish ` 把新模版发布到 `npm`
- 3. 通过 [模版接口](http://1.116.156.44:8085/swagger-ui.html)里的 `创建模版` 接口，把刚才发布成功的新模版相关信息保存到云端，信息保存成功后，后续再执行 `js-cli init` 命令即可看到刚才新发布的模版选项

## 如何用 rush 来高效的开发脚手架 ？

待更新。。。

## PR [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

欢迎所有的贡献, 也欢迎提出建议, 使得该脚手架更加完善, 有问题可在 issues 里面提问.

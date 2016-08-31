# 12306-cli

[![NPM Version](https://img.shields.io/npm/v/12306-cli.svg?style=flat)](https://npmjs.org/package/12306-cli)

看到网上有个小伙伴用 python 实现了一款火车票查询工具，因此萌生了用 JavaScript 实现的冲动。此工具在 osx 下开发，windows 尚未测试。

![截图](http://dn-cnode.qbox.me/FnbE4WGUmsPhktAPMpIeEphgwOkG)

## !!待完成

* 出发地和到达站是写死的，还没开始搞。

## 用到的工具

* chalk - 命令行字体加色
* request - http client
* commander - 命令行程序框架
* columnify - 命令行表格格式化工具

## 安装

```bash
> npm i -g 12306-cli
```

## 使用

```bash
> 12306 query hangzhou xuzhou 2016-09-20

> 12306 query 杭州 徐州 2016-09-20
```

# 12306-cli

[![NPM Version](https://img.shields.io/npm/v/12306-cli.svg?style=flat)](https://npmjs.org/package/12306-cli)

看到网上有个小伙伴用 python 实现了一款火车票查询工具，因此萌生了用 JavaScript 实现的冲动。此工具在 osx 下开发，windows 尚未测试。

![](http://ww1.sinaimg.cn/large/8df27f17gw1f7dfzklo8pj21kw0s2drz.jpg)

## 用到的工具

* chalk - 命令行字体加色
* request - http client
* commander - 命令行程序框架
* columnify - 命令行表格格式化工具

## 安装

```bash
> npm i -g 12306-cli
```

## 使用说明

### 帮助

```bash
> 12306 query -h
```

### 查询车票

```bash
> 12306 query hangzhou xuzhou 2016-09-20

> 12306 query 杭州 徐州 2016-09-20
```

只看高铁

```bash
> 12306 query hangzhou xuzhou 2016-09-20 --gaotie
```

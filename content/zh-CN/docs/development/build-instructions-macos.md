# 构建步骤（macOS）

遵循下面的引导，在 macOS 上构建 Electron.

## 前提条件

* 马科斯 >= 10.11.6
* [X码](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (外部)
* 包含TLS 1.2支持的Python2.7

## Python

也请确保您的系统和Python版本支持至少TLS 1.2。 这取决于您的MacOS和Python版本。 要快速测试，运行：

```sh
$npx @emen/chect-python-tls
```

如果脚本返回您的配置正在使用过时的安全 协议，您可以将 macOS 更新到高塞拉或安装 Python 2.7.x 的新版本 。 要升级 Python，请使用 [自制](https://brew.sh/)：

```sh
$ brew install python@2 && brew link python@2 --force
```

如果你已经在使用Homebrew来管理Python，那你可以通过安装以下Python模块来实现版本支持：

* [pyobjc](https://pypi.org/project/pyobjc/#description)

您可以使用 `pip` 安装它：

```sh
$点安装皮奥比克
```

## macOS SDK

如果你已经在开发Electron项目，而且没有重新分发Electron构建文件的计划，那你可以忽略下面内容。

官方电子构建使用 [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip)和 macOS 11.0 SDK 构建。 可以使用新的SDK来构建，但是当前使用的Release版本是 11.0 SDK

## 构建Electron

参照[Build Instructions: GN](build-instructions-gn.md)

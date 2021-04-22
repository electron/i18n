# 构建步骤（macOS）

Follow the guidelines below for building **Electron itself** on macOS, for the purposes of creating custom Electron binaries. 为了将您的应用代码与预构建的 Electron 二进制文件打包并发布，请参阅 [应用程序发布][application-distribution] 指南。

## 前提条件

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (外部)
* 包含TLS 1.2支持的Python2.7

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$npx @emen/chect-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

如果你已经在使用Homebrew来管理Python，那你可以通过安装以下Python模块来实现版本支持：

* [pyobjc](https://pypi.org/project/pyobjc/#description)

您可以使用 `pip` 安装它：

```sh
$ pip install pyobjc
```

## macOS SDK

如果你已经在开发Electron项目，而且没有重新分发Electron构建文件的计划，那你可以忽略下面内容。

Official Electron builds are built with [Xcode 12.2](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), and the macOS 11.0 SDK. 可以使用新的SDK来构建，但是当前使用的Release版本是 11.0 SDK

## 构建Electron

参照[Build Instructions: GN](build-instructions-gn.md)

[application-distribution]: ../tutorial/application-distribution.md

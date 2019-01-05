# 构建步骤（macOS）

遵循下面的引导，在 macOS 上构建 Electron.

## 基本要求

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
* [node.js](https://nodejs.org) (外部)
* 包含TLS 1.2支持的Python2.7

## Python

请确保你的运行系统和Python均支持TLS 1.2 及其以上版本。可以运行以下命令来快速检测python版本：

```sh
$ npm run check-tls
```

如果以上命令的回调显示你正在使用过期的安全协议，你可以把macOS系统更新至High Sierra版，或者安装2.7.x版的Python。你可以使用[Homebrew](https://brew.sh/)来更新Python版本：

```sh
$ brew install python@2 && brew link python@2 --force
```

如果你已经在使用Homebrew来管理Python，那你可以通过安装以下Python模块来实现版本支持：

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

如果你已经在开发Electron项目，而且没有重新分发Electron构建文件的计划，那你可以忽略下面内容。

官方的 Electron 是被 [Xcode 8.3.3](http://adcdownload.apple.com/Developer_Tools/Xcode_8.3.3/Xcode_8.3.3.xip)，和 MacOS 10.12 构建的 Building with a newer SDK works too, but the releases currently use the 10.12 SDK.

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).
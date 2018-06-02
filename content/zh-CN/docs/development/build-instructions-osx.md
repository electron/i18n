# 构建步骤（macOS）

遵循下面的引导，在 macOS 上构建 Electron.

## 基本要求

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (external)
- Python 2.7 with support for TLS 1.2

## Python

请确保你的运行系统和Python均支持TLS 1.2 及其以上版本。可以运行以下命令来快速检测python版本：

```sh
$ python ./script/tls.py
```

如果以上命令的回调显示你正在使用过期的安全协议，你可以把macOS系统更新至High Sierra版，或者安装2.7.x版的Python。你可以使用[Homebrew](https://brew.sh/)来更新Python版本：

```sh
$ brew install python@2 && brew link python@2 --force
```

如果你已经在使用Homebrew来管理Python，那你可以通过安装以下Python模块来实现版本支持：

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

要使某些功能 (例如缩小缩放) 正常工作，你必须定位到 MacOS 10.10 SDK。

官方 Electron 构建于[Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), 默认情况下不包含10.10 SDK. 要获得它, 请先下载并挂载 [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

然后, 假设 Xcode 6.4 DMG 已经挂载在 `/Volumes/Xcode` 并且您的 Xcode 8.2.1 安装在 `/Applications/Xcode.app`, 运行:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

你还需要根据 10.10 SDK 启用Xcode:

- 打开 `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- 设置 `MinimumSDKVersion` 为 `10.10`
- 保存文件

## 获取代码

```sh
$ git clone https://github.com/electron/electron
```

## 引导

Bootstrap 脚本也是必须下载的构建依赖，来创建项目文件. 注意我们使用的是 [ninja](https://ninja-build.org/) 来构建 Electron，所以没有生成 Xcode 项目.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## 构建

构建 `Release` 和 `Debug` 目标:

```sh
$ ./script/build.py
```

你也可以只构建 `Debug` 目标:

```sh
$ ./script/build.py -c D
```

完成后，你可以在 `out/D` 目录下找到 `Electron.app`.

## 32位支持

Electron 只能为 MacOS 上的 64 位目标构建，并且将来没有计划支持 32 位 macOS。

## 清理

清理构建文件:

```sh
$ npm run clean
```

清理 `out` 和 `dist` 目录:

```sh
$ npm run clean-build
```

**注意:** 两个清理命令都需要在构建之前再次运行 `bootstrap`。

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#tests)
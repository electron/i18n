# 构建步骤 (macOS)

遵循下面的引导，在 macOS 上构建 Electron .

## 基本须求

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](http://nodejs.org) (外部)

如果你目前使用的 Python 是通过 Homebrew 安装的，则你还需要安装以下 Python 模块:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

如果你只是开发 Electron，并且不打算重新分配你的自定义 Electron 构建，则可以跳过本节。

要使某些功能（例如缩小缩放）正常工作，你必须定位到 MacOS 10.10 SDK。

官方 Electron 构建于 [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), 默认情况下不包含10.10 SDK. 要获得它, 请先下载并挂载 [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

然后, 假设 Xcode 6.4 DMG 已经挂载在 `/Volumes/Xcode` 并且您的 Xcode 8.2.1 安装在 `/Applications/Xcode.app`, 运行:

```bash
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

你还需要根据 10.10 SDK 启用Xcode:

- 打开 `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- 设置 `MinimumSDKVersion` 为 `10.10`
- 保存文件

## 获取代码

```bash
$ git clone https://github.com/electron/electron
```

## 引导

bootstrap 脚本也是必要下载的构建依赖，来创建项目文件. 注意我们使用的是 [ninja](https://ninja-build.org/) 来构建 Electron，所以没有生成 Xcode 项目.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

## 构建

构建 `Release` 和 `Debug` 目标:

```bash
$ ./script/build.py
```

你也可以只构建 `Debug` 目标:

```bash
$ ./script/build.py -c D
```

完成后，你可以在 `out/D` 目录下找到 `Electron.app` .

## 32bit Support

Electron 只能为 MacOS 上的 64 位目标构建，并且将来没有计划支持 32 位 macOS。

## 清理

清理构建文件:

```bash
$ npm run clean
```

只清理 `out` 和 `dist` 目录:

```bash
$ npm run clean-build
```

**注意:** 两个清理命令都需要在构建之前再次运行 `bootstrap`。

## 测试

查看 [构建系统概览: 测试](build-system-overview.md#测试)
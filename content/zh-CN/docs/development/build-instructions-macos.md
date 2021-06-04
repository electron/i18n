# 构建步骤（macOS）

请按照下面的指南在macOS下构建 **Electron 本身**，以此创建自定义 Electron 二进制文件。 为了将您的应用代码与预构建的 Electron 二进制文件打包并发布，请参阅 [应用程序发布][application-distribution] 指南。

## 前提条件

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (外部)
* 包含TLS 1.2支持的Python2.7

## Python

Please also ensure that your system and Python version support at least TLS 1.2. 这取决于您的 macOS 和 Python 的版本。 对于快速测试，请运行：

```sh
$npx @emen/chect-python-tls
```

如果以上命令的结果显示您正在使用过期的安全协议，您可以把macOS系统更新至High Sierra版，或者安装一个新的2.7.x版的Python。 您可以使用[Homebrew](https://brew.sh/)来更新Python版本：

```sh
$ brew install python@2 && brew link python@2 --force
```

如果你已经在使用Homebrew来管理Python，那你也需要安装以下Python模块：

* [pyobjc](https://pypi.org/project/pyobjc/#description)

您可以使用 `pip` 安装它：

```sh
$ pip install pyobjc
```

## macOS SDK

如果你已经在开发Electron项目，而且没有重新分发Electron构建文件的计划，那你可以忽略下面内容。

官方 Electron 构建于[Xcode 12.2.1](https://download.developer.apple.com/Developer_Tools/Xcode_12.2/Xcode_12.2.xip), 和 MacOS 11.0 SDK. 可以使用新的SDK来构建，但是当前使用的Release版本是 11.0 SDK

## 构建Electron

参照[Build Instructions: GN](build-instructions-gn.md)

[application-distribution]: ../tutorial/application-distribution.md

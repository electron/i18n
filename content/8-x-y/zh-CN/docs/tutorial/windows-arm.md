# 臂上的Windows 10

如果您的应用与 Electron 6.0.8 或更高版本运行，您现在可以在Arm 上构建Windows10。 This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## 运行基本应用
如果您的应用没有使用任何本地模块，那么创建您的应用的Arm 版本就非常容易。

1. 请确保您的应用的 `node_modules` 目录是空的。
2. 使用 _命令提示_, 运行 `设置 npm_config_arch=arm64` 之前运行 `npm 安装`/`yarn 安装` 一切照旧。
3. [如果您安装了作为开发依赖的 electron](first-app.md), npm 将下载和解包arm64 版本。 然后您可以将您的应用作为正常的软件包并进行分发。

## A. 一般性考虑

### 建筑特定代码

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
if (process.arch === 'x64') {
  // Do 64-bit thing...
如果你想要的话，你就会知道这个问题。
  // 做32位的事情...
}
```

如果你想要瞄准arm64，那么这种逻辑通常会选择错误的架构， 如此仔细地检查您的应用程序并为这样的条件生成脚本。 在自定义构建和包装脚本中，您应该始终检查环境中 `npm_config_arch` 的值。 而不是依靠目前的程序轮廓。

### 原生模块
如果您使用本机模块，您必须确保他们编译与 MSVC 编译器的 v142 (在 Visual Studio 2017中提供)。 您还必须检查任何预构建的 `.dll` 或 `。 ib` 本地模块提供或引用的文件可用于Windows在军备上。

### 测试您的应用
要测试您的应用，请在运行Windows 10的Arm 设备上使用 Windows (版本1903或更晚)。 请确保您将应用程序复制到目标设备 - Chromium的沙盒在从网络位置加载您的应用程序资产时无法正常工作。

## 发展的前提条件
### Node.js/node-gyp

[推荐Node.js v12.9.0或更高版本。](https://nodejs.org/en/) 如果更新到新的节点版本是不可取的。 您可以 [手动更新npm的node-gyp 的副本](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) 到第5版。 2 或更高版本，包含编译原生军备模块所需的更改。

### Visual Studio 2017
需要的 Visual Studio 2017 (任何版本) 来交叉编译本机模块。 您可以通过 Microsoft 的 [Visual Studio Dev Essentials程序](https://visualstudio.microsoft.com/dev-essentials/) 下载Visual Studio Community 2017 安装后，您可以通过从 _命令提示_ 运行以下内容来添加特定的武器组件：

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--inclusdeRecommendation。
```

#### 创建交叉编译命令提示
在环境中设置 `npm_config_arch=arm64` 可以创建正确的arm64 `bj` 文件，但标准 _VS 2017 的开发者命令提示_ 将使用x64链接。 要解决这个问题：

1. Duplicate the _x64_x86 Cross Tools Command Prompt for VS 2017_ shortcut (e.g. by locating it in the start menu, right clicking, selecting _Open File Location_, copying and pasting) to somewhere convenient.
2. 右键单击新快捷键并选择 _属性_。
3. 将 _目标_ 字段改为 `vcvarsamd64_arm64.bat` 结尾处改为 `vcvarsamd64_x86.bat`

如果成功完成，命令提示应在启动时打印类似于此的内容：

```bat
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

If you want to develop your application directly on a Windows on Arm device, substitute `vcvarsx86_arm64.bat` in _Target_ so that cross-compilation can happen with the device's x86 emulation.

### 与正确的 `node.lib 链接`

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) 要解决这个问题：

1. Download the arm64 `node.lib` from https://atom.io/download/v6.0.9/win-arm64/node.lib
2. 移动到 `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

为您正在使用的版本替换 `6.0.9`


## 交叉编译本地模块
完成上述所有后，打开您的交叉编译命令提示符并运行 `设置 npm_config_arch=arm64`。 然后使用 `npm 安装` 来构建您的项目正常。 如同交叉编纂的x86单元， 您可能需要删除 `node_modules` 来强制重新编译原生模块，如果它们以前是为另一个架构编译的。

## 调试本机模块

调试本地模块可以通过 Visual Studio 2017 (运行于您的开发机器)和相应的 [Visual Studio 远程调试器](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) 运行在目标设备上。 要调试：

1. 漫游您的应用程序 `。 xe` 透过 _命令提示_ 在目标设备上(通过 `--查看-brk` 在任何本地模块加载之前暂停).
2. 在你的开发机器上启动 Visual Studio 2017
3. 选择 _调试 > 附加到进程以连接到目标设备..._ 并输入设备的 IP 地址和端口号由 Visual Studio 远程调试工具显示。
4. 点击 _刷新_ 并选择 [相应的 Electron 进程以附加](../development/debug-instructions-windows.md)。
5. 您可能需要确保在您的应用中本地模块的任何符号都正确加载。 要配置这个配置，请头到 _调试 > 选项..._ 在 Visual Studio 2017 中，并添加包含您 `的文件夹。 db` 符号在 _调试 > 符号_
5. 一旦附加，设置任何相应的断点，并使用 Chrome 的 [远程工具来恢复 JavaScript 执行节点](debugging-main-process.md)。

## 正在获取额外帮助
如果您遇到此文档的问题，或者您的应用在编译后使用 x86 而不是arm64， 请 [在标题中使用"Windowson Arm"填写一个问题](../development/issues.md)。

# Windows 10 ARM

如果您的应用使用Electron 6.0.8及之后的版本，您现在可以在基于ARM的Windows10上构建它。 这大大提高了性能，但需要重新组合应用中使用的任何本机模块。 它可能需要对您的构建和包装脚本进行小型修复。

## 运行基本应用

如果您的应用没有使用任何本地模块，那么创建您的应用的Arm 版本就非常容易。

1. 请确保您的应用的 `node_modules` 目录是空的。
2. 使用 _命令提示_, 运行 `设置 npm_config_arch=arm64` 之前运行 `npm 安装`/`yarn 安装` 一切照旧。
3. [如果您安装了 Electron 作为开发依赖项](quick-start.md#prerequisites), npm 将下载和解包arm64 版本。 然后您可以将您的应用作为正常的软件包并进行分发。

## A. 一般性考虑

### 建筑特定代码

如果...在x64或x86架构之间进行选择的其他逻辑。

```js
如果（过程。arch=='x64'）{
  //做64位的事情。。。
如果你想要的话，你就会知道这个问题。
  // 做32位的事情...
}
```

如果你想要瞄准arm64，那么这种逻辑通常会选择错误的架构， 如此仔细地检查您的应用程序并为这样的条件生成脚本。 在自定义构建和包装脚本中，您应该始终检查环境中 `npm_config_arch` 的值。 而不是依靠目前的程序轮廓。

### 原生模块

如果您使用本机模块，您必须确保他们编译与 MSVC 编译器的 v142 (在 Visual Studio 2017中提供)。 您还必须检查 native module 提供或引用的 `.dll` 或 `.lib` 文件是否可用于 Arm 上的 Windows。

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

1. 复制VS 2017 _x64_x86交叉工具命令提示_ 快捷方式（例如，通过在开始菜单中定位它，右键单击，选择 _开放文件位置_，复制和粘贴）到方便的地方。
2. 右键单击新快捷键并选择 _属性_。
3. 将 _目标_ 字段改为 `vcvarsamd64_arm64.bat` 结尾处改为 `vcvarsamd64_x86.bat`

如果成功完成，命令提示应在启动时打印类似于此的内容：

```bat

** 视觉工作室 2017 开发人员命令提示 v15.9.15
** 版权 （c） 2017 微软公司
x64_arm64
[vcvarsall.bat]
```

如果您想直接在 Arm 设备上的 Windows 上开发应用，请在 _目标_ 中替换 `vcvarsx86_arm64.bat` ，以便通过设备的 x86 仿真实现交叉编译。

### 与正确的 `node.lib 链接`

默认情况下， `node-gyp` 拆开 Electron 的节点标题，并将 x86 和 x64 版本的 `node.lib` 下载到 `%APPDATA%\..\Local\node-gyp\Cache`中，但它不会下载 arm64 版本（[正在开发](https://github.com/nodejs/node-gyp/pull/1875)中的修复程序。 要解决这个问题：

1. 从 https://electronjs.org/headers/v6.0.9/win-arm64/node.lib 下载手臂64 `node.lib`
2. 移动到 `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

为您正在使用的版本替换 `6.0.9`

## 交叉编译本地模块

完成上述所有后，打开您的交叉编译命令提示符并运行 `设置 npm_config_arch=arm64`。 然后使用 `npm 安装` 来构建您的项目正常。 如同交叉编纂的x86单元， 您可能需要删除 `node_modules` 来强制重新编译原生模块，如果它们以前是为另一个架构编译的。

## 调试本机模块

调试本地模块可以通过 Visual Studio 2017 (运行于您的开发机器)和相应的 [Visual Studio 远程调试器](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) 运行在目标设备上。 要调试：

1. 在目标设备上通过_命令提示符_启动 `.exe` 应用(传递 `--inspect-brk` 参数可以在加载任何 native modules 之前暂停应用)。
2. 在你的开发机器上启动 Visual Studio 2017
3. 通过选择 _调试 > _ 访问并输入设备的 IP 地址和 Visual Studio 远程调试器工具显示的端口号，连接到目标设备。
4. 点击 _刷新_ 并选择 [相应的 Electron 进程以附加](../development/debug-instructions-windows.md)。
5. 您可能需要确保在您的应用中本地模块的任何符号都正确加载。 要配置此内容，请进入 Visual Studio 2017_Debug > Options..._，and add the folders containing your `.pdb` symbols under _Debugging > Symbols_.
6. 一旦附加，设置任何相应的断点，并使用 Chrome 的 [远程工具来恢复 JavaScript 执行节点](debugging-main-process.md)。

## 正在获取额外帮助

如果您遇到此文档的问题，或者您的应用在编译后使用 x86 而不是arm64， 请 [在标题中使用"Windowson Arm"填写一个问题](../development/issues.md)。

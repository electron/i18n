# 构建步骤（Windows）

遵循下面的步骤, 在 Windows 平台上构建 Electron。

## 基本要求

* Windows 10 / Server 2012 R2 或更高版本
* Visual Studio 2017 15.7.2 或更高版本 - [免费下载 VS 2019 社区版](https://www.visualstudio.com/vs/) 
  * 请参阅[Chromium构建文档](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio)，以了解有哪些Visual Studio 组件需要安装等详细信息。
  * 如果您的 Visual Studio 安装在非默认目录中， 您需要 设置几个环境变量来将工具链指向您的安装路径。 
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, replacing `2019` and `Community` with your installed versions and replacing `DRIVE:` with the drive that Visual Studio is on. Often, this will be `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Often, this will be `C:`.
* [Python 2.7.10 或更高版本](http://www.python.org/download/releases/2.7/) 
  * 与下面 `depot_tools` 的安装说明不同，你必须安装 2.7.10 以上版本的 Python（支持 TLS 1.2）。 为此，应确保 **PATH** 中 Python 的安装目录在 `depot_tools` 之前。 目前 `depot_tools` 仍捆绑 Python 2.7.6，这将导致 `gclient` 命令失效（见 https://crbug.com/868864）。
  * [Python for Windows (pywin32) 扩展](https://pypi.org/project/pywin32/#files)对于构建流程也是必需的。
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* 如果您计划使用Windows SDK 10.0.15063.468的Windows调试工具 创建一个完整的发行版 `symstore.exe` 用来创建符号 保存于 `.pdb` 文件。 
  * 不同版本的SDK可以同时安装 安装 SDK，打开 Visual Studio 安装程序，选择 `更改`→`单个组件`，向下滚动并选择适当的 要安装的 Windows SDK 组件。 另一个选择是查看 [windows SDK 和仿真器存档](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) 并分别下载 SDK 的独立版本。
  * 还必须安装 SDK 调试工具。 如果已安装了 Windows 10 SDK 通过 Visual Studio 安装程序，然后可以用以下方式安装它们： `控制面板`→`程序`→`程序和功能`→选择“Windows 软件开发工具包”→ `更改`→`更改`→选中“Windows 调试工具”→`更改`。 或者，您可以下载独立的 SDK 安装程序，并且使用它安装调试工具。

如果您当前没有安装 Windows， [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 上有时间限制的 Windows 版本，你可以用来构建 Electron。

构建 Electron 完全由命令行脚本完成，无法通过 Visual Studio 完成。 您可以使用任何编辑器开发 Electron，但将来将会使用 Visual Studio 构建支持。

**注意:** 即使 Visual Studio 不用于构建，但是仍然**需要**，因为我们需要它提供的构建工具链。

## 构建

参照[Build Instructions: GN](build-instructions-gn.md)

## 32 位构建

为了构建 32bit 版本，您需要通过 `target_cpu = “x86"` 作为 GN 参数。 可以使用不同的 GN 输出目录（例如， `out/Release-x86`） 和不同的参数，在 64 位目标旁边构建 32 位目标。

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

其他构建步骤完全一样。

## Visual Studio 项目

要生成 Visual Studio 项目，可以传递 `--ide=vs2017` 参数 给 `gn gen`：

```powershell
$ gn gen out/Testing --ide=vs2017
```

## 故障排查

### Command xxxx not found

如果你遇到了一个错误，类似 `Command xxxx not found`, 可以尝试使用 `VS2015 Command Prompt` 控制台来执行构建脚本.

### Fatal internal compiler error: C1001

确保你已经安装了 Visual Studio 的最新安装包.

### LNK1181: cannot open input file 'kernel32.lib'

重新安装 32位的 Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

创建那个目录 [应该可以解决问题](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

如果你使用 Git Bash 来构建，或许会遇到这个错误，可以使用 PowerShell 或 VS2015 Command Prompt 来代替.

### 无法在“…”处创建目录：文件名太长

node.js 有一些 [极长的路径名](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish)，默认情况下，windows 上的 git 不能正确处理长路径名（即使 windows 支持它们）。 这应该可以修复它：

```sh
$ git config --system core.longpaths true
```

### 错误：使用未声明的标识符“DefaultDelegateCheckMode”

在使用 Windows 驱动程序工具包安装 Windows 调试工具时，可能会在构建期间发生这种情况。卸载 Windows 驱动程序工具包并使用上述步骤安装调试工具。

### 导入错误：没有名为 win32file 的模块

确保已使用 `pip install pywin32` 安装了 `pywin32`。

### 构建脚本挂起, 直到某个按键按下才有响应

这个bug 是 Windows 命令提示符的一个"功能" It happens when clicking inside the prompt window with `QuickEdit` enabled and is intended to allow selecting and copying output text easily. 由于每次意外点击都会暂停构建过程，您可能需要在命令的属性中禁用此 功能。
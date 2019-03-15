# 构建步骤（Windows）

遵循下面的步骤, 在 Windows 平台上构建 Electron。

## 基本要求

* Windows 10 / Server 2012 R2 或更高版本
* Visual Studio 2017 15.7.2 或更高版本 - [免费下载 VS 2017 社区版](https://www.visualstudio.com/vs/)
* [Python 2.7.10 或更高版本](http://www.python.org/download/releases/2.7/) 
  * 与下面 `depot_tools` 的安装说明不同，你必须安装 2.7.10 以上版本的 Python（支持 TLS 1.2）。 为此，应确保 **PATH** 中 Python 的安装目录在 `depot_tools` 之前。 目前 `depot_tools` 仍捆绑 Python 2.7.6，这将导致 `gclient` 命令失效（见 https://crbug.com/868864）。
  * [Python for Windows (pywin32) 扩展](https://pypi.org/project/pywin32/#files)对于构建流程也是必需的。
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* 如果您计划使用Windows SDK 10.0.15063.468的Windows调试工具 创建一个完整的发行版 `symstore.exe` 用来创建符号 保存于 `.pdb` 文件。 
  * 不同版本的SDK可以同时安装 安装 SDK，打开 Visual Studio 安装程序，选择 `更改`→`单个组件`，向下滚动并选择适当的 要安装的 Windows SDK 组件。 另一个选择是查看 [windows SDK 和仿真器存档](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) 并分别下载 SDK 的独立版本。
  * 还必须安装 SDK 调试工具。 如果已安装了 Windows 10 SDK 通过 Visual Studio 安装程序，然后可以用以下方式安装它们： `控制面板`→`程序`→`程序和功能`→选择“Windows 软件开发工具包”→ `更改`→`更改`→选中“Windows 调试工具”→`更改`。 或者，可以下载独立的 SDK 安装程序并使用它来安装调试工具。

如果您当前没有安装 Windows， [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 上有时间限制的 Windows 版本，你可以用来构建 Electron。

构建 Electron 完全由命令行脚本完成，无法通过 Visual Studio 完成。 您可以使用任何编辑器开发 Electron，但将来将会使用 Visual Studio 构建支持。

**注意:** 即使 Visual Studio 不用于构建，但是仍然**需要**，因为我们需要它提供的构建工具链。

## 构建

参照[Build Instructions: GN](build-instructions-gn.md)

## 32 位构建

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

其他构建步骤完全一样。

## Visual Studio 项目

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
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

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

Make sure you have installed `pywin32` with `pip install pywin32`.
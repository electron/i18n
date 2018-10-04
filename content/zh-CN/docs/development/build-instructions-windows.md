# 构建步骤（Windows）

遵循下面的步骤, 在 Windows 平台上构建 Electron。

## 基本要求

* Windows 10 / Server 2012 R2 或更高
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Windows 调试工具](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) 如果你计划从 `symstore.exe` 创建完整的分发用于从 `.pdb` 文件创建 symbol 存储

如果您当前没有安装 Windows， [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 上有时间限制的 Windows 版本，你可以用来构建 Electron。

构建 Electron 完全由命令行脚本完成，无法通过 Visual Studio 完成。 您可以使用任何编辑器开发 Electron，但将来将会使用 Visual Studio 构建支持。

**注意:** 即使 Visual Studio 不用于构建，但是仍然**需要**，因为我们需要它提供的构建工具链。

## 构建

See [Build Instructions: GN](build-instructions-gn.md)

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
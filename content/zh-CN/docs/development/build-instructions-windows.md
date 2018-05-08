# 构建步骤（Windows）

遵循下面的步骤, 在 Windows 平台上构建 Electron。

## 基本要求

* Windows 7 / Server 2008 R2 或更高
* Visual Studio 2017 - [免费下载 VS 2017 Community Edition](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Windows 调试工具](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) 如果你计划从 `symstore.exe` 创建完整的分发用于从 `.pdb` 文件创建 symbol 存储

如果您当前没有安装 Windows， [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) 上有时间限制的 Windows 版本，你可以用来构建 Electron。

构建 Electron 完全由命令行脚本完成，无法通过 Visual Studio 完成。 您可以使用任何编辑器开发 Electron，但将来将会使用 Visual Studio 构建支持。

**注意:** 即使 Visual Studio 不用于构建，但是仍然**需要**，因为我们需要它提供的构建工具链。

## 获取代码

```powershell
$ git clone https://github.com/electron/electron.git
```

## 引导

Bootstrap 脚本也是必须下载的构建依赖，来创建项目文件. 需要注意的是我们使用`ninja`创建 Electron，这样的话就不需要生成 Visual Studio 项目了。

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## 构建

构建 Release 和 Debug 目标:

```powershell
$ python script\build.py
```

你也可以只构建 Debug 目标:

```powershell
$ python script\build.py -c D
```

完成构建后，你可在 `out\D` (调试目标) 或者在`out\R`(发布版本)找到`electron.exe`。

## 32 位构建

要为32位目标构建，运行引导脚本时需要传递 `--target_arch = ia32`：

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

其他构建步骤完全一样。

## Visual Studio 项目

要生成 Visual Studio 项目，可以传递 `--msvs` 参数：

```powershell
$ python script\bootstrap.py --msvs
```

## 清理

清理构建文件:

```powershell
$ npm run clean
```

清理 `out` 和 `dist` 目录:

```sh
$ npm run clean-build
```

**注意:** 两个清理命令都需要在构建之前再次运行 `bootstrap`。

## 测试

查看 [构建系统概述: 测试](build-system-overview.md#tests)

## 故障排查

### Command xxxx not found

如果你遇到了一个错误，类似 `Command xxxx not found`, 可以尝试使用 `VS2015 Command Prompt` 控制台来执行构建脚本.

### Fatal internal compiler error: C1001

确保你已经安装了 Visual Studio 的最新安装包.

### Assertion failed: ((handle))->activecnt >= 0

如果在 Cygwin 下构建的，你可能会看到 `bootstrap.py` 失败并且附带下面错误:

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

这是由同时使用 Cygwin Python 和 Win32 Node 造成的 bug. 解决办法就是使用 Win32 Python 执行 bootstrap 脚本 (假定你已经在目录 `C:\Python27` 下安装了 Python):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

重新安装 32位的 Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

如果你使用 Git Bash 来构建，或许会遇到这个错误，可以使用 PowerShell 或 VS2015 Command Prompt 来代替.
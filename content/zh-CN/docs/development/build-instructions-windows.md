# 构建介绍(Windows)

遵循下面的原则在 Windows 平台上构建 Electron。

## 先决条件

* Windows 7 / Server 2008 R2 或更高
* Visual Studio 2015 Update 3 - [下载免费的 VS 2015 Community Edition ](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

Building Electron is done entirely with command-line scripts and cannot be done with Visual Studio. You can develop Electron with any editor but support for building with Visual Studio will come in the future.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## 获取代码

```powershell
$ git clone https://github.com/electron/electron.git
```

## 引导

引导脚本将会下载全部必要的构建依赖，并创建和构建项目文件。 需要注意的是我们使用`ninja`创建 Electron，这样的话旧不需要生成 Visual Studio 项目了。

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## 构建

构建发布和调试版本：

```powershell
$ python script\build.py
```

你也可以仅构建调试版本:

```powershell
$ python script\build.py -c D
```

完成构建后，你可在 `out\D` (调试目标) 或者在`out\R`(发布版本)找到`electron.exe`。

## 32 位版本

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

The other building steps are exactly the same.

## Visual Studio 项目

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## 清理

清理构建文件:

```powershell
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## 测试

查看[构建系统概览: 测试](build-system-overview.md#tests)

## 故障排查

### Command xxxx not found

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Make sure you have the latest Visual Studio update installed.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

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
    

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Simply making that directory [should fix the problem](http://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.
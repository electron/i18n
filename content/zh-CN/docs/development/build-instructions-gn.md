# 构建指南（实验中的GN构建方式）

可以参考以下方法来运用实验中的GN方式来构建Electron程序。

> **NOTE**: The GN build system is in *experimental* status, and currently only works on macOS, Linux and Windows.

## 基本要求

Check the build prerequisites for your platform before proceeding

- [macOS](build-instructions-osx.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## Install `depot_tools`

You'll need to install [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), the toolset used for fetching Chromium and its dependencies.

Also, on windows open:

`Control Panel → System and Security → System → Advanced system settings`

and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to use a google-internal version).

## 获取代码

```sh
$ mkdir electron-gn && cd electron-gn
$ cat > .gclient <<-GCLIENT
solutions = [
  {
    "url": "https://github.com/electron/electron",
    "managed": False,
    "name": "src/electron",
  },
]
GCLIENT
$ gclient sync --with_branch_heads --with_tags
# 此处需要等待一盏茶的功夫。
```

## 构建

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

This will generate a build directory `out/Default` under `src/` with debug build configuration. You can replace `Default` with another name, but it should be a subdirectory of `out`. Also, to know the list of available configuration options, run `gn args out/Default --list`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Default` to bring up an editor.

**For generating Debug/Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

**For generating Release/Non-Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/release.gn")'
```

**想要构建`electron:electron_app`项目，可以按照下面的方式运行`ninja`命令：**

```sh
$ ninja -C out/Default electron:electron_app
# 这个过程也比较费时，而且运行成本可能比较高
```

这个过程会构建 'libchromiumcontent' 里的所有内容，(如` chromium`中的`content`，及其依赖（包括Webkit 和 V8）)。因此，这个构建过程会比较费时。

你可以使用[sccache](https://github.com/mozilla/sccache)命令来提高后面的构建过程。 你可以通过运行`gn args out/Default`命令，把这个GN参数`cc_wrapper="sccache"`带入编辑器。

构建需要在`./out/Default`文件下执行：

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# Linux机下
$ ./out/Default/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` GN argument. For example, to compile a windows x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Default-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit has been tested in Electron. If you test other combinations and find them to work, please update this document :)

## 测试

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Default electron/build/node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Default/gen/node_headers)
```

接着，通过`electron/spec`命令来运行Electron：

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
```

可以通过增加其它标记来调试程序，例如：

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
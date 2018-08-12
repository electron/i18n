# 构建指南（实验中的GN构建方式）

可以参考以下方法来运用实验中的GN方式来构建Electron程序。

> **NOTE**: The GN build system is in *experimental* status.

## 基本要求

Check the build prerequisites for your platform before proceeding

- [macOS](build-instructions-osx.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## Install `depot_tools`

You'll need to install [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), the toolset used for fetching Chromium and its dependencies.

Also, on Windows, you'll need to set the environment variable `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. To do so, open `Control Panel` → `System and
Security` → `System` → `Advanced system settings` and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to download a Google-internal version that only Googlers have access to).

## 获取代码

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

## 构建

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

This will generate a build directory `out/Default` under `src/` with debug build configuration. You can replace `Default` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Default` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Default --list`.

**For generating Debug (aka "component" or "shared") build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/release.gn")'
```

**想要构建`electron:electron_app`项目，可以按照下面的方式运行`ninja`命令：**

```sh
$ ninja -C out/Default electron:electron_app
# 这个过程也比较费时，而且运行成本可能比较高
```

这个过程会构建 'libchromiumcontent' 里的所有内容，(如` chromium`中的`content`，及其依赖（包括Webkit 和 V8）)。因此，这个构建过程会比较费时。

你可以使用[sccache](https://github.com/mozilla/sccache)命令来提高后面的构建过程。 Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Default` to bring up an editor and adding a line to the end of the file.

构建需要在`./out/Default`文件下执行：

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Default/electron.exe
# or, on Linux
$ ./out/Default/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Default-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit and Linux 32-bit from Linux 64-bit have been tested in Electron. If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values)

## 测试

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Default electron/build/node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Default/gen/node_headers)
```

接着，通过`electron/spec`命令来运行Electron：

```sh
# on Mac:
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
# on Windows:
$ ./out/Default/electron.exe electron/spec
# on Linux:
$ ./out/Default/electron electron/spec
```

可以通过增加其它标记来调试程序，例如：

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
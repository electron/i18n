# Build Instructions (experimental GN build)

Follow the guidelines below for building Electron with the experimental GN build.

> **NOTE**: The GN build system is in *experimental* status, and currently only works on macOS and Linux, in debug mode, as a component build.

## 基本要求

系统需求，请参考[macOS](build-instructions-osx.md#prerequisites)或[Linux](build-instructions-linux.md#prerequisites)构建指南。 此外，你还需要安装[`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)，这是一个用于获取Chromium，及其相关依赖工具。

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
$ gn gen out/Default --args='root_extra_deps=["//electron"] is_electron_build=true is_component_build=true use_jumbo_build=true v8_promise_internal_field_count=1 v8_typed_array_max_size_in_heap=0'
```

以上代码，会生成构建所需的所有ninja文件。 如果你想改变构建参数，可以通过运行`gn
args out/Default`来将参数带入编辑器，而无需再次运行`gn run`命令。

想要构建`electron:electron_app`项目，可以按照下面的方式运行`ninja`命令：

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

## 测试

在运行测试之前，你首先需要新建与node.js版本相同的测试模块，不过这些模块在构建过程中已经生成。因此，你可以通过执行以下命令来实现。

```sh
$ (cd electron/spec && npm i --nodedir=../../third_party/electron_node)
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
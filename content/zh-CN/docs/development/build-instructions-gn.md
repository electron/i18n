# Build Instructions (experimental GN build)

Follow the guidelines below for building Electron with the experimental GN build.

> **NOTE**: The GN build system is in *experimental* status, and currently only works on macOS and Linux, in debug mode, as a component build.

## 基本要求

系统需求，请参考[macOS](build-instructions-osx.md#prerequisites)或[Linux](build-instructions-linux.md#prerequisites)构建指南。 此外，你还需要安装[`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)，这是一个用于获取Chromium，及其相关依赖的工具包。

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

以上代码，会生成构建所需的所有必需文件（ninja files）。 You shouldn't have to run `gn gen` again—if you want to change the build arguments you can run `gn
args out/Default` to bring up an editor.

To build, run `ninja` with the `electron:electron_app` target:

```sh
$ ninja -C out/Default electron:electron_app
# This will also take a while and probably heat up your lap.
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper="sccache"` by running `gn args out/Default` to bring up an editor.

The built executable will be under `./out/Default`:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# or, on Linux
$ ./out/Default/electron
```

## 测试

To run the tests, you'll first need to build the test modules against the same version of node.js that was built as part of the build process.

```sh
$ (cd electron/spec && npm i --nodedir=../../third_party/electron_node)
```

Then, run Electron with `electron/spec` as the argument:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
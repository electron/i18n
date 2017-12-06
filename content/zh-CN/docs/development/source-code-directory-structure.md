# 源码目录结构

Electron 的源代码主要依据 Chromium 的拆分约定被拆成了许多部分。

为了更好地理解源代码，您可能需要了解一下 [Chromium 的多进程架构](http://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 源代码的目录结构

```sh
Electron
├── atom/ - C++ 源代码.
|   ├── app/ - 系统入口代码.
|   ├── browser/ - 包含了主窗口,UI和所有主
|   |   进程相关的东西. 它会告诉渲染进程如何管理页面.
|   |   ├── ui/ - 不同平台上 UI 部分的实现.
|   |   |   ├── cocoa/ - Cocoa 部分的源代码.
|   |   |   ├── win/ - Windows GUI 部分的源代码.
|   |   |   └── x/ - X11 部分的源代码.
|   |   ├── api/ - 主进程 API 的实现.
|   |   ├── net/ - 网络相关的代码.
|   |   ├── mac/ - 与 Mac 有关的 Objective-C 代码.
|   |   └── resources/ - 图标，平台相关的文件等.
|   ├── renderer/ - 运行在渲染进程中的代码.
|   |   └── api/ - 渲染进程 API 的实现.
|   └── common/ - 同时被主进程和渲染进程用到的代码,
|       包括了一些用来将 node 的事件循环整合到 Chromium 的
|       事件循环中时用到的工具函数和代码.
|       └── api/ - 同时被主进程和渲染进程使用到的 API 的实现
|           以及 Electron 内置模块的基础设施.
├── chromium_src/ - Source code copied from Chromium. See below.
├── default_app/ - The default page to show when Electron is started without
|   providing an app.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── spec/ - Automatic tests.
├── electron.gyp - Building rules of Electron.
└── common.gypi - Compiler specific settings and building rules for other
    components like `node` and `breakpad`.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we just took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Structure of Other Directories

* **script** - 用于诸如构建、打包、测试等开发用途的脚本等.
* **tools** - 在 gyp 文件中用到的工具脚本，但与 `script` 目录不同，该目录中的脚本不应该被用户直接调用.
* **vendor** - 第三方依赖项的源代码，为了防止人们将它与 Chromium 源码中的同名目录相混淆，在这里我们不使用 `third_party` 作为目录名.
* **node_modules** - 在构建中用到的第三方 node 模块.
* **out** - `ninja` 的临时输出目录.
* **dist** - 由脚本 `script/create-dist.py` 创建的临时发布目录.
* **external_binaries** - 下载的不支持通过 `gyp` 构建的预编译第三方框架.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```
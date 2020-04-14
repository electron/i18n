# 源码目录结构

Electron 的源代码主要依据 Chromium 的拆分约定被拆成了许多部分。

为了更好地理解源代码，您可能需要了解一下 [Chromium 的多进程架构](https://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 源代码的目录结构

```diff
Electron
├── atom/ - C++ source code.
|   ├── app/ - 系统入口代码.
|   ├── browser/ - 包含了主窗口、UI 和所有主进程相关的东西.
|   |   |          它会告诉渲染进程如何管理页面.
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
|       |         包括了一些用来将 node 的消息循环整合到 Chromium 的
|       |         消息循环中时用到的工具函数和代码.
|       └── api/ - 同时被主进程和渲染进程使用到的 API 的实现,
|                  并且是 Electron 内置模块的基础.
├── chromium_src/ - Source code copied from Chromium. See below.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Automatic tests.
└── BUILD.gn - Electron 的构建规则.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## 其它目录的结构

* **script** - 用于诸如构建、打包、测试等开发用途的脚本等.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - 在构建中用到的第三方 node 模块.
* **out** - `ninja` 的临时输出目录.
* **dist** - 由脚本 `script/create-dist.py` 创建的临时发布目录.
* **external_binaries** - 下载了不支持用 `gn` 构建的第三方框架的二进制文件.

## 让 Git 子模块保持最新

Electron信息库有一些被提供的依赖, 在 [/vendor](https://github.com/electron/electron/tree/master/vendor) 目录中可以找到. 运行 `git status` 时，偶尔会看到这样的消息：

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

要更新这些被提供的依赖关系，运行以下命令：

```sh
git submodule update --init --recursive
```

如果您发现自己经常运行此命令, 你可以在 `~/.gitconfig` 文件中创建一个别名:

```sh
[alias]
    su = submodule update --init --recursive
```

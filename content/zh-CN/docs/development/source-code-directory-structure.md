# 源码目录结构

Electron 的源代码主要依据 Chromium 的拆分约定被拆成了许多部分。

为了更好地理解源代码，您可能需要了解一下 [Chromium 的多进程架构](https://dev.chromium.org/developers/design-documents/multi-process-architecture)。

## 源代码的目录结构

```diff
Electron
├── atom/ - C++ 源代码.
|   ├── app/ - 系统入口代码.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── brightray/ - Thin shim over libcc that makes it easier to use.
├── chromium_src/ - 从 Chromium 项目中拷贝来的代码. 参见下文。
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - 文档.
├── lib/ - JavaScript 源代码.
|   ├── browser/ - Javascript 主进程初始化代码.
|   |   └── api/ - Javascript API 实现.
|   ├── common/ - 主进程和渲染器进程使用的 JavaScript.
|   |   └── api/ - Javascript API 实现.
|   └── renderer/ - Javascript 渲染器进程初始化代码.
|       └── api/ - Javascript API 实现.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - 自动化测试.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

`/chromium_src` 中的文件更多地是Chromium的片段而不是内容层面的部分。 For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## 其它目录的结构

* **script** - 用于诸如构建、打包、测试等开发用途的脚本等.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - 第三方依赖项的源代码，为了防止人们将它与 Chromium 源码中的同名目录相混淆，在这里我们不使用 `third_party` 作为目录名.
* **node_modules** - 在构建中用到的第三方 node 模块.
* **out** - `ninja` 的临时输出目录.
* **dist** - 由脚本 `script/create-dist.py` 创建的临时发布目录.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

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
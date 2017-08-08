# 术语表

这篇文档说明了一些经常在 Electron 开发中使用的专业术语。

### ASAR

ASAR 代表了 Atom Shell Archive Format。 一个 [asar](https://github.com/electron/asar) 压缩包就是一个简单的 `tar` 文件-就像将那些有联系的文件格式化至一个单独的文件中。 Electron 能够任意读取其中的文件并且不需要解压缩整个文件。

ASAR 格式主要是为了提升 Windows 平台上的性能。TODO

### Brightray

[Brightray](https://github.com/electron/brightray) 是能够简单的让 [libchromiumcontent](#libchromiumcontent) 在应用中使用的一个静态库 它是专门为 Electron 创建的。但如果不是基于 Electron 的原生应用使用了 Chromium ，同样可使用该库。

Brightray 是 Electron 中的一个低级别的依赖，大部分的 Electron 用户不用关心它。

### DMG

是指在 macOS 上使用的苹果系统的磁盘镜像打包格式。 DMG 文件通常被用来分发应用的 "installers"（安装包）。 [electron-builder ](https://github.com/electron-userland/electron-builder)支持使用 dmg 来作为编译目标。

### IPC

IPC 代表 Inter-Process Communication。Electron 使用 IPC 来在[main(主进程)](#main-process)和[renderer(渲染进程)](#renderer-process)之间传递 JSON 信息。

### libchromiumcontent

一个单独的开源库，包含了 Chromium 的模块以及全部依赖（比如 Blink, [V8](#v8) 等）。

### main process

主进程，通常是值` main.js` 文件，是每个 Electron 应用的入口文件。它控制着整个 APP 的生命周期，从打开到关闭。 它也管理着原生元素比如菜单，菜单栏，Dock 栏，托盘等。 主进程负责创建 APP 的每个渲染进程。而且整个 Node API 都集成在里面。

每个 app 的主进程文件都定义在 `package.json` 中的 `main` 属性当中。这也是为什么 `electron.` 能够知道应该使用哪个文件来启动。

参见： [process](#process), [renderer](#renderer-process) process

### MAS

苹果系统上的 Mac App Store 的缩略词。有关于如何提交你的 app 至 MAS ，详见 [Mac App Store Submission Guide ](tutorials/mac-app-store-submission-guide.md)。

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

## NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### process

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.
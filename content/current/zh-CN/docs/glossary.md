# 词汇表

这篇文档解释了一些经常在 Electron 开发中使用的专业术语。

### ASAR

ASAR 表示 Atom Shell Archive Format。 一个 [asar](https://github.com/electron/asar) 档案就是一个简单的 `tar` 文件 - 比如将那些有关联的文件放至一个单独的文件格式中。 Electron 能够任意读取其中的文件并且不需要解压整个文件。

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C 运行时库 (CRT) 是包含了 ISO C99 标准库的 c + + 标准库的一部分。 实现了 CRT 的 Visual c++ 库支持本机代码开发, 以及混合的本机和托管代码, 以及用于. NET 开发的纯托管代码。

### DMG

是指在 macOS 上使用的苹果系统的磁盘镜像打包格式。 DMG 文件通常被用来分发应用的 "installers"（安装包）。 [electron-builder ](https://github.com/electron-userland/electron-builder)支持使用 `dmg` 来作为编译目标。

### IME

输入法编辑器. 是一个允许用户输入在键盘上找不到的字符和符号的程序。 例如，使用户可以用拉丁语键盘输入中文，日文，韩文和印度文字。

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

包含 [ Chromium Content module ](https://www.chromium.org/developers/content-module) 及其所有依赖项 (例如, Blink、[ V8 ](#v8) 等) 的共享链接库。 也称为 “libcc”。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

主进程，通常是名为` main.js ` 的文件，是每个 Electron 应用的入口文件。它控制着整个 App 的生命周期，从打开到关闭。 它也管理着系统原生元素比如菜单，菜单栏，Dock 栏，托盘等。 主进程负责创建 APP 的每个渲染进程。而且整个 Node API 都集成在里面。

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

参见: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

一种用于进程内部或进程间通信的 IPC 系统, 这很重要, 因为 Chrome会依据内存压力等来决定是否将其工作分拆给不同的进程。

可参考https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

原生模块 （在 Node.js 里也叫 addons），是一些使用 C or C++ 编写的能够在 Node.js 中加载或者在 Electron 中使用 require() 方法来加载的模块，它使用起来就如同 Node.js 的模块。 它主要用于桥接在 JavaScript 上运行 Node.js 和 C/C++ 的库。

Electron 支持了原生的 Node 模块，但是 Electron 非常可能安装一个不一样的 V8 引擎通过 Node 二进制编码，所以在打包原生模块的时候你需要在 指定具体的 Electron 本地头文件。

参见： [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System 是一个微软 Windows 平台上的脚本驱动的安装制作工具。 它发布在免费软件许可证书下，是一个被广泛使用的替代商业专利产品类似于 InstallShield。 [electron-builder](https://github.com/electron-userland/electron-builder) 支持使用 NSIS 作为编译目标。

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

一个进程是计算机程序执行中的一个实例。 Electron 应用同时使用了 [main(主进程)](#main-process) 和一个或者多个 [rendere(渲染进程)](#renderer-process) 来运行多个程序。

在 Node.js 和 Electron 里面，每个运行的进程包含一个 `process `对象。 这个对象作为一个全局的提供当前进程的相关信息和操作方法。 作为一个全局变量，它在应用内能够不用 require() 来随时取到。

参见： [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

在通常的浏览器内，网页通常运行在一个沙盒的环境挡住并且不能够使用原生的资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些低级别的交互。

参见： [process](#process), [main process](#main-process)

### Squirrel

Squirrel 是一个开源的框架来让 Electron 的应用能够自动的更新到发布的新的版本。 详见 [autoUpdater](api/auto-updater.md) API 了解如何开始使用 Squirrel。

### userland

"userland" 或者 "userspace" 术语起源于 Unix 社区，当程序运行在操作系统内核之外。 最近这个术语被推广在 Node 和 npm 社区用于区分 "Node core" 与发布的包的功能，对于在 npm 上注册的广大 "user（用户）" 们。

就像 Node ，Electron 致力于使用一些少量的设置和 API 来提供所有的必须的支持给开发中的跨平台应用。 这个设计理念让 Electron 能够保持灵活而不被过多的规定有关于如何应该被使用。 Userland 让用户能够创造和分享一些工具来提额外的功能在这个能够使用的 "core（核心）"之上。

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron将 V8 作为Chromium的一个部分进行构建，然后在构建Node时也指向那个 V8

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview `标签用于集成 'guest（访客）' 内容（比如外部的网页）在你的 Electron 应用内。它们类似于 `iframe`，但是不同的是每个 webview 运行在独立的进程中。 作为页面它拥有不一样的权限并且所有的嵌入的内容和你应用之间的交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。

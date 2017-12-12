# 术语表

这篇文档说明了一些经常在 Electron 开发中使用的专业术语。

### ASAR

ASAR 代表了 Atom Shell Archive Format。 一个 [asar](https://github.com/electron/asar) 压缩包就是一个简单的 `tar` 文件-就像将那些有联系的文件格式化至一个单独的文件中。 Electron 能够任意读取其中的文件并且不需要解压缩整个文件。

ASAR 格式主要是为了提升 Windows 平台上的性能。TODO

### Brightray

Brightray [之前是](https://github.com/electron-archive/brightray)一个可以让 [libchromiumcontent](#libchromiumcontent)在应用中更加易用的静态库。 现在它已并入 Electron 的代码库，所以不再推荐使用。

### CRT

C 运行时库 (CRT) 是包含了 ISO C99 标准库的 c + + 标准库的一部分。 实现了 CRT 的 Visual c++ 库支持本机代码开发, 以及混合的本机和托管代码, 以及用于. NET 开发的纯托管代码。

### DMG

是指在 macOS 上使用的苹果系统的磁盘镜像打包格式。 DMG 文件通常被用来分发应用的 "installers"（安装包）。 [electron-builder ](https://github.com/electron-userland/electron-builder)支持使用 dmg 来作为编译目标。

### IME

输入法编辑器. 是一个允许用户输入在键盘上找不到的字符和符号的程序。 例如，使用户可以用拉丁语键盘输入中文，日文，韩文和印度文字。

### IPC

IPC 代表 Inter-Process Communication进程间通信。Electron 使用 IPC 来在[main主进程](#main-process)和[renderer渲染进程](#renderer-process)之间传递 JSON 信息。

### libchromiumcontent

包含 [ Chromium Content module ](https://www.chromium.org/developers/content-module) 及其所有依赖项 (例如, Blink、[ V8 ](#v8) 等) 的共享链接库。 也称为 “libcc”。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

主进程，通常是名为` main.js ` 的文件，是每个 Electron 应用的入口文件。它控制着整个 App 的生命周期，从打开到关闭。 它也管理着系统原生元素比如菜单，菜单栏，Dock 栏，托盘等。 主进程负责创建 APP 的每个渲染进程。而且整个 Node API 都集成在里面。

每个 app 的主进程文件都定义在 `package.json` 中的 `main` 属性当中。这也是为什么 `electron.` 能够知道应该使用哪个文件来启动。

在Chromium中, 这个进程被称为 "浏览器进程"。它在Electron被重新命名, 以避免与渲染器进程混淆。

参见: [process](#process), [renderer process](#renderer-process)

### MAS

是指苹果系统上的 Mac App Store 的缩略词。有关于如何提交你的 app 至 MAS ，详见 [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md)。

### native modules原生模块

原生模块 (在 Node.js 里也叫 [addons](https://nodejs.org/api/addons.html))，是一些使用 C or C++ 编写的能够在 Node.js 中或者在 Electron 中使用 require() 方法来加载的模块，它使用起来就如同 Node.js 的模块。 它主要使在Node.js 上运行的 JavaScript 能调用 C/C++ 的库。

Electron 支持原生的 Node 模块，但是 Electron 非常可能使用了和你系统中安装的Node所不一样的 V8 版本，所以在构建原生模块的时候你需要手动指定 Electron 所使用的头文件的位置。

参见 [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System 是一个微软 Windows 平台上脚本驱动的制作安装包的工具。 它被发布在一些免费软件许可证书的组合下，是一个被广泛使用的可以替代商业专利产品例如 InstallShield的工具。 [electron-builder](https://github.com/electron-userland/electron-builder) 支持使用 NSIS 作为编译目标。

### OSR

OSR(离屏渲染) 可以让你渲染页面而不用立刻显示到屏幕上。 这个技术可被用于在后台加载超大页面然后再显示(这样做速度会更快)。

### 进程

一个进程是计算机程序正在执行中的一个实例。 Electron 应用同时使用了[main](#main-process) 进程和一个或者多个 [renderer](#renderer-process) 进程来运行多个程序。

在 Node.js 和 Electron 里面，每个运行中的进程都有一个 `process` 对象。 这个对象作为一个全局的提供当前进程的相关信息，操作方法。 作为一个全局变量，它在应用内部能够不用 require() 就能随时可用的。

参见: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

渲染进程是你的应用内的一个浏览器窗口。与主进程不同的是，它能够同时存在多个而且运行于不同的进程中。而且它们也能够被隐藏。

在标准的浏览器内，网页通常运行在一个沙盒环境中并且被禁止使用本地资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些低级别的交互。

参见: [process](#process), [main process](#main-process)

### Squirrel

Squirrel 是一个开源的框架来让 Electron 的应用能够自动的更新到最新发布的版本. 详见 [autoUpdater](api/auto-updater.md) API 了解如何开始使用 Squirrel。

### userland

"userland" 或者 "userspace" 术语起源于 Unix 社区，是指程序运行在操作系统内核之外的位置。 最近这个术语被推广到 Node 和 npm 社区，用于区分 "Node 内核"功能与在 npm 上注册的"用户" 们所发布的包的功能。

就像 Node ，Electron 致力于使用较小的API集来支持开发跨平台应用所必需的原语。 这个设计理念让 Electron 能够保持灵活性而不是被过分的规定为一个应该如何被使用的工具。 Userland 让用户能够在这个 "core（核心）"功能之上创造和分享一些工具来增加新的功能。

### V8

V8 是谷歌公司的开源 JavaScript 引擎。它使用 C++ 编写并被使用在谷歌公司的开源浏览器 Chrome 上。V8 能够单独运行或者集成在任何一个 C++ 应用内。

Electron将 V8 作为Chromium的一个部分进行构建，然后在构建Node时也指向那个 V8

V8 的版本号总是和谷歌 Chrome的版本号对应。Chrome 59包括 V8 5.9，Chrome 58包括 V8 5.8，等等。

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview `标签用于将 'guest（访客）' 内容（比如外部的网页）集成在你的 Electron 应用内。它们类似于 `iframe`，但是不同的是每个 webview 运行在独立的进程中。 它拥有和你的页面不一样的权限并且所嵌入的内容和你应用之间的交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。
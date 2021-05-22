# 词汇表

这篇文档解释了一些经常在 Electron 开发中使用的专业术语。

### ASAR

ASAR 表示 Atom Shell Archive Format。 一个 [asar][asar] 档案就是一个简单的 `tar` 文件 - 比如将那些有关联的文件放至一个单独的文件格式中。 Electron 能够任意读取其中的文件并且不需要解压整个文件。

ASAR 格式主要是为了提高Windows性能... TODO

### CRT

C 运行时库 (CRT) 是包含了 ISO C99 标准库的 c + + 标准库的一部分。 实现了 CRT 的 Visual c++ 库支持本机代码开发, 以及混合的本机和托管代码, 以及用于. NET 开发的纯托管代码。

### DMG

是指在 macOS 上使用的苹果系统的磁盘镜像打包格式。 DMG 文件通常被用来分发应用的 "installers"（安装包）。 [electron-builder ][]支持使用 `dmg` 来作为编译目标。

### IME

输入法编辑器. 是一个允许用户输入在键盘上找不到的字符和符号的程序。 例如，使用户可以用拉丁语键盘输入中文，日文，韩文和印度文字。

### IDL

界面描述语言。 将函数签名和数据类型写入一个格式，可以用来在 Java、C++、JavaScript 等中生成接口。

### IPC

IPC 代表进程间交流。 Electron 使用 IPC 来在[main(主进程)][]和[renderer(渲染进程)][]之间传递序列化后的 JSON 信息。

### libchromiumcontent

包含 [ Chromium Content module ][] 及其所有依赖项 (例如, Blink、[ V8 ][] 等) 的共享链接库。 也称为 “libcc”。

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. 它也管理着系统原生元素比如菜单，菜单栏，Dock 栏，托盘等。 The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

每个应用的主进程文件都在 中的 `个主` 属性中指定`package.json`。 这是 `电子版。` 知道启动时要执行什么文件。

在Chromium中，此进程被称为“浏览器进程”。 它在 Electron 中重新命名为 以避免与渲染器过程混淆。

参见: [process](#process), [renderer process](#renderer-process)

### MAS

Apple's Mac App Store的缩写。 For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

一种用于进程内部或进程间通信的 IPC 系统, 这很重要, 因为 Chrome会依据内存压力等来决定是否将其工作分拆给不同的进程。

可参考https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Native modules (also called [addons][] in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. 它主要用于桥接在 JavaScript 上运行 Node.js 和 C/C++ 的库。

Electron 支持了原生的 Node 模块，但是 Electron 非常可能安装一个不一样的 V8 引擎通过 Node 二进制编码，所以在打包原生模块的时候你需要在 指定具体的 Electron 本地头文件。

参见： [Using Native Node Modules][].

### NSIS

Nullsoft Scriptable Install System 是一个微软 Windows 平台上的脚本驱动的安装制作工具。 它发布在免费软件许可证书下，是一个被广泛使用的替代商业专利产品类似于 InstallShield。 [electron-builder][] 支持使用 NSIS 作为编译目标。

### OSR

OSR (Off-screen 渲染) 可以在 背景下加载重页面然后在其后显示(它将更快) 它允许您渲染页面而不在屏幕上显示它。

### 进程

一个进程是计算机程序执行中的一个实例。 Electron 应用同时使用了 [main(主进程)][] 和一个或者多个 [rendere(渲染进程)][] 来运行多个程序。

在 Node.js 和 Electron 里面，每个运行的进程包含一个 `process `对象。 这个对象作为一个全局的提供当前进程的相关信息和操作方法。 作为一个全局变量，它在应用内能够不用 require() 来随时取到。

参见： [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. 它们也可以被掩盖。

在普通的浏览器中，web页面通常在沙盒环境中运行，并且无法访问操作系统的原生资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

参见： [process](#process), [main process](#main-process)

### Squirrel

Squirrel 是一个开源的框架来让 Electron 的应用能够自动的更新到发布的新的版本。 详见 [autoUpdater][] API 了解如何开始使用 Squirrel。

### userland

"userland" 或者 "userspace" 术语起源于 Unix 社区，当程序运行在操作系统内核之外。 最近这个术语被推广到 Node 和 npm 社区，用于区分 "Node 内核"功能与在 npm 上注册的"用户" 们所发布的包的功能。

就像 Node ，Electron 致力于使用一些少量的设置和 API 来提供所有的必须的支持给开发中的跨平台应用。 这个设计理念让 Electron 能够保持灵活而不被过多的规定有关于如何应该被使用。 Userland 让用户能够创造和分享一些工具来提额外的功能在这个能够使用的 "core（核心）"之上。

### V8

V8 是 Google开源的 JavaScript 引擎。 它是在 C++ 中写的，并在 Google Chrome 中使用 。 V8可以单独运行，或者可以嵌入任何C++应用程序。

Electron将 V8 作为Chromium的一个部分进行构建，然后在构建Node时也指向那个 V8

V8的版本号总是与 Google Chrome 的版本号相对应。 Chrome 59 包括V8 5.9, Chrome 58 包括V8 5.8等。

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. 作为页面它拥有不一样的权限并且所有的嵌入的内容和你应用之间的交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。

[addons]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[ Chromium Content module ]: https://www.chromium.org/developers/content-module
[electron-builder ]: https://github.com/electron-userland/electron-builder
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main(主进程)]: #main-process
[renderer(渲染进程)]: #renderer-process
[rendere(渲染进程)]: #renderer-process
[Using Native Node Modules]: tutorial/using-native-node-modules.md
[ V8 ]: #v8

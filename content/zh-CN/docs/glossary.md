# 词汇表

这篇文档解释了一些经常在 Electron 开发中使用的专业术语。

### ASAR

ASAR 表示 Atom Shell Archive Format。 一个 [asar][] 档案就是一个简单的 `tar` 文件 - 比如将那些有关联的文件放至一个单独的文件格式中。 Electron 能够任意读取其中的文件并且不需要解压整个文件。

The ASAR format was created primarily to improve performance on Windows when reading large quantities of small files (e.g. when loading your app's JavaScript dependency tree from `node_modules`).

### code signing

Code signing is a process where an app developer digitally signs their code to ensure that it hasn't been tampered with after packaging. Both Windows and macOS implement their own version of code signing. As a desktop app developer, it's important that you sign your code if you plan on distributing it to the general public.

For more information, read the [Code Signing][] tutorial.

### context isolation

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. 实现了 CRT 的 Visual c++ 库支持本机代码开发, 以及混合的本机和托管代码, 以及用于. NET 开发的纯托管代码。

### DMG

是指在 macOS 上使用的苹果系统的磁盘镜像打包格式。 DMG 文件通常被用来分发应用的 "installers"。

### IME

输入法编辑器. 是一个允许用户输入在键盘上找不到的字符和符号的程序。 例如，使用户可以用拉丁语键盘输入中文，日文，韩文和印度文字。

### IDL

接口描述语言（Interface Description Language）。 Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

参见： [main process](#main-process), [renderer process](#renderer-process)

### main process

主进程，通常是指 `main.js` 文件，是每个 Electron 应用的入口文件。 控制着整个应用的生命周期，从打开到关闭。 它也管理着系统原生元素比如菜单，菜单栏，Dock 栏，托盘等。 主进程负责创建 APP 的每一个渲染进程。 包含了全功能的 Node API。

应用的主进程定义在 `package.json` 中的 `main` 属性中。 当您运行 `electron .` 时 Electron 便会知道需要运行哪个文件。

在Chromium中，此进程被称为“浏览器进程”。 Electron 中这样称呼是为了不与渲染进程混淆。

参见: [process](#process), [renderer process](#renderer-process)

### MAS

这是苹果 Mac App Store 的缩写。 有关如何提交您的应用到 MAS 上，请参见 [Mac App Store Submission Guide][]。

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

可参考https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### native modules

原生模块（在 Node.js 中也称为 [addon][]）是用C/C++写成的，可以在 Node.js 中加载，或通过 require() 函数在 Electron 中引入的模块。这些模块用起来与普通的Node.js模块并无二致。 它主要用于桥接在 JavaScript 上运行 Node.js 和 C/C++ 的库。

Electron 支持原生的 Node 模块，但是 Electron 非常可能使用了和你系统中安装的Node所不一样的 V8 版本，所以在构建原生模块的时候你需要手动指定 Electron 所使用的头文件的位置。

For more information, read the [Native Node Modules] tutorial.

### notarization

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). 这使您不必将页面显示到屏幕上也可以渲染它。

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### process

一个进程是计算机程序执行中的一个实例。 Electron 应用同时使用了[main][] 进程和一个或者多个 [renderer][] 进程来运行多个程序。

在 Node.js 和 Electron 里面，每个运行的进程包含一个 `process` 对象。 这个对象作为一个全局的提供当前进程的相关信息和操作方法。 作为一个全局变量，它在应用内能够不用 require() 来随时取到。

参见： [main process](#main-process), [renderer process](#renderer-process)

### renderer process

渲染进程是应用中的浏览器窗口。 与主进程不同，渲染进程可能同时存在多个，同时，每一个渲染进程都运行与独立的进程中。 渲染进程也可以隐藏。

参见： [process](#process), [main process](#main-process)

### sandbox

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel 是一个开源框架, 能够让 Electron 应用程序自动更新到最新发布的版本. 详见 [autoUpdater][] API 了解如何开始使用 Squirrel。

### userland

"userland" 或者 "userspace" 术语起源于 Unix 社区，当程序运行在操作系统内核之外。 最近这个术语被推广到 Node 和 npm 社区，用于区分 "Node 内核"功能与在 npm 上注册的"用户" 们所发布的包的功能。

就像 Node ，Electron 致力于使用较小的API集来支持开发跨平台应用所必需的原语。 这个设计理念让 Electron 能够保持灵活而不被过多的规定有关于如何应该被使用。 Userland 让用户能够创造和分享一些工具来提额外的功能在这个能够使用的 "core（核心）"之上。

### V8

V8 是谷歌开源的 JavaScript 引擎。 它是用 C++ 编写的，用于谷歌的 Chrome 浏览器。 V8 可以单独运行，也可以嵌入任何 C++ 应用程序。

Electron将 V8 作为Chromium的一个部分进行构建，然后在构建Node时也指向那个 V8

V8 的版本号与谷歌 Chrome 的版本号对应。 Chrome 59 的 V8 版本是 5.9，Chrome 58 的V8 版本是 5.8，以此类推。

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` 标签页用于在您的 Electron 应用中嵌入“访客”内容（例如外部网页）。 其功能与 `iframe` 类似，但 webview 运行于独立的进程中。 作为页面它拥有不一样的权限并且所有的嵌入的内容和你应用之间的交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。

[addon]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[Code Signing]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[renderer]: #renderer-process

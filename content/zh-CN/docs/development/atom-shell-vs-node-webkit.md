# Electron 和 NW.js (原名 node-webkit) 在技术上的差异

**注意: Electron 以前被称为 Atom Shell。**

与 NW.js 相似，Electron 提供了一个能通过 JavaScript 和 HTML 创建桌面应用的平台，同时集成 Node 来授予网页访问底层系统的权限。

但是这两个项目也有本质上的区别，使得 Electron 和 NW.js 成为两个相互独立的产品。

**1. 程序的入口**

In NW.js the main entry point of an application is a web page or a JS script. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

在 Electron 中，入口是一个 JavaScript 脚本。 不同于直接提供一个URL，你需要手动创建一个浏览器窗口，然后通过 API 加载 HTML 文件。 你还可以监听窗口事件，决定何时让应用退出。

Electron 的工作方式更像 Node.js 运行时。 Electron 的 APIs 更加底层，因此你可以用它替代 [PhantomJS](http://phantomjs.org/) 做浏览器测试。

**2. 构建系统**

为了避免构建整个 Chromium 带来的复杂度，Electron 通过 [`libchromiumcontent `](https://github.com/electron/libchromiumcontent) 来访问 Chromium 的 Content API。 `libchromiumcontent` 是一个独立的、引入了 Chromium Content 模块及其所有依赖的共享库。 用户不需要一个强劲的机器来构建 Electron。

**3. Node 集成**

在 NW.js，网页中的 Node 集成需要通过给 Chromium 打补丁来实现。但在 Electron 中，我们选择了另一种方式：通过各个平台的消息循环与 libuv 的循环集成，避免了直接在 Chromium 上做改动。 你可以查看 [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) 来了解这是如何完成的。

**4. 多上下文语境**

如果你是有经验的 NW.js 用户，你应该会熟悉 Node 上下文和 web 上下文的概念。这些概念的产生源于 NW.js 的实现方式。

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

注意: 自从 0.13 以来，NW.js 选择性支持多上下文。
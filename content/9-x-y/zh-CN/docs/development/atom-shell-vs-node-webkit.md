# Electron 和 NW.js (原名 node-webkit) 在技术上的差异

__注意: Electron 以前被称为 Atom Shell。__

与 NW.js 相似，Electron 提供了一个能通过 JavaScript 和 HTML 创建桌面应用的平台，同时集成 Node 来授予网页访问底层系统的权限。

但是这两个项目也有本质上的区别，使得 Electron 和 NW.js 成为两个相互独立的产品。

__1. 程序的入口__

在NW.js中，应用的主入口是网页或者JS脚本。 你需要在`package.json`中指定一个html或者js文件，一旦应用的主窗口(在html作为主入口点的情况下)或脚本被执行，应用就会在浏览器窗口打开。

在 Electron 中，入口是一个 JavaScript 脚本。 不同于直接提供一个URL，你需要手动创建一个浏览器窗口，然后通过 API 加载 HTML 文件。 你还可以监听窗口事件，决定何时让应用退出。

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. 构建系统__

为了避免构建整个 Chromium 带来的复杂度，Electron 通过 [`libchromiumcontent `](https://github.com/electron/libchromiumcontent) 来访问 Chromium 的 Content API。 `libchromiumcontent` 是一个独立的、引入了 Chromium Content 模块及其所有依赖的共享库。 用户不需要一个强劲的机器来构建 Electron。

__3. Node 集成__

在 NW.js，网页中的 Node 集成需要通过给 Chromium 打补丁来实现。但在 Electron 中，我们选择了另一种方式：通过各个平台的消息循环与 libuv 的循环集成，避免了直接在 Chromium 上做改动。 你可以查看 [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) 来了解这是如何完成的。

__4. 多上下文语境__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

通过使用Node的[multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622)(多上下文)特性，Electron不需要在网页中引入新的Javascript上下文。

注意: 自从 0.13 以来，NW.js 选择性支持多上下文。

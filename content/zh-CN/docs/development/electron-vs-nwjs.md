# Electron 和 NW.js 之间的技术差异

类似于 NW.js，Electron 提供了一个使用 Web 技术开发桌面应用程序的平台。 两个平台都允许开发者使用 HTML、JavaScript 和 Node.js。 表面上，它们似乎非常相似。

但是这两个项目也有本质上的区别，使得 Electron 和 NW.js 成为两个相互独立的产品。

## 1) 应用程序的入口

在 NW.js 中，应用程序的主入口是一个HTML网页。 在这种情况下，NW.js 将在浏览器窗口中打开给定的入口点。

在 Electron 中，入口点是一个 JavaScript 脚本。 我们需要通过 Javascript 代码手动创建一个浏览器窗口并加载一个 HTML 文件，而不是直接提供一个 URL 的方法。 你还可以监听窗口事件，决定何时让应用退出。

Electron 的工作方式更像 Node.js 的运行时。 而且 Electron 的 API 实际上更为底层，所以我们可以使用它进行相应的浏览器测试并替代 PhantomJS。

## 2) Node 集成

在 NW.js 中，网页中的 Node 集成需要通过给 Chromium 打补丁来实现。但在 Electron 中，我们选择了另一种方式：通过各个平台的消息循环与 libuv 的循环集成，避免了直接在 Chromium 上做改动。 你可以查看 [`node_bindings`][node-bindings] 来了解这是如何完成的。

## 3) Javascript 上下文

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

注意: 自从 0.13 以来，NW.js 选择性支持多上下文。

## 4) 旧版支持

NW.js still offers a "legacy release" that supports Windows XP. It doesn't receive security updates.

Given that hardware manufacturers, Microsoft, Chromium, and Node.js haven't released even critical security updates for that system, we have to warn you that using Windows XP is wildly insecure and outright irresponsible.

However, we understand that requirements outside our wildest imagination may exist, so if you're looking for something like Electron that runs on Windows XP, the NW.js legacy release might be the right fit for you.

## 5) 功能

There are numerous differences in the amount of supported features. Electron has a bigger community, more production apps using it, and [a large amount of userland modules available on npm][electron-modules].

As an example, Electron has built-in support for automatic updates and countless tools that make the creation of installers easier. As an example in favor of NW.js, NW.js supports more `Chrome.*` APIs for the development of Chrome Apps.

Naturally, we believe that Electron is the better platform for polished production applications built with web technologies (like Visual Studio Code, Slack, or Facebook Messenger); however, we want to be fair to our web technology friends. If you have feature needs that Electron does not meet, you might want to try NW.js.

[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common

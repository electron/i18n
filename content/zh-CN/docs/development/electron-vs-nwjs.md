# Electron 和 NW.js 之间的技术差异

类似于 NW.js，Electron 提供了一个使用 Web 技术开发桌面应用程序的平台。 两个平台都允许开发者使用 HTML、JavaScript 和 Node.js。 表面上，它们似乎非常相似。

但是这两个项目也有本质上的区别，使得 Electron 和 NW.js 成为两个相互独立的产品。

## 1) 应用程序的入口

在 NW.js 中，应用程序的主入口是一个 HTML 网页。 在这种情况下，NW.js 得在浏览器窗口中打开给定的入口点。

在 Electron 中，入口点是一个 JavaScript 脚本。 我们需要通过 Javascript 代码手动创建一个浏览器窗口并加载一个 HTML 文件，而不是直接提供一个 URL 的方法。 你还可以监听窗口事件，决定何时让应用退出。

Electron 的工作方式更像 Node.js 运行时。 而且 Electron 的 API 实际上更为底层，所以我们可以使用它进行相应的浏览器测试并替代 PhantomJS。

## 2) Node 集成

在 NW.js 中，网页中的 Node 集成需要通过给 Chromium 打补丁来实现。但在 Electron 中，我们选择了另一种方式：通过各个平台的消息循环与 libuv 的循环集成，避免了直接在 Chromium 上做改动。 你可以查看 [`node_bindings`][node-bindings] 来了解这是如何完成的。

## 3) Javascript 上下文

如果你是一个经验丰富的 NW.js 用户，你应该熟悉节点上下文和网页上下文的概念。 这些概念是由于 NW.js 的实现方式而发明的。

通过使用 Node 的 [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622)（多上下文）特性，Electron 不需要在网页中引入新的 Javascript 上下文。

注意：从 0.13 开始，NW.js 也支持使用多上下文。

## 4) 旧版支持

NW.js 仍然提供一个支持 Windows XP 的 "传统版本"， 它没有收到安全更新。

鉴于硬件制造商、微软、Chromium 和 Node.js 甚至没有为该系统发布关键的安全更新，我们不得不警告你，使用 Windows XP 是非常不安全的，是彻头彻尾的不负责任。

然而，我们明白，可能存在超出我们想象的要求存在，因此，如果你正在寻找像 Electron 那样在 Windows XP 上运行的东西，NW.js 的传统版本可能是适合你的。

## 5) 功能

在支持的功能数量上有许多差异。 Electron有一个更大的社区，有更多的生产应用在使用它，并且[有大量的用户端模块在 npm 上可用][electron-modules]。

例如，Electron 内置了对自动更新的支持和无数的工具，使安装程序更加容易创建。 一个有利于 NW.js 的例子，NW.js 支持更多的 `Chrome.*` API，用于开发 Chrome 应用程序。

当然，我们相信 Electron 是用 Web 技术构建生产应用程序更好的平台（如 Visual Studio Code、Slack 或 Facebook Messenger）；但是，我们希望公平对待同样用 Web 技术的朋友。 如果你有 Electron 不能满足的功能需求，你可能需要尝试 NW.js。

[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common

# Electron 和 NW.js 之间的技术差异

与 [NW.js][nwjs]一样，Electron 提供了一个平台，可以使用 Web 技术编写桌面应用程序。 这两个平台都使开发人员能够利用HTML、JavaScript和 节点.js。 从表面上看，它们看起来非常相似。

然而，这两个项目之间有着根本的区别，它们使 电子成为与NW.js完全分离的产品。

## 1） 申请录入

在 NW .js 中，应用程序的主要切入点可能是 HTML 网页。 在这种情况下 ，NW.js将在浏览器窗口中打开给定的入口点。

在电子中，入口点始终是 JavaScript 脚本。 您不是直接提供 URL，而是手动创建浏览器窗口，并使用 API 加载 HTML 文件。 您还需要收听窗口事件，以决定何时退出 应用程序。

电子的工作原理更像节点.js运行时间。 Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](https://phantomjs.org/).

## 2） 节点集成

在 NW .js 中，网页中的节点集成需要修补 Chromium 才能工作， 而在 Electron 中，我们选择了一种不同的方式将 `libuv` 环与每个平台的消息循环 集成，以避免黑客攻击 Chromium。 你可以查看 [`node_bindings`][node-bindings] 来了解这是如何完成的。

## 3） 爪哇脚本上下文

如果您是经验丰富的NW.js用户，您应该熟悉 节点上下文和 Web 上下文的概念。 这些概念的发明是因为NW.js 是如何实现的。

通过使用节点的 [多上下文](https://github.com/nodejs/node-v0.x-archive/commit/756b622) 功能，Electron 不会在 web 页面中引入新的 JavaScript 上下文。

注意: 自从 0.13 以来，NW.js 选择性支持多上下文。

## 4） 传统支持

NW.js仍然提供支持WindowsXP的"传统版本"。 它不会 收到安全更新。

鉴于硬件制造商，微软，铬和节点.js还没有 发布该系统的关键安全更新，我们必须警告你 使用Windows XP是非常不安全和完全不负责任的。

但是，我们理解，超出我们最疯狂想象力的要求可能 存在，因此，如果您正在寻找类似在 Windows XP 上运行的电子， NW.js传统版本可能适合您。

## 5） 特点

支持功能的数量存在许多差异。 电子已经 一个更大的社区，更多的生产应用程序使用它，并 [大量的 用户区模块可在npm][electron-modules]。

例如，Electron 内置了对自动更新的支持，以及无数 工具，使安装程序的创建更加容易。 例如，支持 NW.js，NW.js支持更多 `Chrome.*` ABI 开发 Chrome 应用程序。

当然，我们相信电子是更好的平台，抛光 生产应用程序建立与网络技术（如视觉工作室代码， 松弛，或Facebook信使）：然而，我们希望公平对待我们的网络技术 朋友。 如果您有电子无法满足的功能需求，您可能需要 尝试 NW .js。

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common

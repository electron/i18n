# Election 和 NW.js 的技术差异

和 [NW.js][nwjs] 一样，Electron 提供了一个使用 web 技术来编写桌面应用的平台。 这两平台都使得开发者能够利用 HTML、Javascript 和 Node.js 进行开发。 乍一看，它们非常相似。

然而，这两个项目之间存在着根本性的差别，让 Electron 成为一个与 NW.js 完全不同的产品。

## 1) 应用的入口

在 NW.js 中，应用程序的主入口可以是 HTML 网页。 因此，NW.js 会在浏览器视窗中打开指定的入口文件。

而 Electron 则直接以 Javascript 作为程序的入口。 你需要手动使用 API 来创建浏览器视窗、加载 HTML 文件，而不是直接输入一个 URL。 你还需要通过监听 window 事件来决定退出程序的时机。

Electron 的工作模式更像 Node.js 运行时。 Electron 所提供的 API 能够直接控制底层系统的功能，你可以用它來代替 [ PhantomJS ](http://phantomjs.org/) 进行浏览器测试。

## 2) Node 集成

在 NW.js 中，web 页面集成 Node 需要魔改 Chromium 才能运行。而 Electron 采用 `libuv` loop 结合各平台通信 loop 的形式来实现，从而避免对 Chromium 进行修改。 查看 [`node_bindings`][node-bindings] 代码可以了解其实现原理。

## 3) JavaScript 上下文

如果你是经验丰富的 NW.js 使用者，你应该会熟悉 Node 上下文和 web 上下文的概念。 这两个概念是在实现 NW.js 时引入的。

通过使用 Node 的 [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) 特性，Electron 不需要在 web 页面中引入新的 JavaScript 上下文。

提示：NW.js 自 0.13 版本起就支持可选的 multi-context。

## 4) 历史版本支持

NW.js 仍然提供一个历史版本来支持 Windows XP。 但它不能得到安全更新。

鉴于硬件制造商、微软、Chromium 和 Node.js 尚未发布该系统的关键安全更新，我们必须警告你，使用 Windows XP 非常不安全，且完全不负责任。

但我们也理解这种需求存在的可能性。因此，如果你正在寻找像 Electron 这种能够 Windows XP 上运行的应用，那么 NW.js 旧版本可能适合你。

## 5) 特性

在众多支持的特性中，存在许多差异。 Electron 拥有更大的社区，更多的应用实践和[大量的第三方 npm 模块][electron-modules].

举个例子，Electron 内置支持自动更新和无数工具的支持，使得安装程序的开发更容易。 再举个亲 NW.js 例子，NW.js 支持更多 `Chrome.*` APIs 来开发 Chrome 应用。

当然，我们相信 Electron 是使用 web 技术创建生产应用更好的平台 (已有应用如 Visual Studio Code, Slack 和 Facebook Messenger)。然而，我们也想公平对待我们的友商。 如果你有 Electron 未满足的功能需求，你也可以考虑下 NW.js。

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common

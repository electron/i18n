# 网络嵌入

## 概览

如果你想在电子 `BrowserWindow`中嵌入（第三方）网络内容， 有三个选项可供您使用： `<iframe>` 标签、 `<webview>` 标签、 和 `BrowserViews`。 每个功能都略有不同，在不同情况下 有用。 为了帮助您在两者之间进行选择，本指南 解释了每个选项的差异和功能。

### Iframe

Iframe 在 Electron 中的行为与普通浏览器中类似。 页面中的 `<iframe>` 元素可以显示外部网页，前提是其 [内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 允许。 为了限制 `<iframe>` 标签中站点的功能数量，建议 使用 [`sandbox` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) ，并且只允许您想要支持的功能。

### WebView

> 重要注意： [我们不建议您使用 WebViews](../api/webview-tag.md#warning)， ，因为此标签会经历戏剧性的架构更改，可能会影响应用 的稳定性。 考虑切换到其他选择，如 `iframe` 和 电子的 `BrowserView`，或避免嵌入式内容 的设计。

[网络视图](../api/webview-tag.md) 基于Chromium的WebViews， 电子公司没有明确支持。 我们不保证 WebView API 在未来版本的电子版中保持可用。 要使用 `<webview>` 标签，您 需要在 `BrowserWindow``webPreferences` 设置 `webviewTag` `true` 。

WebView 是一种仅在电子内部工作的自定义元素（`<webview>`）。 它们以 "进程外 iframe" 实现。 这意味着与 `<webview>` 的所有 通信都是使用 IPC 异步完成的。 `<webview>` 元素有许多自定义方法和事件，类似于 `webContents`，为您提供了对内容的更大控制。

与 `<iframe>`相比， `<webview>` 速度往往稍慢一些，但在加载和与第三方内容的加载和通信 和处理各种事件方面提供了 更大的控制。

### BrowserView

[浏览器视图](../api/browser-view.md) 不是 DOM 的一部分 - 相反， 它们是由您的主过程创建和控制的。 它们只是 您现有窗口之上的另一层 Web 内容。 这意味着 它们与您自己的 `BrowserWindow` 内容完全分离，并且 它们的位置不受 DOM 或 CSS 控制。 相反，它通过在主过程中设置界限来控制 。

`BrowserViews` 对其内容提供最大的控制，因为他们 实施与 `BrowserWindow` 类似的 `webContents` 。 但是，由于 `BrowserViews` 不是 DOM 的一部分，而是覆盖在它们之上 ，因此您必须手动管理它们的位置。

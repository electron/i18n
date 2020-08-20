# 语言

如果要在Electron BrowserWindow中嵌入（第三方）Web 内容，有三个选项可供您使用： `<iframe>`标记、`<webview>`标记和 `BrowserViews`。 每个功能都略有不同，适用于不同的情况。 为了帮助您在这些选择之间进行选择，本指南将解释他们之间的差异和功能。

## Iframe

Iframe 在 Electron 中的行为与普通浏览器中类似。 一个`<iframe>`元素能在页面上显示外部网页，在宿主页面的[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)允许范围内。 要限制`<iframe>`标签内的站点的功能特性，建议使用[`sandbox`属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox)并仅允许你想要支持的功能特性。

## WebView

[WebViews](../api/webview-tag.md)基于 Chromium 的 WebView，不被 Electron 明确支持。 我们不能保证WebView API 在未来版本的 Electron 中仍然可用。 这就是为什么如果您想要使用`<webview>`标签，您需要在`BrowserWindow` 的 `webPreferences` 中设置 `webviewTag` 为 `true`。

WebView是一个自定义元素 (`<webview>`)，仅在 Electron 内工作。 它们以 "进程外 iframe" 实现。 这意味着所有与 `<webview>` 的通信都是异步使用 IPC 进行的。 `<webview>`元素有许多自定义方法和事件，类似于`webContents`，使您能够更多地控制内容。

与 `<iframe>`，`<webview>` 相比往往稍慢，但在加载和与第三方内容通信以及处理各种事件方面提供了更大的控制。

## BrowserView

[BrowserViews](../api/browser-view.md) 不是 DOM 的一部分，而是由主进程创建和控制。 它们只是现有窗口之上的另一层 Web 内容。 这意味着它们与您自己的 `BrowserWindow` 内容完全分离，并且它们的位置不受 DOM 或 CSS 的控制，而是通过在主进程中设置边界来控制其位置。

BrowserViews 提供对其内容的最大控制，因为它们实现 `webContents` 的方式与 `BrowserWindow` 实现内容的方式类似。 但是，它们不是 DOM 的一部分，而是覆盖在 DOM 之上，这意味着您必须手动管理其位置。

# Web embeds

## 概览

有三种方式可以让你在Electron的</code>BrowserWindow</code>里集成（第三方）web内容，`<iframe>`, `<webview>` 和 `BrowserViews</0> 每个功能都略有不同，适用于不同的情况。 为了帮助您在这些选择之间进行选择，本指南将解释他们之间的差异和功能。</p>

<h3 spaces-before="0">Iframes</h3>

<p spaces-before="0">Iframe 在 Electron 中的行为与普通浏览器中类似。 在宿主页面的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content Security Policy</a>允许范围内，一个<code><iframe>`元素能在页面上显示外部网页。 为了限制iframe标签中站点的功能，建议使用</a>的

`sandbox` 属性，并且仅允许您想要支持的功能。</p> 



### WebView



> 重要提示： [我们不建议您使用 WebView](../api/webview-tag.md#warning)，因为这个标签会发生剧烈的结构变化，可能会影响您应用程序的稳定性。 考虑切换到其他选择，如 `iframe` 和Electron的 `BrowserView`，或避免嵌入式内容 设计的架构。

[WebViews](../api/webview-tag.md)基于 Chromium 的 WebView，不被 Electron 明确支持。 我们不能保证WebView API 在未来版本的 Electron 中仍然可用。 这就是为什么如果您想要使用`<webview>`标签，您需要在`BrowserWindow` 的 `webPreferences` 中设置 `webviewTag` 为 `true`。

WebView是一个自定义元素 (`<webview>`)，仅在 Electron 内工作。 它们作为“进程外框架”执行。 这意味着所有与 `<webview>` 的通信都是异步使用 IPC 进行的。 `<webview>`元素有许多自定义方法和事件，类似于`webContents`，使您能够更多地控制内容。

与 `<iframe>`，`<webview>` 相比往往稍慢，但在加载和与第三方内容通信以及处理各种事件方面提供了更大的控制。



### BrowserView

[BrowserViews](../api/browser-view.md) 不是 DOM 的一部分，而是由主进程创建和控制。 它们只是现有窗口之上的另一层 Web 内容。 这意味着它们与您自己的 `BrowserWindow` 内容完全分离，并且它们的位置不受 DOM 或 CSS 的控制，而是通过在主进程中设置边界来控制其位置。 相反，它通过在主进程中设置界面来控制 。

BrowserViews 提供对其内容的最大控制，因为它们实现 `webContents` 的方式与 `BrowserWindow` 实现内容的方式类似。 但是，由于 `BrowserViews` 不是 DOM 的一部分，而是覆盖在它们之上，因此您必须手动管理它们的位置。

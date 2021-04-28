# Web embeds

## 概览

有三种方式可以让你在Electron的</code>BrowserWindow</code>里集成（第三方）web内容，`<iframe>`, `<webview>` 和 `BrowserViews</0> 每个功能都略有不同，适用于不同的情况。 为了帮助您在这些选择之间进行选择，本指南将解释他们之间的差异和功能。</p>

<h3 spaces-before="0">Iframe</h3>

<p spaces-before="0">Iframe 在 Electron 中的行为与普通浏览器中类似。 在宿主页面的<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">内容安全策略</a>允许范围内，一个<code><iframe>`元素能在页面上显示外部网页。 To limit the number of capabilities of a site in an `<iframe>` tag, it is recommended to use the [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) and only allow the capabilities you want to support.

### WebView

> Important Note: [we do not recommend you to use WebViews](../api/webview-tag.md#warning), as this tag undergoes dramatic architectural changes that may affect stability of your application. Consider switching to alternatives, like `iframe` and Electron's `BrowserView`, or an architecture that avoids embedded content by design.

[WebViews](../api/webview-tag.md) are based on Chromium's WebViews and are not explicitly supported by Electron. We do not guarantee that the WebView API will remain available in future versions of Electron. To use `<webview>` tags, you will need to set `webviewTag` to `true` in the `webPreferences` of your `BrowserWindow`.

WebView is a custom element (`<webview>`) that will only work inside Electron. 它们以 "进程外 iframe" 实现。 This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that provide you with greater control over the content.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third-party content and handling various events.

### BrowserView

[BrowserViews](../api/browser-view.md) are not a part of the DOM - instead, they are created in and controlled by your Main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and their position is not controlled by the DOM or CSS. Instead, it is controlled by setting the bounds in the Main process.

`BrowserViews` offer the greatest control over their contents, since they implement the `webContents` similarly to how the `BrowserWindow` does it. However, as `BrowserViews` are not a part of your DOM, but are rather overlaid on top of them, you will have to manage their position manually.

# 语言

如果要在Electron BrowserWindow中嵌入（第三方）Web 内容，有三个选项可供您使用： `<iframe>`标记、`<webview>`标记和 `BrowserViews`。 每个功能都略有不同，适用于不同的情况。 为了帮助您在这些选择之间进行选择，本指南将解释他们之间的差异和功能。

## Iframes

Iframes in Electron behave like iframes in regular browsers. An `<iframe>` element in your page can show external web pages, provided that their [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) allows it. To limit the amount of capabilities a site in an `<iframe>` tag, it's recommended to use the [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) and only allow the capabilities you want to support.

## WebViews

[WebViews](../api/webview-tag.md) are based on Chromium's WebViews and are not explicitly supported by Electron. We do not guarantee that the WebView API will remain available in future versions of Electron. This is why, if you want to use `<webview>` tags, you will need to set `webviewTag` to `true` in the `webPreferences` of your `BrowserWindow`.

WebViews are a custom element (`<webview>`) that will only work inside Electron. They are implemented as an "out-of-process iframe". This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that allow you much greater control over the contents.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third party content and handling various events.

## BrowserViews

[BrowserViews](../api/browser-view.md) are not part of the DOM - instead, they are created in and controlled by your main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.

# Web embeds in Electron

Electron の `BrowserWindow` に (サードパーティ) ウェブコンテンツを埋め込みたい場合は、`<iframe>` タグ、`<webview>` タグ、 `BrowserView` の3つの選択肢があります。 それぞれ多少の異なる機能を提供しており、さまざまな状況で役立ちます。 これらの選択を支援するため、このガイドではそれぞれの違いと機能についてを説明しています。

## iframe

Electron の iframe は一般的なブラウザの iframe のように動作します。 [コンテンツセキュリティポリシー (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) で許可されている場合、ページの `<iframe>` 要素に外部ウェブページを表示できます。 `<iframe>` タグ内のサイト機能を制限するには、[`sandbox` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) を使用してサポートしたい機能のみを許可することを推奨します。

## WebView

[WebView](../api/webview-tag.md) は Chromium の WebView が基ですが、Electron には明示的にサポートされていません。 将来の Electron のバージョンでも WebView API が利用できる保証はありません。 これは、`<webview>` タグを使用する場合、`BrowserWindow` の `webPreferences` に内で `webviewTag` を `true` に設定する必要があるからです。

WebViews are a custom element (`<webview>`) that will only work inside Electron. They are implemented as an "out-of-process iframe". This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that allow you much greater control over the contents.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third party content and handling various events.

## BrowserViews

[BrowserViews](../api/browser-view.md) are not part of the DOM - instead, they are created in and controlled by your main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.

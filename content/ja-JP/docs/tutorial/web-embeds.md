# Web embeds in Electron

Electron の `BrowserWindow` に (サードパーティ) ウェブコンテンツを埋め込みたい場合は、`<iframe>` タグ、`<webview>` タグ、 `BrowserView` の3つの選択肢があります。 それぞれ多少の異なる機能を提供しており、さまざまな状況で役立ちます。 これらの選択を支援するため、このガイドではそれぞれの違いと機能についてを説明しています。

## iframe

Electron の iframe は一般的なブラウザの iframe のように動作します。 [コンテンツセキュリティポリシー (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) で許可されている場合、ページの `<iframe>` 要素に外部ウェブページを表示できます。 `<iframe>` タグ内のサイト機能を制限するには、[`sandbox` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) を使用してサポートしたい機能のみを許可することを推奨します。

## WebView

[WebView](../api/webview-tag.md) は Chromium の WebView が基ですが、Electron には明示的にサポートされていません。 将来の Electron のバージョンでも WebView API が利用できる保証はありません。 これは、`<webview>` タグを使用する場合、`BrowserWindow` の `webPreferences` に内で `webviewTag` を `true` に設定する必要があるからです。

WebView は、Electron 内でのみ機能するカスタム要素 (`<webview>`) です。 これは "プロセス外 iframe" として実装されています。 つまり、`<webview>` とのすべての通信は IPC を用いて非同期的に行われます。 `<webview>` 要素には `webContents` と似通った多くのカスタムメソッドやイベントがあり、コンテンツをより細かく制御できます。

`<iframe>`と比較して `<webview>` はやや遅い傾向がありますが、サードパーティコンテンツのロード、通信、さまざまなイベントの処理をより広く制御できます。

## BrowserView

[BrowserViews](../api/browser-view.md) は DOM の一部ではなく、メインプロセスで作成および制御されます。 これは、既存のウィンドウ上に別のレイヤーでウェブコンテンツがあるだけです。 This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.

# ウェブ埋め込み

## 概要

Electron の `BrowserWindow` に (サードパーティ) ウェブコンテンツを埋め込みたい場合は、`<iframe>` タグ、`<webview>` タグ、 `BrowserView` の 3 つの選択肢があります。 それぞれ多少の異なる機能を提供しており、さまざまな状況で役立ちます。 これらの選択を支援するため、このガイドではそれぞれの選択肢の違いと機能について説明します。

### iframe

Electron の iframe は一般的なブラウザの iframe のように動作します。 [コンテンツセキュリティポリシー](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) で許可されている場合、ページの `<iframe>` 要素に外部ウェブページを表示できます。 `<iframe>` タグ内のサイト機能を制限するために、[`sandbox` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) を使用してサポートしたい機能のみを許可することを推奨します。

### WebView

> 重要な注意: WebView タグはアプリケーションの安定性に影響を与えうる劇的なアーキテクチャ変更を受けているため、[これの利用は非推奨です](../api/webview-tag.md#warning)。 `iframe` や Electron の `BrowserView` のような代替品や、設計の段階からコンテンツ埋め込みを避けるアーキテクチャへ切り替えるように検討してください。

[WebView](../api/webview-tag.md) は Chromium の WebView が基ですが、Electron は明示的にサポートしていません。 将来の Electron のバージョンでも WebView API が利用できる保証はありません。 `<webview>` タグを使用する場合、`BrowserWindow` の `webPreferences` に内で `webviewTag` を `true` に設定する必要があります。

WebView は、Electron 内でのみ機能するカスタム要素 (`<webview>`) です。 これは "プロセス外 iframe" として実装されています。 つまり、`<webview>` とのすべての通信は IPC を用いて非同期的に行われます。 `<webview>` 要素には、`webContents` と同様に多くのカスタムメソッドとイベントがあり、コンテンツのより広い制御を提供します。

`<iframe>` と比較して `<webview>` はやや遅い傾向がありますが、サードパーティコンテンツのロード、通信など、さまざまなイベントの処理をより広く制御できます。

### BrowserView

[BrowserView](../api/browser-view.md) は DOM の一部ではなく、メインプロセスで作成および制御されます。 これは、単に既存のウインドウ上に別のレイヤーでウェブコンテンツがあるだけです。 つまり、作成してある `BrowserWindow` のコンテンツから完全に分離され、その位置は DOM や CSS によって制御されません。 その代わり、メインプロセスで領域を設定して制御します。

`BrowserView` は `BrowserWindow` の動作と同じになる様に `webContents` を実装しているので、コンテンツに対して最大限の制御を提供できます。 しかし、`BrowserView` は DOM の一部ではなく画面上に重ねてあるだけなので、その位置は手動で管理する必要があります。

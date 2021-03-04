# Chrome 拡張機能サポート

Electron は [Chrome 拡張機能 API][chrome-extensions-api-index] のサブセットをサポートしており、主にデベロッパー ツール拡張機能と Chromium 内部拡張機能をサポートしていますが、他の拡張機能もサポートしています。

> **注意:** Electron はストアのすべての Chrome 拡張機能はサポートしていません。Chrome の拡張機能の実装と完全に互換性を持たせることは Electron プロジェクトの **目標ではありません**。

## 拡張機能の読み込み

Electron は解凍された拡張機能のみの読み込みをサポートしています (例えば `.crx` ファイルは動作しません)。 拡張機能は `session` ごとにインストールされます。 拡張機能を読み込むには、以下のように [`ses.loadExtension`](session.md#sesloadextensionpath-options) を呼び出します。

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

読み込まれた拡張機能は終了時に自動で記憶されません。アプリを実行する度に`loadExtension` を呼び出さないと、拡張子は読み込まれません。

注意として、拡張機能の読み込みは持続する session でのみサポートされます。 拡張機能をメモリで一時的な session に読み込もうとすると、エラーが送出されます。

有効な拡張機能の読み込み、解除、クエリについての詳細は [`session`](session.md) のドキュメントを参照してください。

## サポートする拡張機能 API

いくつかの注意点はありますが、以下の拡張機能 API をサポートしています。 他の API も追加でサポートされる可能性がありますが、ここに記載されていない API のサポートは暫定であり、削除される可能性があります。

### `chrome.devtools.inspectedWindow`

この API はすべての機能がサポートされています。

### `chrome.devtools.network`

この API はすべての機能がサポートされています。

### `chrome.devtools.panels`

この API はすべての機能がサポートされています。

### `chrome.extension`

`chrome.extension` のうち以下のプロパティがサポートされています。

- `chrome.extension.lastError`

`chrome.extension` のうち以下のメソッドがサポートされています。

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

`chrome.runtime` のうち以下のプロパティがサポートされています。

- `chrome.runtime.lastError`
- `chrome.runtime.id`

`chrome.runtime` のうち以下のメソッドがサポートされています。

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

`chrome.runtime` のうち以下のイベントがサポートされています。

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

`chrome.storage.local` のみがサポートされており、`chrome.storage.sync` と `chrome.storage.managed` はサポートされていません。

### `chrome.tabs`

`chrome.tabs` のうち以下のメソッドがサポートされています。

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **注:** Chrome では、タブ ID に `-1` を渡すと "現在アクティブなタブ" を意味します。 Electron にはそのような概念がないため、タブ ID として `-1` を渡すことはサポートされておらず、エラーとなります。

### `chrome.management`

`chrome.management` のうち以下のメソッドがサポートされています。

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

この API はすべての機能がサポートされています。

> **注意:** ハンドラが競合する場合は、`chrome.webRequest` より Electron の [`webRequest`](web-request.md) モジュールのものが優先されます。

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index

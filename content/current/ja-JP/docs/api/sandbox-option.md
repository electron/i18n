# `sandbox` オプション

> Create a browser window with a sandboxed renderer. このオプションを有効にすると、レンダラーは Node API にアクセスするために IPC 経由でメインプロセスと通信する必要があります。

Chromium の主なセキュリティ機能の1つは、すべての Blink レンダリング / JavaScript コードがサンドボックス内で実行されることです。 このサンドボックスは、OS 固有の機能を使用して、レンダラープロセスの悪用がシステムに悪影響を及ぼすことがないようにします。

つまり、サンドボックスが有効になっている場合、レンダラーは、IPC を介してメインプロセスにタスクを委譲することによってのみ、システムを変更することができます。 サンドボックスについて詳しくは [こちら](https://www.chromium.org/developers/design-documents/sandbox) を参照してください。

Electron の大きな特徴は、レンダラープロセスで Node.js を実行する機能 (ウェブ技術を使用してデスクトップアプリケーションを開発することを容易にする機能) であるため、サンドボックスは Electron によって無効にされます。 これは、ほとんどの Node.js API にシステムアクセスが必要なためです。 例えば `require()` では、サンドボックス環境では使用できない、ファイルシステムのアクセス許可がなければ動作しません。

通常、これはデスクトップアプリケーションにとっては問題ではありません。コードは常に信頼されていますが、信頼できないウェブコンテンツを表示すると、Chromium より Electron のほうが、堅牢性が低くなります。 よりセキュリティを必要とするアプリケーションであれば、`sandbox` フラグでサンドボックスと互換性のある古典的な Chromium レンダラーを Electron で生成することを強制します。

サンドボックス化されたレンダラーには Node.js 環境が実行されず、Node.js JavaScript API がクライアントコードに公開されません。 唯一の例外はプリロードスクリプトで、Electron レンダラー API のサブセットにアクセスできます。

他の違いは、サンドボックス化されたレンダラーはデフォルトの JavaScript API を変更しないという点です。 したがって、`window.open` などの一部の API は Chromium と同じように動作します (つまり [`BrowserWindowProxy`](browser-window-proxy.md) を返しません)。

## サンプル

サンドボックス化されたウインドウを作成するには、`webPreferences` へ `sandbox: true` を渡して下さい。

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

上記のコードでは、作成された [`BrowserWindow`](browser-window.md) では Node.js が無効になっており、IPC 経由でのみ通信できます。 このオプションを使用すると、Electron がレンダラー内の Node.js ランタイムを作成しなくなります。 また、この新しいウィンドウ内では、`window.open` はネイティブの動作に従います (デフォルトで Electron は [`BrowserWindow`](browser-window.md) を作成し、`window.open` を介してこれへプロキシを返します)。

[`app.enableSandbox`](app.md#appenablesandbox-experimental) を使用すると、すべての `BrowserWindow` インスタンスに対して `sandbox:true` を強制することができます。

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## プリロード

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

そして preload.js は、

```js
// Javascript のコンテキストを作成するときにこのファイルが読み込まれます。 
// Electron レンダラー API のサブセットにアクセスできるプライベートスコープで動作します。 
// グローバルスコープにオブジェクトをリークしないように注意する必要があります。
const { ipcRenderer, remote } = require('electron')
const fs = require('fs')

// `fs` モジュールを使用してコンフィグファイルを読む
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

以下はプリロードスクリプトで注意すべき重要な点です。

- サンドボックス化されたレンダラーには Node.js が実行されていませんが、`Buffer`、`process`、`setImmediate`、`clearImmediate`、および `require` が利用可能な、制限された Node 風の環境にはまだアクセスできます。
- プリロードスクリプトは、`remote` および `ipcRenderer` モジュールを介してメインプロセスからすべての API に間接的にアクセスできます。
- プリロードスクリプトは単一のスクリプトに含まれていなければなりませんが、以下で説明するように webpack や browserify のようなツールを使用すると複雑なプリロードコードを複数のモジュールで構成することができます。 browserify を用いる例は以下のとおりです。

browserify バンドルを作成してプリロードスクリプトとして使用するには、以下のようなものを使用する必要があります。

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

`-x` フラグは、プリロードスコープで既に公開されている require したモジュールに使用する必要があります。また、`require` 関数を使用するように browserify に指示します。 `--insert-global-vars` は、`process`、`Buffer`、`setImmediate` も外部スコープから取得するようにします (通常、browserify はそれらのコードを挿入します)。

現在、プリロードスコープで提供されている `require` 関数は、以下のモジュールを公開しています。

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `イベント`
- `timers`
- `url`

より多くの Electron API をサンドボックスに公開するために、必要に応じて追加することができますが、メインプロセスのどのモジュールも `electron.remote.require` で既に使用できます。

## 状況

まだ実験的な機能なので、`sandbox` オプションは慎重に使用してください。 プリロードスクリプトにいくつかの Electron レンダラー API を公開することによるセキュリティの影響をまだ確認していませんが、信頼できないコンテンツをレンダリングする前に考慮すべき点がいくつかあります。

- [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) も有効になっていないと、プリロードスクリプトは信頼できないコードに誤って特権 API をリークする可能性があります。
- V8 エンジンのいくつかのバグで、悪意のあるコードがレンダラープリロード API にアクセスし、`remote` モジュールを介してシステムに完全にアクセスできるようにする可能性があります。 したがって、[`remote` モジュールを無効にすることを強くお勧めします](../tutorial/security.md#15-disable-the-remote-module)。 無効化できない場合は、`remote` モジュールを選択して [フィルタリング](../tutorial/security.md#16-filter-the-remote-module) する必要があります。

信頼できないコンテンツを Electron で描画することはまだ未知の領域なので、サンドボックスプリロードスクリプトに公開されている API は他の Electron API よりも不安定であるとみなされ、セキュリティ上の問題を修正するための変更が行われる可能性があります。

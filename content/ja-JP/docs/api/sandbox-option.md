# `sandbox` オプション

> Chromium OS のサンドボックス内で実行できるレンダラを備えたブラウザウィンドウを作成します。 このオプションを有効にすると、レンダラーは Node API にアクセスするために IPC 経由でメインプロセスと通信する必要があります。 However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

Chromium の主なセキュリティ機能の1つは、すべての Blink レンダリング / JavaScript コードがサンドボックス内で実行されることです。 このサンドボックスは、OS 固有の機能を使用して、レンダラープロセスの悪用がシステムに悪影響を及ぼすことがないようにします。

つまり、サンドボックスが有効になっている場合、レンダラーは、IPC を介してメインプロセスにタスクを委譲することによってのみ、システムを変更することができます。 サンドボックスについて詳しくは [こちら](https://www.chromium.org/developers/design-documents/sandbox) を参照してください。

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. 例えば `require()` では、サンドボックス環境では使用できない、ファイルシステムのアクセス許可がなければ動作しません。

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

他の違いは、サンドボックス化されたレンダラーはデフォルトの JavaScript API を変更しないという点です。 Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

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

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

このオプションだけでは OS が施行するサンドボックスが有効にならないことに注意することが重要です。 この機能を有効にするには、`--enable-sandbox` コマンドライン引数を電子に渡す必要があります。これにより、すべての `BrowserWindow` インスタンスに対して `sandbox: true` が強制されます。

アプリをサンドボックス内に置かずに、`sandbox:true` で `BrowserWindow` または `webview` プロセスで OS が施行するサンドボックスを有効にするには、 `--enable-mixed-sandbox` コマンドライン引数を Electron に渡す必要があります。 このオプションは現在 macOS と Windows でのみのサポートされています。

```js
let win
app.on('ready', () => {
  // `--enable-sandbox` を有効にしてからは `sandbox: true` を渡す必要はない
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
electron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

サンドボックスレンダラーと非サンドボックスレンダラーを1つのアプリケーションで混在させる必要がある場合は、`--enable-sandbox` 引数を省略します。 Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

アプリは、プリロードスクリプトを使用してサンドボックス化されたレンダラーをカスタマイズすることができます。以下はサンプルです。

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

そして preload.js は、

```js
// Javascript のコンテキストを作成するときにこのファイルが読み込まれます。 It runs in a
// private scope that can access a subset of Electron renderer APIs. 
// グローバルスコープにオブジェクトをリークしないように注意する必要があります。
const fs = require('fs')
const { ipcRenderer } = require('electron')

// read a configuration file using the `fs` module
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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- プリロードスクリプトは、`remote` および `ipcRenderer` モジュールを介してメインプロセスからすべての API に間接的にアクセスできます。 これは `fs` (上記で使用された) と他のモジュールがどのように実装されるか――メインプロセスのリモート相手へのプロキシ――です。
- プリロードスクリプトは単一のスクリプトに含まれていなければなりませんが、以下で説明するように browserify のようなツールを使用すると複雑なプリロードコードを複数のモジュールで構成することができます。 In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

browserify バンドルを作成してプリロードスクリプトとして使用するには、以下のようなものを使用する必要があります。

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

`-x` フラグは、プリロードスコープで既に公開されている require したモジュールに使用する必要があります。また、`require` 関数を使用するように browserify に指示します。 `--insert-global-vars` は、`process`、`Buffer`、`setImmediate` も外部スコープから取得するようにします (通常、browserify はそれらのコードを挿入します)。

現在、プリロードスコープで提供されている `require` 関数は、以下のモジュールを公開しています。

- `child_process`
- `electron` 
  - `crashReporter`
  - `remote`
  - `ipcRenderer`
  - `webFrame`
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## 状況

まだ実験的な機能なので、`sandbox` オプションは慎重に使用してください。 We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- プリロードスクリプトは、誤って特権 API を信頼できないコードにリークさせる可能性があります。
- V8 エンジンのいくつかのバグで、悪意のあるコードがレンダラープリロード API にアクセスし、`remote` モジュールを介してシステムに完全にアクセスできるようにする可能性があります。

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

計画されている、セキュリティを大幅に強化する機能の1つは、デフォルトでサンドボックス化したレンダラーからの IPC メッセージをブロックし、レンダラーが送信できるメッセージセットをメインプロセスが明示的に定義できるようにするものです。
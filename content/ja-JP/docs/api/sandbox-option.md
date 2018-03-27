# `sandbox` オプション

> Chromium OS のサンドボックス内で実行できるレンダラを備えたブラウザウィンドウを作成します。 このオプションを有効にすると、レンダラーは Node API にアクセスするために IPC 経由でメインプロセスと通信する必要があります。 しかし、Chromium OS サンドボックスを有効にするには、Electron を `--enable-sandbox` コマンドライン引数で実行する必要があります。

Chromium の主なセキュリティ機能の1つは、すべての Blink レンダリング / JavaScript コードがサンドボックス内で実行されることです。 このサンドボックスは、OS 固有の機能を使用して、レンダラープロセスの悪用がシステムに悪影響を及ぼすことがないようにします。

つまり、サンドボックスが有効になっている場合、レンダラーは、IPC を介してメインプロセスにタスクを委譲することによってのみ、システムを変更することができます。 サンドボックスについて詳しくは [こちら](https://www.chromium.org/developers/design-documents/sandbox) を参照してください。

Electron の大きな特徴は、レンダラープロセスで Node.js を実行する機能 (ウェブ技術を使用してデスクトップアプリケーションを開発することを容易にする機能) であるため、サンドボックスは Electron によって無効にされます。 これは、ほとんどの Node.js API にシステムアクセスが必要なためです。 例えば `require()` では、サンドボックス環境では使用できない、ファイルシステムのアクセス許可がなければ動作しません。

通常、これはデスクトップアプリケーションにとっては問題ではありません。コードは常に信頼されていますが、信頼できないウェブコンテンツを表示すると、Chromium より Electron のほうが、堅牢性が低くなります。 よりセキュリティを必要とするアプリケーションであれば、`sandbox` フラグでサンドボックスと互換性のある古典的な Chromium レンダラーを Electron で生成することを強制します。

サンドボックス化されたレンダラーには Node.js 環境が実行されず、Node.js JavaScript API がクライアントコードに公開されません。 唯一の例外はプリロードスクリプトで、Electron レンダラー API のサブセットにアクセスできます。

他の違いは、サンドボックス化されたレンダラーはデフォルトの JavaScript API を変更しないという点です。 したがって、`window.open` などの一部の API は Chromium と同じように動作します (つまり `BrowserWindowProxy` を返しません)。

## サンプル

サンドボックス化されたウインドウを作成するには、単に `webPreferences` へ `sandbox: true` を渡して下さい。

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

上記のコードでは、作成された `BrowserWindow` では Node.js が無効になっており、IPC 経由でのみ通信できます。 このオプションを使用すると、Electron がレンダラー内の Node.js ランタイムを作成しなくなります。 また、この新しいウィンドウ内では、`window.open` はネイティブの動作に従います (デフォルトで Electron は `BrowserWindow` を作成し、`window.open` を介してこれへプロキシを返します)。

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

Chromium サンドボックスの設定を変更した後に Electron / Node のスタートアップコードが実行されるため、`app.commandLine.appendSwitch('--enable-sandbox')` を呼び出すだけでは不十分であることに注意して下さい。 変化させるには、コマンドライン上で Electon に渡さなければなりません。

```sh
electron --enable-sandbox app.js
```

`--enable-sandbox` が有効の場合、通常の Electron ウィンドウを作成できず、一部のレンダラーに対してのみ OS サンドボックスをアクティブにすることはできません。

サンドボックスレンダラーと非サンドボックスレンダラーを1つのアプリケーションで混在させる必要がある場合は、単に `--enable-sandbox` 引数を省略します。 この引数がなければ、`sandbox: true` で作成されたウインドウは Node.js を無効にし、IPC 経由でのみ通信します。それ自体で既にセキュリティ POV における利得です。

## プリロード

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
// Javascript のコンテキストを作成するときにこのファイルが読み込まれます。 
// Electron レンダラー API のサブセットにアクセスできるプライベートスコープで動作します。 
// グローバルスコープにオブジェクトをリークしないように注意する必要があります。
const fs = require('fs')
const {ipcRenderer} = require('electron')

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

- Even though the sandboxed renderer doesn't have node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like browserify, as explained below. In fact, browserify is already used by electron to provide a node-like environment to the preload script.

To create a browserify bundle and use it as a preload script, something like the following should be used:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

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

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.
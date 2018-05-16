# `sandbox` オプション

> Chromium OS のサンドボックス内で実行できるレンダラを備えたブラウザウィンドウを作成します。 このオプションを有効にすると、レンダラーは Node API にアクセスするために IPC 経由でメインプロセスと通信する必要があります。 しかし、Chromium OS サンドボックスを有効にするには、Electron を `--enable-sandbox` コマンドライン引数で実行する必要があります。

Chromium の主なセキュリティ機能の1つは、すべての Blink レンダリング / JavaScript コードがサンドボックス内で実行されることです。 このサンドボックスは、OS 固有の機能を使用して、レンダラープロセスの悪用がシステムに悪影響を及ぼすことがないようにします。

つまり、サンドボックスが有効になっている場合、レンダラーは、IPC を介してメインプロセスにタスクを委譲することによってのみ、システムを変更することができます。 サンドボックスについて詳しくは [こちら](https://www.chromium.org/developers/design-documents/sandbox) を参照してください。

Electron の大きな特徴は、レンダラープロセスで Node.js を実行する機能 (ウェブ技術を使用してデスクトップアプリケーションを開発することを容易にする機能) であるため、サンドボックスは Electron によって無効にされます。 これは、ほとんどの Node.js API にシステムアクセスが必要なためです。 例えば `require()` では、サンドボックス環境では使用できない、ファイルシステムのアクセス許可がなければ動作しません。

通常、これはデスクトップアプリケーションにとっては問題ではありません。コードは常に信頼されていますが、信頼できないウェブコンテンツを表示すると、Chromium より Electron のほうが、堅牢性が低くなります。 よりセキュリティを必要とするアプリケーションであれば、`sandbox` フラグでサンドボックスと互換性のある古典的な Chromium レンダラーを Electron で生成することを強制します。

サンドボックス化されたレンダラーには Node.js 環境が実行されず、Node.js JavaScript API がクライアントコードに公開されません。 唯一の例外はプリロードスクリプトで、Electron レンダラー API のサブセットにアクセスできます。

他の違いは、サンドボックス化されたレンダラーはデフォルトの JavaScript API を変更しないという点です。 Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

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

In the above code the [`BrowserWindow`](browser-window.md) that was created has node.js disabled and can communicate only via IPC. このオプションを使用すると、Electron がレンダラー内の Node.js ランタイムを作成しなくなります。 Also, within this new window `window.open` follows the native behaviour (by default electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

このオプションだけでは OS が施行するサンドボックスが有効にならないことに注意することが重要です。 この機能を有効にするには、`--enable-sandbox` コマンドライン引数を電子に渡す必要があります。これにより、すべての `BrowserWindow` インスタンスに対して `sandbox: true` が強制されます。

アプリをサンドボックス内に置かずに、`sandbox:true` で `BrowserWindow` または `webview` プロセスで OS が施行するサンドボックスを有効にするには、 `--enable-mixed-sandbox` コマンドライン引数を Electron に渡す必要があります。 このオプションは現在 macOS と Windows でのみのサポートされています。

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
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
// Javascript のコンテキストを作成するときにこのファイルが読み込まれます。 
// Electron レンダラー API のサブセットにアクセスできるプライベートスコープで動作します。 
// グローバルスコープにオブジェクトをリークしないように注意する必要があります。
const fs = require('fs')
const {ipcRenderer} = require('electron')

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

- サンドボックス化されたレンダラーには Node.js が実行されていませんが、`Buffer`、`process`、`setImmediate`、および `require` が利用可能な、制限された Node ライクな環境にはまだアクセスできます。
- プリロードスクリプトは、`remote` および `ipcRenderer` モジュールを介してメインプロセスからすべての API に間接的にアクセスできます。 これは `fs` (上記で使用された) と他のモジュールがどのように実装されるか――メインプロセスのリモート相手へのプロキシ――です。
- プリロードスクリプトは単一のスクリプトに含まれていなければなりませんが、以下で説明するように browserify のようなツールを使用すると複雑なプリロードコードを複数のモジュールで構成することができます。 実際に、browserify はプリロードスクリプトに Node ライクな環境を提供するために Electron で既に使用されています。

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

より多くの Electron API をサンドボックスに公開するために、必要に応じて追加することができますが、メインプロセスのどのモジュールも `electron.remote.require` で既に使用できます。

## 状況

まだ実験的な機能なので、`sandbox` オプションは慎重に使用してください。 プリロードスクリプトにいくつかの Electron レンダラー API を公開することによるセキュリティの影響をまだ確認していませんが、信頼できないコンテンツをレンダリングする前に考慮すべき点がいくつかあります。

- A preload script can accidentally leak privileged APIs to untrusted code.
- V8 エンジンのいくつかのバグで、悪意のあるコードがレンダラープリロード API にアクセスし、`remote` モジュールを介してシステムに完全にアクセスできるようにする可能性があります。

信頼できないコンテンツを Electron で描画することはまだ未知の領域なので、サンドボックスプリロードスクリプトに公開されている API は他の Electron API よりも不安定であるとみなされ、セキュリティ上の問題を修正するための変更が行われる可能性があります。

計画されている、セキュリティを大幅に強化する機能の1つは、デフォルトでサンドボックス化したレンダラーからの IPC メッセージをブロックし、レンダラーが送信できるメッセージセットをメインプロセスが明示的に定義できるようにするものです。
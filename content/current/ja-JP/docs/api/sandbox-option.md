# `sandbox` オプション

> サンドボックス化されたレンダラーを用いたブラウザウインドウを作成します。 このオプションを有効にすると、レンダラーは Node API にアクセスするために IPC 経由でメインプロセスと通信する必要があります。

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
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

上記のコードでは、作成された [`BrowserWindow`](browser-window.md) では Node.js が無効になっており、IPC 経由でのみ通信できます。 このオプションを使用すると、Electron がレンダラー内の Node.js ランタイムを作成しなくなります。 Also, within this new window `window.open` follows the native behavior (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) を使用すると、すべての `BrowserWindow` インスタンスに対して `sandbox:true` を強制することができます。

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## プリロード

アプリでは、プリロードスクリプトを使用してサンドボックス化されたレンダラーをカスタマイズできます。 次に例を示します。

```js
let win
app.whenReady().then(() => {
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

## Rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. Beaker Browser). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Here are some things to consider before rendering untrusted content:

- [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) も有効になっていないと、プリロードスクリプトは信頼できないコードに誤って特権 API をリークする可能性があります。
- Some bug in the V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).
- While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.

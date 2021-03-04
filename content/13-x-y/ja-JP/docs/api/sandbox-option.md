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

上記のコードでは、作成された [`BrowserWindow`](browser-window.md) では Node.js が無効になっており、IPC 経由でのみ通信できます。 このオプションを使用すると、Electron がレンダラー内の Node.js ランタイムを作成しなくなります。 また、この新しいウィンドウ内では、`window.open` はネイティブの動作に従います (デフォルトで Electron は [`BrowserWindow`](browser-window.md) を作成し、`window.open` を介してこれへプロキシを返します)。

[`app.enableSandbox`](app.md#appenablesandbox) を使用すると、すべての `BrowserWindow` インスタンスに対して `sandbox:true` を強制することができます。

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // `app.enableSandbox()` を呼び出したので、`sandbox: true` を渡す必要はありません。
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Preload

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
// Electron レンダラー API のサブセットにアクセスできるプライベートスコープで動作します。 Without
// contextIsolation enabled, it's possible to accidentally leak privileged
// globals like ipcRenderer to web content.
const { ipcRenderer } = require('electron')

const defaultWindowOpen = window.open

window.open = function customWindowOpen (url, ...args) {
  ipcRenderer.send('report-window-open', location.origin, url, args)
  return defaultWindowOpen(url + '?from_electron=1', ...args)
}
```

以下はプリロードスクリプトで注意すべき重要な点です。

- サンドボックス化されたレンダラーには Node.js が実行されていませんが、`Buffer`、`process`、`setImmediate`、`clearImmediate`、および `require` が利用可能な、制限された Node 風の環境にはまだアクセスできます。
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
  - `webFrame`
- `イベント`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox.

## 信頼できないコンテンツの描画

Electron で信頼できないコンテンツをレンダリングすることは、成功しているアプリ (例: Beaker Browser) もありますが、まだ未知の領域です。 私たちの目標は、サンドボックスコンテンツのセキュリティという点で Chrome にできるだけ近づけることですが、最終的にはいくつかの根本的な問題があるため、常に後れを取ってしまうことになります。

1. 私たちには Chromium 製品に適したセキュリティのリソースやノウハウがありません。 今あるものを活かして Chromium からできることはすべて継承し、セキュリティ上の問題にも迅速に対応できるようにしていますが、Electron は Chromium のようにリソースを割くことができず、Chromium のようなセキュリティは確保できません。
2. Chrome のセキュリティ機能 (セーフブラウジングや証明書の透過性など) の中には、中央集権化と専用サーバが必要なものがありますが、どちらも Electron プロジェクトの目的に反しています。 そのため、セキュリティ関連のコストが発生しないように、Electron では機能を無効にしています。
3. Chromium は 1 つだけですが Electron には何千ものアプリが存在しており、それぞれのアプリの動作は微妙に異なります。 これらの違いを考慮すると巨大な可能性の空間が生じ、通常とは異なるユースケースでのプラットフォームのセキュリティ確保に挑戦することになります。
4. セキュリティアップデートをユーザーに直接伝えることができないため、セキュリティアップデートをユーザーに届けるために、アプリベンダーに Electron のバージョンをアップグレードして頂いています。

信頼できないコンテンツを描画する前に考慮すべきことがいくつかあります。

- [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) も有効になっていないと、プリロードスクリプトは信頼できないコードに誤って特権 API をリークする可能性があります。
- V8 エンジンのバグにより、悪意のあるコードがレンダラーのプリロード API にアクセスし `remote` モジュールを介して事実上のシステムへのフルアクセスを許可している可能性があります。 そのため、[`remote` モジュールを無効にする](.../tutorial/security.md#15-disable-the-remote-module) ことを強く推奨します。 無効化が不可能な場合は、[`remote` モジュールを分別してフィルタリングする](.../tutorial/security.md#16-filter-the-remote-module) 必要があります。
- Chromium のセキュリティ修正を古いバージョンの Electron にバックポートするよう最善の努力をしていますが、すべての修正のバックポートは保証できません。 堅牢性を確保するには、Electron の最新の安定版を使用することが最善の方法です。

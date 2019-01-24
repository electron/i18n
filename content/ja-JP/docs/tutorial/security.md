# セキュリティ・ネイティブ機能・あなたの責任

私たちは普段、Web開発者としてブラウザの強力なセキュリティを享受しています。つまり、私たちが書いたコードに起因するリスクは比較的小さいと言えます。 私たちのウェブサイトにはサンドボックスに限られた権限が与えられており、ユーザーは新たに発見されたセキュリティ上の脅威に迅速に対応できる、大規模なエンジニアチームによって構築されたブラウザを享受していると考えています。

Electron で開発する時、Electron はブラウザではないということを意識することが重要です。 使い慣れたウェブ技術を使用して、機能あふれるデスクトップアプリケーションを構築できますが、あなたのコードの方がはるかに大きな力を発揮します。 JavaScript はファイルシステム、ユーザシェルなどにアクセスできます。 これはつまり、質の高いネイティブアプリケーションを作成することができる反面、あなたの書くコードに与えられた権限に応じて固有のセキュリティリスクが増加するということです。

それを念頭に置いて、信頼できないソースからの任意のコンテンツを表示するということは、Electron が扱うことを意図しない重大なセキュリティリスクを引き起こすということに注意してください。 実際、人気のある Electron アプリ (Atom、Slack、Visual Studio Code、等) は、主にローカル (あるいは信頼されており、なおかつ Node integration を使用しないリモート) のコンテンツを取り扱います。もしあなたのアプリケーションがオンライン上のリソースからコードを実行する場合、あなたの責任の下でそのコードが悪意のあるものではないことを確認する必要があります。

## セキュリティ問題の報告

Electron の脆弱性を報告する正しい方法については [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) を参照してください。

## Chromium のセキュリティ問題とアップグレード

Electron は新しいバージョンの Chromium を出来るだけ早くサポートするように努力をしてはいますが、アップグレードは数十、時には数百のファイルの編集を含む大変な作業であることをご理解ください。 Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by several weeks or a few months.

現在の Chromium コンポーネントの更新システムは、利用可能なリソースと、フレームワークの上に構築された大部分のアプリケーションのニーズとの間で、適切なバランスを取っていると思います。 私たちは、Electron 上で構築する人々からの特定の使用状況について、もっと具体的に知りたいと思っています。 この件に関する Pull request とコントリビューションをいつでも歓迎します。

## 上記の忠告を無視した場合

リモートからコードを受け取ってローカルで実行するときは、常にセキュリティの問題が存在します。 例として、リモートのウェブサイトが [`BrowserWindow`](../api/browser-window.md) 内に表示されていると考えてください。 攻撃者が何らかの形でコンテンツを変更した場合 (ソースを直接攻撃する、アプリと実際の宛先の間に居座るなど) 、ユーザーのマシン上でネイティブコードを実行することができます。

> :警告: Node integration が有効な環境で、リモートコードの読み込みと実行を行ってはいけません。 代わりに、Node.js コードの実行にはローカルファイル (アプリケーションと一緒にパッケージ化されているもの) だけを使用してください。 To display remote content, use the [`<webview>`](../api/webview-tag.md) tag and make sure to disable the `nodeIntegration`.

## Electron のセキュリティ警告

Electron 2.0 からでは、開発者は、開発者コンソールに出力される警告と推奨を見られます。 バイナリ名が Electron の場合にのみ表示され、開発者が現在コンソールを見ていることを示しています。

これらの警告を、 `process.env` または `window` オブジェクトに`ELECTRON_ENABLE_SECURITY_WARNINGS` または `ELECTRON_DISABLE_SECURITY_WARNINGS` を設定することで、強制的に有効または無効にできます。

## チェックリスト: セキュリティ推奨事項

これは攻撃を防ぐわけではありませんが、最低限、アプリケーションのセキュリティを改善するためにこれらの手順に従って下さい。

1. [セキュアなコンテンツのみを読み込む](#1-only-load-secure-content)
2. [リモートコンテンツを表示する全てのレンダラーで、Node.js integration を無効にする](#2-disable-nodejs-integration-for-remote-content)
3. [リモートコンテンツを表示するすべてのレンダラーで、コンテキストイソレーションを有効にする](#3-enable-context-isolation-for-remote-content)
4. [リモートのコンテンツを表示するすべてのセッションで `ses.setPermissionRequestHandler()` を利用する](#4-handle-session-permission-requests-from-remote-content)
5. [`webSecurity` を無効にしない](#5-do-not-disable-websecurity)
6. [`Content-Security-Policy` を定義](#6-define-a-content-security-policy)して、スクリプトの読み込み元を制限する (例: `script-src 'self'`)
7. [`allowRunningInsecureContent` を `true` にしない](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [実験的な機能を有効にしない](#8-do-not-enable-experimental-features)
9. [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
12. [Disable or limit navigation](#12-disable-or-limit-navigation)
13. [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)

## 1) セキュアなコンテンツのみを読み込む

アプリケーションに含まれていない任意のリソースは、`HTTPS` のようなセキュアなプロトコルを使用して読み込まなければいけません。 つまり、`HTTP` のようなインセキュアなプロトコルを使用しないでください。 同様に、`WS` より `WSS`、`FTP` より `FTPS` の使用を推奨します。

### なぜ？

`HTTPS` には、主に3つの利点があります。

1) あなたのアプリが偽装者ではなく正しいホストに接続するように、リモートサーバーを認証します。 2) アプリケーションとホスト間の転送中にデータが変更されていないことを確認し、データの整合性を保証します。 3) ユーザーと宛先ホスト間のトラフィックを暗号化し、アプリとホスト間で送信される情報を盗聴することをより難しくします。

### どうすればいいの？

```js
// NG
browserWindow.loadURL('http://my-website.com')

// OK
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- NG -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- OK -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) リモートコンテンツで、Node.js integration を無効にする

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. リモートコンテンツに与える権限を制限することで、攻撃者がウェブサイトで JavaScript を実行できるようになった場合に、ユーザを傷つけることを劇的に難しくする目的があります。

その後、特定のホストに対して追加の権限を与えることができます。 例えば、 "https://my-website.com/" を指す BrowserWindow を開いている場合、あなたはそのウェブサイトに必要な力を正確に与えることができますが、それ以上の力は与えられません。

### なぜ？

クロスサイトスクリプティング (XSS) 攻撃は、攻撃者がレンダラープロセスを飛び越えてユーザのコンピュータ上でコードを実行できる場合、より危険です。 クロスサイトスクリプティングの攻撃はかなり一般的――かつ問題が発生している間、通常では、その力は実行されているウェブサイトをめちゃくちゃにするだけです。 Node.js integration を無効にすることは、XSS が昇華され、いわゆる "遠隔コード実行" (RCE) 攻撃になるのを防ぐのに役立ちます。

### どうすればいいの？

```js
// NG
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// OK
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- NG -->
<webview nodeIntegration src="page.html"></webview>

<!-- OK -->
<webview src="page.html"></webview>
```

Node.js integration を無効にすると、ウェブサイトへ Node.js モジュールまたは機能を使用する API を確認することができます。 プリロードスクリプトは引き続き `require` と他の Node.js の機能にアクセスできるため、開発者はコンテンツをリモートにロードするカスタム API を確認します。

次のプレロードスクリプトの例では、後でロードされたWebサイトは `window.readConfig()` メソッドにアクセスできますが、Node.js の機能は使用できません。

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) リモートコンテンツで、コンテキストイソレーションを有効にする

コンテキストイソレーションは、開発者が専用の JavaScript コンテキストで、プリロードスクリプトと Electron API でコードを実行できるようにする Electron の機能です。 つまり、`Array.prototype.push` や `JSON.parse` などのグローバルオブジェクトは、レンダラープロセスで実行されているスクリプトでは変更できません。

Electron は Chromium の [コンテンツスクリプト](https://developer.chrome.com/extensions/content_scripts#execution-environment) と同じ技術を使用してこの動作を可能にしています。

### なぜ？

コンテキストイソレーションにより、レンダラーで実行されている各スクリプトは、Electron API またはプリロードスクリプト内のスクリプトとの衝突を心配することなく、JavaScript 環境を変更できます。

実験的な Electron 機能ではありますが、コンテキストイソレーションは、セキュリティの副層を追加します。 Electron API とプリロードスクリプト用の新しい JavaScript ワールドを作成します。

同時に、プリロードスクリプトは `document` および `window` オブジェクトにアクセスできます。 言い換えれば、ローリスクでハイリターンを得ているということです。

### どうすればいいの？

```js
// メインプロセス
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// プリロードスクリプト

// ロードする前にページ内の変数を設定
webFrame.executeJavaScript('window.foo = "foo";')

// ロードされたページはこの変数にアクセスできない
// このコンテキスト内でのみ有効
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // window.foo はメインコンテキストでのみ使用可能なため
  // ログアウトすると 'undefined' になる
  console.log(window.foo)

  // window.bar はこのコンテキスト内で使用可能なため
  // ログアウトしても 'bar'
  console.log(window.bar)
})
```

## 4) リモートのコンテンツからセッション権限リクエストを利用する

Chromeを使用しているときに許可リクエストが表示されていることがあります――ユーザーが手動で承認する必要がある機能 (通知など) をウェブサイトが使用しようとするたびにポップアップが表示されます。

API は [Chromium 権限 API](https://developer.chrome.com/extensions/permissions) に基づいており、同じ種類のアクセス許可を実装しています。

### なぜ？

デフォルトでは、開発者がカスタムハンドラを手動で設定していない限り、Electron はすべての権限リクエストを自動的に承認します。 セキュリティを意識した開発者は、堅実なデフォルトとしては、まったく反対のことを想定したかもしれません。

### どうすればいいの？

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // 権限リクエストを承認する
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // 権限リクエストを拒否する
      return callback(false)
    }
  })
```

## 5) webSecurity を無効にしない

*Electron のデフォルトを推奨しています*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

製品としてのアプリケーションで `webSecurity` を無効にしないでください。

### なぜ？

` webSecurity` を無効にすると、同一オリジンポリシーが無効になり、`allowRunningInsecureContent` プロパティが `true` に設定されます。 つまり、異なるドメインからの安全でないコードの実行を可能にしてしまいます。

### どうすればいいの？

```js
// NG
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// OK
const mainWindow = new BrowserWindow()
```

```html
<!-- NG -->
<webview disablewebsecurity src="page.html"></webview>

<!-- OK -->
<webview src="page.html"></webview>
```

## 6) Content-Security-Policy を定義する

Content Security Policy (CSP) は、クロスサイトスクリプティング攻撃やデータインジェクション攻撃から保護する副層です。 Electron 内でロードする任意のウェブサイトで有効にすることを推奨します。

### なぜ？

CSP を使用すると、コンテンツを提供するサーバーが、指定されたウェブページに Electron がロードできるリソースを、制限および制御できます。 `https://your-page.com` は、`https://evil.attacker.com` からのスクリプトは許可せず、定義したオリジンのスクリプトを読み込むことを許可して実行する必要があります。 Defining a CSP is an easy way to improve your application's security.

以下の CSP は、Electron が現在のウェブサイトと `apis.mydomain.com` からスクリプトを実行できるようにします。

```txt
// NG
Content-Security-Policy: '*'

// OK
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) `allowRunningInsecureContent` を `true` にしない

*Electron のデフォルトを推奨しています*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). `allowRunningInsecureContent` プロパティを `true` にすることで、その保護を無効にします。

`HTTPS` 経由でウェブサイトの初期 HTML を読み込んで、`HTTP` 経由で後続のリソースを読み込もうとすることを "混合コンテンツ" といいます。

### なぜ？

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. より詳しくは、[セキュアなコンテンツのみを表示する](#1-only-load-secure-content) を参照して下さい。

### どうすればいいの？

```js
// NG
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// OK
const mainWindow = new BrowserWindow({})
```

## 8) 実験的な機能を有効にしない

*Electron のデフォルトを推奨しています*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### なぜ？

実験的な機能は、その名前が示すように、実験的であり、Chromium のすべてのユーザに有効にされていません。 さらに、Electron 全体への影響はテストされていない可能性が高いです。

正しい使用方法は存在しますが、何をしているのか分からない限り、このプロパティを有効にしないでください。

### どうすればいいの？

```js
// NG
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// OK
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Use `enableBlinkFeatures`

*Electron のデフォルトを推奨しています*

Blink は、Chromium のバックグラウンドにあるレンダリングエンジンの名前です。 As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### なぜ？

一般に、機能がデフォルトで有効になっていない場合は、よい理由が考えられます。 その機能を有効にするための、正しい使用方法は存在します。 開発者は、機能を有効にする必要がある理由、影響の内容、アプリケーションのセキュリティにどのように影響するかを正確に把握する必要があります。 どのような場合においても、機能を推論的に有効にするべきではありません。

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// OK
const mainWindow = new BrowserWindow()
```

## 10) `allowpopups` を使用しない

*Electron のデフォルトを推奨しています*

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. `allowpopups` 属性は、`window.open()` メソッドを使用して新しい [`BrowserWindows`](../api/browser-window.md) を作成することができるようにします。 `<webview>` tags are otherwise not allowed to create new windows.

### なぜ？

ポップアップが必要ない場合は、デフォルトでは新しい [`BrowserWindows`](../api/browser-window.md) の作成を許可しないほうがよいでしょう。 これは必要最低限なアクセスの原則に従っています。ウェブサイトにその機能が必要でない限り、新しいポップアップを作成させないでください。

### どうすればいいの？

```html
<!-- NG -->
<webview allowpopups src="page.html"></webview>

<!-- OK -->
<webview src="page.html"></webview>
```

## 11) 作成前に WebView のオプションを確認する

Node.js integration が有効になっていないレンダラープロセスで作成された WebView は、integration 自体を有効にすることはできません。 しかし、WebView は常に独自の `webPreferences` を使用して、独立したレンダラープロセスを作成します。

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### なぜ？

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron では、開発者はレンダラープロセスを制御するさまざまなセキュリティ機能を無効にすることができます。 In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### どうすればいいの？

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // 未使用のプリロードスクリプトを削除するか、その場所が正当であることを確認する
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Node.js integration を無効にする
    webPreferences.nodeIntegration = false

    // ロードされる URL を確認する
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

繰り返しになりますが、このチェックリストはリスクを最小化するものであり、リスクを無くすものではありません。ただ単にWebサイトを表示するという目的であれば、Electronアプリケーションよりもブラウザを利用した方がよりセキュアでしょう。

## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### なぜ？

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### どうすればいいの？

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://google.com')` test would let `https://google.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://my-own-server.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### なぜ？

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### どうすればいいの？

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    shell.openExternalSync(navigationUrl)
  })
})
```
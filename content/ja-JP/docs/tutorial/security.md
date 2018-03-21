# セキュリティ・ネイティブ機能・あなたの責任

Web開発者として、私たちは通常、ブラウザの強力なセキュリティ網を享受しています――私たちが書いたコードによるリスクは比較的小さいのです。 私たちのウェブサイトにはサンドボックスに限られた権限が与えられており、ユーザーは新たに発見されたセキュリティ上の脅威に迅速に対応できる、大規模なエンジニアチームによって構築されたブラウザを享受していると考えています。

Electron で開発する時、Electron はブラウザではないということを意識することが重要です。 使い慣れたウェブ技術を使用して、機能あふれるデスクトップアプリケーションを構築できますが、あなたのコードの方がはるかに大きな力を発揮します。 JavaScript はファイルシステム、ユーザシェルなどにアクセスできます。 これはつまり、高品質のネイティブアプリケーションを構築することができることに対して、固有のセキュリティリスクは、コードに付与された追加の権限に応じて増加します。

それを念頭に置いて、信頼できないソースからの任意のコンテンツを表示するということは、Electron が扱うことを意図しない重大なセキュリティリスクを引き起こすということに注意してください。 実際、人気のある Electron アプリ (Atom、Slack、Visual Studio Code、等) は、主にローカル (あるいは信頼されており、なおかつ Node integration を使用しないリモート) のコンテンツを取り扱います。もしあなたのアプリケーションがオンライン上のリソースからコードを実行する場合、あなたの責任の下でそのコードが悪意のあるものではないことを確認する必要があります。

## セキュリティ問題の報告

Electron の脆弱性を報告する正しい方法については [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) を参照してください。

## Chromium のセキュリティ問題とアップグレード

Electron は新しいバージョンの Chromium を出来るだけ早くサポートするように努力をしてはいますが、アップグレードは数十、時には数百のファイルの編集を含む大変な作業であることをご理解ください。 今日ではたくさんのリソースと貢献を受けていますが、Electron は Chromium 最新版に追いついてないこともあり、数日もしくは数週間遅れることがあります。

現在の Chromium コンポーネントの更新システムは、利用可能なリソースと、フレームワークの上に構築された大部分のアプリケーションのニーズとの間で、適切なバランスを取っていると思います。 私たちは、Electron 上で構築する人々からの特定の使用状況について、もっと具体的に知りたいと思っています。 この件に関する Pull request とコントリビューションをいつでも歓迎します。

## 上記の忠告を無視した場合

リモートからコードを受け取ってローカルで実行するときは、常にセキュリティの問題が存在します。 例として、リモートのウェブサイトが [`BrowserWindow`](../api/browser-window.md) 内に表示されていると考えてください。 攻撃者が何らかの形でコンテンツを変更した場合 (ソースを直接攻撃する、アプリと実際の宛先の間に居座るなど) 、ユーザーのマシン上でネイティブコードを実行することができます。

> :警告: Node integration が有効な環境で、リモートコードの読み込みと実行を行ってはいけません。 代わりに、Node.js コードの実行にはローカルファイル (アプリケーションと一緒にパッケージ化されているもの) だけを使用してください。 リモートコンテンツを表示するには、[`webview`](../api/web-view.md) タグを使用して、`nodeIntegration` を無効にしてください。

## Electron のセキュリティ警告

Electron 2.0 からでは、開発者は、開発者コンソールに出力される警告と推奨を見られます。 バイナリ名が Electron の場合にのみ表示され、開発者が現在コンソールを見ていることを示しています。

これらの警告を、 `process.env` または `window` オブジェクトに`ELECTRON_ENABLE_SECURITY_WARNINGS` または `ELECTRON_DISABLE_SECURITY_WARNINGS` を設定することで、強制的に有効または無効にできます。

## チェックリスト: セキュリティ推奨事項

これは攻撃を防ぐわけではありませんが、最低限、アプリケーションのセキュリティを改善するためにこれらの手順に従って下さい。

1. [セキュアなコンテンツのみを読み込む](#only-load-secure-content)
2. [リモートコンテンツを表示する全てのレンダラーで、Node.js integration を無効にする](#disable-node.js-integration-for-remote-content)
3. [リモートコンテンツを表示するすべてのレンダラーで、コンテキストイソレーションを有効にする](#enable-context-isolation-for-remote-content)
4. [リモートのコンテンツを表示するすべてのセッションで `ses.setPermissionRequestHandler()` を利用する](#handle-session-permission-requests-from-remote-content)
5. [`webSecurity` を無効にしない](#do-not-disable-websecurity)
6. [`Content-Security-Policy` を定義](#define-a-content-security-policy)して、スクリプトの読み込み元を制限する (例: `script-src 'self'`)
7. 文字列をコードとして実行できる [`eval` を書き換えて無効にする](#override-and-disable-eval)。
8. [`allowRunningInsecureContent` を `true` にしない](#do-not-set-allowRunningInsecureContent-to-true)
9. [実験的な機能を有効にしない](#do-not-enable-experimental-features)
10. [`blinkFeatures` を使用しない](#do-not-use-blinkfeatures)
11. [WebViews: `allowpopups`を使用しない](#do-not-use-allowpopups)
12. [WebViews: すべての `<webview>` タグのオプションとパラメータを認証する。](#verify-webview-options-before-creation)

## 1) セキュアなコンテンツのみを読み込む

アプリケーションに含まれていない任意のリソースは、`HTTPS` のようなセキュアなプロトコルを使用して読み込まなければいけません。 つまり、`HTTP` のようなインセキュアなプロトコルを使用しないでください。 同様に、`WS` より `WSS`、`FTP` より `FTPS` の使用を推奨します。

### なんで？

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

リモートコンテンツをロードするレンダラー ([`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md)、[`WebView`](../api/web-view.md)) で Node.js integration を無効にすることが重要です。 リモートコンテンツに与える権限を制限することで、攻撃者がウェブサイトで JavaScript を実行できるようになった場合に、ユーザを傷つけることを劇的に難しくする目的があります。

その後、特定のホストに対して追加の権限を与えることができます。 例えば、 "https://my-website.com/" を指す BrowserWindow を開いている場合、あなたはそのウェブサイトに必要な力を正確に与えることができますが、それ以上の力は与えられません。

### なんで？

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Enable Context Isolation for Remote Content

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### なんで？

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### どうすればいいの？

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### なんで？

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### どうすればいいの？

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### なんで？

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### なんで？

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### どうすればいいの？

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### なんで？

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### どうすればいいの？

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will now allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### なんで？

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### なんで？

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### なんで？

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### どうすればいいの？

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### なんで？

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### どうすればいいの？

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### なんで？

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### どうすればいいの？

Before a [`<WebView>`](../api/web-view.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

繰り返しになりますが、このチェックリストはリスクを最小化するものであり、リスクを無くすものではありません。ただ単にWebサイトを表示するという目的であれば、Electronアプリケーションよりもブラウザを利用した方がよりセキュアでしょう。
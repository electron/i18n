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
11. [WebViews: `allowpopups` を使用しない](#do-not-use-allowpopups)
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

### なんで？

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

### なんで？

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

レンダラープロセス ([`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md)、[`WebView`](../api/web-view.md)) の`webSecurity` プロパティを無効にすることは、 重要なセキュリティ機能を無効にすることです。

製品としてのアプリケーションで `webSecurity` を無効にしないでください。

### なんで？

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

### なんで？

CSP を使用すると、コンテンツを提供するサーバーが、指定されたウェブページに Electron がロードできるリソースを、制限および制御できます。 `https://your-page.com` は、`https://evil.attacker.com` からのスクリプトは許可せず、定義したオリジンのスクリプトを読み込むことを許可して実行する必要があります。 CSP を定義することは、アプリケーションのセキュリティを向上させる簡単な方法です。

### どうすればいいの？

Electron は [`Content-Security-Policy` HTTP ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) とそれぞれの `<meta>` タグを尊重します。

以下の CSP は、Electron が現在のウェブサイトと `apis.mydomain.com` からスクリプトを実行できるようにします。

```txt
// NG
Content-Security-Policy: '*'

// OK
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) `eval` を書き換えて無効にする

`eval()` は、文字列から JavaScript を実行できるコア JavaScript メソッドです。これを無効にすると、事前にわかっていない JavaScript を評価するアプリの機能が無効になります。

### なんで？

`eval()` メソッドは確かな1つの役割――JavaScript として一連の文字を評価し、それを実行する――があります。 これは、事前に知ることができないコードを評価する必要がある場合に、必要なメソッドです。 正しい使用方法は他のコードジェネレータと同様に存在しますが、`eval()` ははっきりさせづらいです。

一般的に言えば、`eval()` を完全に無効にする方が、攻撃を防ぐには簡単です。 したがって、必要がない場合は、無効にすることを推奨します。

### どうすればいいの？

```js
// ESLint は eval() の使用について警告する
// これも eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error('ごめんね。window.eval() はこのアプリでサポートされてないよ。')
}
```

## 8) `allowRunningInsecureContent` を `true` にしない

*Electron のデフォルトを推奨しています*

デフォルトでは、Electron は、`HTTPS` 上でロードされたウェブサイト上でのみ、安全でないソース (`HTTP`) からスクリプト、CSS、またはプラグインを読み込んで実行できるようにします。 `allowRunningInsecureContent` プロパティを `true` にすることで、その保護を無効にします。

`HTTPS` 経由でウェブサイトの初期 HTML を読み込んで、`HTTP` 経由で後続のリソースを読み込もうとすることを "混合コンテンツ" といいます。

### なんで？

簡単に言えば、`HTTPS` を介してコンテンツをロードすると、トラフィック自体を暗号化しながら、ロードされたリソースの信憑性と完全性が保証されます。 より詳しくは、[セキュアなコンテンツのみを表示する](#only-display-secure-content) を参照して下さい。

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

## 9) 実験的な機能を有効にしない

*Electron のデフォルトを推奨しています*

Electron の上級ユーザは、`experimentalFeatures` と `experimentalCanvasFeatures` のプロパティを使用して、Chromium の実験的な機能を有効にすることができます。

### なんで？

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

## 10) `blinkFeatures` を使用しない

*Electron のデフォルトを推奨しています*

Blink は、Chromium のバックグラウンドにあるレンダリングエンジンの名前です。 `experimentalFeatures` と同様に、`blinkFeatures` プロパティを使用すると、デフォルトで無効になっている機能を有効にすることができます。

### なんで？

一般に、機能がデフォルトで有効になっていない場合は、よい理由が考えられます。 その機能を有効にするための、正しい使用方法は存在します。 開発者は、機能を有効にする必要がある理由、影響の内容、アプリケーションのセキュリティにどのように影響するかを正確に把握する必要があります。 どのような場合においても、機能を推論的に有効にするべきではありません。

### どうすればいいの？

```js
// NG
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// OK
const mainWindow = new BrowserWindow()
```

## 11) `allowpopups` を使用しない

*Electron のデフォルトを推奨しています*

[`WebViews`](../api/web-view.md) を使用している場合、新しいウィンドウを開くには、`<webview>` タグにページとスクリプトをロードする必要があります。 `allowpopups` 属性は、`window.open()` メソッドを使用して新しい [`BrowserWindows`](../api/browser-window.md) を作成することができるようにします。 それ以外の場合、`WebViews` は新しいウインドウを作成できません。

### なんで？

ポップアップが必要ない場合は、デフォルトでは新しい [`BrowserWindows`](../api/browser-window.md) の作成を許可しないほうがよいでしょう。 これは必要最低限なアクセスの原則に従っています。ウェブサイトにその機能が必要でない限り、新しいポップアップを作成させないでください。

### どうすればいいの？

```html
<!-- NG -->
<webview allowpopups src="page.html"></webview>

<!-- OK -->
<webview src="page.html"></webview>
```

## 12) 作成前に WebView のオプションを認証する

Node.js integration が有効になっていないレンダラープロセスで作成された WebView は、integration 自体を有効にすることはできません。 しかし、WebViewは常に独自の `webPreferences` を使用して、独立したレンダラープロセスを作成します。

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
# セキュリティ、ネイティブ機能、あなたの責任

私たちは普段、Web開発者としてブラウザの強力なセキュリティを享受しています。つまり、私たちが書いたコードに起因するリスクは比較的小さいと言えます。 私たちのウェブサイトにはサンドボックスに限られた権限が与えられており、ユーザーは新たに発見されたセキュリティ上の脅威に迅速に対応できる、大規模なエンジニアチームによって構築されたブラウザを享受していると考えています。

Electron で開発する時、Electron はブラウザではないということを意識することが重要です。 使い慣れたウェブ技術を使用して、機能あふれるデスクトップアプリケーションを構築できますが、あなたのコードの方がはるかに大きな力を発揮します。 JavaScript はファイルシステム、ユーザシェルなどにアクセスできます。 これはつまり、質の高いネイティブアプリケーションを作成することができる反面、あなたの書くコードに与えられた権限に応じて固有のセキュリティリスクが増加するということです。

それを念頭に置いて、信頼できないソースからの任意のコンテンツを表示するということは、Electron が扱うことを意図しない重大なセキュリティリスクを引き起こすということに注意してください。 実際、人気のある Electron アプリ (Atom、Slack、Visual Studio Code、等) は、主にローカル (あるいは信頼されており、なおかつ Node integration を使用しないリモート) のコンテンツを取り扱います。もしあなたのアプリケーションがオンライン上のリソースからコードを実行する場合、あなたの責任の下でそのコードが悪意のあるものではないことを確認する必要があります。

## セキュリティ問題の報告

Electron の脆弱性を報告する正しい方法については [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) を参照してください。

## Chromium のセキュリティ問題とアップグレード

Electron は新しいバージョンの Chromium を出来るだけ早くサポートするように努力をしてはいますが、アップグレードは数十、時には数百のファイルの編集を含む大変な作業であることをご理解ください。 今日ではたくさんのリソースと貢献を受けていますが、Electron は Chromium 最新版に追いついてないこともあり、数週間もしくは数ヶ月遅れることがあります。

現在の Chromium コンポーネントの更新システムは、利用可能なリソースと、フレームワークの上に構築された大部分のアプリケーションのニーズとの間で、適切なバランスを取っていると思います。 私たちは、Electron 上で構築する人々からの特定の使用状況について、もっと具体的に知りたいと思っています。 この件に関する Pull request とコントリビューションをいつでも歓迎します。

## セキュリティはみんなの責任

あなたのElectronアプリケーションのセキュリティは、フレームワーク (*Chromium*, *Node.js*), Electron 自身、NPM の依存関係、あなたのコード のセキュリティの結果であることを覚えておくことは重要です。 そのため、いくつかの重要なベストプラックティスに従う、責任があります。

* **あなたのアプリケーションは最新リリースの Electron フレームワークを使う。** あなたはプロダクトをリリースしたとき、Electron、 Chromium 共有ライブラリ、Node.js を組み込んでリリースしています。 これらのコンポーネントに影響する脆弱性は、あなたのアプリケーションのセキュリティに影響する可能性があります。 Electronを最新バージョンにアップデートすることで、あなたはクリティカルな脆弱性(例えば *nodeIntegration bypasses*) にパッチを当てた状態にして、あなたのアプリケーションで発現しないようにできます。

* **あなたのアプリの依存関係の評価する。** NPM は 50万もの再利用できるパッケージを提供しています。一方、あなたは信頼するサードパーティのライブラリを選択する責任があります。 あなたが既知の脆弱性の影響を受けるライブラリを利用する場合や、あまりメンテナンスされていないコードに頼る場合、あなたのアプリケーションのセキュリティは低下し危険な状態になります。

* **セキュアコーディングプラクティスの採用。** あなたのアプリケーションの防衛の第一歩はあなたのコードです。 クロスサイトスクリプティング(XSS) のような共通WEB脆弱性は、Electronアプリケーション上でセキュリティの影響度が高くなります。そのため、セキュアなソフトウェア開発のベストプラクティスの採用やセキュリティテストの実施が強く求められます。

## 信用されないコンテンツの隔離

信用されていないソース (例えばリモートサーバー) からコードを受け取ってローカルで実行するときは、常にセキュリティの問題が存在します。 例として、リモートのウェブサイトがデフォルト [`BrowserWindow`](../api/browser-window.md) 内に表示されていると考えてください。 もし攻撃者がどうにかして(情報源そのものの攻撃や中間者攻撃によって) 得られる内容を変更した場合、ユーザーのPC上でネイティブコードを実行できることになります。

> :警告: Node integration が有効な環境で、リモートコードの読み込みと実行を行ってはいけません。 代わりに、Node.js コードの実行にはローカルファイル (アプリケーションと一緒にパッケージ化されているもの) だけを使用してください。 remote コンテンツを表示するには、[`<webview>`](../api/webview-tag.md) tag または [`BrowserView`](../api/browser-view.md)を使用します。その時`nodeIntegration`を無効に、`contextIsolation`を有効にすることを確認してください。

## Electron のセキュリティ警告

Electron 2.0 からでは、開発者は、開発者コンソールに出力される警告と推奨を見られます。 バイナリ名が Electron の場合にのみ表示され、開発者が現在コンソールを見ていることを示しています。

これらの警告を、 `process.env` または `window` オブジェクトに`ELECTRON_ENABLE_SECURITY_WARNINGS` または `ELECTRON_DISABLE_SECURITY_WARNINGS` を設定することで、強制的に有効または無効にできます。

## チェックリスト: セキュリティ推奨事項

あなたはあなたのアプリケーションのセキュリティーを向上させるために、少なくとも次のステップを実施してください。

1. [セキュアなコンテンツのみを読み込む](#1-only-load-secure-content)
2. [リモートコンテンツを表示する全てのレンダラーで、Node.js integration を無効にする](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [リモートコンテンツを表示するすべてのレンダラーで、コンテキストイソレーションを有効にする](#3-enable-context-isolation-for-remote-content)
4. [リモートのコンテンツを表示するすべてのセッションで `ses.setPermissionRequestHandler()` を利用する](#4-handle-session-permission-requests-from-remote-content)
5. [`webSecurity` を無効にしない](#5-do-not-disable-websecurity)
6. [`Content-Security-Policy` を定義](#6-define-a-content-security-policy)して、スクリプトの読み込み元を制限する (例: `script-src 'self'`)
7. [`allowRunningInsecureContent` を `true` にしない](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [実験的な機能を有効にしない](#8-do-not-enable-experimental-features)
9. [`enableBlinkFeatures` を使用しない](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: `allowpopups` を使用しない](#10-do-not-use-allowpopups)
11. [`<webview>`: オプションとパラメータを検証する](#11-verify-webview-options-before-creation)
12. [ナビゲーションを無効化か制限](#12-disable-or-limit-navigation)
13. [新規ウインドウの作成を無効化か制限](#13-disable-or-limit-creation-of-new-windows)
14. [信用されないコンテンツで `openExternal` を使用しない](#14-do-not-use-openexternal-with-untrusted-content)
15. [`remote` モジュールの無効化](#15-disable-the-remote-module)
16. [`remote` モジュールをフィルタ](#16-filter-the-remote-module)

設定ミスやセキュアでないパターンを自動的に検出するには、[electronegativity](https://github.com/doyensec/electronegativity)が使用できます。 Electronを使用したアプリケーション開発時の潜在的な脆弱性やバグの埋め込みについてのより詳しい情報は、[開発者承認者向けガイドguide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)を参照してください。

## 1) セキュアなコンテンツのみを読み込む

アプリケーションに含まれていない任意のリソースは、`HTTPS` のようなセキュアなプロトコルを使用して読み込まなければいけません。 つまり、`HTTP` のようなインセキュアなプロトコルを使用しないでください。 同様に、`WS` より `WSS`、`FTP` より `FTPS` の使用を推奨します。

### なぜ？

`HTTPS` には、主に3つの利点があります。

1) あなたのアプリが偽装者ではなく正しいホストに接続するように、リモートサーバーを認証します。 2) アプリケーションとホスト間の転送中にデータが変更されていないことを確認し、データの整合性を保証します。 3) ユーザーと宛先ホスト間のトラフィックを暗号化し、アプリとホスト間で送信される情報を盗聴することをより難しくします。

### どうすればいいの？

```js
// NG
browserWindow.loadURL('http://example.com')

// OK
browserWindow.loadURL('https://example.com')
```

```html
<!-- NG -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- OK -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) リモートコンテンツで、Node.js integration を有効にしない

*この推奨は、Electron 5.0.0 からデフォルトの振舞いです。*

リモートコンテンツをロードするレンダラー ([`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md)、[`<webview>`](../api/webview-tag.md)) で Node.js integration を有効にしないことが重要です。 リモートコンテンツに与える権限を制限することで、攻撃者がウェブサイトで JavaScript を実行できるようになった場合に、ユーザを傷つけることを劇的に難しくする目的があります。

その後、特定のホストに対して追加の権限を与えることができます。 例えば、 "https://example.com/" を指す BrowserWindow を開いている場合、あなたはそのウェブサイトに必要な力を正確に与えることができますが、それ以上の力は与えられません。

### なぜ？

クロスサイトスクリプティング (XSS) 攻撃は、攻撃者がレンダラープロセスを飛び越えてユーザのコンピュータ上でコードを実行できる場合、より危険です。 クロスサイトスクリプティングの攻撃はかなり一般的――かつ問題が発生している間、通常では、その力は実行されているウェブサイトをめちゃくちゃにするだけです。 Node.js integration を無効にすることは、XSS が昇華され、いわゆる "遠隔コード実行" (RCE) 攻撃になるのを防ぐのに役立ちます。

### どうすればいいの？

```js
// 悪い
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// 良い
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
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

`nodeIntegration: false`を使用して、文字列のアイソレーションを強制する場合やNode primitivesの使用を避ける場合であっても、 `contextIsolation` を使用しなければなりません。

### なぜ？

コンテキストイソレーションにより、レンダラーで実行されている各スクリプトは、Electron API またはプリロードスクリプト内のスクリプトとの衝突を心配することなく、JavaScript 環境を変更できます。

まだ実験的なElectronの機能ですが、コンテキストアイソレーションはセキュリティのためのレイヤーを追加します。 これは Electron APIとプリロードスクリプトのために新しいJavaScriptの世界を作成します。そのため、プロトタイプ汚染攻撃を緩和します。

同時に、プリロードスクリプトは `document` および `window` オブジェクトにアクセスできます。 言い換えれば、ローリスクでハイリターンを得ているということです。

### どうすればいいの？

```js
// メインプロセス
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(app.getAppPath(), 'preload.js')
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

    // URL を認証する
    if (!url.startsWith('https://example.com/')) {
      // 権限リクエストを拒否する
      return callback(false)
    }
  })
```

## 5) webSecurity を無効にしない

*Electron のデフォルトを推奨しています*

レンダラープロセス ([`BrowserWindow`](../api/browser-window.md)、[`BrowserView`](../api/browser-view.md)、[`<webview>`](../api/webview-tag.md)) 上の `webSecurity` プロパティを無効にすることは、 重要なセキュリティ機能を無効にするということです。

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

CSP を使用すると、コンテンツを提供するサーバーが、指定されたウェブページに Electron がロードできるリソースを、制限および制御できます。 `https://example.com` は、`https://evil.attacker.com` からのスクリプトは許可せず、定義したオリジンのスクリプトを読み込むことを許可して実行する必要があります。 CSP を定義することは、アプリケーションのセキュリティを向上させる簡単な方法です。

以下の CSP は、Electron が現在のウェブサイトと `apis.example.com` からスクリプトを実行できるようにします。

```txt
// NG
Content-Security-Policy: '*'

// OK
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### CSP HTTP ヘッダ

Electron は [`Content-Security-Policy` HTTP ヘッダ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) とそれぞれの [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) タグを尊重します。

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

### CSP メタタグ

CSP の推奨伝達メカニズムは HTTP ヘッダですが、`file://` プロトコルを使用してリソースをロードするときにこのメソッドを使用することはできません。 `file://` プロトコルを使用する場合など、`<meta>` タグを使用してマークアップのページに直接ポリシーを設定すると便利な場合があります。

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) `allowRunningInsecureContent` を `true` にしない

*Electron のデフォルトを推奨しています*

デフォルトでは、Electron は `HTTPS` 上でロードされたウェブサイト上でのみ、安全でないソース (`HTTP`) からスクリプト、CSS、またはプラグインを読み込んで実行できるようにします。 `allowRunningInsecureContent` プロパティを `true` にすることで、その保護を無効にします。

`HTTPS` 経由でウェブサイトの初期 HTML を読み込んで、`HTTP` 経由で後続のリソースを読み込もうとすることを "混合コンテンツ" といいます。

### なぜ？

`HTTPS` を介してコンテンツをロードすると、トラフィック自体を暗号化しながら、ロードされたリソースの信憑性と完全性が保証されます。 より詳しくは、[セキュアなコンテンツのみを表示する](#1-only-load-secure-content) を参照して下さい。

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

Electron の上級ユーザは、`experimentalFeatures` のプロパティを使用して Chromium の実験的な機能を有効にすることができます。

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

## 9) `enableBlinkFeatures` を使用しない

*Electron のデフォルトを推奨しています*

Blink は、Chromium のバックグラウンドにあるレンダリングエンジンの名前です。 `experimentalFeatures` と同様に、`enableBlinkFeatures` プロパティを使用すると、デフォルトで無効になっている機能を有効にすることができます。

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

[`<webview>`](../api/webview-tag.md) を使用している場合、新しいウィンドウを開くには `<webview>` タグにページとスクリプトをロードする必要があります。 `allowpopups` 属性は、`window.open()` メソッドを使用して新しい [`BrowserWindows`](../api/browser-window.md) を作成することができるようにします。 そうでなければ、`<webview>` は新しいウインドウを作成できません。

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

メインプロセスから新しい [`<webview>`](../api/webview-tag.md) タグの作成を制御し、webPreferences でセキュリティ機能を無効にしていないことを確認することを推奨します。

### なぜ？

`<webview>` は DOM 内に存在するので、Node.js integration が無効になっていても、WebView はウェブサイトで実行されているスクリプトによって作成できます。

Electron では、開発者はレンダラープロセスを制御するさまざまなセキュリティ機能を無効にすることができます。 ほとんどの場合、開発者はこれらの機能を無効にする必要はありません。したがって、新しく作成した [`<webview>`](../api/webview-tag.md) タグを使用します。

### どうすればいいの？

[`<webview>`](../api/webview-tag.md) タグが適用される前に、Electron は `will-attach-webview` イベントを `webContents` ホスト上で発火します。 安全性の低いオプションを使用して `webViews` を作成しないようにするには、このイベントを使用します。

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // 未使用のプリロードスクリプトを削除するか、その場所が正当であることを確認する
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Node.js integration を無効にする
    webPreferences.nodeIntegration = false

    // ロードされる URL を確認する
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

繰り返しになりますが、このチェックリストはリスクを最小化するものであり、リスクを無くすものではありません。ただ単にWebサイトを表示するという目的であれば、Electronアプリケーションよりもブラウザを利用した方がよりセキュアでしょう。

## 12) ナビゲーションを無効化か制限

アプリにナビゲートする必要がない場合、または既知のページにナビゲートするだけの場合は、ナビゲーションをその既知の範囲に完全に制限し、他の種類のナビゲーションを禁止することをお勧めします。

### なぜ？

ナビゲーションは一般的な攻撃方法です。 攻撃者が現在のページから移動するようにアプリを制御することができると、インターネット上の Web サイトを開くことをアプリに強制する可能性があります。 `webContents` がより安全に設定されている (`nodeIntegration` を無効にする、`contextIsolation` を有効にするなど) 場合でも、アプリにデタラメな Web サイトを開かせる アプリを悪用する方がはるかに簡単になります。

一般的な攻撃パターンは、攻撃者が、アプリでそのユーザに攻撃者のいずれかのページに移動するような方法で操作することを強いることです。 これは通常、リンク、プラグイン、またはその他のユーザー生成コンテンツを介して行われます。

### どうすればいいの？

アプリにナビゲーションが不要な場合は、[`will-navigate`](../api/web-contents.md#event-will-navigate) ハンドラ内 `event.preventDefault()` を呼び出すことができます。 アプリがどのページに移動するかがわかっている場合は、イベントハンドラで URL を確認し、予期している URL と一致する場合にのみナビゲーションを許可します。

URL には Node のパーサーを使用することを推奨します。 単純な文字列比較は時々だまされる可能性があります - `startsWith('https://example.com')` テストは `https://example.com.attacker.com` を通過させます 。

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) 新規ウインドウの作成を無効化か制限

既知の一連のウインドウがある場合は、アプリ内での追加ウインドウの作成を制限することをお勧めします。

### なぜ？

ナビゲーションと同様、新しい `webContents` の作成は一般的な攻撃手段です。 攻撃者はそのままではページを開こうとしても開くことができないために、新しいウィンドウ、フレーム、その他のレンダラープロセスをより多くの権限で作成するようにアプリに強制しようとします。

あなたが作成する必要があると知っているものに加えてウィンドウを作成する必要がない場合は、作成を無効にするとノーコストで少しの追加のセキュリティが手に入ります。 これは1つの `BrowserWindow` を開き、実行時に任意の数の追加ウィンドウを開く必要がないアプリケーションで普遍的なケースです。

### どうすればいいの？

[`webContents`](../api/web-contents.md) は、新しいウィンドウを作成する前に [`new-window`](../api/web-contents.md#event-new-window) イベントを発行します。 そのイベントは、他のパラメータの中でも、ウィンドウが開くことを要求された `url` とそれを作成するために使用されたオプションを渡されます。 このイベントを使用してウィンドウの作成を詳細に調べ、必要なものだけに限定することを推奨します。

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // この例では、既定のブラウザでこのイベントのURLを開くように
    // オペレーティングシステムに依頼します。
    event.preventDefault()

    await shell.openExternal(navigationUrl)
  })
})
```

## 14) 信用されないコンテンツで `openExternal` を使用しない

Shellの [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) はデスクトップのネィティブユーティリティの指定した protocol URI で開けるようにします。 例えば、macOSの`open` ターミナルコマンドユーティリティに似た機能で、URIとそのファイルタイプの関連に基づいた特定のアプリケーションで開きます。

### なぜ？

[`openExternal`](../api/shell.md#shellopenexternalurl-options-callback)の不適切な利用によって、そのユーザーホストを危険に曝すことがありえます。 openExternalを信頼できないコンテンツで使用するとき、任意のコマンドの実行を許してしまう可能性があります。

### どうすればいいの？

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) `remote` モジュールの無効化

`remote`モジュールは、レンダラープロセスに、通常メインプロセスでのみ利用可能な APIへのアクセスを提供します。 これを使用すると、明示的にプロセス間メッセージを送信することなく、メインプロセスオブジェクトのメソッドを起動できます。 もしあなたのデスクトップアプリケーションが信頼できないコンテンツを実行していない場合、このモジュールはあなたのレンダラープロセスにアクセス方法を提供し、メインプロセスでのみ利用可能な、例えばGUIに関連したモジュール(dialogs, menu 等) と動作できます。

しかし、一方で、あなたのアプリケーションが信頼できないコンテンツを実行する場合、例えあなたのレンダラープロセスを[sandbox](../api/sandbox-option.md)化していたとしても、`remote`モジュールは悪意のあるコードにそのサンドボックスを抜けだす方法を提供し、メインプロセスの、より高い権限を通じてシステムリソースへアクセス可能にしてしまいます。 そのため、そのような状況ではこのモジュールは無効化しておくべきです。

### なぜ？

`remote` は内部の IPC チャンネルを使用して、メインプロセスと通信します。 「プロトタイプ汚染」攻撃は、内部 IPC チャンネルへの悪意のあるコードアクセスを許可する可能性があります。サンドボックスを回避して、`remote` IPC メッセージに擬態してより高い特権で実行されているメインプロセスモジュールにアクセスすることができます。

さらに、プリロードスクリプトが誤ってサンドボックス化されたレンダラーにモジュールをリークさせる可能性があります。 `remote` をリークすると、攻撃を実行するため、多数の主要なプロセスモジュールに悪意のあるコードが仕掛けられます。

`remote` モジュールの無効化によってこれらの攻撃手法は無効化できます。コンテキストの隔離の有効化もまた、これに続くプロトタイプ汚染攻撃を防ぎます。

### どうすればいいの？

```js
// レンダラーが信頼できないコンテンツを実行する場合、危険
const mainWindow = new BrowserWindow({})
```

```js
// 安全
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- レンダラーが信頼できないコンテンツを実行する場合、危険  -->
<webview src="page.html"></webview>

<!-- 安全 -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16) `remote` モジュールをフィルタ

`remote` モジュールを無効にすることができない場合は、アプリケーションで必要のない `remote` を介してアクセス可能なもの、グローバル変数、Node、Electron モジュール (いわゆる組み込み) をフィルタリングする必要があります。 これは、特定のモジュールを完全にブロックし、他のモジュールをそのうちのアプリが必要とする機能だけを公開するプロキシで置き換えることで実現できます。

### なぜ？

メインプロセスのシステムアクセス特権のために、メインプロセスモジュールによって提供される機能は、レンダラプロセスで実行される悪意のあるコードの手に渡る危険があるかもしれません。 アクセス可能なモジュールのセットをアプリケーションが必要とする最小限のものに制限し、他のものを除外することで、悪意のあるコードがシステムの攻撃に使用できるツール群を減らすことができます。

最も安全な選択は [remote モジュールの無効化](#15-disable-the-remote-module) であることに注意してください。 モジュールを完全に無効にするのではなくアクセスをフィルタすることを選択した場合、フィルタを通過することを許可したモジュールを介して特権の昇格が不可能になるように、細心の注意を払う必要があります。

### どうすればいいの？

```js
const readOnlyFsProxy = require(/* ... */) // ファイル読み取り機能のみを公開している

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-guest-web-contents', (event, webContents, guestWebContents) => {
  event.preventDefault()
})
```
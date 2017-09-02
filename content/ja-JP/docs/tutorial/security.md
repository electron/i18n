# セキュリティ・ネイティブ機能・あなたの責任

Web開発者は通常、ブラウザの強力なセキュリティ機能のお世話になっています。つまり、私たちの書くコードが原因となってセキュリティ上の問題が生じるリスクは比較的小さいわけです。 私たちがWebサイトを作ったとして、それはブラウザというサンドボックス上において限られた権限しか与えられません。また、そのブラウザも新たなセキュリティ上の脅威にすぐ対応できる、大規模なチームによって開発されたものです。

Electronで開発を行う時、「Electronはブラウザではない」ということを認識する必要があります。 使い慣れたWeb技術を用いて豊富な機能を持つデスクトップアプリケーションを作成することができますが、Webアプリを書く時に比べて、あなたの書くコードが大きな力を持つことになります。 JavaScriptがファイルシステムやシェルなどにアクセスできます。 これはつまり、質の高いネイティブアプリケーションを作成することができる反面、あなたの書くコードに与えられた権限に応じて固有のセキュリティリスクが増加するということです。

そのことを頭に入れて、信頼できないソースから得られた任意の内容を表示することは、Electronが意図しない重要なセキュリティリスクを生み出すことに注意してください。 実際、Atom, Slack, Visual Studio Codeといった人気のあるElectronアプリケーションは、主にローカル（あるいは信頼されており、なおかつNode integrationを使用しないリモート）のコンテンツを取り扱います。もしあなたのアプリケーションがオンライン上のリソースからコードを実行する場合、あなたの責任の下でそのコードが悪意のあるものではないことを確認する必要があります。

## セキュリティ問題の報告

For information on how to properly disclose an Electron vulnerability, see [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromiumのセキュリティ問題とアップグレード

Electronは新しいバージョンのChromiumを出来るだけ早くサポートするように努力をしてはいますが、アップグレードは数十、時には数百のファイルの編集を含む大変な作業であることを後理解ください。 たくさんのリソースと貢献を受けていますが、ElectronはChromium最新版に追いついてないこともあり、数日・数週間遅れることがあります。

現在のChromiumコンポーネントのアップデートシステムは、使用できるリソースとほとんどのアプリケーションの需要を満たす、適切なバランスの場所にあると思います。 我々は、Electronを使用する個々のケースに関する意見をいただきたいと思っています。 この件に関するPull requestと貢献をいつでも歓迎します。

## 上記の忠告を無視した場合

リモートで得られたコードをローカルで実行した場合、セキュリティ問題が発生することになります。 例えば、ブラウザでリモートのウェブサイトを表示することを考えてみてください。 もし攻撃者がどうにかして(情報源そのものの攻撃や中間者攻撃によって)得られる内容を変更した場合、ユーザーのPC上でネイティブコードを実行できることになります。

> :warning: Node integration有効な環境で、リモートコードの読み込みと実行を行うべきではありません。 代わりに、Nodeコードの実行には(アプリケーション内の)ローカルのファイルを使用してください。 リモートのデータの内容を表示するには`webview`を使用して、`nodeIntegration`を無効にしてください。

#### チェックリスト

これで完全というわけではありませんが、最低でも以下のような対策を行う必要があるでしょう。

* セキュリティで保護されたコンテンツ(https) のみ表示
* リモートのコンテンツを表示するすべてのレンダラプロセスにおいて、Node integrationを無効にする(`webPreferences`において`nodeIntegration`を`false`にする)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* `webSecurity`を無効にしないください。無効にすると、same-origin policyが無効になります。
* [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)を定義して、スクリプトの読み込み元を制限してください。(例: `script-src 'self'`)
* [`eval`を無効にしてください。](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) evalは文字列をコードとして実行してしまいます。
* `allowRunningInsecureContent`をtrueにしない
* しっかり理解していない限りは`experimentalFeatures`や`experimentalCanvasFeatures`を有効にしないでください。
* しっかり理解していない限りは`blinkFeatures`を有効にしないでください。
* WebViews: `nodeintegration`属性を追加しない
* WebViews: `disablewebsecurity`を使用しない
* WebViews: `allowpopups`を使用しない
* WebViews: `insertCSS` や `executeJavaScript` をリモートのCSS/JSと共に使用しない
* WebViews: Verify the options and params of all `<webview>` tags before they get attached using the `will-attach-webview` event:

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

繰り返しになりますが、このチェックリストはリスクを最小化するものであり、リスクを無くすものではありません。ただ単にWebサイトを表示するという目的であれば、Electronアプリケーションよりもブラウザを利用した方がよりセキュアでしょう。
# Security, Native Capabilities, and Your Responsibility

Web開発者は通常、ブラウザの強力なセキュリティ機能のお世話になっています。つまり、私たちの書くコードが原因となってセキュリティ上の問題が生じるリスクは比較的小さいわけです。 私たちがWebサイトを作ったとして、それはブラウザというサンドボックス上において限られた権限しか与えられません。また、そのブラウザも新たなセキュリティ上の脅威にすぐ対応できる、大規模なチームによって開発されたものです。

Electronで開発を行う時、「Electronはブラウザではない」ということを認識する必要があります。 使い慣れたWeb技術を用いて豊富な機能を持つデスクトップアプリケーションを作成することができますが、Webアプリを書く時に比べて、あなたの書くコードが大きな力を持つことになります。 JavaScriptがファイルシステムやシェルなどにアクセスできます。 これはつまり、質の高いネイティブアプリケーションを作成することができる反面、あなたの書くコードに与えられた権限に応じて固有のセキュリティリスクが増加するということです。

With that in mind, be aware that displaying arbitrary content from untrusted sources poses a severe security risk that Electron is not intended to handle. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) – if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.

## セキュリティ問題の報告

For information on how to properly disclose an Electron vulnerability, see [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Security Issues and Upgrades

While Electron strives to support new versions of Chromium as soon as possible, developers should be aware that upgrading is a serious undertaking - involving hand-editing dozens or even hundreds of files. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by either days or weeks.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. Pull requests and contributions supporting this effort are always very welcome.

## Ignoring Above Advice

A security issue exists whenever you receive code from a remote destination and execute it locally. As an example, consider a remote website being displayed inside a browser window. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### チェックリスト

これで完全というわけではありませんが、最低でも以下のような対策を行う必要があるでしょう。

* セキュリティで保護されたコンテンツ(https) のみ表示
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Do not set `allowRunningInsecureContent` to true.
* Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
* Do not use `blinkFeatures` unless you know what you're doing.
* WebViews: Do not add the `nodeintegration` attribute.
* WebViews: Do not use `disablewebsecurity`
* WebViews: Do not use `allowpopups`
* WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.

繰り返しになりますが、このチェックリストはリスクを最小化するものであり、リスクを無くすものではありません。ただ単にWebサイトを表示するという目的であれば、Electronアプリケーションよりもブラウザを利用した方がよりセキュアでしょう。
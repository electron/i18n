---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Electron チームは、Electron 4 安定版が利用可能になった発表でワクワクしています! [electronjs.org](https://electronjs.org/) からか、npm で `npm install electron@latest` からインストールできます。 このリリースにはアップグレード、修正、新機能が詰め込んであります。皆さんが何を作るのか待ち遠しいです。 以下にこのリリースの詳細が続きます。是非使用したご意見を共有してください!

---

## 何が新しくなったの?

Electron の機能の大部分は、Electron を構成するコアコンポーネントの Chromium、Node.js、V8 によって提供されています。 そのため Electron チームの主な目標は、これらのプロジェクトの変更に可能な限り対応し、Electron アプリを開発する開発者に新しいウェブや JavaScript の機能へのアクセスを提供することです。 このため Electron 4 ではこれらの各コンポーネントのバージョンが大きく変更されています。Electron v4.0.0 には Chromium `69.0.3497.106`、Node `10.11.0`、V8 `6.9.427.24` が入っています。

さらに、Electron 4 には Electron 固有の API への変更が含まれます。 変更箇所の全リストは、[Electron v4.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v4.0.0) を参照してください。

### `remote` モジュールの無効化

セキュリティ上の理由から、`remote` モジュールを無効化できるようになりました。 このモジュールは `BrowserWindow` や `webview` タグに対して無効化できます。

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview タグ
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

詳細は [BrowserWindow](https://electronjs.org/docs/api/browser-window) や [`<webview>` タグ](https://electronjs.org/docs/api/webview-tag) のドキュメントを参照してください。

### `remote.require()` / `remote.getGlobal()` リクエストのフィルタリング

この機能は、レンダラープロセスや `webview` の `remote` モジュールを完全に無効化したくないけれど、`remote.require` で require され得るモジュールを追加で制御したい場合に便利です。

レンダラープロセス内で `remote.require` からモジュールが require されると、[`app` モジュール](https://electronjs.org/docs/api/app) で `remote-require` イベントが発生します。 event (第一引数) の `event.preventDefault()` を呼び出すと、モジュールをロードしないようにできます。 第 2 引数には require を発生させた [`WebContents` インスタンス](https://electronjs.org/docs/api/web-contents) が、第 3 引数にはモジュール名が渡されます。 同じイベントが `WebContents` インスタンスでも発生しますが、この場合はイベントとモジュール名のみが引数です。 どちらの場合でも、`event.returnValue` に値をセットすることでカスタム値を返すことが出来ます。

```javascript
// 全ての WebContents からの `remote.require` を制御:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// 特定の WebContents インスタンスからの  `remote.require` を制御:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

同様に、`remote.getGlobal(name)` が呼び出されると `remote-get-global` イベントが発生します。 これは `remote-require` イベントと同じように動作します。global が返されないように `preventDefault()` を呼び出したり、`event.returnValue` でカスタム値を返したりできます。

```javascript
// 全ての WebContents からの `remote.getGlobal` を制御:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// 特定の WebContents インスタンスからの  `remote.getGlobal` を制御:
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

詳細は、以下のドキュメントを参照してください。

* [`remote.require`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebContents`](https://electronjs.org/docs/api/web-contents)

### JavaScript で アプリについて にアクセス

macOS で `{role: 'about'}` で作成されたメニューアイテムをクリックするのと同じように、`app.showAboutPanel()` を呼び出すとプログラムから このアプリについて のパネルを表示できるようになりました。 詳しくは [`showAboutPanel` ドキュメント](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) を参照して下さい。

### `WebContents` バックグラウンド抑制の制御

`WebContents` インスタンスに、ページがバックグラウンドになったときにタイマーやアニメーションの抑制を有効または無効にするメソッド `setBackgroundThrottling(allowed)` が加わりました。

```javascript
let win = new BrowserWindow(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

詳しくは [`setBackgroundThrottling` ドキュメント](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) を参照して下さい。

## 破壊的変更

### macOS 10.9 をサポートしないように

Chromium は macOS 10.9 (OS X Mavericks) をサポートしなくなったので、[Electron 4.0 以降でもサポートしません](https://github.com/electron/electron/pull/15357)。

### シングルインスタンスロック

以前は、アプリをシングルインスタンスアプリケーションに (アプリのインスタンスが常に 1 つしか実行されないように) するために、`app.makeSingleInstance()` メソッドが使用できました。 Electron 4.0 からは、代わりに `app.requestSingleInstanceLock()` を使用する必要があります。 このメソッドの戻り値は、アプリケーションのこのインスタンスのロックが成功したかどうかを表します。 ロックの取得に失敗した場合は、アプリケーションの別のインスタンスがすでにロックした上で実行していると考えられるため、直ちに終了してください。

`requestSingleInstanceLock()` の使用例や、さまざまなプラットフォームでの細かい挙動については、[`app.requestSingleInstanceLock()` とその関連メソッド](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) のドキュメントや [`second-instance` イベント](https://electronjs.org/docs/api/app#event-second-instance) を参照してください。

### `win_delay_load_hook`

Windows でネイティブモジュールをビルドするとき、モジュールの `binding.gyp` 内の `win_delay_load_hook` 変数は true (これが初期値) にならなければいけません。 このフックが存在しない場合、そのネイティブモジュールは Windows 上ではロードできず、`Cannot find module` のようなエラーメッセージが表示されます。 詳細は [ネイティブモジュールガイドを参照してください](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook)。

## 非推奨

以下の破壊的変更が Electron 5.0 で予定されているため、Electron 4.0 で非推奨となります。

### Windows で `nativeWindowOpen` された場合の Node.js インテグレーション無効化

Electron 5.0 からは、`nativeWindowOpen` オプションで開いた子ウィンドウでは常に Node.js インテグレーションが無効化されます。

### `webPreferences` の既定値

`webPreferences` オプションを指定して新しい`BrowserWindow` を作成する場合、以下のように元の `webPreferences` オプションの省略値は非推奨となり、新しい省略値が採用されます。

<div class="table table-ruled table-full-width">

| プロパティ | 非推奨になった省略値 | 新しい省略値 |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | `nodeIntegration` の値で、それが未設定ならば `true` | `false` |

</div>

注記: 現在 [既知のバグ (#9736)](https://github.com/electron/electron/issues/9736) があり、`contextIsolation` がオンの場合に`webview` タグが動作しません。 最新の情報は GitHub の Issue を確認してください!

コンテキストイソレーション、Node インテグレーション、`webview` タグについての詳細は、[Electron セキュリティドキュメント](https://electronjs.org/docs/tutorial/security) を参照してください。

Electron 4.0 では旧来のデフォルト値を使用しますが、値を明示的に渡さない場合は非推奨の警告が表示されます。 アプリが Electron 5.0 へ対応するように準備するのであれば、これらのオプションに明示的な値を使用してください。 各オプションの詳細については [`BrowserWindow` ドキュメント](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) を参照してください。

### `webContents.findInPage(text[, options])`

`medialCapitalAsWordStart` と `wordStart` オプションは、上流で削除されたために非推奨となりました。

## App のフィードバックプログラム

Electron 3.0 の開発時に実施した [アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) が成功したので、4.0 の開発でも継続して実施します。 Atlassian、Discord、MS Teams、OpenFin、Slack、Symphony、WhatsApp、その他プログラムメンバーの方々には、4.0 ベータサイクルに参加して頂いたことに多大な感謝の意を表します。 アプリフィードバックプログラムの詳細や今後のベータ版への参加については、[当プログラムに関するブログ記事を参照してください](https://electronjs.org/blog/app-feedback-program)。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照してください](https://electronjs.org/docs/tutorial/electron-versioning)。

今後のバージョンの Electron で予定されている破壊的変更の詳細は、[予定されている破壊的変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md)。

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

### Single Instance Locking

Previously, to make your app a Single Instance Application (ensuring that only one instance of your app is running at any given time), you could use the `app.makeSingleInstance()` method. Starting in Electron 4.0, you must use `app.requestSingleInstanceLock()` instead. The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

For an example of using `requestSingleInstanceLock()` and information on nuanced behavior on various platforms, [see the documentation for `app.requestSingleInstanceLock()` and related methods](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) and [the `second-instance` event](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. [See the native module guide](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) for more information.

## Deprecations

The following breaking changes are planned for Electron 5.0, and thus are deprecated in Electron 4.0.

### Node.js Integration Disabled for `nativeWindowOpen`-ed Windows

Starting in Electron 5.0, child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled.

### `webPreferences` Default Values

When creating a new `BrowserWindow` with the `webPreferences` option set, the following `webPreferences` option defaults are deprecated in favor of new defaults listed below:

<div class="table table-ruled table-full-width">

| Property | Deprecated Default | New Default |
|----------|--------------------|-------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | value of `nodeIntegration` if set, otherwise `true` | `false` |

</div>

Please note: there is currently [a known bug (#9736)](https://github.com/electron/electron/issues/9736) that prevents the `webview` tag from working if `contextIsolation` is on. Keep an eye on the GitHub issue for up-to-date information!

Learn more about context isolation, Node integration, and the `webview` tag in [the Electron security document](https://electronjs.org/docs/tutorial/security).

Electron 4.0 will still use the current defaults, but if you don't pass an explicit value for them, you'll see a deprecation warning. To prepare your app for Electron 5.0, use explicit values for these options. [See the `BrowserWindow` docs](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) for details on each of these options.

### `webContents.findInPage(text[, options])`

The `medialCapitalAsWordStart` and `wordStart` options have been deprecated as they have been removed upstream.

## App のフィードバックプログラム

The [App Feedback Program](https://electronjs.org/blog/app-feedback-program) we instituted during the development of Electron 3.0 was successful, so we've continued it during the development of 4.0 as well. We'd like to extend a massive thank you to Atlassian, Discord, MS Teams, OpenFin, Slack, Symphony, WhatsApp, and the other program members for their involvement during the 4.0 beta cycle. To learn more about the App Feedback Program and to participate in future betas, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## 次回予告

In the short term, you can expect the team to continue to focus on keeping up with the development of the major components that make up Electron, including Chromium, Node, and V8. Although we are careful not to make promises about release dates, our plan is release new major versions of Electron with new versions of those components approximately quarterly. [See our versioning document](https://electronjs.org/docs/tutorial/electron-versioning) for more detailed information about versioning in Electron.

For information on planned breaking changes in upcoming versions of Electron, [see our Planned Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

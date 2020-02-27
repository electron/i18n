---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 がリリースされました! これには Chromium `80`、V8 `8.0`、Node.js `12.13.0` へのアップグレードが含まれています。 Chrome の組み込みスペルチェッカーや、その他にも色々と追加しました!

---

Electron チームは、Electron 8.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が含まれています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

## 変更の目玉

### 累積的変更
* Chromium `80.0.3987.86`
    * [Chrome 79 の新機能](https://developers.google.com/web/updates/2019/12/nic79)
    * [Chrome 80 の新機能](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Node 12.13.0 ブログ記事](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [V8 7.9 ブログ記事](https://v8.dev/blog/v8-release-79)
    * [V8 8.0 ブログ記事](https://v8.dev/blog/v8-release-80)

### 注目の機能
* Chrome の組み込みスペルチェッカー機能を使用できるように実装しました。 詳細は [#20692](https://github.com/electron/electron/pull/20692) と [#7189](https://github.com/electron/electron/pull/21266) を参照してください。
* IPC 通信では、v8 の構造化複製アルゴリズムが使用されるようになりました。 これは既存のロジックよりも驚くほど高速で、機能豊富で、小さくなっています。大容量バッファと複雑なオブジェクトに対するパフォーマンスは約 2 倍に向上します。 小さいメッセージに対する遅延はほとんど影響しません。 詳細は [#20214](https://github.com/electron/electron/pull/20214) を参照してください。

新機能と変更の完全なリストは、[8.0.0 リリースノート](https://github.com/electron/electron/releases/tag/v8.0.0) を参照してください。

## 破壊的変更

* コンテキスト対応モジュールの非推奨警告でその名前を表示します。 [#21952](https://github.com/electron/electron/pull/21952)
    * これは、レンダラープロセスにロードされるネイティブ Node モジュールは [N-API](https://nodejs.org/api/n-api.html) か [コンテキス対応](https://nodejs.org/api/addons.html#addons_context_aware_addons) であるという将来の要件に対応する作業の一環です。 完全な情報と提案された時系列は、[この Issue](https://github.com/electron/electron/issues/18397) で詳しく説明しています。
* IPC を介して送信される値が構造化複製アルゴリズムでシリアライズされるように.  [#20214](https://github.com/electron/electron/pull/20214)
* オフスクリーンレンダリングの機能を管理するメンテナーがいないため、これは現在無効になっています。  Chromium のアップグレード中に動作しなくなり、その後無効になりました。 [#20772](https://github.com/electron/electron/issues/20772)

これらの変更と将来の変更の詳細については、[予定されている破壊的な変更](https://github.com/electron/electron/electron/blob/master/docs/breaking-changes.md) のページを参照してください。

## API の変更
* `app` API の変更:
    * `app.getApplicationNameForProtocol(url)` を追加しました。 [#20399](https://github.com/electron/electron/pull/20399)
    * `app.showAboutPanel()` と `app.setAboutPanelOptions(options)` に Windows での対応を追加しました。 [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` API の変更:
    * BrowserWindow オプション `hasShadow` が全プラットフォームで利用可能であることを注意するようにドキュメントを更新しました [#20038](https://github.com/electron/electron/pull/20038)
    * BrowserWindow オプションに `trafficLightPosition` オプションを追加して、信号機ボタンのカスタム位置を指定できるようにしました。 [#21781](https://github.com/electron/electron/pull/21781)
    * アクセシブルウィンドウのタイトルを設定する `accessibleTitle` オプションを BrowserWindow に追加しました [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` が null も返すようになりました [#19983](https://github.com/electron/electron/pull/19983)
    * `BrowserWindow.getMediaSourceId()` と `BrowserWindow.moveAbove(mediaSourceId)` を追加しました。 [#18926](https://github.com/electron/electron/pull/18926)
    * macOS での `will-move` イベントの対応を追加しました。 [#19641](https://github.com/electron/electron/pull/19641)
* 以前にドキュメント化されていなかった `crashReporter.getCrashesDirectory()` をドキュメント化しました。 [#20417](https://github.com/electron/electron/pull/20417)
* `dialog` API の変更:
    * `dontAddToRecent` プロパティを `dialog.showOpenDialog` や `dialog.showOpenDialogSync` に追加しました。これは開くダイアログで書類を開いても Windows の最近開いたドキュメントに追加しません。 [#19669](https://github.com/electron/electron/pull/19669)
    * `dialog.showSaveDialog` と `dialog.showSaveDialogSync` にプロパティのカスタマイズを追加しました。 [#19672](https://github.com/electron/electron/pull/19672)
* `Notification` API の変更:
    * Linux/Windows ユーザーに通知期限切れのタイプを設定できるようにする `timeoutType` オプションを追加しました。 [#20153](https://github.com/electron/electron/pull/20153)
    * Linux 通知の緊急度を設定する `urgency` オプションを追加しました。 [#20152](https://github.com/electron/electron/pull/20152)
* `session` API の変更:
    * `session.setProxy(config)` と `session.setCertificateVerifyProc(proc)` のドキュメントを更新して、任意のオプションを記述しました。 [#19604](https://github.com/electron/electron/pull/19604)
    * BrowserWindow なしでダウンロードをトリガーできるようにする `session.downloadURL(url)` を追加しました。 [#19889](https://github.com/electron/electron/pull/19889)
    * `session.preconnect(options)` と `preconnect` イベントによる HTTP 事前接続リソースのヒントへの対応を追加しました。 [#18671](http://github.com/electron/electron/pull/18671)
    * スペルチェッカー辞書がカスタムワードを使えるようにする `session.addWordToSpellCheckerDictionary` を追加しました [#21297](http://github.com/electron/electron/pull/21297)
* macOS の `shell.moveItemToTrash(fullPath[, deleteOnFail])` にオプションを追加しました。これは moveItemToTrash が失敗した場合の動作を指定します。 [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` API の変更:
    * macOS の `systemPreferences.getColor(color)`ドキュメントを更新しました。 [#20611](https://github.com/electron/electron/pull/20611)
    * `screen ` メディアタイプを `systemPreferences.getMediaAccessStatus()` に追加しました。 [#20764](https://github.com/electron/electron/pull/20764)
* `nativeTheme.themeSource` を追加しました。これはアプリが Chromium と OS のテーマ選択をオーバーライドできるようにします。 [#19960](https://github.com/electron/electron/pull/19960)
* TouchBar API の変更:
    * Added `accessibilityLabel` property to `TouchBarButton` and `TouchBarLabel` to improve TouchBarButton/TouchBarLabel accessibility. [#20454](https://github.com/electron/electron/pull/20454)
    * Updated TouchBar related documentation [#19444](https://github.com/electron/electron/pull/19444)
* `tray` API changes:
    * Added new options to `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` and `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Added tray.removeBalloon(), which removes an already displayed balloon notification. [#19547](https://github.com/electron/electron/pull/19547)
    * Added tray.focus(), which returns focus to the taskbar notification area. feat: add tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` API changes:
    * Added `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` to expose executeJavaScriptInIsolatedWorld on the webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Added methods to capture a hidden webContents. [#21679](https://github.com/electron/electron/pull/21679)
    * Added options to `webContents.print([options], [callback])` to enable customization of print page headers and footers. [#19688](https://github.com/electron/electron/pull/19688)
    * Added ability to inspect specific shared workers via `webContents.getAllSharedWorkers()` and `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Added the support of `fitToPageEnabled` and `scaleFactor` options in WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Updated `webview.printToPDF` documentation to indicate return type is now Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Deprecated APIs
The following APIs are now deprecated:
* Deprecated the nonfunctional `visibleOnFullScreen` option within `BrowserWindow.setVisibleOnAllWorkspaces` prior to its removal in the next major release version. [#21732](https://github.com/electron/electron/pull/21732)
* Deprecated `alternate-selected-control-text` on `systemPreferences.getColor(color)` for macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Deprecated `setLayoutZoomLevelLimits` on `webContents`, `webFrame`, and `<webview> Tag` because Chromium removed this capability. [#21296](https://github.com/electron/electron/pull/21296)
* The default value of `false` for `app.allowRendererProcessReuse` is now deprecated. [#21287](https://github.com/electron/electron/pull/21287)
* Deprecated `<webview>.getWebContents()` as it depends on the remote module. [#20726](https://github.com/electron/electron/pull/20726)

## End of Support for 5.x.y

Electron 5.x.y has reached end-of-support as per the project's [support policy](https://electronjs.org/docs/tutorial/support#supported-versions). Developers and applications are encouraged to upgrade to a newer version of Electron.

## App のフィードバックプログラム

We continue to use our [App Feedback Program](https://electronjs.org/blog/app-feedback-program) for testing. Projects who participate in this program test Electron betas on their apps; and in return, the new bugs they find are prioritized for the stable release. If you'd like to participate or learn more, [check out our blog post about the program](https://electronjs.org/blog/app-feedback-program).

## What's Next

In the short term, you can expect the team to continue to focus on keeping up with the development of the major components that make up Electron, including Chromium, Node, and V8. Although we are careful not to make promises about release dates, our plan is release new major versions of Electron with new versions of those components approximately quarterly. The [tentative 9.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 9 development life cycle. Also, [see our versioning document](https://electronjs.org/docs/tutorial/electron-versioning) for more detailed information about versioning in Electron.

For information on planned breaking changes in upcoming versions of Electron, [see our Planned Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprecation of `remote` Module (Starting in Electron 9)
Due to serious security liabilities, we are beginning plans to deprecate the [`remote` module](https://www.electronjs.org/docs/api/remote) starting in Electron 9. You can read and follow [this issue](https://github.com/electron/electron/issues/21408) that details our reasons for this and includes a proposed timeline for deprecation.

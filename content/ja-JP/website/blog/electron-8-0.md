---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 がリリースされました! これには Chromium `80`、V8 `8.0`、Node.js `12.13.0` へのアップグレードが含まれています。 Chrome の組み込みスペルチェッカーや、その他にも色々と追加しました!

---

Electron チームは、Electron 8.0.0 のリリース発表にワクワクしています! `npm install electron@latest` から npm でインストールするか、[リリースウェブサイト](https://electronjs.org/releases/stable) からダウンロードできます。 このリリースには、アップグレード、修正、新機能が入っています。 新機能たちと共に何を作るのか、楽しみにしています! このリリースの詳細については下に続きます。是非ご意見をお聞かせください!

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
    * `accessibilityLabel` プロパティを `TouchBarButton` と `TouchBarLabel` に追加しました。これにより、TouchBarButton/TouchBarLabel のアクセシビリティを改善しました。 [#20454](https://github.com/electron/electron/pull/20454)
    * TouchBar に関するドキュメントを更新しました [#19444](https://github.com/electron/electron/pull/19444)
* `tray` API の変更:
    * `tray.displayBalloon()` に以下の新しいオプションを追加しました。`iconType`、`largeIcon`、`noSound`、`respectQuietTime` です。 [#19544](https://github.com/electron/electron/pull/19544)
    * tray.removeBalloon() を追加しました。これは、既に表示しているバルーン通知を削除します。 [#19547](https://github.com/electron/electron/pull/19547)
    * tray.focus() を追加しました。これは、タスクバーの通知領域にフォーカスを戻します。 機能: tray.focus() の追加 [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` API の変更:
    * `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` を追加しました。これは webContents API 上での executeJavaScriptInIsolatedWorld を公開します。 [#21190](https://github.com/electron/electron/pull/21190)
    * 非表示の webContents をキャプチャするメソッドを追加しました。 [#21679](https://github.com/electron/electron/pull/21679)
    * 印刷ページのヘッダーとフッターのカスタマイズを有効にするオプションを `webContents.print([options], [callback])` に追加しました。 [#19688](https://github.com/electron/electron/pull/19688)
    * ` webContents.getAllSharedWorkers()` と `webContents.inspectSharedWorkerById(workerId)` を介して特定の共有ワーカーをインスペクトする機能が追加されました。 [#20389](https://github.com/electron/electron/pull/20389)
    * WebContents.printToPDF() での `fitToPageEnabled` と `scaleFactor` オプションの対応を追加しました。 [#20436](https://github.com/electron/electron/pull/20436)
* `webview.printToPDF` のドキュメントを更新し、戻り値型が Uint8Array になったことを示しました。 [#20505](https://github.com/electron/electron/pull/20505)

### 非推奨となった API
これらの API は非推奨になりました。
* `BrowserWindow.setVisibleOnAllWorkspaces` で機能していない `visibleOnFullScreen` オプションを非推奨にしました。これは次のメジャーリリースバージョンで削除します。 [#21732](https://github.com/electron/electron/pull/21732)
* macOS の `systemPreferences.getColor(color)` での `alternate-selected-control-text` を非推奨にしました。 [#20611](https://github.com/electron/electron/pull/20611)
* Chromium がこの機能を削除したため、`webContents`、`webFrame`、`<webview>` の `setLayoutZoomLevelLimits` を非推奨にしました。 [#21296](https://github.com/electron/electron/pull/21296)
* `app.allowRendererProcessReuse` の省略値 `false` を非推奨にしました。 [#21287](https://github.com/electron/electron/pull/21287)
* remote モジュールに依存するため、`<webview>.getWebContents()` を非推奨にしました。 [#20726](https://github.com/electron/electron/pull/20726)

## 5.x.y サポート終了

Electron 5.x.y はプロジェクトの [サポートポリシー](https://electronjs.org/docs/tutorial/support#supported-versions) に則りサポート終了となりました。 開発者はアプリケーションを新しいバージョンの Electron にアップグレードすることを推奨します。

## App のフィードバックプログラム

テストには引き続き [アプリフィードバックプログラム](https://electronjs.org/blog/app-feedback-program) を使用します。 このプログラムに参加するプロジェクトは、そのアプリで Electron ベータ版をテストします。見返りとして、発見した新しいバグは安定版リリースのために優先します。 参加や詳細については、[当プログラムに関するブログ記事を確認してください](https://electronjs.org/blog/app-feedback-program)。

## 次回予告

短期的には、Chromium、Node、V8 といった Electron を構成する主要コンポーネントの開発に遅れないように、チームが注力し続けるでしょう。 リリース日について約束しないように注意していますが、予定では約四半期ごとに新しいメジャーバージョンの Electron を、各コンポーネントの新しいバージョンに対してリリースします。 [仮 9.0.0 スケジュール](https://electronjs.org/docs/tutorial/electron-timelines) では、Electron 9 開発ライフサイクルの主要な日付を示してあります。 また、Electron のバージョン管理の詳細については [バージョン管理のドキュメントを参照](https://electronjs.org/docs/tutorial/electron-versioning) してください。

今後のバージョンの Electron で予定されている破壊的な変更の詳細については、[予定されている破壊的な変更のドキュメントを参照してください](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)。

### `remote` モジュールの非推奨化 (Electron 9 から)
深刻なセキュリティ面の問題のため、Electron 9 から [`remote` モジュール](https://www.electronjs.org/docs/api/remote) の非推奨化計画を始めています。 [この Issue](https://github.com/electron/electron/issues/21408) を読んで経緯を知ってください。この Issue では、理由を説明し非推奨化予定のタイムラインを提案しています。

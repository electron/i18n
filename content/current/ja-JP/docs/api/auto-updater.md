# autoUpdater

> アプリを自動的に更新することができます。

プロセス: [Main](../glossary.md#main-process)

**こちらも参照: [アプリケーションを更新する](../tutorial/updates.md)**

`autoUpdater` は [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) を継承しています。

## プラットフォームに関する注意事項

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

さらに、各プラットフォームではいくつかの微妙な違いがあります。

### macOS

macOSでは、`autoUpdater` モジュールは [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) で構築されているので、動作させるのに特別なセットアップ作業をする必要はありません。 サーバー側の要件については、[サーバーサポート](https://github.com/Squirrel/Squirrel.Mac#server-support) をお読みください。 [アプリケーショントランスポートセキュリティ](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) が、更新処理の一部としてなされるすべてのリクエストに適用されることに注意してください。 アプリのplistに `NSAllowsArbitraryLoads` キーを追加することで、ATSを無効にすることができます。

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

Windowsでは、`autoUpdater` を使えるようにする前にユーザのマシンにアプリをインストールしなければなりません。そのため、[electron-winstaller](https://github.com/electron/windows-installer)、[electron-forge](https://github.com/electron-userland/electron-forge) または [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) パッケージを使ってWindowsインストーラーを作成することを推奨します。

[electron-winstaller](https://github.com/electron/windows-installer) または [electron-forge](https://github.com/electron-userland/electron-forge) を使用する場合、[初回実行時に](https://github.com/electron/windows-installer#handling-squirrel-events)アプリを更新しようとしないようにしてください ([この問題の詳細情報](https://github.com/electron/electron/issues/7155)も参照してください)。 アプリのデスクトップショートカットを作成する [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) も使用することを推奨します。

Squirrelで作成されたインストーラは、例えば、`com.squirrel.slack.Slack` や `com.squirrel.code.Code` といった`com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE` という形式による[アプリケーションユーザID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)を持つショートカットアイコンを作成します。 `app.setAppUserModelId` APIでアプリに対して同じIDを使うようにしてください。そうでないと、Windowsはタスクバーにアプリを正しくピン留めすることができません。

Squirrel.Macとは違って、Windowsでは、S3やその他の静的ファイルホストに更新プログラムをホストすることができます。 Squirrel.Windowsの仕組みの詳細については、[Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) のドキュメントをお読みください。

## イベント

`autoUpdater` オブジェクトは以下のイベントを発生させます。

### イベント: 'error'

戻り値:

* `error` Error

更新中にエラーがあるときに出力されます。

### イベント: 'checking-for-update'

更新が始まったかどうかをチェックするときに放出されます。

### イベント: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### イベント: 'update-not-available'

利用可能な更新がない場合に出力されます。

### イベント: 'update-downloaded'

戻り値:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

更新プログラムがダウンロードされたときに発生します。

Windowsでは `releaseName` のみ利用可能です。

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### イベント: 'before-quit-for-update'

このイベントは、ユーザが呼び出した `quitAndInstall()` の後に発火されます。

この API が呼ばれた時、すべてのウィンドウが閉じられる前に `before-quit` イベントは発火されません。 結果として、プロセス終了時にウィンドウが閉じられる前にアクションを実行するために、`before-quit` をリッスンする場合は、このイベントも同様にリッスンする必要があります。

## メソッド

`autoUpdater` オブジェクトには以下のメソッドがあります

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

`url` を設定して自動更新を初期化します。

### `autoUpdater.getFeedURL()`

戻り値 `String` - 現在の更新フィードURL。

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

`autoUpdater.quitAndInstall()` を呼ぶと、この中では最初にすべてのアプリケーションウィンドウを閉じ、すべてのウィンドウが閉じられた後に自動的に `app.quit()` を呼び出します。

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

# autoUpdater

> アプリを自動的に更新することができます。

プロセス: [Main](../glossary.md#main-process)

**こちらも参照: [アプリケーションを更新する](../tutorial/updates.md)**

## プラットフォームに関する注意事項

現在、macOS と Windows にのみ対応しています。 Linux では、自動更新の組み込みサポートがないので、アプリ更新にはディストリビューションのパッケージマネージャーの使用を推奨しています。

さらに、各プラットフォームではいくつかの微妙な違いがあります。

### macOS

macOSでは、`autoUpdater` モジュールは [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) で構築されているので、動作させるのに特別なセットアップ作業をする必要はありません。 サーバー側の要件については、[サーバーサポート](https://github.com/Squirrel/Squirrel.Mac#server-support) をお読みください。 [アプリケーショントランスポートセキュリティ](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) が、更新処理の一部としてなされるすべてのリクエストに適用されることに注意してください。 アプリのplistに `NSAllowsArbitraryLoads` キーを追加することで、ATSを無効にすることができます。

**注:** macOS で自動更新を有効にするには、アプリ署名が必要です。 これは `Squirrel.Mac` の動作要件です。

### Windows

Windowsでは、`autoUpdater` を使えるようにする前にユーザのマシンにアプリをインストールしなければなりません。そのため、[electron-winstaller](https://github.com/electron/windows-installer)、[electron-forge](https://github.com/electron-userland/electron-forge) または [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) パッケージを使ってWindowsインストーラーを作成することを推奨します。

[electron-winstaller](https://github.com/electron/windows-installer) または [electron-forge](https://github.com/electron-userland/electron-forge) を使用する場合、[初回実行時に](https://github.com/electron/windows-installer#handling-squirrel-events)アプリを更新しようとしないようにしてください ([この問題の詳細情報](https://github.com/electron/electron/issues/7155)も参照してください)。 アプリのデスクトップショートカットを作成する [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) も使用することを推奨します。

Squirrelで作成されたインストーラは、例えば、`com.squirrel.slack.Slack` や `com.squirrel.code.Code` といった`com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE` という形式による[アプリケーションユーザID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)を持つショートカットアイコンを作成します。 `app.setAppUserModelId` APIでアプリに対して同じIDを使うようにしてください。そうでないと、Windowsはタスクバーにアプリを正しくピン留めすることができません。

Squirrel.Macとは違って、Windowsでは、S3やその他の静的ファイルホストに更新プログラムをホストすることができます。 Squirrel.Windowsの仕組みの詳細については、[Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) のドキュメントをお読みください。

## イベント

`autoUpdater` オブジェクトでは以下のイベントが発生します。

### イベント: 'error'

戻り値:

* `error` Error

更新中にエラーがあるときに発生します。

### イベント: 'checking-for-update'

更新処理が開始されたかをチェックするときに発生します。

### イベント: 'update-available'

利用可能な更新がある場合に発生します。 更新は自動ダウンロードされます。

### イベント: 'update-not-available'

利用可能な更新プログラムがないときに発生します。

### イベント: 'update-downloaded'

戻り値:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

更新プログラムがダウンロードされたときに発生します。

Windowsでは `releaseName` のみ利用可能です。

**注:** 必ずこのイベントを処理する必要はありません。 ダウンロードに成功した更新は、次回のアプリケーション起動時でも適用されます。

### イベント: 'before-quit-for-update'

このイベントは、ユーザが呼び出した `quitAndInstall()` の後に発火されます。

この API が呼ばれた時、すべてのウィンドウが閉じられる前に `before-quit` イベントは発火されません。 結果として、プロセス終了時にウィンドウが閉じられる前にアクションを実行するために、`before-quit` をリッスンする場合は、このイベントも同様にリッスンする必要があります。

## メソッド

`autoUpdater` オブジェクトには以下のメソッドがあります

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Object (任意) _macOS_ - HTTP リクエストヘッダ。
  * `serverType` String (任意) _macOS_ - `json` または `default` のいずれかの詳細については、[Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README を参照してください。

`url` を設定して自動更新を初期化します。

### `autoUpdater.getFeedURL()`

戻り値 `String` - 現在の更新フィードURL。

### `autoUpdater.checkForUpdates()`

更新があるかどうかサーバーに問い合わせます。 この API を使用する前に `setFeedURL` を呼び出す必要があります。

### `autoUpdater.quitAndInstall()`

ダウンロード後にアプリを再起動し、更新をインストールします。 `update-downloaded` が発生した後でしか呼び出さないでください。

`autoUpdater.quitAndInstall()` を呼ぶと、この中では最初にすべてのアプリケーションウィンドウを閉じ、すべてのウィンドウが閉じられた後に自動的に `app.quit()` を呼び出します。

**注意:** アップデートを適用するために必ずこの関数を呼ぶ必要はなく、ダウンロードに成功したアップデートは次回のアプリケーション起動時に必ず適用されます。

# autoUpdater

> アプリを自動的に更新することができます。

プロセス: [Main](../glossary.md#main-process)

**アプリケーションに自動更新を実装する方法についての詳細なガイドは [ここ](../tutorial/updates.md) にあります。**

## プラットフォームに関する注意事項

現在のところ、macOSとWindowsしかサポートされていません。Linuxでは、自動アップデータの組み込みサポートがないので、アプリを更新するためにディストリビューションのパッケージマネージャーを使うことを推奨しています。

さらに、各プラットフォームではいくつかの微妙な違いがあります。

### macOS

macOSでは、`autoUpdater` モジュールは [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) で構築されているので、動作させるのに特別なセットアップ作業をする必要はありません。 サーバー側の要件については、[サーバーサポート](https://github.com/Squirrel/Squirrel.Mac#server-support) をお読みください。 [アプリケーショントランスポートセキュリティ](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) が、更新処理の一部としてなされるすべてのリクエストに適用されることに注意してください。 アプリのplistに `NSAllowsArbitraryLoads` キーを追加することで、ATSを無効にすることができます。

**注:** macOSでは自動更新を有効にするにはアプリに署名をしなければなりません。これは、`Squirrel.Mac` の動作要件です。

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

利用可能な更新プログラムがあるときに発生します。更新プログラムは自動的にダウンロードされます。

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

## メソッド

`autoUpdater` オブジェクトには以下のメソッドがあります

### `autoUpdater.setFeedURL(options)`

* `options` Object 
  * `url` String
  * `headers` Object (任意) *macOS* - HTTP リクエストヘッダ。
  * `serverType` String (任意) *macOS* - `json` または `default` のいずれかの詳細については、[Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README を参照してください。

`url` を設定して自動更新を初期化します。

### `autoUpdater.getFeedURL()`

戻り値 `String` - 現在の更新フィードURL。

### `autoUpdater.checkForUpdates()`

更新プログラムがあるかをサーバーに問い合わせます。このAPIを使用する前に `setFeedURL` を呼び出さなければなりません。

### `autoUpdater.quitAndInstall()`

更新プログラムがダウンロードされた後でアプリを再起動し、更新プログラムをインストールします。`update-downloaded` が発生した後でしか呼び出さないようにしてください。

`autoUpdater.quitAndInstall()` を呼ぶと、この中では最初にすべてのアプリケーションウィンドウを閉じ、すべてのウィンドウが閉じられた後に自動的に `app.quit()` を呼び出します。

**注釈:** `update-downloaded` イベントが発行された後にこの API を呼び出さずにアプリケーションを終了した場合でも、アプリケーションは次の実行時に更新されたものに置き換えられます。
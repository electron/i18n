# autoUpdater

> アプリを自動的に更新することができます。

プロセス: [Main](../glossary.md#main-process)

`autoUpdater` モジュールは [Squirrel](https://github.com/Squirrel) フレームワークのためのインターフェイスを提供します

これらのプロジェクトの 1 つを使用して、アプリケーションを配布するため、マルチプラット フォーム リリース サーバーを迅速に起動できます。

* [ナッツ](https://github.com/GitbookIO/nuts): 1 A スマート リリース サーバー、アプリケーションのバックエンドとして GitHub を使ってします。リス (Mac ・ Windows) と自動更新</em>
* [電子リリース サーバー](https://github.com/ArekSredzki/electron-release-server): *A 完全におすすめの電子アプリケーションの自動アップデートと互換性のあるリリース サーバーを自己ホスト型*
* [リスの更新サーバー](https://github.com/Aluxian/squirrel-updates-server): *Squirrel.Mac と Squirrel.Windows GitHub のリリースを使用しての簡単な node.js サーバー*
* [リス リリース サーバー](https://github.com/Arcath/squirrel-release-server): 1 A フォルダーから更新プログラムを読み取り、Squirrel.Windows の単純な PHP アプリケーション。 デルタ更新プログラムをサポートしています</em>。

## プラットフォームごとの通知

Though `autoUpdater` provides a uniform API for different platforms, there are still some subtle differences on each platform.

### macOS

macOSでは、`autoUpdater` モジュールは [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) で構築されているので、動作させるのに特別なセットアップ作業をする必要はありません。 サーバー側の要件については、[サーバーサポート](https://github.com/Squirrel/Squirrel.Mac#server-support) をお読みください。 [アプリケーショントランスポートセキュリティ](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) が、更新処理の一部としてなされるすべてのリクエストに適用されることに注意してください。 アプリのplistに `NSAllowsArbitraryLoads` キーを追加することで、ATSを無効にすることができます。

**注:** macOSでは自動更新を有効にするにはアプリに署名をしなければなりません。これは、`Squirrel.Mac` の動作要件です。

### Windows

Windowsでは、`autoUpdater` を使えるようにする前にユーザのマシンにアプリをインストールしなければなりません。そのため、[electron-winstaller](https://github.com/electron/windows-installer)、[electron-forge](https://github.com/electron-userland/electron-forge) または [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) パッケージを使ってWindowsインストーラーを作成することを推奨します。

[electron-winstaller](https://github.com/electron/windows-installer) または [electron-forge](https://github.com/electron-userland/electron-forge) を使用する場合、[初回実行時に](https://github.com/electron/windows-installer#handling-squirrel-events)アプリを更新しようとしないようにしてください ([この問題の詳細情報](https://github.com/electron/electron/issues/7155)も参照してください)。 アプリのデスクトップショートカットを作成する [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) も使用することを推奨します。

Squirrelで作成されたインストーラは、例えば、`com.squirrel.slack.Slack` や `com.squirrel.code.Code` といった`com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE` という形式による[アプリケーションユーザID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)を持つショートカットアイコンを作成します。 `app.setAppUserModelId` APIでアプリに対して同じIDを使うようにしてください。そうでないと、Windowsはタスクバーにアプリを正しくピン留めすることができません。

Squirrel.Macとは違って、Windowsでは、S3やその他の静的ファイルホストに更新プログラムをホストすることができます。 Squirrel.Windowsの仕組みの詳細については、[Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) のドキュメントをお読みください。

### Linux

Linux では、自動アップデーターの組み込みサポートがないので、ディストリビューションのパッケージ マネージャーを使用してアプリを更新することをお勧め。

## イベント

`autoUpdater` オブジェクトは以下のイベントを発生させます。

### イベント: 'error'

戻り値:

* `error` Error

更新中にエラーがあるときに出力されます。

### イベント: 'checking-for-update'

更新が始まったかどうかをチェックするときに放出されます。

### イベント: 'update-available'

利用可能な更新がある場合に生成されます。更新プログラムが自動的にダウンロードされます。

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

## メソッド

`autoUpdater` オブジェクトには以下のメソッドがあります

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders`*MacOS* (オプション) - HTTP リクエスト ヘッダーをオブジェクトします。

`url` を設定して自動更新を初期化します。

### `autoUpdater.getFeedURL()`

戻り値 `String` - 現在の更新フィードURL。

### `autoUpdater.checkForUpdates()`

更新プログラムがあるかどうかをサーバーに要求します。この API を使用する前に `setFeedURL` を呼び出す必要があります。

### `autoUpdater.quitAndInstall()`

更新プログラムがダウンロードされた後でアプリを再起動し、更新プログラムをインストールします。`update-downloaded` が発生した後でしか呼び出さないようにしてください。

**注:** `autoUpdater.quitAndInstall()` はすべてのアプリケーションウインドウを最初に閉じ、その後、`app` で `before-quit` イベントだけが発生します。 これは通常の終了イベントの順序とは異なります。
# autoUpdater

> アプリを自動的に更新させられます。

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

On macOS, the `autoUpdater` module is built upon [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), meaning you don't need any special setup to make it work. For server-side requirements, you can read [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). [アプリケーション トランスポート セキュリティ](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) は、更新プロセスの一部としてすべての要求に適用されることに注意してください。 ATS を無効にする必要があるアプリは、そのアプリの plist に `NSAllowsArbitraryLoads` キーを追加できます。

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

Windows では、`自動アップデーター` を生成する [電子 winstaller](https://github.com/electron/windows-installer)、[電子フォージ](https://github.com/electron-userland/electron-forge) または [面倒な電子インストーラー](https://github.com/electron/grunt-electron-installer) パッケージを使用することをお勧めしますが、使用前に、ユーザーのコンピューターにアプリをインストールする必要がWindows インストーラー。

確認してください [電子 winstaller](https://github.com/electron/windows-installer) または [電子フォージ](https://github.com/electron-userland/electron-forge) を使用してときあなたのアプリの [初回実行](https://github.com/electron/windows-installer#handling-squirrel-events) (を参照してください [より多くの情報のためのこの問題](https://github.com/electron/electron/issues/7155) も) を更新はないです。 またアプリのショートカットを取得する [電子-リス-スタートアップ](https://github.com/mongodb-js/electron-squirrel-startup) を使用する勧めします。

リスで生成されたインストーラーは、1 com.squirrel.PACKAGE_ID の形式で [アプリケーションのユーザー モデル ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) を持つショートカット アイコンを作成します。YOUR_EXE_WITHOUT_DOT_EXE</code>、例は、`com.squirrel.slack.Slack` と `com.squirrel.code.Code`。 `App.setAppUserModelId` API を使用してアプリケーションに同じ ID を使用する必要が、それ以外の場合、Windows はアプリをタスク バーに正しく固定することができません。

Squirrel.Mac とは異なり、Windows は S3 またはその他の静的ファイルのホストに更新プログラムをホストできます。 Squirrel.Windows のしくみについての詳細を取得する [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) のドキュメントを読むことができます。

### Linux

Linux では、自動アップデーターの組み込みサポートがないので、ディストリビューションのパッケージ マネージャーを使用してアプリを更新することをお勧め。

## イベント

`autoUpdater` オブジェクトは以下のイベントを発生させます。

### イベント: 'error'

戻り値：

* `error` Error

更新中にエラーがあるときに出力されます。

### イベント: 'checking-for-update'

更新が始まったかどうかをチェックするときに放出されます。

### イベント: 'update-available'

利用可能な更新がある場合に生成されます。更新プログラムが自動的にダウンロードされます。

### イベント: 'update-not-available'

利用可能な更新がない場合に出力されます。

### イベント: 'update-downloaded'

戻り値：

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

更新プログラムがダウンロードされているときに出力されます。

Windowsでは `releaseName` のみ利用可能です。

## メソッド

`autoUpdater` オブジェクトには以下のメソッドがあります

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders`*MacOS* (オプション) - HTTP リクエスト ヘッダーをオブジェクトします。

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

更新プログラムがあるかどうかをサーバーに要求します。この API を使用する前に `setFeedURL` を呼び出す必要があります。

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.
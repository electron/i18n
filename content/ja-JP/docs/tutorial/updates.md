# アプリケーションを更新する

Electronアプリケーションを更新する方法がいくつかあります。 最も簡単で、公式にサポートされているものは、ビルトインの[Squirrel](https://github.com/Squirrel) フレームワークとElectronの [autoUpdater](../api/auto-updater.md) モジュールの利用します。

## `update.electronjs.org`の使用

GitHubのElectron チームは [update.electronjs.org](https://github.com/electron/update.electronjs.org)をメンテナンスしており、これはElectronを自己更新するための、オープンソースのWEBサービスです。 このサービスは次の条件を満すElectronアプリ用に設計されています。

- macOSまたはWindowsで動作するアプリである。
- アプリはGitHubのパブリックなリポジトリである。
- ビルド成果物は、GitHub Releases で提供する。
- ビルド成果物はコード署名されています。

このサービスを使う最も簡単な方法は[update-electron-app](https://github.com/electron/update-electron-app)をインストールすることで、update.electronjs.orgをつかって、事前調整されたNode.js モジュールを使う方法です。

モジュールのインストール

```sh
npm install update-electron-app
```

あなたのmain processファイルからこのupdaterを起動します。

```js
require('update-electron-app')()
```

デフォルト設定で、このモジュールはアプリの起動時に更新をチェックします。または10分毎にチェックします。 アップデートがみつかったとき、自動的にバックグラウンドでダウンロードします。 そのダウンロードが完了したとき、ダイアログを表示してユーザーにアプリの再起動許可を取ります。

設定をカスタマイズしたい場合、[`update-electron-app`にオプションを渡す](https://github.com/electron/update-electron-app)か、または[アップデートサービスを直接使用](https://github.com/electron/update.electronjs.org)ができます。

## `electron-builder`の使用

アプリが [`electron-builder`](https://github.com/electron-userland/electron-builder) でパッケージされている場合は、[electron-updater](https://www.electron.build/auto-update) モジュールを使用できます。これはサーバを必要とせず、S3、GitHub、その他の静的ファイルホストからの更新も可能です。 これは、Electron に組み込まれているアップデートメカニズムを回避するものです。つまり、このドキュメントの残りの部分は、`electron-builder` のアップデートには適用されません。

## アップロードサーバーを配備

プライベートの Electron アプリケーションを開発している場合、または GitHub リリースにリリースを公開していない場合は、独自のアップデートサーバーを実行する必要があるかもしれません。

ニーズに応じて、次のいずれかから選択できます。

- [Hazel](https://github.com/zeit/hazel) – [今すぐ](https://zeit.co/now)に無料でデプロイできるプライベートまたはオープンソースのアプリ用にサーバーを更新します。 それは [GitHub Releases](https://help.github.com/articles/creating-releases/) から引き出され、GitHub の CDN の力を活用します。
- [Nuts](https://github.com/GitbookIO/nuts) – [GitHub Releases](https://help.github.com/articles/creating-releases/) も使用しますが、アプリの更新をディスクにキャッシュし、プライベートリポジトリをサポートします。
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – リリースを処理するためのダッシュボードを提供します。リリースを GitHub で作成する必要はありません。
- [Nucleus](https://github.com/atlassian/nucleus) – Atlassian がメンテナンスしている Electron アプリのための完全なアップデートサーバー。 複数のアプリケーションとチャンネルをサポートします。サーバーのコストを最小限に抑えるために静的ファイルストアを使用します。

## アプリケーションでの更新の実装

アップデートサーバをデプロイしたら、コードに必要なモジュールをインポートします。 次のコードはサーバソフトウェアによって異なる場合がありますが、[Hazel](https://github.com/zeit/hazel) を使用したときの説明のように機能します。

**重要:** 以下のコードは、開発中ではなく、パッケージ化されたアプリでのみ実行されるようにしてください。 [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) を使って環境をチェックすることができます。

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

次に、アップデートサーバーの URL を作成し、それについて [autoUpdater](../api/auto-updater.md) に伝えます。

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## アップデートの適用

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```
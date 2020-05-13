# アプリケーションを更新する

Electronアプリケーションを更新する方法がいくつかあります。 最も簡単で、公式にサポートされているものは、ビルトインの[Squirrel](https://github.com/Squirrel) フレームワークとElectronの [autoUpdater](../api/auto-updater.md) モジュールの利用します。

## `update.electronjs.org`の使用

Electron チームは [update.electronjs.org](https://github.com/electron/update.electronjs.org) をメンテナンスしています。これは、Electron を自己更新するためのオープンソースウェブサービスです。 このサービスは次の条件を満すElectronアプリ用に設計されています。

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
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

最後のステップとして、更新を確認します。 以下の例では、毎分確認します。

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

アプリケーションが[パッケージ化される](../tutorial/application-distribution.md)と、公開した新しい [GitHub Release](https://help.github.com/articles/creating-releases/) ごとにアップデートが届きます。

## アップデートの適用

アプリケーションの基本的な更新メカニズムを設定したので、更新があるとユーザに通知されるようにする必要があります。 これは autoUpdater API [events](../api/auto-updater.md#events) を使用して実現できます。

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. アプリケーションを再起動して更新を適用します。'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

エラーが [処理されている](../api/auto-updater.md#event-error) ことも確認してください。 これは `stderr` にログを出力するための例です。

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## Handing Updates Manually

Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The `url` field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. [Here's an example of how this could work](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

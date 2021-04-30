# アプリケーションの更新

Electron アプリケーションを更新する方法はいくつかあります。 最も簡単で、公式にサポートされているものは、組み込みの [Squirrel](https://github.com/Squirrel) フレームワークと Electron の [autoUpdater](../api/auto-updater.md) モジュールの利用です。

## `update.electronjs.org` の利用

Electron チームは [update.electronjs.org][] をメンテナンスしています。これは、Electron を自己更新するためのオープンソースウェブサービスです。 このサービスは以下の条件を満す Electron アプリ向けに設計されています。

- アプリが macOS または Windows で動作する
- アプリに GitHub の公開リポジトリがある
- ビルドを GitHub Releases で頒布している
- ビルドをコード署名している

このサービスを使う最も簡単な方法は[update-electron-app][]をインストールすることで、update.electronjs.orgをつかって、事前調整されたNode.js モジュールを使う方法です。

モジュールのインストール

```sh
npm install update-electron-app
```

アプリのメインプロセスファイルから以下のようにアップデーターを呼び出します。

```js
require('update-electron-app')()
```

このモジュールはデフォルトで、アプリ起動時に更新を確認した後、10 分ごとにも確認します。 更新があれば、バックグラウンドで自動ダウンロードします。 そのダウンロードが完了したとき、ダイアログを表示してユーザーにアプリの再起動許可を取ります。

設定をカスタマイズしたい場合、[`update-electron-app`にオプションを渡す][update-electron-app]か、または[アップデートサービスを直接使用][update.electronjs.org]ができます。

## アップロードサーバーを配備

プライベートの Electron アプリケーションを開発している場合、または GitHub リリースにリリースを公開していない場合は、独自のアップデートサーバーを実行する必要があるかもしれません。

ニーズに応じて、次のいずれかから選択できます。

- [Hazel][hazel] – [今すぐ][now]に無料でデプロイできるプライベートまたはオープンソースのアプリ用にサーバーを更新します。 それは [GitHub Releases][gh-releases] から引き出され、GitHub の CDN の力を活用します。
- [Nuts][nuts] – [GitHub Releases][gh-releases] も使用しますが、アプリの更新をディスクにキャッシュし、プライベートリポジトリをサポートします。
- [electron-release-server][electron-release-server] – リリースを処理するためのダッシュボードを提供します。リリースを GitHub で作成する必要はありません。
- [Nucleus][nucleus] – Atlassian がメンテナンスしている Electron アプリのための完全なアップデートサーバー。 複数のアプリケーションとチャンネルをサポートします。サーバーのコストを最小限に抑えるために静的ファイルストアを使用します。

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
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

エラーが [ハンドリングされている](../api/auto-updater.md#event-error) ことも確認してください。 これは `stderr` にログを出力するための例です。

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```

## 手動で更新を処理する

自動更新によって行われた要求は、あなたの直接制御下にありませんので。 処理が困難な状況(更新サーバーが認証の背後にある場合など)を見つけることができます。 `url` フィールドはファイルをサポートします。つまり、何らかの労力をかけると、プロセスのサーバー通信の側面を避けることができます。 [これがどのように機能するかの例を示します](https://github.com/electron/electron/issues/5020#issuecomment-477636990)。

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app

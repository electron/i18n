## ServiceWorkerを有効にする

> session のアクティブなサービスワーカーからのイベントを問い合わせて受信します。

プロセス: [Main](../glossary.md#main-process)

`ServiceWorkers` クラスのインスタンスは、`Session` の `serviceWorkers` プロパティを使用してアクセスします。

例:

```javascript
const { session } = require('electron')

// すべてのサービスワーカーを取得します。
console.log(session.defaultSession.serviceWorkers.getAllRunning())

// ログを処理してサービスワーカー情報を取得します
session.defaultSession.serviceWorkers.on('console-message', (event, messageDetails) => {
  console.log(
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersionID(messageDetails.versionId)
  )
})
```

### インスタンスイベント

`ServiceWorkers` のインスタンスでは、以下のイベントが利用できます。

#### Event: 'console-message'

戻り値:

* `event` Event
* `messageDetails` Object - コンソールメッセージに関する情報
  * `message` String - 実際のコンソールメッセージ
  * `versionId` Number - ログメッセージを送信したサービスワーカーのバージョン ID
  * `source` String - このメッセージのソースの種別。  `javascript`、`xml`、`network`、`console-api`、`storage`、`app-cache`、`rendering`、`security`、`deprecation`、`worker`、`violation`、`intervention`、`recommendation`、`other` のいずれかにできます。
  * `level` Number - 0 から 3 のログレベル。 順に `verbose`、`info`、`warning`、`error` に対応します。
  * `sourceUrl` String - メッセージが送られてきた URL
  * `lineNumber` Number - このコンソールメッセージのトリガーとなったソースの行番号

サービスワーカーがコンソールに何かをロギングしたときに発生します。

#### イベント: 'registration-completed'

戻り値:

* `event` Event
* `details` Object - 登録されているサービスワーカーに関する情報
  * `scope` String - サービスワーカーが登録している基底 URL

サービスワーカーが登録されてたときに発生します。 [`navigator.serviceWorker.register('/sw.js')`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) の呼び出しが成功した後や、Chrome 拡張機能が読み込まれた後に発生することがあります。

### インスタンスメソッド

`ServiceWorkers` のインスタンスでは、以下のメソッドが利用できます。

#### `serviceWorkers.getAllRunning()`

戻り値 `Record<Number, ServiceWorkerInfo>` - キーはサービスワーカーのバージョン ID、値は [ServiceWorkerInfo](structures/service-worker-info.md) オブジェクトで、そのサービスワーカーに関する情報です。

#### `serviceWorkers.getFromVersionID(versionId)`

* `versionId` Number

戻り値 [`ServiceWorkerInfo`](structures/service-worker-info.md) - このサービスワーカーについての情報

サービスワーカーが存在しないか動作していない場合、このメソッドは例外を送出します。

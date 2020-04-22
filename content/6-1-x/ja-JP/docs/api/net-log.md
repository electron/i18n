# netLog

> セッションのネットワークイベントをロギングします。

プロセス: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // いくつかのネットワークイベントのあと
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

アプリのライフサイクル全体にわたってネットワークイベントをロギングするには [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) を参照してください。

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## メソッド

### `netLog.startLogging(path)`

* `path` String - ネットワークログを記録するファイルパス。

`path` へネットワークイベントの記録を開始する。

### `netLog.stopLogging([callback])`

* `callback` Function (任意)
  * `path` String - ネットワークログが記録されたファイルパス。

ネットワークイベントの記録を停止します。 もし呼ばれなければ、ネットロギングはアプリ終了時に自動的に終了します。

**[非推奨予定](modernization/promisification.md)**

### `netLog.stopLogging()`

戻り値 `Promise<String>` - ネットワークログが記録されたファイルパスで実行されます。

ネットワークイベントの記録を停止します。 もし呼ばれなければ、ネットロギングはアプリ終了時に自動的に終了します。

## プロパティ

### `netLog.currentlyLogging`

ネットワークログが記録されていたかどうかを表す `Boolean` プロパティ。

### `netLog.currentlyLoggingPath`

現在のログファイルへのパスを返す `String` プロパティ。

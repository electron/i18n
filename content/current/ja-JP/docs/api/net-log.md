# netLog

> セッションのネットワークイベントをロギングします。

プロセス: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // ネットワークイベントがいくつかあった後
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

アプリのライフサイクル全体にわたってネットワークイベントをロギングするには [`--log-net-log`](command-line-switches.md#--log-net-logpath) を参照してください。

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## メソッド

### `netLog.startLogging(path[, options])`

* `path` String - ネットワークログを記録するファイルパス。
* `options` Object (任意)
  * `captureMode` String (任意) - キャプチャするデータの種類。 既定では、リクエストに関するメタデータのみがキャプチャされます。 これを `includeSensitive` にすると、Cookie と認証データが含まれます。 `everything` にすると、ソケットで転送されるすべてのバイトが含まれます。 `default`、`includeSensitive` または `everything` にできます。
  * `maxFileSize` Number (任意) - ログがこのサイズを超えると、ロギングは自動的に停止します。 デフォルトでは無制限です。

戻り値 `Promise<void>` - ネットログの記録が開始されると解決します。

`path` へネットワークイベントの記録を開始する。

### `netLog.stopLogging()`

戻り値 `Promise<String>` - ネットワークログが記録されたファイルパスで実行されます。

ネットワークイベントの記録を停止します。 もし呼ばれなければ、ネットロギングはアプリ終了時に自動的に終了します。

## プロパティ

### `netLog.currentlyLogging` _読み出し専用_

ネットワークログが記録されていたかどうかを表す `Boolean` プロパティ。

### `netLog.currentlyLoggingPath` _読み出し専用_ _非推奨_

現在のログファイルへのパスを返す `String` プロパティ。

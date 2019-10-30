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

アプリのライフサイクル全体にわたってネットワークイベントをロギングするには [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) を参照してください。

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## メソッド

### `netLog.startLogging(path[, options])`

* `path` String - ネットワークログを記録するファイルパス。
* `options` Object (任意) 
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

`path` へネットワークイベントの記録を開始する。

### `netLog.stopLogging()`

戻り値 `Promise<String>` - ネットワークログが記録されたファイルパスで実行されます。

ネットワークイベントの記録を停止します。 もし呼ばれなければ、ネットロギングはアプリ終了時に自動的に終了します。

## プロパティ

### `netLog.currentlyLogging` *Readonly*

ネットワークログが記録されていたかどうかを表す `Boolean` プロパティ。

### `netLog.currentlyLoggingPath` *Readonly* *Deprecated*

現在のログファイルへのパスを返す `String` プロパティ。
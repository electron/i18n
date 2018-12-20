# netLog

> Logging network events for a session.

プロセス: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  netLog.stopLogging(path => {
    console.log('Net-logs written to', path)
  })
})
```

アプリのライフサイクル全体にわたってネットワークイベントをロギングするには [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) を参照してください。

**注釈:** 指定されていないすべてのメソッドは、`app` モジュールの `ready` イベントが発生した後にのみ使用できます。

## メソッド

### `netLog.startLogging(path)`

* `path` String - ネットワークログを記録するファイルパス。

Starts recording network events to `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (任意) 
  * `path` String - ネットワークログが記録されたファイルパス。

Stops recording network events. If not called, net logging will automatically end when app quits.

## プロパティ

### `netLog.currentlyLogging`

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath`

A `String` property that returns the path to the current log file.
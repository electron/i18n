# netLog

> ネットワークイベントをロギングします。

プロセス: [Main](../glossary.md#main-process)

```javascript
const {netLog} = require('electron')
console.log('Start recording net-logs')
netLog.startLogging('/path/to/net-log')
// ネットワークイベント後
netLog.stopLogging(path => {
  console.log('Net-logs written to', path)
})
```

アプリのライフサイクル全体にわたってネットワークイベントをロギングするには [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) を参照してください。

## メソッド

### `netLog.startLogging(path)`

* `path` String - ネットワークログを記録するファイルパス。

`path` へネットワークイベントの記録を開始する。

### `netLog.stopLogging([callback])`

* `callback` Function (任意) 
  * `path` String - ネットワークログが記録されたファイルパス。

ネットワークイベントの記録を停止します。 もし呼ばれなければ、ネットロギングはアプリ終了時に自動的に終了します。

## プロパティ

### `netLog.currentlyLogging`

ネットワークログが記録されていたかどうかを表す `Boolean` プロパティ。

### `netLog.currentlyLoggingPath`

現在のログファイルへのパスを返す `String` プロパティ。
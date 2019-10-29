# contentTracing

> Collect tracing data from Chromium to find performance bottlenecks and slow operations.

プロセス: [Main](../glossary.md#main-process)

This module does not include a web interface. To view recorded traces, use [trace viewer](https://github.com/catapult-project/catapult/blob/master/tracing), available at `chrome://tracing` in Chrome.

**注:** アプリモジュールの `ready` イベントが発生するまではこのモジュールを使用してはいけません。

```javascript
const { app, contentTracing } = require('electron')

app.on('ready', () => {
  (async () => {
    await contentTracing.startRecording({
      include_categories: ['*']
    })
    console.log('Tracing started')
    await new Promise(resolve => setTimeout(resolve, 5000))
    const path = await contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  })()
})
```

## メソッド

`contentTracing` モジュールには以下のメソッドがあります。

### `contentTracing.getCategories()`

戻り値 `Promise<String[]>` - すべての子プロセスが `getCategories` リクエストを受諾したとき、そのカテゴリグループの配列で解決されます。

Get a set of category groups. The category groups can change as new code paths are reached. See also the [list of built-in tracing categories](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

戻り値 `Promise<void>` - すべての子プロセスが `startRecording` リクエストを受諾したときに解決されます。

すべてのプロセスで記録を開始します。

EnableRecordingリクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に記録が開始されます。

If a recording is already running, the promise will be immediately resolved, as only one trace operation can be in progress at a time.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Returns `Promise<String>` - resolves with a path to a file that contains the traced data once all child processes have acknowledged the `stopRecording` request

すべてのプロセスで記録を停止します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 トレースデータをIPC越しに送信するのは高負荷な操作であるため、これはトレースのランタイムオーバーヘッドを最小化するのに役立ちます。 So, to end tracing, Chromium asynchronously asks all child processes to flush any pending trace data.

Trace data will be written into `resultFilePath`. If `resultFilePath` is empty or not provided, trace data will be written to a temporary file, and the path will be returned in the promise.

### `contentTracing.getTraceBufferUsage()`

戻り値 `Promise<Object>` - トレースバッファの最大使用率の `value` と `percentage` を含むオブジェクトで実行されます。

* `value` Number
* `percentage` Number

完全な形式のパーセンテージとして、トレースバッファのプロセス間の最大使用率を取得します。
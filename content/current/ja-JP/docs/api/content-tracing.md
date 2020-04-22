# contentTracing

> Chromium からトレースデータを収集して、パフォーマンスのボトルネックや遅い操作を見つけます。

プロセス: [Main](../glossary.md#main-process)

このモジュールにはウェブインターフェイスが付属していません。 記録したトレースを見るには、[トレースビュアー](https://github.com/catapult-project/catapult/blob/master/tracing) を使用します。Chrome では `chrome://tracing` で利用できます。

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

カテゴリグループの集合を取得します。 新しいコードパスに到達したら、カテゴリグループは変更できます。 詳しくは [組み込みトレースカテゴリのリスト](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h) を参照してください。

### `contentTracing.startRecording(options)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))

戻り値 `Promise<void>` - すべての子プロセスが `startRecording` リクエストを受諾したときに解決されます。

すべてのプロセスで記録を開始します。

EnableRecordingリクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に記録が開始されます。

記録を実行中の場合、promise はすぐに解決されます。一度に一つまでしかトレース操作は処理されません。

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (任意)

戻り値 `Promise<String>` - すべての子プロセスが `stopRecording` リクエストを確認すると、トレースデータを格納したファイルへのパスで解決します

すべてのプロセスで記録を停止します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 トレースデータをIPC越しに送信するのは高負荷な操作であるため、これはトレースのランタイムオーバーヘッドを最小化するのに役立ちます。 そのため、トレースを終了するために、Chromium はすべての子プロセスに保留中のトレースデータをフラッシュするよう非同期に要求します。

トレースデータは `resultFilePath` へと書き込まれます。 `resultFilePath` が空であるか提供されていない場合、トレースデータは一時ファイルに書き込まれ、そのパスは promise で返されます。

### `contentTracing.getTraceBufferUsage()`

戻り値 `Promise<Object>` - トレースバッファの最大使用率の `value` と `percentage` を含むオブジェクトで実行されます。

* `value` Number
* `percentage` Number

完全な形式のパーセンテージとして、トレースバッファのプロセス間の最大使用率を取得します。

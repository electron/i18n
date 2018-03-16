# contentTracing

> パフォーマンスボトルネックや遅い操作を見つけるため、Chromiumのコンテンツモジュールからトレースデータを収集します。

プロセス: [Main](../glossary.md#main-process)

このモジュールにはWebインターフェースは含まれないため、結果を閲覧するために `chrome://tracing/` をChromeブラウザーで開いて、生成されたファイルをロードする必要があります。

**注:** アプリモジュールの `ready` イベントが発生するまではこのモジュールを使用してはいけません。

```javascript
const {app, contentTracing} = require('electron')

app.on('ready', () => {
  const options = {
    categoryFilter: '*',
    traceOptions: 'record-until-full,enable-sampling'
  }

  contentTracing.startRecording(options, () => {
    console.log('Tracing started')

    setTimeout(() => {
      contentTracing.stopRecording('', (path) => {
        console.log('Tracing data recorded to ' + path)
      })
    }, 5000)
  })
})
```

## メソッド

`contentTracing` モジュールには以下のメソッドがあります。

### `contentTracing.getCategories(callback)`

* `callback` Function 
  * `categories` String[]

カテゴリグループのセットを取得します。新しいコードパスに到達したら、カテゴリグループは変更できます。

一度、すべての子プロセスが `getCategories` リクエストを受諾したら、カテゴリグループの配列で `callback` が呼び出されます。

### `contentTracing.startRecording(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

すべてのプロセスで記録を開始します。

EnableRecordingリクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に記録が開始されます。 一度、すべての子プロセスが `startRecording` リクエストを受諾したら、`callback` が呼び出されます。

`categoryFilter` はどのカテゴリグループをトレースする必要があるかを制御するフィルターです。 フィルターには、一致するカテゴリを含むカテゴリグループを除外するオプションの `-` プレフィックスをつけることができます。 同一のリストに、含めるカテゴリパターンと除外するカテゴリパターンの両方を入れるのは、サポートされません。

例:

* `test_MyTest*`,
* `test_MyTest*`,
* `"-excluded_category1,-excluded_category2`

`traceOptions` は、どのトレースの種類を有効にするかを制御する、コンマ区切りのリストです。使用可能なオプションは以下の通りです。

* `record-until-full`
* `record-continuously`
* `trace-to-console`
* `enable-sampling`
* `enable-systrace`

最初の3つのオプションは、トレース記録モードであり、それ故に相互に排他的です。 `traceOptions` の文字列に1つ以上のトレース記録モードが見つかった場合、最後の1つが優先されます。 トレース記録モードが何も指定されない場合、記録モードは、`record-until-full` です。

トレースオプションは、`traceOptions` から解析されたオプションが適用されるまで、最初にデフォルトのオプション (`record_mode` は、`record-until-full` に設定、`enable_sampling` と `enable_systrace` は、`false` に設定) にリセットされます。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### `contentTracing.startMonitoring(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### `contentTracing.stopMonitoring(callback)`

* `callback` Function

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.
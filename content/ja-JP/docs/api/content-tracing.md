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

トレースオプションは、`traceOptions` から解析されたオプションが適用されるまで、最初にデフォルトのオプション (`record_mode` は、`record-until-full` に設定され、`enable_sampling` と `enable_systrace` は、`false` に設定されます) にリセットされます。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

すべてのプロセスで記録を停止します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 トレースデータをIPC越しに送信するのは高負荷な操作であるため、これはトレースのランタイムオーバーヘッドを最小化するのに役立ちます。 そのため、トレースを終了するには、すべての子プロセスに保留中のトレースデータを書き出すように非同期で指示しなければなりません。

一度、すべての子プロセスが `startRecording` リクエストを受諾したら、トレースデータを含むファイルと一緒に `callback` が呼び出されます。

空でない場合は `resultFilePath`、そうでない場合、一時ファイルにトレースデータは書き込まれます。実際のファイルパスは `null` でない場合、`callback` に渡されます。

### `contentTracing.startMonitoring(options, callback)`

* `options` Object 
  * `categoryFilter` String
  * `traceOptions` String
* `callback` Function

すべてのプロセスで監視を開始します。

`startMonitoring` リクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に監視が開始されます。

一度、すべての子プロセスが `startMonitoring` リクエストを受諾したら、`callback` が呼び出されます。

### `contentTracing.stopMonitoring(callback)`

* `callback` Function

すべてのプロセスで監視を停止します。

一度、すべての子プロセスが `stopMonitoring` リクエストを受諾したら、`callback` が呼び出されます。

### `contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function 
  * `resultFilePath` String

現在、監視しているトレースデータを取得します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 これは、IPC越しにトレースデータを送信するのは高負荷な操作になりうることとトレースによる不必要なランタイムオーバーヘッドを回避したいことによります。 そのため、トレースを終了するには、すべての子プロセスに保留中のトレースデータを書き出すように非同期で指示しなければなりません。

一度、すべての子プロセスが `captureMonitoringSnapshot` リクエストを受諾したら、トレースデータを含むファイルと一緒に `callback` が呼び出されます。

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function 
  * `value` Number
  * `percentage` Number

完全な形式のパーセンテージとして、トレースバッファーのプロセス間の最大使用率を取得します。TraceBufferUsageの値が確定したとき、`callback` が呼び出されます。
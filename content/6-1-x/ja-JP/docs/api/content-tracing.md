# contentTracing

> パフォーマンスボトルネックや遅い操作を見つけるため、Chromiumのコンテンツモジュールからトレースデータを収集します。

プロセス: [Main](../glossary.md#main-process)

このモジュールにはWebインターフェースは含まれないため、結果を閲覧するために `chrome://tracing/` をChromeブラウザーで開いて、生成されたファイルをロードする必要があります。

**注:** アプリモジュールの `ready` イベントが発生するまではこのモジュールを使用してはいけません。

```javascript
const { app, contentTracing } = require('electron')

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

カテゴリグループの集合を取得します。 カテゴリグループは、新しいコードパスに達すると変更できます。

一度、すべての子プロセスが `getCategories` リクエストを受諾したら、カテゴリグループの配列で `callback` が呼び出されます。

**[非推奨予定](modernization/promisification.md)**

### `contentTracing.getCategories()`

戻り値 `Promise<String[]>` - すべての子プロセスが `getCategories` リクエストを受諾したとき、そのカテゴリグループの配列で解決されます。

カテゴリグループの集合を取得します。 カテゴリグループは、新しいコードパスに達すると変更できます。


### `contentTracing.startRecording(options, callback)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))
* `callback` Function

すべてのプロセスで記録を開始します。

EnableRecordingリクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に記録が開始されます。 一度、すべての子プロセスが `startRecording` リクエストを受諾したら、`callback` が呼び出されます。

**[非推奨予定](modernization/promisification.md)**

### `contentTracing.startRecording(options)`

* `options` ([TraceCategoriesAndOptions](structures/trace-categories-and-options.md) | [TraceConfig](structures/trace-config.md))

戻り値 `Promise<void>` - すべての子プロセスが `startRecording` リクエストを受諾したときに解決されます。

すべてのプロセスで記録を開始します。

EnableRecordingリクエストを受信するとすぐにローカルでは即時、子プロセスでは非同期的に記録が開始されます。

### `contentTracing.stopRecording(resultFilePath, callback)`

* `resultFilePath` String
* `callback` Function
  * `resultFilePath` String

すべてのプロセスで記録を停止します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 トレースデータをIPC越しに送信するのは高負荷な操作であるため、これはトレースのランタイムオーバーヘッドを最小化するのに役立ちます。 そのため、トレースを終了するには、すべての子プロセスに保留中のトレースデータを書き出すように非同期で指示しなければなりません。

一度、すべての子プロセスが `startRecording` リクエストを受諾したら、トレースデータを含むファイルと一緒に `callback` が呼び出されます。

トレースデータは空でない `resultFilePath` もしくは一時ファイルへと書き込まれます。 これが `null` でない場合、実際のファイルパスは `callback` に渡されます。

**[非推奨予定](modernization/promisification.md)**

### `contentTracing.stopRecording(resultFilePath)`

* `resultFilePath` String

戻り値 `Promise<String>` - すべての子プロセスが `stopRecording` リクエストを受諾したとき、そのトレースデータを含むファイルで解決されます。

すべてのプロセスで記録を停止します。

子プロセスは、大抵、トレースデータをキャッシュし、滅多に書き出さず、メインプロセスにトレースデータを送り返すだけです。 トレースデータをIPC越しに送信するのは高負荷な操作であるため、これはトレースのランタイムオーバーヘッドを最小化するのに役立ちます。 そのため、トレースを終了するには、すべての子プロセスに保留中のトレースデータを書き出すように非同期で指示しなければなりません。

トレースデータは空でない `resultFilePath` もしくは一時ファイルへと書き込まれます。

### `contentTracing.getTraceBufferUsage(callback)`

* `callback` Function
  * Object
    * `value` Number
    * `percentage` Number

完全な形式のパーセンテージとして、トレースバッファのプロセス間の最大使用率を取得します。 TraceBufferUsage の値が決定されると、 `callback` が呼ばれます。

**[非推奨予定](modernization/promisification.md)**

### `contentTracing.getTraceBufferUsage()`

戻り値 `Promise<Object>` - トレースバッファの最大使用率の `value` と `percentage` を含むオブジェクトで実行されます。

完全な形式のパーセンテージとして、トレースバッファのプロセス間の最大使用率を取得します。

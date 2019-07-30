# プロセス

> プロセスオブジェクトの拡張。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron の `process` オブジェクトは、[Node.js `process` object](https://nodejs.org/api/process.html) から拡張されています。 以下のイベント、プロパティ、メソッドが追加されます。

## サンドボックス

サンドボックス化されたレンダラーでは、`process` オブジェクトは以下の API の部分のみを含んでいます。

* `crash()`
* `hang()`
* `getCreationTime()`
* `getHeapStatistics()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getSystemVersion()`
* `getCPUUsage()`
* `getIOCounters()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`

## イベント

### イベント: 'loaded'

Electron が内部初期化スクリプトをロードし、ウェブページまたはメインスクリプトのロードを開始したときに発生します。

Node integration がオフになっているときに、削除された Node のグローバルシンボルをグローバルスコープに追加するために、プリロードスクリプトによって使用できます。

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## プロパティ

### `process.defaultApp`

`Boolean`。デフォルトアプリに、引数として渡されてアプリが起動されると、このプロパティはメインプロセス内で `true` になります。それ以外では `undefined` です。

### `process.isMainFrame`

`Boolean` で、現在のレンダラコンテキストが「メイン」レンダラフレームである場合は `true` です。現在のフレームの ID が欲しいならば、`webFrame.routingId` を使うべきです。

### `process.mas`

`Boolean`。Mac App Store ビルドの場合、このプロパティは `true`、他のビルドでは `undefined` です。

### `process.noAsar`

アプリケーション内の ASAR サポートを制御する `Boolean`。これを `true` に設定すると、Node の組み込みモジュールの `asar` アーカイブのサポートが無効になります。

### `process.noDeprecation`

非推奨の警告が `stderr` へ出力されるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨の警告が無効になります。 `--no-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.enablePromiseAPIs`

非推奨の警告を `stderr` に出力するかどうかを制御する `Boolean`。 Promise に変換された以前のコールバックベースの API は、コールバックを使用して呼び出されます。 Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath`

リソースディレクトリのパスを表す `String`。

### `process.sandboxed`

`Boolean`。レンダラープロセスがサンドボックス化されている場合、このプロパティは `true` です。それ以外の場合は `undefined` です。

### `process.throwDeprecation`

非推奨の警告が例外としてスローされるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のエラーがスローされます。 `--throw-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceDeprecation`

`stderr` に出力される非推奨にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のスタックトレースが出力されます。 `--trace-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceProcessWarnings`

`stderr` に出力されるプロセスの警告にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定するとプロセスの (非推奨を含む) 警告のスタックトレースが出力されます。 `--trace-warnings` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.type`

現在のプロセスの種類を表す `String` で、 `"browser"` (すなわちメインプロセス)、`"renderer"` または `"worker"` (すなわち web worker) の値をとります。

### `process.versions.chrome`

Chrome のバージョン文字列を表す `String`。

### `process.versions.electron`

Electron のバージョン文字列を表す `String`。

### `process.windowsStore`

`Boolean`。アプリが Windows Store アプリ (appx) として実行されている場合、このプロパティは `true` です。それ以外の場合は `undefined` です。

## メソッド

`process` オブジェクトには以下のメソッドがあります。

### `process.crash()`

現在のプロセスのメインスレッドでクラッシュを発生させます。

### `process.getCreationTime()`

`Number | null`を返します。 - 発生からのミリ秒数、もし情報がない場合は`null`を返します。

アプリケーションの作成時を示します。 発生からのミリ秒数を表します。プロセス作成時間が有効でない場合はnullを返します。

### `process.getCPUUsage()`

戻り値 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

戻り値 [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

戻り値 `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

V8 ヒープ統計のオブジェクトを返します。統計はすべてキロバイト単位で報告されることに注意してください。

### `process.getProcessMemoryInfo()`

Returns `Promise<ProcessMemoryInfo>` - Resolves with a [ProcessMemoryInfo](structures/process-memory-info.md)

現在のプロセスに関するメモリ使用統計を返すオブジェクトを返します。すべての統計情報はキロバイト単位で報告されることに注意してください。この API は app の ready の後に呼び出さなければなりません。

Chromium は macOS には `residentSet` の値を提供しません。 This is because macOS performs in-memory compression of pages that haven't been recently used. 結果として、residentSet の値は期待されるものではありません。 `private` メモリは、macOS でのプロセスの実際の圧縮前のメモリ使用量をよりよく表しています。

### `process.getSystemMemoryInfo()`

戻り値 `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

システム全体に関するメモリ使用統計を返すオブジェクトを返します。すべての統計情報はキロバイト単位で報告されることに注意してください。

### `process.getSystemVersion()`

Returns `String` - The version of the host operating system.

例:

| Platform | バージョン               |
| -------- | ------------------- |
| macOS    | `10.13.6`           |
| Windows  | `10.0.17763`        |
| Linux    | `4.15.0-45-generic` |

**Note:** It returns the actual operating system version instead of kernel version on macOS unlike `os.release()`.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - 出力ファイルのパス

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

V8ヒープを取得して、`filePath`にそれを保存します。

### `process.hang()`

Causes the main thread of the current process hang.

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.
# プロセス

> プロセスオブジェクトの拡張。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron の `process` オブジェクトは、[Node.js `process` object](https://nodejs.org/api/process.html) から拡張されています。 以下のイベント、プロパティ、メソッドが追加されます。

## サンドボックス

サンドボックス化されたレンダラーでは、`process` オブジェクトは以下の API の部分のみを含んでいます。

* `crash()`
* `hang()`
* `getHeapStatistics()`
* `getSystemMemoryInfo()`
* `getCPUUsage()`
* `getIOCounters()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `resourcesPath`
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

### `process.mas`

`Boolean`。Mac App Store ビルドの場合、このプロパティは `true`、他のビルドでは `undefined` です。

### `process.noAsar`

アプリケーション内の ASAR サポートを制御する `Boolean`。これを `true` に設定すると、Node の組み込みモジュールの `asar` アーカイブのサポートが無効になります。

### `process.noDeprecation`

非推奨の警告が `stderr` へ出力されるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨の警告が無効になります。 `--no-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.resourcesPath`

リソースディレクトリのパスを表す `String`。

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

非推奨の警告が例外としてスローされるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のエラーがスローされます。 `--throw-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceDeprecation`

`stderr` に出力される非推奨にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のスタックトレースが出力されます。 `--trace-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceProcessWarnings`

`stderr` に出力されるプロセスの警告にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定するとプロセスの (非推奨を含む) 警告のスタックトレースが出力されます。 `--trace-warnings` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.type`

現在のプロセスのタイプを表す `String`。`"browser"` (即ちメインプロセス) または ` "renderer"` になります。

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

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

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

### `process.getSystemMemoryInfo()`

戻り値 `Object`:

* `total` Integer - システムで利用可能な物理メモリの合計量 (キロバイト)。
* `free` Integer - アプリケーションまたはディスクキャッシュで使用されていないメモリの合計量。
* `swapTotal` Integer *Windows* *Linux* - システムが使用できるスワップメモリの合計量 (キロバイト)。
* `swapFree` Integer *Windows* *Linux* - システムが使用できるスワップメモリの空き容量 (キロバイト)。

システム全体に関するメモリ使用統計を返すオブジェクトを返します。すべての統計情報はキロバイト単位で報告されることに注意してください。

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

現在のプロセスのメインスレッドでハングを発生させます。

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

ファイルディスクリプタのソフトリミットを、`maxDescriptors` または OS のハードリミットの、いずれか低い方に設定します。
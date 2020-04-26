# process

> process オブジェクトの拡張です。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

Electron の `process` オブジェクトは、[Node.js `process` object](https://nodejs.org/api/process.html) から拡張されています。 以下のイベント、プロパティ、メソッドが追加されます。

## サンドボックス

サンドボックス化されたレンダラーでは、`process` オブジェクトには以下に示す一部の API のみが含まれます。
- `crash()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `getIOCounters()`
- `argv`
- `execPath`
- `env`
- `pid`
- `arch`
- `platform`
- `sandboxed`
- `type`
- `version`
- `versions`
- `mas`
- `windowsStore`

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

`Boolean`。 デフォルトアプリに、引数として渡されてアプリが起動されると、このプロパティはメインプロセス内で `true` になります。それ以外では `undefined` です。

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

`Boolean`。 For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

非推奨の警告が `stderr` へ出力されるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨の警告が無効になります。 `--no-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.enablePromiseAPIs`

非推奨の警告を `stderr` に出力するかどうかを制御する `Boolean`。 Promise に変換された以前のコールバックベースの API は、コールバックを使用して呼び出されます。 これを `true` に設定すると非推奨警告が有効になります。

### `process.resourcesPath`

リソースディレクトリのパスを表す `String`。

### `process.sandboxed`

`Boolean`。 When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

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

`Boolean`。 If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## メソッド

`process` オブジェクトには以下のメソッドがあります。

### `process.crash()`

現在のプロセスのメインスレッドでクラッシュを発生させます。

### `process.getCreationTime()`

戻り値 `Number | null` - 発生からのミリ秒数です。情報が利用できない場合は `null` を返します。

Indicates the creation time of the application. 時間はエポックからのミリ秒数として表されます。 It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

戻り値 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux_

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

Returns an object with V8 heap statistics. すべての統計情報はキロバイト単位で返ってくることに注意してください。

### `process.getProcessMemoryInfo()`

戻り値 `Promise<ProcessMemoryInfo>` - [ProcessMemoryInfo](structures/process-memory-info.md) で実行されます

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium は macOS には `residentSet` の値を提供しません。 これは直近の使用されていないページを macOS がメモリ内で圧縮するためです。 結果として、residentSet の値は期待されるものではありません。 `private` メモリは、macOS でのプロセスの実際の圧縮前のメモリ使用量をよりよく表しています。

### `process.getSystemMemoryInfo()`

戻り値 `Object`:

* `total` Integer - システムで利用可能な物理メモリの合計量 (キロバイト)。
* `free` Integer - アプリケーションまたはディスクキャッシュで使用されていないメモリの合計量。
* `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.getSystemVersion()`

戻り値 `String` - ホストのオペレーティングシステムのバージョン。

例:

| プラットフォーム | バージョン               |
| -------- | ------------------- |
| macOS    | `10.13.6`           |
| Windows  | `10.0.17763`        |
| Linux    | `4.15.0-45-generic` |

**注釈:** `os.release()` とは異なり、macOS ではカーネルバージョンではなく実際のオペレーティングシステムのバージョンを返します。

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - 出力ファイルのパス

戻り値 `Boolean` - スナップショットの作成が成功したかどうかを示します。

V8ヒープを取得して、`filePath`にそれを保存します。

### `process.hang()`

現在のプロセスのメインスレッドでハングを発生させます。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

ファイルディスクリプタのソフトリミットを、`maxDescriptors` または OS のハードリミットの、いずれか低い方に設定します。

# プロセス

> プロセスオブジェクトの拡張。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron の `process` オブジェクトは、[Node.js `process` object](https://nodejs.org/api/process.html) から拡張されています。 以下のイベント、プロパティ、メソッドが追加されます。

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

### `process.getCPUUsage()`

戻り値 [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

戻り値 [`IOCounters`](structures/io-counters.md)

### `process.getProcessMemoryInfo()`

戻り値 `Object`:

* `workingSetSize` Integer - 現在、実際の物理 RAM に確保されているメモリ量。
* `peakWorkingSetSize` Integer - 実際の物理 RAM に確保されたことのある最大メモリ量。
* `privateBytes` Integer - JS ヒープや HTML コンテンツなど、他のプロセスと共有されないメモリ量。
* `sharedBytes` Integer - プロセス間で共有されるメモリ量で、通常は、 Electron のコード自体が使っているメモリ量。

現在のプロセスに関するメモリ使用統計を返すオブジェクトを返します。すべての統計情報はキロバイト単位で報告されることに注意してください。

### `process.getSystemMemoryInfo()`

戻り値 `Object`:

* `total` Integer - システムで利用可能な物理メモリの合計量 (キロバイト)。
* `free` Integer - アプリケーションまたはディスクキャッシュで使用されていないメモリの合計量。
* `swapTotal` Integer *Windows* *Linux* - システムが使用できるスワップメモリの合計量 (キロバイト)。
* `swapFree` Integer *Windows* *Linux* - システムが使用できるスワップメモリの空き容量 (キロバイト)。

システム全体に関するメモリ使用統計を返すオブジェクトを返します。すべての統計情報はキロバイト単位で報告されることに注意してください。

### `process.hang()`

現在のプロセスのメインスレッドでハングを発生させます。

### `process.setFdLimit(maxDescriptors)` *macOS* *Linux*

* `maxDescriptors` Integer

ファイルディスクリプタのソフトリミットを、`maxDescriptors` または OS のハードリミットの、いずれか低い方に設定します。
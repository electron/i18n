# process

> process オブジェクトの拡張です。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron の `process` オブジェクトは、[Node.js `process` object](https://nodejs.org/api/process.html) から拡張されています。 以下のイベント、プロパティ、メソッドが追加されます。

## サンドボックス

サンドボックス化されたレンダラーでは、`process` オブジェクトには以下に示す一部の API のみが含まれます。

* `crash()`
* `hang()`
* `getCreationTime()`
* `getHeapStatistics()`
* `getBlinkMemoryInfo()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getSystemVersion()`
* `getCPUUsage()`
* `getIOCounters()`
* `uptime()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed`
* `contextIsolated`
* `type`
* `version`
* `versions`
* `mas`
* `windowsStore`
* `contextId`

## イベント

### イベント: 'loaded'

Electron が内部初期化スクリプトをロードし、ウェブページまたはメインスクリプトのロードを開始したときに発生します。

## プロパティ

### `process.defaultApp` _読み出し専用_

`Boolean`。 デフォルトアプリに、引数として渡されてアプリが起動されると、このプロパティはメインプロセス内で `true` になります。それ以外では `undefined` です。

### `process.isMainFrame` _読み出し専用_

`Boolean`で、現在のレンダラーコンテキストが"main"レンダラー フレームの場合`true`。 現在のフレームの ID が必要な場合、`webFrame.routingId` を使用すべきです。

### `process.mas` _読み出し専用_

`Boolean`。 Mac App Store ビルドの場合、このプロパティは `true`、他のビルドでは `undefined` です。

### `process.noAsar`

アプリケーション内の ASAR サポートを制御する `Boolean` 。 これを`true`に設定した場合、Nodeのビルトインモジュールの`asar`アーカイブのサポートが無効になります。

### `process.noDeprecation`

非推奨の警告が `stderr` へ出力されるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨の警告が無効になります。 `--no-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.resourcesPath` _読み出し専用_

リソースディレクトリのパスを表す `String`。

### `process.sandboxed` _読み出し専用_

`Boolean`。 レンダラープロセスがサンドボックス化されている場合、このプロパティは `true` です。それ以外の場合は `undefined` です。

### `process.contextIsolated` _読み出し専用_

`Boolean` 型で、現在のレンダラーコンテキストで `contextIsolation` が有効かどうかを示します。 これはメインプロセスでは `undefined` です。

### `process.throwDeprecation`

非推奨の警告が例外としてスローされるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のエラーがスローされます。 `--throw-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceDeprecation`

`stderr` に出力される非推奨にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定すると非推奨のスタックトレースが出力されます。 `--trace-deprecation` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.traceProcessWarnings`

`stderr` に出力されるプロセスの警告にスタックトレースを含めるかどうかを制御する `Boolean`。 これを `true` に設定するとプロセスの (非推奨を含む) 警告のスタックトレースが出力されます。 `--trace-warnings` コマンドラインフラグの代わりにこのプロパティを使用します。

### `process.type` _読み出し専用_

現在のプロセスの種別を表す以下の `String` のいずれかになります。

* `browser` - メインプロセス
* `renderer` - レンダラープロセス
* `worker` - ウェブワーカー

### `process.versions.chrome` _読み出し専用_

Chrome のバージョン文字列を表す `String`。

### `process.versions.electron` _読み出し専用_

Electron のバージョン文字列を表す `String`。

### `process.windowsStore` _読み出し専用_

`Boolean`。 アプリが Windows Store アプリ (appx) として実行されている場合、このプロパティは `true` です。それ以外の場合は `undefined` です。

### `process.contextId` _読み出し専用_

`String` 型 (任意) で、現在の JavaScript コンテキストにおけるグローバルな一意の ID を表します。 各フレームにはそれぞれ JavaScript コンテキストがあります。 contextIsolation が有効な場合、隔離ワールドにも個別の JavaScript コンテキストがあります。 このプロパティはレンダラープロセスでのみ利用可能です。

## メソッド

`process` オブジェクトには以下のメソッドがあります。

### `process.crash()`

現在のプロセスのメインスレッドでクラッシュを発生させます。

### `process.getCreationTime()`

戻り値 `Number | null` - 発生からのミリ秒数です。情報が利用できない場合は `null` を返します。

アプリケーションの作成時間を示します。 時間はエポックからのミリ秒数として表されます。 プロセスの作成時間を取得できない場合は null を返します。

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

V8ヒープの統計を持つオブジェクトを返します。 すべての統計情報はキロバイト単位で返ってくることに注意してください。

### `process.getBlinkMemoryInfo()`

戻り値 `Object`:

* `allocated` Integer - キロバイト単位でのすべての確保されたオブジェクトのサイズ。
* `marked` Integer - キロバイト単位でのマークされたすべてのオブジェクトのサイズ。
* `total` Integer - キロバイト単位での確保された空間の合計。

Blink のメモリ情報を持つオブジェクトを返します。 レンダリング/DOM 関連のメモリ問題のデバッグに役立ちます。 すべての数値はキロバイト単位で返ってくることに注意してください。

### `process.getProcessMemoryInfo()`

戻り値 `Promise<ProcessMemoryInfo>` - [ProcessMemoryInfo](structures/process-memory-info.md) で実行されます

現在のプロセスについてのメモリ使用量の統計情報を与えるオブジェクトを返します。 すべての統計情報はキロバイト単位で返ってくることに注意してください。 このAPIはアプリの準備ができた後に呼び出されるべきです。

Chromium は macOS には `residentSet` の値を提供しません。 これは直近の使用されていないページを macOS がメモリ内で圧縮するためです。 結果として、residentSet の値は期待されるものではありません。 `private` メモリは、macOS でのプロセスの実際の圧縮前のメモリ使用量をよりよく表しています。

### `process.getSystemMemoryInfo()`

戻り値 `Object`:

* `total` Integer - システムで利用可能な物理メモリの合計量 (キロバイト)。
* `free` Integer - アプリケーションまたはディスクキャッシュで使用されていないメモリの合計量。
* `swapTotal` Integer _Windows_ _Linux_ - システムが使用できるスワップメモリの合計量 (キロバイト) 。
* `swapFree` Integer _Windows_ _Linux_ - システムが使用できるスワップメモリの空き容量 (キロバイト)。

システム全体についてのメモリ使用量の統計情報を与えるオブジェクトを返します。 すべての統計情報はキロバイト単位で返ってくることに注意してください。

### `process.getSystemVersion()`

戻り値 `String` - ホストのオペレーティングシステムのバージョン。

サンプル:

```js
const version = process.getSystemVersion()
console.log(version)
// macOS -> '10.13.6'
// Windows -> '10.0.17763'
// Linux -> '4.15.0-45-generic'
```

**注釈:** `os.release()` とは異なり、macOS ではカーネルバージョンではなく実際のオペレーティングシステムのバージョンを返します。

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - 出力ファイルのパス

戻り値 `Boolean` - スナップショットの作成が成功したかどうかを示します。

V8 ヒープのスナップショットを撮り、それを `filePath` に保存します。

### `process.hang()`

現在のプロセスのメインスレッドでハングを発生させます。

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Integer

ファイルディスクリプタのソフトリミットを、`maxDescriptors` または OS のハードリミットの、いずれか低い方に設定します。

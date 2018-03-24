# powerSaveBlocker

> システムが省電力 (スリープ) モードに入るのを防ぎます。

プロセス: [Main](../glossary.md#main-process)

例:

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## メソッド

`powerSaveBlocker` モジュールには以下のメソッドがあります。

### `powerSaveBlocker.start(type)`

* `type` String - powerSaveBlocker のタイプ。 
  * `prevent-app-suspension` - アプリケーションが中断されるのを防ぎます。システムをアクティブに保ちますが、画面はオフにすることができます。使用例: ファイルのダウンロードや音声の再生。
  * `prevent-display-sleep` - ディスプレイがスリープされるのを防ぎます。システムとスクリーンをアクティブに保ちます。使用例: 映像の再生。

戻り値 `Integer` - この powerSaveBlocker に割り当てられたブロッカー ID

システムが省電力モードに入るのを防止します。その powerSaveBlocker を識別する整数を返します。

**注釈:** `prevent-display-sleep` は `prevent-app-suspension` よりも高い優先順位を持ちます。 最も高い優先順位のタイプのみが有効になります。 つまり、`prevent-display-sleep` は `prevent-app-suspension` よりも常に優先されます。

たとえば、A が呼び出した API は `prevent-app-suspension` を要求し、もう1つの B の呼び出しは `prevent-display-sleep` を要求したとします。 `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.
# powerSaveBlocker

> システムが省電力 (スリープ) モードに入るのを防ぎます。

プロセス: [Main](../glossary.md#main-process)

例:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## メソッド

`powerSaveBlocker` モジュールには以下のメソッドがあります。

### `powerSaveBlocker.start(type)`

* `type` String - パワーセーブブロッカーの種類。
  * `prevent-app-suspension` - アプリケーションが休止状態に入るのを防ぎます。 システムをアクティブに保ちますが、スクリーンは電源をオフにできます。 使用例: ファイルのダウンロードや音楽の再生。
  * `prevent-display-sleep` - ディスプレイがスリープ状態に入るのを防ぎます。 システムとスクリーンをアクティブに保ちます。 使用例: ビデオの再生。

戻り値 `Integer` - この powerSaveBlocker に割り当てられたブロッカー ID.

システムが低電力モードに入るのを防ぎます。 パワーセーブブロッカーを識別する整数を返します。

**注釈:** `prevent-display-sleep` は `prevent-app-suspension` よりも高い優先順位を持ちます。 最も高い優先順位のタイプのみが有効になります。 つまり、`prevent-display-sleep` は `prevent-app-suspension` よりも常に優先されます。

たとえば、A が呼び出した API は `prevent-app-suspension` を要求し、もう1つの B の呼び出しは `prevent-display-sleep` を要求したとします。 B が要求を停止するまで、`prevent-display-sleep` が使用されます。 その後、`prevent-app-suspension` が使用されます。

### `powerSaveBlocker.stop(id)`

* `id` Integer - `powerSaveBlocker.start` で返された powerSaveBlocker の ID。

指定した powerSaveBlocker を停止します。

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - `powerSaveBlocker.start` で返された powerSaveBlocker の ID。

戻り値 `Boolean` - 対応する `powerSaveBlocker` が開始されているかどうか。

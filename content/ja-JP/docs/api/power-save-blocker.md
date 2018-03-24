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
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.
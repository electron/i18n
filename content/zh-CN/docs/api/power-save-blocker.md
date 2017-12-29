# 省电拦截器 | powerSaveBlocker

> 阻止系统进入低功耗 (休眠) 模式。

线程：[主线程](../glossary.md#main-process)

例如：

```javascript
const {powerSaveBlocker} = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## 方法

` powerSaveBlocker ` 模块具有以下方法:

### `powerSaveBlocker.start(type)`

* `type` String 拦截器类型 
  * ` prevent-app-suspension `-防止应用程序被挂起。保持系统处于活动状态, 但允许关闭屏幕。 示例用例: 下载文件或播放音频。
  * ` prevent-display-sleep `-防止显示器进入休眠状态。保持系统和屏幕处于活动状态。 示例用例: 播放视频。

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
# 省电拦截器 | powerSaveBlocker

> 阻止系统进入低功耗 (休眠) 模式。

进程：[主进程](../glossary.md#main-process)

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
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns ` Integer `-指派给此电源拦截器的 id.

开始阻止系统进入低功耗模式。返回一个整数的拦截器标识（identifying）

** 注意: **`prevent-display-sleep ` 比 ` prevent-app-suspension ` 具有更高的优先级。 只有最高优先类型才能生效。 换言之, ` prevent-display-sleep ` 始终优先于 ` prevent-app-suspension `。

例如, 一个 API 调用 ` prevent-app-suspension ` 请求A, 另一个调用 ` prevent-display-sleep ` 请求B。 ` prevent-display-sleep ` 一直生效，直到 B 停止请求， 之后，`prevent-app-suspension`才生效。

### `powerSaveBlocker.stop(id)`

* ` id ` Integer 由`powerSaveBlocker.start` 返回的拦截器 id。

停止指定的省电拦截器。

### `powerSaveBlocker.isStarted(id)`

* ` id ` Integer 由`powerSaveBlocker.start ` 返回的拦截器 id。

Returns ` Boolean `指定的` powerSaveBlocker `是否已启动。
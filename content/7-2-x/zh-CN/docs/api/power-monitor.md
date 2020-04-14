# 电源监视器

> 监视电源状态的改变。

进程：[主进程](../glossary.md#main-process)


This module cannot be used until the `ready` event of the `app` module is emitted.

例如：

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## 事件

` powerMonitor ` 模块触发以下事件:

### Event: 'suspend'

在系统挂起时触发。

### Event: 'resume'

在系统恢复时触发。

### Event: 'on-ac' _Windows_

当系统变为交流电源时触发。

### Event: 'on-battery' _Windows_

当系统更改为电池电量时触发。

### Event: 'shutdown' _Linux_ _macOS_

当系统即将重启或关机时出发 如果事件调用`e.preventDefault()`, Electron 将会尝试延迟系统关机，以便 app 完全退出。 如果`e.preventDefault()`被调用，在调用类似 `app.quit()` 后，app 会很快地退出。

### Event: 'lock-screen' _macOS_ _Windows_

当系统即将锁定屏幕时触发。

### Event: 'unlock-screen' _macOS_ _Windows_

当系统屏幕解锁，立即触发。

## 方法

`电源监视器` 模块具有以下方法：

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

计算系统空闲状态。 `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

计算系统空闲时间以秒为单位。

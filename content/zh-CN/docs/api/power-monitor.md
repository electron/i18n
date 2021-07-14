# powerMonitor

> 监视电源状态的改变。

进程：[主进程](../glossary.md#main-process)

## 事件

` powerMonitor ` 模块触发以下事件:

### Event: 'suspend' _macOS_ _Windows_

在系统挂起时触发。

### Event: 'resume' _macOS_ _Windows_

在系统恢复时触发。

### Event: 'on-ac' _macOS_ _Windows_

当系统变为交流电源时触发。

### Event: 'on-battery' _macOS_  _Windows_

当系统更改为电池电量时触发。

### Event: 'shutdown' _Linux_ _macOS_

当系统即将重启或关机时触发。 如果事件调用`e.preventDefault()`, Electron 将会尝试延迟系统关机，以便 app 完全退出。 如果`e.preventDefault()`被调用，在调用类似 `app.quit()` 后，app 会很快地退出。

### Event: 'lock-screen' _macOS_ _Windows_

当系统即将锁定屏幕时触发。

### Event: 'unlock-screen' _macOS_ _Windows_

当系统屏幕解锁，立即触发。

### 事件: 'user-did-groupe-active' _macOS_

当应用被激活时发出。 更多信息请访问 [文档](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc)。

### 事件: 'user-did-resign-active' _macOS_

当应用被激活时发出。 更多信息请访问 [文档](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc)。

## 方法

`电源监视器` 模块具有以下方法：

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. 可以被设置为`active`，`idle`，`locked`或者`unknown`

计算系统空闲状态。 `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

计算系统空闲时间以秒为单位。

### `powerMonitor.isOnBatteryPower()`

返回`Boolean`，表示系统是否使用电池电源。

要监视此属性的变化，请使用 `on-battery` 和 `on-ac<` 事件。

## 属性

### `powerMonitor.onBatteryPower`

A `Boolean` property. 如果系统处于电池电源状态，则为 true。

参见 [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower)。

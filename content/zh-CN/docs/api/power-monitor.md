# 电源监视器

> 监视电源状态的改变。

进程：[主进程](../glossary.md#main-process)

在 ` app ` 模块发出 ` ready ` 事件之前, 您不能引用或者使用此模块。

例如：

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
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

### Event: 'on-ac' *Windows*

当系统变为交流电源时触发。

### Event: 'on-battery' *Windows*

当系统更改为电池电量时触发。

### Event: 'shutdown' *Linux* *macOS*

当系统即将重启或关机时出发 如果事件调用`e.preventDefault()`, Electron 将会尝试延迟系统关机，以便 app 完全退出。 如果`e.preventDefault()`被调用，在调用类似 `app.quit()` 后，app 会很快地退出。
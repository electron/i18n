# powerMonitor

> 監視電源狀態變更。

處理序: [主處理序](../glossary.md#main-process)

在 ` app ` 模組的 ` ready` 事件發出之前, 您不能要求或使用此模組。

例如:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('系統即將休眠')
  })
})
```

## 事件

` powerMonitor ` 模組發出以下事件:

### 事件: 'suspend'

Emitted when the system is suspending.

### 事件: 'resume'

在系統復原時發出。

### 事件: 'on-ac' *Windows*

Emitted when the system changes to AC power.

### 事件: 'on-battery' *Windows*

Emitted when system changes to battery power.
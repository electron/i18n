# powerMonitor

> 監視電源狀態變更。

處理序: [主處理序](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

For example:

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

The `powerMonitor` module emits the following events:

### 事件: 'suspend'

Emitted when the system is suspending.

### 事件: 'resume'

Emitted when system is resuming.

### 事件: 'on-ac' *Windows*

Emitted when the system changes to AC power.

### 事件: 'on-battery' *Windows*

Emitted when system changes to battery power.
# powerMonitor

> Monitor power state changes.

线程：[主线程](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

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

The `powerMonitor` module emits the following events:

### Event: 'suspend'

Emitted when the system is suspending.

### Event: 'resume'

Emitted when system is resuming.

### Event: 'on-ac' *Windows*

Emitted when the system changes to AC power.

### Event: 'on-battery' *Windows*

Emitted when system changes to battery power.
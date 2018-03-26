# powerMonitor

> 電源の状態の変化をモニターします。

プロセス: [Main](../glossary.md#main-process)

`app` モジュールの `ready` イベントが発生するまでは、このモジュールを require、または使用できません。

例:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## イベント

`powerMonitor` モジュールでは以下のイベントが発生します。

### イベント: 'suspend'

システムがサスペンドするときに発生します。

### イベント: 'resume'

システムが再開するときに発生します。

### イベント: 'on-ac' *Windows*

システムが AC 電源に切り替わったときに発生します。

### イベント: 'on-battery' *Windows*

システムがバッテリー電源に切り替わったときに発生します。
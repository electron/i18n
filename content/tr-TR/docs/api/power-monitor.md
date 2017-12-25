# powerMonitor

> Monitor power state changes.

Süreç: [Ana](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

Örneğin:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Olaylar

The `powerMonitor` module emits the following events:

### Olay: 'askıya alındı'

Sistem askıya alındığında yayıldı.

### Olay: 'devam'

Sistem devam ettiğinde yayılan.

### Event: 'on-ac' *Windows*

Sistem AC güç değiştiğinde yayılan.

### Event: 'on-battery' *Windows*

Emitted when system changes to battery power.
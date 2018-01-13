# powerMonitor

> Güç durumu değişikliklerini izleyin.

Süreç: [Ana](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

Örneğin:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('Sistem uyku moduna geçecektir.')
  })
})
```

## Olaylar

`powerMonitor` modülü aşağıdaki olayları yayar:

### Olay: 'askıya alındı'

Sistem askıya alındığında yayıldı.

### Olay: 'devam'

Sistem devam ettiğinde yayılan.

### Event: 'on-ac' *Windows*

Sistem AC güç değiştiğinde yayılan.

### Olay: 'pilde' *Windows*

Sistem pil gücü değiştiğinde yayılan.
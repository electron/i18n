# powerMonitor

> Güç durumu değişikliklerini izleyin.

İşlem: [Ana](../glossary.md#main-process)

`uygulama` modülünün `hazır` olayı belirtilmeden bu modülü kullanamazsınız yada bu modüle gerek olmaz.

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

## Etkinlikler

`powerMonitor` modülü aşağıdaki olayları yayar:

### Olay: 'askıya alındı'

Sistem askıya alındığında yayıldı.

### Olay: 'devam'

Sistem devam ettiğinde yayılan.

### Etinlik: 'on-ac' *Windows*

Sistem AC güç değiştiğinde yayılan.

### Olay: 'pilde' *Windows*

Sistem pil gücü değiştiğinde yayılan.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.
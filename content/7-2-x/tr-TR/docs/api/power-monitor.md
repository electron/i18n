# powerMonitor

> Güç durumu değişikliklerini izleyin.

İşlem: [Ana](../glossary.md#main-process)


This module cannot be used until the `ready` event of the `app` module is emitted.

Örneğin:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Etkinlikler

`powerMonitor` modülü aşağıdaki olayları yayar:

### Olay: 'askıya alındı'

Sistem askıya alındığında yayıldı.

### Olay: 'devam'

Sistem devam ettiğinde yayılan.

### Etinlik: 'on-ac' _Windows_

Sistem AC güç değiştiğinde yayılan.

### Olay: 'pilde' _Windows_

Sistem pil gücü değiştiğinde yayılan.

### Olay: 'Kapat' _Linux_ _macOS_

Sistem yeniden başlatılmak veya kapatılmak üzereyken çıkar. Eğer olay işleyicisi `e.preventDefault()` kodunu çalıştırıyorsa, Electron uygulamanın düzgün kapanması açısından sistemi kapatmayı ertelemeye çalışacak. Eğer `e.preventDefault()` kodu çalıştırıldıysa, uygulama `app.quit()` gibi bir kodu çalıştırarak olabildiğince hızlı bir şekilde kendini kapatmaya çalışacak.

### Event: 'lock-screen' _macOS_ _Windows_

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' _macOS_ _Windows_

Emitted as soon as the systems screen is unlocked.

## Metodlar

The `powerMonitor` module has the following methods:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.

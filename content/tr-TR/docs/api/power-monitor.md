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

### Olay: 'Kapat' *Linux* *macOS*

Sistem yeniden başlatılmak veya kapatılmak üzereyken çıkar. Eğer olay işleyicisi `e.preventDefault()` kodunu çalıştırıyorsa, Electron uygulamanın düzgün kapanması açısından sistemi kapatmayı ertelemeye çalışacak. Eğer `e.preventDefault()` kodu çalıştırıldıysa, uygulama `app.quit()` gibi bir kodu çalıştırarak olabildiğince hızlı bir şekilde kendini kapatmaya çalışacak.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## Metodlar

The `powerMonitor` module has the following methods:

#### `powerMonitor.querySystemIdleState(idleThreshold, callback)`

* `idleThreshold` Integer
* `geri aramak` Function 
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

#### `powerMonitor.querySystemIdleTime(callback)`

* `geri aramak` Function 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.
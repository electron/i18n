# powerMonitor

> Güç durumu değişikliklerini izleyin.

İşlem: [Ana](../glossary.md#main-process)

## Etkinlikler

`powerMonitor` modülü aşağıdaki olayları yayar:

### Olay: 'suspend' _macOS_ _Windows_

Sistem askıya alındığında yayıldı.

### Olay: 'resume' _macOS_ _Windows_

Sistem devam ettiğinde yayılan.

### Olay: 'on-ac' _macOS_ _Windows_

Sistem AC güç değiştiğinde yayılan.

### Olay: 'on-battery' _macOS_  _Windows_

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

`String` Döndürür - Sistemin anlık durumu. Bunlardan birisi olabilir `active`, `idle`, `locked` veya `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.

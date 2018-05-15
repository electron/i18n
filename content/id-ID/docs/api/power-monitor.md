# powerMonitor

> Memantau perubahan status daya.

Proses: [Utama](../glossary.md#main-process)

Anda tidak dapat meminta atau menggunakan modul ini sampai acara `siap` dari`aplikasi` modul dipancarkan.

Sebagai contoh:

```javascript
const electron = require ('elektron')
const {app} = elektron

app.on ('siap', () => {
  electron.powerMonitor.on ('suspend', () => {
    console.log ('Sistemnya akan tertidur')
  })
})
```

## Acara

Modul`powerMonitor` memancarkan peristiwa berikut:

### Acara: 'menangguhkan'

Emitted saat sistem sedang menangguhkan.

### Acara: 'resume'

Emitted saat sistem dilanjutkan.

### Event: 'on-ac' *Windows*

Emitted saat sistem berubah menjadi AC power.

### Acara: 'di-baterai' *Windows*

Emitted saat sistem berubah menjadi daya baterai.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.
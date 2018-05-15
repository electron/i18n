# powerMonitor

> Monitorea los cambios de estado de energía.

Process: [Main](../glossary.md#main-process)

No puedes requerir o usar este módulo hasta que el evento `ready` de el módulo `app` sea emitido.

Por ejemplo:

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Eventos

El módulo `powerMonitor` emite los siguientes eventos:

### Evento: "suspend"

Se emite cuando se suspende el sistema.

### Evento: "resume"

Se emite cuando se reanuda el sistema.

### Eventp: "on-ac" *Windows*

Se emite cuando el sistema se cambia a la corriente alterna.

### Evento: "on-battery" *Windows*

Se emite cuando el sistema se cambia a la energía de batería.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.
# powerMonitor

> Monitorea los cambios de estado de energía.

Proceso: [Main](../glossary.md#main-process)

No se puede solicitar o usar este módulo hasta que el evento `ready` del módulo `app` sea emitido.

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
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

### Evento: "on-ac" *Windows*

Se emite cuando el sistema se cambia a la corriente alterna.

### Evento: "on-battery" *Windows*

Se emite cuando el sistema se cambia a la energía de batería.

### Evento: 'shutdown' *Linux* *macOS*

Se emite cuando el sistema está a punto de reiniciarse o apagarse. Si el controlador de eventos invocó `e.preventDefault()`, Electron intentará retrasar el apagado del sistema para que la aplicación salga limpiamente. Si se llama a `e.preventDefault()`, la aplicación debe salir tan pronto como sea posible llamando a algo como `app.quit()`.
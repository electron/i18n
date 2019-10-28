# Monitor de energía

> Monitorea los cambios de estado de energía.

Process: [Main](../glossary.md#main-process)

This module cannot be used until the `ready` event of the `app` module is emitted.

Por ejemplo:

```javascript
const { app, powerMonitor } = require('electron')

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
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

### Evento: 'lock-screen' *macOS* *Windows*

Emitido cuando el sistema está a punto de bloquear la pantalla.

### Evento: 'unlock-screen' *macOS* *Windows*

Emitido tan pronto como el sistema desbloquea la pantalla.

## Métodos

El modulo `powerMonitor` tiene los siguientes métodos:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Returns `Integer` - Idle time in seconds

Calculate system idle time in seconds.
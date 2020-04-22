# Monitor de energía

> Monitorea los cambios de estado de energía.

Proceso: [principal](../glossary.md#main-process)</0>

No se puede solicitar o usar este módulo hasta que el evento `ready` del módulo `app` sea emitido.

Por ejemplo:

```javascript
const electron = require('electron')
const { app } = electron

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

### Evento: "on-ac" _Windows_

Se emite cuando el sistema se cambia a la corriente alterna.

### Evento: "on-battery" _Windows_

Se emite cuando el sistema se cambia a la energía de batería.

### Evento: 'shutdown' _Linux_ _macOS_

Se emite cuando el sistema está a punto de reiniciarse o apagarse. Si el controlador de eventos invocó `e.preventDefault()`, Electron intentará retrasar el apagado del sistema para que la aplicación salga limpiamente. Si se llama a `e.preventDefault()`, la aplicación debe salir tan pronto como sea posible llamando a algo como `app.quit()`.

### Evento: 'lock-screen' _macOS_ _Windows_

Emitido cuando el sistema está a punto de bloquear la pantalla.

### Evento: 'unlock-screen' _macOS_ _Windows_

Emitido tan pronto como el sistema desbloquea la pantalla.

## Métodos

El modulo `powerMonitor` tiene los siguientes métodos:

### `powerMonitor.querySystemIdleState(idleThreshold, callback)` _(Deprecated)_

* `idleThreshold` Integer
* `callback` Función
  * `idleState` String - Puede ser `active`, `idle`, `locked` o `unknown`

Calcule el estado de reposo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo. `callback` será llamada de forma sincrónica en algunos sistemas y con un argumento `idleState` que describe el estado del sistema. `locked` está disponible en sistemas soportado únicamente.

### `powerMonitor.querySystemIdleTime(callback)` _(Deprecated)_

* `callback` Función
  * `idleTime` Integer - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Can be `active`, `idle`, `locked` or `unknown`.

Calcule el estado de reposo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Devuelve `Integer` - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.


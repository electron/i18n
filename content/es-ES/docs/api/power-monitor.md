# Monitor de energía

> Monitorea los cambios de estado de energía.

Process: [Main](../glossary.md#main-process)

No puedes requerir o usar este módulo hasta que el evento `ready` de el módulo `app` sea emitido.

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

### `powerMonitor.querySystemIdleState(idleThreshold, callback)` *(Deprecated)*

* `idleThreshold` Integer
* `callback` Function 
  * `idleState` String - Puede ser `active`, `idle`, `locked` o `unknown`

Calcule el estado de reposo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo. `callback` será llamada de forma sincrónica en algunos sistemas y con un argumento `idleState` que describe el estado del sistema. `locked` está disponible en sistemas soportado únicamente.

### `powerMonitor.querySystemIdleTime(callback)` *(Deprecated)*

* `callback` Function 
  * `idleTime` Integer - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Devuelve `String` - El estado actual del sistema. Puede ser `active`, `idle`, `locked` o `unknown`.

Calcular el estado inactivo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo. `locked` esta habilitado en sistemas soportados unicamente.

### `powerMonitor.getSystemIdleTime()`

Devuelve `Integer` - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.
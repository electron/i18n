# powerMonitor

> Monitorea los cambios de estado de energía.

Proceso: [principal](../glossary.md#main-process)</0>

## Eventos

El módulo `powerMonitor` emite los siguientes eventos:

### Evento: "suspend"

Se emite cuando se suspende el sistema.

### Evento: "resume"

Se emite cuando se reanuda el sistema.

### Event: 'on-ac' _macOS_ _Windows_

Se emite cuando el sistema se cambia a la corriente alterna.

### Event: 'on-battery' _macOS_  _Windows_

Se emite cuando el sistema se cambia a la energía de batería.

### Evento: 'shutdown' _Linux_ _macOS_

Se emite cuando el sistema está a punto de reiniciarse o apagarse. Si el controlador de eventos invocó `e.preventDefault()`, Electron intentará retrasar el apagado del sistema para que la aplicación salga limpiamente. Si se llama a `e.preventDefault()`, la aplicación debe salir tan pronto como sea posible llamando a algo como `app.quit()`.

### Evento: 'lock-screen' _macOS_ _Windows_

Emitido cuando el sistema está a punto de bloquear la pantalla.

### Evento: 'unlock-screen' _macOS_ _Windows_

Emitido tan pronto como el sistema desbloquea la pantalla.

### Evento: 'user-did-become-active' _macOS_

Emitted when a login session is activated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) for more information.

### Evento: 'user-did-resign-active' _macOS_

Emitted when a login session is deactivated. See [documentation](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) for more information.

## Métodos

El modulo `powerMonitor` tiene los siguientes métodos:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Returns `String` - The system's current state. Puede ser `active`, `idle`, `locked` o `unknown`.

Calcule el estado de reposo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo.  `locked` is available on supported systems only.

### `powerMonitor.getSystemIdleTime()`

Devuelve `Integer` - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.

### `powerMonitor.isOnBatteryPower()`

Returns `Boolean` - Whether the system is on battery power.

To monitor for changes in this property, use the `on-battery` and `on-ac` events.

## Propiedades

### `powerMonitor.onBatteryPower`

Una propiedad `Boolean`. True if the system is on battery power.

See [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).

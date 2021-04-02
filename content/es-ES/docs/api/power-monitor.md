# Monitor de energía

> Monitorea los cambios de estado de energía.

Proceso: [Main](../glossary.md#main-process)

## Eventos

El módulo `powerMonitor` emite los siguientes eventos:

### Event: 'suspend' _macOS_ _Windows_

Se emite cuando se suspende el sistema.

### Event: 'resume' _macOS_ _Windows_

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

Se emite cuando se activa una sesión de inicio de sesión. Consulta [](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) de documentación para obtener más información.

### Evento: 'user-did-resign-active' _macOS_

Se emite cuando se desactiva una sesión de inicio de sesión. Consulta [](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) de documentación para obtener más información.

## Métodos

El modulo `powerMonitor` tiene los siguientes métodos:

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

Devuelve `String` -el estado actual del sistema. Puede ser `active`, `idle`, `locked` o `unknown`.

Calcule el estado de reposo del sistema. `idleThreshold` es la cantidad de tiempo (en segundos) antes de considerar inactivo.  `locked` solo está disponible en los sistemas compatibles.

### `powerMonitor.getSystemIdleTime()`

Devuelve `Integer` - Tiempo inactivo en segundos

Calcular tiempo inactivo del sistema en segundos.

### `powerMonitor. isOnBatteryPower ()`

Devuelve `Boolean` -si el sistema está en la energía de la batería.

Para supervisar los cambios en esta propiedad, usa los eventos `on-battery` y `on-ac` .

## Propiedades

### `powerMonitor. onBatteryPower`

Una propiedad `Boolean`. True si el sistema está en la energía de la batería.

Consulta [`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower).

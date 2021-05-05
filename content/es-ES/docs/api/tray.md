# Tray

## Clase: Tray

> Añadir los iconos y menús contextuales al área de notificación del sistema.

Proceso: [Main](../glossary.md#main-process)

`Tray` es un [EventEmitter][event-emitter].

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
```

__Limitaciones de la plataforma:__

* En Linux se utilizará el indicador de aplicación si es compatible, de lo contrario `GtkStatusIcon` se utilizará en su lugar.
* En distribuciones de Linux que sólo tienen soporte de indicador de aplicación, tienes que instalar `libappindicator1` para que funcione el icono.
* El indicador de aplicación sólo se muestra cuando tiene un menú contextual.
* Cuando se utiliza el indicador de aplicación en Linux, el evento `click` es ignorado.
* En Linux para que los cambios hechos a los `MenuItem` individuales hagan efecto, tienes que llamar otra vez a `setContextMenu`. Por ejemplo:

```javascript
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.whenReady().then(() => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Make a change to the context menu
  contextMenu.items[1].checked = false

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu)
})
```

* En Windows se recomienda utilizar los iconos `ICO` para obtener mejores efectos visuales.

Si se quiere mantener los mismos comportamientos en todas las plataformas, no se debe confiar en el evento `click` y siempre hay que adjuntar el menú de contexto al icono de bandeja.

### `new Tray(image, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (opcional) _Windows_ - Asigna un GUID al icono de la bandeja. If the executable is signed and the signature contains an organization in the subject line then the GUID is permanently associated with that signature. OS level settings like the position of the tray icon in the system tray will persist even if the path to the executable changes. If the executable is not code-signed then the GUID is permanently associated with the path to the executable. Changing the path to the executable will break the creation of the tray icon and a new GUID must be used. However, it is highly recommended to use the GUID parameter only in conjunction with code-signed executable. If an App defines multiple tray icons then each icon must use a separate GUID.

Crea un nuevo icono de bandeja asociado con la `image`.

### Eventos de Instancia

El módulo `Tray` emite los siguientes eventos:

#### Evento: "click"

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando se hace clic en el icono de bandeja.

#### Evento: "right-click"_macOS_ _Windows_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitido cuando se hace clic derecho en el icono de bandeja.

#### Evento: "double-click"_macOS_ _Windows_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitido cuando se hace doble clic en el icono de bandeja.

#### Evento: 'balloon-show' _Windows_

Emitido cuando se muestra el globo de bandeja.

#### Evento: 'balloon-click' _Windows_

Emitido cuando se hace clic en el globo de bandeja.

#### Evento: 'balloon-closed' _Windows_

Emitido cuando se cierra el globo de bandeja debido al tiempo de expiración o cuando el usuario lo cierra manualmente.

#### Evento: 'drop' _macOS_

Emitido cuando cualquier elemento arrastrado es dejado en el icono de bandeja.

#### Evento: 'drop-files' _macOS_

Devuelve:

* `event` Event
* `files` String[] - Las rutas de los archivos dejados en la bandeja.

Emitido cuando los archivos arrastrados son dejados en el icono de la bandeja.

#### Evento: 'drop-text' _macOS_

Devuelve:

* `event` Event
* `text` Cadena - la cadena del texto dejado.

Emitido cuando el texto arrastrado es arrojado en el icono de bandeja.

#### Evento: 'drag-enter' _macOS_

Emitido cuando una operación de arrastre entra al icono de bandeja.

#### Evento: 'drag-leave' _macOS_

Emitido cuando una operación de arrastre sale del icono de bandeja.

#### Evento: 'drag-end' _macOS_

Emitido cuando termina una operación de arrastre en la bandeja o termina en otra ubicación.

#### Evento: 'mouse-up' _macOS_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitted when the mouse is released from clicking the tray icon.

Note: This will not be emitted if you have set a context menu for your Tray using `tray.setContextMenu`, as a result of macOS-level constraints.

#### Evento: 'mouse-down' _macOS_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitted when the mouse clicks the tray icon.

#### Evento: 'mouse-enter' _macOS_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón entra en el icono de la bandeja.

#### Evento: 'mouse-leave' _macOS_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón sale del icono de la bandeja.

#### Evento: 'mouse-move' _macOS_ _Windows_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Se emite cuando el ratón se mueve sobre el icono de la bandeja del sistema.

### Métodos de Instancia

La clase `Tray` tiene los siguientes métodos:

#### `tray.destroy()`

Destruye inmediatamente el icono de la bandeja.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Configura la `image` asociada con este icono de bandeja.

#### `tray.setPressedImage(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

En macOS, configura la `image` asociada con este icono de bandeja cuando se presiona.

#### `tray.setToolTip(toolTip)`

* `toolTip` Cadena

Configura la activación de texto para este icono de bandeja.

#### `tray.setTitle(title[, options])` _macOS_

* `title` String
* `options` Object (opcional)
  * `fontType` String (optional) - The font family variant to display, can be `monospaced` or `monospacedDigit`. `monospaced` is available in macOS 10.15+ and `monospacedDigit` is available in macOS 10.11+.  When left blank, the title uses the default system font.

Establece el título mostrado al lado de la bandeja de icono en la barra de estado (Soporta colores ANSI).

#### `tray.getTitle()` _macOS_

Devuelve `String` - el título mostrado junto al icono de la bandeja en la barra de estado

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

Este valor se establece en falso por defecto.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Devuelve `Boolean` - Si los eventos de doble click serán ignorados.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - Icono a usar cuando `iconType` es `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (opcional) - La versión grande del icono debe ser usada. Por defecto es `true`. Mapea a [`NIIF_LARGE_ICON`][NIIF_LARGE_ICON].
  * `noSound` Boolean (opcional) - No reproducir el sonido asociado. Por defecto es `false`. Mapea a [`NIIF_NOSOUND`][NIIF_NOSOUND].
  * `respectQuietTime` Boolean (opcional) - No mostrar el globo de notificación si el usuario actual esta en "tiempo de silencio". Por defecto es `false`. Mapea a [`NIIF_RESPECT_QUIET_TIME`][NIIF_RESPECT_QUIET_TIME].

Muestra un globo de la bandeja.

#### `tray.removeBalloon()` _Windows_

Elimina un globo de la bandeja.

#### `tray.focus()` _Windows_

Devuelve el foco al área de notificación de la barra de tarea. Los iconos del área de notificación deben usar este mensaje cuando hayan completado su operación UI. Por ejemplo, si el icono muestra un menú de acceso directo, pero el usuario presiona ESC para cancelarlo, use `tray.focus()` para devolver el focus a la área de notificación.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (opcional)
* `position` [Point](structures/point.md) (optional) - La posición del elemento emergente.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

La `position` solo está disponible en Windows, y por defecto es (0, 0).

#### `tray.closeContextMenu()` _macOS_ _Windows_

Closes an open context menu, as set by `tray.setContextMenu()`.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Configura el menú de contexto para este icono.

#### `tray.getBounds()` _macOS_ _Windows_

Devuelve [`Rectangle`](structures/rectangle.md)

Los `bounds` de este icono de la bandeja como `Object`.

#### `tray.isDestroyed()`

Devuelve `Boolean` - Si el icono de la bandeja es destruido o no.

[NIIF_NOSOUND]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010
[NIIF_LARGE_ICON]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020
[NIIF_RESPECT_QUIET_TIME]: https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

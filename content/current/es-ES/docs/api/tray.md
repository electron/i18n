## Clase: Tray

> Añadir los iconos y menús contextuales al área de notificación del sistema.

Proceso: [principal](../glossary.md#main-process)</0>

`Tray` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = require('electron')

let tray = null
app.on('ready', () => {
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
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Por ejemplo:

```javascript
const { app, Menu, Tray } = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  // Hace un cambio al menú de contexto
  contextMenu.items[1].checked = false

  // Llama esto otra vez en Linux debido a que modificamos el menú de contexto
  appIcon.setContextMenu(contextMenu)
})
```
* En Windows se recomienda utilizar los iconos `ICO` para obtener mejores efectos visuales.

Si se quiere mantener los mismos comportamientos en todas las plataformas, no se debe confiar en el evento `click` y siempre hay que adjuntar el menú de contexto al icono de bandeja.


### `nuevo Tray(image)`

* `image` ([NativeImage](native-image.md) | String)

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

#### Event: 'mouse-move' _macOS_ _Windows_

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

#### `tray.setTitle(title)` _macOS_

* `title` Cadena

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
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` Cadena
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. Por defecto es `true`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Por defecto es `false`. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Por defecto es `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Muestra un globo de la bandeja.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (opcional)
* `position` [Point](structures/point.md) (optional) - La posición del elemento emergente.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

La `position` solo está disponible en Windows, y por defecto es (0, 0).

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Configura el menú de contexto para este icono.

#### `tray.getBounds()` _macOS_ _Windows_

Devuelve [`Rectangle`](structures/rectangle.md)

Los `bounds` de este icono de la bandeja como `Object`.

#### `tray.isDestroyed()`

Devuelve `Boolean` - Si el icono de la bandeja es destruido o no.

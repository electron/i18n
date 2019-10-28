## Clase: Tray

> Añadir los iconos y menús contextuales al área de notificación del sistema.

Process: [Main](../glossary.md#main-process)

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

**Limitaciones de la plataforma:**

* En Linux se utilizará el indicador de aplicación si es compatible, de lo contrario `GtkStatusIcon` se utilizará en su lugar.
* En distribuciones de Linux que sólo tienen soporte de indicador de aplicación, tienes que instalar `libappindicator1` para que funcione el icono.
* El indicador de aplicación sólo se muestra cuando tiene un menú contextual.
* Cuando se utiliza el indicador de aplicación en Linux, el evento `click` es ignorado.
* En Linux, para que los cambios hechos al `MenuItem` tengan efecto, hay que llamar de nuevo `setContextMenu`. Por ejemplo:

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

Emitted when the tray icon is clicked.

#### Evento: "right-click"*macOS* *Windows*

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitted when the tray icon is right clicked.

#### Evento: "double-click"*macOS* *Windows*

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitted when the tray icon is double clicked.

#### Evento: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Evento: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Evento: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Evento: 'drop' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Evento: 'drop-files' *macOS*

Devuelve:

* `event` Event
* `files` String[] - Las rutas de los archivos dejados en la bandeja.

Emitted when dragged files are dropped in the tray icon.

#### Evento: 'drop-text' *macOS*

Devuelve:

* `evento` Evento
* `text` Cadena - la cadena del texto dejado.

Emitted when dragged text is dropped in the tray icon.

#### Evento: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Evento: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Evento: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Evento: 'mouse-enter' *macOS*

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitted when the mouse enters the tray icon.

#### Evento: 'mouse-leave' *macOS*

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitted when the mouse moves in the tray icon.

### Métodos de Instancia

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` Cadena

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` Cadena

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` *macOS*

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` *Windows*

* `options` Objeto 
  * `icon` ([NativeImage](native-image.md) | String) (optional) -
  * `title` String
  * `content` String

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

Devuelve [`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.
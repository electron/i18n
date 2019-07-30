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

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando se hace clic en el icono de bandeja.

#### Evento: "right-click"*macOS* *Windows*

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitido cuando se hace clic derecho en el icono de bandeja.

#### Evento: "double-click"*macOS* *Windows*

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitido cuando se hace doble clic en el icono de bandeja.

#### Evento: 'balloon-show' *Windows*

Emitido cuando se muestra el globo de bandeja.

#### Evento: 'balloon-click' *Windows*

Emitido cuando se hace clic en el globo de bandeja.

#### Evento: 'balloon-closed' *Windows*

Emitido cuando se cierra el globo de bandeja debido al tiempo de expiración o cuando el usuario lo cierra manualmente.

#### Evento: 'drop' *macOS*

Emitido cuando cualquier elemento arrastrado es dejado en el icono de bandeja.

#### Evento: 'drop-files' *macOS*

* `event` Event
* `files` String[] - Las rutas de los archivos dejados en la bandeja.

Emitido cuando los archivos arrastrados son dejados en el icono de la bandeja.

#### Evento: 'drop-text' *macOS*

* `evento` Evento
* `text` Cadena - la cadena del texto dejado.

Emitido cuando el texto arrastrado es arrojado en el icono de bandeja.

#### Evento: 'drag-enter' *macOS*

Emitido cuando una operación de arrastre entra al icono de bandeja.

#### Evento: 'drag-leave' *macOS*

Emitido cuando una operación de arrastre sale del icono de bandeja.

#### Evento: 'drag-end' *macOS*

Emitido cuando termina una operación de arrastre en la bandeja o termina en otra ubicación.

#### Evento: 'mouse-enter' *macOS*

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón entra en el icono de la bandeja.

#### Evento: 'mouse-leave' *macOS*

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón sale del icono de la bandeja.

#### Evento: 'mouse-move' *macOS*

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

#### `tray.setPressedImage(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

En macOS, configura la `image` asociada con este icono de bandeja cuando se presiona.

#### `tray.setToolTip(toolTip)`

* `toolTip` Cadena

Configura la activación de texto para este icono de bandeja.

#### `tray.setTitle(title)` *macOS*

* `title` Cadena

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` *macOS*

* `title` String

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**[Deprecated](breaking-changes.md#tray)**

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

```javascript
const { BrowserWindow, Tray } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
const tray = new Tray('/path/to/my/icon')

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})
```

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
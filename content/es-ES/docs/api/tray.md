## Clase: Tray

> Añadir los iconos y menús contextuales al área de notificación del sistema.

Process: [Main](../glossary.md#main-process)

`Tray` es un [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
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
const {app, Menu, Tray} = require('electron')

let appIcon = null
app.on('ready', () => {
  appIcon = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
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

* `event` Event 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando se hace clic en el icono de bandeja.

#### Evento: "right-click"*macOS* *Windows*

* `event` Evento 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - Los límites del icono de bandeja.

Emitido cuando se hace clic derecho en el icono de bandeja.

#### Evento: "double-click"*macOS* *Windows*

* `evento` Evento 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
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

* `event` Event
* `text` Cadena - la cadena del texto dejado.

Emitido cuando el texto arrastrado es arrojado en el icono de bandeja.

#### Evento: 'drag-enter' *macOS*

Emitido cuando una operación de arrastre entra al icono de bandeja.

#### Evento: 'drag-leave' *macOS*

Emitido cuando una operación de arrastre sale del icono de bandeja.

#### Evento: 'drag-end' *macOS*

Emitido cuando termina una operación de arrastre en la bandeja o termina en otra ubicación.

#### Evento: 'mouse-enter' *macOS*

* `event` Evento 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón entra en el icono de la bandeja.

#### Evento: 'mouse-leave' *macOS*

* `event` Evento 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - La posición del evento.

Emitido cuando el ratón sale del icono de la bandeja.

#### Evento: 'mouse-move' *macOS*

* `event` Evento 
  * `altKey` Booleano
  * `shiftKey` Booleano
  * `ctrlKey` Booleano
  * `metaKey` Boolean
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

* `image` [NativeImage](native-image.md)

En macOS, configura la `image` asociada con este icono de bandeja cuando se presiona.

#### `tray.setToolTip(toolTip)`

* `toolTip` Cadena

Configura la activación de texto para este icono de bandeja.

#### `tray.setTitle(title)` *macOS*

* `title` Cadena

Establece el título mostrado a un lado del icono de la bandeja en la barra de estado (Soporta colores ANSI).

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` Cadena - Modo de resaltado con uno de los siguientes valores: 
  * `selection` - Resalta el icono de la bandeja cuando se hace clic sobre él y también cuando se abre su menú de contexto. Esta es la opción por defecto.
  * `always` - Siempre resalta el icono de la bandeja.
  * `never` - Nunca resalta el icono de la bandeja.

Establece cuando se resalta (en azul) el fondo del icono de la bandeja.

**Nota:** Puede utilizarse `highlightMode` con una [`BrowserWindow`](browser-window.md) al alternar entre los modos `'never'` y `'always'` cuando la visibilidad de la ventana cambia.

```javascript
const {BrowserWindow, Tray} = require('electron')

const win = new BrowserWindow({width: 800, height: 600})
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

#### `tray.displayBalloon(options)` *Windows*

* `opciones` Object 
  * `icon` ([NativeImage](native-image.md) | String) (opcional) -
  * `title` Cadena
  * `content` String

Muestra un globo de la bandeja.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (opcional)
* `position` [Point](structures/point.md) (optional) - La posición del elemento emergente.

Aparece el menú de contexto del icono de la bandeja. Cuando se pasa `menu`, el `menu` se mostrará en lugar el menú de contexto del icono de la bandeja.

La `position` solo está disponible en Windows, y por defecto es (0, 0).

#### `tray.setContextMenu(menu)`

* `menu` Menu

Configura el menú de contexto para este icono.

#### `tray.getBounds()` *macOS* *Windows*

Devuelve [`Rectangle`](structures/rectangle.md)

Los `bounds` de este icono de la bandeja como `Object`.

#### `tray.isDestroyed()`

Devuelve `Boolean` - Si el icono de la bandeja es destruido o no.
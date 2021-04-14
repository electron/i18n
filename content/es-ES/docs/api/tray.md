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
const { app, Menu, Tray } = require (' Electron ')

permitir que appIcon = null
app. whenReady (). then (() => {
  appIcon = New Tray ('/Path/to/my/Icon ')
  const contextMenu = menu. buildFromTemplate ([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])

  //hacer un cambio en el menú contextual
  contextMenu. Items[1]. Checked = false

  //vuelva a llamar a esto para Linux porque modificamos el menú contextual
  appIcon. setContextMenu (contextMenu)
})
```

* En Windows se recomienda utilizar los iconos `ICO` para obtener mejores efectos visuales.

Si se quiere mantener los mismos comportamientos en todas las plataformas, no se debe confiar en el evento `click` y siempre hay que adjuntar el menú de contexto al icono de bandeja.

### `new Tray(image, [guid])`

* `image` ([NativeImage](native-image.md) | String)
* `guid` String (opcional) _Windows_ - Asigna un GUID al icono de la bandeja. Si el ejecutable está firmado y la firma contiene una organización en la línea del asunto, el GUID se asocia de manera permanente con esa firma. Los parámetros de nivel de SO como la posición del icono de la bandeja en la bandeja del sistema persistirán incluso si cambia la ruta al ejecutable. Si el ejecutable no tiene firma de código, el GUID se asocia de forma permanente con la ruta al ejecutable. Si cambias la ruta al ejecutable, se romperá la creación del icono de la bandeja y se debe usar un nuevo GUID. Sin embargo, es muy recomendable usar el parámetro GUID solo en conjunción con un ejecutable con firma de código. Si una App define múltiples íconos de bandejas, cada icono debe usar un GUID separado.

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

Se emite cuando se libera el ratón del clic en el icono de la bandeja.

Nota: esto no se emitirá si has establecido un menú contextual para tu bandeja usando `tray.setContextMenu`, como resultado de las restricciones a nivel de macOS.

#### Evento: 'mouse-down' _macOS_

Devuelve:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `position` [Point](structures/point.md) - La posición del evento.

Se emite cuando el ratón hace clic en el icono de la bandeja.

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
  * `fontType` String (opcional)-la variante de la familia de fuentes que se debe mostrar, puede ser `monospaced` o `monospacedDigit`. `monospaced` está disponible en macOS 10.15 + y `monospacedDigit` está disponible en macOS 10.11 +.  Cuando se deja en blanco, el título usa la fuente de sistema predeterminada.

Establece el título mostrado al lado de la bandeja de icono en la barra de estado (Soporta colores ANSI).

#### `tray.getTitle()` _macOS_

Devuelve `String` - el título mostrado junto al icono de la bandeja en la barra de estado

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `ignore` Boolean

Establece la opción para omitir los eventos de doble clic. Ignorar estos eventos te permite para detectar cada clic individual del icono de la bandeja.

Este valor se establece en falso por defecto.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Devuelve `Boolean` - Si los eventos de doble click serán ignorados.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (opcional) - Icono a usar cuando `iconType` es `custom`.
  * `iconType` String (opcional)-puede ser `none`, `info`, `warning`, `error` o `custom`. El valor predeterminado es `custom`.
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

Aparece el menú contextual del icono de la bandeja. Cuando se pasa `menu` , el `menu` se mostrará en lugar del menú contextual del icono de la bandeja.

La `position` solo está disponible en Windows, y por defecto es (0, 0).

#### `tray.closeContextMenu()` _macOS_ _Windows_

Cierra un menú contextual abierto, tal como lo establece `tray.setContextMenu()`.

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

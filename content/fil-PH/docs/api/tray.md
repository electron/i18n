## Class: Tray

> Magdagdag ng mga icons at mga context menu sa notification area ng sistema.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang`Tray`ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const { app, Menu, Tray } = nangangailanganng('electron')

hayaan ang tray = null
app.on('ready', () => {
  tray = bagong Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('Ito ay aking aplikasyon.')
  tray.setContextMenu(contextMenu)
})
```

**Mga Limitasyon ng Plataporma:**

* Sa Linux na app indicator ay gagamitin kung ito ay sinusuportahan, kung hindi man `GtkStatusIcon`ay maaring gamitin sa halip.
* Sa Linux distributions na mayroon lamang app indicator support, pwede kang mag-install ng `libappindicator1` para gumawa ng tray icon work.
* Ang App indicator ay maaring maipapakita lamang kapag mayroon itong context menu.
* Kapag ang app indicator ay ginagamit sa Linux, ang `click` event ay hindi pinansin.
* Sa Linux para sa mga pagbabago na ginawa sa indibidwal`MenuItem`upang magkabisa, dapat mong tawagan ang`setContextMenu`muli. Halimbawa:

```javascript
const { app, Menu, Tray } = nangangaianganng('electron')

hayaan ang appIcon = null
app.on('ready', () => {
  appIcon = bagong Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])
  //Gumawa ng mga pagbabago sa context menu
  contextMenu.items[1].tiningnan = mali
```

* Sa windows ito ay inirekomenda para gamitin ang mga `ICO`icons para makuha ang pinakamahusay na visual effects.

Kung gusto mong panatilihin ang parehong pag-uugali sa lahat ng plataporma, dapat hindi ka umasa sa 0>click</code> event at palaging i-attach ang context menu sa tray icon.

### `bagong Tray(imahe)`

* `image` [NativeImage](native-image.md) (String)

Lumilikha ng isang panibagong tray icon na may kaugnayan sa mga`imahe`.

### Mga Halimbawa ng Pangyayari

Ang `Tray`module ay maglalabas ng mga sumusunod na mga event:

#### Event: 'klik'

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted when the tray icon is clicked.

#### Event: 'right-click' *macOS* *Windows*

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted when the tray icon is right clicked.

#### Event: 'double-click' *macOS* *Windows*

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted when the tray icon is double clicked.

#### Event: 'balloon-show' *Windows*

Emitted when the tray balloon shows.

#### Event: 'balloon-click' *Windows*

Emitted when the tray balloon is clicked.

#### Event: 'balloon-closed' *Windows*

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### Event: 'drop' *macOS*

Emitted when any dragged items are dropped on the tray icon.

#### Event: 'drop-files' *macOS*

Pagbabalik:

* `kaganapan` Kaganapan
* `files` String[] -Ang mga landas ng mga binitiwang mga file.

Emitted when dragged files are dropped in the tray icon.

#### Event: 'drop-text' *macOS*

Pagbabalik:

* `kaganapan` kaganapan
* `text` String -ang mga binitiwang text string.

Emitted when dragged text is dropped in the tray icon.

#### Event: 'drag-enter' *macOS*

Emitted when a drag operation enters the tray icon.

#### Event: 'drag-leave' *macOS*

Emitted when a drag operation exits the tray icon.

#### Event: 'drag-end' *macOS*

Emitted when a drag operation ends on the tray or ends at another location.

#### Event: 'mouse-enter' *macOS*

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted when the mouse enters the tray icon.

#### Event: 'mouse-leave' *macOS*

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted when the mouse exits the tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

Pagbabalik:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted when the mouse moves in the tray icon.

### Mga Pamamaraan ng Instance

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` [NativeImage](native-image.md) (String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md) (String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` *macOS* 

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` *macOS*

* `huwag pansinin` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` *macOS*

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` *Windows*

* `pagpipilian` Bagay 
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

Nagbabalik[`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.
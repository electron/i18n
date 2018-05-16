## Class: Tray

> Magdagdag ng mga icons at mga context menu sa notification area ng sistema.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang`Tray`ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

```javascript
const {app, Menu, Tray} = nangangailanganng('electron')

hayaan ang tray = null
app.on('ready', () => {
  tray = bagong Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
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
const {app, Menu, Tray} = nangangaianganng('electron')

hayaan ang appIcon = null
app.on('ready', () => {
  appIcon = bagong Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
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

* `kaganapan` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon

Emitted kapag nag click ang tray icon.

#### Event: 'right-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon

Emitted kapag nai-right click ang tray icon.

#### Event: 'double-click' *macOS* *Windows*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `bounds` [Rectangle](structures/rectangle.md) - The bounds of tray icon

Emitted kapag ang tray icon ay na double-click.

#### Event: 'balloon-show' *Windows*

Emitted kapag ang tray balloon ay naipapakita.

#### Event: 'balloon-click' *Windows*

Emitted kapag ang tray balloon ay naiclick.

#### Event: 'balloon-closed' *Windows*

Emitted kapag ang tray ballon ay nakasirado dahil ang timeout o ang gumagamit ng mano-mano ang nagsasara nito.

#### Event: 'drop' *macOS*

Emitted kapag ang anumang dragged na mga items ay ibinagsak sa tray icon.

#### Event: 'drop-files' *macOS*

* `kaganapan` Kaganapan
* `files` String[] -Ang mga landas ng mga binitiwang mga file.

Emitted kapag ang dragged na mga file ay ibinagsak sa tray icon.

#### Event: 'drop-text' *macOS*

* `kaganapan` kaganapan
* `text` String - the dropped text string

Emitted kapag ang dragged text ay ibinagsak sa tray icon.

#### Event: 'drag-enter' *macOS*

Emitted kapag ang drag operation ay pumapasok sa tray icon.

#### Event: 'drag-leave' *macOS*

Emitted kapag ang drag operation ay lumabas sa tray icon.

#### Event: 'drag-end' *macOS*

Emitted kapag ang drag operation ay nagtatapos sa tray o nagtatapos sa ibang lugar.

#### Event: 'mouse-enter' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event

Emitted kapag ang mouse ay pumapasok sa tray icon.

#### Event: 'mouse-leave' *macOS*

* `event` Event 
  * `altKey` Boolean
  * `shiftKey` Boolean
  * `ctrlKey` Boolean
  * `metaKey` Boolean
* `position` [Point](structures/point.md) - The position of the event

Emitted kapag ang mouse ay lumalabas sa tray icon.

### Mga Pamamaraan ng Instance

The `Tray` class has the following methods:

#### `tray.destroy()`

Destroys the tray icon immediately.

#### `tray.setImage(image)`

* `image` [NativeImage](native-image.md) (String)

Sets the `image` associated with this tray icon.

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md)

Sets the `image` associated with this tray icon when pressed on macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Sets the hover text for this tray icon.

#### `tray.setTitle(title)` *macOS*

* `title` String

Sets the title displayed aside of the tray icon in the status bar.

#### `tray.setHighlightMode(mode)` *macOS*

* `mode` String - Highlight mode with one of the following values: 
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `always` - Always highlight the tray icon.
  * `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](browser-window.md) by toggling between `'never'` and `'always'` modes when the window visibility changes.

```javascript
const {BrowserWindow, Tray} = nangangailanganng('electron')

const win = bagong BrowserWindow({width: 800, height: 600})
const tray = bagong Tray('/path/to/my/icon')

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

* `pagpipilian` Bagay 
  * `icon` ([NativeImage](native-image.md) | String) - (optional)
  * `title` String - (optional)
  * `content` String - (optional)

Displays a tray balloon.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### `tray.setContextMenu(menu)`

* `menu` Menu

Sets the context menu for this icon.

#### `tray.getBounds()` *macOS* *Windows*

Nagbabalik[`Rectangle`](structures/rectangle.md)

The `bounds` of this tray icon as `Object`.

#### `tray.isDestroyed()`

Returns `Boolean` - Whether the tray icon is destroyed.
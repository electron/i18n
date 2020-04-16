## Class: Tray

> Magdagdag ng mga icons at mga context menu sa notification area ng sistema.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang`Tray`ay isang  [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

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

__Mga Limitasyon ng Plataporma:__

* Sa Linux na app indicator ay gagamitin kung ito ay sinusuportahan, kung hindi man `GtkStatusIcon`ay maaring gamitin sa halip.
* Sa Linux distributions na mayroon lamang app indicator support, pwede kang mag-install ng `libappindicator1` para gumawa ng tray icon work.
* Ang App indicator ay maaring maipapakita lamang kapag mayroon itong context menu.
* Kapag ang app indicator ay ginagamit sa Linux, ang `click` event ay hindi pinansin.
* On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. Halimbawa:

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

### Halimbawa ng mga Event

Ang `Tray`module ay maglalabas ng mga sumusunod na mga event:

#### Event: 'click'

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag nag click ang tray icon.

#### Event: 'right-click' _macOS_ _Windows_

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted kapag nai-right click ang tray icon.

#### Event: 'double-click' _macOS_ _Windows_

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted kapag ang tray icon ay na double-click.

#### Event: 'balloon-show' _Windows_

Emitted kapag ang tray balloon ay naipapakita.

#### Event: 'balloon-click' _Windows_

Emitted kapag ang tray balloon ay naiclick.

#### Event: 'balloon-closed' _Windows_

Emitted kapag ang tray ballon ay nakasirado dahil ang timeout o ang gumagamit ng mano-mano ang nagsasara nito.

#### Event: 'drop' _macOS_

Emitted kapag ang anumang dragged na mga items ay ibinagsak sa tray icon.

#### Event: 'drop-files' _macOS_

* `event` Event
* `files` String[] -Ang mga landas ng mga binitiwang mga file.

Emitted kapag ang dragged na mga file ay ibinagsak sa tray icon.

#### Event: 'drop-text' _macOS_

* `kaganapan` Kaganapan
* `text` String -ang mga binitiwang text string.

Emitted kapag ang dragged text ay ibinagsak sa tray icon.

#### Event: 'drag-enter' _macOS_

Emitted kapag ang drag operation ay pumapasok sa tray icon.

#### Event: 'drag-leave' _macOS_

Emitted kapag ang drag operation ay lumabas sa tray icon.

#### Event: 'drag-end' _macOS_

Emitted kapag ang drag operation ay nagtatapos sa tray o nagtatapos sa ibang lugar.

#### Event: 'mouse-enter' _macOS_

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay pumapasok sa tray icon.

#### Event: 'mouse-leave' _macOS_

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay lumalabas sa tray icon.

#### Event: 'mouse-move' _macOS_

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted when the mouse moves in the tray icon.

### Mga Pamamaraan ng Instance

Ang 0>Tray</code>class ay may mga sumusunod na mga pamamaraan:

#### `tray.destroy()`

Agad na sumisira sa tray icon.

#### `tray.setImage(image)`

* `image` [NativeImage](native-image.md) (String)

Nagseset sa `image` na may kaugnayan sa tray icon na ito.

#### `tray.setPressedImage(image)` _macOS_

* `image` [NativeImage](native-image.md) (String)

Nagseset sa `image`na may kaugnayan sa tray icon kapag pinindot ang macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Nagseset sa hover text para sa tray icon na ito.

#### `tray.setTitle(title)` _macOS_

* `title` String

Sets the title displayed next to the tray icon in the status bar (Support ANSI colors).

#### `tray.getTitle()` _macOS_

* `title` String

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setHighlightMode(mode)` _macOS_

* `mode` String - Highlight mode with one of the following values:
  * `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
  * `palagi` - Palaging ihighlight ang tray icon.
  * `hindikailanman` - Hindi kailanman ihighlight ang tray icon.

Nagseset kapang ang tray's icon background ay nagiging highlighted(sa asul).

**[Deprecated](breaking-changes.md#tray)**

**Note:**Maari mong gamitin ang`highlightMode`sa isang [`BrowserWindow`](browser-window.md)sa pamamagitan ng toggling sa pagitan `'never'` and `'always'` modes kapag ang window visibility ay nagbago.

```javascript
const { BrowserWindow, Tray } = nangangailanganng('electron')

const win = bagong BrowserWindow({ width: 800, height: 600 })
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

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `huwag pansinin` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal) -
  * `title` String
  * `content` String

Nagdidisplay ng isang tray balloon.

#### `tray.popUpContextMenu([menu, position])` _macOS_ _Windows_

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - Ang posisyon ng pop up.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

Ang`position` ay tanging magagamit sa Windows, at ito ay (0, 0) sa pamamagitan ng default,.

#### `tray.setContextMenu(menu)`

* `menu` Menu | null

Nagseset ng context menu para sa icon na ito.

#### `tray.getBounds()` _macOS_ _Windows_

Nagbabalik[`Rectangle`](structures/rectangle.md)

Ang `bounds`ng tray icon na ito bilang isang`Object`.

#### `tray.isDestroyed()`

Nagbabalik`Boolean` -Kahit pa ang tray icon ay nawasak.

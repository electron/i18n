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

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag nag click ang tray icon.

#### Event: 'right-click' *macOS* *Windows*

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted kapag nai-right click ang tray icon.

#### Event: 'double-click' *macOS* *Windows*

Pagbabalik ng:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

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

Ibinabalik ang:

* `kaganapan` Kaganapan
* `files` String[] -Ang mga landas ng mga binitiwang mga file.

Emitted kapag ang dragged na mga file ay ibinagsak sa tray icon.

#### Event: 'drop-text' *macOS*

Ibinabalik ang:

* `kaganapan` kaganapan
* `text` String -ang mga binitiwang text string.

Emitted kapag ang dragged text ay ibinagsak sa tray icon.

#### Event: 'drag-enter' *macOS*

Emitted kapag ang drag operation ay pumapasok sa tray icon.

#### Event: 'drag-leave' *macOS*

Emitted kapag ang drag operation ay lumabas sa tray icon.

#### Event: 'drag-end' *macOS*

Emitted kapag ang drag operation ay nagtatapos sa tray o nagtatapos sa ibang lugar.

#### Event: 'mouse-enter' *macOS*

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay pumapasok sa tray icon.

#### Event: 'mouse-leave' *macOS*

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay lumalabas sa tray icon.

#### Event: 'mouse-move' *macOS* *Windows*

Ibinabalik ang:

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

#### `tray.setPressedImage(image)` *macOS*

* `image` [NativeImage](native-image.md) (String)

Nagseset sa `image`na may kaugnayan sa tray icon kapag pinindot ang macOS.

#### `tray.setToolTip(toolTip)`

* `toolTip` String

Nagseset sa hover text para sa tray icon na ito.

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

* `options` Bagay 
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. Ng default ay `tama`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Ang default ay `false`. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Ang default ay `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Nagdidisplay ng isang tray balloon.

#### `tray.removeBalloon()` *Windows*

Removes a tray balloon.

#### `tray.focus()` *Windows*

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

#### `tray.popUpContextMenu([menu, position])` *macOS* *Windows*

* `menu` Menu (optional)
* `position` [Point](structures/point.md) (optional) - Ang posisyon ng pop up.

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
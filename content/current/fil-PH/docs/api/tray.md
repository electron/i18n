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

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag nag click ang tray icon.

#### Event: 'right-click' _macOS_ _Windows_

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `bounds` [Rectangle](structures/rectangle.md) - Ang hangganan ng tray icon.

Emitted kapag nai-right click ang tray icon.

#### Event: 'double-click' _macOS_ _Windows_

Pagbabalik ng:

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

Ibinabalik ang:

* `event` Event
* `files` String[] -Ang mga landas ng mga binitiwang mga file.

Emitted kapag ang dragged na mga file ay ibinagsak sa tray icon.

#### Event: 'drop-text' _macOS_

Ibinabalik ang:

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

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay pumapasok sa tray icon.

#### Event: 'mouse-leave' _macOS_

Ibinabalik ang:

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `posisyon` [Point](structures/point.md) - Ang posisyon ng event.

Emitted kapag ang mouse ay lumalabas sa tray icon.

#### Event: 'mouse-move' _macOS_ _Windows_

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

Returns `String` - the title displayed next to the tray icon in the status bar

#### `tray.setIgnoreDoubleClickEvents(ignore)` _macOS_

* `huwag pansinin` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### `tray.getIgnoreDoubleClickEvents()` _macOS_

Returns `Boolean` - Whether double click events will be ignored.

#### `tray.displayBalloon(options)` _Windows_

* `options` Object
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Icon to use when `iconType` is `custom`.
  * `iconType` String (optional) - Can be `none`, `info`, `warning`, `error` or `custom`. Default is `custom`.
  * `title` String
  * `content` String
  * `largeIcon` Boolean (optional) - The large version of the icon should be used. Ang Default ay `true`. Maps to [`NIIF_LARGE_ICON`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_large_icon-0x00000020).
  * `noSound` Boolean (optional) - Do not play the associated sound. Ang default ay `false`. Maps to [`NIIF_NOSOUND`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_nosound-0x00000010).
  * `respectQuietTime` Boolean (optional) - Do not display the balloon notification if the current user is in "quiet time". Ang default ay `false`. Maps to [`NIIF_RESPECT_QUIET_TIME`](https://docs.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataa#niif_respect_quiet_time-0x00000080).

Nagdidisplay ng isang tray balloon.

#### `tray.removeBalloon()` _Windows_

Removes a tray balloon.

#### `tray.focus()` _Windows_

Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area.

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

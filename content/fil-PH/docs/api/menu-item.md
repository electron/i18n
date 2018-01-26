## Class: MenuItem

> Magdagdag ng mga aytem sa likas na aplikasyon ng mga menu at konteksto ng mga menu.

Ang proseso: [Main](../glossary.md#main-process)

Tingnan ang [`Menu`](menu.md) para sa mga halimbawa.

### `bagong MenuItem(opsyon)`

* `mga pagpipilian` Bagay 
  * `i-klik` Punsyon (opsyonal) - Ay tatawagin na may `i-klik ang(menuItem, browserWindow, event)` kapag ang aytem ng menu ay na-klik na. 
    * `menuItem` ang MenuItem
    * `browserWindow` ang BrowserWindow
    * `event` Event
  * `role` String (opsyonal) - tukuyin ang aksyon ng mga aytem ng menu, kapag tinukoy ang katangian `click` ay hindi na papansinin. Tingnan ang [roles](#roles).
  * `type` String (opsyonal) - Ay maaaring `normal`, `separator`, `submenu`, `checkbox` o `radio`.
  * `label` String - (opsyonal)
  * `sublabel` String - (opsyonal)
  * `accelerator` [Accelerator](accelerator.md) (opsyonal)
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal)
  * `enabled` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay naka-grey out at hindi maki-klik.
  * `visible` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay lubusang itatago.
  * `checked` Boolean (opsyonal) - Dapat lamang na tinukoy para sa uri ng `checkbox` o `radio` ng mga aytem ng menu.
  * `submenu` (MenuItemConstructorOptions[] | Menu) (opsyonal) - Dapat lamang na tinukoy para sa uri ng `submenu` ng mga aytem ng menu. Kung ang `submenu` ay tinukoy na, ang `type: 'submenu'` ay maaaring tanggalin. Kung ang halaga ay hindi isang `Menu` pagkatapos ito ay awtomatikong iko-konbert sa isa gamit ang `Menu.buildFromTemplate`.
  * `id` String (opsyonal) - Kakaiba sa loob ng nag-iisang menu. Kung tinukoy samakatuwid ito ay maaaring gamitin bilang isang sanggunian sa aytem na ito sa pamamagitan ngkatangian ng posisyon.
  * `position` String (opsyonal) - Ang field na ito ay nagpapahintulot sa pinong kahulugan ng tiyak na lokasyon sa loob ng ibinigay na menu.

### Mga tungkulin

Ang mga tungkulin ay nagpapahintulot sa mga aytem ng menu na may paunang tinukoy na mga katangian.

Ito ang mabisang paraan para matukoy ang `role` para sa kahit anong aytem ng menu na pumaparehas sa standard na tungkulin, sa halip na manu-manong sinusubukang i-implementa ang katangian sa isang punsyon ng `click`. Ang dati ng gawang katangian ng `role` ay magbibigay ng pinakanatural na karanasan.

Ang mga halaga ng `label` at `accelerator` ay opsyonal kapag ginagamit ang`role` at magiging default sa naaangkop na halaga para sa bawat plataporma.

Ang katangian ng `role` ay maaaring ang mga sumusunod na halaga:

* `ang ibalik sa dating ginawa`
* `gawin-ulit`
* `putulin`
* `kopyahin`
* `idikit`
* `istilongidikitatipares`
* `piliinlahat`
* `idilit`
* `minimize` - Paliitin ang kasalukuyang window
* `close` - Isara ang kasalukuyang window
* `quit` - Alisin ang aplikasyon
* `reload` - Ikarga ulit ang kasalukuyang window
* `forceload` - Ikarga ulit ang kasalukuyang window nang hindi pinapansin ang cache.
* `toggledevtools` - Mga gamit ng taga-buo ng toggle sa kasalukuyang window
* `togglefullscreen`- Toggle full screen mode on the current window
* `resetzoom` - Reset the focused page's zoom level to the original size
* `zoomin` - Zoom in the focused page by 10%
* `zoomout` - Zoom out the focused page by 10%
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.)

The following additional roles are available on macOS:

* `about` - Map to the `orderFrontStandardAboutPanel` action
* `hide` - Map to the `hide` action
* `hideothers` - Map to the `hideOtherApplications` action
* `unhide` - Map to the `unhideAllApplications` action
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### Humahalimbawa sa bahagi nito

The following properties are available on instances of `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event
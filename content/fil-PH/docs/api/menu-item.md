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
* `togglefullscreen` - I-togel ang buong iskrin na moda ng kasalukuyang window
* `resetzoom` - I-set na muli ang lebel na pampalaki sa orihinal na sukat ng nakapokus na pahina
* `zoomin` - Palakihin ang nakapokus na pahina ng 10 porsyento
* `zoomout` - Paliitin ang nakapokus na pahina ng 10 porsyento
* `editMenu` - Ang kabuoang default na menu ng "Edit" (Undo, Kopya, atbp.)
* `windowMenu` - Ang kabuoang default na menu ng "Window" (Paliitin, Isara, atbp.)

Ang mga sumusunod na karagdagang mga tungkulin ay makukuha sa macOS:

* `about` - Ibalangkas sa mga aksyon ng `orderFrontStandardAboutPanel`
* `hide` - Ibalangkas sa mga aksyon ng `hide`
* `hideothers` - Ibalangkas sa mga aksyon ng `hideOtherApplicatios`
* `unhide` - Ibalangkas sa mga aksyon ng `unhideAllApplications`
* `startspeaking` - Ibalangkas sa mga aksyon ng `startspeaking`
* `stopspeaking` - Ibalangkas sa mga aksyon ng `stopspeaking`
* `front` - Ibalangkas sa mga aksyon ng `arrangeInFront`
* `zoom` - Ibalangkas sa mga aksyon ng `performZoom`
* `window` - Ang submenu ay isang menu ng "Window"
* `help` - Ang submenu ay isang menu ng "Help"
* `services` - Ang submenu ay isang menu ng "Services"

Kapag tinutukoy ang isang `role` sa macOS, ang `label` at ang `accelerator` ay ang tanging opsyon na makaka-apekto sa aytem ng menu. Lahat ng ibang opsyon ay hindi papansinin.

### Mga Katangian ng Instansya

Ang mga sumusunod na mga katangian ay makukuha sa mga instansya ng `MenuItem`:

#### `ang menuItem.enabled`

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
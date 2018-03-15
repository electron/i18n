## Class: MenuItem

> Magdagdag ng mga aytem sa likas na aplikasyon ng mga menu at konteksto ng mga menu.

Proseso:[Pangunahi](../glossary.md#main-process)

Tingnan ang [`Menu`](menu.md) para sa mga halimbawa.

### `bagong MenuItem(opsyon)`

* `pagpipilian` Bagay 
  * `i-klik` Punsyon (opsyonal) - Ay tatawagin na may `i-klik ang(menuItem, browserWindow, event)` kapag ang aytem ng menu ay na-klik na. 
    * `menuItem`MenuItem
    * `browserWindow` ang BrowserWindow
    * `kaganapan` kaganapan
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

* `undo`
* `redo`
* `cut`
* `kopyahin`
* `paste`
* `istilongidikitatipares`
* `piliinlahat`
* `delete`
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
* `toggletabbar` - Map to the `toggleTabBar` action
* `selectnexttab` - Map to the `selectNextTab` action
* `selectprevioustab` - Map to the `selectPreviousTab` action
* `mergeallwindows` - Map to the `mergeAllWindows` action
* `movetabtonewwindow` - Map to the `moveTabToNewWindow` action
* `window` - Ang submenu ay isang menu ng "Window"
* `help` - Ang submenu ay isang menu ng "Help"
* `services` - Ang submenu ay isang menu ng "Services"

Kapag tinutukoy ang isang `role` sa macOS, ang `label` at ang `accelerator` ay ang tanging opsyon na makaka-apekto sa aytem ng menu. Lahat ng ibang opsyon ay hindi papansinin.

### Mga Katangian ng Instance

Ang mga sumusunod na mga katangian ay makukuha sa mga instansya ng `MenuItem`:

#### `ang menuItem.enabled`

Ang isang `Boolean` ay nagpapakita kung ang aytem ay pinagana na, ang katangian na ito ay maaaring mabago ng matindi.

#### `ang menuItem.visible`

Ang isang `Boolean` ay nagpapakita kung ang aytem ay nakikita, ang katangian na ito ay maaaring mabago ng matindi.

#### `ang menuItem.checked`

Ang isang `Boolean` ay nagpapakita kung ang aytem ay nasuri na, ang katangian na ito ay maaaring mabago ng matindi.

Ang isang `checkbox` na aytem ng menu ay ito-toggle ang katangian ng `checked` ng pagbukas at pagpatay kapag napili.

Ang isang `radio` na aytem ng menu ay bubuksan ang kanyang `checked` na katangian kapag na-klik, at papatayin ang nasabing katangian para sa lahat ng mga katabing aytem sa loob ng parehong menu.

Maaari kang magdagdag ng isang punsyon ng `click` para sa karagdagang gawain.

#### `ang menuItem.label`

Ang isang `String` ay kumakatawan sa mga aytem ng menu sa nakikitang tatak

#### `ang menuItem.click`

Ang isang `Function` na ititira kapag natanggap ng MenuItem ang isang event ng klik
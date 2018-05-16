## Class: MenuItem

> Magdagdag ng mga aytem sa likas na aplikasyon ng mga menu at konteksto ng mga menu.

Proseso:[Pangunahi](../glossary.md#main-process)

Tingnan ang [`Menu`](menu.md) para sa mga halimbawa.

### `bagong MenuItem(opsyon)`

* `pagpipilian` Bagay 
  * `i-klik` Punsyon (opsyonal) - Ay tatawagin na may `i-klik ang(menuItem, browserWindow, event)` kapag ang aytem ng menu ay na-klik na. 
    * `menuItem`MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `kaganapan` kaganapan
  * `role` String (opsyonal) - tukuyin ang aksyon ng mga aytem ng menu, kapag tinukoy ang katangian `click` ay hindi na papansinin. Tingnan ang [roles](#roles).
  * `type` String (opsyonal) - Ay maaaring `normal`, `separator`, `submenu`, `checkbox` o `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (opsyonal)
  * `icon` ([NativeImage](native-image.md) | String) (opsyonal)
  * `enabled` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay naka-grey out at hindi maki-klik.
  * `visible` Boolean (opsyonal) - Kung hindi totoo, ang aytem ng menu ay lubusang itatago.
  * `checked` Boolean (opsyonal) - Dapat lamang na tinukoy para sa uri ng `checkbox` o `radio` ng mga aytem ng menu.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. Kung ang `submenu` ay tinukoy na, ang `type: 'submenu'` ay maaaring tanggalin. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
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
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - Minimize current window.
* `close` - Close current window.
* `quit`- Quit the application.
* `reload` - Reload the current window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen`- Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

The following additional roles are available on *macOS*:

* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Katangian ng pagkakataon

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

A `String` representing the menu items visible label.

#### `ang menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.
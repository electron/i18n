# webContents

> Ibigay at kontrolin ang mga web page.

Proseso:[Pangunahi](../glossary.md#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay responsable sa pag-render at pagkontrol sa isang web page at bagay na ari-arian ng [`BrowserWindow`](browser-window.md). Isang halimbawa ng pag-access sa `webContents` bagay:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Mga Paraan

Ang mga pamamaraan na ito ay Maaaring ma-access mula sa module na ` webContents`:

```javascript
const { webContents } = nangangailangan ('elektron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Ibinabalik `WebContents[]` - Ang array ng lahat `WebContents`ng mga pagkakataon.  . Ito ay naglalaman ng mga nilalaman ng web para sa lahat ng mga windows, webviews, binuksan devtools, at devtools karugtong ng background na mga pahina.

### `webContents.getFocusedWebContents()`

Ibinabalik `WebContents` - Ang mga nilalaman ng web na nakatuon sa application na ito, kung hindi man babalik `null`.

### `webContents.fromId(id)`

* `id` Integer

Ibinabalik ang `WebContents` - Halimbawa ng WebContents na may ibinigay na ID.

## Klase: WebContents

> Ibigay at kontrolin ang mga nilalaman na halimbawa ng BrowserWindow.

Proseso: [pangunahin](../glossary.md#main-process)

### Halimbawa ng mga Event

#### Kaganapan: 'ginawa-tapusin-dala'

Binubuwag kapag ang nabigasyon ay tapos na, i.e. ang spinner ng tab ay tumigil Umiikot, at ang `onload` kaganapan ay ipinadala.

#### Kaganapan: 'ginawa-mabibigo-dala'

Ibinabalik ang:

* `event` na Kaganapan
* `pagkakamalingCode`kabuuan
* `Paglalarawan ng pagkakamali`tali
* `napatunayan sa Url`tali
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. Ang buong listahan ng mga error code at ang kanilang mga kahulugan ay magagamit [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'did-fail-provisional-load'

Pagbabalik ng:

* `event` na Pangyayari
* `pagkakamalingCode`kabuuan
* `Paglalarawan ng pagkakamali`tali
* `napatunayan sa Url`tali
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Kaganapan: 'ginawa-frame-finish-load'

Magbabalik ng:

* `kaganapan` kaganapan
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Napalabas kapag ang frame ay nagawa na ang nabigasyon.

#### Kaganapan: 'did-start-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay nagsimulang umikot.

#### Kaganapan: 'did-stop-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay tumigil sa pagikot.

#### Kaganapan: 'dom-ready'

Ibinabalik ang:

* `kaganapan` Kaganapan

Napalabas kapag ang dokumento na ibinigay sa frame ay na-load.

#### Event: 'page-title-updated'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Kaganapan: 'pahina-favicon-updated'

Ibinabalik ang:

* `event` Event
* `favicons` String[] - Hanay ng mga URL.

Pinapalabas kapag natanggap ng pahina ang mga url ng favicon.

#### Kaganapan: 'bagong-bintana'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `frameName` Pisi
* `Disposisyon` String - Maaaring `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` at `iba pang`.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `Mga karagdagang tampok` String [] - Ang di-karaniwang mga tampok (mga tampok na hindi hinahawakan sa pamamagitan ng Kromo o Elektron) na ibinigay sa `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

Sa pamamagitan ng default ng isang bagong `BrowserWindow` ay nilikha para sa `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Halimbawa:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
  event.preventDefault()
  const win = new BrowserWindow({
    webContents: options.webContents, // use existing webContents if provided
    show: false
  })
  win.once('ready-to-show', () => win.show())
  if (!options.webContents) {
    win.loadURL(url) // existing webContents will be navigated automatically
  }
  event.newGuest = win
})
```

#### Kaganapan: 'mag-navigate'

Ibabalik:

* `kaganapan` Kaganapan
* `url` Tali

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Ang kaganapang ito ay hindi naglalabas kapag ang navigation ay nagsimula sa programming kasama ng mga API ay tulad ng `webContents.loadURL` at `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Ang pagtawag sa `kaganapan.preventDefault()` ay maiiwasan ang nabigasyon.

#### Event: 'did-start-navigation'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Pisi
* `isInPlace` Boolean
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `isInPlace` Boolean
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation.  For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Tali
* `isInPlace` Boolean
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation.  For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Kaganapan: 'ginawa-navigate'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Kaganapan: 'ginawa-navigate-in-page'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `ay pangunahing kuwadro` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

Kapag nangyayari ang pag-navigate sa pahina, ang pahina ng URL ay nagbabago ngunit hindi ito magiging dahilan ng nabigasyon sa labas ng pahina. Ang mga halimbawa ng nangyari ay kapag ang mga anchor link ay na-click o kapag ang DOM `hashchange` at ang kaganapan ay na-trigger.

#### Kaganapan: 'will-prevent-unload'

Ibinabalik ang:

* `kaganapan` Kaganapan

Naipalalabas kapag ang `beforeunload` ay sinusubukan ng tagahawak ng kaganapan na kanselahin ang pag-unload ng pahina.

Ang pagtawag sa `kaganapan.preventDefault()` ay hindi papansinin ang `beforeunload` tagahawak ng kaganapan at pahihintulutan ang pahina na ito ay i-unload.

```javascript
const { BrowserWindow, dialog } = nangangailangan('elektron')
const manalo = bagong BrowserWindow ({ width: 800, height: 600 })
manalo.webContents.on('will-prevent-unload', (kaganapan) => {
  const pagpili = dialog.showMessageBox(manalo, {
    uri: 'tanong',
    mga buton: ['Umalis', 'Manatili'],
    pamagat: 'Gusto mo bang umalis sa site na ito?',
    mensahe: 'Ang mga pagbabagong ginawa mo ay maaaring hindi mai-save.',
    defaultId: 0,
    cancelId: 1
  })
  const umalis = (pagpili === 0)
  kung (umalis) {
    kaganapan.preventDefault()
  }
})
```

#### Kaganapan: 'nag-crash'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `killed` Ang Boolean

Lumalabas kapag ang proseso ng tagapag-render ay nasira o pinatay.

#### Kaganapan: 'hindi tumutugon'

Ay lalabas kapag ang pahina ng web ay hindi tumutugon.

#### Kaganapan: 'tumutugon'

Ay lalabas kapag ang hindi tumutugon na pahina ng web ay tumutugon ulit.

#### Kaganapan: 'plugin-nag-crash'

Ibinabalik ang:

* `event` Ang event
* `name` String
* `Bersyon` Pisi

Lumalabas kapag ang proseso ng plugin ay nag-crash.

#### Kaganapan: 'nawasak'

Nagpapalabas kapag ang `webContents` ay nawasak.

#### Kaganapan: 'bago-input-kaganapan'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `input` Object - Input properties.
  * `uri` Pisi - Alinman `keyUp` o `keyDown`.
  * `susi` Pisi - Katumbas ng [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` Pisi - Katumbas ng [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Katumbas ng [KeyboardEvent.ulitin](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Katumbas ng [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `kontrol` Boolean - Katumbas ng [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Katumbas ng [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Katumbas ng [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Pinapalabas bago ipadala ang `keydown` at `keyup` mga kaganapan sa pahina. Ang pagtawag sa `kaganapan.preventDefault` ay mapipigilan ang pahina `keydown`/`keyup` ng mga kaganapanat at ng shortcut sa menu.

Upang mapigilan lamang ang mga shortcut sa menu, gamitin ang [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  manalo.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'enter-html-full-screen'

Ay lalabas kapag pumasok ang window ng isang full-screen na estado ayy na-trigger ng HTML API.

#### Event: 'leave-html-full-screen'

Ay lalabas kung ang window ay aalis na sa full-screen na estado ay na-trigger ng HTML API.

#### Event: 'zoom-changed'

Ibinabalik ang:
* `kaganapan` Kaganapan
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Kaganapan: 'devtools-binuksan'

Nilalabas kapag ang DevTools ay nabuksan.

#### Kaganapan: 'devtools-sarado'

Nilalabas kapag ang DevTools ay sarado.

#### Kaganapan: 'devtools-nakatuon'

Nilalabas kapag ang DevTools ay nakatuon/binuksan.

#### Mga event: 'certificate-error'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali
* `error` String - Ang code ng error.
* `certificate` [Certificate](structures/certificate.md)
* `callback` na Function
  * `isTrusted` Boolean - ay nagpapahiwatig kung ang sertipiko ay maaaring ituring na pinagkakatiwalaan.

Naipalalabas kapag nabigo upang i-verify ang `sertipiko` para sa `url`.

Ang paggamit ay pareho sa [ang kaganapan `certificate-error` ng `app` ](app.md#event-certificate-error).

#### Event: 'select-client-certificate'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Ang URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` na Function
  * `sertipiko` [Sertipiko](structures/certificate.md) - Dapat ay isang sertipiko mula sa ibinigay na listahan.

Lalabas kapag ang sertipiko ng kliyente ay hiniling.

Ang paggamit ay pareho sa [ang kaganapan `piliin-client-sertipiko`ng `app`](app.md#event-select-client-certificate).

#### Event: 'login'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `authenticationResponseDetails` Object
  * `url` Ang URL
* `authInfo` Object
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` na Function
  * `username` String (optional)
  * `password` String (optional)

Lalabas kapag ang `webContents` ay gustong gawin ang basic auth.

Ang paggamit ay pareho sa [ang kaganapan `login` ng `app`](app.md#event-login).

#### Kaganapan: 'natagpuan-sa-pahina'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong tugma.
  * `tugma` Integer - Bilang ng Mga Tugma.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Naipalalabas kapag ang resulta ay magagamit para sa [`webContents.findInPage`] humiling.

#### Kaganapan: 'media-started-playing'

Naipalalabas kapag nagsimula ng maglaro ang media.

#### Kaganapan: 'media-paused'

Naipalalabas kapag ang media ay naka-nakahinto o tapos na ang pag-play.

#### Kaganapan: 'ginawa-baguhin-tema-kulay'

Ibinabalik ang:

* `kaganapan`Kaganapan
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Kaganapan: 'update-target-url'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali

Inilalabas kapag gumagalaw ang mouse sa isang link o inililipat ng keyboard ang focus sa isang link.

#### Kaganapan: 'cursor-changed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `uri` Pisi
* `image` [NativeImage](native-image.md) (opsiyonal)
* `scale` Lumutang (opsyonal) - scaling factor para sa mga pasadyang cursor.
* `sukat` [Sukat](structures/size.md) (opsyonal) - ang sukat ng `imahe`.
* `hotspot` [Punto](structures/point.md) (opsyonal) - mga coordinate ng hotspot ng pasadyang cursor.

Naipalalabas kapag ang uri ng cursor ay nagbago. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Kaganapan: 'context-menu'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `params` Object
  * `x` Integer - x coordinate.
  * `y` Integer - y coordinate.
  * `linkURL` Pisi - ang link ng URL na nakapaloob sa node sa menu ng konteksto ay tinawag sa.
  * `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` Pisi - ang URL ng tuktok na antas ng pahina na ang menu ng konteksto ay nananawagan.
  * `frameURL` Pisi - Ang URL ng subframe na ang menu ng konteksto ay nananawagan sa.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` Pisi - Uri ng node sa menu ng konteksto ay tinawag sa. Maaaring `walang`, `imahe`, `audio`, `video`, `canvas`, `file` o `plugin`.
  * `hasImageContents` Boolean - Kung ang menu ng konteksto ay ginagamit sa isang imahe na may mga walang laman na nilalaman.
  * `isEditable` Boolean - Kung ang konteksto ay maaring i-edit.
  * `selectionText` Pisi - Teksto ng pagpili na ang menu ng konteksto ay nananawagan.
  * `titleText` Pisi - Pamagat o alt teksto ng pagpili na ang konteksto ay tinawag sa.
  * `misspelledWord` Pisi - Ang maling salita sa ilalim ng cursor, kung mayroon man.
  * `dictionarySuggestions` String[] - An array of suggested words to show the user to replace the `misspelledWord`.  Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` Pisi - Ang encoding ng karakter ng frame kung saan hiniling ang menu.
  * `inputFieldType` Pisi - Kung ang konteksto ng menu ay sinasabing sa isang patlang na input, ang uri ng patlang na iyon. Ang posibleng mga halaga ay `wala`, `plainText`, `password`, `iba pang`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` Boolean - Kung ang elemento ng media ay bumagsak.
    * `isPaused` Boolean - Kung ang elemento ng media ay nakahinto.
    * `ayMuted` Boolean - Kung naka-mute ang elemento ng media.
    * `hasAudio` Boolean - Kung ang elemento ng media ay may audio.
    * `isLooping` Boolean - Kung ang elemento ng media ay looping.
    * `isControlsVisible` Boolean - Kung ang mga kontrol ng elemento ng media ay nakikita.
    * `canToggleControls` Boolean - Kung ang mga kontrol ng elemento ng media ay toggleable.
    * `canRotate` Boolean - Kung ang elemento ng media ay maaaring i-rotate.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` Boolean - Kung naniniwala ang renderer na maaari itong ipawalang bisa.
    * `canRedo` Boolean - Kung naniniwala ang renderer na maaari itong gawing muli.
    * `canCut` Boolean - Kung naniniwala ang renderer na maaari itong i-cut.
    * `canCopy` Boolean - Kung naniniwala ang renderer na maaari itong kopyahin
    * `canPaste` Boolean - Kung naniniwala ang renderer na maaari itong i-paste.
    * `canDelete` Boolean - Kung naniniwala ang renderer na maaari itong tanggalin.
    * `canSelectAll` Boolean - Kung naniniwala ang taga-render na maaari nilang piliin ang lahat.

Lumabas kapag mayroong isang bagong menu ng konteksto na kailangang hawakan.

#### Kaganapan: 'select-bluetooth-device'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `Mga aparato` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` na Function
  * `deviceId` String

Ipinalalabas kapag kailangang pumili ng bluetooth device sa tawag sa `navigator.bluetooth.requestDevice`. Upang gamitin ang `navigator.bluetooth` api `webBluetooth` ay dapat na paganahin. Kung ang `kaganapan.preventDefault` ay hindi tinatawag, Ang unang magagamit na aparato ang mapipili. `callback` ay dapat na tawagin `deviceId` na mapipili, magpasa ng walang laman na pisi sa `callback` ay kanselahin ang kahilingan.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Kaganapan: 'pintura'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `dirtyRect` [Parihaba](structures/rectangle.md)
* `imahe` [katutubong larawan](native-image.md) - Ang datos ng imahe ng buong kuwadro.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Kaganapan: 'devtools-kargahan muli-ang pahina'

Binubuwag kapag ang window ng devtools ay nagtuturo sa webContents na kargahan muli

#### Kaganapan: 'naisin-isama-webview'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

Maaaring gamitin ang kaganapang ito upang i-configure ang `webPreferences` para sa `webContents` ng isang `<webview>` bago ang load nito, at nagbibigay ng kakayahang magtakda upang itakda ang mga setting na hindi maaaring itakda sa pamamagitan ng `<webview>` mga katangian.

**Tandaan:** Ang tinutukoy na `preload` Ang opsyon ng script ay lilitaw bilang `preloadURL` (hindi `preload`) nasa `webPreferences` bagay na inilalabas sa kaganapang ito.

#### Kaganapan: 'ginawa-ilakip-webview'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `WebContents` WebContents - Ang mga nilalaman ng bisita ng web na ginagamit ang `<webview>`.

Naipalalabas kapag ang isang `<webview>` ay naka-attach sa mga nilalaman ng web na ito.

#### Event: 'console-message'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `level` Integer
* `mensahe` Tali
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Event: 'ipc-message'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `channel` String
* `...args` anuman[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `channel` String
* `...args` anuman[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

Ibinabalik ang:

* `kaganapan` Kaganapan

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.

#### Event: 'remote-require'

Ibinabalik ang:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-global'

Ibinabalik ang:

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-builtin'

Ibinabalik ang:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-window'

Ibinabalik ang:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-web-contents'

Ibinabalik ang:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-guest-web-contents'

Ibinabalik ang:

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Mga Paraan ng Halimbawa

#### `contents.loadURL(url[, mga pagpipilian])`

* `url` Tali
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` Pisi (opsyonal) - Base url (na may trailing path separator) para sa mga dokumento na mai-load ng url ng data. Ito ay kailangan kung ang tinutukoy ng `url` iy isang datos ng url at kailangan maikarga sa ibang dokumento.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Naglo-load ang `url` sa bintana. Ang `url` ay dapat naglalaman ng prefix ng protocol, hal. ang `http://` o `file://`. Kung ang load ay dapat mag-bypass http cache pagkatapos gamitin ang `pragma` header upang makamit ito.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application.  For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Would require code like this

```js
win.loadFile('src/index.html')
```

#### `mga nilalaman.downloadURL(url)`

* `url` Tali

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `mga nilalaman.getURL()`

Ibinabalik `Pisi` - Ang URL ng kasalukuyang web page.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `mga nilalaman.getTitle()`

Ibinabalik `Pisi` - Ang pamagat ng kasalukuyang web page.

#### `mga nilalaman.isDestroyed()`

Ibinabalik `Boolean` - Kung ang web page ay nawasak.

#### `mga nilalaman.focus()`

Nakatutok sa web page.

#### `mga nilalaman.isFocused()`

Ibinabalik `Boolean` - Kung nakatutok ang web page.

#### `mga nilalaman.isLoading()`

Ibinabalik `Boolean` - Kung ang pahina ng web ay naglo-load ng mga mapagkukunan.

#### `mga nilalaman.isLoadingMainFrame()`

Ibinabalik `Boolean` - Kung ang pangunahing frame (at hindi lamang mga iframe o mga frame sa loob nito) ay naglo-load pa rin.

#### `mga nilalaman.isWaitingForResponse()`

Ibinabalik `Boolean` - Kung naghihintay ang pahina ng web para sa unang tugon mula sa pangunahing mapagkukunan ng pahina.

#### `mga nilalaman.ihinto()`

Hinihinto ang anumang nakabinbing nabigasyon.

#### `mga nilalaman.reload()`

I-reload ang kasalukuyang web page.

#### `mga nilalaman.reloadIgnoringCache()`

Mga Reloads ng kasalukuyang pahina at binabalewala ang cache.

#### `mga nilalaman.canGoBack()`

Ibinabalik `Boolean` - Kung ang browser ay maaring bumalik sa nakaraang pahina ng web.

#### `mga nilalaman.canGoForward()`

Ibinabalik `Boolean` - Kung ang browser ay maaring magpatuloy sa susunod na pahina ng web.

#### `mga nilalaman.canGoToOffset(offset)`

* `offset` Integer

Ibinabalik `Boolean` - Kung ang pahina ng web ay maaring pumunta sa `offset`.

#### `mga nilalaman.clearHistory()`

Linisin ang kasaysayan ng nabigasyon.

#### `mga nilalaman.goBack()`

Ginagawang bumalik ang browser sa isang pahina ng web.

#### `mga nilalaman.goForward()`

Ginagawa ang browser na pumunta sa isang pahina ng web.

#### `mga nilalaman.goToIndex(index)`

* `index` Integer

Naka-navigate ang browser sa tinukoy na ganap sa pahina ng web na index.

#### `mga nilalaman.goToOffset(offset)`

* `offset` Integer

Ang nabigasyon sa tinutukoy na offset galing sa "kasalukuyang entri".

#### `mga nilalaman.isCrashed()`

Ibinabalik `Boolean` - Kapag ang proseso ng tagapag-render ay nawasak.

#### `mga nilalaman.setUserAgent(userAgent)`

* `userAgent` na String

Naka-override ang ahenteng gumagamit para sa pahina ng web na ito.

**[Deprecated](modernization/property-updates.md)**

#### `mga nilalaman.getUserAgent()`

Ibinabalik`Pisi` - Ang ahenteng gumagamit para sa pahina ng web na ito.

**[Deprecated](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` Pisi
* `options` Object (optional)
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', function () {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async function () {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (opsyonal) - Default ay `huwad`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sinusuri ang mga `code` sa pahina.

Sa window ng browser ang ilang mga HTML API tulad ng `requestFullScreen` ay maaari lamang nananawagan ng kilos mula sa gumagamit. Ang pagtatakda ng `userGesture` sa `totoo` ay alisin ang limitasyon na ito.

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript ('fetch("https://jsonplaceholder.typicode.com/users/1").
pagkatapos(resp => resp.json())', totoo)
  . pagkatapos((resulta) => {
    console.log(resulta) // Ang magiging JSON na bagay mula sa pagkuha ng tawag
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsyonal) - Default ay `huwad`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts(huwag pansinin)` _Eksperimento_

* `huwag pansinin` Boolean

Huwag pansinin ang mga shorcut menu ng aplikasyon habang ang mga nilalaman ng web na ito ay nakatuon.

#### `contents.setAudioMuted(naka-mute)`

* `muted` Boolean

I-mute ang audio sa kasalukuyang web na page.

**[Deprecated](modernization/property-updates.md)**

#### `mga nilalaman.ng AudioMuted()`

Bumalik `Boolean` - Kung naka-mute ang pahinang ito.

**[Deprecated](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `mga nilalaman.setZoomFactor(kadahilanan)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

**[Deprecated](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

**[Deprecated](modernization/property-updates.md)**

#### `mga nilalaman.setZoomLevel(antas)`

* `antas` Numero - antas ng Zoom.

Binabago ang antas ng pag-zoom para sa tinitiyak na antas. Ang orihinal na laki ng 0 at bawat isa Ang pagdagdag sa pagtaas o sa pagbaba ay kumakatawan sa pag-zooming ng 20% na mas malaki o mas maliit sa default mga limitasyon ng 300% at 50% ng orihinal na laki, ayon sa pagkakabanggit. The formula for this is `scale := 1.2 ^ level`.

**[Deprecated](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

**[Deprecated](modernization/property-updates.md)**

#### `mga nilalaman.setVisualZoomLevelLimits(pinakamababang antas, pinakamataas na antas)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Returns `Promise<void>`

Itinatakda ang pinakamataas at pinakamababang antas ng pinch-sa-zoom.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  contents.setVisualZoomLevelLimits(1, 3)`

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _Deprecated_

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Returns `Promise<void>`

Nagtatakda ng pinakamataas at pinakamababa na antas batay sa layout (i.e hindi visual) na antas ng zoom.

**Deprecated:** This API is no longer supported by Chromium.

#### `mga nilalaman.undo()`

Pinapatupad ang command sa pag-edit `undo` sa pahina ng web.

#### `mga nilalaman.redo()`

Pinapatupad ang command sa pag-edit `gawing muli` sa pahina ng web.

#### `mga nilalaman.cut()`

Pinapatupad ang utos sa pag-edit `hiwa` sa pahina ng web.

#### `mga nilalaman.copy()`

Ang pagpapatupad ng utos sa pag-edit `kopya` sa pahina ng web.

#### `mga nilalaman.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Kopyahin ang larawan sa ibinigay na posisyon sa clipboard.

#### `mga nilalaman.paste()`

Pinapatupad ang utos sa pag-edit `paste` sa pahina ng web.

#### `mga nilalaman.pasteAndMatchStyle()`

Ang pagpapatupad ng utos sa pag-edit `pasteAndMatchStyle` sa pahina ng web.

#### `mga nilalaman.delete()`

Pinapatupad ang utos sa pag-edit `tanggalin` sa pahina ng web.

#### `mga nilalaman.selectAll()`

Pinapatupad ang utos sa pag-edit `selectAll` sa pahina ng web.

#### `mga nilalaman.unselect()`

Pinapatupad ang utos sa pag-edit `unselect` sa pahina ng web.

#### `mga nilalaman.replace(text)`

* `text` String

Pinapatupad ang utos sa pag-edit ` palitan ` sa web page.

#### `mga nilalaman. ibalik ang maling pagbaybay(teksto)`

* `text` String

Pinapatupad ang utos sa pag-edit ` palitan ang maling pagbaybay ` sa web page.

#### `mga nilalaman.ipasok ang teksto(teksto)`

* `text` String

Returns `Promise<void>`

Pagsingit `text` para sa nakapukos na elemento.

#### `mga nilalaman.findInPage (teksto [, mga pagpipilian])`

* `teksto` String - Ang nilalaman na hahanapin, ay hindi dapat walang laman.
* `options` Object (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. naka-default sa `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Ibinabalik `Integer` - Ang kahilingang id na ginagamit para sa kahilingan.

Magsisimula ng isang kahilingan upang mahanap ang lahat ng mga tugma para sa `text` sa pahina ng web. Ang resulta ng kahilingan ay maaaring makuha sa pamamagitan ng pag-subscribe sa [`found-in-page`](web-contents.md#event-found-in-page) kaganapan.

#### `mga nilalaman.stopFindInPage(aksyon)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - I-translate ang mga napili para maging normal.
  * `activateSelection` - Ipukos at iclick ang node ng napili.

Hinihinto ang `findInPage` kahilingan para sa `webContents` kasama ang ibinigay na `aksyon`.

```javascript
const { webContents } = nangangailangan('elektron')
webContents.on('found-in-page', (kaganapan, resulta) => {
  kung (resulta.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Ang kabuuan ng page na kukuhanin.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Kumukuha ng isang snapshot ng pahina sa loob ng `rect`. Omitting `rect` will capture the whole visible page.

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The perferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `mga nilalaman.getPrinters()`

Kunin ang listahan ng sistema ng printer.

Ibinabalik [`PrinterInfo[]`](structures/printer-info.md)

#### `mga nilalaman.print([options], [callback])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Ang default ay `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Ang default ay `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Ang Default ay `true`.
  * `margins` Object (optional)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Ang default ay `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Record<string, number> (optional) - The page range to print. Should have two keys: `from` and `to`.
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Object (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
* `callback` Function (opsyonal)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

Nagpiprint ng pahina ng web sa mga window. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

Example usage:

```js
const options = { silent: true, deviceName: 'My-Printer' }
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` Object
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Ang pagpiprint ng pahina ng web ng window bilang PDF kasama ng kromo sa pag preview ng imprenta ng pasadyang mga nagtatakda.

Ang `tanawin` hindi papansinin kung ang `@pahina` CSS sa-panuntunan ay ginagamit sa pahina ng web.

Bilang default, ang isang walang laman na `mga pagpipilian` ay itinuturing na:

```javascript
{
  marginsType: 0,
  printBackground: huwad,
  printSelectionOnly: huwad,
  tanawin: huwad
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

Isang halimbawa ng `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  }).catch(error => {
    console.log(error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = nangangailangan('elektron')
hayaan ang panalo = bagong BrowserWindow()
manalo.webContents.on('devtools-binuksan', () = > {
  manalo.webContents.addWorkSpace(__ dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Tinatanggal ang landas na tinutukoy mula sa DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">
    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

An example of showing devtools in a `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([mga pagpipilian])`

* `options` Object (optional)
  * `mode` String - Binubuksan ang mga devtools na may tinukoy na estado ng dock, ay maaaring maging `kanan`, `ibaba`, `undocked`, `detach`. Mga Default na huling ginagamit sa estado ng dock. Sa `undocked` mode posible na i-dock pabalik. Sa `detach` mode ito ay hindi.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.

Binubuksan ang mga devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `mga nilalaman.closeDevTools()`

Nagsasara ang mga devtools.

#### `mga nilalaman.isDevToolsOpened()`

Ibinabalik `Boolean` - Kung binuksan ang devtools.

#### `mga nilalaman.isDevToolsFocused()`

Ibinabalik `Boolean` - Kung ang view ng devtools ay nakatuon.

#### `mga nilalaman.toggleDevTools()`

Inilipat ang mga kasangkapan ng nag-develop.

#### `mga nilalaman.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Sinimulan ang pag-inspeksyon ng elemento sa posisyon (`x`, `y`).

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `mga nilalaman.inspectServiceWorker()`

Binubuksan ang mga kasangkapan ng nag-develop para sa konteksto ng serbisyo ng manggagawa.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` anuman[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

Isang halimbawa ng pagpapadala ng mga mensahe mula sa pangunahing proseso sa tagapag-render ng proseso:

```javascript
// Sa mga pangunahing proseso.
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer
* `channel` String
* `...args` anuman[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  Halimbawa.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `mga nilalaman.enableDeviceEmulation(mga parameters)`

* `parameters` Object
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Desktop screen type.
    * `mobile` - Uri ng screen ng mobile.
  * `screenSize` [Sukat](structures/size.md) - Itakda ang emulated na laki ng screen (screenPosisyon == mobile).
  * `viewPosition` [Point](structures/point.md) - Iposisyon ang view sa screen (screenPosisyon == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Itakda ang aparato ng scale factor  (kung zero ang default orihinal na kadahilanan ng sukat ng aparato) (default: `0`).
  * `viewSize` [Sukat](structures/size.md) - Itakda ang emulated at tignan ang laki (walang laman ang ibig sabihin nito ay walang override)
  * `scale` Lumutang - Sukat ng emulated view sa loob ng magagamit na espasyo (hindi angkop upang tignan ang mode) (default: `1`).

Paganahin ang aparato pagtulad sa ibinigay na mga parameter.

#### `mga nilalaman.disableDeviceEmulation()`

Huwag paganahin ang pagtulad ng aparato na pinagana ng `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Nagpapadala ng input na `event` sa page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `mga nilalaman.beginFrameSubscription([onlyDirty ,]tumawagmuli)`

* `onlyDirty` Boolean (opsyonal) - Mga Default sa `huwad`.
* `callback` na Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Parihaba](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

Ang `dirtyRect` ay isang bagay na may `x, y, lapad, taas ` ang mga katangian na iyon ay naglalarawan kung aling bahagi ng pahina ay pinahiran. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type.
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

Pinapakita ang pop-up na diksyonaryo na naghahanap ng mga napiling salita sa page.

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

**[Deprecated](modernization/property-updates.md)**

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

**[Deprecated](modernization/property-updates.md)**

#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy.
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### Mga Katangian ng Instance

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 60 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` _Readonly_

A `Integer` representing the unique ID of this WebContents.

#### `contents.session` _Readonly_

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` _Readonly_

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.

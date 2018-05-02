# webContents

> Ibigay at kontrolin ang mga web page.

Proseso:[Pangunahi](../glossary.md#main-process)

`WebContents ` ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay responsable sa pag-render at pagkontrol sa isang web page at bagay na ari-arian ng [`BrowserWindow`](browser-window.md). Isang halimbawa ng pag-access sa `webContents` bagay:

```javascript
const {BrowserWindow} = nangangailangan ('elektron')

hayaang manalo = bagong BrowserWindow({lapad: 800, taas: 1500})
manalo.loadURL ('http://github.com')

hayaan ang mga nilalaman =manalo.webContents
console.log (mga nilalaman)
```

## Mga Paraan

Ang mga pamamaraan na ito ay Maaaring ma-access mula sa module na ` webContents`:

```javascript
const {webContents} = require('electron')
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

Proseso:[Pangunahi](../glossary.md#main-process)

### Halimbawa ng mga Event

#### Event: 'did-finish-load'

Binubuwag kapag ang nabigasyon ay tapos na, i.e. ang spinner ng tab ay tumigil Umiikot, at ang `onload` kaganapan ay ipinadala.

#### Event: 'did-fail-load'

Ibinabalik ang:

* `event` na Kaganapan
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Ang kaganapang ito ay tulad ng `did-finish-load` ngunit inilalabas kapag nabigo ang pag load o kinansela, hal. `window.stop() ` ay ginagamit. Ang buong listahan ng mga error code at ang kanilang mga kahulugan ay magagamit [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Event: 'did-frame-finish-load'

Ibinabalik ang:

* `event` na Pangyayari
* `ay pangunahing kuwadro` Boolean

Napalabas kapag ang frame ay nagawa na ang nabigasyon.

#### Event: 'did-start-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay nagsimulang umikot.

#### Event: 'did-stop-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay tumigil sa pagikot.

#### Event: 'did-get-response-details'

Ibinabalika ang:

* `event` Event
* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* ang `referer` String
* `headers` Objek
* `resourceType` String

Pinapalabas kapag may mga detalye tungkol sa hiniling na mapagkukunan at magagamit sa `katayuan` ay nagpapahiwatig sa socket connection upang i-download ang mapagkukunan.

#### Event: 'did-get-redirect-request'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* ang `referer` String
* `header` Bagay

Pinapalabas kapag natanggap ang pag-redirect habang humihiling ng mapagkukuhanan.

#### Event: 'dom-ready'

Ibinabalik ang:

* `event` Event

Napalabas kapag ang dokumento na ibinigay sa frame ay na-load.

#### Event: 'page-favicon-updated'

Ibinabalik ang:

* `event` Event
* `favicons` String [] - Mga array ng mga URL.

Pinapalabas kapag natanggap ng pahina ang mga url ng favicon.

#### Event: 'new-window'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Tali
* `frameName` String
* `disposition` String- Pwedeng `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `Mga karagdagang tampok` String [] - Ang di-karaniwang mga tampok (mga tampok na hindi hinahawakan sa pamamagitan ng Kromo o Elektron) na ibinigay sa `window.open()`.

Lumalabas kapag ang pahina ay humiling na magbukas ng bagong bintana para sa isang `url`. Maaaring ito ay hiniling ng `window.open` o isang panlabas na link tulad ng `<a target='_blank'>`.

Sa pamamagitan ng default ng isang bagong `BrowserWindow` ay nilikha para sa `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Halimbawa:

```javascript
myBrowserWindow.webContents.on('bagong-window', (event, url) => {
  kaganapan.preventDefault()
  const manalo = bagong BrowserWindow ({show: false})
  manalo.once ('ready-to-show', () = > win.show())
  manalo.loadURL (url)
  kaganapan.newGuest = manalo
})
```

#### Event: 'will-navigate'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Tali

Ilabas kapang ang user o ang mismong page ay gustong magsimula ng nabigasyon. Ito'y pwedeng mangyari kapag ang `window.location` ng objek ay nabago o ang kiniclick ng user ang link sa page.

Ang kaganapang ito ay hindi naglalabas kapag ang navigation ay nagsimula sa programming kasama ng mga API ay tulad ng `webContents.loadURL` at `webContents.back`.

Hindi rin ito nagpapalabas para sa pag-navigate sa pahina, tulad ng pag-click sa mga link ng anchor o pag-update ng `bintana.lokasyon.hash` Gamit ang `ginawa-navigate-sa-pahina`at mga kaganapan para sa layuning ito.

Ang pagtawag sa `kaganapan.preventDefault()` ay maiiwasan ang nabigasyon.

#### Event: 'did-navigate'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `url` Tali

Nilalabas kapag natapos na ang nabigasyon.

Ang event na ito ay hindi ilalabas habang nasa nabigasyon sa loog ng page, gaya ng pag-click sa naka-ankor na mga link o naka-update ang `window.location.hash`. Gamitin ang event na `did-navigate-in-page` para sa layuning ito.

#### Event: 'did-navigate-in-page'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Tali
* `ay pangunahing kuwadro` Boolean

Ilalabas kapag nangyari ang nabigasyon sa loob ng page.

Kapag nangyari ang nabigasyon sa loob ng page, ang URL ng page ay nababago pero hindi ito magiging dahilan sa pag-nanavigate sa labas ng page. Mga halimbawa ng mga pangyayaring ito ay kapag ang naka-ankor na mga link ay naclick o kung ang mga na DOM na `hashchange` ay natrigger.

#### Kaganapan: 'will-prevent-unload'

Ibinabalik ang:

* `kaganapan` kaganapan

Naipalalabas kapag ang `beforeunload` ay sinusubukan ng tagahawak ng kaganapan na kanselahin ang pag-unload ng pahina.

Ang pagtawag sa `kaganapan.preventDefault()` ay hindi papansinin ang `beforeunload` tagahawak ng kaganapan at pahihintulutan ang pahina na ito ay i-unload.

```javascript
const {BrowserWindow, dialog} = nangangailangan('elektron')
const manalo = bagong BrowserWindow ({width: 800, height: 600})
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

#### Event: 'crashed'

Ibinabalik ang:

* `kaganapan` kaganapan
* `killed` Ang Boolean

Lumalabas kapag ang proseso ng tagapag-render ay nasira o pinatay.

#### Event: 'plugin-crashed'

Ibinabalik ang:

* `kaganapan` kaganapan
* `name` String
* `version` String

Lumalabas kapag ang proseso ng plugin ay nag-crash.

#### Event: 'destroyed'

Nagpapalabas kapag ang `webContents` ay nawasak.

#### Kaganapan: 'bago-input-kaganapan'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `input` Object - Input properties. 
  * `type` String - Either `keyUp` or `keyDown`.
  * `key` String - Equivalent to [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` String - Equivalent to [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Equivalent to [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Equivalent to [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `control` Boolean - Equivalent to [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Equivalent to [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Equivalent to [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Pinapalabas bago ipadala ang `keydown` at `keyup` mga kaganapan sa pahina. Ang pagtawag sa `kaganapan.preventDefault` ay mapipigilan ang pahina `keydown`/`keyup` ng mga kaganapanat at ng shortcut sa menu.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const {BrowserWindow} = nangangailangan('elektron')

hayaan ang panalo = bagong BrowserWindow ({lapad: 800, taas: 600})

manalo.webContents.on('bago-input-kaganapan', (kaganapan, input) => {
  // Halimbawa, paganahin lang ang mga shortcut sa keyboard ng menu ng aplikasyon kapag
  / / Ctrl/Cmd ay pababa.
  manalo.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'devtools-opened'

Ilabas kapag ang mga DevTool ay nabuksan.

#### Event: 'devtools-closed'

Ilabas kapag ang mga DevTool ay nasarado.

#### Event: 'devtools-focused'

Ilabas kapag ang mga DevTool ay napukos / nabuksan.

#### Mga event: 'certificate-error'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Tali
* `error` String - The error code.
* `certificate` [Certificate](structures/certificate.md)
* `mulingtawag` Punsyon 
  * `isTrusted` Boolean - Indicates whether the certificate can be considered trusted.

Naipalalabas kapag nabigo upang i-verify ang `sertipiko` para sa `url`.

Ang paggamit ay pareho sa [ang kaganapan `certificate-error` ng `app` ](app.md#event-certificate-error).

#### Event: 'select-client-certificate'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Ang URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Punsyon 
  * `certificate` [Certificate](structures/certificate.md) - Must be a certificate from the given list.

Lalabas kapag ang sertipiko ng kliyente ay hiniling.

Ang paggamit ay pareho sa [ang kaganapan `piliin-client-sertipiko`ng `app`](app.md#event-select-client-certificate).

#### Event: 'login'

Ibinabalik ang:

* `event` Ang event
* `kahilingan` Bagay 
  * `method` na String
  * `url` Ang URL
  * `referrer`Ang URL
* `ang authInfo` Bagay 
  * `isProxy` Ang Boolean
  * `scheme` na String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Punsyon 
  * `username` String
  * `password` String

Lalabas kapag ang `webContents` ay gustong gawin ang basic auth.

Ang paggamit ay pareho sa [ang kaganapan `login` ng `app`](app.md#event-login).

#### Event: 'found-in-page'

Ibinabalik ang:

* `kaganapan` kaganapan
* `resulta` Bagay 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong katugma.
  * `matches` Integer - Bilang ng mga Tugma.
  * `selectionArea` Objek - Mga coordinate ng unang tugmang parte.
  * `finalUpdate` Boolean

Naipalalabas kapag ang resulta ay magagamit para sa [`webContents.findInPage`] humiling.

#### Event: 'media-started-playing'

Ilabas kapag ang medya ay nagsimula.

#### Event: 'media-paused'

Ilabas kapag ang medya ay nahinto o natapos na.

#### Event: 'did-change-theme-color'

Naipalalabas kapag nagbago ang kulay ng tema ng pahina. Ito ay kadalasan dahil sa nakakaharap ng isang meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

Ibinabalik ang:

* `kaganapan` Kaganapan
* `kulay` (String | null) - Ang kulay ng tema ay nasa format na '#rrggbb'. Ito ay `null` kapag walang kulay ng tema na naka-set.

#### Event: 'update-target-url'

Ibinabalik ang:

* `kaganapan` kaganapan
* `url` Tali

Ilabas kapag ang mouse ay napunta sa link o ang keyboard ay nagalaw ang pukos sa link.

#### Kaganapan: 'cursor-changed'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `uri` Pisi
* `image` [NativeImage](native-image.md) (opsiyonal)
* `scale` Float (optional) - scaling factor for the custom cursor.
* `size` [Size](structures/size.md) (optional) - the size of the `image`.
* `hotspot` [Point](structures/point.md) (optional) - coordinates of the custom cursor's hotspot.

Naipalalabas kapag ang uri ng cursor ay nagbago. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Kaganapan: 'context-menu'

Ibinabalik ang:

* `kaganapan` kaganapan
* `params` Bagay 
  * `x` Integer - x coordinate.
  * `y` Integer - y coordinate.
  * `linkURL` Pisi - ang link ng URL na nakapaloob sa node sa menu ng konteksto ay tinawag sa.
  * `linkText` Pisi - Teksto na nauugnay sa link. Maaaring walang laman ang pisi kung ang mga nilalaman ng link ay isang imahe.
  * `pageURL` Pisi - ang URL ng tuktok na antas ng pahina na ang menu ng konteksto ay nananawagan.
  * `frameURL` Pisi - Ang URL ng subframe na ang menu ng konteksto ay nananawagan sa.
  * `srcURL` Pisi - pinagmulang URL para sa elemento na ang menu ng konteksto ay tinawag sa. Ang mga elemento na may mga source URL ay mga imahe, audio at video.
  * `mediaType` Pisi - Uri ng node sa menu ng konteksto ay tinawag sa. Maaaring `walang`, `imahe`, `audio`, `video`, `canvas`, `file` o `plugin`.
  * `hasImageContents` Boolean - Kung ang menu ng konteksto ay ginagamit sa isang imahe na may mga walang laman na nilalaman.
  * `isEditable` Boolean - Kung ang konteksto ay maaring i-edit.
  * `selectionText` Pisi - Teksto ng pagpili na ang menu ng konteksto ay nananawagan.
  * `titleText` Pisi - Pamagat o alt teksto ng pagpili na ang konteksto ay tinawag sa.
  * `misspelledWord` Pisi - Ang maling salita sa ilalim ng cursor, kung mayroon man.
  * `frameCharset` Pisi - Ang encoding ng karakter ng frame kung saan hiniling ang menu.
  * `inputFieldType` Pisi - Kung ang konteksto ng menu ay sinasabing sa isang patlang na input, ang uri ng patlang na iyon. Ang posibleng mga halaga ay `wala`, `plainText`, `password`, `iba pang`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Bagay - Ang mga bandila para sa elemento ng media ang menu ng konteksto ay nananawagan. 
    * `inError` Boolean - Kung ang elemento ng media ay bumagsak.
    * `isPaused` Boolean - Kung ang elemento ng media ay nakahinto.
    * `ayMuted` Boolean - Kung naka-mute ang elemento ng media.
    * `hasAudio` Boolean - Kung ang elemento ng media ay may audio.
    * `isLooping` Boolean - Kung ang elemento ng media ay looping.
    * `isControlsVisible` Boolean - Kung ang mga kontrol ng elemento ng media ay nakikita.
    * `canToggleControls` Boolean - Kung ang mga kontrol ng elemento ng media ay toggleable.
    * `canRotate` Boolean - Kung ang elemento ng media ay maaaring i-rotate.
  * `editFlags` Bagay - Ipinapahiwatig ng mga bandilang ito kung ang nanonood ay naniniwala at ito ay magagawa upang isagawa ang nararapat na pagkilos. 
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
* `callback` Function 
  * `deviceId` na String

Ipinalalabas kapag kailangang pumili ng bluetooth device sa tawag sa `navigator.bluetooth.requestDevice`. Upang gamitin ang `navigator.bluetooth` api `webBluetooth` ay dapat na paganahin. Kung ang `kaganapan.preventDefault` ay hindi tinatawag, Ang unang magagamit na aparato ang mapipili. `callback` ay dapat na tawagin `deviceId` na mapipili, magpasa ng walang laman na pisi sa `callback` ay kanselahin ang kahilingan.

```javascript
const {app, webContents} = nangangailangan('elektron')
app.commandLine.appendSwitch ('enable-web-bluetooth')

app.on ('handa', () => {
  webContents.on('select-bluetooth-device', (kaganapan, deviceList, callback) => {
   kaganapan.preventDefault()
    hayaan ang resulta = deviceList.find((device) => {
      bumalik device.deviceName === 'test'
    })
    kung(!resulta) {
      callback('')
    } else {
      callback(resulta.deviceId)
    }
  })
})
```

#### Kaganapan: 'pintura'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `dirtyRect` [Parihaba](structures/rectangle.md)
* `imahe` [katutubong larawan](native-image.md) - Ang datos ng imahe ng buong kuwadro.

Binubuwag kapag ang bagong kuwadro ay nabuo. Tanging ang maruming lugar ay ipinasa sa buffer.

```javascript
const {BrowserWindow} = nangangailangan('elektron')

hayaan manalo ang = bagong BrowserWindow ({webPreferences: {offscreen: tama}})
manalo.webContents.on ('pintura', (kaganapan, marumi, larawan) = & gt; {
   // updateBitmap (marumi, image.kumuha ng Bitmap ())})
manalo.loadURL ('http://github.com')
```

#### Kaganapan: 'devtools-kargahan muli-ang pahina'

Binubuwag kapag ang window ng devtools ay nagtuturo sa webContents na kargahan muli

#### Kaganapan: 'naisin-isama-webview'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `webPreferences` Layunin - Ang mga kagustuhan sa web na gagamitin ng bisita ng pahina. Ang bagay na ito ay maaaring mabago upang ayusin ang mga kagustuhan para sa bisita ng pahina.
* `params` Layunin - Ang iba pang mga `<webview>` parameter tulad ng `src` URL. Ang bagay na ito ay maaaring baguhin upang ayusin ang mga parameter ng pahina ng bisita.

Naipalalabas kapag `<webview>` ang mga nilalaman ng web ay naka-attach sa mga nilalaman ng web na ito. Pagtawag sa `kaganapan.preventDefault()` ay sirain ang pahina ng bisita.

Maaaring gamitin ang kaganapang ito upang i-configure ang `webPreferences` para sa `webContents` ng isang `<webview>` bago ang load nito, at nagbibigay ng kakayahang magtakda upang itakda ang mga setting na hindi maaaring itakda sa pamamagitan ng `<webview>` mga katangian.

**Tandaan:** Ang tinutukoy na `preload` Ang opsyon ng script ay lilitaw bilang `preloadURL` (hindi `preload`) nasa `webPreferences` bagay na inilalabas sa kaganapang ito.

#### Kaganapan: 'ginawa-ilakip-webview'

Ibinabalik ang:

* `kaganapan` Kaganapan
* `WebContents` WebContents - Ang mga nilalaman ng bisita ng web na ginagamit ang `<webview>`.

Naipalalabas kapag ang isang `<webview>` ay naka-attach sa mga nilalaman ng web na ito.

#### Kaganapan'console-mensahe'

Ibinabalik ang:

* `level` Integer
* `mensahe` Pisi
* `linya` Integer
* `sourceId` Pisi

Pinapalabas kapag nag-log ang nauugnay na window sa isang mensahe ng console. Hindi ipapalabas para sa mga window na may *offscreen rendering* na pinapagana.

### Instance Methods

#### `contents.loadURL(url[, mga pagpipilian])`

* `url` Tali
* `options` Bagay (opsyonal) 
  * `httpReferrer` Pisi (opsyonal) - Isang HTTP Referrer url.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String(opsyonal) - Basi nag url (may tagapahiwalay sa landas ng separator) para sa mga dokumento na kakargahin sa pamamagitan ng datos ng url. Ito ay kailangan kung ang tinutukoy ng `url` iy isang datos ng url at kailangan maikarga sa ibang dokumento.

Naglo-load ang `url` sa bintana. Ang `url` ay dapat naglalaman ng prefix ng protocol, hal. ang `http://` o `file://`. Kung ang load ay dapat mag-bypass http cache pagkatapos gamitin ang `pragma` header upang makamit ito.

```javascript
const {webContents} = nangangailangan('elektron')
const mga pagpiilian = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', mga pagpipilian)
```

#### `contents.loadFile(filePath)`

* `filePath` String

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

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

#### `contents.downloadURL(url)`

* `url` Tali

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Returns `String` - The URL of the current web page.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

Returns `String` - The title of the current web page.

#### `contents.isDestroyed()`

Returns `Boolean` - Whether the web page is destroyed.

#### `contents.focus()`

Focuses the web page.

#### `contents.isFocused()`

Returns `Boolean` - Whether the web page is focused.

#### `contents.isLoading()`

Returns `Boolean` - Whether web page is still loading resources.

#### `contents.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

#### `contents.isWaitingForResponse()`

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### `contents.stop()`

Hinihinto ang anumang nakabinbing nabigasyon.

#### `contents.reload()`

Reloads the current web page.

#### `contents.reloadIgnoringCache()`

Reloads current page and ignores cache.

#### `contents.canGoBack()`

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

Nililimas ang kasaysayan ng pag-navigate.

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Naka-navigate sa tinukoy na offset mula sa "kasalukuyang entry".

#### `contents.isCrashed()`

Ibinabalik `Boolean` - Kapag ang proseso ng tagapag-render ay nawasak.

#### `contents.setUserAgent(userAgent)`

* `userAgent` na String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css)`

* `css` Pisi

Injects CSS into the current web page.

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (opsyonal) - Default ay `huwad`.
* `callback` Function (opsyonal) - Tinawagan pagkatapos na maisakatuparan ang iskrip. 
  * `resulta` Anuman

Ibinabalik ang mga `Pangako` - Ang isang pangako na lumulutas sa resulta ng naipatupad na code o tinanggihan kung ang resulta ng code ay isang tinanggihang pangako.

Sinusuri ang mga `code` sa pahina.

Sa window ng browser ang ilang mga HTML API tulad ng `requestFullScreen` ay maaari lamang nananawagan ng kilos mula sa gumagamit. Ang pagtatakda ng `userGesture` sa `totoo` ay alisin ang limitasyon na ito.

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `huwag pansinin` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.setZoomFactor(factor)`

* `kadahilanan`Numero - Zoom factor.

Binabago ang factor ng pag-zoom sa tinukoy na factor. Ang factor ng pag-zoom ay porsiyento ng zoom na hinati sa 100, so 300% = 3.0.

#### `contents.getZoomFactor(callback)`

* `callback` Function 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - Zoom level.

Binabago ang antas ng pag-zoom para sa tinitiyak na antas. Ang orihinal na laki ng 0 at bawat isa Ang pagdagdag sa pagtaas o sa pagbaba ay kumakatawan sa pag-zooming ng 20% na mas malaki o mas maliit sa default mga limitasyon ng 300% at 50% ng orihinal na laki, ayon sa pagkakabanggit. The formula for this is `scale := 1.2 ^ level`.

#### `contents.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### `mga nilalaman.setVisualZoomLevelLimits(pinakamababang antas, pinakamataas na antas)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Itinatakda ang pinakamataas at pinakamababang antas ng pinch-sa-zoom.

#### `mga nilalaman.setVisualZoomLevelLimits (pinakamababang antas, pinakamataas na antas)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Nagtatakda ng pinakamataas at pinakamababa na antas batay sa layout (i.e hindi visual) na antas ng zoom.

#### `mga nilalaman.undo()`

Executes the editing command `undo` in web page.

#### `mga nilalaman.redo()`

Executes the editing command `redo` in web page.

#### `mga nilalaman.cut()`

Executes the editing command `cut` in web page.

#### `mga nilalaman.copy()`

Executes the editing command `copy` in web page.

#### `mga nilalaman.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `mga nilalaman.paste()`

Executes the editing command `paste` in web page.

#### `mga nilalaman.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `mga nilalaman.delete()`

Executes the editing command `delete` in web page.

#### `mga nilalaman.selectAll()`

Executes the editing command `selectAll` in web page.

#### `mga nilalaman.unselect()`

Executes the editing command `unselect` in web page.

#### `mga nilalaman.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `mga nilalaman. ibalik ang maling pagbaybay(teksto)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `mga nilalaman.ipasok ang teksto(teksto)`

* `text` String

Ipasok ang `teksto` sa nakatutok na elemento.

#### `mga nilalaman.findInPage (teksto [, mga pagpipilian])`

* `teksto` String - Ang nilalaman na hahanapin, ay hindi dapat walang laman.
* `options` Bagay (opsyonal) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Ibinabalik `Integer` - Ang kahilingang id na ginagamit para sa kahilingan.

Magsisimula ng isang kahilingan upang mahanap ang lahat ng mga tugma para sa `text` sa pahina ng web. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `mga nilalaman.stopFindInPage(aksyon)`

* `aksyon` String - Tinutukoy ang aksyon upang maganap kapag nagtatapos [`webContents.findInPage`] kahilingan. 
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - Isalin ang seleksyon sa isang normal na seleksyon.
  * `activateSelect` - Tumuon at i-click ang node ng pagpili.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const {webContents} = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `mga nilalaman.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.
* `callback` Punsyon 
  * `imahe` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### `contents.hasServiceWorker(callback)`

* `callback` Punsyon 
  * `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `callback` Function 
  * `tagumpay` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### `mga nilalaman.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md).

#### `mga nilalaman.print([options], [callback])`

* `options` Na Bagay (opsyonal) 
  * `silent` Boolean (opsyonal) - Huwag itanong sa user sa mga setting sa pagpapaimprinta. Ang naka-default ay `false`.
  * `printBackground` Boolean (opsyonal) - Iniimprinta rin ang kulay ng background at ang mukha ng web page. Ang naka-default ay `false`.
  * `deviceName` String (opsyonal) - Itakda ang pangalan ng gagamiting printer na gagamitin. Ang naka-default ay `"`.
* `callback` Function (opsyonal) 
  * `success` Boolean - Indicates success of the print call.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({silent: false, printBackground: false, deviceName: ''})`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `mga opsyon` Bagay 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Punsyon 
  * `error` Error
  * `data` Buffer

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const {BrowserWindow} = require('electron')
const fs = require('fs')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

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
const {app, BrowserWindow} = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({mode: 'detach'})
})
```

#### `contents.openDevTools([options])`

* `pagpipilian` Bagay (opsyonal) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Closes the devtools.

#### `contents.isDevToolsOpened()`

Returns `Boolean` - Whether the devtools is opened.

#### `contents.isDevToolsFocused()`

Returns `Boolean` - Whether the devtools view is focused .

#### `contents.toggleDevTools()`

Toggles the developer tools.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Magpadala ng mensahe na asynchronous para maisagawa ang proseso sa pamamagitan ng `channel`. pwede mo ring ipadala ang mga argumento na arbitraryo. Ang mga argumento ay maaaring ilalathala ng baha-bahagi sa loob ng JSON at dahil dito walang mga punsyon o ugnay-ugnay na modelo ang maaaring isama.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// Ang pangunahing pag-proseso.
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
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

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Bagay 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`): 
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{x: 0, y: 0}`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: ``).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `kaganapan` Bagay 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Nagpapadala ng input na `event` sa page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`.
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

For the `mouseWheel` event, the `event` object also have following properties:

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function 
  * `frameBuffer` Buffer
  * `dirtyRect` [Parihaba](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(frameBuffer, dirtyRect)` when there is a presentation event.

The `frameBuffer` is a `Buffer` that contains raw pixel data. On most machines, the pixel data is effectively stored in 32bit BGRA format, but the actual representation depends on the endianness of the processor (most modern processors are little-endian, on machines with big-endian processors the data is in 32bit ARGB format).

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `frameBuffer` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Bagay 
  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.
* `callback` Function - `(error) => {}`. 
  * `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Save page successfully')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Pinapakita ang pop-up na diksyonaryo na naghahanap ng mga napiling salita sa page.

#### `contents.setSize(options)`

Set the size of the page. This is only supported for `<webview>` guest contents.

* `pagpipilian` Bagay 
  * `normal` Object (optional) - Normal size of the page. This can be used in combination with the [`disableguestresize`](webview-tag.md#disableguestresize) attribute to manually resize the webview guest contents. 
    * `lapad` Integer
    * `taas` Integer

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

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

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

Returns `Integer` - The `pid` of the associated renderer process.

### Mga Katangian ng Instance

#### `contents.id`

A `Integer` representing the unique ID of this WebContents.

#### `contents.session`

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents`

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents`

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger`

A [Debugger](debugger.md) instance for this webContents.
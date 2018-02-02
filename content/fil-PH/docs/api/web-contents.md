# webContents

> Ibigay at kontrolin ang mga web page.

Proseso:[Main](../glossary.md#main-process)

`WebContents ` ay isang [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ito ay responsable sa pag-render at pagkontrol sa isang web page at bagay na ari-arian ng [`BrowserWindow`](browser-window.md). Isang halimbawa ng pag-access sa `webContents` bagay:

```javascript
const {BrowserWindow} = nangangailangan ('elektron')

hayaang manalo = bagong BrowserWindow({lapad: 800, taas: 1500})
manalo.loadURL ('http://github.com')

hayaan ang mga nilalaman =manalo.webContents
console.log (mga nilalaman)
```

## Pamamaraan

Ang mga pamamaraan na ito ay Maaaring ma-access mula sa module na ` webContents`:

```javascript
const {webContents} = nangangailangan ('elektron')
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

### Halimbawa ng Mga Kaganapan

#### Kaganapan: 'ginawa-tapusin-dala'

Binubuwag kapag ang nabigasyon ay tapos na, i.e. ang spinner ng tab ay tumigil Umiikot, at ang `onload` kaganapan ay ipinadala.

#### Kaganapan: 'ginawa-mabibigo-dala'

Ibinabalik:

* `kaganapan`Kaganapan
* `pagkakamalingCode`kabuuan
* `Paglalarawan ng pagkakamali`tali
* `napatunayan sa Url`tali
* `ay pangunahing kuwadro` Boolean

Ang kaganapang ito ay tulad ng `did-finish-load` ngunit inilalabas kapag nabigo ang pag load o kinansela, hal. `window.stop() ` ay ginagamit. Ang buong listahan ng mga error code at ang kanilang mga kahulugan ay magagamit [dito](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### Kaganapan: 'ginawa-frame-finish-load'

Pagbabalik ng:

* `kaganapan` Kaganapan
* `ay pangunahing kuwadro` Boolean

Napalabas kapag ang frame ay nagawa na ang nabigasyon.

#### Kaganapan: 'did-start-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay nagsimulang umikot.

#### Kaganapan: 'did-stop-loading'

Tumutugma sa mga puntos ng oras kapag ang spinner ng tab ay tumigil sa pagikot.

#### Kaganapan: 'ginawa-kumuha-tugon-detalye'

Ibinabalik ang:

* `kaganapan` kaganapan
* `katayuan` Boolean
* `newURL` String
* `orihinalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referer` String
* `header` Bagay
* `resourceType` Tali

Pinapalabas kapag may mga detalye tungkol sa hiniling na mapagkukunan at magagamit sa `katayuan` ay nagpapahiwatig sa socket connection upang i-download ang mapagkukunan.

#### Kaganapan: 'did-get-redirect-request'

Ibinabalik:

* `kaganapan` Kaganapan
* `oldURL` Pisi
* `newURL` String
* `ay pangunahing kuwadro` Boolean
* `httpResponseCode` Integer
* `requestMethod` String
* `referer` String
* `header` Bagay

Pinapalabas kapag natanggap ang pag-redirect habang humihiling ng mapagkukuhanan.

#### Kaganapan: 'dom-ready'

Ibinabalik:

* `kaganapan` Kaganapan

Napalabas kapag ang dokumento na ibinigay sa frame ay na-load.

#### Kaganapan: 'pahina-favicon-updated'

Ibinabalik:

* `kaganapan` Kaganapan
* `favicons` String [] - Mga array ng mga URL

Pinapalabas kapag natanggap ng pahina ang mga url ng favicon.

#### Kaganapan: 'bagong-bintana'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Pisi
* `frameName` Pisi
* `Disposisyon` String - Maaaring `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` at `iba pang`.
* `mga pagpipilian` Object - Ang mga pagpipilian na gagamitin para sa paglikha ng bagong `BrowserWindow`.
* `Mga karagdagang tampok` String [] - Ang di-karaniwang mga tampok (mga tampok na hindi hinahawakan sa pamamagitan ng Kromo o Elektron) na ibinigay sa `window.open()`.

Lumalabas kapag ang pahina ay humiling na magbukas ng bagong bintana para sa isang `url`. Maaaring ito ay hiniling ng `window.open` o isang panlabas na link tulad ng `<a target='_blank'>`.

Sa pamamagitan ng default ng isang bagong `BrowserWindow` ay nilikha para sa `url`.

Ang pagtawag sa `kaganapan.preventDefault()` ay maiiwasan ang Elektron mula sa awtomatikong paglikha ng isang bagong `BrowserWindow`. Kung tumawag ka `event.preventDefault ()` at manu-manong pag likha ng bagong `BrowserWindow` at pagkatapos ay dapat mong itakda ang `kaganapan.newGuest` upang isangguni sa bagong `BrowserWindow` Halimbawa, ang hindi pagtupad nito ay maaaring magresulta sa hindi inaasahang asal. Halimbawa:

```javascript
myBrowserWindow.webContents.on('bagong-window', (event, url) => {
  kaganapan.preventDefault()
  const manalo = bagong BrowserWindow ({show: false})
  manalo.once ('ready-to-show', () = > win.show())
  manalo.loadURL (url)
  kaganapan.newGuest = manalo
})
```

#### Kaganapan: 'mag-navigate'

Ibabalik:

* `kaganapan` Kaganapan
* `url` Pisi

Napalabas kapag nais ng isang user o ng pahina na magsimulang mag-navigate. Maaari itong mangyari kung kailan ang bagay na `bintana.lokasyon` ay nagbago o ang isang gumagamit ay nag-click ng isang link sa pahina.

Ang kaganapang ito ay hindi naglalabas kapag ang navigation ay nagsimula sa programming kasama ng mga API ay tulad ng `webContents.loadURL` at `webContents.back`.

Hindi rin ito nagpapalabas para sa pag-navigate sa pahina, tulad ng pag-click sa mga link ng anchor o pag-update ng `bintana.lokasyon.hash` Gamit ang `ginawa-navigate-sa-pahina`at mga kaganapan para sa layuning ito.

Ang pagtawag sa `kaganapan.preventDefault()` ay maiiwasan ang nabigasyon.

#### Kaganapan: 'ginawa-navigate'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Pisi

Nilalabas kapag ang nabigasyon ay natapos na.

Ang kaganapang ito ay hindi ipinapalabas para sa pag-navigate sa pahina, tulad ng pag-click sa mga link ng anchor o pag-update ng `bintana.lokasyon.hash`. Gamit ang `ginawa-navigate-sa-pahina` kaganapan para sa layuning ito.

#### Kaganapan: 'ginawa-navigate-in-page'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Pisi
* `ay pangunahing kuwadro` Boolean

Inilalabas kapag nangyari ang pag-navigate sa pahina.

Kapag nangyayari ang pag-navigate sa pahina, ang pahina ng URL ay nagbabago ngunit hindi ito magiging dahilan ng nabigasyon sa labas ng pahina. Ang mga halimbawa ng nangyari ay kapag ang mga anchor link ay na-click o kapag ang DOM `hashchange` at ang kaganapan ay na-trigger.

#### Kaganapan: 'will-prevent-unload'

Ibinabalik:

* `kaganapan` Kaganapan

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

#### Kaganapan: 'nag-crash'

Ibinabalik:

* `kaganapan` Kaganapan
* `pinatay` Boolean

Lumalabas kapag ang proseso ng tagapag-render ay nasira o pinatay.

#### Kaganapan: 'plugin-nag-crash'

Ibinabalik:

* `kaganapan` Kaganapan
* `pangalan` String
* `Bersyon` Pisi

Lumalabas kapag ang proseso ng plugin ay nag-crash.

#### Kaganapan: 'nawasak'

Nagpapalabas kapag ang `webContents` ay nawasak.

#### Kaganapan: 'bago-input-kaganapan'

Ibinabalik:

* `kaganapan` Kaganapan
* `input` Bagay - Input properties 
  * `uri` Pisi - Alinman `keyUp` o `keyDown`
  * `susi` Pisi - Katumbas ng [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `code` Pisi - Katumbas ng [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `isAutoRepeat` Boolean - Katumbas ng [KeyboardEvent.ulitin](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `shift` Boolean - Katumbas ng [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `kontrol` Boolean - Katumbas ng [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `alt` Boolean - Katumbas ng [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
  * `meta` Boolean - Katumbas ng [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

Pinapalabas bago ipadala ang `keydown` at `keyup` mga kaganapan sa pahina. Ang pagtawag sa `kaganapan.preventDefault` ay mapipigilan ang pahina `keydown`/`keyup` ng mga kaganapanat at ng shortcut sa menu.

Upang mapigilan lamang ang mga shortcut sa menu, gamitin ang [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcuts):

```javascript
const {BrowserWindow} = nangangailangan('elektron')

hayaan ang panalo = bagong BrowserWindow ({lapad: 800, taas: 600})

manalo.webContents.on('bago-input-kaganapan', (kaganapan, input) => {
  // Halimbawa, paganahin lang ang mga shortcut sa keyboard ng menu ng aplikasyon kapag
  / / Ctrl/Cmd ay pababa.
  manalo.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Kaganapan: 'devtools-binuksan'

Nilalabas kapag ang DevTools ay nabuksan.

#### Kaganapan: 'devtools-sarado'

Nilalabas kapag ang DevTools ay sarado.

#### Kaganapan: 'devtools-nakatuon'

Nilalabas kapag ang DevTools ay nakatuon/binuksan.

#### Kaganapan: 'certificate-error'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Pisi
* `mali` Pisi - The error code
* `sertipiko` [Sertipiko](structures/certificate.md)
* `tumawag muli` Function 
  * `isTrusted` Boolean - ay nagpapahiwatig kung ang sertipiko ay maaaring ituring na pinagkakatiwalaan

Naipalalabas kapag nabigo upang i-verify ang `sertipiko` para sa `url`.

Ang paggamit ay pareho sa [ang kaganapan `certificate-error` ng `app` ](app.md#event-certificate-error).

#### Kaganapan: 'select-client-certificate'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` URL
* `certificateList` [Sertipiko[]](structures/certificate.md)
* `tumawag muli` Function 
  * `sertipiko` [Sertipiko](structures/certificate.md) - Dapat ay isang sertipiko mula sa ibinigay na listahan

Naipalalabas kapag hiniling ang sertipiko ng kliyente.

Ang paggamit ay pareho sa [ang kaganapan `piliin-client-sertipiko`ng `app`](app.md#event-select-client-certificate).

#### Kaganapan: 'pag-login'

Ibinabalik:

* `kaganapan` Kaganapan
* `hiling` Bagay 
  * `paraan` Pisi
  * `url` URL
  * `referrer` URL
* `authInfo` Layunin 
  * `isProxy` Boolean
  * `scheme` Pisi
  * `host` Pisi
  * `port` Integer
  * `realm` Pisi
* `muling tumawag` Function 
  * `username` Pisi
  * `password` Pisi

Naipalalabas kapag ang `webContents` ay nais gawin ang pangunahing auth.

Ang paggamit ay pareho sa [ang kaganapan `login` ng `app`](app.md#event-login).

#### Kaganapan: 'natagpuan-sa-pahina'

Ibinabalik:

* `kaganapan` Kaganapan
* `resulta` Bagay 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong tugma.
  * `tugma` Integer - Bilang ng Mga Tugma.
  * `selectionArea` Layunin - Coordinates ng unang rehiyon ng pagtutugma.
  * `finalUpdate` Boolean

Naipalalabas kapag ang resulta ay magagamit para sa [`webContents.findInPage`] humiling.

#### Kaganapan: 'media-started-playing'

Naipalalabas kapag nagsimula ng maglaro ang media.

#### Kaganapan: 'media-paused'

Naipalalabas kapag ang media ay naka-nakahinto o tapos na ang pag-play.

#### Kaganapan: 'ginawa-baguhin-tema-kulay'

Naipalalabas kapag nagbago ang kulay ng tema ng pahina. Ito ay kadalasan dahil sa nakakaharap ng isang meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Kaganapan: 'update-target-url'

Ibinabalik:

* `kaganapan` Kaganapan
* `url` Pisi

Inilalabas kapag gumagalaw ang mouse sa isang link o inililipat ng keyboard ang focus sa isang link.

#### Kaganapan: 'cursor-changed'

Ibinabalik:

* `kaganapan` Kaganapan
* `uri` Pisi
* `imahe` NativeImage (opsyonal)
* `scale` Lumutang (opsyonal) - scaling factor para sa mga pasadyang cursor
* `sukat` [Sukat](structures/size.md) (opsyonal) - ang sukat ng `imahe`
* `hotspot` [Punto](structures/point.md) (opsyonal) - mga coordinate ng hotspot ng pasadyang cursor

Naipalalabas kapag ang uri ng cursor ay nagbago. Ang `uri` maaring maging parameter `default`, `crosshair`, `pointer`, `text`, `maghintay`, `tulungan`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `ilipat`, `vertical-text`, `cell`, `context-menu`, `alias`, `pagunlad`, `nodrop`, `kopya`, `none`, `hindi pwede`, `zoom-in`, `zoom-out`, `grab`, `grabbing`, `pasadya`.

Kung ang `uri` ng parameter ay `pasadya`, ang `imahe` ng parameter ang hahawak sa pinasadyang cursor ng imahe sa isang `NativeImage`, at `scale`, `laki` at `hotspot` at hawak ang karagdagang impormasyon tungkol sa mga pasadyang cursor.

#### Kaganapan: 'context-menu'

Ibinabalik:

* `kaganapan` Kaganapan
* `params` Layunin 
  * `x` Integer - x coordinate
  * `y` Integer - y coordinate
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
  * ` menuSourceType` Pisi - Ipasok ang pinagmulan na nagsasagawa ng konteksto ng menu. Maaaring `wala`, `mouse`, `keyboard`, `touch`, `touchMenu`.
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

Ibinabalik:

* `kaganapan` Kaganapan
* `Mga aparato` [BluetoothDevice[]](structures/bluetooth-device.md)
* `tumawag muli` Function 
  * `deviceId` Pisi

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

Ibinabalik:

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

Ibinabalik:

* `kaganapan`Kaganapan
* `webPreferences` Layunin - Ang mga kagustuhan sa web na gagamitin ng bisita ng pahina. Ang bagay na ito ay maaaring mabago upang ayusin ang mga kagustuhan para sa bisita ng pahina.
* `params` Layunin - Ang iba pang mga `<webview>` parameter tulad ng `src` URL. Ang bagay na ito ay maaaring baguhin upang ayusin ang mga parameter ng pahina ng bisita.

Naipalalabas kapag `<webview>` ang mga nilalaman ng web ay naka-attach sa mga nilalaman ng web na ito. Pagtawag sa `kaganapan.preventDefault()` ay sirain ang pahina ng bisita.

Maaaring gamitin ang kaganapang ito upang i-configure ang `webPreferences` para sa `webContents` ng isang `<webview>` bago ang load nito, at nagbibigay ng kakayahang magtakda upang itakda ang mga setting na hindi maaaring itakda sa pamamagitan ng `<webview>` mga katangian.

**Tandaan:** Ang tinutukoy na `preload` Ang opsyon ng script ay lilitaw bilang `preloadURL` (hindi `preload`) nasa `webPreferences` bagay na inilalabas sa kaganapang ito.

### Mga Paraan ng Halimbawa

#### `contents.loadURL(url[, mga pagpipilian])`

* `url` Pisi
* `mga pagpipilian` Bagay (opsyonal) 
  * `httpReferrer` Pisi (opsyonal) - Isang HTTP Referrer url.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opsyonal)
  * `baseURLForDataURL` Pisi (opsyonal) - Base url (na may trailing path separator) para sa mga dokumento na mai-load ng url ng data. Ito ay kinakailangan lamang kung ang tinutukoy na `url` ay isang url ng data at kailangang mag-load ng iba pang mga file.

Naglo-load ang `url` sa bintana. Ang `url` ay dapat naglalaman ng prefix ng protocol, hal. ang `http://` o `file://`. Kung ang load ay dapat mag-bypass http cache pagkatapos gamitin ang `pragma` header upang makamit ito.

```javascript
const {webContents} = nangangailangan('elektron')
const mga pagpiilian = {extraHeaders: 'pragma: no-cache\n'}
webContents.loadURL('https://github.com', mga pagpipilian)
```

#### `mga nilalaman.downloadURL(url)`

* `url` Pisi

Nagsimula ang pag-download ng mapagkukunan sa `url` nang walang pag-navigate. Ang `will-download` kaganapan ng `session` ay ma-trigger.

#### `mga nilalaman.getURL()`

Ibinabalik `Pisi` - Ang URL ng kasalukuyang web page.

```javascript
const {BrowserWindow} = nangangailangan('elektron')
hayaan ang panalo = bagong BrowserWindow ({lapad: 800, taas: 600})
manalo.loadURL ('http://github.com')

hayaan ang kasalukuyangURL = manalo.webContents.getURL()
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

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

Clears the navigation history.

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

#### `contents.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css)`

* `css` String

Injects CSS into the current web page.

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.
* `tumawag muli` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *Experimental*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

#### `contents.getZoomFactor(callback)`

* `tumawag muli` Punsyon 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - Zoom level

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

#### `contents.getZoomLevel(callback)`

* `tumawag muli` Punsyon 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### `contents.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**Deprecated:** Call `setVisualZoomLevelLimits` instead to set the visual zoom level limits. This method will be removed in Electron 2.0.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Sets the maximum and minimum pinch-to-zoom level.

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Sets the maximum and minimum layout-based (i.e. non-visual) zoom level.

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Executes the editing command `copy` in web page.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

Executes the editing command `paste` in web page.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

Inserts `text` to the focused element.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `forward` Boolean - (optional) Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean - (optional) Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean - (optional) Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean - (optional) Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean - (optional) When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Starts a request to find all matches for the `text` in the web page and returns an `Integer` representing the request id used for the request. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const {webContents} = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `tumawag muli` Punsyon 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### `contents.hasServiceWorker(callback)`

* `tumawag muli` Punsyon 
  * `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `tumawag muli` Punsyon 
  * `success` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options])`

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({silent: false, printBackground: false, deviceName: ''})`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `mga pagpipilian` Bagay 
  * `marginsType` Integer - (optional) Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String - (optional) Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean - (optional) Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean - (optional) Whether to print selection only.
  * `landscape` Boolean - (optional) `true` for landscape, `false` for portrait.
* `tumawag muli` Punsyon 
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

#### `contents.openDevTools([options])`

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.

Opens the devtools.

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

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. Ang mga argumento ay maaaring ilalathala ng baha-bahagi sa loob ng JSON at dahil dito walang mga punsyon o ugnay-ugnay na modelo ang maaaring isama.

The renderer process can handle the message by listening to `channel` with the `ipcRenderer` module.

An example of sending messages from the main process to the renderer process:

```javascript
// Sa mga pangunahing proseso.
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
      console.log(message)  // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Bagay 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`) 
    * `desktop` - Desktop screen type
    * `mobile` - Mobile screen type
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile)
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{x: 0, y: 0}`)
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: ``)
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `fitToView` Boolean - Whether emulated view should be scaled down if necessary to fit into available space (default: `false`)
  * `offset` [Point](structures/point.md) - Offset of the emulated view inside available space (not in fit to view mode) (default: `{x: 0, y: 0}`)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`)

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(event)`

* `event` Bagay 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp`, `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Sends an input `event` to the page. **Note:** The `BrowserWindow` containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`
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

* `onlyDirty` Boolean (optional) - Defaults to `false`
* `tumawag muli` Punsyon 
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
* `tumawag muli` Function - `(error) => {}`. 
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

Shows pop-up dictionary that searches the selected word on the page.

#### `contents.setSize(options)`

Set the size of the page. This is only supported for `<webview>` guest contents.

* `mga pagpipilian` Bagay 
  * `normal` Object (optional) - Normal size of the page. This can be used in combination with the [`disableguestresize`](web-view-tag.md#disableguestresize) attribute to manually resize the webview guest contents. 
    * `width` Integer
    * `height` Integer

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

### Humahalimbawa sa bahagi nito

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
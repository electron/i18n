# webİçeriği

> Web sayfalarını oluşturun ve kontrol edin.

İşlem: [Ana](../glossary.md#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). Bir web sayfasını oluşturma ve denetlemekle sorumludur ve [`BrowserWindow`](browser-window.md) nesnesinin bir öğesidir. `webContents` nesnesine erişmenin bir örneği:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## Yöntemler

Bu yöntemlere `webContents` modülünden erişilebilir:

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

`WebContents[]` 'ne döndürür - Tüm `WebContents` örneklerinin bir dizisi. Bu, tüm pencereler, web görüntüleri, açılan devtools eklentileri ve devtools uzantısı arka plan sayfaları için web içeriğini içerecektir.

### `webContents.getFocusedWebContents()`

`WebContents` 'ne dödürür - Bu uygulamaya odaklanmış web içeriği aksi takdirde `null` değerini döndürür.

### `webContents.fromId(id)`

* `id` tamsayı

`WebContents` 'ne döndürür - Belirli bir kimliği olan bir Web İçeriği örneği.

## Tür: Webİçerikleri

> Bir TarayıcıPenceresi örneğinin içeriğini oluşturun ve denetleyin.

Süreç: [Main](../glossary.md#main-process)

### Örnek Events

#### Olay: 'did-finish-load'

Gezinme yapılırken, yani sekmenin döner kısmı dönmeyi durduğunda ortaya çıkar ve `onload` olayı gönderilir.

#### Olay: 'did-fail-load'

Dönüşler:

* `olay` Olay
* `errorCode` Tamsayı
* `errorDescription` Koşul
* `validatedURL` Koşul
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed. Hata kodlarının tam listesi ve anlamları [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) mevcuttur.

#### Event: 'did-fail-provisional-load'

Dönüşler:

* `event` Event
* `errorCode` Tamsayı
* `errorDescription` Koşul
* `validatedURL` Koşul
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

This event is like `did-fail-load` but emitted when the load was cancelled (e.g. `window.stop()` was invoked).

#### Olay: 'did-frame-finish-load'

Returns:

* `event` Olay
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Bir çerçeve aramayı bitirdiğinde ortaya çıkar.

#### Olay: 'did-start-loading'

Sekmenin döngüsü dönmeye başladığında puanlara karşılık gelir.

#### Olay: 'did-stop-loading'

Sekmenin döngüsü dönmeye başladığında puanlara karşılık gelir.

#### Olay: 'dom-ready'

Dönüşler:

* `event` Olay

Belirli bir çerçevedeki belge yüklendiğinde çıkar.

#### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `event` Olay
* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

#### Olay: 'page-favicon-updated'

Dönüşler:

* `event` Olay
* `favicons` String[] - URL'lerin dizilişleri.

Sayfa sık kullanılan simge Url'lerini aldığında yayınlanır.

#### Olay: 'new-window'

Dönüşler:

* `event` Olay
* `url` Dize
* `frameName` Dize
* `disposition` Dize - `default`, `foreground-tab`, `background-tab`, `new-window`, `ave-to-disk` ve `other` olabilir.
* `options` BrowserWindowConstructorOptions - The options which will be used for creating the new [`BrowserWindow`](browser-window.md).
* `additionalFeatures` Dize[] - `window.open()` için verilen standart olmayan özellikler (Chromium veya Electron tarafından ele alınmayan özellikler).
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

Varsayılan olarak `url` için yeni bir `BrowserWindow` oluşturulacaktır.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](browser-window.md). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](browser-window.md) then you must set `event.newGuest` to reference the new [`BrowserWindow`](browser-window.md) instance, failing to do so may result in unexpected behavior. Örneğin:

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

#### Olay: 'will-navigate'

Dönüşler:

* `event` Olay
* `url` Dize

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Gezinme programlı olarak `webContents.loadURL` ve `webContents.back` gibi API'lerle başlatıldığında, bu olay yayınlanmaz.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

`event.preventDefault()` öğesinin çağırılması gezinmeyi engeller.

#### Event: 'did-start-navigation'

Dönüşler:

* `event` Olay
* `url` Dize
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

Dönüşler:

* `event` Olay
* `url` Dize
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation.  For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

Dönütler:

* `event` Olay
* `url` Dize
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation.  For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Olay: 'did-navigate'

Dönüşler:

* `event` Etkinlik
* `url` Dize
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

Dönüşler:

* `event` Olay
* `url` Dize
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Olay: 'did-navigate-in-page'

Dönüşler:

* `event` Olay
* `url` Dize
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

Sayfa içi gezinme gerçekleştiğinde, sayfa URL'si değişir, ancak sayfanın dışına çıkmasına neden olmaz. Bu gerçekleşen örnekler, bağlı link bağlantıları tıklandığında veya DOM `hashchange` olayı tetiklendiğinde görülür.

#### Olay: 'will-prevent-unload'

Dönüşler:

* `event` Olay

`beforeunload` olay işleyicisi, bir sayfayı kaldırmayı denediğinde yayımlanır.

`event.preventDefault()` öğesinin çağrılması, `beforeunload` olay işleyicisini yoksayar ve sayfanın boşaltılmasına izin verir.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Çık', 'Kal'],
    title: 'Siteden çıkmak istediğinize emin misiniz?',
    message: 'Yaptığınız değişikliler kaydedilmeyecektir.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Etkinlik: 'çöktü'

Dönüşler:

* `event` Olay
* `killed` Boolean

Oluşturucu işlemi çöker veya yok olduğunda yayımlanır.

#### Etkinlik: 'tepkisiz'

Web sayfası tepkisiz kaldığında yayımlanır.

#### Etkinlik: 'duyarlılık'

Yanıt vermeyen internet sayfası tekrar yanıt verdiğinde ortaya çıkmaktadır.

#### Event: 'plugin-crashed'

Dönüşler:

* `event` Olay
* `name` Dizi
* `versiyon` String

Bir eklenti işlemi çöktüğünde ortaya çıkar.

#### Etkinlik: 'yıkıldı'

`webContents` imha edildiğinde ortaya çıkar.

#### Olay: 'before-input-event'

Dönüşler:

* `event` Olay
* `input` Object - Input properties.
  * `type` Dize - `keyUp` veya `keyDown`.
  * `key` Dize - Eşittir [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `code` Dize - Eşittir [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `isAutoRepeat` Boolean - Eşittir [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `shift` Boolean - Eşittir [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `control` Boolean - eşittir[KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `alt` Boolean - Eşittir [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * `meta` Boolean - Eşittir [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Sayfada `keydown` ve `keyup` olaylarını göndermeden önce yayınlanır. `event.preventDefault` öğesinin çağrılması, `keydown`/`keyup` etkinliklerini ve menü kısayollarını engeller.

Menü kısayollarını yalnızca engellemek için [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental) kullanın:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Etkinlik: 'enter-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran haline girdiğinde dışarı çıkar.

#### Etkinlik: 'leave-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran halinde bırakıldığında dışarı çıkar.

#### Event: 'zoom-changed'

Dönüşler:
* `event` Olay
* `zoomDirection` String - Can be `in` or `out`.

Emitted when the user is requesting to change the zoom level using the mouse wheel.

#### Olay: devtools açıldı

DevTools açıldığında yayınla.

#### Olay: devtools kapandı

DevTools kapandığında ortaya çıkar.

#### Olay: devtools odaklanıldı

DevTools odaklandığında / açıldığında ortaya çıkar.

#### Etkinlik: 'sertifika-hatası'

Dönüşler:

* `event` Olay
* `url` Dize
* `error` Dizi - Hata Kodu.
* `certificate` [sertifika](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Sertifikanın güvenilir olarak değerlendirilip değerlendirilemeyeceğini belirtir.

Doğrulanamadığında ortaya çıkar `certificate` for `url`.

Kullanımı [the `certificate-error` olayı `app`](app.md#event-certificate-error) ile aynıdır.

#### Olay: 'select-client-certificate'

Dönüşler:

* `event` Olay
* `url` URL
* `certificateList` [Sertifika[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) - Verilen listeden bir sertifika seçilmeli.

Bir istemci sertifikası talep edildiğinde yayılır.

Kullanımı [the `select-client-certificate` olayı `app`](app.md#event-select-client-certificate) ile aynıdır.

#### Etkinlik: 'giriş'

Dönüşler:

* `event` Olay
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` Dizi
  * `port` Tamsayı
  * `realm` Dizi
* `callback` Function
  * `username` String (optional)
  * `password` String (optional)

`webContents` temel doğrulama yapmak istediğinde çıkarılır.

Kullanımı [the `login` olayı `app`](app.md#event-login) ile aynıdır.

#### Etkinlik: 'sayfa içinde kurmak'

Dönüşler:

* `event` Olay
* `result` Object
  * `requestId` Tamsayı
  * `activeMatchOrdinal` Tamsayı - Etkin eşleşmenin konumu.
  * `matches` Tamsayı - Numaraların eşleştirilmesi.
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

[`webContents.findInPage`] isteği için sonuç kullanılabilir olduğunda yayılıyor.

#### Olay: Medya oynamaya başladı

Medya oynatılmaya başladığında yayınlanır.

#### Etkinlik: 'medya-duraklatıldı'

Medya duraklatıldığında veya oynatıldığında yaydır.

#### Olay: tema rengi değiştirildi

Dönüşler:

* `event` Olay
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Etkinlik: 'update-target-url'

Dönüşler:

* `event` Olay
* `url` Dize

Fare bir bağlantı üzerinden geçtiğinde veya klavyenin bir bağlantıya odaklamasını sağladığı zaman yayımlanır.

#### Olay: 'cursor-changed'

Dönüşler:

* `event` Olay
* `type` Dize
* `image` [NativeImage](native-image.md) (isteğe bağlı)
* `scale` Float (İsteğe Bağlı) Özel imleç için ölçekleme faktörü.
* `size` [Size](structures/size.md) (isteğe bağlı) - `image` boyutu.
* `hotspot` [Point](structures/point.md) (İsteğe bağlı) - Özel imlecin etkin noktasının koordinatları.

İmlecin türü değiştiğinde çıkar. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Olay:'bağlam-menüsü'

Dönüşler:

* `event` Event
* `params` Object
  * `x` tamsayı - x koordinatı.
  * `y` tamsayı - y koordinatı.
  * `linkURL` Dize - Bağlam menüsünde çağrılan düğümü çevreleyen bağlantının URL' si.
  * `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` Dize - Bağlantı menüsünde çağırılan üst düzey sayfanın URL' si.
  * `frameURL` Dize - Bağlam menüsünün çağrıldığı alt çerçeveye ait URL.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` Dize - Bağlam menüsünde çağırılan düğüm tipi. `none`, `image`, `audio`, `video`, `canvas`, `file` veya `plugin` olabilir.
  * `hasImageContents` Mantıksal - Bağlam menüsünün boş olmayan içeriğe sahip bir resim üzerinde çağrılmasına izin verilmez.
  * `isEditable` Mantıksal - Bağlamın düzenlenebilir olup olmadığı.
  * `selectionText` Dize - Bağlam menüsünün üzerinde çağırılan seçimin metni.
  * `titleText` Dize - Bağlam menüsü üzerinde çağırılan seçimin alt metni veya başlığı.
  * `misspelledWord` Metin - İmlecin altındaki yanlış yazılan sözcük.
  * `dictionarySuggestions` String[] - An array of suggested words to show the user to replace the `misspelledWord`.  Only available if there is a misspelled word and spellchecker is enabled.
  * `frameCharset` Dize - Menüden çağırılan çerçevenin karakter şifrelemesi.
  * `inputFieldType` Dizgi - Bağlam menüsü bir girdi alanından çağrıldığında, o alanın türü. Olası değerler: `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on.
    * `inError` Mantıksal - Ortam öğeside eğer çökme olursa.
    * `isPaused` Mantıksal - Ortam öğesinin duraklatılıp duraklatılmadığı.
    * `isMuted` Boolean - Ortam öğesinin sessiz olup olmadığı.
    * `hasAudio` Boolean - Ortam öğesinin sesli olup olmadığı.
    * `isLooping` Mantıksal - Ortam öğesi döngüsel olup olmadığında.
    * `isControlsVisible` Mantıksal - Ortam öğesinin kontrolleri olup olmadığını.
    * `canToggleControls` Boolean - Whether the media element's controls are toggleable.
    * `canRotate` Boolean - Whether the media element can be rotated.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` Boolean - Renderi alanın geri almasına inanması.
    * `canRedo` Boolean - Renderi alanın tekrar yapılmasına inanması.
    * `canCut` Boolean - Renderi alanın kesilmesine inanması.
    * `canCopy` Boolean - Renderi alanın kopyalanmasına inanması
    * `canPaste` Boolean - Renderi alanın yapıştırmaya inanması.
    * `canDelete` Boolean - Renderi alanın silinmesine inanması.
    * `canSelectAll` Boolean - Renderi alanın hepsinin seçilmesine inanması.

Emitted when there is a new context menu that needs to be handled.

#### Olay:'bluetooth-cihazı-seç'

Dönüşler:

* `event` Olay
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Bluetooth aygıtı `navigator.bluetooth.requestDevice` çağrı için seçilmesi gerektiğinde sinyal başlar. `navigator.bluetooth` api'sini kullanmak `webBluetooth`'u etkinleştirmelidir. Eğer `event.preventDefault` çağırılmazsa ilk bağlanılabilen alet seçilecektir. ` callback`, seçilecek `deviceId` ile çağırılmalıdır, `callback`'e boş string göndermek isteği iptal edecektir.

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

#### Etkinlik: 'boya'

Dönüşler:

* `event` Olay
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Olay:'devtools-reload-page'

Devtools penceresi webContents'ü yeniden yüklemeye yönlendirdiğinde çıkar

#### Olay: 'will-attach-webview'

Dönüşler:

* `event` Olay
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

Bu event, `<webview>` yüklenmeden önce ` webContents`'inin `webPreferences<0>'ını ayarlamak için kullanılabilir ve <code><webview>` öznitelikleri aracılığıyla ayarlanamayacak ayarları değiştirme yetisi sağlar.

**Not:** Belirtilen `önyükleme` komut seçeneği `webPreferences` nesnesinin ` preloadURL`'u (`preload` değil) bu event'te gönderildikten sonra gözükecektir.

#### Olay: 'did-attach-webview'

Dönüşler:

* `event` Olay
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Etkinlik: 'console-message'

Dönüşler:

* `event` Olay
* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

Dönüşler:

* `event` Olay
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Etkinlik: 'ipc-message'

Dönüşler:

* `event` Olay
* `channel` Dizesi
* `...args` herhangi[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

Dönüşler:

* `event` Olay
* `channel` Dizesi
* `...args` herhangi[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

Dönüşler:

* `event` Olay

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Calling `event.preventDefault()` will make it return empty sources.

#### Event: 'remote-require'

Dönüşler:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-global'

Dönüşler:

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-builtin'

Dönüşler:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-window'

Dönüşler:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-current-web-contents'

Dönüşler:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### Event: 'remote-get-guest-web-contents'

Dönüşler:

* `event` IpcMainEvent
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Örnek Metodlar

#### `contents.loadURL(url[, options])`

* `url` Dize
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Bu, yalnızca belirtilen `url` veri url'si ve diğer dosyaları yüklemek gerekiyorsa gereklidir.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

`url`'yi pencereye yükler. `url` bir protokol önadı içermek zorundadır, Örneğin `http://` veya `file://`. Eğer yüklemenin http önbelleğini atlaması gerekiyorsa, atlatmak için `pragma` başlığını kullanın.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` Dizi
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

#### `contents.downloadURL(url)`

* `url` Dize

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

`String` olarak dönüt verir - Yürürlükteki web sayfasının bağlantısı.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

`String` olarak dönüt verir - Yürürlükteki web sayfasının başlığı.

#### `contents.isDestroyed()`

`Boolean` olarak dönüt verir - Web sayfasının yok edilip edilmediği.

#### `contents.focus()`

Web sayfasına odaklanır.

#### `contents.isFocused()`

`Boolean` olarak dönüt verir - Web sayfasına odaklanıp, odaklanılmadığı.

#### `contents.isLoading()`

`Boolean` olarak dönüt verir - Web sayfasının hala kaynak yüklemekte olup olmadığı.

#### `contents.isLoadingMainFrame()`

`Boolean` olarak dönüt verir - (Sadece bilgi iletim birimlerinin veya içindeki birimlerin değil) Ana bilgisayarın hala yüklemekte olup olmadığı.

#### `contents.isWaitingForResponse()`

`Boolean` olarak dönüt verir - Web sayfasının, sayfanın ana kaynağından gelecek bir ilk yanıt bekleyip beklemediği.

#### `contents.stop()`

Bekleyen gezinmeleri durdurur.

#### `contents.reload()`

Yürürlükteki web sayfasını yeniden yükler.

#### `contents.reloadIgnoringCache()`

Yürürlükteki sayfayı yeniden yükler ve önbelleği yoksayar.

#### `contents.canGoBack()`

`Boolean` olarak dönüt verir - Tarayıcının bir önceki web sayfasına geri gidip gidemeyeceği.

#### `contents.canGoForward()`

`Boolean` olarak dönüt verir - Tarayıcının bir sonraki web sayfasına gidip gidemeyeceği.

#### `contents.canGoToOffset(offset)`

* `offset` Tamsayı

`Boolean` olarak dönüt verir - Web sayfasının `offset`'e gidip gidemeyeceği.

#### `contents.clearHistory()`

Gezinme geçmişini temizle.

#### `contents.goBack()`

Tarayıcının bir sayfa geri gitmesini sağlar.

#### `contents.goForward()`

Tarayıcının bir sayfa ileri gitmesini sağlar.

#### `contents.goToIndex(index)`

* `index` Tamsayı

Tarayıcıyı belirtilmiş salt web sayfası dizinine (indeksine) yönlendirir.

#### `contents.goToOffset(offset)`

* `offset` Tamsayı

"Geçerli girişten" belirtilen aralıkta gezinir.

#### `contents.isCrashed()`

`Boolean` olarak dönüt verir - Görselleştirme işleminin arızalanıp arızalanmadığı.

#### `contents.setUserAgent(userAgent)`

* `userAgent` Dizgi

Bu sayfa için olan kullanıcı aracını geçersiz kılar.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.getUserAgent()`

`String` olarak dönüt verir - Bu web sayfası için olan kullanıcı aracı.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.insertCSS(css[, options])`

* `css` Dizgi
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

* `code` Dizgi
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sayfadaki `code`'u ölçer.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts(ignore)` _Deneysel_

* `ignore` Boolean

Bu web içeriklerine odaklanılmışken uygulama menüsü kısayolları görmezden gelinir.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Yürürlükteki web sayfasında bulunan sesi kapatır.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.isAudioMuted()`

`Boolean` olarak dönüt verir - Sayfanın sesinin kapatılıp kapatılmadığı.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder. The formula for this is `scale := 1.2 ^ level`.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Maksimum ve minimum bas-yakınlaştır seviyesini ayarlar.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  contents.setVisualZoomLevelLimits(1, 3)`

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` _Deprecated_

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Maksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

**Deprecated:** This API is no longer supported by Chromium.

#### `contents.undo()`

`undo` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.redo()`

`redo` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.cut()`

`cut` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.copy()`

`copy` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `x` Integer

Verilen pozisyondaki görüntüyü panoya kopyalar.

#### `contents.paste()`

`paste` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.pasteAndMatchStyle()`

`pasteAndMatchStyle` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.delete()`

`delete` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.selectAll()`

`selectAll` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.unselect()`

`unselect` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.replace(text)`

* `text` String

`replace` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.replaceMisspelling(text)`

* `text` String

`replaceMisspelling` düzenleme komutunu web sayfasında çalıştırır.

#### `contents.insertText(text)`

* `text` String

Returns `Promise<void>`

Odaklanmış öğeye `metin` ekler.

#### `contents.findInPage(text[, options])`

* `text` Dizgi - Araştırılacak içerik, boş bırakılmaması zorunludur.
* `options` Object (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. varsayılan değer `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Diğer birtakım kelime-içi eşleşmeyi kabul eder, `false` varsayılan olur.

`Integer` döndürür - İstek için kullanılan istek kimliği.

Web sayfasındaki `metin` ile tüm eşleşenleri bulmak için bir istek başlatır. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  * `clearSelection` - Seçimi silin.
  * `keepSelection` - Seçimi normal bir seçime çevirir.
  * `activateSelection` - Odaklanır ve seçim ağına (node'a) tıklar.

Sunulan `action` ile birlikte, `webContents` için olan tüm `findInPage` isteklerini durdurur.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - Sayfanın yakalanılmak istenen alanı.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

`rect` içerisinde kalan sayfanın anlık görüntüsünü yakalar. Omitting `rect` will capture the whole visible page.

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

#### `contents.getPrinters()`

Sistemdeki yazıcıların listesini alır.

[`PrinterInfo[]`](structures/printer-info.md) dönütünü verir

#### `contents.print([options], [callback])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Varsayılan `false`'dur.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Varsayılan `false`'dur.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Varsayılan `true`'dur.
  * `margins` Object (optional)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Varsayılan `false`'dur.
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
* `callback` Fonksiyonu (opsiyonel)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

Penceredeki web sayfasını yazdırır. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Yeni bir sayfa yazdırmaya zorlamak için `page-break-before: always;` CSS stilini kullanın.

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
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ya da micron olarak `height` ve `width` içeren bir nesne olabilir.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Penceredeki web sayfasını Chromiumun özel yazdırma ayarları önizlemesiyle PDF olarak yazdırır.

Eğer sayfada `@page` CSS kuralı (CSS at-rule) kullanıldıysa, `landscape` görmezden gelinecektir.

Varsayılan olarak, boş bir `options` şöyle kabul edilir:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Yeni bir sayfa yazdırmaya zorlamak için `page-break-before: always;` CSS stilini kullanın.

Bir `webContents.printToPDF` örneği:

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

* dizi `yolu`

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* dizi `yolu`

Belirtilen yolu DevTools çalışma alanından kaldırır.

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

#### `contents.openDevTools([options])`

* `options` Object (optional)
  * `mode` Dizgi - Geliştirme araçlarını belirtilen yuvalama durumuyla açar, `right`, `bottom`, `undocked`, `detach` olabilir. Varsayılan olarak son kullanılan yuvalama durumunu kullanır. `undocked` moddayken, geri yuvalama (dock back) mümkündür. `detach` modda ise mümkün değildir.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. The default is `true`.

Geliştirme araçlarını açar.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Geliştirme araçlarını kapatır.

#### `contents.isDevToolsOpened()`

`Boolean` olarak dönüt verir - Geliştirme araçlarının açılıp açılmadığı.

#### `contents.isDevToolsFocused()`

`Boolean` olarak dönüt verir - Geliştirme araçları görünümüne odaklanıp odaklanılmadığı.

#### `contents.toggleDevTools()`

Geliştirme araçlarına geçiş yapar.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `x` Integer

(`x`,`y`) pozisyonundaki ögeyi incelemeye başlar.

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Servis işçisisi bağlamı için geliştirici araçları açar.

#### `contents.send(channel, ...args)`

* `channel` Dizesi
* `...args` herhangi[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

Ana işlemden render işlemine gönderilen mesaj örneği:

```javascript
// Ana süreçte.
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
* `channel` Dizesi
* `...args` herhangi[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects is deprecated, and will begin throwing an exception starting with Electron 9.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  Örnek

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

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Masaüstü ekran tipi.
    * `mobile` - Mobil ekran tipi.
  * `screenSize`[Size](structures/size.md) - Emülasyon uygulanacak ekran genişliğini ayarlar (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) -Benzetilmiş görüntü boyutunu ayarlar (boş demek üstüne yazma yok demek)
  * `scale` Float - Emulated görüntünün kullanılabilir alan içerisindeki ölçeğidir.( Görüntüleme moduna uygun değil) (varsayılan: `1`).

Verilen parametrelerle aygıt emülasyonuna izin verir.

#### `contents.disableDeviceEmulation()`

`webContents.enableDeviceEmulation` tarafından izin verilen araç taklitini devredışı bırakır.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

`event` girdisini sayfaya yollar. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (İsteğe bağlı) - Varsayılan olarak `false`'tur.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

`dirtyRect`, sayfanın hangi bölümlerinin yeniden boyandığını tanımlayan `x, y, width, height` özelliklerini barındıran bir nesnedir. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Yürürlükteki sürükle-bırak işlemi içi `item`'i sürükleme elemanı olarak ayarlar; `file` dosyanın sürükleneceği değişmez dosya yoludur ve `icon` sürükleme sırasında imlecin altında gösterilecek olan görüntüdür.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - Tam dosya yolu.
* `saveType` String - Specify the save type.
  * `HTMLOnly` - Yalnızca sayfanın HTML'ını kaydeder.
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

Sayfadaki seçili sözcüğü arayan pop-up sözlüğünü gösterir.

#### `contents.isOffscreen()`

`Boolean` döner- *offscreen rendering*'in etkinleştirilip etkinleştirilmediğini gösterir.

#### `contents.startPainting()`

Eğer *offscreen rendering* etkinleştirildiyse ve boyama yapılmıyorsa, boyamaya başla.

#### `contents.stopPainting()`

Eğer *offscreen rendering* etkinleştirildiyse ve boyama yapılıyorsa, boyamayı durdur.

#### `contents.isPainting()`

`Boolean` döner- Eğer *offscreen rendering* etkinleştirildiyse şu anda boyama yapılıp yapılmadığını döner.

#### `contents.setFrameRate(fps)`

* `fps` tamsayı

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.getFrameRate()`

`Integer` döner - Eğer *offscreen rendering* etkinleştirildiyse şu anki kare hızını döner.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `contents.invalidate()`

Bu web içeriklerinin içinde olduğu pencereyi tamamen yeniden boyamak için zaman ayarlar.

Eğer *offscreen rendering* etkinleştirildiyse çerçeveyi geçersiz kılar ve `'paint'` olayı aracılığıyla yeni bir tane oluşturur.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy.
  * `default` - Kullanıcının açık ve yerel IP'lerini açığa çıkarır. Bu varsayılan davranıştır. Bu ilke kullanıldığında WebRTC bütün arayüzleri sıralama ve açık arayüzleri keşfetmek için onları bağlama hakkına sahip olur.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. Bu ilke kullanıldığında WebRTC yalnızca http tarafından varsayılan yolu kullanmalıdır. Bu herhangi bir yerel adresi açığa çıkarmaz.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. Bu ilke kullanıldığında WebRTC yalnızca http tarafından kullanılan varsayılan yolu kullanmalıdır. Bu ayrıca ilgili varsayılan özel adresleri de açığa çıkarır. Varsayılan yol, çok merkezli bir bitim noktasında İşletim Sistemi tarafından seçilen yoldur.
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

### Örnek Özellikleri

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

Bu WebContents'in benzersiz kimliğini gösteren `Integer`.

#### `contents.session` _Readonly_

WebContents tarafından kullanılan bir [`Integer`](session.md).

#### `contents.hostWebContents` _Readonly_

Bir [`WebContents`](web-contents.md) örneği `WebContents`'e sahip olabilir.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Not:** Kullanıcılar asla bu nesneyi depolamamalıdırlar çünkü DevTools kapandığında nesne `null`'a dönebilir.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.

# BrowserWindow

> Tarayıcı pencereleri kontrol etme ve oluşturma.

Süreç: [Ana](../glossary.md#main-process)

```javascript
// Ana süreçte.
const {BrowserWindow} = require('electron')

// Or use `remote` from the renderer process.
// const {BrowserWindow} = require('electron').remote

let win = new BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  win = null
})

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Çerçevesiz pencere

Chrome olmadan bir pencere veya rastgele şekilli bir saydam pencere oluşturmak için [Frameless Window](frameless-window.md) API'sini kullanabilirsiniz.

## Zarif pencere görüntüsü

Sayfa doğrudan pencereye yüklendiğinde, kullanıcı, bitmemiş sayfayı görür; bu, iyi bir yerel uygulama deneyimi değildir. Daha fazla görüntü ve resmi hazır hale getirmek için iki farklı çözüm bulunmaktadır.

### Using `ready-to-show` event

While loading the page, the `ready-to-show` event will be emitted when the renderer process has rendered the page for the first time if the window has not been shown yet. Bu olayın ardından bir pencere gösterildiğinde görsel bir flaş yok:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
  win.show()
})
```

Bu olay genellikle `did-finish-load` olayından sonra verilir, ancak birçok uzak kaynağa sahip sayfalar için `did-finish-load` olayından önce yayınlanabilir.

### `backgroundColor` ayarlama

Karmaşık bir uygulama için, `ready-to-show` etkinliği çok geç yayınlanarak uygulamanın yavaşlamasına neden olabilir. Bu durumda, pencereyi derhal göstermeniz ve uygulamanızın arka planına yakın bir `backgroundColor` kullanmanız önerilir:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

Note that even for apps that use `ready-to-show` event, it is still recommended to set `backgroundColor` to make app feel more native.

## Ana ve alt pencereler

`parent` seçeneğini kullanarak türetilmiş pencereler yaratabilirsiniz:

```javascript
const {BrowserWindow} = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({parent: top})
child.show()
top.show()
```

`child` penceresi daima `top` penceresinin üstünde gösterilir.

### Modal windows

Modal bir pencere, üst pencereyi devre dışı bırakan ve bir kalıcı pencere oluşturmak için kullanılan alt penceredir, hem `parent` hem de `modal` seçeneklerini ayarlamanız gerekir:

```javascript
const {BrowserWindow} = require('electron')

let child = new BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

### Sayfa görünürlüğü

[Sayfa Görünürlüğü API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)'si aşağıdaki gibi çalışır:

* Tüm platformlarda, görünürlük durumu, pencerenin görünmez/simge durumuna küçültülmüş olup olmadığını izler.
* Ayrıca, macOS'larda görünürlük durumu pencere tıkanıklık durumunu da izler. Eğer pencere başka bir pencere tarafından tıkanmışsa (örneğin kaplanmış) görünürlük durumu `görünmez` olacaktır. Diğer platformlarda pencere durumu simge durumuna küçültülmüş veya özellikle `win.hide()` ile görünmez yapılmışsa görünürlük durumu `görünmez` olacaktır.
* `Göster: false` ile bir `BrowserWindow` oluşturulursa, ilk görünürlük durumu pencere aslında gizli olmakla birlikte `görünür` olacaktır.
* Eğer `backgroundThrottling` devre dışı bırakılmışsa görünürlük durumu pencere simge durumuna küçültülmüş, tıkanmış veya görünmez olmuş olsa bile `görünür` olacaktır.

Güç tüketimini en aza indirmek için yoğun işlemleri görünürlük durumu `görünmez` olduğunda durdurmanız tavsiye edilir.

### Platform bildirimleri

* MacOS'larda kalıcı pencereler üst pencereye eklenmiş sayfalar gibi görünür.
* Windows ve Linux alt pencerelerinde iken üst pencere hareket ettiğinde hareket etmezken MacOS'ta alt pencereler, üst pencere ile göreli konumunu korurlar.
* Windows'ta, ana pencereyi dinamik olarak değiştirme işlemi desteklenmez.
* Linux'ta, kalıcı pencerelerin türü `iletişim kutusu` olarak değiştirilecektir.
* Linux'ta birçok masaüstü ortamı, kalıcı bir pencereyi gizleme özelliğini desteklemez.

## Sınıf: Tarayıcı Penceresi

> Tarayıcı pencerelerini kontrol etme ve oluşturma.

Süreç: [Ana](../glossary.md#main-process)

`BrowserWindow` bir [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter)'dır.

`Seçenekler` tarafından belirlenen yerel özellikleri içeren yeni bir `BrowserWindow` oluşturur.

### `yeni Tarayıcı Penceresi ([options])`

* `seçenekler` Obje (isteğe bağlı) 
  * `width` Integer (isteğe bağlı) - Pencerenin pixel olarak genişliği. Varsayılan `800`'dür.
  * `height` Integer (isteğe bağlı) - Pencerenin pixel olarak yüksekliği. Varsayılan `600`'dür.
  * `x` Integer (isteğe bağlı) (**gerekli** eğer y kullanılmışsa) - Pencerenin ekrandan sol offseti. Varsayılan pencere ortasıdır.
  * `y` Integer (isteğe bağlı) (**required** eğer x kullanılmışsa) - Pencerenin ekrandan üst offseti. Varsayılan pencere ortasıdır.
  * `useContentSize` Boolean (isteğe bağlı) - `Genişlik` ve `yüksekliğin` web sayfasının boyutu olarak kullanılması gerçek pencerenin boyutunun, pencere çerçevesinin boyutunu ve biraz daha fazlasını içereceği anlamına gelmektedir. Varsayılan `false`'dur.
  * `center` Boolean (isteğe bağlı) - Pencereyi ekranın ortasında gösterin.
  * `minWidth` Integer (isteğe bağlı) - Pencerenin minimum genişliği. Varsayılan ``'dır.
  * `minHeight` Integer (isteğe bağlı) - Pencerenin minimum yüksekliği. Varsayılan ``'dır.
  * `maxWidth` Integer (isteğe bağlı) - Pencerenin maksimum genişliği. Varsayılan bir limit yoktur.
  * `maxHeight` Integer (isteğe bağlı) - Pencerenin maksimum yüksekliği. Varsayılan bir limit yoktur.
  * `resizable` Boolean (isteğe bağlı) - pencerenin yeniden boyutlandırılıp boyutlandırılamadığıdır. Varsayılan değer `true`'dur.
  * `movable` Boolean (isteğe bağlı) - Sayfanın hareket edip edemediğidir. Bu Linux'ta uygulanmaz. Varsayılan `true`'dur.
  * `minimizable` Boolean (isteğe bağlı) - Sayfanın simge durumuna küçültülüp küçültülemediğir. Bu Linux'ta uygulanmaz. Varsayılan `true`'dur.
  * `maximizable` Boolean (isteğe bağlı) - pencerenin maksimum boyuta getirilip getirilemeyeceğidir. Bu Linux'ta uygulanmaz. Varsayılan `true`'dur.
  * `closable` Boolean (isteğe bağlı) - Pencerenin kapatılıp kapatılamayacağıdır. Bu Linux'ta uygulanmaz. Varsayılan `true`'dur.
  * `focusable` Boolean (isteğe bağlı) - Pencerenin odaklanıp odaklanamayacağını belirtir. Varsayılan `true`'dur. Windows'ta `focusable: false` ayarı `skipTaskbar: true` anlamına da gelir. Linux ayarlarında `focusable: false` pencerenin wm ile olan etkileşimi durdurur, bu yüzden pencere her zaman tüm çalışma alanlarının en üstünde durur.
  * `alwaysOnTop` Boolean (isteğe bağlı) - Pencerenin her zaman diğer pencerelerin üstünde kalıp kalmaması gerekliliği. Varsayılan `false`'dur.
  * `fullscreen` Boolean (isteğe bağlı) - Pencerenin tam ekranda gösterilip gösterilmeyeceği. MacOS'ta özellikle değer `false` olarak ayarlandığında tam ekran düğmesi görünmez veya devre dışı olacaktır. Varsayılan `false`'dur.
  * `fullscreenable` Boolean (isteğe bağlı) - Pencerenin tam ekrana moduna alınıp alınamayacağı. MacOs'ta, Ekranı Kapla/Yakınlaştır düğmesinin tam ekran modunu veya Ekranı Kapla penceresini değiştirip değiştirmeyeceği de belirtmektedir. Varsayılan `true`'dur.
  * `skipTaskbar` Boolean (isteğe bağlı) - Pencerenin görev çubuğunda görünüp görünmeyeceği. Varsayılan `false`'dur.
  * `kiosk` Boolean (isteğe bağlı) - Kiosk modu. Varsayılan `false`'dur.
  * `title` String (isteğe bağlı) - Varsayılan pencere başlığı. Varsayılan `"Electron"`dur.
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı) - Pencere ikonu. Windows'ta en iyi görsel efektleri almak için `ICO` simgelerini kullanmanızı öneririz, ayrıca onu tanımlanmamış şekilde bırakabilirsiniz bu şekilde çalıştırılılabilir ikon kullanılacaktır.
  * `show` Boolean (isteğe bağlı) - Oluşturulduğunda pencerenin gösterilip gösterilmeyeceği. Varsayılan değer `true`.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Default is `true`.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
  * `acceptFirstMouse` Boolean (isteğe bağlı) - Web görüntüsünün aynı anda pencereyi etkinleştiren tek bir fare tıklaması olayını kabul edip etmediğini belirtir. Varsayılan değer `false`.
  * `disableAutoHideCursor` Boolean (isteğe bağlı) - Yazarken imleç gizlenip gizlenmeyecek. Varsayılan değer `false`.
  * `autoHideMenuBar` Boolean (isteğe bağlı) - `Alt` tuşuna basmadığınız sürece menü çubuğunu otomatik olarak gizler. Varsayılan değer `false`.
  * `enableLargerThanScreen` Boolean (isteğe bağlı) - Pencerenin ekran boyutundan daha büyük boyutlandırılmasını etkinleştirin. Varsayılan değer `false`.
  * `backgroundColor` String (optional) - Window's background color as Hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Varsayılan değer `#FFF` (beyaz).
  * `hasShadow` Boolean (isteğe bağlı) - Pencerenin gölge olması gerekip gerekmediğini belirtir. Bu sadece macOS'ta uygulanır. Varsayılan değer `true`.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `varsayılan`. Olası değerler şunlar: 
    * `default` - Standart gri opak Mac başlık çubuğunda sonuç verir.
    * `hidden` - Gizli başlık çubuğunda ve tam boyutlu bir içerik penceresinde sonuç verir, ancak başlık çubuğunun sol üst tarafında hala standart pencere kontrolleri ("trafik ışıkları") vardır.
    * `hidden-inset` - Kullanımdan kaldırıldı, bunun yerine `hiddenInset` kullanın.
    * `hiddenInset` - Trafik ışığı düğmelerinin pencere kenarında biraz daha yerleştirildiği alternatif bir görünüme sahip gizli bir başlık çubuğunda sonuç verir.
    * `customButtonsOnHover` Boolean (isteğe bağlı) - MacOS çerçevesiz pencerelerde özel kapatma, küçültme ve tam ekran düğmeleri çizin. Bu düğmeler, pencerenin sol üst köşesine gelmediğiniz sürece görüntülenmez. Bu özel tuşlar, standart pencere araç çubuğu tuşlarıyla oluşan fare olaylarıyla ilgili sorunları önlemektedir. **Note:** Bu seçenek şu anda deneme niteliğinde.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the tile bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. `false` olarak ayarlamak pencere gölgesini ve pencere animasyonlarını kaldıracaktır. Varsayılanı `true`.
  * `vibrancy` Dizi (isteğe bağlı) - Pencereye sadece macOS'ta bir tür canlılık efekti ekleyin. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. `true` ise, pencere büyütülürken web sayfasının tercih edilen genişliğine, `false` genişliğinin ekranın genişliğine yaklaşmasına neden olur. This will also affect the behavior when calling `maximize()` directly. Varsayılanı `false`.
  * `tabbingIdentifier` Dize (isteğe bağlı) - Sekme grubu adı, pencerenin macOS 10.12+ sürümünde yerel sekme olarak açılmasına izin verir. Aynı sekme tanımlayıcısına sahip olan Windows birlikte gruplandırılacaktır. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Varsayılanı `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Varsayılanı `false`. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. Bu komut dosyasında, düğüm entegrasyonunun açık veya kapalı olmasına bakılmaksızın düğüm API'lerine her zaman erişilebilmektedir. Değer, komut dosyasının salt dosya yolu olmalıdır. Düğüm entegrasyonu kapatıldığında, önceden yüklenmiş komut dosyası düğümün genel başvuru bayrağını genel kapsamdan yeniden başlatır. Örneği [gör](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity`Boolean (optional) -`false`olduğunda, aynı kaynak ilkesini devre dışı bırakır (genellikle kişiler deneme web sitelerini kullanılır) ve kullanıcı tarafından ayarlanmamışsa bu seçenekleri `allowRunningInsecureContent` `true` ayarlayın,. Varsayılanı `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. Desteklenen özellik dizelerinin tam listesini [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) dosyasında bulabilirsiniz.
    * `defaultFontFamily` Obje (isteğe bağlı) - Kullanılan varsayılan yazı tipini ayarlar. 
      * `standard` Dize (isteğe bağlı) - Varsayılanı `Times New Roman` olarak belirler.
      * `serif` Dize (isteğe bağlı) - Varsayılanı `Times New Roman` olarak belirler.
      * `sansSerif` Dize (isteğe bağlı) - Varsayılanı `Arial` olarak belirler.
      * `monospace` Dize (isteğe bağlı) - Varsayılanı `Courier New` olarak belirler.
      * `cursive` Dize (isteğe bağlı) - Varsayılanı `Script` olarak belirler.
      * `fantasy` Dize (isteğe bağlı) - Varsayılanı `impact` olarak belirler.
    * `defaultFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `16` olarak belirler.
    * `defaultMonospaceFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `13` olarak belirler.
    * `minimumFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `` olarak belirler.
    * `defaultEncoding` Dize (isteğe bağlı) - Varsayılanı `ISO-8859-1` olarak belirler.
    * `backgroundThrottling` Bağlaç (isteğe bağlı) - Sayfa arka plandayken animasyonların ve zamanlayıcıların kısıtlanması. Bu ayrıca \[Sayfa Görünürlük API\]\[#page-visibility\]'sini etkiler. Varsayılanı `true` olarak belirler.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Varsayılanı `false` olarak belirler. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Varsayılanı `false` olarak belirler. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:**`<webview>`için yapılandırılmış `preload` komut dosyası, çalıştırıldığında düğüm entegrasyonunun etkinleştirilmesini sağlar bu nedenle uzak/güvenilir olmayan içeriğin muhtemel kötü amaçlı `preload` komut dosyası içeren bir `<webview>` etiketi oluşturamayacağından emin olmanız gerekir. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

`type` seçeneğinin olası değerleri ve davranışları platform bağımlıdır. Olası değerler şunlardır:

* Linux'ta olası türler `masaüstü`, `dock`, `araç çubuğu`, `splash`, `bildirim`'dir.
* MacOS'ta olası değerler `masaüstü`, `textured`. 
  * The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
  * The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
* On Windows, possible type is `toolbar`.

### Örnek etkinlikler

Objects created with `new BrowserWindow` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Event: 'page-title-updated'

Dönüşler:

* `olay` Olay
* `title` String

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.

#### Etkinlik: 'kapalı'

Dönüşler:

* `olay` Olay

Pencere kapatıldığında ortaya çıkmaktadır. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. Örneğin:

```javascript
window.onbeforeunload = (e) => {
  console.log('I do not want to be closed')

  // Unlike usual browsers that a message box will be prompted to users, returning
  // a non-void value will silently cancel the close.
  // It is recommended to use the dialog API to let the user confirm closing the
  // application.
  e.returnValue = false
}
```

#### Etkinlik: 'kapatıldı'

Pencere kapatıldığında ortaya çıkmaktadır. Bu etkinliği aldıktan sonra, pencereye yapılan göndermeyi kaldırmalı ve daha fazla kullanmamalısınız.

#### Event: 'session-end' *Windows*

Güç oturumun kapatılması nedeniyle pencere oturumu sona erdiği zaman veya makine yeniden başlatılmasında veya oturumu kapatmada ortaya çıkmaktadır.

#### Etkinlik: 'tepkisiz'

Web sayfası tepkisiz kaldığında yayımlanır.

#### Etkinlik: 'duyarlılık'

Yanıt vermeyen internet sayfası tekrar yanıt verdiğinde ortaya çıkmaktadır.

#### Etkinlik: 'bulanık'

Pencere odağı kaybettiğinde ortaya çıkmaktadır.

#### Etkinlik: 'odak'

Pencere odaklandığında ortaya çıkmaktadır.

#### Etkinlik: 'göster'

Pencere gösterildiğinde ortaya çıkmaktadır.

#### Etkinlik: 'gizle'

Pencere gizlendiğinde ortaya çıkmaktadır.

#### Etkinlik: 'gösterilmeye-hazır'

İnternet sayfası oluşturulduğunda (gösterilmemesine rağmen) yayılmaktadır ve pencere, görsel bir flaş olmadan görüntülenebilir.

#### Etkinlik: 'maximize' 

Pencere simge durumuna getirildiğinde ortaya çıkmaktadır.

#### Etkinlik: 'unmaximize'

Pencere maksimum bir durumda çıktığında ortaya çıkar.

#### Etkinlik: 'minimize' 

Pencere minimize edildiğinde ortaya çıkmaktadır.

#### Etkinlik: 'onarmak'

Pencere küçültülmüş bir durumdan geri yüklendiğinde ortaya çıkmaktadır.

#### Etkinlik: 'yeniden boyutlandırma'

Pencere yeniden boyutlandırıldığında ortaya çıkar.

#### Etkinlik: 'hareket ettir'

Pencere yeni bir konuma getirildiği zaman ortaya çıkmaktadır.

**Note**: On macOS this event is just an alias of `moved`.

#### Etkinlik: 'moved' *macOS*

Emitted once when the window is moved to a new position.

#### Etkinlik: 'enter-full-screen'

Emitted when the window enters a full-screen state.

#### Etkinlik: 'leave-full-screen'

Emitted when the window leaves a full-screen state.

#### Etkinlik: 'enter-html-full-screen'

Emitted when the window enters a full-screen state triggered by HTML API.

#### Etkinlik: 'leave-html-full-screen'

Emitted when the window leaves a full-screen state triggered by HTML API.

#### Event: 'app-command' *Windows*

Dönüşler:

* `olay` Olay
* `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. Bunlar genel olarak klavye ortam tuşları ya da tarayıcı komutları ve ayrıca Windows'da ki bazı farelerde olan "Geri" düğmesiyle ilgilidir.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

#### Event: 'scroll-touch-begin' *macOS*

Emitted when scroll wheel event phase has begun.

#### Event: 'scroll-touch-end' *macOS*

Emitted when scroll wheel event phase has ended.

#### Event: 'scroll-touch-edge' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Event: 'swipe' *macOS*

Dönüşler:

* `olay` Olay
* `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Olay: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Statik yöntemler

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* dizi `yolu`

Adds Chrome extension located at `path`, and returns extension's name.

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeExtension(name)`

* `name` String

İsme göre bir Chrome eklentisi kaldır.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.addDevToolsExtension(path)`

* dizi `yolu`

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` String

İsme göre bir DevTools eklentisi kaldır.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### Örnek özellikleri

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// In this example `win` is our instance
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Örnek yöntemleri

Objects created with `new BrowserWindow` have the following instance methods:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Pencerenin üzerine odaklanır.

#### `win.blur()`

Odak penceresinden kaldırır.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Pencereyi gösterir, ancak üzerine odaklanmaz.

#### `win.hide()`

Hides the window.

#### `win.isVisible()`

Returns `Boolean` - Whether the window is visible to the user.

#### `win.isModal()`

Returns `Boolean` - Whether current window is a modal window.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Unmaximizes the window.

#### `win.isMaximized()`

Returns `Boolean` - Whether the window is maximized.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Restores the window from minimized state to its previous state.

#### `win.isMinimized()`

Returns `Boolean` - Whether the window is minimized.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Pencerenin tam ekran modunda olup olmadığını ayarlar.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

Bu, görüntü oranını koruyan bir pencere oluşturacaktır. Ekstra bir boyut, geliştiricinin piksel cinsinden belirtilen, görüntü oranı hesaplamaları içine dahil edilmeyen yere sahip olmasını sağlar. Bu API, önceden bir pencerenin boyutu ile içerik boyutu arasındaki farkı dikkate almaktadır.

Bir HD video oynatıcısına ve ilişkili olan kontrollere sahip normal bir pencere düşünün. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sadece Genel İçerik görünümünde herhangi bir ekstra genişlik ve yükseklik alanlarını toplamak yeterlidir.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
* `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### `win.closeFilePreview()` *macOS*

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Dikdörtgen](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window to the supplied bounds

#### `win.getBounds()
`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Dikdörtgen](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Pencerenin müşteri alanını (örneğin, Web sayfası) boyutlandırmakta,taşımakta ve verilen sınırlara getirmektedir.

#### `win.getContentBounds()`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setSize(width, height[, animate])
`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window to `width` and `height`.

#### `win.getSize()`

Returns `Integer[]` - Contains the window's width and height.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) *macOS*

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

Returns `Integer[]` - Contains the window's client area's width and height.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Pencerenin kullanıcı tarafından manuel olarak yeniden boyutlandırılacağını tanımlar.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Pencerenin kullanıcı tarafından taşınabilir olup olmadığını ayarlar. Linux için bir önemi yoktur.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Yakınlaştırma düğmesinin tam ekran modunu değiştirip değiştirmeyeceğini veya pencereyi en yükseğe çıkarıp büyütüp büyütmediğini belirtir.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Pencerenin kullanıcı tarafından el ile kapatılıp bırakılmayacağını tanımlar. Linux'ta önemi yok.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String opsiyonel) *macOS*- Değerleri içerir `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, ve ~~`dock`~~ (Artık kullanılmaz). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Pencerenin her zaman diğer pencerelerin üstünde gösterilip gösterilmeyeceğini ayarlamaktadır. Bu ayarlamadan sonra, pencere hala odaklanılamayan bir araç kutusu penceresi değil normal bir pencere olacaktır.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` tamsayı
* `x` tamsayı
* `animate` Boolean (optional) *macOS*

Moves window to `x` and `y`.

#### `win.getPosition()`

Returns `Integer[]` - Contains the window's current position.

#### `win.setTitle(title)`

* `title` String

Changes the title of native window to `title`.

#### `win.getTitle()`

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` *macOS*

* `offsetY` Float
* `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Kullanıcının dikkatini çekmek amacıyla pencere yanıp sönmeye başlar veya durur.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Pencerenin görev çubuğunda gösterilmemesini sağlar.

#### `win.setKiosk(flag)`

* `flag` Boolean

Enters or leaves the kiosk mode.

#### `win.isKiosk()`

Returns `Boolean` - Whether the window is in kiosk mode.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Unhook the window message.

#### `win.unhookAllWindowMessages()` *Windows*

Unhooks all of the window messages.

#### `win.setRepresentedFilename(filename)` *macOS*

* `filename` String

Pencerenin temsil ettiği dosyanın yol adını belirler ve dosya simgesi pencerenin başlık çubuğunda gösterilmiş olur.

#### `win.getRepresentedFilename()` *macOS*

Returns `String` - The pathname of the file the window represents.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### `win.isDocumentEdited()` *macOS*

Returns `Boolean` - Whether the window's document has been edited.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The bounds to capture
* `callback` Fonksiyon 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` Dize
* `opsiyonlar` Obje (isteğe bağlı) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opsiyonel)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

You can load a URL using a `POST` request with URL-encoded data by doing the following:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` çift
* `options` Obje (isteğe bağlı) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error`, or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### `win.setOverlayIcon(overlay, description)` *Windows*

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### `win.setHasShadow(hasShadow)` *macOS*

* `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### `win.hasShadow()` *macOS*

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Görev çubuğu düğmesi üzerinde olan pencerenin küçük resim görüntüsüne belirli düğmeler kümesi içeren bir minik resim araç çubuğu ekleyin. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

Alan kısıtlamaları nedeniyle, minik resim araç çubuğundaki düğmelerin sayısı 7'yi geçmemelidir. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

* `Button` Nesne 
  * `icon` [NativeImage](native-image.md) - The icon showing in thumbnail toolbar.
  * `tıklama`fonksiyonu
  * `ipucu` Dize (isteğe bağlı) - Düğmenin araç ipucu metni.
  * `bayraklar` String [] (isteğe bağlı) - Belirli durumları ve davranışlarını denetler buton. Varsayılan olarak, `['etkinleştirilmiş']`.

`bayrakları` aşağıdaki Dizelerini takip eden bir `dizidir`:

* `etkinleştirilmiş` - Düğme etkin ve kullanıcı tarafından kullanılabilir.
* `devre dışı` - Düğme devre dışı. Var, ancak görsel bir durumu var ise kullanıcının eylemine yanıt vermeyeceğini belirtir.
* `kapatmaya tıkla` - Düğmeye tıklandığında küçük resim penceresi kapanır hemen.
* `arka plan yok` - Bir düğme kenarlığı çizmeyin, yalnızca resmi kullanın.
* `gizli` - Düğme kullanıcıya gösterilmez.
* `etkileşimli olmayan` - Düğme etkin ancak etkileşimli değil; basılan yok düğme durumu çizilir. Bu değer, düğmenin bir bildirimde kullanılır.

#### `win.setThumbnailClip(region)` *Windows*

* `region` [Rectangle](structures/rectangle.md) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{x: 0, y: 0, width: 0, height: 0}`.

#### `win.setThumbnailToolTip(toolTip)` *Windows*

* `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### `win.setAppDetails(options)` *Windows*

* `options` Nesne 
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is ``.
  * `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` *macOS*

Same as `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` *Windows* *Linux*

* `icon` [NativeImage](native-image.md)

Pencere simgesi değiştirme.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Set penceresinin menü çubuğu otomatik olarak gizlenir. Ayar yaptıktan sonra, menü çubuğu yalnızca kullanıcı ` Alt` tuşu bastığında görüntülenir.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Menü çubuğu görünür olarak ayarlanırsa, menü çubuğu otomatik olarak gizlenirken`Alt` tuşuna basarak menü çubuğu görüntülenmeye devam edebilir.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Pencerenin tüm çalışma alanlarında görünüp görünmeyeceğini ayarlamaktadır.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore)`

* `ignore` Boolean

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Pencere içeriğinin diğer uygulamalar tarafından el konmasını engellemektedir.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` *Windows*

* `focusable` Boolean

Changes whether the window can be focused.

#### `win.setParentWindow(parent)` *Linux* *macOS*

* `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow` - The parent window.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` *macOS*

* `autoHide` Boolean

Controls whether to hide cursor when typing.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Olabilir `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Daha fazla ayrıntı için [macOS dökümanlarını](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) inceleyin.

Tarayıcı penceresine titreşim efekti ekler. `null` ve boş bir string göndermek penceredeki titreşim efektini kaldırır.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Not:** TouchBar API'si şu anda deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.
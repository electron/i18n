# BrowserWindow

> Tarayıcı pencerelerini kontrol etme ve oluşturma.

İşlem: [Ana](../glossary.md#main-process)

```javascript
// Ana süreçte.
const {BrowserWindow} = ('electron') gerektirir

// Ya da oluşturucu işleminden `kumanda` kullanın.
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

### Gösterime Hazır Etkinlik Kullanımı 

Sayfayı yüklerken, pencerenin henüz gösterilmemesi durumunda, oluşturucu işlemi sayfayı ilk kez işlediğinde, ` hazır göster ` olayı yayımlanacaktır. Bu olayın ardından bir pencere gösterildiğinde görsel bir flaş yok:

```javascript
const {BrowserWindow} = require ('elektron') win = yeni BrowserWindow olsun ({show: false}) win.once ('ready to show', () => {win.show () })
```

Bu olay genellikle `did-finish-load` olayından sonra verilir, ancak birçok uzak kaynağa sahip sayfalar için `did-finish-load` olayından önce yayınlanabilir.

### `backgroundColor` ayarlama

Karmaşık bir uygulama için, `ready-to-show` etkinliği çok geç yayınlanarak uygulamanın yavaşlamasına neden olabilir. Bu durumda, pencereyi derhal göstermeniz ve uygulamanızın arka planına yakın bir `backgroundColor` kullanmanız önerilir:

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({backgroundColor: '#2e2c29'})
win.loadURL('https://github.com')
```

` hazır göster </ 0>  etkinliğine sahip olan uygulamalar için bile, uygulamanın daha doğal hissetmesini sağlamak için <code>arka plan rengi </ 0> ayarlamanız önerilir .</p>

<h2>Ana ve alt pencereler</h2>

<p><code>parent` seçeneğini kullanarak türetilmiş pencereler yaratabilirsiniz:

```javascript
const {BrowserWindow} = require ('elektron') 

let top = yeni BrowserWindow()
 izin ver çocuk = yeni BrowserWindow ({parent: top})
 child.show ()
 top.show ()
```

`child` penceresi daima `top` penceresinin üstünde gösterilir.

### Model pencereler

Modal bir pencere, üst pencereyi devre dışı bırakan ve bir kalıcı pencere oluşturmak için kullanılan alt penceredir, hem `parent` hem de `modal` seçeneklerini ayarlamanız gerekir:

```javascript
const {BrowserWindow} = require ('elektron')

izin ver çocuk = yeni BrowserWindow({parent: top, modal: true, show: false})
child.loadURL('https://github.com')
 ('ready to show', () => {
child.show ()
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

> Tarayıcı pencereleri kontrol etme ve oluşturma.

İşlem: [Ana](../glossary.md#main-process)

`BrowserWindow` bir [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter)'dır.

`Seçenekler` tarafından belirlenen yerel özellikleri içeren yeni bir `BrowserWindow` oluşturur.

### `yeni Tarayıcı Penceresi ([options])`

* `seçenekler` Obje (opsiyonel) 
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
  * `fullscreenable` Boolean (isteğe bağlı) - Pencerenin tam ekrana moduna alınıp alınamayacağı. MacOs'ta, Ekranı Kapla/Yakınlaştır düğmesinin tam ekran modunu veya Ekranı Kapla penceresini değiştirip değiştirmeyeceği de belirtmektedir. Varsayılanı `true`.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Default is `false`.
  * `skipTaskbar` Boolean (isteğe bağlı) - Pencerenin görev çubuğunda görünüp görünmeyeceği. Varsayılan `false`'dur.
  * `kiosk` Boolean (isteğe bağlı) - Kiosk modu. Varsayılan `false`'dur.
  * `title` String (isteğe bağlı) - Varsayılan pencere başlığı. Varsayılan `"Electron"`dur.
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı) - Pencere ikonu. Windows'ta en iyi görsel efektleri almak için `ICO` simgelerini kullanmanızı öneririz, ayrıca onu tanımlanmamış şekilde bırakabilirsiniz bu şekilde çalıştırılılabilir ikon kullanılacaktır.
  * `show` Boolean (isteğe bağlı) - Oluşturulduğunda pencerenin gösterilip gösterilmeyeceği. Varsayılan değer `true`.
  * `çerçeve` Boole (isteğe bağlı) - Oluşturmak için `yanlış` değerini belirtin. [ Çerçevesiz Pencere](frameless-window.md). Varsayılan ` doğrudur`.
  * `üst` BrowserWindow (isteğe bağlı) - Üst pencereyi belirtin. Varsayılan `boş`.
  * `kip` Boole (isteğe bağlı) - Bu, kalıcı bir pencere olup olmadığı. Bu, yalnızca pencere çocuk penceresidir. Varsayılan değer `yanlış`.
  * `acceptFirstMouse` Boolean (isteğe bağlı) - Web görüntüsünün aynı anda pencereyi etkinleştiren tek bir fare tıklaması olayını kabul edip etmediğini belirtir. Varsayılan değer `false`.
  * `disableAutoHideCursor` Boolean (isteğe bağlı) - Yazarken imleç gizlenip gizlenmeyecek. Varsayılan değer `false`.
  * `autoHideMenuBar` Boolean (isteğe bağlı) - `Alt` tuşuna basmadığınız sürece menü çubuğunu otomatik olarak gizler. Varsayılan değer `false`.
  * `enableLargerThanScreen` Boolean (isteğe bağlı) - Pencerenin ekran boyutundan daha büyük boyutlandırılmasını etkinleştirin. Varsayılan değer `false`.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md). Default is `false`.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are: 
    * `default` - Results in the standard gray opaque Mac title bar.
    * `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
    * `hidden-inset` - Deprecated, use `hiddenInset` instead.
    * `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, minimize, and full screen buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the tile bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Varsayılanı `true`.
  * `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Varsayılan `false`'dur.
  * `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
  * `webPreferences` Object (optional) - Settings of web page's features. 
    * `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Varsayılanı `true`.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
    * `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Varsayılan `false`'dur. More about this can be found in [Multithreading](../tutorial/multithreading.md).
    * `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](process.md#event-loaded).
    * `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](sandbox-option.md). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `session` [Session](session.md#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
    * `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. Aynı `partition` bölümü atayarak, aynı oturumda birden çok sayfa paylaşabilir. Default is the default session.
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
    * `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Varsayılanı `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
    * `images` Boolean (optional) - Enables image support. Default is `true`.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
    * `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
    * `experimentalCanvasFeatures` Boolean (optional) - Enables Chromium's experimental canvas features. Default is `false`.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
    * `blinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) file.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family. 
      * `standard` String (optional) - Defaults to `Times New Roman`.
      * `serif` String (optional) - Defaults to `Times New Roman`.
      * `sansSerif` String (optional) - Defaults to `Arial`.
      * `monospace` String (optional) - Defaults to `Courier New`.
      * `cursive` String (optional) - Defaults to `Script`.
      * `fantasy` String (optional) - Defaults to `Impact`.
    * `defaultFontSize` Integer (optional) - Defaults to `16`.
    * `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
    * `minimumFontSize` Integer (optional) - Defaults to ``.
    * `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
    * `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Varsayılan değer `false`. See the [offscreen rendering tutorial](../tutorial/offscreen-rendering.md) for more details.
    * `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab. **Note:** This option is currently experimental and may change or be removed in future Electron releases.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](webview-tag.md). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](web-contents.md) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.

Minimum veya maksimum pencere boyutunu ` min ile ayarlarken Genişlik` / ` maks Genişlik` / ` min Yükseklik` / ` maxHeight`, yalnızca kullanıcıları sınırlandırır. Sizi engellemeyecektir boyut sınırlamalarını takip etmeyen bir boyutu ` setBounds`/ ` Boyut ayarla` veya `Tarayıcı penceresi yapıcısına`.

`type` seçeneğinin olası değerleri ve davranışları platform bağımlıdır. Olası değerler şunlardır:

* Linux'ta olası türler `masaüstü`, `dock`, `araç çubuğu`, `splash`, `bildirim`'dir.
* MacOS'ta olası değerler `masaüstü`, `dokulu`. 
  * ` dokulu` türü metal eğimi görünümünü ekler (` NSTexturedBackgroundWindowMask`).
  * `Masaüstü` modeli, pencereyi masaüstü arka planındaki pencere seviyesine yerleştirir (`kCGDesktopWindowLevel - 1`). Masaüstü penceresi klavye veya farenin durumunu odak olarak kaydetmeyecektir. Ancak veri girişini tedbirli bir şekilde yapmak için `globalShortcut` kullanabilirisinz.
* Windows'ta mümkün olan model `toolbar` 'dır.

### Örnek Events

`new BrowserWindow` ile yaratılan neseneler aşağıdaki özellikleri belirtir:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `event` Event
* `title` String

Belge, başlığını değiştirdiğinde ifade edilir, `event.preventDefault()` kullanmak doğal windows başlığının değişmesine engel olur.

#### Etkinlik: 'kapalı'

Dönüşler:

* `event` Olay

Pencere kapatıldığında ortaya çıkmaktadır. DOM 'un `beforeunload` ve `unload` etkinliklerinden önce ifade edilir. ` olayı.preventDefault ()`öğesini çağırma kapanış iptal edecek.

Genellikle ` onbeforeunload` işleyicisini kullanmak isteyip istemediğinize karar vermek için pencere kapalı olmalıdır; pencere açıldığında da çağrılır yeniden. Elektron'da ` tanımsız` dışındaki herhangi bir değeri geri getirmek kapat. Örneğin:

```javascript
window.onbeforeunload = (e) => {
  console.log('kapatılmak istemiyorum')

  // Alışılmış tarayıcıların aksine, kullanıcılara bir mesaj kutusu yönlendirilir, geri getirilmesi halinde
  // olmayan bir boşluk sessizce kapanmayı iptal eder.
  // Kullanıcının diyalog API ' ı kullanarak uygulamayı kapatması sağlanması
  // önerilmektedir.
  e.returnValue = false // equivalent to `return false` but not recommended
}
```

***Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of just returning a value, as the former works more consistently within Electron.*

#### Etkinlik: 'kapatıldı'

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Etkinlik: 'oturum-sonu' *Windows*

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### Etkinlik: 'tepkisiz'

Emitted when the web page becomes unresponsive.

#### Etkinlik: 'duyarlılık'

Emitted when the unresponsive web page becomes responsive again.

#### Etkinlik: 'bulanık'

Emitted when the window loses focus.

#### Etkinlik: 'odak'

Emitted when the window gains focus.

#### Etkinlik: 'göster'

Emitted when the window is shown.

#### Etkinlik: 'gizle'

Emitted when the window is hidden.

#### Etkinlik: 'gösterilmeye-hazır'

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### Etkinlik: 'maximize' 

Emitted when window is maximized.

#### Etkinlik: 'unmaximize'

Emitted when the window exits from a maximized state.

#### Etkinlik: 'minimize' 

Emitted when the window is minimized.

#### Etkinlik: 'onarmak'

Emitted when the window is restored from a minimized state.

#### Etkinlik: 'yeniden boyutlandırma'

Emitted when the window is being resized.

#### Etkinlik: 'hareket ettir'

Emitted when the window is being moved to a new position.

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

#### Etkinlik: 'uygulama-komutu' *Windows*

Dönüşler:

* `event` Olay
* `command` Dizi

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

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

#### Etkinlik: 'kaydır-dokun-başla' *macOS*

Emitted when scroll wheel event phase has begun.

#### Etkinlik: 'kaydır-dokun-bitir' *macOS*

Emitted when scroll wheel event phase has ended.

#### Etkinlik: 'kaydır-dokun-kenar' *macOS*

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### Etkinlik: 'hızlı kaydır' *macOS*

Dönüşler:

* `event` Olay
* `direction` Dizi

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Emitted when the window opens a sheet.

#### Event: 'sheet-end' *macOS*

Emitted when the window has closed a sheet.

#### Olay: 'new-window-for-tab' *macOS*

Emitted when the native new tab button is clicked.

### Statik Metodlar

The `BrowserWindow` class has the following static methods:

#### `BrowserWindow.getAllWindows()`

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### `BrowserWindow.addExtension(path)`

* `path` Dizi

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeExtension(name)`

* `name` Dizi

Remove a Chrome extension by name.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.addDevToolsExtension(path)`

* `path` Dizi

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` Dizi

Remove a DevTools extension by name.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

### Örnek Özellikler

Objects created with `new BrowserWindow` have the following properties:

```javascript
const {BrowserWindow} = require('electron')
// bu örnekte örnek sınıfımız "win"
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](web-contents.md) for its methods and events.

#### `win.id`

A `Integer` representing the unique ID of the window.

### Örnek Metodlar

Objects created with `new BrowserWindow` have the following instance methods:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

#### `win.destroy()`

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Focuses on the window.

#### `win.blur()`

Removes focus from the window.

#### `win.isFocused()`

Returns `Boolean` - Whether the window is focused.

#### `win.isDestroyed()`

Returns `Boolean` - Whether the window is destroyed.

#### `win.show()`

Shows and gives focus to the window.

#### `win.showInactive()`

Shows the window but doesn't focus on it.

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

Sets whether the window should be in fullscreen mode.

#### `win.isFullScreen()`

Returns `Boolean` - Whether the window is in fullscreen mode.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### `win.isSimpleFullScreen()` *macOS*

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
* `extraSize` [Size](structures/size.md) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and [ 40, 50 ]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Just sum any extra width and height areas you have within the overall content view.

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

#### `win.getBounds()`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Dikdörtgen](structures/rectangle.md)
* `animate` Boolean (optional) *macOS*

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### `win.getContentBounds()`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setSize(width, height[, animate])`

* `width` Tamsayı
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

* `width` Tamsayı
* `height` Integer

Sets the minimum size of window to `width` and `height`.

#### `win.getMinimumSize()`

Returns `Integer[]` - Contains the window's minimum width and height.

#### `win.setMaximumSize(width, height)`

* `width` Tamsayı
* `height` Integer

Sets the maximum size of window to `width` and `height`.

#### `win.getMaximumSize()`

Returns `Integer[]` - Contains the window's maximum width and height.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Sets whether the window can be manually resized by user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

Linux üzerinde her zaman `true` döndürür.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

Linux üzerinde her zaman `true` döndürür.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

Linux üzerinde her zaman `true` döndürür.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.isFullScreenable()`

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### `win.isClosable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually closed by user.

Linux üzerinde her zaman `true` döndürür.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) *macOS* - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/reference/appkit/nswindow/1664726-window_levels) for more details.
* `relativeLevel` Integer (optional) *macOS* - The number of layers higher to set this window relative to the given `level`. The default is ``. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Whether the window is always on top of other windows.

#### `win.center()`

Moves window to the center of the screen.

#### `win.setPosition(x, y[, animate])`

* `x` Tamsayı
* `y` Tamsayı
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

Starts or stops flashing the window to attract user's attention.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Makes the window not show in the taskbar.

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
* `callback` Fonksiyon

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

* `dosya adı` dize

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

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

* `url` String
* `seçenekler` Obje (opsiyonel) 
  * `httpReferrer` Dizgi (isteğe bağlı) - Bir HTTP başvuru bağlantısı.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opsiyonel)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Bu, yalnızca belirtilen `url` veri url'si ve diğer dosyaları yüklemek gerekiyorsa gereklidir.

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

* `progress` Double
* `seçenekler` Object (isteğe bağlı) 
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

#### `win.setOpacity(opacity)` *Windows* *macOS*

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### `win.getOpacity()` *Windows* *macOS*

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### `win.setThumbarButtons(buttons)` *Windows*

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

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

* `seçenekler` Nesne 
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

* `icon` [DoğalGörüntü](native-image.md)

Changes window icon.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### `win.isMenuBarAutoHide()`

Returns `Boolean` - Whether menu bar automatically hides itself.

#### `win.setMenuBarVisibility(visible)` *Windows* *Linux*

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

Returns `Boolean` - Whether the menu bar is visible.

#### `win.setVisibleOnAllWorkspaces(visible)`

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### `win.isVisibleOnAllWorkspaces()`

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `seçenekler` Object (isteğe bağlı) 
  * `forward` Boolean (optional) *Windows* - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### `win.setContentProtection(enable)` *macOS* *Windows*

* `enable` Boolean

Prevents the window contents from being captured by other apps.

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

#### `win.selectPreviousTab()` *macOS*

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` *macOS*

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.mergeAllWindows()` *macOS*

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` *macOS*

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` *macOS*

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` *macOS*

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type)` *macOS*

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Not:** TouchBar API şu anda deneyseldir ve gelecekteki Electron sürümlerinde değişebilir veya kaldırılabilir.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.
# BrowserWindow

> Tarayıcı pencereleri kontrol etme ve oluşturma.

İşlem: [Ana](../glossary.md#main-process)

```javascript
// Ana süreçte.
const { BrowserWindow } = require('electron')

// Ya da oluşturucu işleminden `remote` kullanın.
// const { BrowserWindow } = require('electron').remote

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})

// Bir URL yükleyin
win.loadURL('https://github.com')

// Ya da yerel bir HTML dosyası yükleyin
win.loadURL(`file://${__dirname}/app/index.html`)
```

## Çerçevesiz pencere

Chrome olmadan bir pencere veya rastgele şekilli bir saydam pencere oluşturmak için [Frameless Window](frameless-window.md) API'sini kullanabilirsiniz.

## Zarif pencere görüntüsü

Sayfa doğrudan pencereye yüklendiğinde, kullanıcı, bitmemiş sayfayı görür; bu, iyi bir yerel uygulama deneyimi değildir. Daha fazla görüntü ve resmi hazır hale getirmek için iki farklı çözüm bulunmaktadır.

## Gösterime Hazır Etkinlik Kullanımı

Sayfayı yüklerken, pencerenin henüz gösterilmemesi durumunda, oluşturucu işlemi sayfayı ilk kez işlediğinde, ` hazır göster ` olayı yayımlanacaktır. Bu olayın ardından bir pencere gösterildiğinde görsel bir flaş yok:

```javascript
const { BrowserWindow } = require ('electron');
let win = new BrowserWindow ({ show: false });
win.once ('ready to show', () => {win.show () })
```

Bu olay genellikle `did-finish-load` olayından sonra verilir, ancak birçok uzak kaynağa sahip sayfalar için `did-finish-load` olayından önce yayınlanabilir.

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

## `backgroundColor` ayarlama

Karmaşık bir uygulama için, `ready-to-show` etkinliği çok geç yayınlanarak uygulamanın yavaşlamasına neden olabilir. Bu durumda, pencereyi derhal göstermeniz ve uygulamanızın arka planına yakın bir `backgroundColor` kullanmanız önerilir:

```javascript
const { BrowserWindow } = require ('electron') 

 let win = new BrowserWindow({ backgroundColor: '#2e2c29' }) win.loadURL ( 'https://github.com')
```

` hazır göster </ 0>  etkinliğine sahip olan uygulamalar için bile, uygulamanın daha doğal hissetmesini sağlamak için <code>arka plan rengi </ 0> ayarlamanız önerilir .</p>

<h2 spaces-before="0">Ana ve alt pencereler</h2>

<p spaces-before="0"><code>parent` seçeneğini kullanarak türetilmiş pencereler yaratabilirsiniz:

```javascript
const { BrowserWindow } = require ('electron') 

let top = new BrowserWindow()
let child = new BrowserWindow ({ parent: top })
 child.show ()
 top.show ()
```

`child` penceresi daima `top` penceresinin üstünde gösterilir.

## Model pencereler

Modal bir pencere, üst pencereyi devre dışı bırakan ve bir kalıcı pencere oluşturmak için kullanılan alt penceredir, hem `parent` hem de `modal` seçeneklerini ayarlamanız gerekir:

```javascript
const { BrowserWindow } = require ('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
 ('ready to show', () => {
child.show ()
})
```

## Sayfa görünürlüğü

[Sayfa Görünürlüğü API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)'si aşağıdaki gibi çalışır:

* Tüm platformlarda, görünürlük durumu, pencerenin görünmez/simge durumuna küçültülmüş olup olmadığını izler.
* Ayrıca, macOS'larda görünürlük durumu pencere tıkanıklık durumunu da izler. Eğer pencere başka bir pencere tarafından tıkanmışsa (örneğin kaplanmış) görünürlük durumu `görünmez` olacaktır. Diğer platformlarda pencere durumu simge durumuna küçültülmüş veya özellikle `win.hide()` ile görünmez yapılmışsa görünürlük durumu `görünmez` olacaktır.
* `Göster: false` ile bir `BrowserWindow` oluşturulursa, ilk görünürlük durumu pencere aslında gizli olmakla birlikte `görünür` olacaktır.
* Eğer `backgroundThrottling` devre dışı bırakılmışsa görünürlük durumu pencere simge durumuna küçültülmüş, tıkanmış veya görünmez olmuş olsa bile `görünür` olacaktır.

Güç tüketimini en aza indirmek için yoğun işlemleri görünürlük durumu `görünmez` olduğunda durdurmanız tavsiye edilir.

## Platform bildirimleri

* MacOS'larda kalıcı pencereler üst pencereye eklenmiş sayfalar gibi görünür.
* Windows ve Linux alt pencerelerinde iken üst pencere hareket ettiğinde hareket etmezken MacOS'ta alt pencereler, üst pencere ile göreli konumunu korurlar.
* Linux'ta, kalıcı pencerelerin türü `iletişim kutusu` olarak değiştirilecektir.
* Linux'ta birçok masaüstü ortamı, kalıcı bir pencereyi gizleme özelliğini desteklemez.

## Sınıf: Tarayıcı Penceresi

> Tarayıcı pencerelerini kontrol etme ve oluşturma.

İşlem: [Ana](../glossary.md#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

`Seçenekler` tarafından belirlenen yerel özellikleri içeren yeni bir `BrowserWindow` oluşturur.

### `yeni Tarayıcı Penceresi ([options])`

* `options` Object (optional)
  * `width` Integer (optional) - Window's width in pixels. Default is `800`.
  * `height` Integer (optional) - Window's height in pixels. Default is `600`.
  * `x` Integer (optional) - (**required** if y is used) Window's left offset from screen. Default is to center the window.
  * `y` Integer (optional) - (**required** if x is used) Window's top offset from screen. Default is to center the window.
  * `useContentSize` Boolean (isteğe bağlı) - `Genişlik` ve `yüksekliğin` web sayfasının boyutu olarak kullanılması gerçek pencerenin boyutunun, pencere çerçevesinin boyutunu ve biraz daha fazlasını içereceği anlamına gelmektedir. Varsayılan `false`'dur.
  * `center` Boolean (isteğe bağlı) - Pencereyi ekranın ortasında gösterin.
  * `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
  * `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
  * `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
  * `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
  * `resizable` Boolean (optional) - Whether window is resizable. Varsayılan `true`'dur.
  * `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Varsayılan `true`'dur.
  * `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Varsayılan `true`'dur.
  * `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Varsayılan `true`'dur.
  * `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Varsayılan `true`'dur.
  * `focusable` Boolean (isteğe bağlı) - Pencerenin odaklanıp odaklanamayacağını belirtir. Varsayılan `true`'dur. Windows'ta `focusable: false` ayarı `skipTaskbar: true` anlamına da gelir. Linux ayarlarında `focusable: false` pencerenin wm ile olan etkileşimi durdurur, bu yüzden pencere her zaman tüm çalışma alanlarının en üstünde durur.
  * `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Varsayılan `false`'dur.
  * `fullscreen` Boolean (isteğe bağlı) - Pencerenin tam ekranda gösterilip gösterilmeyeceği. MacOS'ta özellikle değer `false` olarak ayarlandığında tam ekran düğmesi görünmez veya devre dışı olacaktır. Varsayılan `false`'dur.
  * `fullscreenable` Boolean (isteğe bağlı) - Pencerenin tam ekrana moduna alınıp alınamayacağı. MacOs'ta, Ekranı Kapla/Yakınlaştır düğmesinin tam ekran modunu veya Ekranı Kapla penceresini değiştirip değiştirmeyeceği de belirtmektedir. Varsayılan `true`'dur.
  * `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Varsayılan `false`'dur.
  * `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
  * `kiosk` Boolean (optional) - The kiosk mode. Varsayılan `false`'dur.
  * `title` String (optional) - Default window title. Default is `"Electron"`. If the HTML tag `<title>` is defined in the HTML file loaded by `loadURL()`, this property will be ignored.
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı) - Pencere ikonu. Windows'ta en iyi görsel efektleri almak için `ICO` simgelerini kullanmanızı öneririz, ayrıca onu tanımlanmamış şekilde bırakabilirsiniz bu şekilde çalıştırılılabilir ikon kullanılacaktır.
  * `show` Boolean (optional) - Whether window should be shown when created. Varsayılan `true`'dur.
  * `paintWhenInitiallyHidden` Boolean (optional) - Whether the renderer should be active when `show` is `false` and it has just been created.  In order for `document.visibilityState` to work correctly on first load with `show: false` you should set this to `false`.  Setting this to `false` will cause the `ready-to-show` event to not fire.  Varsayılan `true`'dur.
  * `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](frameless-window.md). Varsayılan `true`'dur.
  * `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
  * `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Varsayılan `false`'dur.
  * `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
  * `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Varsayılan `false`'dur.
  * `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Varsayılan `false`'dur.
  * `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Only relevant for macOS, as other OSes allow larger-than-screen windows by default. Varsayılan `false`'dur.
  * `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha in #AARRGGBB format is supported if `transparent` is set to `true`). Default is `#FFF` (white).
  * `hasShadow` Boolean (optional) - Whether window should have a shadow. Varsayılan `true`'dur.
  * `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  * `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Varsayılan `false`'dur.
  * `transparent` Boolean (optional) - Makes the window [transparent](frameless-window.md#transparent-window). Varsayılan `false`'dur. On Windows, does not work unless the window is frameless.
  * `type` String (optional) - The type of window, default is normal window. See more about this below.
  * `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Olası değerler şunlar:
    * `default` - Standart gri opak Mac başlık çubuğunda sonuç verir.
    * `hidden` - Gizli başlık çubuğunda ve tam boyutlu bir içerik penceresinde sonuç verir, ancak başlık çubuğunun sol üst tarafında hala standart pencere kontrolleri ("trafik ışıkları") vardır.
    * `hiddenInset` - Trafik ışığı düğmelerinin pencere kenarında biraz daha yerleştirildiği alternatif bir görünüme sahip gizli bir başlık çubuğunda sonuç verir.
    * `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** Bu seçenek şu anda deneme niteliğinde.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Varsayılan `false`'dur.
  * ` kalınÇerçeve </ 0>  Boole (opsiyonel) - Kullanım <code> WS_KALIN ÇERÇEVE</ 0> çerçevesiz için stil pencereler üzerinde
 Windows'un standart pencere çerçevesi ekler. <code>false` olarak ayarlamak pencere gölgesini ve pencere animasyonlarını kaldıracaktır. Varsayılan `true`'dur.
  * `vibrancy` Dizi (isteğe bağlı) - Pencereye sadece macOS'ta bir tür canlılık efekti ekleyin. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`.  Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.
  * `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. `true` ise, pencere büyütülürken web sayfasının tercih edilen genişliğine, `false` genişliğinin ekranın genişliğine yaklaşmasına neden olur. `maximize()` Bu komut direk çağrıldığında ayrıca davranışı da etkileyecektir. Varsayılan `false`'dur.
  * `tabbingIdentifier` Dize (isteğe bağlı) - Sekme grubu adı, pencerenin macOS 10.12+ sürümünde yerel sekme olarak açılmasına izin verir. Aynı sekme tanımlayıcısına sahip olan Windows birlikte gruplandırılacaktır. Bu ayrıca pencerenizin sekme çubuğuna yerel yeni bir sekme düğmesi ekler `app` ve pencereye olayına ulaşmanıza izin verir. `new-window-for-tab`.
  * `webPreferences` Object (optional) - Settings of web page's features.
    * ` devAraçlar` Boole (isteğe bağlı) - Dev Araçlar etkinleştirip desteklemeyeceğini belirtir. `yanlış` olarak ayarlanırsa DevTools'u açmak için ` BrowserWindow.webContents.openDevTools ()` kullanamazsınız. Varsayılan `true`'dur.
    * `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Varsayılan `false`'dur.
    * ` nodeIntegrationInWorker` Boolean (isteğe bağlı) - Düğümün tümleştirilip web çalışanlarında etkinleştirildi. Varsayılan `false`'dur. Bununla ilgili daha fazla bilgi bulabilirsiniz [ Multithreading'de](../tutorial/multithreading.md).
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimental option for enabling Node.js support in sub-frames such as iframes and child windows. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not.
    * ` preload` Sicim (isteğe bağlı) - Diğerinden önce yüklenecek bir betiği belirtir sayfalarda komut dosyaları çalıştırın. Bu komut dosyasında, düğüm entegrasyonunun açık veya kapalı olmasına bakılmaksızın düğüm API'lerine her zaman erişilebilmektedir. Değer, komut dosyasının salt dosya yolu olmalıdır. Düğüm entegrasyonu kapatıldığında, önceden yüklenmiş komut dosyası düğümün genel başvuru bayrağını genel kapsamdan yeniden başlatır. Örneği [gör](process.md#event-loaded).
    * ` sandbox` Boole (isteğe bağlı) - Ayarlanırsa, oluşturucuyu gizlenecektir pencere ile ilişkilendirilerek Krom ile uyumlu hale getirilir OS düzeyinde sanal alan ve Node.js motorunu devre. Bu aynı şey değil ` düğüm Entegrasyon` seçeneği ve önyükleme komut dosyasında kullanılabilen API'ler daha sınırlıdır. Seçenek hakkında daha fazla detaya [buradan ](sandbox-option.md) ulaşabilirsiniz.
    * `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](remote.md) module. Varsayılan `true`'dur.
    * `oturum` [Oturum](session.md#class-session) (isteğe bağlı) - Kullanılan oturumu ayarlar sayfa. Oturum nesnesini doğrudan geçirmek yerine bir bölüm dizesini kabul eden `partition` seçeneğini kullanmayı da denebilirsiniz. Ne zaman hem `oturumu` hem de `bölüm` sağlanır, `oturumu` tercih edilir. Varsayılan oturumun varsayılanıdır.
    * `bölüm` Satır (isteğe bağlı) - Sayfanın kullandığı oturumu. oturumun bölümlenmiş satırına göre ayarlar. Eğer `bölümü` ile başlarsa `persist:`, sayfa ile uygulamadaki tüm sayfalar için kalıcı bir oturum kullanacaktır aynı `bölümü`. Hiçbir ` persist`: öneki yoksa, sayfa bellek içi oturumu. Aynı `partition` bölümü atayarak, aynı oturumda birden çok sayfa paylaşabilir. Varsayılan oturumun varsayılanıdır.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. _This property is experimental_
    * `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
    * `javascript` Boolean (optional) - Enables JavaScript support. Varsayılan `true`'dur.
    * `webSecurity`Boolean (optional) -`false`olduğunda, aynı kaynak ilkesini devre dışı bırakır (genellikle kişiler deneme web sitelerini kullanılır) ve kullanıcı tarafından ayarlanmamışsa bu seçenekleri `allowRunningInsecureContent` `true` ayarlayın,. Varsayılan `true`'dur.
    * `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Varsayılan `false`'dur.
    * `images` Boolean (optional) - Enables image support. Varsayılan `true`'dur.
    * `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
    * `webgl` Boolean (optional) - Enables WebGL support. Varsayılan `true`'dur.
    * `plugins` Boolean (optional) - Whether plugins should be enabled. Varsayılan `false`'dur.
    * `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Varsayılan `false`'dur.
    * `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Varsayılan `false`'dur.
    * `enableBlinkFeatures` String (isteğe bağlı) - `,`(virgül) ile ayrılmış özellik dizelerinin bir listesidir. Aktifleştirmek için örneğin; `CSSVariables,KeyboardEventKey`. Desteklenmiş özellik dizelerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında olabilir.
    * ` Blink özelliğini devre dışı bırak ` Dizi (opsiyonel) - `,` ile ayrılmış bir özellikler dizisi. İptal etmek için `CSSVariables, KeyboardEventKey`. Desteklenen özellik dizelerinin tam listesini [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulabilirsiniz.
    * `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
      * `standard` Dize (isteğe bağlı) - Varsayılanı `Times New Roman` olarak belirler.
      * `serif` Dize (isteğe bağlı) - Varsayılanı `Times New Roman` olarak belirler.
      * `sansSerif` Dize (isteğe bağlı) - Varsayılanı `Arial` olarak belirler.
      * `monospace` Dize (isteğe bağlı) - Varsayılanı `Courier New` olarak belirler.
      * `cursive` Dize (isteğe bağlı) - Varsayılanı `Script` olarak belirler.
      * `fantasy` Dize (isteğe bağlı) - Varsayılanı `impact` olarak belirler.
    * `defaultFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `16` olarak belirler.
    * `defaultMonospaceFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `13` olarak belirler.
    * `minimumFontSize` Tamsayı (isteğe bağlı) - Varsayılanı `0` olarak belirler.
    * `defaultEncoding` Dize (isteğe bağlı) - Varsayılanı `ISO-8859-1` olarak belirler.
    * `backgroundThrottling` Bağlaç (isteğe bağlı) - Sayfa arka plandayken animasyonların ve zamanlayıcıların kısıtlanması. Bu da [Page Visibility API](#page-visibility) etkiler. Varsayılanı `true` olarak belirler.
    * `offScreen` Boolean (isteğe bağlı) - Tarayıcı için ekran dışı görüntülemeyi etkinleştirip destekleyip desteklemeyeceğini belirtir penceresi. Varsayılan değer `false`. Bak [için ekran dışı işleme öğretici](../tutorial/offscreen-rendering.md) daha fazla detay.
    * ` contextIsolation` Boolean (isteğe bağlı) - Elektron API'lerini çalıştırıp çalıştırmamak Ayrı bir JavaScript bağlamında belirtilen `önyükleme` komut dosyası. Varsayılanı `false` olarak belirler. `önceden yükleme` Komut Dosyasının Çalıştığı İçerik Olmayacaktır `belge` ve `pencere` dünyasına tam erişime sahip olmakla birlikte kendi JavaScript yerleşikleri kümesi (`Array`, `Objec`, `JSON`, vb.) ve küresel çevreye yapılan herhangi bir değişiklikten izole edilecek yüklenen sayfaya göre. Elektron API'sı yalnızca ` yüklenen` sayfa değil önyükleme komut dosyası. Yüklenen içeriğin `önyükleme` komut dosyasına ve kullanılan herhangi bir Elektron API'sine kurcalamamasını sağlamak için potansiyel olarak güvenilmeyen uzak içeriği yüklerken bu seçenek kullanılmalıdır. Bu seçenek[Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) tarafından kullanılan yöntemi kullanır. Konsol sekmesinin üst kısmındaki birleşik giriş kutusunda 'Electron Yalıtılmış Ortam' girişini seçerek dev araçlarındaki bu içeriğe ulaşabilirsiniz.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Varsayılan değer `false`. Child windows will always have node integration disabled unless `nodeIntegrationInSubFrames` is true. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (opsiyonel) - Aktifleştirmek için  [`<webview>` etiket](webview-tag.md). Varsayılan değer `false`. **Note:**`<webview>`için yapılandırılmış `preload` komut dosyası, çalıştırıldığında düğüm entegrasyonunun etkinleştirilmesini sağlar bu nedenle uzak/güvenilir olmayan içeriğin muhtemel kötü amaçlı `preload` komut dosyası içeren bir `<webview>` etiketi oluşturamayacağından emin olmanız gerekir. ` webview ekleyecek` etkinliğini [ webSatıcıları'nda](web-contents.md) kullanabilirsiniz. `önyükleme` komut dosyasını kaldırmak ve belgeyi doğrulamak veya değiştirmek için `<webview>` 'nin başlangıç ​​ayarları.
    * `additionalArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app.  Useful for passing small bits of data down to renderer process preload scripts.
    * `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Varsayılan `false`'dur.
    * `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
    * `disableDialogs` Boolean (optional) - Whether to disable dialogs completely. Overrides `safeDialogs`. Varsayılan `false`'dur.
    * `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Varsayılan `false`'dur.
    * `autoplayPolicy` String (optional) - Autoplay policy to apply to content in the window, can be `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`. Defaults to `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Whether to prevent the window from resizing when entering HTML Fullscreen. Default is `false`.
    * `accessibleTitle` String (optional) - An alternative title string provided only to accessibility tools such as screen readers. This string is not directly visible to users.
    * `spellcheck` Boolean (optional) - Whether to enable the builtin spellchecker. Varsayılan `false`'dur.

Minimum veya maksimum pencere boyutunu ` min ile ayarlarken Genişlik` / ` maks Genişlik` / ` min Yükseklik` / ` maxHeight`, yalnızca kullanıcıları sınırlandırır. Sizi engellemeyecektir boyut sınırlamalarını takip etmeyen bir boyutu ` setBounds`/ ` Boyut ayarla` veya `Tarayıcı penceresi yapıcısına`.

The possible values and behaviors of the `type` option are platform dependent. Olası değerler şunlar:

* Linux'ta olası türler `masaüstü`, `dock`, `araç çubuğu`, `splash`, `bildirim`'dir.
* On macOS, possible types are `desktop`, `textured`.
  * ` dokulu` türü metal eğimi görünümünü ekler (` NSTexturedBackgroundWindowMask`).
  * `Masaüstü` modeli, pencereyi masaüstü arka planındaki pencere seviyesine yerleştirir (`kCGDesktopWindowLevel - 1`). Masaüstü penceresi klavye veya farenin durumunu odak olarak kaydetmeyecektir. Ancak veri girişini tedbirli bir şekilde yapmak için `globalShortcut` kullanabilirisinz.
* Windows'ta mümkün olan model `toolbar` 'dır.

### Örnek Events

`new BrowserWindow` ile yaratılan neseneler aşağıdaki özellikleri belirtir:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `event` Olay
* `başlık` Dizi
* `explicitSet` Boolean

Belge, başlığını değiştirdiğinde ifade edilir, `event.preventDefault()` kullanmak doğal windows başlığının değişmesine engel olur. `explicitSet` is false when title is synthesized from file URL.

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
  e.returnValue = false // equivalent to `return false` ancak önerilmez
}
```
_**Note**: `window.onbeforeunload = handler` ve `window.addEventListener('beforeunload', handler)` davranışları arasında ince bir fark var. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron._

#### Etkinlik: 'kapatıldı'

Pencere kapatıldığında ortaya çıkar. After you have received this event you should remove the reference to the window and avoid using it any more.

#### Etkinlik: 'oturum-sonu' _Windows_

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

Please note that using this event implies that the renderer will be considered "visible" and paint even though `show` is false.  This event will never fire if you use `paintWhenInitiallyHidden: false`

#### Etkinlik: 'maximize'

Pencere simge durumuna getirildiğinde ortaya çıkmaktadır.

#### Etkinlik: 'unmaximize'

Pencere maksimum bir durumda çıktığında ortaya çıkar.

#### Etkinlik: 'minimize'

Pencere minimize edildiğinde ortaya çıkmaktadır.

#### Etkinlik: 'onarmak'

Pencere küçültülmüş bir durumdan geri yüklendiğinde ortaya çıkmaktadır.

#### Event: 'will-resize' _macOS_ _Windows_

Dönüşler:

* `event` Olay
* `newBounds` [Rectangle](structures/rectangle.md) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Etkinlik: 'yeniden boyutlandırma'

Emitted after the window has been resized.

#### Event: 'will-move' _macOS_ _Windows_

Dönüşler:

* `event` Olay
* `newBounds` [Rectangle](structures/rectangle.md) - Location the window is being moved to.

Emitted before the window is moved. On Windows, calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### Etkinlik: 'hareket ettir'

Pencere yeni bir konuma getirildiği zaman ortaya çıkmaktadır.

__Note__: On macOS this event is an alias of `moved`.

#### Etkinlik: 'moved' _macOS_

Pencere yeni bir konuma taşındığında bir kez yayılmış.

#### Etkinlik: 'enter-full-screen'

Pencere tam ekran haline girdiğinde dışarı çıkar.

#### Etkinlik: 'leave-full-screen'

Pencere tam ekranda modunda bırakıldığında dışarı çıkar.

#### Etkinlik: 'enter-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran haline girdiğinde dışarı çıkar.

#### Etkinlik: 'leave-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran halinde bırakıldığında dışarı çıkar.

#### Event: 'always-on-top-changed'

Dönüşler:

* `event` Olay
* `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### Event: 'app-command' _Windows_ _Linux_

Dönüşler:

* `event` Olay
* `command` Dizi

[Uygulama Komutu](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) çağrıldığında ifade edilir. Bunlar genel olarak klavye ortam tuşları ya da tarayıcı komutları ve ayrıca Windows'da ki bazı farelerde olan "Geri" düğmesiyle ilgilidir.

Tire ve `APPCOMMAND_` ön adıyla değişen küçük harfli, altı çizili komutlar sıyrılır. Örneğin `APPCOMMAND_BROWSER_BACKWARD`, `browser-backward` olarak belirtilir.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.on('app-command', (e, cmd) => {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
```

The following app commands are explicitly supported on Linux:

* `browser-backward`
* `browser-forward`

#### Etkinlik: 'kaydır-dokun-başla' _macOS_

Kaydırma tekerleği etkinlik aşaması başladığında ifade edilir.

#### Etkinlik: 'kaydır-dokun-bitir' _macOS_

Kaydırma tekerleği etkinlik aşaması bittiğinde ifade edilir.

#### Etkinlik: 'kaydır-dokun-kenar' _macOS_

Kaydırma tekerleği etkinlik aşamasının öğenin kenarına ulaşmasıyla kayda geçtiğini ifade eder.

#### Etkinlik: 'hızlı kaydır' _macOS_

Dönüşler:

* `event` Olay
* `direction` Dizi

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

The method underlying this event is built to handle older macOS-style trackpad swiping, where the content on the screen doesn't move with the swipe. Most macOS trackpads are not configured to allow this kind of swiping anymore, so in order for it to emit properly the 'Swipe between pages' preference in `System Preferences > Trackpad > More Gestures` must be set to 'Swipe with two or three fingers'.

#### Event: 'rotate-gesture' _macOS_

Dönüşler:

* `event` Etkinlik
* `rotation` Float

Emitted on trackpad rotation gesture. Continually emitted until rotation gesture is ended. The `rotation` value on each emission is the angle in degrees rotated since the last emission. The last emitted event upon a rotation gesture will always be of value `0`. Counter-clockwise rotation values are positive, while clockwise ones are negative.

#### Event: 'sheet-begin' _macOS_

Windows bir sayfa yaprağı açtığında ifade edilir.

#### Event: 'sheet-end' _macOS_

Windows'un bir sayfa yaprağını kapattığını ifade eder.

#### Olay: 'new-window-for-tab' _macOS_

Doğal yeni sekme tuşunun tıklanıldığını ifade eder.

### Statik Metodlar

`BrowserWindow` sınıfı aşağıdaki sabit yöntemlere sahiptir:

#### `BrowserWindow.getAllWindows()`

`BrowserWindow[]` 'u geri getirir - Bütün açılmış tarayıcı pencerelerinin bir dizilişidir.

#### `BrowserWindow.getFocusedWindow()`

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

Returns `BrowserWindow | null` - The window that owns the given `webContents` or `null` if the contents are not owned by a window.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### `BrowserWindow.fromId(id)`

* `id` tamsayı

`BrowserWindow` 'u geri getirir - `id` verilmiş olan pencere.

#### `TarayıcıPenceresi.eklentiekle(yol)`

* dizi `yolu`

`yola` Chrome eklentisini ekler ve uzantının adını döndürür.

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeExtension(name)`

* `name` Dizi

İsme göre bir Chrome eklentisi kaldır.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getExtensions()`

Returns `Record<String, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.addDevToolsExtension(path)`

* dizi `yolu`

DevTools uzantısını belirtilen lokasyona `yol` ekler ve uzantı adına döner.

Bu API'yı yalnızca bir kez hatırlamanız gerekiyor, bu API programlama amacıyla değildir. Eğer önceden yüklenmiş bir uzantı eklemeyi denerseniz, bu sistem yüklenmeyecektir ve bunun yerine konsola bir uyarı yazacaktır.

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` Dizi

İsme göre bir DevTools eklentisi kaldır.

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getDevToolsExtensions()`

Returns `Record<string, ExtensionInfo>` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

DevTools uzantısının yüklenmiş olup olmadığını kontrol etmek için aşağıdakileri çalıştırabilirsiniz:

```javascript
const { BrowserWindow } = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** BU API  `hazır` olayı  `app` modülü yayılmadan çağrılamaz.

### Örnek Özellikleri

`yeni BrowserWindow` ile oluşturulan nesneler aşağıdaki özelliklere sahiptir:

```javascript
const { BrowserWindow } = require('electron')
// bu örnekte örnek sınıfımız "win"
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

A `WebContents` object this window owns. All web page related events and operations will be done via it.

Bakınız [`webContents` dökümanı](web-contents.md) yöntemler ve olaylar için.

#### `win.id` _Readonly_

A `Integer` property representing the unique ID of the window.

#### `win.autoHideMenuBar`

A `Boolean` property that determines whether the window menu bar should hide itself automatically. Once set, the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, setting this property to `true` won't hide it immediately.

#### `win.minimizable`

A `Boolean` property that determines whether the window can be manually minimized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.maximizable`

A `Boolean` property that determines whether the window can be manually maximized by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.fullScreenable`

A `Boolean` property that determines whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### `win.resizable`

A `Boolean` property that determines whether the window can be manually resized by user.

#### `win.closable`

A `Boolean` property that determines whether the window can be manually closed by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.movable`

A `Boolean` property that determines Whether the window can be moved by user.

On Linux the setter is a no-op, although the getter returns `true`.

#### `win.excludedFromShownWindowsMenu` _macOS_

A `Boolean` property that determines whether the window is excluded from the application’s Windows menu. `false` by default.

```js
const win = new BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

#### `win.accessibleTitle`

A `String` property that defines an alternative title provided only to accessibility tools such as screen readers. This string is not directly visible to users.

### Örnek Metodlar

`new BrowserWindow` ile oluşturulan nesnelerin aşağıda örnek methodları bulunmakta:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

#### `win.destroy()`

Pencereyi kapanmaya zorla, the `unload` ve <beforeunload</code> olay web sayfası için yayılmayacak ve `close` bu pencere için olay ayrıca yayılmayacak fakat `closed` olayının yayılmasını sağlar.

#### `win.close()`

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### `win.focus()`

Pencerenin üzerine odaklanır.

#### `win.blur()`

Odak penceresinden kaldırır.

#### `win.isFocused()`

`Boolean` Döndürür - Pencerenin odaklanıp odaklanmadığı.

#### `pencere.kapatıldı()`

`Boolean` Döndürür - Pencerenin yok edilip edilmediği.

#### `pencere.göster()`

Pencereyi gösterir ve odaklanmayı sağlar.

#### `pencere.gösterInaktif()`

Pencereyi gösterir, ancak üzerine odaklanmaz.

#### `win.hide()`

Pencereyi gizle.

#### `pencere.görünür()`

`Boolean` Döndürür - Pencerenin kullanıcılara gizlenip gizlenmeyeceği.

#### `win.isModal()`

`Boolean` Döndürür - Geçerli pencerenin modal penceresi olup olmadığı.

#### `win.maximize()`

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### `win.unmaximize()`

Pencereleri simge durumuna küçültür.

#### `win.isMaximized()`

`Boolean` Döndürür - Pencerenin büyütülüp büyütülmediği.

#### `win.minimize()`

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### `win.restore()`

Pencereyi küçültülmüş durumdan önceki durumuna geri yükler.

#### `win.isMinimized()`

`Boolean` Döndürür - Pencerenin küçültülüp küçültülmediği.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Pencerenin tam ekran modunda olup olmadığını ayarlar.

#### `win.isFullScreen()`

`Boolean` Döndürür - Pencerenin tam ekran modda olup olmadığı.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Basit tam ekran moduna giriş veya çıkış yapar.

Basit tam ekran modu, Mac OS X'den önce Lion (10.7) sürümlerinde bulunan yerel tam ekran davranışını seçer.

#### `win.isSimpleFullScreen()` _macOS_

`Boolean` - pencerenin basit (Leon öncesi) tam ekran modunda olup olmadığını raporlar.

#### `win.isNormal()`

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### `win.setAspectRatio(aspectRatio[, extraSize])` _macOS_

* `aspectRatio` Yay - Bazı kısımların içerik görünümünü sürdürme adına en-boy oranı.
* `extraSize` [Size](structures/size.md) (optional) - The extra size not to be included while maintaining the aspect ratio.

Bu, görüntü oranını koruyan bir pencere oluşturacaktır. Ekstra bir boyut, geliştiricinin piksel cinsinden belirtilen, görüntü oranı hesaplamaları içine dahil edilmeyen yere sahip olmasını sağlar. Bu API, önceden bir pencerenin boyutu ile içerik boyutu arasındaki farkı dikkate almaktadır.

Bir HD video oynatıcısına ve ilişkili olan kontrollere sahip normal bir pencere düşünün. Büyük ihtimalle player'ın sol kenarında 15, sağ kenarında 25 ve altında 50 piksel kontrol alanı var. Player içerisinde 16:9 oranını korumak için (HD için standart oran @1920x1080) bu işlemi çağırırız. [40,50] İkinci argüman içerik görüntüsü içerisinde genişlik ve yüksekliğin nerede olduğuyla ilgilenmez, sadece var oluşlarına bakar. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` Dizi - QuickLook ile kesin yol önizlemesi Bu, Quick Look açacağı dosyanın türünü belirlemek için dosya uzantısını ve yolunu kullandığı için önemlidir.
* `displayname` Dizi (opsiyonel) Quick Look şekilsel görünümünde görüntülenecek olan dosya adı. dosyanın görsel ve içeriğini tamamen etkilemez. varsayılan olarak`path`.

Belirli bir yoldaki bir dosyayı önizlemek için [Hızlı Bakış](https://en.wikipedia.org/wiki/Quick_Look)'ı kullanır.

#### `win.closeFilePreview()` _macOS_

Şu an açık olan [Hızlı Bakış](https://en.wikipedia.org/wiki/Quick_Look) panelini kapatır.

#### `win.setBounds(bounds[, animate])`

* `bounds` Partial<[Rectangle](structures/rectangle.md)>
* `animate` Boolean (isteğe bağlı) _macOS_

Pencereyi yeniden boyutlandırır ve sağlanan sınırlara taşır. Any properties that are not supplied will default to their current values.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

// set all bounds properties
win.setBounds({ x: 440, y: 225, width: 800, height: 600 })

// set a single bounds property
win.setBounds({ width: 100 })

// { x: 440, y: 225, width: 100, height: 600 }
console.log(win.getBounds())
```

#### `win.getBounds()
`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window as `Object`.

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Dikdörtgen](structures/rectangle.md)
* `animate` Boolean (isteğe bağlı) _macOS_

Pencerenin müşteri alanını (örneğin, Web sayfası) boyutlandırmakta,taşımakta ve verilen sınırlara getirmektedir.

#### `win.getContentBounds()`

Returns [`Rectangle`](structures/rectangle.md) - The `bounds` of the window's client area as `Object`.

#### `win.getNormalBounds()`

Returns [`Rectangle`](structures/rectangle.md) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](structures/rectangle.md).

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.isEnabled()`

Returns Boolean - whether the window is enabled.

#### `win.setSize(width, height[, animate])
`

* `width` Tamsayı
* `height` Tamsayı
* `animate` Boolean (isteğe bağlı) _macOS_

Pencereyi `genişlik` ve `yükseklik` olarak yeniden boyutlandırır. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### `win.getSize()`

Iadeler `Integer[]` - Pencerenin genişliğini ve yüksekliğini içerir.

#### `win.setContentSize(width, height[, animate])`

* `width` Tamsayı
* `height` Tamsayı
* `animate` Boolean (isteğe bağlı) _macOS_

Pencerenin istemci alanını yeniden boyutlandırır (e.g. the web page) to `width` and `height`.

#### `win.getContentSize()`

`Integer[]` Geri alır - Windowsun müşteri alanı boyu ve genişliği.

#### `win.setMinimumSize(width, height)`

* `width` Tamsayı
* `height` Tamsayı

Pencerenin minimum boyutunu `genişlik` ve `yükseklik` olarak ayarlar.

#### `win.getMinimumSize()`

`Integer[]` 'ı geri getirir - Pencerenin minimum genişliğini ve yüksekliğini içerir.

#### `win.setMaximumSize(width, height)`

* `width` Tamsayı
* `height` Tamsayı

Pencereni maksimum boyutunu `genişlik` ve `yükseklik` olarak ayarlar.

#### `win.getMaximumSize()`

`Integer[]` 'ı geri getirir - Pencerenin maksimum genişliğini ve yüksekliğini içerir.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Pencerenin kullanıcı tarafından manuel olarak yeniden boyutlandırılacağını tanımlar.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isResizable()`

Returns `Boolean` - Pencerenin kullanıcı tarafından manuel olarak yeniden boyutlandırılabilmesi.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isMovable()` _macOS_ _Windows_

`Boolean` Döndürür - Pencerenin kullanıcı tarafından taşınıp taşınmayacağı.

Linux'ta daima geri dönüyor `true`.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isMinimizable()` _macOS_ _Windows_

`Boolean` Döndürür - Pencerenin kullanıcı tarafından manuel olarak küçültülüp küçültülmediği

Linux'ta daima geri dönüyor `true`.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isMaximizable()` _macOS_ _Windows_

Returns `Boolean` - Pencerenin kullanıcı tarafından manuel olarak maksimize edilip edilemeyeceği.

Linux'ta daima geri dönüyor `true`.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Yakınlaştırma düğmesinin tam ekran modunu değiştirip değiştirmeyeceğini veya pencereyi en yükseğe çıkarıp büyütüp büyütmediğini belirtir.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isFullScreenable()`

Returns `Boolean` - Maksimumlaştır / yakınlaştır penceresi düğmesinin tam ekran modunu değiştirip değiştirmeyeceğini pencereyi en üst düzeye çıkarır.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isClosable()` _macOS_ _Windows_

`Boolean` Döndürür - Pencerenin kullanıcı tarafından manuel olarak kapatılıp kapatılmayacağı.

Linux'ta daima geri dönüyor `true`.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and ~~`dock`~~ (Deprecated). The default is `floating` when `flag` is true. The `level` is reset to `normal` when the flag is false. Note that from `floating` to `status` included, the window is placed below the Dock on macOS and below the taskbar on Windows. From `pop-up-menu` to a higher it is shown above the Dock on macOS and above the taskbar on Windows. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
* `relativeLevel` Tamsayı (isteğe bağlı)_macOS_ - Bu pencerenin verilen `level` değerine göre katman sayısı daha yüksek. Varsayılan değer `0`. Genellikle Apple 1 seviyesinin üstünde `screen-saver` ayarlanmasını istemez.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### `win.isAlwaysOnTop()`

Returns `Boolean` - Pencerenin daima diğer pencerelerin üstünde olup olmadığı.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Window id in the format of DesktopCapturerSource's id. For example "window:1869:0".

Moves window above the source window in the sense of z-order. If the `mediaSourceId` is not of type window or if the window does not exist then this method throws an error.

#### `win.moveTop()`

Moves window to top(z-order) regardless of focus

#### `win.center()`

Pencereyi ekranın ortasına taşır.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `x` Integer
* `animate` Boolean (isteğe bağlı) _macOS_

Pencereyi taşı `x` and `y`.

#### `win.getPosition()`

`Integer[]` 'ı geri getirir - Pencerenin mevcut pozisyonunu içerir.

#### `win.setTitle(title)`

* `title` String

Doğal pencerenin başlığını `title` olarak değiştirir.

#### `win.getTitle()`

`String` 'i geri getirir - Doğal pencerenin başlığı.

**Note:** The title of the web page can be different from the title of the native window.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS_

* `offsetY` Float
* `offsetX` Float (isteğe bağlı)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. Örneğin:

```javascript
const { BrowserWindow } = require('electron')
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

Kiosk moduna girer veya ayrılır.

#### `win.isKiosk()`

`Boolean` geri getirir - Pencere kiosk modundaysa.

#### `win.getMediaSourceId()`

Returns `String` - Window id in the format of DesktopCapturerSource's id. For example "window:1234:0".

More precisely the format is `window:id:other_id` where `id` is `HWND` on Windows, `CGWindowID` (`uint64_t`) on macOS and `Window` (`unsigned long`) on Linux. `other_id` is used to identify web contents (tabs) so within the same top level window.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - pencerenin platforma özel tutamacı.

Yerel türü Windows' ta `HWND`, macOS' ta `NSView*`, ve Linux' ta `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

`Boolean` - İletinin sabit olup olmadığına bağlı olarak `true` or `false`' a döndürülür.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Pencere mesajını çıkarın.

#### `win.unhookAllWindowMessages()` _Windows_

Tüm pencere mesajlarının kilidini açar.

#### `win.setRepresentedFilename(filename)` _macOS_

* `dosya adı` dize

Pencerenin temsil ettiği dosyanın yol adını belirler ve dosya simgesi pencerenin başlık çubuğunda gösterilmiş olur.

#### `win.getRepresentedFilename()` _macOS_

`String` Windows' un temsil ettiği dosyanın yolunu değiştirir.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Window's belgelerinin düzenlenip düzenlenmediğini belirtir ve `true` olarak ayarlandığında başlık çubuğundaki simge gri olur.

#### `win.isDocumentEdited()` _macOS_

`Boolean` - Window' s dosyalarının düzenlenmiş olup olmadığını döndürür.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - üst sınırlar

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

`rect` içerisinde kalan sayfanın anlık görüntüsünü yakalar. Omitting `rect` will capture the whole visible page.

#### `win.loadURL(url[, options])`

* `url` Dize
* `options` Object (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer URL.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base URL (with trailing path separator) for files to be loaded by the data URL. This is needed only if the specified `url` is a data URL and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

The `url` uzak bir adres olabilir (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

Dosya URL lelerin düzgün formatlandığından emin olmak için, [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) düğümlerini kullanmanız önerilmektedir:

```javascript
let url = require('url').format({
  protocol: 'file',
  slashes: true,
  pathname: require('path').join(__dirname, 'index.html')
})

win.loadURL(url)
```

Aşağıdakileri yaparak, URL kodlu verilerle birlikte `POST` komutunu kullanarak bir URL yükleyebilirsiniz:

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` Dizi
* `options` Object (optional)
  * `query` Record<String, String> (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)).

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application.  See the `webContents` docs for more information.

#### `win.reload()`

`webContents.reload`. ile aynı.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menü | boş

Sets the `menu` as the window's menu bar.

#### `win.removeMenu()` _Linux_ _Windows_

Remove the window's menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` çift
* `options` Object (optional)
  * `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is [0, 1.0].

İlerleme durumu <0 olduğunda ilerleme çubuğunu kaldırın; İlerleme durumu > 1 olduğu zaman belirlenemez moda geçin.

Linux Platformu, yalnızca Unity Masaüstü ortamını desteklediği için `*.desktop` alanındaki `desktopName` alanına `package.json` dosya adını belirtmeniz gerekir. By default, it will assume `{app.name}.desktop`.

Windows'ta, bir yöntem devredilebilir. Kabul edilen değerler `none`, `normal`, `indeterminate`, `error`, ve `paused`. `setProgressBar` 'ı bir yöntem kurulumu ile çağırırsanız (fakat geçerli aralıktaki bir değerle), `normal` varsayılacaktır.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
* `description` Dizi - Ekran okuyuculara erişilebilirliği sağlayacak olan açıklama

Görevçubuğu ikonu üzerine 16 x 16 pixel ayarlar, genellikle kullanıcıyı pasif olarak uyarır.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Sets whether the window should have a shadow.

#### `win.hasShadow()`

`Boolean` - Pencerenin bir gölgeye sahip olup olmadığını gösterir.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Değer - 0.0 (tamamen şeffaf) ile 1.0 (tamamen opak) arasında

Sets the opacity of the window. On Linux, does nothing. Out of bound number values are clamped to the [0, 1] range.

#### `win.getOpacity()`

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque). On Linux, always returns 1.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rectangle[]](structures/rectangle.md) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Returns `Boolean` - Tuşların başarılı bir şekilde eklenmesi veya eklenmemesi

Görev çubuğu düğmesi üzerinde olan pencerenin küçük resim görüntüsüne belirli düğmeler kümesi içeren bir minik resim araç çubuğu ekleyin. `Boolean` nesnesi küçük resimlerin başarıyla eklenip eklenmediğini belirtir.

Alan kısıtlamaları nedeniyle, minik resim araç çubuğundaki düğmelerin sayısı 7'yi geçmemelidir. Küçük resim araç çubuğunu kurduktan sonra araç çubuğu platformun sınırlaması sebebiyle kaldırılamamaktadır. Ama API boş bir dizinle tuşları temizleyebilir.

`buttons`, `Button` nesnelerinin dizilişidir:

* `Button` Object
  * `icon` [Doğalgörüntü](native-image.md) - Küçük resim araç çubuğunda gösterilen simge.
  * `tıklama`fonksiyonu
  * `ipucu` Dize (isteğe bağlı) - Düğmenin araç ipucu metni.
  * `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`bayrakları` aşağıdaki Dizelerini takip eden bir `dizidir`:

* `etkinleştirilmiş` - Düğme etkin ve kullanıcı tarafından kullanılabilir.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `kapatmaya tıkla` - Düğmeye tıklandığında küçük resim penceresi kapanır hemen.
* `arka plan yok` - Bir düğme kenarlığı çizmeyin, yalnızca resmi kullanın.
* `gizli` - Düğme kullanıcıya gösterilmez.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rectangle](structures/rectangle.md) - Pencrenin gölgesi belirlenir

Görev çubuğunda pencerenin üzerinde gezinirken görüntülenen küçük resim şeklinde gösterecek şekilde pencerenin bölgesini ayarlar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Pencere ikonunun üzerindeyken gözüken toolTip i görev çubuğunda ayarlar.

#### `win.setAppDetails(options)` _Windows_

* `options` Object
  * `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Kurulmuş olması gerekir, yoksa diğer ayarların bir etkisi olmayacaktır.
  * `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
  * `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
  * `relaunchCommand` String (isteğe bağlı) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
  * `relaunchDisplayName` dizin (isteğe bağlı) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Pencerenin görev çubuğu düğmesinin özelliklerini ayarlar.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### `win.showDefinitionForSelection()` _macOS_

`webContents.showDefinitionForSelection()` gibi.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | String

Pencere simgesi değiştirme.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

Eğer menü çubuğu zaten görünür ise, `setAutoHideMenuBar(true)` 'ı girmek onu hemen gizlemeyecektir.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.isMenuBarAutoHide()`

`Boolean` 'ı geri getirir - Menü çubuğu otomatik olarak kendini gizlediğinde.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### `win.isMenuBarVisible()`

`Boolean` komutu menünün görünür olup olmadığını gösterir.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Object (optional)
  * `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows _deprecated_

Pencerenin tüm çalışma alanlarında görünüp görünmeyeceğini ayarlamaktadır.

**Not:** Bu API Windows'ta işe yaramaz.

#### `win.isVisibleOnAllWorkspaces()`

`Boolean` - Pencerenin bütün çalışma alanlarında görünüp görünmeyeceğini gösterir.

**Not:** Bu API Windows'ta her zaman yanlış sonuç verir.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Object (optional)
  * `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. `ignore` yanlışsa, yönlendirme bu değerden bağımsız olarak daima devre dışı bırakılır.

Pencerenin tüm fare olaylarını yok saymasını sağlar.

Bu pencerede gerçekleşen tüm fare olayları aşağıdaki pencereye geçecektir ancak olaylar bu pencerenin odağı varsa, yine de klavye alacaktır.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Pencere içeriğinin diğer uygulamalar tarafından el konmasını engellemektedir.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Pencerenin odaklanabilir olup olmadığını değiştirir.

On macOS it does not remove the focus from the window.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Geçerli pencerenin üst penceresi olarak `parent`' ı ayarlar, `null` geçildiğinde geçerli pencereyi üst düzey bir pencereye dönüştürecek.

#### `win.getParentWindow()`

`BrowserWindow` ' u geri getirir - Ana pencere.

#### `win.getChildWindows()`

`BrowserWindow[]` - Tüm alt pencereleri gösterir.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Yazarken imlecin ne zaman kaybolacağını kontrol eder.

#### `win.selectPreviousTab()` _macOS_

Yerel sekmeler etkinleştirildiğinde ve pencerede başka sekmeler olduğunda önceki sekmeyi seçer.

#### `win.selectNextTab()` _macOS_

Yerel sekmeler etkinleştirildiğinde ve pencerede başka sekmeler olduğunda sonraki sekmeyi seçer.

#### `win.mergeAllWindows()` _macOS_

Yerel sekmeler etkinleştirildiğinde ve birden fazla açık pencere olduğunda, tüm pencereleri birden çok sekme ile tek bir pencerede birleştirir.

#### `win.moveTabToNewWindow()` _macOS_

Yerel sekmeler etkinleştirilmişse ve geçerli pencerede birden fazla sekme varsa geçerli sekmeyi yeni bir pencereye taşır.

#### `win.toggleTabBar()` _macOS_

Yerel sekmeler etkinleştirilmişse ve geçerli pencerede yalnızca bir sekme varsa, sekme çubuğunun görünürlüğünü değiştirir.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Bu pencerede pencere örneği sekmesinden sonra bir pencere sekmesini ekler.

#### `win.setVibrancy(type)` _macOS_

* `type` String | null - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Daha fazla ayrıntı için [macOS dökümanlarını](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) inceleyin.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

Note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [Point](structures/point.md)

Set a custom position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.getTrafficLightPosition()` _macOS_

Returns `Point` - The current position for the traffic light buttons. Can only be used with `titleBarStyle` set to `hidden`.

#### `win.setTouchBar(touchBar)` _macOS_ _Experimental</1</h4>

* `touchBar` TouchBar | null

Geçerli pencere için touchBar düzenini ayarlar. Specifying `null` or `undefined` dokunmatik çubuğu temizler. Bu metod sadece macOS 10.12.1+ üzerinde çalışıyorsa ve makinanın dokunmatiği varsa etkilidir.

**Not:** TouchBar API şu anda deneyseldir ve gelecekteki Electron sürümlerinde değişebilir veya kaldırılabilir.

#### `win.setBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md) | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

#### `win.getBrowserView()` _Experimental_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

#### `win.addBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

Replacement API for setBrowserView supporting work with multi browser views.

#### `win.removeBrowserView(browserView)` _Experimental_

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserViews()` _Experimental_

Returns `BrowserView[]` - an array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

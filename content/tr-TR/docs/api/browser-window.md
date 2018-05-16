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

`BrowserWindow` bir [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter)'dır.

`Seçenekler` tarafından belirlenen yerel özellikleri içeren yeni bir `BrowserWindow` oluşturur.

### `yeni Tarayıcı Penceresi ([options])`

* `options` Obje (opsiyonel) 
  * `width` Integer (isteğe bağlı) - Pencerenin pixel olarak genişliği. Varsayılan `800`'dür.
  * `height` Integer (isteğe bağlı) - Pencerenin pixel olarak yüksekliği. Varsayılan `600`'dür.
  * `x` Integer (isteğe bağlı) (**gerekli** eğer y kullanılmışsa) - Pencerenin ekrandan sol offseti. Varsayılan pencere ortasıdır.
  * `y` Integer (isteğe bağlı) (**required** eğer x kullanılmışsa) - Pencerenin ekrandan üst offseti. Varsayılan pencere ortasıdır.
  * `useContentSize` Boolean (isteğe bağlı) - `Genişlik` ve `yüksekliğin` web sayfasının boyutu olarak kullanılması gerçek pencerenin boyutunun, pencere çerçevesinin boyutunu ve biraz daha fazlasını içereceği anlamına gelmektedir. Varsayılanı `false`.
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
  * `fullscreen` Boolean (isteğe bağlı) - Pencerenin tam ekranda gösterilip gösterilmeyeceği. MacOS'ta özellikle değer `false` olarak ayarlandığında tam ekran düğmesi görünmez veya devre dışı olacaktır. Varsayılanı `false`.
  * `fullscreenable` Boolean (isteğe bağlı) - Pencerenin tam ekrana moduna alınıp alınamayacağı. MacOs'ta, Ekranı Kapla/Yakınlaştır düğmesinin tam ekran modunu veya Ekranı Kapla penceresini değiştirip değiştirmeyeceği de belirtmektedir. Varsayılanı `true`.
  * `simpleFullscreen` Mantıksal (isteğe bağlı) - macOS'ta Lion öncesi tam ekran kullanın. Varsayılan değer `false`.
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
  * `backgroundColor` Dizilim (isteğe bağlı) - Pencere arka plan rengi onaltılık bir değer, `#66CD00` veya `#FFF` veya `#80FFFFFF` gibi (alfa desteklidir). Varsayılan değer `#FFF` (beyaz).
  * `hasShadow` mantıksal (isteğe bağlı) - Pencerenin gölge olması gerekip gerekmediğini belirtir. Bu sadece macOS'ta uygulanır. Varsayılan `true`'dir.
  * `opacity` Sayı (isteğe bağlı) - Pencerenin başlangıçtaki opaklığını 0.0 (tamamen saydam) ile 1.0 (tamamen opak) arasında ayarlayın. Bu yalnızca Windows ve macOS'ta uygulanır.
  * `darkTheme` Boole (isteğe bağlı) - Pencere için koyu temayı kullanmaya zorlar, yalnızca bazı GTK+3 masaüstü ortamlarında çalışır. Varsayılan değer `yanlış`.
  * ` şeffaf </ 0>  Boole (isteğe bağlı) - Pencereyi <a href="frameless-window.md"> saydam yapar </ 1> . Varsayılan değer <code> yanlış </ 0> .</li>
<li><code> type </ 0>  sicim (isteğe bağlı) - Pencere türü, varsayılan değer normal pencere. Bunun hakkında daha fazla bilgi için aşağıya bakın.</li>
<li><code>titleBarStyle` Sicim (isteğe bağlı) - Pencere başlık çubuğunun stili. Varsayılan değer `varsayılan`. Olası değerler şunlar: 
    * `default` - Standart gri opak Mac başlık çubuğunda sonuç verir.
    * `hidden` - Gizli başlık çubuğunda ve tam boyutlu bir içerik penceresinde sonuç verir, ancak başlık çubuğunun sol üst tarafında hala standart pencere kontrolleri ("trafik ışıkları") vardır.
    * `hiddenInset` - Trafik ışığı düğmelerinin pencere kenarında biraz daha yerleştirildiği alternatif bir görünüme sahip gizli bir başlık çubuğunda sonuç verir.
    * `customButtonsOnHover` Boolean (isteğe bağlı) - MacOS çerçevesiz pencerelerde özel kapatma, küçültme ve tam ekran düğmeleri çizin. Bu düğmeler, pencerenin sol üst köşesine gelmediğiniz sürece görüntülenmez. Bu özel tuşlar, standart pencere araç çubuğu tuşlarıyla oluşan fare olaylarıyla ilgili sorunları önlemektedir. **Note:** Bu seçenek şu anda deneme niteliğinde.
  * `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
  * ` kalınÇerçeve </ 0>  Boole (opsiyonel) - Kullanım <code> WS_KALIN ÇERÇEVE</ 0> çerçevesiz için stil pencereler üzerinde
 Windows'un standart pencere çerçevesi ekler. <code>false` olarak ayarlamak pencere gölgesini ve pencere animasyonlarını kaldıracaktır. Varsayılanı `true`.
  * `vibrancy` Dizi (isteğe bağlı) - Pencereye sadece macOS'ta bir tür canlılık efekti ekleyin. `görünüş-esaslı`, `ışık`, `koyu`, `başlık çubuğu`, `seçimi`, `menüsü`, `popover`, `kenar çubuğu`, `orta-hafif` veya `ultra-karanlık`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
  * `zoomToPageWidth` Boolean (isteğe bağlı) - MacOS'daki davranışları kontrol eder. Seçenek - araç çubuğunda yeşil dur ışığı düğmesini tıklatarak veya Pencere>Zoom menü öğesi. `true` ise, pencere büyütülürken web sayfasının tercih edilen genişliğine, `false` genişliğinin ekranın genişliğine yaklaşmasına neden olur. `maximize()` Bu komut direk çağrıldığında ayrıca davranışı da etkileyecektir. Varsayılan `false`'dur.
  * `tabbingIdentifier` Dize (isteğe bağlı) - Sekme grubu adı, pencerenin macOS 10.12+ sürümünde yerel sekme olarak açılmasına izin verir. Aynı sekme tanımlayıcısına sahip olan Windows birlikte gruplandırılacaktır. Bu ayrıca pencerenizin sekme çubuğuna yerel yeni bir sekme düğmesi ekler `app` ve pencereye olayına ulaşmanıza izin verir. `new-window-for-tab`.
  * `webTercihleri` Hedef (isteğe bağlı) - Web sayfalarının özelliklerini ayarlama. 
    * ` devAraçlar` Boole (isteğe bağlı) - Dev Araçlar etkinleştirip desteklemeyeceğini belirtir. `yanlış` olarak ayarlanırsa DevTools'u açmak için ` BrowserWindow.webContents.openDevTools ()` kullanamazsınız. Varsayılan `true`'dur.
    * `nodeIntegration` Boolean (isteğe bağlı) - Düğüm entegrasyonunun etkinleştirilip etkinleştirilmediğini belirtir. Varsayılan `doğrudur`.
    * ` nodeIntegrationInWorker` Boolean (isteğe bağlı) - Düğümün tümleştirilip web çalışanlarında etkinleştirildi. Varsayılan `false`'dur. Bununla ilgili daha fazla bilgi bulabilirsiniz [ Multithreading'de](../tutorial/multithreading.md).
    * ` preload` Sicim (isteğe bağlı) - Diğerinden önce yüklenecek bir betiği belirtir sayfalarda komut dosyaları çalıştırın. Bu komut dosyasında, düğüm entegrasyonunun açık veya kapalı olmasına bakılmaksızın düğüm API'lerine her zaman erişilebilmektedir. Değer, komut dosyasının salt dosya yolu olmalıdır. Düğüm entegrasyonu kapatıldığında, önceden yüklenmiş komut dosyası düğümün genel başvuru bayrağını genel kapsamdan yeniden başlatır. Örneği [gör](process.md#event-loaded).
    * ` sandbox` Boole (isteğe bağlı) - Ayarlanırsa, oluşturucuyu gizlenecektir pencere ile ilişkilendirilerek Krom ile uyumlu hale getirilir OS düzeyinde sanal alan ve Node.js motorunu devre. Bu aynı şey değil ` düğüm Entegrasyon` seçeneği ve önyükleme komut dosyasında kullanılabilen API'ler daha sınırlıdır. Seçenek hakkında daha fazla detaya [buradan ](sandbox-option.md) ulaşabilirsiniz. ** Not**: Bu seçenek şu anda deneme amaçlı olup değişebilir veya değişebilir gelecekteki Electron sürümlerinde kaldırıldı.
    * `oturum` [Oturum](session.md#class-session) (isteğe bağlı) - Kullanılan oturumu ayarlar sayfa. Oturum nesnesini doğrudan geçirmek yerine bir bölüm dizesini kabul eden `partition` seçeneğini kullanmayı da denebilirsiniz. Ne zaman hem `oturumu` hem de `bölüm` sağlanır, `oturumu` tercih edilir. Varsayılan oturumun varsayılanıdır.
    * `bölüm` Satır (isteğe bağlı) - Sayfanın kullandığı oturumu. oturumun bölümlenmiş satırına göre ayarlar. Eğer `bölümü` ile başlarsa `persist:`, sayfa ile uygulamadaki tüm sayfalar için kalıcı bir oturum kullanacaktır aynı `bölümü`. Hiçbir ` persist`: öneki yoksa, sayfa bellek içi oturumu. Aynı `partition` bölümü atayarak, aynı oturumda birden çok sayfa paylaşabilir. Varsayılan oturumun varsayılanıdır.
    * `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`.
    * `zoomFactor` sayısı (isteğe bağlı) - Sayfanın varsayılan yakınlaştırma faktörü `3.0`temsil eder `300%`. Varsayılan değer `1.0` 'dır.
    * `javascript` Boolean (isteğe bağlı) - JavaScript desteğini etkinleştirir. Varsayılan `doğrudur`.
    * `webSecurity`Boolean (optional) -`false`olduğunda, aynı kaynak ilkesini devre dışı bırakır (genellikle kişiler deneme web sitelerini kullanılır) ve kullanıcı tarafından ayarlanmamışsa bu seçenekleri `allowRunningInsecureContent` `true` ayarlayın,. Varsayılanı `true`.
    * `allowRunningInsecureContent` Boolean (isteğe bağlı) - Bir https sayfasının çalışmasına izin ver Http URL'lerden JavaScript, CSS veya eklentiler. Varsayılan değer `yanlış`.
    * `görüntüleri` Boolean (isteğe bağlı) - Görüntü desteğini etkinleştirir. Varsayılan `doğrudur`.
    * `textAreasAreResizable` Boolean (isteğe bağlı) - TextArea öğelerini yeniden boyutlandırılabilir yapın. Varsayılan `doğru` ise.
    * `webgl` Boolean (isteğe bağlı) - WebGL desteğini etkinleştirir. Varsayılan `doğrudur`.
    * ` webaudio` Boolean (isteğe bağlı) - Web Ses desteğini etkinleştirir. Varsayılan `doğrudur`.
    * `eklentileri` Boolean (isteğe bağlı) - Eklentilerin etkinleştirilip etkinleştirilmeyeceği. Varsayılan değer `yanlış`.
    * `experimentalFeatures` Boolean (isteğe bağlı) - Chromium'un deneysel özelliklerini etkinleştirir. Varsayılan değer `yanlış`.
    * `dexperimentalCanvasFeatures` Boolean (isteğe bağlı) - Chromium'un deneysel özelliklerini etkinleştirir tuval özellikleri. Varsayılan değer `yanlış`.
    * ` scrollBounce` Boolean (isteğe bağlı) - Üzerinde kaydırma sıçrama (lastik bantlama) efekti sağlar Mac os işletim sistemi. Varsayılan değer `yanlış`.
    * `blinkFeatures` Dize (isteğe bağlı) - ` ile ayrılmış özellik dizelerinin bir listesi,`, gibi ` CSSVariables,KeyboardEvent` Etkinleştirmek için anahtar. Desteklenmiş özellik dizelerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) dosyasında olabilir.
    * ` Blink özelliğini devre dışı bırak ` Dizi (opsiyonel) - `,` ile ayrılmış bir özellikler dizisi. İptal etmek için `CSSVariables, KeyboardEventKey`. Desteklenen özellik dizelerinin tam listesini [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/runtime_enabled_features.json5?l=70) dosyasında bulabilirsiniz.
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
    * `backgroundThrottling` Bağlaç (isteğe bağlı) - Sayfa arka plandayken animasyonların ve zamanlayıcıların kısıtlanması. Bu da [Page Visibility API](#page-visibility) etkiler. Varsayılanı `true` olarak belirler.
    * `offScreen` Boolean (isteğe bağlı) - Tarayıcı için ekran dışı görüntülemeyi etkinleştirip destekleyip desteklemeyeceğini belirtir penceresi. Varsayılan değer `false`. Bak [için ekran dışı işleme öğretici](../tutorial/offscreen-rendering.md) daha fazla detay.
    * ` contextIsolation` Boolean (isteğe bağlı) - Elektron API'lerini çalıştırıp çalıştırmamak Ayrı bir JavaScript bağlamında belirtilen `önyükleme` komut dosyası. Varsayılanı `false` olarak belirler. `önceden yükleme` Komut Dosyasının Çalıştığı İçerik Olmayacaktır `belge` ve `pencere` dünyasına tam erişime sahip olmakla birlikte kendi JavaScript yerleşikleri kümesi (`Array`, `Objec`, `JSON`, vb.) ve küresel çevreye yapılan herhangi bir değişiklikten izole edilecek yüklenen sayfaya göre. Elektron API'sı yalnızca ` yüklenen` sayfa değil önyükleme komut dosyası. Yüklenen içeriğin `önyükleme` komut dosyasına ve kullanılan herhangi bir Elektron API'sine kurcalamamasını sağlamak için potansiyel olarak güvenilmeyen uzak içeriği yüklerken bu seçenek kullanılmalıdır. Bu seçenek[Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) tarafından kullanılan yöntemi kullanır. Konsol sekmesinin üst kısmındaki birleşik giriş kutusunda 'Electron Yalıtılmış Ortam' girişini seçerek dev araçlarındaki bu içeriğe ulaşabilirsiniz. **Not**: Bu seçenek şu anda deneme amaçlı olup, gelecekteki Electron sürümlerinde değiştirilebilir veya kaldırılabilir.
    * `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
    * `webviewTag` Boolean (opsiyonel) - Aktifleştirmek için [`<webview>` etiket](webview-tag.md). Varsayılan değeri `nodeIntegration` aksamının değeridir. **Note:**`<webview>`için yapılandırılmış `preload` komut dosyası, çalıştırıldığında düğüm entegrasyonunun etkinleştirilmesini sağlar bu nedenle uzak/güvenilir olmayan içeriğin muhtemel kötü amaçlı `preload` komut dosyası içeren bir `<webview>` etiketi oluşturamayacağından emin olmanız gerekir. ` webview ekleyecek` etkinliğini [ webSatıcıları'nda](web-contents.md) kullanabilirsiniz. `önyükleme` komut dosyasını kaldırmak ve belgeyi doğrulamak veya değiştirmek için `<webview>` 'nin başlangıç ​​ayarları.
    * `additionArguments` String[] (optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.

Minimum veya maksimum pencere boyutunu ` min ile ayarlarken Genişlik` / ` maks Genişlik` / ` min Yükseklik` / ` maxHeight`, yalnızca kullanıcıları sınırlandırır. Sizi engellemeyecektir boyut sınırlamalarını takip etmeyen bir boyutu ` setBounds`/ ` Boyut ayarla` veya `Tarayıcı penceresi yapıcısına`.

`type` seçeneğinin olası değerleri ve davranışları platform bağımlıdır. Olası değerler şunlardır:

* Linux'ta olası türler `masaüstü`, `dock`, `araç çubuğu`, `splash`, `bildirim`'dir.
* MacOS'ta olası değerler `masaüstü`, `dokulandırılmış`. 
  * ` dokulu` türü metal eğimi görünümünü ekler (` NSTexturedBackgroundWindowMask`).
  * `Masaüstü` modeli, pencereyi masaüstü arka planındaki pencere seviyesine yerleştirir (`kCGDesktopWindowLevel - 1`). Masaüstü penceresi klavye veya farenin durumunu odak olarak kaydetmeyecektir. Ancak veri girişini tedbirli bir şekilde yapmak için `globalShortcut` kullanabilirisinz.
* Windows'ta mümkün olan model `toolbar` 'dır.

### Örnek Events

`new BrowserWindow` ile yaratılan neseneler aşağıdaki özellikleri belirtir:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `event` Olay
* `title` String

Belge, başlığını değiştirdiğinde ifade edilir, `event.preventDefault()` kullanmak doğal windows başlığının değişmesine engel olur.

#### Etkinlik: 'kapalı'

Dönüşler:

* `event` Event

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

***Note**: `window.onbeforeunload = handler` ve `window.addEventListener('beforeunload', handler)` davranışları arasında ince bir fark var. Elektron içinde daha tutarlı bir şekilde çalıştığı için her zaman bir değeri döndürmek yerine `event.returnValue`'i açıkça ayarlamanız önerilir.*

#### Etkinlik: 'kapatıldı'

Pencere kapatıldığında ortaya çıkmaktadır. Bu etkinliği aldıktan sonra, pencereye yapılan göndermeyi kaldırmalı ve daha fazla kullanmamalısınız.

#### Etkinlik: 'oturum-sonu' *Windows*

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

**Not**: MacOS'ta bu etkinlik sadece `moved` 'un takma adıdır.

#### Etkinlik: 'moved' *macOS*

Pencere yeni bir konuma taşındığında bir kez yayılmış.

#### Etkinlik: 'enter-full-screen'

Pencere tam ekran haline girdiğinde dışarı çıkar.

#### Etkinlik: 'leave-full-screen'

Pencere tam ekranda modunda bırakıldığında dışarı çıkar.

#### Etkinlik: 'enter-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran haline girdiğinde dışarı çıkar.

#### Etkinlik: 'leave-html-full-screen'

Pencere, HTML API'sı tarafından tetiklenen bir tam ekran halinde bırakıldığında dışarı çıkar.

#### Etkinlik: 'uygulama-komutu' *Windows*

Dönüşler:

* `event` Event
* `command` Dizi

[Uygulama Komutu](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) çağrıldığında ifade edilir. Bunlar genel olarak klavye ortam tuşları ya da tarayıcı komutları ve ayrıca Windows'da ki bazı farelerde olan "Geri" düğmesiyle ilgilidir.

Tire ve `APPCOMMAND_` ön adıyla değişen küçük harfli, altı çizili komutlar sıyrılır. Örneğin `APPCOMMAND_BROWSER_BACKWARD`, `browser-backward` olarak belirtilir.

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

Kaydırma tekerleği etkinlik aşaması başladığında ifade edilir.

#### Etkinlik: 'kaydır-dokun-bitir' *macOS*

Kaydırma tekerleği etkinlik aşaması bittiğinde ifade edilir.

#### Etkinlik: 'kaydır-dokun-kenar' *macOS*

Kaydırma tekerleği etkinlik aşamasının öğenin kenarına ulaşmasıyla kayda geçtiğini ifade eder.

#### Etkinlik: 'hızlı kaydır' *macOS*

Dönüşler:

* `event` Event
* `direction` Dizi

3-parmakla hızlı kaydırmada ifade edilir. Mümkün yönergeler: `up`, `right`, `down`, `left`.

#### Event: 'sheet-begin' *macOS*

Windows bir sayfa yaprağı açtığında ifade edilir.

#### Event: 'sheet-end' *macOS*

Windows'un bir sayfa yaprağını kapattığını ifade eder.

#### Olay: 'new-window-for-tab' *macOS*

Doğal yeni sekme tuşunun tıklanıldığını ifade eder.

### Statik Metodlar

`BrowserWindow` sınıfı aşağıdaki sabit yöntemlere sahiptir:

#### `BrowserWindow.getAllWindows()`

`BrowserWindow[]` 'u geri getirir - Bütün açılmış tarayıcı pencerelerinin bir dizilişidir.

#### `BrowserWindow.getFocusedWindow()`

`BrowserWindow` 'u geri getirir - Bu uygulamaya odaklanan pencere, öyle değilse `null` 'u geri getirir.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [webİçerikleri](web-contents.md)

`BrowserWindow` 'u geri getirir - Verilen `webContents` 'e sahip olan pencere.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Belirtilen `BrowserWindow | null` - Belirtilen `browserView`'ye sahip olan pencere. Verilen görünüm herhangi bir pencereye eklenmezse `null`'yi döndürür.

#### `BrowserWindow.fromId(id)`

* `id` tamsayı

`BrowserWindow` 'u geri getirir - `id` verilmiş olan pencere.

#### `TarayıcıPenceresi.eklentiekle(yol)`

* dizi `yolu`

`yola` Chrome eklentisini ekler ve uzantının adını döndürür.

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

* `path` Dizgi

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

### Örnek Özellikleri

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

#### `win.setEnabled(enable)`

* `enable` Boolean

Disable or enable the window.

#### `win.setSize(width, height[, animate])`

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

Sets whether the window can be manually resized by user.

#### `win.isResizable()`

Returns `Boolean` - Whether the window can be manually resized by user.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### `win.isMovable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be moved by user.

Linux'ta daima geri dönüyor `true`.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### `win.isMinimizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually minimized by user

Linux'ta daima geri dönüyor `true`.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Whether the window can be manually maximized by user.

Linux'ta daima geri dönüyor `true`.

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

Linux'ta daima geri dönüyor `true`.

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

* `x` Integer
* `x` Integer
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
* `geri aramak` Fonksiyon 
  * `image` [NativeImage](native-image.md)

Same as `webContents.capturePage([rect, ]callback)`.

#### `win.loadURL(url[, options])`

* `url` String
* `seçenekler` Nesne (isteğe bağlı) 
  * `httpReferrer` Dizgi (isteğe bağlı) - Bir HTTP başvuru bağlantısı.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Buna, sadece belirtilen `url` bir veri bağlantısıysa ve başka dosyalar yüklemesi gerekiyorsa, gerek duyulur.

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

#### `win.loadFile(filePath)`

* `filePath` Dizi

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### `win.reload()`

Same as `webContents.reload`.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `seçenekler` Nesne (isteğe bağlı) 
  * `mode` String *Windows* - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

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
* `seçenekler` Nesne (isteğe bağlı) 
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

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### `win.setTouchBar(touchBar)` *macOS* *Experimental*

* `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Not:** TouchBar API'si şu anda deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

#### `win.setBrowserView(browserView)` *Experimental*

* `browserView` [BrowserView](browser-view.md)

#### `win.getBrowserView()` *Experimental*

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Not:** BrowserView API şu an deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.
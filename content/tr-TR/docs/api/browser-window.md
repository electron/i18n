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
    * `hidden-inset` - Kullanımdan kaldırıldı, bunun yerine `hiddenInset` kullanın.
    * `hiddenInset` - Trafik ışığı düğmelerinin pencere kenarında biraz daha yerleştirildiği alternatif bir görünüme sahip gizli bir başlık çubuğunda sonuç verir.
    * `customButtonsOnHover` Boolean (isteğe bağlı) - MacOS çerçevesiz pencerelerde özel kapatma, küçültme ve tam ekran düğmeleri çizin. Bu düğmeler, pencerenin sol üst köşesine gelmediğiniz sürece görüntülenmez. Bu özel tuşlar, standart pencere araç çubuğu tuşlarıyla oluşan fare olaylarıyla ilgili sorunları önlemektedir. **Note:** Bu seçenek şu anda deneme niteliğinde.
  * `fullscreenWindowTitle` Boole (isteğe bağlı) - tam ekran modunda karo çubuğunda başlığı gösterir Mac os işletim sistemi herkes için `titleBarStyle` seçenekler. Varsayılan değer `yanlış`.
  * ` kalınÇerçeve </ 0>  Boole (opsiyonel) - Kullanım <code> WS_KALIN ÇERÇEVE</ 0> çerçevesiz için stil pencereler üzerinde
 Windows'un standart pencere çerçevesi ekler. <code>false` olarak ayarlamak pencere gölgesini ve pencere animasyonlarını kaldıracaktır. Varsayılanı `true`.
  * `vibrancy` Dizi (isteğe bağlı) - Pencereye sadece macOS'ta bir tür canlılık efekti ekleyin. `görünüş-esaslı`, `ışık`, `koyu`, `başlık çubuğu`, `seçimi`, `menüsü`, `popover`, `kenar çubuğu`, `orta-hafif` veya `ultra-karanlık`.
  * `zoomToPageWidth` Boolean (isteğe bağlı) - MacOS'daki davranışları kontrol eder. Seçenek - araç çubuğunda yeşil dur ışığı düğmesini tıklatarak veya Pencere>Zoom menü öğesi. `true` ise, pencere büyütülürken web sayfasının tercih edilen genişliğine, `false` genişliğinin ekranın genişliğine yaklaşmasına neden olur. `maximize()` Bu komut direk çağrıldığında ayrıca davranışı da etkileyecektir. Varsayılan `false`'dur.
  * `tabbingIdentifier` Dize (isteğe bağlı) - Sekme grubu adı, pencerenin macOS 10.12+ sürümünde yerel sekme olarak açılmasına izin verir. Aynı sekme tanımlayıcısına sahip olan Windows birlikte gruplandırılacaktır. Bu ayrıca pencerenizin sekme çubuğuna yerel yeni bir sekme düğmesi ekler `app` ve pencereye olayına ulaşmanıza izin verir. `new-window-for-tab`.
  * `webTercihleri` Hedef (isteğe bağlı) - Web sayfalarının özelliklerini ayarlama. 
    * ` devAraçlar` Boole (isteğe bağlı) - Dev Araçlar etkinleştirip desteklemeyeceğini belirtir. `yanlış` olarak ayarlanırsa DevTools'u açmak için ` BrowserWindow.webContents.openDevTools ()` kullanamazsınız. Varsayılanı `true`.
    * `nodeIntegration` Boolean (isteğe bağlı) - Düğüm entegrasyonunun etkinleştirilip etkinleştirilmediğini belirtir. Varsayılan `doğrudur`.
    * ` nodeIntegrationInWorker` Boolean (isteğe bağlı) - Düğümün tümleştirilip web çalışanlarında etkinleştirildi. Varsayılan `false`'dur. Bununla ilgili daha fazla bilgi bulabilirsiniz [ Multithreading'de](../tutorial/multithreading.md).
    * ` preload` Sicim (isteğe bağlı) - Diğerinden önce yüklenecek bir betiği belirtir sayfalarda komut dosyaları çalıştırın. Bu komut dosyasında, düğüm entegrasyonunun açık veya kapalı olmasına bakılmaksızın düğüm API'lerine her zaman erişilebilmektedir. Değer, komut dosyasının salt dosya yolu olmalıdır. Düğüm entegrasyonu kapatıldığında, önceden yüklenmiş komut dosyası düğümün genel başvuru bayrağını genel kapsamdan yeniden başlatır. Örneği [gör](process.md#event-loaded).
    * ` sandbox` Boole (isteğe bağlı) - Ayarlanırsa, oluşturucuyu gizlenecektir pencere ile ilişkilendirilerek Krom ile uyumlu hale getirilir OS düzeyinde sanal alan ve Node.js motorunu devre. Bu aynı şey değil ` düğüm Entegrasyon` seçeneği ve önyükleme komut dosyasında kullanılabilen API'ler daha sınırlıdır. Seçenek hakkında daha fazla detaya [buradan ](sandbox-option.md) ulaşabilirsiniz. ** Not**: Bu seçenek şu anda deneme amaçlı olup değişebilir veya değişebilir gelecekteki Electron sürümlerinde kaldırıldı.
    * `oturum` [Oturum](session.md#class-session) (isteğe bağlı) - Kullanılan oturumu ayarlar sayfa. Oturum nesnesini doğrudan geçirmek yerine bir bölüm dizesini kabul eden `partition` seçeneğini kullanmayı da denebilirsiniz. Ne zaman hem `oturumu` hem de `bölüm` sağlanır, `oturumu` tercih edilir. Varsayılan oturumun varsayılanıdır.
    * `bölüm` Satır (isteğe bağlı) - Sayfanın kullandığı oturumu. oturumun bölümlenmiş satırına göre ayarlar. Eğer `bölümü` ile başlarsa `persist:`, sayfa ile uygulamadaki tüm sayfalar için kalıcı bir oturum kullanacaktır aynı `bölümü`. Hiçbir ` persist`: öneki yoksa, sayfa bellek içi oturumu. Aynı `partition`, değişkenine değer atayarak birden çok sayfada aynı oturumu paylaşabilirsiniz. Varsayılan oturumun varsayılanıdır.
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
    * `nativeWindowOpen` Boolean (isteğe bağlı) - Yerli olmayanların kullanılacağı `window.open()`. Varsayılan olarak `yanlış`. **Not**: Bu seçenek şu anda deneysel.
    * `webviewTag` Boolean (opsiyonel) - Aktifleştirmek için [`<webview>` etiket](webview-tag.md). Varsayılan değeri `nodeIntegration` aksamının değeridir. **Note:**`<webview>`için yapılandırılmış `preload` komut dosyası, çalıştırıldığında düğüm entegrasyonunun etkinleştirilmesini sağlar bu nedenle uzak/güvenilir olmayan içeriğin muhtemel kötü amaçlı `preload` komut dosyası içeren bir `<webview>` etiketi oluşturamayacağından emin olmanız gerekir. ` webview ekleyecek` etkinliğini [ webSatıcıları'nda](web-contents.md) kullanabilirsiniz. `önyükleme` komut dosyasını kaldırmak ve belgeyi doğrulamak veya değiştirmek için `<webview>` 'nin başlangıç ​​ayarları.

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

* `event` Olay
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

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeExtension(name)`

* `name` Dizi

İsme göre bir Chrome eklentisi kaldır.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getExtensions()`

Dönüş `Nesne` - Anahtarlar uzantı adlarıdır ve her değer `ad` ve `versiyon` özelliği taşır.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.addDevToolsExtension(path)`

* dizi `yolu`

DevTools uzantısını belirtilen lokasyona `yol` ekler ve uzantı adına döner.

Bu API'yı yalnızca bir kez hatırlamanız gerekiyor, bu API programlama amacıyla değildir. Eğer önceden yüklenmiş bir uzantı eklemeyi denerseniz, bu sistem yüklenmeyecektir ve bunun yerine konsola bir uyarı yazacaktır.

Bu yöntem, uzantı bildirimi eksik olduğunda uzantı'yı geri getirmez.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.removeDevToolsExtension(name)`

* `name` Dizi

İsme göre bir DevTools eklentisi kaldır.

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

#### `BrowserWindow.getDevToolsExtensions()`

Dönüş `Nesne` - Anahtarlar uzantı adlarıdır ve her değer `ad` ve `versiyon` özelliği taşır.

DevTools uzantısının yüklenmiş olup olmadığını kontrol etmek için aşağıdakileri çalıştırabilirsiniz:

```javascript
const {BrowserWindow} = require('electron')

let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
console.log(installed)
```

**Note:** BU API `hazır` olayı `app` modülü yayılmadan çağrılamaz.

### Örnek Özellikleri

`yeni BrowserWindow` ile oluşturulan nesneler aşağıdaki özelliklere sahiptir:

```javascript
const {BrowserWindow} = require('electron')
// bu örnekte örnek sınıfımız "win"
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

#### `win.webContents`

Bu pencerenin sahip olduğu.<WebContents</code> nesnesi. Bütün web sayfası odaklı olaylar ve işler buna göre yapılır.

Bakınız [`webContents` dökümanı](web-contents.md) yöntemler ve olaylar için.

#### `win.id`

`Intege`, pencerenin benzersiz kimliğini temsil eder.

### Örnek Metodlar

`new BrowserWindow` ile oluşturulan nesnelerin aşağıda örnek methodları bulunmakta:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

#### `win.destroy()`

Pencereyi kapanmaya zorla, the `unload` ve <beforeunload</code> olay web sayfası için yayılmayacak ve `close` bu pencere için olay ayrıca yayılmayacak fakat `closed` olayının yayılmasını sağlar.

#### `win.close()`

Pencereyi kapatmayı deneyin. Bu, bir kullanıcının manuel olarak pencerenin kapat düğmesini tıklamasıyla aynı etkilere sahiptir. Web sayfası kapatmayı iptal edebilir. [close event](#event-close) bakın.

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

Pencereyi büyütür. Bu, aynı zamanda görüntülenemiyorsa pencereyi gösterecektir (odaklanmayacaktır).  .

#### `win.unmaximize()`

Pencereleri simge durumuna küçültür.

#### `win.isMaximized()`

`Boolean` Döndürür - Pencerenin büyütülüp büyütülmediği.

#### `win.minimize()`

Pencereyi küçültür. Bazı platformlarda simge durumuna küçültülmüş pencere yuvada gösterilir.

#### `win.restore()`

Pencereyi küçültülmüş durumdan önceki durumuna geri yükler.

#### `win.isMinimized()`

`Boolean` Döndürür - Pencerenin küçültülüp küçültülmediği.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Pencerenin tam ekran modunda olup olmadığını ayarlar.

#### `win.isFullScreen()`

`Boolean` Döndürür - Pencerenin tam ekran modda olup olmadığı.

#### `win.setSimpleFullScreen(flag)` *macOS*

* `flag` Boolean

Basit tam ekran moduna giriş veya çıkış yapar.

Basit tam ekran modu, Mac OS X'den önce Lion (10.7) sürümlerinde bulunan yerel tam ekran davranışını seçer.

#### `win.isSimpleFullScreen()` *macOS*

`Boolean` - pencerenin basit (Leon öncesi) tam ekran modunda olup olmadığını raporlar.

#### `win.setAspectRatio(aspectRatio[, extraSize])` *macOS*

* `aspectRatio` Yay - Bazı kısımların içerik görünümünü sürdürme adına en-boy oranı.
* `extraSize`[Size](structures/size.md) Büyütme oranını korurken ekstra boyut göz önüne alınmaz.

Bu, görüntü oranını koruyan bir pencere oluşturacaktır. Ekstra bir boyut, geliştiricinin piksel cinsinden belirtilen, görüntü oranı hesaplamaları içine dahil edilmeyen yere sahip olmasını sağlar. Bu API, önceden bir pencerenin boyutu ile içerik boyutu arasındaki farkı dikkate almaktadır.

Bir HD video oynatıcısına ve ilişkili olan kontrollere sahip normal bir pencere düşünün. Büyük ihtimalle player'ın sol kenarında 15, sağ kenarında 25 ve altında 50 piksel kontrol alanı var. Player içerisinde 16:9 oranını korumak için (HD için standart oran @1920x1080) bu işlemi çağırırız. [40,50] İkinci argüman içerik görüntüsü içerisinde genişlik ve yüksekliğin nerede olduğuyla ilgilenmez, sadece var oluşlarına bakar. Sadece Genel İçerik görünümünde herhangi bir ekstra genişlik ve yükseklik alanlarını toplamak yeterlidir.

#### `win.previewFile(path[, displayName])` *macOS*

* `path` Dizi - QuickLook ile kesin yol önizlemesi Bu, Quick Look açacağı dosyanın türünü belirlemek için dosya uzantısını ve yolunu kullandığı için önemlidir.
* `displayname` Dizi (opsiyonel) Quick Look şekilsel görünümünde görüntülenecek olan dosya adı. dosyanın görsel ve içeriğini tamamen etkilemez. varsayılan olarak`path`.

Belirli bir yoldaki bir dosyayı önizlemek için [Hızlı Bakış](https://en.wikipedia.org/wiki/Quick_Look)'ı kullanır.

#### `win.closeFilePreview()` *macOS*

Şu an açık olan [Hızlı Bakış](https://en.wikipedia.org/wiki/Quick_Look) panelini kapatır.

#### `win.setBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md)
* `animate` Boolean (isteğe bağlı) *macOS*

Pencereyi yeniden boyutlandırır ve sağlanan sınırlara taşır

#### `win.getBounds()
`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Dikdörtgen](structures/rectangle.md)
* `animate` Boolean (isteğe bağlı) *macOS*

Pencerenin müşteri alanını (örneğin, Web sayfası) boyutlandırmakta,taşımakta ve verilen sınırlara getirmektedir.

#### `win.getContentBounds()`

[`Rectangle`](structures/rectangle.md) döndürür

#### `win.setSize(width, height[, animate])
`

* `width` Tamsayı
* `height` Tamsayı
* `animate` Boolean (isteğe bağlı) *macOS*

Pencereyi `genişlik` ve `yükseklik` olarak yeniden boyutlandırır.

#### `win.getSize()`

Iadeler `Integer[]` - Pencerenin genişliğini ve yüksekliğini içerir.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (isteğe bağlı) *macOS*

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

* `width` Integer
* `height` Tamsayı

Pencereni maksimum boyutunu `genişlik` ve `yükseklik` olarak ayarlar.

#### `win.getMaximumSize()`

`Integer[]` 'ı geri getirir - Pencerenin maksimum genişliğini ve yüksekliğini içerir.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Pencerenin kullanıcı tarafından manuel olarak yeniden boyutlandırılacağını tanımlar.

#### `win.isResizable()`

Returns `Boolean` - Pencerenin kullanıcı tarafından manuel olarak yeniden boyutlandırılabilmesi.

#### `win.setMovable(movable)` *macOS* *Windows*

* `movable` Boolean

Pencerenin kullanıcı tarafından taşınabilir olup olmadığını ayarlar. Linux için bir önemi yoktur.

#### `win.isMovable()` *macOS* *Windows*

`Boolean` Döndürür - Pencerenin kullanıcı tarafından taşınıp taşınmayacağı.

Linux üzerinde her zaman `true` döndürür.

#### `win.setMinimizable(minimizable)` *macOS* *Windows*

* `minimizable` Boolean

Pencerenin kullanıcı tarafından el ile simge durumuna küçültülebilir olup olmadığını ayarlar. Linux üzerinde hiçbir şey yapmamaktadır.

#### `win.isMinimizable()` *macOS* *Windows*

`Boolean` Döndürür - Pencerenin kullanıcı tarafından manuel olarak küçültülüp küçültülmediği

Linux üzerinde her zaman `true` döndürür.

#### `win.setMaximizable(maximizable)` *macOS* *Windows*

* `maximizable` Boolean

Pencerenin kullanıcı tarafından manuel olarak maksimize edilip edilemeyeceğini ayarlar. Linux'ta hiçbir şey değil.

#### `win.isMaximizable()` *macOS* *Windows*

Returns `Boolean` - Pencerenin kullanıcı tarafından manuel olarak maksimize edilip edilemeyeceği.

Linux üzerinde her zaman `true` döndürür.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Yakınlaştırma düğmesinin tam ekran modunu değiştirip değiştirmeyeceğini veya pencereyi en yükseğe çıkarıp büyütüp büyütmediğini belirtir.

#### `win.isFullScreenable()`

Returns `Boolean` - Maksimumlaştır / yakınlaştır penceresi düğmesinin tam ekran modunu değiştirip değiştirmeyeceğini pencereyi en üst düzeye çıkarır.

#### `win.setClosable(closable)` *macOS* *Windows*

* `closable` Boolean

Pencerenin kullanıcı tarafından el ile kapatılıp bırakılmayacağını tanımlar. Linux'ta önemi yok.

#### `win.isClosable()` *macOS* *Windows*

`Boolean` Döndürür - Pencerenin kullanıcı tarafından manuel olarak kapatılıp kapatılmayacağı.

Linux üzerinde her zaman `true` döndürür.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String opsiyonel) *macOS*- Değerleri içerir `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, ve ~~`dock`~~ (Artık kullanılmaz). Varsayılan değer `floating`. Daha fazla ayrıntı için macOS docs</0' e bakın.</li> 
  
  * `relativeLevel` Tamsayı (isteğe bağlı)*macOS* - Bu pencerenin verilen `level` değerine göre katman sayısı daha yüksek. Varsayılan değer ``. Genellikle Apple 1 seviyesinin üstünde `screen-saver` ayarlanmasını istemez.</ul> 
  
  Pencerenin her zaman diğer pencerelerin üstünde gösterilip gösterilmeyeceğini ayarlamaktadır. Bu ayarlamadan sonra, pencere hala odaklanılamayan bir araç kutusu penceresi değil normal bir pencere olacaktır.
  
  #### `win.isAlwaysOnTop()`
  
  Returns `Boolean` - Pencerenin daima diğer pencerelerin üstünde olup olmadığı.
  
  #### `win.center()`
  
  Pencereyi ekranın ortasına taşır.
  
  #### `win.setPosition(x, y[, animate])`
  
  * `x` Integer
  * `x` Integer
  * `animate` Boolean (isteğe bağlı) *macOS*
  
  Pencereyi taşı `x` and `y`.
  
  #### `win.getPosition()`
  
  `Integer[]` 'ı geri getirir - Pencerenin mevcut pozisyonunu içerir.
  
  #### `win.setTitle(title)`
  
  * `title` String
  
  Doğal pencerenin başlığını `title` olarak değiştirir.
  
  #### `win.getTitle()`
  
  `String` 'i geri getirir - Doğal pencerenin başlığı.
  
  **Note:** web sayfasının başlığı yerel unvanından farklı olabilir. pencere.
  
  #### `win.setSheetOffset(offsetY[, offsetX])` *macOS*
  
  * `offsetY` Float
  * `offsetX` Float (isteğe bağlı)
  
  MacOS üzerindeki sayfalar için ek noktasını değiştirir. Varsayılan olarak, sayfalar pencere çerçevesinin hemen altına eklenir, ancak bunları HTML işlenmiş bir araç çubuğunun altında görüntülemek isteyebilirsiniz. Örnek olarak:
  
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

Kiosk moduna girer veya ayrılır.

#### `win.isKiosk()`

`Boolean` geri getirir - Pencere kiosk modundaysa.

#### `win.getNativeWindowHandle()`

Returns `Buffer` - pencerenin platforma özel tutamacı.

Yerel türü Windows' ta `HWND`, macOS' ta `NSView*`, ve Linux' ta `Window` (`unsigned long`) on Linux.

#### `win.hookWindowMessage(message, callback)` *Windows*

* `message` Integer
* `callback` Function

Çengel Bir pencere mesajı. The `callback` is called when the message is received in the WndProc.

#### `win.isWindowMessageHooked(message)` *Windows*

* `message` Integer

`Boolean` - İletinin sabit olup olmadığına bağlı olarak `true` or `false`' a döndürülür.

#### `win.unhookWindowMessage(message)` *Windows*

* `message` Integer

Pencere mesajını çıkarın.

#### `win.unhookAllWindowMessages()` *Windows*

Tüm pencere mesajlarının kilidini açar.

#### `win.setRepresentedFilename(filename)` *macOS*

* `dosya adı` dize

Pencerenin temsil ettiği dosyanın yol adını belirler ve dosya simgesi pencerenin başlık çubuğunda gösterilmiş olur.

#### `win.getRepresentedFilename()` *macOS*

`String` Windows' un temsil ettiği dosyanın yolunu değiştirir.

#### `win.setDocumentEdited(edited)` *macOS*

* `edited` Boolean

Window's belgelerinin düzenlenip düzenlenmediğini belirtir ve `true` olarak ayarlandığında başlık çubuğundaki simge gri olur.

#### `win.isDocumentEdited()` *macOS*

`Boolean` - Window' s dosyalarının düzenlenmiş olup olmadığını döndürür.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - üst sınırlar
* `geri aramak` Function 
  * `image` [NativeImage](native-image.md)

`webContents.capturePage([rect, ]callback)` ile aynı.

#### `win.loadURL(url[, options])`

* `url` Dize
* `seçenekler` Obje (opsiyonel) 
  * `httpReferrer` Dizgi (isteğe bağlı) - Bir HTTP başvuru bağlantısı.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opsiyonel)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Buna, sadece belirtilen `url` bir veri bağlantısıysa ve başka dosyalar yüklemesi gerekiyorsa, gerek duyulur.

`webContents.loadURL(url[, options])` İle aynı.

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

#### `win.reload()`

`webContents.reload`. ile aynı.

#### `win.setMenu(menu)` *Linux* *Windows*

* `menu` Menü | boş

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `seçenekler` Nesne (isteğe bağlı) 
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

* `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/reference/appkit/nsvisualeffectview?language=objc) for more details.

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
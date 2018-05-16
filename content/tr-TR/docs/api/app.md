# uygulama

> Uygulamanızın olay yaşam döngüsünü kontrol edin.

Süreç: [Ana](../glossary.md#main-process)

Aşağıdaki örnek, son pencere kapatıldığında uygulamadan nasıl çıkılacağını göstermektedir:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Etkinlikler

`app` nesnesi aşağıdaki olaylarla ortaya çıkar:

### Olay: 'will-finish-launching'

Uygulama temel başlangıcını bitirdiği zaman ortaya çıkar. Windows ve Linux'ta, `bitiş başlatma` olayı, `hazır` etkinliği ile aynıdır; macOS'ta bu olay, `NSApplication` 'in `applicationWillFinishLaunching` bildirimini temsil eder. Genellikle, `açık dosya` ve `açık-url` olayları için dinleyicileri ayarlarsınız ve çökme muhabirini ve otomatik güncelleyiciyi başlatırsınız.

Çoğu durumda, her şeyi yalnızca `hazır` olay işleyicisinde yapmalısınız.

### Etkinlik: 'hazır'

Dönüşler:

* `launchInfo` Nesne *macOS*

Elektron başlatmayı bitirdiğinde ortaya çıkar. MacOS'ta, `launchInfo`, Bildirim Merkezi'nden başlatıldığı takdirde, uygulamayı açmak için kullanılan `NSUserNotification` öğesinin `kullanıcı bilgisi`'ni tutar. Bu etkinliğin zaten başlayıp başlamadığını kontrol etmek için `app.isReady()` 'i arayabilirsiniz.

### Olay: 'Tüm-pencereler-kapalı'

Tüm pencereler kapatıldığında ortaya çıkar.

Bu etkinliğe abone değilseniz ve tüm pencereler kapalıysa, varsayılan davranış, uygulamadan çıkmaktır; ancak, abone olursanız, uygulamanın sona erip ermeyeceğini kontrol edersiniz. Kullanıcı `Cmd + Q` tuşlarına basarsa veya geliştirici `app.quit()`'i çağırırsa, Electron önce tüm pencereleri kapatmaya ve ardından `will-quit` olayını yayınlamaya çalışacaktır ve bu durumda `Tüm-Pencereler-Kapalı` olayı yayınlanmayacaktır.

### Olay: 'çıkıştan-önce'

Dönüşler:

* `event` Olay

Uygulama pencerelerini kapatmaya başlamadan önce ortaya çıkar. `event.preventDefault()` öğesini çağırmak, uygulamayı sonlandıran varsayılan davranışı engelleyecektir.

**Not:**Uygulama bırakma işlemi`autoUpdater.quitAndInstall()` tarafından başlatılmışsa, tüm pencerelerde `kapanış` olayını yayan</em> sonra* yayınlanır ve kapanır.</p> 

### Etkinlik: 'çıkış-yapılacak'

Returns:

* `event` Event

Tüm pencereler kapatıldığında ve uygulamadan çıkıldığında ortaya çıkar. `event.preventDefault()` öğesini çağırmak, uygulamayı sonlandıran varsayılan davranışı engelleyecektir.

Arasındaki farklar için `tüm-pencereler-kapalı` olayının açıklamasına bakın `will-quit` ve `tüm-pencereler-kapalı` olayları.

### Etkinlik: 'çıkış'

Dönüşler:

* `event` Olay
* `çıkışKodu` Tamsayı

Uygulama kesildiğinde ortaya çıkar.

### Etkinlik: 'open-file' *macOS*

Dönüşler:

* `event` Event
* `path` Dizgi

Kullanıcı uygulama ile bir dosya açmak istediğinde ortaya çıkar. `open-file` olayı genellikle uygulama zaten açık olduğunda ve OS dosyayı açmak için uygulamayı tekrar kullanmak istediğinde yayınlanır. Dock'a bir dosya düştüğünde ve uygulama henüz çalışmadığında da `open-file` yayınlanır. Bu olayı işlemek için (`hazır` olayı yayından önce bile olsa), uygulamanın başlangıç ​​işleminin çok erken bir aşamasında `açık dosya` olayını dinlediğinizden emin olun.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Windows'ta, dosya yolunu almak için (ana süreçte) `process.argv` ayrıştırmanız gerekir.

### Olay: 'open-url' *macOS*

Dönüşler:

* `event` Olay
* `url` String

Kullanıcı uygulama ile bir url açmak istediğinde ortaya çıkar. Uygulamanızın `Info.plist` dosyası, `CFBundleURLTypes` anahtarının içinde url düzenini tanımlamalı ve `NSPrincipalClass` 'ı `AtomApplication` olarak ayarlamalıdır.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

### Etkinlik: 'activate' *macOS*

Dönüşler:

* `event` Event
* `hasVisibleWindows` Boolean

Uygulama etkinleştirildiğinde ortaya çıkar. Uygulamayı ilk kez başlatmak, uygulamayı zaten çalıştırırken yeniden başlatmaya çalışmak veya uygulamanın yükleme istasyonu veya görev çubuğu simgesini tıklatmak gibi çeşitli eylemler bu olayı tetikleyebilir.

### Olay: 'continue-activity' *macOS*

Dönüşler:

* `event` Olay
* xxxx: Dize - Aktiviteyi tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.
* `userInfo` Object - Etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.

Farklı bir cihazdan bir etkinlik sürdürmek istediğinde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sırasında ortaya çıkar. Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Bir kullanıcı etkinliği yalnızca, etkinliğin kaynak uygulamasıyla aynı geliştirici Ekip ID'si olan ve etkinliğin türünü destekleyen bir uygulamada devam edilebilir. Desteklenen etkinlik türleri, uygulamanın `Info.plist` öğesinde `NSUserActivityTypes` anahtarının altında belirtilir.

### Olay: 'will-continue-activity' *macOS*

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.

Farklı bir cihazdan gelen bir etkinlik yeniden başlatılmadan önce [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) o esnada ortaya çıkar. Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

### Olay: 'continue-activity-error' *macOS*

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `error` dize - hatanın yerelleştirilmiş açıklamasına sahip bir dizedir.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sırasında farklı bir cihazdaki bir etkinliğin başarısız olması durumunda ortaya çıkıyor.

### Etkinlk: 'activity-was-continued' *macOS*

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

Bu cihazdan bir etkinlik başarıyla yürütüldüğünde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) o sırada ortaya çıkıyor.

### Etkinlik: 'activate' *macOS*

Dönütler:

* `event` Olay
* xxxx: Dize - Aktiviteyi tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) başka bir cihazda yeniden başlatılmaya çalışıldığında yayınlanır. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Aksi halde işlem başarısız olur ve `continue-activity-error` çağrılır.

### Etkinlik: 'new-window-for-tab' *macOS*

Dönütler:

* `event` Event

Yerel kullanıcı macOS yeni sekme düğmesini tıklattığında ortaya çıkar. Yeni sekme düğmesi, yalnızca geçerli `BrowserWindow` öğesinin `tabbingIdentifier` olması durumunda görünür

### Olay: 'browser-window-blur'

Dönüşler:

* `event` Olay
* `browserView` [BrowserView](browser-window.md)

Bir [borwserWindow](browser-window.md) bulanıklaştığında ortaya çıkar.

### Olay: 'tarayıcı-pencere-odak'

Dönüşler:

* `event` Event
* `browserView` [BrowserView](browser-window.md)

Bir [borwserWindow](browser-window.md)'a odaklanıldığında ortaya çıkar.

### Etkinlik: 'tarayıcı-penceresi-yaratıldı'

Dönüşler:

* `event` Event
* `browserView` [BrowserView](browser-window.md)

Yeni bir [borwserWindow](browser-window.md) oluşturulduğunda ortaya çıkar.

### Etkinlik: 'web-içerikleri-yaratıldı'

Dönüşler:

* `event` Event
* `webContents` [webİçerikleri](web-contents.md)

Yeni bir [webContents](web-contents.md) oluşturulduğunda ortaya çıkar.

### Etkinlik: 'sertifika-hatası'

Dönüşler:

* `event` Event
* `webContents` [webİçerikleri](web-contents.md)
* `url` Dize
* `error` Dizi - Hata Kodu
* `certificate` [sertifika](structures/certificate.md)
* `geri aramak` Function 
  * `isTrusted` Boolean - Sertifikanın güvenilir olup olmadığını göz önünde bulundur

Çıkarıldığında `url` için `certificate` doğrulama hatası oluştu, sertifikaya güvenmek için temel davranışın oluşmasını `event.preventDefault()` ile engelleyin ve `callback(true)` arayın.

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Onaylama aşaması
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Olay: 'select-client-certificate' 

Dönüşler:

* `event` Event
* `webContents` [webİçerikleri](web-contents.md)
* `url` URL
* `certificateList` [Sertifika[]](structures/certificate.md)
* `geri aramak` Function 
  * `certificate` [Sertifika](structures/certificate.md) (isteğe bağlı)

Bir istemci sertifikası talep edildiğinde yayılır.

`url`, istemci sertifikasını isteyen gezinme girişine karşılık gelir ve listeden filtrelenmiş bir girdi ile `callback` çağrılabilir. `event.preventDefault()` öğesinin kullanılması, uygulamanın mağazadaki ilk sertifikayı kullanmasını engeller.

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Etkinlik: 'giriş'

Dönüşler:

* `event` Event
* `webContents` [webİçerikleri](web-contents.md)
* `istek` Nesne 
  * `method` Dizi
  * `url` URL
  * `referrer` URL
* `authInfo` Nesne 
  * `isProxy` Boolean
  * `scheme` Dizi
  * `host` Dizi
  * `port` Tamsayı
  * `realm` Dizi
* `geri aramak` Function 
  * `username` Dizi
  * `password` Dizi

`webContents` temel doğrulama yapmak istediğinde çıkarılır.

Varsayılan davranış, tüm kimlik doğrulamalarını iptal etmektir; bunu geçersiz kılmak için `event.preventDefault()` ile varsayılan davranışı engellemeli ve kimlik bilgileriyle `callback(username, password)`'u çağırmalısınız.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Olay: 'gpu-process-crashed' 

Dönüşler:

* `event` Olay
* `killed` Boolean

Gpu işlemi çöktüğünde yada yok olduğunda yayılmaktadır.

### Etkinlik: 'erişilebilir-destek-değişti' *macOS* *Windows*

Dönüşler:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` Chrome'un ulaşılabilirlik desteği etkinken, o zaman `false`.

Chrome'un erişilebilirlik takviyesi değiştiğinde ortaya çıkar. Bu olay, ekran okuyucuları gibi yardımcı teknolojilerin etkinleştirilmesi veya devre dışı bırakılmasında tetiklenir. Daha detaylı bilgi için https://www.chromium.org/developers/design-documents/accessibility ziyaret edin.

## Metodlar

`app` nesnesi aşağıdaki metodlara sahiptir:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

### `app.quit()`

Tüm pencereleri kapatmayı dener. İlk olarak `before-quit` olayı yayılacaktır. Eğer tüm pencereler başarıyla kapatılırsa, `will-quit` olayı yayılacaktır ve varsayılan olarak uygulama sonlandırılacaktır.

Bu metod tüm `beforeunload` ve `unload` olayları işleyicilerinin düzgün şekilde yürütüleceğini garanti eder. Bir pencerenin `beforeunload` olay işleyicisine `false` dönütünü vererek, çıkışı iptal etmesi mümkündür.

### `app.exit([exitCode])`

* `exitCode` Tamsayı (Seçimli)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Tüm pencereler kullanıcıya sormadan hemen kapatılır, `before-quit` ve `will-quit` olayları yayılmaz.

### `app.relaunch([options])`

* `seçenekler` Obje (opsiyonel) 
  * `args` String[] (optional)
  * `execPath` Dizgi (Seçimli)

Yürürlükteki oluşum tamamlandığında uygulamayı yeniden başlatır (relaunch).

Varsayılan olarak yeni oluşum, yürürlükteki oluşumun çalışmakta olduğu aynı dizin ve komut satırı değişkenlerini kullanır. `args` belirtildiğinde, `args` komut satırı değişkenlerinin yerini alır. `execPath` belirtildiğinde, yeniden başlatma yürürlükteki uygulama yerine `execPath` için uygulanır.

Bu metodun uygulandığında uygulamadan çıkış yapmadığını unutmayın, uygulamayı yeniden başlatmak (restart) için `app.relaunch`'u çağırdıktan sonra `app.quit`'i veya `app.exit`'ı çağırmanız mecburidir.

`app.relaunch` birden fazla kez çağırılırsa, yürürlükteki oluşum tamamlandıktan sonra, birden fazla oluşum başlatılır.

Yürürlükteki oluşumun yeniden başlatılmasının (restart) ve yeni oluşumuna yeni bir komut satırı değişkeni eklenmesinin bir örneği:

```javascript
const {app} = gerekir('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Eğer Electron sıfırlamayı tamamladıysa `Boolean` - `true` dönütünü, tamamlamadıysa `false` dönütünü verir.

### `app.focus()`

Linux'ta görünebilen ilk pencereye odaklanır. macOS'ta uygulamayı aktif uygulama yapar. Windows'ta uygulamanın ilk penceresine odaklanır.

### `app.hide()` *macOS*

Tüm uygulama pencerelerini simge durumuna küçültmeden gizler.

### `app.show()` *macOS*

Gizlenmiş olan uygulama pencerelerini gösterir. Pencerelere otomatik olarak odaklanmaz.

### `app.getAppPath()`

`String` - olarak yürürlükteki uygulama dizini dönütünü verir.

### `app.getPath(isim)`

* `name` Dizi

`String` - olarak `name` ile ilişkilendirilmiş bir dosya veya dizgine yönelmiş yol dönütünü verir. Hata durumunda bir `Error` dönütü verir.

Aşağıdaki yolları isimleriyle talep edebilirsiniz:

* `home` Kullanıcının ana dizgini.
* `appData` Her bir kullanıcının uygulama verisinin bulunduğu veri dizgini, varsayılan olarak şunlara işaret eder: 
  * Windows'ta `%APPDATA%`
  * Linux'ta `$XDG_CONFIG_HOME` veya `~/.config`
  * macOS'ta `~/Library/Application Support`
* `userData` Uygulamanızın , varsayılan olarak uygulamanızın ismiyle ilişkilendirilen `appData` dizini olan, konfigürasyon dosyalarını saklayan dizin.
* `temp` Geçici dizin.
* `exe` Yürürlükteki yürütülebilir dosya.
* `module` - `libchromiumcontent` kütüphanesi.
* `dekstop` Yürürlükteki kullanıcının Masaüstü dizini.
* `documents` Bir kullanıcının "Dökümanlarım" dizini.
* `downloads` Bir kullanıcının "İndirilenler" dizini.
* `Müzik`Bir kullanıcının "Müziklerim" dizini.
* `pictures` Bir kullanıcının "Resimlerim" dizini.
* `videos` Bir kullanıcının "Videolarım" dizini.
* Uygulamanızın günlük klasörü için `logs` dizini.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* dizi `yolu`
* `seçenekler` Obje (opsiyonel) 
  * `boyut` Dize 
    * `küçük` - 16x16
    * `normal` - 32x32
    * `büyük` - *Linux'ta* 48x48, *Windows'ta*32x32, *macOS'de* desteklenmemektedir.
* `geri aramak` Function 
  * `error` Error
  * `icon` [DoğalGörüntü](native-image.md)

Bir dosya yolunun ilişkili ikonunu çeker.

*Windows*'ta 2 tip ikon bulunur:

* `.mp3`, `.png` v.b. gibi belirli dosya uzantıları ile ilişkilendirilmiş ikonlar
* `.exe`, `.dll`, `.ico` gibi, dosyanın kendi içindeki ikonlar

*Linux* ve *macOS* ikonlar, dosya mıme tipiyle ilişkilendirilen uygulamaya bağlıdır.

### `app.setPath(isim, yol)`

* `name` Dizi
* dizi `yolu`

`name` ile ilişkilendirilen özel bir dizine veya dosyaya giden dosya yolunu (`path`) baştan tanımlar. Eğer dosya yolu varolmayan bir dizine yönlendirilirse, belirtilen dizin bu metodla oluşturulur. Hata durumunda bir `Error` dönütü verir.

Sadece `app.getPath`'da tanımlanmış olan `name`'lere ait dosya yollarını baştan tanımlayabilirsiniz.

Varsayılan olarak, internet sayfalarının çerezleri ve önbellekleri `userData` dizininde saklanır. Eğer bu konumu değiştirmek istiyorsanız, `app` biriminin `ready` olayı yayılmadan önce `userData` dosya yolunun baştan tanımlanması mecburidir.

### `app.getVersion()
`

Yüklenen uygulamanın sürümü `String` döndürür. Uygulamanın `package.json` dosyasında hiçbir sürüm bulunamazsa, geçerli paketin veya yürütülebilir dosyanın sürümü döndürülür.

### `app.getName()`

`String` Döndürür - Uygulamanın adını belirten geçerli uygulamanın adı ` package.json ` dosyası.

Genellikle, ` package.json ` ` ad ` alanı küçük bir kısaltma adıdır npm modüllerine spec. Genel olarak `productName` belirtmelisiniz, bu da uygulamanızın üst karakterle yazılmış hali olmalıdır ve Electron'un belirlediği `isimden` çok tercih edilecektir.

### `app.setName(name)`

* `name` Dizi

Mevcut uygulamanın ismini geçersiz kılar.

### `app.getLocale()`

Geçerli uygulama yerel ayarı - `String` döndürür. Olası dönüş değerleri belgelenmiştir [ Burada ](locales.md).

** Not:** Paketli uygulamanızı dağıtırken, aynı zamanda ` yerel ayarlar` klasörü nakledilir.

**Not:** Windows'ta `hazır` olaylar yayınlandıktan sonra çağırmanız gerekir.

### `app.addRecentDocument(yol)` *macOS* *Windows*

* dizi `yolu`

Son dokümanlar listesine `yol` ekler.

Bu liste OS tarafından yönetilmektedir. Windows'ta görev çubuğundan listeyi ziyaret edebilir ve macOS'ta dock menüsünden ziyaret edebilirsiniz.

### `app.clearRecentDocuments()` *macOS* *Windows*

Yakın zamandaki dokümentasyon listesini temizler.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı: Uygulamanızın `electron://` bağlantılarını işlemesini isterseniz, bu yöntemi parametre olarak `electron` ile çağırın.
* `path` Dizi (isteğe bağlı) *Windows* - Varsayılana çevirir `process.execPath`
* `args` Dizi[] (isteğe bağlı) *Windows* - Boş düzeni varsayılana ayarlar

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

Bu yöntem, geçerli yürütülebilir dosyayı bir protokol için varsayılan işleyici olarak ayarlar (aka URI düzeni). Uygulamanızı daha da derinleştirerek işletim sistemine entegre etmenizi sağlar. Kayıt olduktan sonra, `your-protocol://` adresine sahip tüm bağlantılar, ile açılır. Geçerli yürütülebilir. Protokol de dahil olmak üzere tüm bağlantı, uygulamanız bir parametre olarak geçilecek.

Windows'ta isteğe bağlı parametrelerin yolu, çalıştırılabilir dosyanızın yolu, ve argümanlar, çalıştırılabilir dosyaya başlatıldığında iletilecek argümanlar dizisi.

**Not**: MacOS üzerinde sadece senin app `info.plist`. eklenen protokolleri kaydedebilirsiniz. Uygulamanız çalışma zamanında değiştirilemez. Bununla birlikte oluşturma süresi boyunca dosyayı basit bir metin düzenleyicisi veya komut dosyası ile değiştirin. Ayrıntılar için [Apple'ın belgelerine](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) bakın.

API dahili olarak Windows Kayıt Defteri ve LSSetDefaultHandlerForURLScheme kullanır.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `yolu` Dize (isteğe bağlı) *Windows* - Varsayılan değer olarak `process.execPath`
* `args` Dizi [] (isteğe bağlı) *Windows* - Boş bir diziye varsayılan

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

Bu yöntem, geçerli yürütülebilir bir iletişim kuralı (aka URI şeması) için varsayılan işleyici olarak çalışıp çalışmadığını kontrol eder. Eğer öyleyse, varsayılan işleyici olarak uygulamayı kaldırır.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `path` Dizi (isteğe bağlı) *Windows* - Varsayılana çevirir `process.execPath`
* `args` Dizi[] (isteğe bağlı) *Windows* - Boş düzeni varsayılana ayarlar

`Boole Değeri` döndürür

Bu yöntem, geçerli yürütülebilir dosyanın bir protokol için varsayılan işleyici olup olmadığını kontrol eder (aka URI düzeni). Eğer öyleyse, doğru bulacaktır. Aksi takdirde, yanlışa döndürür.

**Not**: Mac işletim sisteminde, bu yöntemle uygulamanın başarılı olup olmadığını kontrol edebilirsiniz protokol için varsayılan protokol işleyicisi olarak kayıtlı. Ayrıca bunun için ` ~/Library/Preferences/com.apple.LaunchServices.plist` dosyasını kontrol ederek macOS makinede doğruyabilirsin. Bakınız [Apple'ın belgeleri](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) Ayrıntılar için.

API dahili olarak Windows Kayıt Defteri ve LSCopyDefaultHandlerForURLScheme kullanır.

### `app.setUserTasks(tasks)` *Windows*

* `görevler<code> <a href="structures/task.md">Görev []</a> - <0>Görev` nesnelerinin dizisi

Windows'taki `tasks` kategorisini JumpList'teki [Görevler](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) kategorisine ekler.

`tasks`, [`görevler`](structures/task.md) nesenelerinin bir sırasıdır.

`Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.

**Not:** Eğer Jump List'i daha da çok özelleştirmek istiyorsanız yerine `app.setJumpList(categories)` kullanın.

### `app.getJumpListSettings()` *Windows*

`Object` 'i geri getirir:

* `minItems` Tamsayı - Listede gösterilecek minimum öğe sayısı Atlama Listesi (bu değerin daha ayrıntılı bir açıklaması için bkz. [MSDN dokümanları](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ile eşleşen `JumpListItem` nesnelerinin dizisi kullanıcının belirli kategorilerden açıkça kaldırdığı öğelerin atlama listesidir. Bu öğeler, **sonraki** Atlama Listesine tekrar eklenemez `app.set JumpList()` öğesini çağırın. Herhangi bir özel kategoriden kaldırılan öğelerden herhangi birini içeren windows görüntülenmez.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListKategorileri[]](structures/jump-list-category.md) ya da `null` - `JumpListCategory` nesnelerinin sırası.

Uygulama için özel bir Atlama Listesi'ni ayarlar veya kaldırır ve aşağıdaki dizelerden birini geri döndürür:

* `ok` - Hiç bir şey yanlış gitmedi.
* `error` - Bir ya da birden fazla hata meydana geldi, muhtemel sebebi anlamak için çalışma zamanı günlüğünü etkinleştirin.
* `invalidSeparatorError` - Jump List içindeki özel kategoriye ayraç eklemeye çalışma girişimi. Ayraçlar sadece standart `Tasks` kategorisinde geçerlidir.
* `fileTypeRegistrationError` - Jump List'e uygulamanın kaldıramayacağı bir dosya bağlantısıyla dosya tipinin gönderilme girişimi.
* `customCategoryAccessDeniedError` - Özel kategoriler Jump List'e kullanıcı gizliliği ve grup ilkesi ayarları gereğince eklenemez.

`kategorileri` `boş` ise, önceden ayarlanmış Özel Geçiş Listesi (varsa) olacaktır. yerine uygulama için standart Git Listesi (Windows tarafından yönetilen) değiştirildi.

**Not:** Eğer bir `JumpListCategory` nesnesinin ne `type` ne de `name` özelliği ayarlanmamışsa `type` ının `tasks` olduğu varsayılır. Eğer `name` özelliği ayarlanmış fakat `type` göz ardı edilmişse yine `type` ın `custom` olduğu varsayılır.

**Not**: Kullanıcılar öğeleri özel kategorilerden kaldırabilir ve Windows kaldırılan bir öğe'nin **tekrar** olana kadar özel bir kategoriye eklenmesine izin verin bir sonraki başarılı çağrı: `app.setJumpList (categories)`. Herhangi bir girişim öğesi kaldırılmış, daha önce özel bir kategoriye yeniden eklemek, tüm özel kategorinin Jump Listesi'nden çıkarılmasıdır. Bu kaldırılan öğelerin listesini `app.getJumpListSettings()`. kullanarak elde edebilirsiniz.

Aşağıda özel bir Atlama Listesi oluşturmanın basit bir örneği verilmiştir:

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.makeSingleInstance(callback)`

* `geri aramak` Function 
  * `argv` Dizi[] - İkinci aşamanın komuta satırı argümanları sırası
  * `workingDirectory` Dizi - İkinci aşamanın çalışma dizini

`Boolean` 'i geri getirir.

Bu yöntem uygulamanızı bir Tek Örnek Uygulaması yapar - bunun yerine uygulamanızı çalıştırmak için birden çok örneğine izin vermek, bu uygulamanızın sadece tek bir örneğinin çalışmasını sağlayacaktır, ve diğer örnekler bu örneği işaret eder ve çıkar.

`callback`, ikinci aşama işleme konulduğu zaman `callback(argv, workingDirectory)` ile ilk aşama olarak adlandırılır. `argv` ikinci örneğin komuta sırası argümanlarının dizilişidir, ve `workingDirectory` bunun şimdiki çalışma dizinidir. Genellikle uygulama, ana penceresinin odağını küçültecek ve odaklaştıracak şekilde yanıtlar.

`app` etkinliğinin `ready` 'si çıkarıldıktan sonra `callback` garanti bir şekilde uygulanacaktır.

Bu yöntem geri dönüş uygulamalarının birincil örnegidir `false` ve uygulamanız yüklenmeye devam etmelidir. Işleminizin parametreleri başka bir örneğe yönlendirildiyse geri döner `true` hemen çıkış yapmalısınız.

macOS 'ta, kullanıcılar Finder'ın içindeki uygulamada ikinci bir aşamayı açmaya çalıştıklarında sistem otomatik olarak tek aşamaya zorlayacaktır, ve bunun için `open-file` ve `open-url` etkinlikleri çıkarılacaktır. Bununla birlikte, kullanıcılar komut satırında uygulamanıza başladığı zaman, sistemin tek örnek mekanizması atlanmış olur ve tek bir örnek sağlamak için bu yolu kullanmanız gerekmektedir.

İkinci bir örnek başladığında, birincil örnek penceresi harekete geçirme örneği:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Birisi ikinci bir örneği çalıştırmayı denedi, penceremize odaklanmalıyız.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// MyWindow'umu oluştur, uygulamanın geri kalanını yükle, vs ...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

`makeSingleInstance`. tarafından oluşturulan bütün kilitleri serbest bırakır, Bu uygulamanın çoklu örneğinin yeniden ve aynı anda çalışmasına izin verecektir.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne - etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.
* ` webpageURL </ 0> String (isteğe bağlı) - Uygun bir uygulama yoksa tarayıcıya yüklenecek web sayfası yeniden başlatma aygıtına bağlı bir şema olmalıdır <code> http </ 0> veya <code> https </ 0></li>
</ul>

<p><code> NSUserActivity </ 0> (kodunu)oluşturarak onu etkin olarak ayarlar. Diğer cihazlara yönelik bu etkinliği <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html">Handoff</a> seçebilirsiniz.</p>

<h3><code>app.getCurrentActivityType()` *macOS*</h3> 
  Döndür ` Dizgi </ 0> - Halen çalışan etkinliğin türü.</p>

<h3><code>app.invalidateCurrentActivity()` *macOS*</h3> 
  
  * `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
  
  Geçerli [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kullanıcı etkinliğini geçersiz kılar.
  
  ### `systemPapp.updateCurrentActivity(type, userInfo)` *macOS*
  
  * `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
  * `userInfo` nesne - etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.
  
  Türü `type` ile eşleşiyorsa geçerli etkinliği günceller, y`userInfo`'den girişleri geçerli `userInfo` sözlüğe birleştirir.
  
  ### `app.setAppUserModelId(id)` *Windows*
  
  * `kimlik` dizesi
  
  Daha fazla bilgi için [Windows Dokümanlarına](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) bakın.
  
  ### ` app.importCertificate (seçenekler, geri arama) </ 0> <em> LINUX </ 1></h3>

<ul>
<li><code>seçenekler` Nesne 
  
  * `sertifika` Dize - pkcs12 dosyasının yolunu girin.
  * `şifre` Dize - sertifika için parola.</li> 
  
  * `geri aramak` Function 
    * `sonuç` Tamsayı - sonuç alma</ul> 
  
  Sertifika pkcs12 formatında platform sertifika deposuna kaydedilir. `callback` içe aktarma işlemi `result` ile çağırılır. `` değeri çalıştığını gösterirken herhangi başka bir değer kroma göre başarısızlığı gösterir. [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
  
  ### `app.disableHardwareAcceleration()`
  
  Mevcut uygulama için donanımsal hızlandırmayı iptal eder.
  
  Bu metod sadece uygulama hazır olmadan önce çağırılabilir.
  
  ### `app.disableDomainBlockingFor3DAPIs()`
  
  Varsayılan olarak Chromium, GPU işlemleri çok sık çökerse, her etki alanı için yeniden başlatılıncaya kadar 3D API'leri (ör. WebGL) devre dışı bırakır. Bu işlev, bu davranışı devre dışı bırakır.
  
  Bu metod sadece uygulama hazır olmadan önce çağırılabilir.
  
  ### `app.getAppMetrics( )`
  
  Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.
  
  ### `app.getGPUFeatureStatus()`
  
  ` GPU Özellik Durumu'nu döndürür</ 0> - Grafik Özellik Durumu <code> chrome: //gpu/`döndürür.</p> 
  
  ### `app.setBadgeCount(count)<0><em>Linux</em><em>macOS</em></h3>

<ul>
<li><code>sayı` tam sayı</li> </ul> 
  
  `Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.
  
  Sayaç rozet sayısı `` olarak ayarlandığında uygulama için geçerli ayarlar rozeti gizler.
  
  MacOS'ta rıhtım simgesinin üzerinde gösterilir. Linux'ta sadece Birlik başlatıcısı için çalışır,
  
  **Not:** Birlik Başlatıcısı çalışması için `. Masaüstü dosyasının olması gerekir. Daha fazla bilgi için lütfen <a href="../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux"> masaüstü ortamı entegrasyonu bölümünü okuyun</a>.</p>

<h3><code>app.getBadgeCount()`Linux</em>*macOS*</h3> 
  
  Karşı rozette görüntülenen geçerli değer, `Tamsayı` Döndürür.
  
  ### `app.isUnityRunning()`*Linux*
  
  Geçerli masaüstü ortamı birlik başlatıcısı olup olmadığını `Boole değerine ` döndürür.
  
  ### `app.getloginItemSettings([options])`*macOS**Windows*
  
  * `seçenekler` Obje (opsiyonel) 
    * `yol`Dize(isteğe bağlı)*Windows* - karşılaştırmak için yürütebilir dosya yolu. Varsayılan olarak `process.execPath`.
    * `args` String [] (isteğe bağlı) *Windows<1> - karşılaştırılacak komut satırı değişkenleri karşısında. Varsayılan olarak boş bir dizi.</li> </ul></li> </ul> 
      
      ` app.setLoginItemSettings öğesine <code> yol ve <code> args seçenekleri sağladıysanız, siz doğru olarak ayarlanması için <code> openAtLogin için aynı bağımsız değişkenleri buraya iletmeniz gerekir.</p>

<p><code>Object` 'i geri getirir:
      
      * ` openAtLogin` Boole Değeri uygulama giriş yaparken açılırsa `doğru` olur.
      * `openAsHidden` Boolean *macOS* - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
      * `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
      * `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Bu, uygulamanın başlangıçta hiçbir pencereyi açmaması gerektiğini gösterir. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
      * `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Bu, uygulama, uygulamanın son başlatılışında açık olan pencereleri geri yükleme kapalı. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
      
      ### `app.setLoginItemSettings(settings)` *macOS* *Windows*
      
      * `ayarlar` Nesne 
        * `openAtLogin` Boolean (isteğe bağlı) oturum açmak ve uygulamayı açmak için `doğru,` kaldırmak içinse `yanlış`. Bir giriş öğesi olarak uygulanır. Varsayılan olarak `yanlış`.
        * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Varsayılan olarak değer `false`. Kullanıcı bu ayarı Sistem Tercihleri'nden düzenleyebilir, böylece `app.getLoginItemStatus (). WasOpenedAsHidden` uygulaması kontrol edildiğinde denetlenip mevcut değeri bilmek için açılır. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
        * ` yolu` Dizi (isteğe bağlı) * Windows* Giriş sırasında başlatılacak yürütülebilir dosya. Varsayılan değer `process.execPath`.
        * `Yolu` Dizi [] (isteğe bağlı) *Windows* dosya geçmek için komut satırı değişkenleri yürütülebilir. Varsayılan olarak boş bir dizi. Yolları sarmaya tırnak işareti ile dikkat edin.
      
      Uygulamanın giriş seçeneklerini ayarlayın.
      
      [Sincap](https://github.com/Squirrel/Squirrel.Windows) kullanan Windows'ta Elektronlar `otomatik Güncelleştiri` ile çalışmak için, Update.exe için başlatma yolunu ayarlamak ve uygulamanızı belirten argümanları aktarmak isteyecektir. Örneğin:
      
      ```javascript
      const appFolder = path.dirname(process.execPath)
      const updateExe = path.resolve(appFolder, '..', 'Update.exe')
      const exeName = path.basename(process.execPath)
      
        app.setLoginItemSettings({
        openAtLogin: true,
        path: updateExe,
        args: [
          '--processStart', `"${exeName}"`,
          '--process-start-args', `"--hidden"`
        ]
      })
      ```
      
      ### `app.isAccessibilitySupportEnabled()<0> <em>macOS<em><1>Windows</em></h3>

<p><code>Boole Değeri<code> Chrome'un erişilebilirlik desteği etkinse <code>doğru` aksi halde yanlışa</code> çevirir. Bu API, `doğru` değerini geri döndürür. Yardımcı ekran okuyucuları gibi teknolojiler tespit edilir. Daha detaylar bilgi görmek için https://www.chromium.org/developers/design-documents/accessibility.</p> 
      
      ### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*
      
      * Mantıksal `enabled` [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) görüntülemeyi etkinleştirir veya devre dışı bırakır
      
      Manuel olarak Chrome'un erişilebilirlik desteğini etkinleştirir, erişilebilirlik anahtarını uygulama ayarlarındaki kullanıcılara göstermesine izin verir. daha fazla bilgi için https://www.chromium.org/developers/design-documents/accessibility. Varsayılan: Devre dışı.
      
      **Note:** render erişilebilirlik ağacı uygulamanızın performansını önemli ölçüde etkileyebilir. Varsayılan olarak etkinleştirilmemelidir.<0>.
      
      ### `app.setAboutPanelOptions(ayarlar)` *macOS*
      
      * `seçenekler` Nesne 
        * ` applicationName` Dizi (isteğe bağlı) - Uygulamanın adı.
        * `applicationVersion` String (seçeneğe bağlı) - Uygulamanın sürümü.
        * `copyright` String (seçilebilir) - telif bilgisi.
        * `credits` Dize (isteğe bağlı) - Kredi bilgileri.
        * `version` Dize (İsteğe Bağlı) - Uygulamanın versiyon numarasını oluşturun.
      
      Panelle ilgili seçenekleri ayarlayın. Bu uygulamanın `.plist` dosyasında belirlenen miktarları geçersiz kılacaktır. Bakınız [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) daha fazla detay için.
      
      ### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*
      
      * `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.
      
      Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.
      
      ```js
      // Start accessing the file.
      const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
      // You can now access the file outside of the sandbox 
      stopAccessingSecurityScopedResource()
      ```
      
      Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.
      
      ### `app.commandLine.appendSwitch(switch[, value])`
      
      * `switch` String - Bir komut satırı anahtarı
      * `value` String (optional) - Verilen anahtarda bir değer
      
      Chromium komut satırına bir anahtar ekleyin (isteğe bağlı `değer`).
      
      **Note:** `process.argv`'ı etkilemez ve esas geliştiriciler tarafından düşük seviyeli bazı Krom hareketlerini kontrol etmek için kullanılır.
      
      ### `app.commandLine.appendArgument(value)`
      
      * `value` String - Komut satırına eklenecek argüman
      
      Chromium'un komut satırına bağımsız bir değişken ekleyin. Argüman doğru şekilde alıntılanacaktır.
      
      **Note:** bu etkilenmeyecek `process.argv`.
      
      ### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*
      
      Uygulamada karışık kum havuzu modunu etkinleştirmektedir.
      
      Bu metod sadece uygulama hazır olmadan önce çağırılabilir.
      
      ### `app.isInApplicationsFolder()` *macOS*
      
      Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`
      
      ### `app.moveToApplicationsFolder()` *macOS*
      
      Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.
      
      Kullanıcının [`dialog`](dialog.md) API kullanarak yapmış olduğunuz işlemi onaylamasını istiyorsanız, onay kutusu varsayılan olarak gösterilmeyecektir.
      
      **NOTE:** Bu yöntem, kullanıcı haricindeki bir şeyin başarısız olmasına neden olursa hatalar atar. Örneğin, kullanıcı yetkilendirme iletişim kutusunu iptal ederse, bu yöntem hata verir. Eğer kopyayı gerçekleştiremezsek bu yöntem bir hata verecektir. Hata mesajı bilgilendirici olmalı ve neyin yanlış gittiğini size söylemeli
      
      ### `app.dock.bounce([type])` *macOS*
      
      * `type` Dize (İsteğe bağlı) - `critical` veya `informational` olabilir. Varsayılan değer `informational`
      
      `critical` geçildiğinde, dock simgesi uygulama aktifleşinceye veya istek iptal edilene kadar sıçrar.
      
      `informational` geçildiğinde, dock simgesi bir saniyeliğine sıçrar. Ancak, uygulamaya ya aktif hale gelir ya da istek iptal olana kadar talep etkin kalır.
      
      Returns `Integer` isteği temsil eden bir kimlik.
      
      ### `app.dock.cancelBounce(id)` *macOS*
      
      * `id` tamsayı
      
      `id` sıçramasını iptal et.
      
      ### `app.dock.downloadFinished(filePath)` *macOS*
      
      * `filePath` Dizi
      
      FilePath, İndirilenler klasörünün içindeyse İndirme yığınla geri döner.
      
      ### `app.dock.setBadge(text)` *macOS*
      
      * `text` String
      
      Dock'un rozetleme alanında gösterilecek satırı ayarlar.
      
      ### `app.dock.getBadge()` *macOS*
      
      `String` geri getirir - dock'un işaret dizisi.
      
      ### `app.dock.hide()` *macOS*
      
      Dock simgesini gizler.
      
      ### `app.dock.show()` *macOS*
      
      Dock simgesini gösterir.
      
      ### `app.dock.isVisible()` *macOS*
      
      `Boolean` 'ı geri getirir - dock işareti görünür olduğunda. `app.dock.show()` araması eş zamanlı değil bu sebeple bu yöntem aramadan sonra hemen doğruya döndürmeyebilir.
      
      ### `app.dock.setMenu(menu)` *macOS*
      
      * `menu` [Menü](menu.md)
      
      Uygulamanın [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103) 'sünü ayarlar.
      
      ### `app.dock.setIcon(image)` *macOS*
      
      * `image` ([NativeImage](native-image.md) | String)
      
      Dock simgesiyle ilişkilendirilmiş `image` 'ı ayarlar.
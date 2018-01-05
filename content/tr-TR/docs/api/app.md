# app

> Uygulamanızın etkinlik ömrünü kontrol edin.

Süreç: [Ana](../glossary.md#main-process)

Aşağıdaki örnek, son pencere kapatıldığı zaman uygulamadan nasıl çıkılacağını göstermektedir:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Olaylar

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

* `olay` Olay

Uygulama pencerelerini kapatmaya başlamadan önce ortaya çıkar. `event.preventDefault()` öğesini çağırmak, uygulamayı sonlandıran varsayılan davranışı engelleyecektir.

**Not:**Uygulama bırakma işlemi`autoUpdater.quitAndInstall()` tarafından başlatılmışsa, tüm pencerelerde `kapanış` olayını yayan</em> sonra* yayınlanır ve kapanır.</p> 

### Etkinlik: 'çıkış-yapılacak'

Dönüşler:

* `olay` Olay

Tüm pencereler kapatıldığında ve uygulamadan çıkıldığında ortaya çıkar. `event.preventDefault()` öğesini çağırmak, uygulamayı sonlandıran varsayılan davranışı engelleyecektir.

Arasındaki farklar için `tüm-pencereler-kapalı` olayının açıklamasına bakın `will-quit` ve `tüm-pencereler-kapalı` olayları.

### Etkinlik: 'çıkış'

Dönüşler:

* `olay` Olay
* `exitCode` Integer

Uygulama kesildiğinde ortaya çıkar.

### Etkinlik: 'open-file' *macOS*

Dönüşler:

* `olay` Olay
* dizi `yolu`

Kullanıcı uygulama ile bir dosya açmak istediğinde ortaya çıkar. `open-file` olayı genellikle uygulama zaten açık olduğunda ve OS dosyayı açmak için uygulamayı tekrar kullanmak istediğinde yayınlanır. Dock'a bir dosya düştüğünde ve uygulama henüz çalışmadığında da `open-file` yayınlanır. Bu olayı işlemek için (`hazır` olayı yayından önce bile olsa), uygulamanın başlangıç ​​işleminin çok erken bir aşamasında `açık dosya` olayını dinlediğinizden emin olun.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Windows'ta, dosya yolunu almak için (ana süreçte) `process.argv` ayrıştırmanız gerekir.

### Olay: 'open-url' *macOS*

Dönüşler:

* `olay` Olay
* `url` Dize

Kullanıcı uygulama ile bir url açmak istediğinde ortaya çıkar. Uygulamanızın `Info.plist` dosyası, `CFBundleURLTypes` anahtarının içinde url düzenini tanımlamalı ve `NSPrincipalClass` 'ı `AtomApplication` olarak ayarlamalıdır.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

### Event: 'activate' *macOS*

Dönüşler:

* `olay` Olay
* `hasVisibleWindows` Boolean

Uygulama etkinleştirildiğinde ortaya çıkar. Uygulamayı ilk kez başlatmak, uygulamayı zaten çalıştırırken yeniden başlatmaya çalışmak veya uygulamanın yükleme istasyonu veya görev çubuğu simgesini tıklatmak gibi çeşitli eylemler bu olayı tetikleyebilir.

### Olay: 'continue-activity' *macOS*

Dönüşler:

* `olay` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` Object - Etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.

Farklı bir cihazdan bir etkinlik sürdürmek istediğinde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sırasında ortaya çıkar. Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Bir kullanıcı etkinliği yalnızca, etkinliğin kaynak uygulamasıyla aynı geliştirici Ekip ID'si olan ve etkinliğin türünü destekleyen bir uygulamada devam edilebilir. Desteklenen etkinlik türleri, uygulamanın `Info.plist` öğesinde `NSUserActivityTypes` anahtarının altında belirtilir.

### Olay: 'new-window-for-tab' *macOS*

Dönüşler:

* `olay` Olay

Kullanıcı yerel macOS yeni sekme düğmesini tıklattığında ortaya çıkar. Yeni sekme düğmesi, yalnızca geçerli `BrowserWindow` öğesinin bir `tabbingIdentifier`'ı varsa görünür olur

### Olay: 'browser-window-blur'

Dönüşler:

* `olay` Olay
* `window` BrowserWindow

Bir [borwserWindow](browser-window.md) bulanıklaştığında ortaya çıkar.

### Olay: 'tarayıcı-pencere-odak'

Dönüşler:

* `olay` Olay
* `window` BrowserWindow

Bir [borwserWindow](browser-window.md)'a odaklanıldığında ortaya çıkar.

### Event: 'browser-window-created'

Dönüşler:

* `olay` Olay
* `window` BrowserWindow

Yeni bir [borwserWindow](browser-window.md) oluşturulduğunda ortaya çıkar.

### Event: 'web-contents-created'

Dönüşler:

* `olay` Olay
* `webContents` WebContents

Yeni bir [webContents](web-contents.md) oluşturulduğunda ortaya çıkar.

### Event: 'certificate-error'

Dönüşler:

* `olay` Olay
* `webContents` [WebContents](web-contents.md)
* `url` Dize
* `error` String - The error code
* `certificate` [Certificate](structures/certificate.md)
* `callback` Fonksiyon 
  * `isTrusted` Boolean - Whether to consider the certificate as trusted

Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.preventDefault()` and call `callback(true)`.

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

* `olay` Olay
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Fonksiyon 
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emitted when a client certificate is requested.

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

* `olay` Olay
* `webContents` [WebContents](web-contents.md)
* `istek` Nesne 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Nesne 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Fonksiyon 
  * `username` String
  * `password` String

Emitted when `webContents` wants to do basic auth.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Olay: 'gpu-process-crashed' 

Dönüşler:

* `olay` Olay
* `killed` Boolean

Emitted when the gpu process crashes or is killed.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Dönüşler:

* `olay` Olay
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. Bu olay, ekran okuyucuları gibi yardımcı teknolojilerin etkinleştirilmesi veya devre dışı bırakılmasında tetiklenir. See https://www.chromium.org/developers/design-documents/accessibility for more details.

## Metodlar

`app` nesnesi aşağıdaki metodlara sahiptir:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

### `app.quit()`

Tüm pencereleri kapatmayı dener. İlk olarak `before-quit` olayı yayılacaktır. Eğer tüm pencereler başarıyla kapatılırsa, `will-quit` olayı yayılacaktır ve varsayılan olarak uygulama sonlandırılacaktır.

Bu metod tüm `beforeunload` ve `unload` olayları işleyicilerinin düzgün şekilde yürütüleceğini garanti eder. Bir pencerenin `beforeunload` olay işleyicisine `false` dönütünü vererek, çıkışı iptal etmesi mümkündür.

### `app.exit([exitCode])`

* `exitCode` Tamsayı (Seçimli)

`exitCode` ile hemen çıkış yapar. `exitCode` varsayılan olarak 0 olur.

Tüm pencereler kullanıcıya sormadan hemen kapatılır, `before-quit` ve `will-quit` olayları yayılmaz.

### `app.relaunch([options])`

* `options` Obje (isteğe bağlı) 
  * `args` Dizgi[] - (Seçimli)
  * `execPath` Dizgi (Seçimli)

Yürürlükteki oluşum tamamlandığında uygulamayı yeniden başlatır (relaunch).

Varsayılan olarak yeni oluşum, yürürlükteki oluşumun çalışmakta olduğu aynı dizin ve komut satırı değişkenlerini kullanır. `args` belirtildiğinde, `args` komut satırı değişkenlerinin yerini alır. `execPath` belirtildiğinde, yeniden başlatma yürürlükteki uygulama yerine `execPath` için uygulanır.

Bu metodun uygulandığında uygulamadan çıkış yapmadığını unutmayın, uygulamayı yeniden başlatmak (restart) için `app.relaunch`'u çağırdıktan sonra `app.quit`'i veya `app.exit`'ı çağırmanız mecburidir.

`app.relaunch` birden fazla kez çağırılırsa, yürürlükteki oluşum tamamlandıktan sonra, birden fazla oluşum başlatılır.

Yürürlükteki oluşumun yeniden başlatılmasının (restart) ve yeni oluşumuna yeni bir komut satırı değişkeni eklenmesinin bir örneği:

```javascript
const {app} = require('electron')

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

### `app.getPath(name)`

* `name` String

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
* `pepperFlashSystemPlugin` Pepper Flash eklentisinin sistemdeki versiyonuna giden dosya yolu.

### `app.getFileIcon(path[, options], callback)`

* `path` Dizi
* `ayarlar` Nesne (Seçimli) 
  * `boyut` Dizgi 
    * `küçük` - 16x16
    * `normal` - 32x32
    * `büyük` - *Linux'ta* 48x48, *Windows'ta*32x32, *macOS'de* desteklenmemektedir.
* `callback` Fonksiyon 
  * `error` Hata 
  * `icon` [NativeImage](native-image.md)

Bir dosya yolunun ilişkili ikonunu çeker.

*Windows*'ta 2 tip ikon bulunur:

* `.mp3`, `.png` v.b. gibi belirli dosya uzantıları ile ilişkilendirilmiş ikonlar
* `.exe`, `.dll`, `.ico` gibi, dosyanın kendi içindeki ikonlar

*Linux* ve *macOS* ikonlar, dosya mıme tipiyle ilişkilendirilen uygulamaya bağlıdır.

### `app.setPath(name, path)`

* `name` Dizgi
* `path` Dizgi

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

* `name` Satır

Mevcut uygulamanın ismini geçersiz kılar.

### `app.getLocale()`

Geçerli uygulama yerel ayarı - `String` döndürür. Olası dönüş değerleri belgelenmiştir [ Burada ](locales.md).

** Not:** Paketli uygulamanızı dağıtırken, aynı zamanda ` yerel ayarlar` klasörü nakledilir.

**Not:** Windows'ta `hazır` olaylar yayınlandıktan sonra çağırmanız gerekir.

### `app.addRecentDocument(yol)` *macOS* *Windows*

* `path` String

Son dokümanlar listesine `yol` ekler.

Bu liste OS tarafından yönetilmektedir. Windows'ta görev çubuğundan listeyi ziyaret edebilir ve macOS'ta dock menüsünden ziyaret edebilirsiniz.

### `app.clearRecentDocuments()` *macOS* *Windows*

Yakın zamandaki dokümentasyon listesini temizler.

### `app.setAsDefaultProtocolClient(protokol[, yol, args])` *macOS* *Windows*

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı: If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

Bu yöntem, geçerli yürütülebilir dosyayı bir protokol için varsayılan işleyici olarak ayarlar (aka URI düzeni). Uygulamanızı daha da derinleştirerek işletim sistemine entegre etmenizi sağlar. Once registered, all links with `your-protocol://` will be opened with the current executable. Protokol de dahil olmak üzere tüm bağlantı, uygulamanız bir parametre olarak geçilecek.

Windows'ta isteğe bağlı parametrelerin yolu, çalıştırılabilir dosyanızın yolu, ve argümanlar, çalıştırılabilir dosyaya başlatıldığında iletilecek argümanlar dizisi.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `yolu` Dize (isteğe bağlı) *Windows* - Varsayılan değer olarak `process.execPath`
* `args` Dizi [] (isteğe bağlı) *Windows* - Boş bir diziye varsayılan

`Boole Değeri` döndürür

Bu yöntem, geçerli yürütülebilir dosyanın bir protokol için varsayılan işleyici olup olmadığını kontrol eder (aka URI düzeni). Eğer öyleyse, doğru bulacaktır. Aksi takdirde, yanlışa döndürür.

**Not**: Mac işletim sisteminde, bu yöntemle uygulamanın başarılı olup olmadığını kontrol edebilirsiniz protokol için varsayılan protokol işleyicisi olarak kayıtlı. Ayrıca bunun için ` ~/Library/Preferences/com.apple.LaunchServices.plist` dosyasını kontrol ederek macOS makinede doğruyabilirsin. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

Returns `Object`:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Hiç bir şey yanlış gitmedi.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Herhangi bir girişim kaldırılmış bir öğeyi daha önce özel bir kategoriye yeniden eklemek, tüm özel kategorinin Jump Listesi'nden çıkarılması. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

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

* `callback` Fonksiyon 
  * `argv` String[] - An array of the second instance's command line arguments
  * `workingDirectory` String - The second instance's working directory

Returns `Boolean`.

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Genellikle uygulama, ana penceresinin odağını küçültecek ve odaklaştıracak şekilde yanıtlar.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

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

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.setAppUserModelId(id)` *Windows*

* `kimlik` dizesi

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `ayarlar` Nesne 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Fonksiyon 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Mevcut uygulama için donanımsal hızlandırmayı iptal eder.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.

### `app.getAppMemoryInfo()` *Kullanımdan Kaldırıldı*

Raporlar ` ProcessMetric []: Uygulamayla ilişkili tüm süreçlerin bellek ve cpu kullanım istatistiklerine karşılık gelen <code> İşlem Metrik nesnelerinin dizisi.
<strong>Not</strong> Bu yöntem kullanımı önerilmemektedir. Bunun yerine <code>app.getApp()` kullanmalısınız.</p> 

### `app.getAppMetrics( )`

Raporlar ` ProcessMetric []: Uygulamayla ilişkili tüm süreçlerin bellek ve cpu kullanım istatistiklerine karşılık gelen <code> İşlem Metrik nesnelerinin dizisi.</p>

<h3><code>app.getGpuFeatureStatus()`</h3> 

` GPU Özellik Durumu'nu döndürür</ 0> - Grafik Özellik Durumu <code> chrome: //gpu/`döndürür.</p> 

### `app.setBadgeCount(count)<0><em>Linux</em><em>macOS</em></h3>

<ul>
<li><code>sayı` tam sayı</li> </ul> 

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

Sayaç rozet sayısı `` olarak ayarlandığında uygulama için geçerli ayarlar rozeti gizler.

MacOS'ta rıhtım simgesinin üzerinde gösterilir. Linux'ta sadece Birlik başlatıcısı için çalışır,

**Not:** Birlik Başlatıcısı çalışması için `. Masaüstü dosyasının olması gerekir. Daha fazla bilgi için lütfen <a href="../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux"> masaüstü ortamı entegrasyonu bölümünü okuyun</a>.</p>

<h3><code>app.getBadgeCount()`Linux</em>*macOS*</h3> 

Karşı rozette görüntülenen geçerli değer, `Tamsayı` Döndürür.

### `app.isUnityRunning()`*Linux*

Geçerli masaüstü ortamı birlik başlatıcısı olup olmadığını `Boole değerine ` döndürür.

### `app.getloginItemSettings([options])`*macOS**Windows*

* `seçenekler` Nesne (isteğe bağlı) 
  * `yol`Dize(isteğe bağlı)*Windows* - karşılaştırmak için yürütebilir dosya yolu. Varsayılan olarak `process.execPath`.
  * `args` String [] (isteğe bağlı) *Windows<1> - karşılaştırılacak komut satırı değişkenleri karşısında. Varsayılan olarak boş bir dizi.</li> </ul></li> </ul> 
    
    ` app.setLoginItemSettings öğesine <code> yol ve <code> args seçenekleri sağladıysanız, siz doğru olarak ayarlanması için <code> openAtLogin için aynı bağımsız değişkenleri buraya iletmeniz gerekir.</p>

<p>İade <code>Nesne`:
    
    * ` openAtLogin` Boole Değeri uygulama giriş yaparken açılırsa `doğru` olur.
    * ` openAsHidden` Boole Değeri uygulama giriş yaparken gizli olarak açık olarak ayarlanırsa `doğru` olur. Bu ayar yalnızca macOS'ta desteklenir.
    * ` wasOpenedAtLogin` Boole Değeri uygulama girişte açılmışsa `doğru` otomatik olur. Bu ayar yalnızca macOS'ta desteklenir.
    * `wasOpenedAsHidden` Boole Değeri Eğer uygulama gizli bir giriş olarak açılmışsa `doğru` öğe. Bu, uygulamanın başlangıçta hiçbir pencereyi açmaması gerektiğini gösterir. Bu ayar yalnızca macOS'ta desteklenir.
    * ` restoreState` Boole değeri uygulama, bir oturum açma öğesi olarak açılmışsa `doğru` bir önceki oturumdan durumu geri getirmelidir. Bu, uygulama, uygulamanın son başlatılışında açık olan pencereleri geri yükleme kapalı. Bu ayar yalnızca macOS'ta desteklenir.
    
    ** Not:** Bu API'nin [MAS yapıları](../tutorial/mac-app-store-submission-guide.md) üzerinde bir etkisi yoktur.
    
    ### `app.setLoginItemSettings(settings)` *macOS* *Windows*
    
    * `ayarlar` Nesne 
      * `openAtLogin` Boolean (isteğe bağlı) oturum açmak ve uygulamayı açmak için `doğru,` kaldırmak içinse `yanlış`. Bir giriş öğesi olarak uygulanır. Varsayılan olarak `yanlış`.
      * `openAsHidden` Boolean (isteğe bağlı) `doğru` uygulamayı gizli olarak açmak için geçerlidir. Varsayılan olarak değer `false`. Kullanıcı bu ayarı Sistem Tercihleri'nden düzenleyebilir, böylece `app.getLoginItemStatus (). WasOpenedAsHidden` uygulaması kontrol edildiğinde denetlenip mevcut değeri bilmek için açılır. Bu ayar sadece macOS'de desteklenir.
      * ` yolu` Dizi (isteğe bağlı) * Windows* Giriş sırasında başlatılacak yürütülebilir dosya. Varsayılan değer `process.execPath`.
      * `Yolu` Dizi [] (isteğe bağlı) *Windows* dosya geçmek için komut satırı değişkenleri yürütülebilir. Varsayılan olarak boş bir dizi. Yolları sarmaya tırnak işareti ile dikkat edin.
    
    Uygulamanın giriş seçeneklerini ayarlayın.
    
    [Sincap](https://github.com/Squirrel/Squirrel.Windows) kullanan Windows'ta Elektronlar `otomatik Güncelleştiri` ile çalışmak için, Update.exe için başlatma yolunu ayarlamak ve uygulamanızı belirten argümanları aktarmak isteyecektir. Örnek verecek olursak:
    
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

** Not:** Bu API'nin [MAS yapıları](../tutorial/mac-app-store-submission-guide.md) üzerinde bir etkisi yoktur.

### `app.isAccessibilitySupportEnabled()<0> <em>macOS<em><1>Windows</em></h3>

<p><code>Boole Değeri<code> Chrome'un erişilebilirlik desteği etkinse <code>doğru` aksi halde yanlışa</code> çevirir. Bu API, `doğru` değerini geri döndürür. Yardımcı ekran okuyucuları gibi teknolojiler tespit edilir. Daha detaylar bilgi görmek için https://www.chromium.org/developers/design-documents/accessibility.</p> 

### `app.setAboutPanelOptions(ayarlar)` *macOS*

* `ayarlar` Nesne 
  * ` applicationName` Dizi (isteğe bağlı) - Uygulamanın adı.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Panelle ilgili seçenekleri ayarlayın. Bu uygulamanın `.plist` dosyasında belirlenen miktarları geçersiz kılacaktır. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Dock simgesini gizler.

### `app.dock.show()` *macOS*

Dock simgesini gösterir.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.
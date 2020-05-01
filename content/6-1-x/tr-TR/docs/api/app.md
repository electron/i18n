# uygulama

> Uygulamanızın olay yaşam döngüsünü kontrol edin.

İşlem: [Ana](../glossary.md#main-process)

Aşağıdaki örnek, son pencere kapatıldığında uygulamadan nasıl çıkılacağını göstermektedir:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Etkinlikler

`app` nesnesi aşağıdaki olaylarla ortaya çıkar:

### Olay: 'will-finish-launching'

Uygulama temel başlangıcını bitirdiği zaman ortaya çıkar. Windows ve Linux'ta, `bitiş başlatma` olayı, `hazır` etkinliği ile aynıdır; macOS'ta bu olay, `NSApplication` 'in `applicationWillFinishLaunching` bildirimini temsil eder. Genellikle, `açık dosya` ve `açık-url` olayları için dinleyicileri ayarlarsınız ve çökme muhabirini ve otomatik güncelleyiciyi başlatırsınız.

Genellikle `ready` event handler durumunda kullanmalısınız.

### Etkinlik: 'hazır'

Dönüşler:

* `launchInfo` Nesne _macOS_

Elektron başlatmayı bitirdiğinde ortaya çıkar. MacOS'ta, `launchInfo`, Bildirim Merkezi'nden başlatıldığı takdirde, uygulamayı açmak için kullanılan `NSUserNotification` öğesinin `kullanıcı bilgisi`'ni tutar. Bu etkinliğin zaten başlayıp başlamadığını kontrol etmek için `app.isReady()` 'i arayabilirsiniz.

### Olay: 'Tüm-pencereler-kapalı'

Tüm pencereler kapatıldığında ortaya çıkar.

Bu etkinliğe abone değilseniz ve tüm pencereler kapalıysa, varsayılan davranış, uygulamadan çıkmaktır; ancak, abone olursanız, uygulamanın sona erip ermeyeceğini kontrol edersiniz. Kullanıcı `Cmd + Q` tuşlarına basarsa veya geliştirici `app.quit()`'i çağırırsa, Electron önce tüm pencereleri kapatmaya ve ardından `will-quit` olayını yayınlamaya çalışacaktır ve bu durumda `Tüm-Pencereler-Kapalı` olayı yayınlanmayacaktır.

### Olay: 'çıkıştan-önce'

Dönüşler:

* `olay` Olay

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Etkinlik: 'çıkış-yapılacak'

Dönüşler:

* `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

Arasındaki farklar için `tüm-pencereler-kapalı` olayının açıklamasına bakın `will-quit` ve `tüm-pencereler-kapalı` olayları.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Etkinlik: 'çıkış'

Dönüşler:

* `event` Olay
* `çıkışKodu` Tamsayı

Uygulama kesildiğinde ortaya çıkar.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### Etkinlik: 'open-file' _macOS_

Dönüşler:

* `event` Olay
* dizi `yolu`

Kullanıcı uygulama ile bir dosya açmak istediğinde ortaya çıkar. `open-file` olayı genellikle uygulama zaten açık olduğunda ve OS dosyayı açmak için uygulamayı tekrar kullanmak istediğinde yayınlanır. Dock'a bir dosya düştüğünde ve uygulama henüz çalışmadığında da `open-file` yayınlanır. Bu olayı işlemek için (`hazır` olayı yayından önce bile olsa), uygulamanın başlangıç ​​işleminin çok erken bir aşamasında `açık dosya` olayını dinlediğinizden emin olun.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Windows'ta, dosya yolunu almak için (ana süreçte) `process.argv` ayrıştırmanız gerekir.

### Olay: 'open-url' _macOS_

Dönüşler:

* `event` Olay
* `url` Dize

Kullanıcı uygulama ile bir url açmak istediğinde ortaya çıkar. Uygulamanızın `Info.plist` dosyası, `CFBundleURLTypes` anahtarının içinde url düzenini tanımlamalı ve `NSPrincipalClass` 'ı `AtomApplication` olarak ayarlamalıdır.

Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

### Etkinlik: 'activate' _macOS_

Dönüşler:

* `event` Olay
* `hasVisibleWindows` Boolean

Uygulama etkinleştirildiğinde ortaya çıkar. Uygulamayı ilk kez başlatmak, uygulamayı zaten çalıştırırken yeniden başlatmaya çalışmak veya uygulamanın yükleme istasyonu veya görev çubuğu simgesini tıklatmak gibi çeşitli eylemler bu olayı tetikleyebilir.

### Olay: 'continue-activity' _macOS_

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` Object - Etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.

Farklı bir cihazdan bir etkinlik sürdürmek istediğinde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sırasında ortaya çıkar. Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

Bir kullanıcı etkinliği yalnızca, etkinliğin kaynak uygulamasıyla aynı geliştirici Ekip ID'si olan ve etkinliğin türünü destekleyen bir uygulamada devam edilebilir. Desteklenen etkinlik türleri, uygulamanın `Info.plist` öğesinde `NSUserActivityTypes` anahtarının altında belirtilir.

### Olay: 'will-continue-activity' _macOS_

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.

Farklı bir cihazdan gelen bir etkinlik yeniden başlatılmadan önce [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) o esnada ortaya çıkar. Bu olayla ilgilenmek isterseniz `event.preventDefault()`'i çağırmanız gerekir.

### Olay: 'continue-activity-error' _macOS_

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `error` dize - hatanın yerelleştirilmiş açıklamasına sahip bir dizedir.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) sırasında farklı bir cihazdaki bir etkinliğin başarısız olması durumunda ortaya çıkıyor.

### Etkinlk: 'activity-was-continued' _macOS_

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

Bu cihazdan bir etkinlik başarıyla yürütüldüğünde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) o sırada ortaya çıkıyor.

### Etkinlik: 'activate' _macOS_

Dönüşler:

* `event` Olay
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) başka bir cihazda yeniden başlatılmaya çalışıldığında yayınlanır. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Olay: 'new-window-for-tab' _macOS_

Dönüşler:

* `event` Etkinlik

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### Olay: 'browser-window-blur'

Dönüşler:

* `event` Olay
* `browserView` [BrowserView](browser-window.md)

Bir [borwserWindow](browser-window.md) bulanıklaştığında ortaya çıkar.

### Olay: 'tarayıcı-pencere-odak'

Dönüşler:

* `event` Olay
* `browserView` [BrowserView](browser-window.md)

Bir [borwserWindow](browser-window.md)'a odaklanıldığında ortaya çıkar.

### Etkinlik: 'tarayıcı-penceresi-yaratıldı'

Dönüşler:

* `event` Olay
* `browserView` [BrowserView](browser-window.md)

Yeni bir [borwserWindow](browser-window.md) oluşturulduğunda ortaya çıkar.

### Etkinlik: 'web-içerikleri-yaratıldı'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)

Yeni bir [webContents](web-contents.md) oluşturulduğunda ortaya çıkar.

### Etkinlik: 'sertifika-hatası'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `url` Dize
* `error` Dizi - Hata Kodu
* `certificate` [sertifika](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Sertifikanın güvenilir olup olmadığını göz önünde bulundur

Çıkarıldığında `url` için `certificate` doğrulama hatası oluştu, sertifikaya güvenmek için temel davranışın oluşmasını `event.preventDefault()` ile engelleyin ve `callback(true)` arayın.

```javascript
const { app } = require('electron')

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

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `url` URL
* `certificateList` [Sertifika[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Sertifika](structures/certificate.md) (isteğe bağlı)

Bir istemci sertifikası talep edildiğinde yayılır.

`url`, istemci sertifikasını isteyen gezinme girişine karşılık gelir ve listeden filtrelenmiş bir girdi ile `callback` çağrılabilir. `event.preventDefault()` öğesinin kullanılması, uygulamanın mağazadaki ilk sertifikayı kullanmasını engeller.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Etkinlik: 'giriş'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `request` Object
  * `method` Dizi
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` Dizi
  * `port` Tamsayı
  * `realm` Dizi
* `callback` Function
  * `username` Dizi
  * `password` Dizi

`webContents` temel doğrulama yapmak istediğinde çıkarılır.

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

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

### Event: 'renderer-process-crashed'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Etkinlik: 'erişilebilir-destek-değişti' _macOS_ _Windows_

Dönüşler:

* `event` Olay
* `accessibilitySupportEnabled` Boolean - `true` Chrome'un ulaşılabilirlik desteği etkinken, o zaman `false`.

Chrome'un erişilebilirlik takviyesi değiştiğinde ortaya çıkar. Bu olay, ekran okuyucuları gibi yardımcı teknolojilerin etkinleştirilmesi veya devre dışı bırakılmasında tetiklenir. Daha detaylı bilgi için https://www.chromium.org/developers/design-documents/accessibility ziyaret edin.

### Event: 'session-created'

Dönüşler:

* `session` [Session](session.md)

Emitted when Electron has created a new `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Dönüşler:

* `event` Olay
* `argv` Dizi[] - İkinci aşamanın komuta satırı argümanları sırası
* `workingDirectory` Dizi - İkinci aşamanın çalışma dizini

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Genellikle uygulama, ana penceresinin odağını küçültecek ve odaklaştıracak şekilde yanıtlar.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-global'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-builtin'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-window'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Dönüşler:

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

## Metodlar

`app` nesnesi aşağıdaki metodlara sahiptir:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

### `app.quit()`

Tüm pencereleri kapatmayı dener. İlk olarak `before-quit` olayı yayılacaktır. Eğer tüm pencereler başarıyla kapatılırsa, `will-quit` olayı yayılacaktır ve varsayılan olarak uygulama sonlandırılacaktır.

Bu metod tüm `beforeunload` ve `unload` olayları işleyicilerinin düzgün şekilde yürütüleceğini garanti eder. Bir pencerenin `beforeunload` olay işleyicisine `false` dönütünü vererek, çıkışı iptal etmesi mümkündür.

### `app.exit([exitCode])`

* `exitCode` Tamsayı (Seçimli)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (optional)
  * `execPath` Dizgi (Seçimli)

Yürürlükteki oluşum tamamlandığında uygulamayı yeniden başlatır (relaunch).

Varsayılan olarak, yeni örnek aynı çalışma dizinini ve hali hazırdaki örneğin komut satırı argümanlarını kullanacaktır. `args` belirtildiğinde, `args` komut satırı değişkenlerinin yerini alır. `execPath` belirtildiğinde, yeniden başlatma yürürlükteki uygulama yerine `execPath` için uygulanır.

Bu metodun uygulandığında uygulamadan çıkış yapmadığını unutmayın, uygulamayı yeniden başlatmak (restart) için `app.relaunch`'u çağırdıktan sonra `app.quit`'i veya `app.exit`'ı çağırmanız mecburidir.

`app.relaunch` birden fazla kez çağırılırsa, yürürlükteki oluşum tamamlandıktan sonra, birden fazla oluşum başlatılır.

Yürürlükteki oluşumun yeniden başlatılmasının (restart) ve yeni oluşumuna yeni bir komut satırı değişkeni eklenmesinin bir örneği:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Eğer Electron sıfırlamayı tamamladıysa `Boolean` - `true` dönütünü, tamamlamadıysa `false` dönütünü verir.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Tüm uygulama pencerelerini simge durumuna küçültmeden gizler.

### `app.show()` _macOS_

Gizlendikten sonra uygulama pencerelerini gösterir. Onkarı kendiliğinden odaklamaz.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

`String` - olarak yürürlükteki uygulama dizini dönütünü verir.

### `app.getPath(isim)`

* `name` Dizi

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

Aşağıdaki yolları isimleriyle talep edebilirsiniz:

* `home` Kullanıcının ana dizgini.
* `appData` Per-user application data directory, which by default points to:
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
* `options` Object (optional)
  * `size` String
    * `küçük` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * `error` Error
  * `icon` [DoğalGörüntü](native-image.md)

Bir dosya yolunun ilişkili ikonunu çeker.

On _Windows_, there are 2 kinds of icons:

* `.mp3`, `.png` v.b. gibi belirli dosya uzantıları ile ilişkilendirilmiş ikonlar
* `.exe`, `.dll`, `.ico` gibi, dosyanın kendi içindeki ikonlar

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* dizi `yolu`
* `options` Object (optional)
  * `size` String
    * `küçük` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Bir dosya yolunun ilişkili ikonunu çeker.

_Windows_'ta 2 tip ikon bulunur:

* `.mp3`, `.png` v.b. gibi belirli dosya uzantıları ile ilişkilendirilmiş ikonlar
* `.exe`, `.dll`, `.ico` gibi, dosyanın kendi içindeki ikonlar

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(isim, yol)`

* `name` Dizi
* dizi `yolu`

`name` ile ilişkilendirilen özel bir dizine veya dosyaya giden dosya yolunu (`path`) baştan tanımlar. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

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

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

** Not:** Paketli uygulamanızı dağıtırken, aynı zamanda ` yerel ayarlar` klasörü nakledilir.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(yol)` _macOS_ _Windows_

* dizi `yolu`

Son dokümanlar listesine `yol` ekler.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Yakın zamandaki dokümentasyon listesini temizler.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı: Uygulamanızın `electron://` bağlantılarını işlemesini isterseniz, bu yöntemi parametre olarak `electron` ile çağırın.
* `path` Dizi (isteğe bağlı) _Windows_ - Varsayılana çevirir `process.execPath`
* `args` Dizi[] (isteğe bağlı) _Windows_ - Boş düzeni varsayılana ayarlar

`Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.

Bu yöntem, geçerli yürütülebilir dosyayı bir protokol için varsayılan işleyici olarak ayarlar (aka URI düzeni). Uygulamanızı daha da derinleştirerek işletim sistemine entegre etmenizi sağlar. Kayıt olduktan sonra, `your-protocol://` adresine sahip tüm bağlantılar, ile açılır. Geçerli yürütülebilir. Protokol de dahil olmak üzere tüm bağlantı, uygulamanız bir parametre olarak geçilecek.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Not**: MacOS üzerinde sadece senin app `info.plist`. eklenen protokolleri kaydedebilirsiniz. Uygulamanız çalışma zamanında değiştirilemez. Bununla birlikte oluşturma süresi boyunca dosyayı basit bir metin düzenleyicisi veya komut dosyası ile değiştirin. Ayrıntılar için [Apple'ın belgelerine](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) bakın.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

API dahili olarak Windows Kayıt Defteri ve LSSetDefaultHandlerForURLScheme kullanır.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `path` Dizi (isteğe bağlı) _Windows_ - Varsayılana çevirir `process.execPath`
* `args` Dizi[] (isteğe bağlı) _Windows_ - Boş düzeni varsayılana ayarlar

`Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* 71/5000 `protokol` String - `://` olmadan protokolünüzün adı:
* `path` Dizi (isteğe bağlı) _Windows_ - Varsayılana çevirir `process.execPath`
* `args` Dizi[] (isteğe bağlı) _Windows_ - Boş düzeni varsayılana ayarlar

`Boole Değeri` döndürür

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Not**: Mac işletim sisteminde, bu yöntemle uygulamanın başarılı olup olmadığını kontrol edebilirsiniz protokol için varsayılan protokol işleyicisi olarak kayıtlı. Ayrıca bunun için ` ~/Library/Preferences/com.apple.LaunchServices.plist` dosyasını kontrol ederek macOS makinede doğruyabilirsin. Bakınız [Apple'ın belgeleri](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) Ayrıntılar için.

API dahili olarak Windows Kayıt Defteri ve LSCopyDefaultHandlerForURLScheme kullanır.

### `app.setUserTasks(tasks)` _Windows_

* `görevler<code> <a href="structures/task.md">Görev []</a> - <0>Görev` nesnelerinin dizisi

Windows'taki `tasks` kategorisini JumpList'teki [Görevler](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) kategorisine ekler.

`tasks`, [`görevler`](structures/task.md) nesenelerinin bir sırasıdır.

`Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.

**Not:** Eğer Jump List'i daha da çok özelleştirmek istiyorsanız yerine `app.setJumpList(categories)` kullanın.

### `app.getJumpListSettings()` _Windows_

`Object` 'i geri getirir:

* `minItems` Tamsayı - Listede gösterilecek minimum öğe sayısı Atlama Listesi (bu değerin daha ayrıntılı bir açıklaması için bkz. [MSDN dokümanları](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ile eşleşen `JumpListItem` nesnelerinin dizisi kullanıcının belirli kategorilerden açıkça kaldırdığı öğelerin atlama listesidir. Bu öğeler, **sonraki** Atlama Listesine tekrar eklenemez `app.set JumpList()` öğesini çağırın. Herhangi bir özel kategoriden kaldırılan öğelerden herhangi birini içeren windows görüntülenmez.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListKategorileri[]](structures/jump-list-category.md) ya da `null` - `JumpListCategory` nesnelerinin sırası.

Uygulama için özel bir Atlama Listesi'ni ayarlar veya kaldırır ve aşağıdaki dizelerden birini geri döndürür:

* `ok` - Hiç bir şey yanlış gitmedi.
* `error` - Bir ya da birden fazla hata meydana geldi, muhtemel sebebi anlamak için çalışma zamanı günlüğünü etkinleştirin.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - Jump List'e uygulamanın kaldıramayacağı bir dosya bağlantısıyla dosya tipinin gönderilme girişimi.
* `customCategoryAccessDeniedError` - Özel kategoriler Jump List'e kullanıcı gizliliği ve grup ilkesi ayarları gereğince eklenemez.

`kategorileri` `boş` ise, önceden ayarlanmış Özel Geçiş Listesi (varsa) olacaktır. yerine uygulama için standart Git Listesi (Windows tarafından yönetilen) değiştirildi.

**Not:** Eğer bir `JumpListCategory` nesnesinin ne `type` ne de `name` özelliği ayarlanmamışsa `type` ının `tasks` olduğu varsayılır. Eğer `name` özelliği ayarlanmış fakat `type` göz ardı edilmişse yine `type` ın `custom` olduğu varsayılır.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Herhangi bir girişim öğesi kaldırılmış, daha önce özel bir kategoriye yeniden eklemek, tüm özel kategorinin Jump Listesi'nden çıkarılmasıdır. Bu kaldırılan öğelerin listesini `app.getJumpListSettings()`. kullanarak elde edebilirsiniz.

Aşağıda özel bir Atlama Listesi oluşturmanın basit bir örneği verilmiştir:

```javascript
const { app } = require('electron')

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

### `app.requestSingleInstanceLock()`

`Boole Değeri` döndürür

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

İkinci bir örnek başladığında, birincil örnek penceresi harekete geçirme örneği:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

`Boole Değeri` döndürür

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne - etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

` NSUserActivity </ 0> (kodunu)oluşturarak onu etkin olarak ayarlar. Diğer cihazlara yönelik bu etkinliği <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html">Handoff</a> seçebilirsiniz.</p>

<h3 spaces-before="0"><code>app.getCurrentActivityType()` _macOS_</h3>

Döndür ` Dizgi </ 0> - Halen çalışan etkinliğin türü.</p>

<h3 spaces-before="0"><code>app.invalidateCurrentActivity()` _macOS_</h3>

* `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.

Geçerli [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) kullanıcı etkinliğini geçersiz kılar.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` Dizi - Faaliyeti benzersiz bir şekilde tanımlar. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne - etkinlik tarafından başka bir aygıta depolanmış uygulamaya özel durum içerir.

Türü `type` ile eşleşiyorsa geçerli etkinliği günceller, y`userInfo`'den girişleri geçerli `userInfo` sözlüğe birleştirir.

### `app.setAppUserModelId(id)` _Windows_

* `kimlik` dizesi

Daha fazla bilgi için [Windows Dokümanlarına](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) bakın.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `sertifika` Dize - pkcs12 dosyasının yolunu girin.
  * `şifre` Dize - sertifika için parola.
* `callback` Function
  * `sonuç` Tamsayı - sonuç alma

Sertifika pkcs12 formatında platform sertifika deposuna kaydedilir. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Mevcut uygulama için donanımsal hızlandırmayı iptal eder.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.

### `app.getAppMetrics( )`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

` GPU Özellik Durumu'nu döndürür</ 0> - Grafik Özellik Durumu <code> chrome: //gpu/`döndürür.</p> 



### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:


```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```


Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.



### `app.setBadgeCount(count)` _Linux_ _macOS_

* `sayı` tam sayı

`Boolean` 'ı geri getirir - Çağrı başarılı olduğunda.

Sayaç rozet sayısı `0` olarak ayarlandığında uygulama için geçerli ayarlar rozeti gizler.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).



### `app.getBadgeCount()` _Linux_ _macOS_

Karşı rozette görüntülenen geçerli değer, `Tamsayı` Döndürür.



### `app.isUnityRunning()` _Linux_

Geçerli masaüstü ortamı birlik başlatıcısı olup olmadığını `Boole değerine ` döndürür.



### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional) 
    * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

`Object` 'i geri getirir:

* ` openAtLogin` Boole Değeri uygulama giriş yaparken açılırsa `doğru` olur.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. Bu, uygulamanın başlangıçta hiçbir pencereyi açmaması gerektiğini gösterir. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. Bu, uygulama, uygulamanın son başlatılışında açık olan pencereleri geri yükleme kapalı. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).



### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object 
    * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Varsayılanı `false` olarak belirler.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Varsayılan olarak değer `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Uygulamanın giriş seçeneklerini ayarlayın.

[Sincap](https://github.com/Squirrel/Squirrel.Windows) kullanan Windows'ta Elektronlar `otomatik Güncelleştiri` ile çalışmak için, Update.exe için başlatma yolunu ayarlamak ve uygulamanızı belirten argümanları aktarmak isteyecektir. Örneğin:



``` javascript
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




### `app.isAccessibilitySupportEnabled()<0> <em x-id="4">macOS<em x-id="4"><1>Windows</em></h3>

<p spaces-before="0"><code>Boole Değeri<code> Chrome'un erişilebilirlik desteği etkinse <code>doğru` aksi halde yanlışa</code> çevirir. Bu API, `doğru` değerini geri döndürür. Yardımcı ekran okuyucuları gibi teknolojiler tespit edilir. Daha detaylar bilgi görmek için https://www.chromium.org/developers/design-documents/accessibility.</p> 

**[Deprecated Soon](modernization/property-updates.md)**



### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* Mantıksal `enabled` [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) görüntülemeyi etkinleştirir veya devre dışı bırakır

Manuel olarak Chrome'un erişilebilirlik desteğini etkinleştirir, erişilebilirlik anahtarını uygulama ayarlarındaki kullanıcılara göstermesine izin verir. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Varsayılan: Devre dışı.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**



### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.



### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object 
    * ` applicationName` Dizi (isteğe bağlı) - Uygulamanın adı.
  * `applicationVersion` String (seçeneğe bağlı) - Uygulamanın sürümü.
  * `copyright` String (seçilebilir) - telif bilgisi.
  * `version` Dize (İsteğe Bağlı) - Uygulamanın versiyon numarasını oluşturun. _macOS_
  * `credits` Dize (isteğe bağlı) - Kredi bilgileri. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Panelle ilgili seçenekleri ayarlayın. This will override the values defined in the app's `.plist` file on MacOS. Bakınız [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) daha fazla detay için. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.



### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.



### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.



### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.



```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```


Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.



### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - Verilen anahtarda bir değer

Chromium komut satırına bir anahtar ekleyin (isteğe bağlı `değer`).

**Note:** bu etkilenmeyecek `process.argv`. The intended usage of this function is to control Chromium's behavior.



### `app.commandLine.appendArgument(value)`

* `value` String - Komut satırına eklenecek argüman

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** bu etkilenmeyecek `process.argv`. The intended usage of this function is to control Chromium's behavior.



### `app.commandLine.hasSwitch(switch)`

* `switch` String - Bir komut satırı anahtarı

Returns `Boolean` - Whether the command-line switch is present.



### `app.commandLine.getSwitchValue(switch)`

* `switch` String - Bir komut satırı anahtarı

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.



### `app.enableSandbox()` _Experimental_

Enables full sandbox mode on the app.

Bu metod sadece uygulama hazır olmadan önce çağırılabilir.



### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`



### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** Bu yöntem, kullanıcı haricindeki bir şeyin başarısız olmasına neden olursa hatalar atar. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Hata mesajı bilgilendirici olmalı ve neyin yanlış gittiğini size söylemeli



### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` isteği temsil eden bir kimlik.

`critical` geçildiğinde, dock simgesi uygulama aktifleşinceye veya istek iptal edilene kadar sıçrar.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.



### `app.dock.cancelBounce(id)` _macOS_

* `id` tamsayı

`id` sıçramasını iptal et.



### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` Dizi

FilePath, İndirilenler klasörünün içindeyse İndirme yığınla geri döner.



### `app.dock.setBadge(text)` _macOS_

* `text` String

Dock'un rozetleme alanında gösterilecek satırı ayarlar.



### `app.dock.getBadge()` _macOS_

`String` geri getirir - dock'un işaret dizisi.



### `app.dock.hide()` _macOS_

Dock simgesini gizler.



### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.



### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.



### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menü](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).



### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).



### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Dock simgesiyle ilişkilendirilmiş `image` 'ı ayarlar.



## Özellikler



### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.



### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Varsayılan: Devre dışı.

This API must be called after the `ready` event is emitted.

**Note:** render erişilebilirlik ağacı uygulamanızın performansını önemli ölçüde etkileyebilir. Varsayılan olarak etkinleştirilmemelidir.<0>.



### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.



### `app.isPackaged`

A `Boolean` property that returns  `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.



### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).

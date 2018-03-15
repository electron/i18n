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

* `event` Event
* `type` String - Etkinliği tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)'a haritalar.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

Bu cihazdan bir etkinlik başarıyla yürütüldüğünde [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) o sırada ortaya çıkıyor.

### Etkinlik: 'activate' *macOS*

Dönütler:

* `event` Olay
* xxxx: Dize - Aktiviteyi tanımlayan bir dize. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.
* `userInfo` nesne-aktivite tarafından depolanan uygulamaya özgü durumu içerir.

[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) başka bir cihazda yeniden başlatılmaya çalışıldığında yayınlanır. Transfer edilecek durumu güncellemeniz gerekiyorsa hemen `event.preventDefault()` girişi yapmanız, yeni bir `userInfo` sözlüğü oluşturmanız ve `app.updateCurrentActiviy()` zamanında aramanız gerekir. Aksi halde işlem başarısız olur ve `continue-activity-error` çağrılır.

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

* `event` Event
* `webContents` [webİçerikleri](web-contents.md)

Yeni bir [webContents](web-contents.md) oluşturulduğunda ortaya çıkar.

### Etkinlik: 'sertifika-hatası'

Dönüşler:

* `event` Olay
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

* `event` Olay
* `webContents` [webİçerikleri](web-contents.md)
* `istek` Nesne 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Nesne 
  * `isProxy` Boolean
  * `scheme` Dizi
  * `host` Dizi
  * `port` Tamsayı
  * `realm` String
* `callback` Fonksiyon 
  * `username` String
  * `password` String

`webContents` temel doğrulama yapmak istediğinde çıkarılır.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Dönüşler:

* `event` Olay
* `killed` Boolean

Emitted when the gpu process crashes or is killed.

### Event: 'accessibility-support-changed' *macOS* *Windows*

Dönüşler:

* `event` Olay
* `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See https://www.chromium.org/developers/design-documents/accessibility for more details.

## Metodlar

The `app` object has the following methods:

**Not:** Bazı metodlar sadece belirli işletim sistemlerinde çalışmaktadır ve çalıştıkları işletim sisteminin adlarıyla işaretlenmiştir.

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking user and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `seçenekler` Nesne (isteğe bağlı) 
  * `args` String[] - (optional)
  * `execPath` String (optional)

Relaunches the app when current instance exits.

By default the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

```javascript
const {app} = gerekir('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Hides all application windows without minimizing them.

### `app.show()` *macOS*

Shows application windows after they were hidden. Does not automatically focus them.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `name` Dizi

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

You can request the following paths by the name:

* `home` User's home directory.
* `appData` Per-user application data directory, which by default points to: 
  * `%APPDATA%` on Windows
  * `$XDG_CONFIG_HOME` or `~/.config` on Linux
  * `~/Library/Application Support` on macOS
* `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
* `temp` Temporary directory.
* `exe` The current executable file.
* `module` The `libchromiumcontent` library.
* `desktop` The current user's Desktop directory.
* `documents` Directory for a user's "My Documents".
* `downloads` Directory for a user's downloads.
* `music` Directory for a user's music.
* `pictures` Directory for a user's pictures.
* `videos` Directory for a user's videos.
* `logs` Directory for your app's log folder.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* dizi `yolu`
* `seçenekler` Nesne (isteğe bağlı) 
  * `boyut` Dizgi 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, unsupported on *macOS*.
* `callback` Fonksiyon 
  * `error` Hata
  * `icon` [DoğalGörüntü](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
* Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` Dizi
* `path` Dizgi

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` Dizi

Overrides the current application's name.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` Dizgi

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Clears the recent documents list.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) *Windows* - Defaults to `process.execPath`
* `args` String[] (optional) *Windows* - Defaults to an empty array

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - Array of `Task` objects

Adds `tasks` to the [Tasks](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

`Object` 'i geri getirir:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nothing went wrong.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Not:** Eğer bir `JumpListCategory` nesnesinin ne `type` ne de `name` özelliği ayarlanmamışsa `type` ının `tasks` olduğu varsayılır. Eğer `name` özelliği ayarlanmış fakat `type` göz ardı edilmişse yine `type` ın `custom` olduğu varsayılır.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

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

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

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

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) olarak eşleştirilir.
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `kimlik` dizesi

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `seçenekler` Nesne 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Fonksiyon 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Aramanın başarılı olup olmadığı `Boole Değerine ` döndürür.

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `seçenekler` Nesne (isteğe bağlı) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

`Object` 'i geri getirir:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Nesne 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Örneğin:

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

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `seçenekler` Nesne 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

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

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` tamsayı

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` Dizi

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Hides the dock icon.

### `app.dock.show()` *macOS*

Shows the dock icon.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.
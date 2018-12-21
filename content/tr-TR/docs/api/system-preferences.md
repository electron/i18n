# systemPreferences

> Sistem tercihlerini al.

İşlem: [Ana](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Etkinlikler

`systemPreferences` nesnesi aşağıdaki olayları yayar:

### Event: 'accent-color-changed' *Windows*

Dönüşler:

* `event` Olay
* `newColor` String - Kullanıcının sistemine atadığı yeni RGBA vurgu rengi.

### Event: 'color-changed' *Windows*

Dönüşler:

* `olay` Olay

### Event: 'inverted-color-scheme-changed' *Windows*

Dönüşler:

* `event` Event
* `invertedColorScheme` Boolean - Ters renk şeması yüksek kontrastlı bir tema gibi kullanılıyorsa `true`, kullanılmıyorsa değer `false` olacaktır.

### Event: 'appearance-changed' *macOS*

Dönüşler:

* `newAppearance` String - Can be `dark` or `light`

**NOTE:** This event is only emitted after you have called `startAppLevelAppearanceTrackingOS`

## Metodlar

### `systemPreferences.isDarkMode()` *macOS*

Sistemin karanlık modda olup olmadığına dair `Boolean` döndürür.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` *macOS*

Sayfalar arasında kaydırma ayarı açık olup olmadığına dair `Boolean` döndürür.

### `systemPreferences.postNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event`'ı macOS'un yerel bildirimleriymiş gibi gönderir. `userInfo` bildirimle birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir nesnedir.

### `systemPreferences.postLocalNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event`'ı macOS'un yerel bildirimleriymiş gibi gönderir. `userInfo` bildirimle birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir nesnedir.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` *macOS*

* `event` String
* `userInfo` Object

`event`'ı macOS'un yerel bildirimleriymiş gibi gönderir. `userInfo` bildirimle birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir nesnedir.

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

Returns `Number` - The ID of this subscription

İlgili `event` gerçekleştiğinde MacOS'un yerel bildirimlerine abone olup `callback`, `callback(event, userInfo)` ile beraber çağırılmış olacak. `userInfo` bildirim ile birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir objedir.

`event`'ın aboneliğini iptal etmek için kullanılabilecek abonenin `id`'sini döndürür.

Bu başlığının altında API `NSDistributedNotificationCenter`'e abone olur, `event`'ın örnek değerleri şöyledir:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

Returns `Number` - The ID of this subscription

`subscribeNotification` gibidir fakat yerel varsayılanlar için `NSNotificationCenter` kullanır. Bu `NSUserDefaultsDidChangeNotification` gibi eventlar için gereklidir.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` tamsayı

Aboneyi `id` ile kaldırır.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` tamsayı

`unsubscribeNotification` gibidir fakat aboneyi `NSNotificationCenter`'den çıkarır.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` *macOS*

* `id` tamsayı

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` *macOS*

* `defaults` Object - a dictionary of (`key: value`) user defaults 

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` *macOS*

* `key` String
* `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

`any` - `NSUserDefaults` 'te `key` değerini verir.

Bazı popüler `key` ve `type`'ler:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` *macOS*

* `key` String
* `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
* `value` String

`NSUserDefaults`'de `key` değerini ayarlayın.

`type`'ın `value`'nin gerçek türü ile eşleşmesi gerektiğini unutmayın. Eğer uyuşmazlarsa bir hata fırlatılacaktır.

Bazı popüler `key` ve `type`'ler:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` *macOS*

* `key` String

`NSUserDefaults`'deki `key`'i kaldırır. Bu, önceden ayarlanmış `key`'ün varsayılan değerini veya genel değerini `setUserDefault` ile geri yüklemek için kullanılabilir.

### `systemPreferences.isAeroGlassEnabled()` *Windows*

Eğer [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) aktifse `true` aksi takdirde `false` `Boolean` değerini döndürecektir.

Şeffaf bir pencere oluşturmanız gerekip gerekmediğini belirlemek için bunu kullanıp kullanmamanın bir örneği (DWM kompozisyonu devre dışı bırakıldığında şeffaf pencere düzgün çalışmaz):

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
let browserOptions = { width: 1000, height: 800 }

// Pencereyi sadece platform destekliyorsa şeffaf yapın.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
  browserOptions.transparent = true
  browserOptions.frame = false
}

// Pencere yaratın.
let win = new BrowserWindow(browserOptions)

// Yönlendirme.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Şeffaflık yok, bu nedenle temel stilleri kullanan bir geri yükleme yüklüyoruz.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` *Windows*

RGBA'da onaltılık formda kullanıcıların mevcut sistemindeki geniş vurgulu renk tercihini `String` olarak döndürür.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

### `systemPreferences.getColor(color)` *Windows*

* `color` String - aşağıdaki değerlerden biri: 
  * `3d-dark-shadow` - Üç boyutlu görüntüleme öğeleri için koyu renkli gölge.
  * `3d-face` - Üç boyutlu görüntüleme öğeleri ve diyalog için yüz rengi kutu arka planları.
  * `3d-highlight` - Üç boyutlu görüntüleme öğeleri için vurgulama rengi.
  * `3d-light` - Üç boyutlu görüntüleme elemanları için açık renk.
  * `3d-shadow` - Üç boyutlu görüntüleme öğeleri için gölge rengi.
  * `active-border` - Etkin pencere kenarı.
  * `active-caption` - Etkin pencere başlık çubuğu. Eğer gradient efekt aktifse aktif pencerenin başlık barındaki gradient rengin sol taraftaki rengini belirtir.
  * `active-caption-gradient` - Aktif pencerenin başlık barının gradient renginin içindeki sağ taraf rengi.
  * `app-workspace` Çoklu dosya arayürüz (MDI) uygulamlarının arkaplan rengi.
  * `button-text` - Push butonlarındaki yazı.
  * `caption-text` - Başlığın içindeki yazı, boyut kutusu ve kaydırma çubuğu ok kutusu.
  * `desktop` - Masaüstü arkaplan rengi.
  * `disabled-text` - Gri (devre dışı) metin.
  * `highlight` - Bir kontrolde seçilen öğe(ler).
  * `highlight-text` - Bir kontrol içindeki seçilen öğe(ler)'nin yazısı.
  * `hotlight` - Bir hot-tracked öğe veya hyperlink için renk.
  * `inactive-border` - Aktif olmayan pencere kenarı.
  * `inactive-caption` - Aktif olmayan pencere başlığı. Eğer gradient efekt aktifse aktif pencerenin başlık barındaki gradient rengin sol taraftaki rengini belirtir.
  * `inactive-caption-gradient` - Aktif olmayan pencerenin başlık barının gradient renginin içindeki sağ taraf rengi.
  * `inactive-caption-text` - Aktif olmayan bir altyazıdaki metin rengi.
  * `info-background` - Araç ipucu denetimleri için arka plan rengi.
  * `info-text` - Araç ipucu denetimleri için yazı rengi.
  * `menu` - Menü arkaplanı.
  * `menu-highlight` - Menü öğelerini vurgulamak için kullanılan renk düz bir menü olarak görünür.
  * `menubar` - Menüler düz olarak göründüğünde menü çubuğunun arkaplan rengi.
  * `menu-text` - Menüdeki yazılar.
  * `scrollbar` - Kaydırma çubuğu gri alanı.
  * `window` - Pencere arkaplanı.
  * `window-frame` - Pencere çerçevesi.
  * `window-text` - Pencerelerdeki yazılar.

RGB onaltılık form (`#ABCDEF`) içindeki sistem renk ayarlarını `String` olarak döndürür. Daha fazla bilgi için [Windows Dokümanlarına](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) bakın.

### `systemPreferences.isInvertedColorScheme()` *Windows*

Eğer ters kontrastlı bir renk şeması yüksek kontrast tema gibi ve etkin ise `true` aksi halde `false` `Boolean` değerini döndürecektir.

### `systemPreferences.getEffectiveAppearance()` *macOS*

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

### `systemPreferences.getAppLevelAppearance()` *macOS*

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` *macOS*

* `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.getMediaAccessStatus(mediaType)` *macOS*

* `mediaType` String - `microphone` or `camera`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.askForMediaAccess(mediaType)` *macOS*

* `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it *must* be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.
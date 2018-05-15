# systemPreferences

> Sistem tercihlerini al.

İşlem: [Ana](../glossary.md#main-process)

```javascript
const {systemPreferences} = require('electron')
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

### `systemPreferences.subscribeNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

İlgili `event` gerçekleştiğinde MacOS'un yerel bildirimlerine abone olup `callback`, `callback(event, userInfo)` ile beraber çağırılmış olacak. `userInfo` bildirim ile birlikte gönderilen kullanıcı bilgileri sözlüğünü içeren bir objedir.

`event`'ın aboneliğini iptal etmek için kullanılabilecek abonenin `id`'sini döndürür.

Bu başlığının altında API `NSDistributedNotificationCenter`'e abone olur, `event`'ın örnek değerleri şöyledir:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.unsubscribeNotification(id)` *macOS*

* `id` tamsayı

Aboneyi `id` ile kaldırır.

### `systemPreferences.subscribeLocalNotification(event, callback)` *macOS*

* `event` String
* `geri aramak` Function 
  * `event` String
  * `userInfo` Object

`subscribeNotification` gibidir fakat yerel varsayılanlar için `NSNotificationCenter` kullanır. Bu `NSUserDefaultsDidChangeNotification` gibi eventlar için gereklidir.

### `systemPreferences.unsubscribeLocalNotification(id)` *macOS*

* `id` tamsayı

`unsubscribeNotification` gibidir fakat aboneyi `NSNotificationCenter`'den çıkarır.

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
* `type` String - See [`getUserDefault`][#systempreferencesgetuserdefaultkey-type-macos].
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
const {BrowserWindow, systemPreferences} = require('electron')
let browserOptions = {width: 1000, height: 800}

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
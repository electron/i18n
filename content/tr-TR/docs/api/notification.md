# Bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

İşlem: [Ana](../glossary.md#main-process)

## Oluşturucu işleminde kullanma

Bir oluşturucu işleminden bildirimleri göstermek istiyorsanız [HTML5 Bildirim API'si](../tutorial/notifications.md) kullanmalısınız

## Sınıf: bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

İşlem: [Ana](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

`options` ile belirlenen yerel özelliklere sahip yeni bir `Notification` oluşturur.

### Statik Metodlar

`Notification` sınıfının statik yöntemleri aşağıdaki gibidir:

#### `Notification.isSupported()`

`Boolean` - Varolan sistemde masaüstü bildirimlerinin desteklenip desteklenmediğini gösterir

### `new Notification([options])` *Experimental*

* `options` Nesne (isteğe bağlı) 
  * `başlık` Metin - Bildirim penceresinin üst kısmında gösterilecek bildirim başlığı.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `gövde` Metin - Bildirimin gövde metni, başlık veya altyazı altında görüntülenecektir.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Örnek Olaylar

`yeni Bildirim` ile yaratılan nesneler aşağıdaki olayları belirtir:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Etkinlik: 'göster'

Dönüşler:

* `olay` Olay

Bildirim kullanıcıya gösterildiğinde yayınlanır, `show()` metodu ile birden çok kez gösterilebileceğinden, bunun birden çok kez tetiklenebileceğini unutmayın.

#### Olay: 'click'

Dönüşler:

* `event` Event

Bildirim kullanıcı tarafından aratıldığında yayılıyor.

#### Etkinlik: 'kapalı'

Dönüşler:

* `event` Olay

Bildirim, kullanıcı tarafından manuel müdahale edilerek kapatıldığında ortaya çıkar.

Bu olayın, bildirimin kapalı olduğu tüm durumlarda bildirim vermesi garanti edilmez.

#### Etkinlik: 'hızlı kaydır' *macOS*

Dönüşler:

* `event` Event
* `reply` Dize - Kullanıcının satır içi açıklama kısmına girdiği dize.

Bir bildirimin yayınlanması için kullanıcının `hasReply: true` olan bir bildirimde "yanıtla" düğmesini tıklaması gerekir.

#### Etkinlik: 'hızlı kaydır' *macOS*

Dönüşler:

* `event` Event
* `index` Numara - Etkin olan eylem dizinini gösterir.

### Sınıf örneği metodları

`new Notification` ile oluşturulan nesnelerin aşağıdaki örnek yöntemleri vardır:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

Bildirim daha önce gösterilmişse, bu yöntem önceden gösterilen bildirimi reddedecek ve aynı özelliklere sahip yeni bir bildirim oluşturacaktır.

#### `notification.close()`

Bildirimleri yoksay.

### Örnek özellikleri

#### `notification.title`

A `String` property representing the title of the notification.

#### `notification.subtitle`

A `String` property representing the subtitle of the notification.

#### `notification.body`

A `String` property representing the body of the notification.

#### `notification.replyPlaceholder`

A `String` property representing the reply placeholder of the notification.

#### `notification.sound`

A `String` property representing the sound of the notification.

#### `notification.closeButtonText`

A `String` property representing the close button text of the notification.

#### `notification.silent`

A `Boolean` property representing whether the notification is silent.

#### `notification.hasReply`

A `Boolean` property representing whether the notification has a reply action.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.
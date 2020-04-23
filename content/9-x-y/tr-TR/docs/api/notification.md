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

### `new Notification([options])` _Experimental_

* `options` Object (optional)
  * `title` Metin - Bildirim penceresinin üst kısmında gösterilecek bildirim başlığı.
  * `subtitle` String (optional) _macOS_ - A subtitle for the notification, which will be displayed below the title.
  * `body` Metin - Bildirimin gövde metni, başlık veya altyazı altında görüntülenecektir.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) _macOS_ - Whether or not to add an inline reply option to the notification.
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * `replyPlaceholder` String (optional) _macOS_ - The placeholder to write in the inline reply input field.
  * `sound` String (optional) _macOS_ - The name of the sound file to play when the notification is shown.
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) _macOS_ - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### Örnek Olaylar

`new Notification` ile yaratılan nesneler aşağıdaki olayları belirtir:

**Not:** Bazı özellikler sadece belirli işletim sistemlerinde mevcuttur ve çalıştıkları işletim sistemlerinin isimleriyle etiketlenmiştir.

#### Etkinlik: 'göster'

Dönüşler:

* `olay` Olay

Bildirim kullanıcıya gösterildiğinde yayınlanır, `show()` metodu ile birden çok kez gösterilebileceğinden, bunun birden çok kez tetiklenebileceğini unutmayın.

#### Etkinlik: 'tıkla'

Dönüşler:

* `event` Event

Bildirim kullanıcı tarafından aratıldığında yayılıyor.

#### Etkinlik: 'kapalı'

Dönüşler:

* `event` Olay

Bildirim, kullanıcı tarafından manuel müdahale edilerek kapatıldığında ortaya çıkar.

Bu olayın, bildirimin kapalı olduğu tüm durumlarda bildirim vermesi garanti edilmez.

#### Etkinlik: 'hızlı kaydır' _macOS_

Dönüşler:

* `event` Olay
* `reply` Dize - Kullanıcının satır içi açıklama kısmına girdiği dize.

Bir bildirimin yayınlanması için kullanıcının `hasReply: true` olan bir bildirimde "yanıtla" düğmesini tıklaması gerekir.

#### Etkinlik: 'hızlı kaydır' _macOS_

Dönüşler:

* `event` Olay
* `index` Numara - Etkin olan eylem dizinini gösterir.

### Sınıf örneği metodları

`new Notification` ile oluşturulan nesnelerin aşağıdaki örnek yöntemleri vardır:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

Bildirim daha önce gösterilmişse, bu yöntem önceden gösterilen bildirimi reddedecek ve aynı özelliklere sahip yeni bir bildirim oluşturacaktır.

#### `notification.close()`

Bildirimleri yoksay.

### Örnek Özellikleri

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

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Çalınan sesler

Macos'ta, bildirim görüntülendiği zaman çalmak istediğiniz sesin adını belirtebilirsiniz. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Ses dosyalarının uygulama paketi altında (e.g., `YourApp.app/Contents/Resources`) yada aşağıdaki yerlerden birinde kopyalanmış olduğundan emin olun:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Daha fazla bilgi için [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) dosyalarına bakın.

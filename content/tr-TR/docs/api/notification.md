# Bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

Süreç: [Ana](../glossary.md#main-process)

## Oluşturucu işleminde kullanma

Bir oluşturucu işleminden bildirimleri göstermek istiyorsanız [HTML5 Bildirim API'si](../tutorial/notifications.md) kullanmalısınız

## Sınıf: bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

Süreç: [Ana](../glossary.md#main-process)

`Notification` is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

It creates a new `Notification` with native properties as set by the `options`.

### Statik yöntemler

The `Notification` class has the following static methods:

#### `Notification.isSupported()`

Returns `Boolean` - Whether or not desktop notifications are supported on the current system

### `new Notification([options])` *Experimental*

* `ayarlar` Nesne 
  * `başlık` Metin - Bildirim penceresinin üst kısmında gösterilecek bildirim başlığı
  * `altyazı` Metin - (isteğe bağlı) Başlığın altında görüntülenen bildirim için bir altyazı. *macOS*
  * `gövde` Metin - Bildirimin gövde metni, başlık veya altyazı altında görüntülenecektir
  * `sessiz` Boolean - (isteğe bağlı) Bildirim gösterilirken bir İşetim Sistemi bildirim sesi yayınlayıp yayınlamayacağım
  * `icon` [NativeImage](native-image.md) - (optional) An icon to use in the notification
  * `hasReply` Boolean - (optional) Whether or not to add an inline reply option to the notification. *macOS*
  * `replyPlaceholder` String - (optional) The placeholder to write in the inline reply input field. *macOS*
  * `sound` String - (optional) The name of the sound file to play when the notification is shown. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (optional) Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation *macOS*

### Örnek etkinlikler

Objects created with `new Notification` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Etkinlik: 'göster'

Dönüşler:

* `olay` Olay

Bildirim kullanıcıya gösterildiğinde yayınlanır, `show()` metodu ile birden çok kez gösterilebileceğinden, bunun birden çok kez tetiklenebileceğini unutmayın.

#### Etkinlik: 'tıkla'

Dönüşler:

* `olay` Olay

Emitted when the notification is clicked by the user.

#### Etkinlik: 'kapalı'

Dönüşler:

* `olay` Olay

Bildirim, kullanıcı tarafından manuel müdahale edilerek kapatıldığında ortaya çıkar.

Bu olayın, bildirimin kapalı olduğu tüm durumlarda ileteceği garanti edilmez.

#### Event: 'reply' *macOS*

Dönüşler:

* `olay` Olay
* `reply` String - The string the user entered into the inline reply field

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

Dönüşler:

* `olay` Olay
* `index` Number - The index of the action that was activated

### Örnek yöntemleri

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Bildirimi kullanıcıya anında gösterir, lütfen bu, HTML5 Bildirim uygulamasının aksine, `new Notification` ın basit bir örneğini hemen kullanıcıya göstermediğini, OS'nin bunu görüntülemeden önce bu yöntemi aramanız gerektiğini unutmayın.

### Çalınan sesler

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.
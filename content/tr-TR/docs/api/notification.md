# Bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

İşlem: [Ana](../glossary.md#main-process)

## Oluşturucu işleminde kullanma

Bir oluşturucu işleminden bildirimleri göstermek istiyorsanız [HTML5 Bildirim API'si](../tutorial/notifications.md) kullanmalısınız

## Sınıf: bildirim

> İşletim Sistemi masaüstü bildirimlerini oluştur

İşlem: [Ana](../glossary.md#main-process)

`Notification` modülü [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) sınıfının bir örneğidir.

`options` ile belirlenen yerel özelliklere sahip yeni bir `Notification` oluşturur.

### Statik Metodlar

`Notification` sınıfının statik yöntemleri aşağıdaki gibidir:

#### `Notification.isSupported()`

`Boolean` - Varolan sistemde masaüstü bildirimlerinin desteklenip desteklenmediğini gösterir

### `new Notification([options])` *Experimental*

* `options` Nesnesi 
  * `başlık` Metin - Bildirim penceresinin üst kısmında gösterilecek bildirim başlığı
  * `altyazı` Metin - (isteğe bağlı) Başlığın altında görüntülenen bildirim için bir altyazı. *macOS*
  * `gövde` Metin - Bildirimin gövde metni, başlık veya altyazı altında görüntülenecektir
  * `sessiz` Boolean - (isteğe bağlı) Bildirim gösterilirken bir İşetim Sistemi bildirim sesi yayınlayıp yayınlamayacağım
  * `icon` (String | [NativeImage](native-image.md)) Bildirimde kullanılacak simgeyi tanımlar
  * `hasReply` Boolean - (İsteğe bağlı) Bildirimler için satır içi cevap seçeneği eklemek isteyip istemediğinizi gösterir. *macOS*
  * `replyPlaceholder` Dizi - (İsteğe Bağlı) - Satır içerisindeki açıklama alanları için yer tutucu özelliği vardır. *macOS*
  * `sound` Dizi - (İsteğe Bağlı) Bildirim geldiğinde çalacak ses dosyasının adı yer alır.*macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (İsteğe Bağlı) Bildirimlere eylem eklenebilir. Lütfen `NotificationAction` belgelerinde mevcut eylem ve sınırlamarı okuyunuz. *macOS*

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

* `event` Olay
* `reply` Dize - Kullanıcının satır içi açıklama kısmına girdiği dize

Bir bildirimin yayınlanması için kullanıcının `hasReply: true` olan bir bildirimde "yanıtla" düğmesini tıklaması gerekir.

#### Etkinlik: 'hızlı kaydır' *macOS*

Dönüşler:

* `event` Event
* `index` Numara - Etkin olan eylem dizinini gösterir

### Sınıf örneği metodları

`new Notification` ile oluşturulan nesnelerin aşağıdaki örnek yöntemleri vardır:

#### `notification.show()`

Bildirimi kullanıcıya anında gösterir, lütfen bu, HTML5 Bildirim uygulamasının aksine, `new Notification` ın basit bir örneğini hemen kullanıcıya göstermediğini, OS'nin bunu görüntülemeden önce bu yöntemi aramanız gerektiğini unutmayın.

Bildirim daha önce gösterilmişse, bu yöntem önceden gösterilen bildirimi reddedecek ve aynı özelliklere sahip yeni bir bildirim oluşturacaktır.

#### `notification.close()`

Bildirimleri yoksay.

### Çalınan sesler

Macos'ta, bildirim görüntülendiği zaman çalmak istediğiniz sesin adını belirtebilirsiniz. Varsayılan seslerden herhangi biri ( Sistem tercihleri altında > Ses) özel ses dosyalarına ekstra olarak kullanılabilir. Ses dosyalarının uygulama paketi altında (e.g., `YourApp.app/Contents/Resources`) yada aşağıdaki yerlerden birinde kopyalanmış olduğundan emin olun:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

Daha fazla bilgi için [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) dosyalarına bakın.
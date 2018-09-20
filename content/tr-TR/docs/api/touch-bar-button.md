## Sınıf: TouchBarButton

> Yerel macOS uygulamaları için dokunmatik çubukta bir düğme oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *Deneysel*

* `seçenekler` Nesnesi 
  * `label` String (İsteğe bağlı) - Görüntülenecek metin.
  * `backgroundColor` String (isteğe bağlı) - Düğme arkaplan rengi hex formatında, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (isteğe bağlı) - Buton simgesi.
  * `iconPosition` String (isteğe bağlı) - `left`, `right` yada `overlay` olabilir.
  * `click` Fonksiyon (isteğe bağlı) - Tuşa tıklandığında aranan fonksiyon.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBarButton.label`

Bir `String` düğmenin mevcut metnini temsil eder. Bu değeri değiştirmek hemen düğmeyi günceller Dokunmatik kaydırıcıda.

#### `touchBarButton.backgroundColor`

Düğmenin geçerli arka plan rengini temsil eden `String` hex kodu. Bu değeri değiştirmek dokunmatik bardaki butonu hemen günceller.

#### `touchBarButton.icon`

`NativeImage`, düğmenin geçerli simgesini temsil eder. Bu değeri değiştirmek dokunma çubuğundaki düğmeyi hemen günceller.
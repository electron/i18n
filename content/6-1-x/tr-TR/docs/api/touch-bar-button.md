## Sınıf: TouchBarButton

> Yerel macOS uygulamaları için dokunmatik çubukta bir düğme oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Deneysel_

* `options` Object
  * `label` String (İsteğe bağlı) - Görüntülenecek metin.
  * `backgroundColor` String (isteğe bağlı) - Düğme arkaplan rengi hex formatında, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (isteğe bağlı) - Buton simgesi.
  * `iconPosition` String (isteğe bağlı) - `left`, `right` yada `overlay` olabilir.
  * `click` Fonksiyon (isteğe bağlı) - Tuşa tıklandığında aranan fonksiyon.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

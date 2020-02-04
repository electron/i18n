## Sınıf: TouchBarButton

> Yerel macOS uygulamaları için dokunmatik çubukta bir düğme oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *Deneysel*

* `seçenekler` Nesnesi 
  * `label` String (İsteğe bağlı) - Görüntülenecek metin.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (isteğe bağlı) - Düğme arkaplan rengi hex formatında, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Fonksiyon (isteğe bağlı) - Tuşa tıklandığında aranan fonksiyon.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Örnek Özellikler

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

Bir `String` düğmenin mevcut metnini temsil eder. Bu değeri değiştirmek hemen düğmeyi günceller Dokunmatik kaydırıcıda.

#### `touchBarButton.backgroundColor`

Düğmenin geçerli arka plan rengini temsil eden `String` hex kodu. Bu değeri değiştirmek dokunmatik bardaki butonu hemen günceller.

#### `touchBarButton.icon`

`NativeImage`, düğmenin geçerli simgesini temsil eder. Bu değeri değiştirmek dokunma çubuğundaki düğmeyi hemen günceller.
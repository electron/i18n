## Sınıf: TouchBarButton

> Yerel macOS uygulamaları için dokunmatik çubukta bir düğme oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Deneysel_

* `options` Object
  * `label` String (İsteğe bağlı) - Görüntülenecek metin.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (isteğe bağlı) - Düğme arkaplan rengi hex formatında, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (isteğe bağlı) - `left`, `right` yada `overlay` olabilir. Defaults to `overlay`.
  * `click` Fonksiyon (isteğe bağlı) - Tuşa tıklandığında aranan fonksiyon.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Örnek Özellikler

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

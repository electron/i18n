## Sınıf: DokunmatikÇubukEtiketi

> Dokunmatik çubukta yerel macOS uygulamaları için bir etiket oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `yeni DokunmatikÇubukEtiketi(seçenekler)` _Deneysel_

* `options` Object
  * `label` Dize (opsiyonel) - Görüntülenecek metin.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` Dize (opsiyonel) - Metinin Hex rengi, örn `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Örnek Özellikler

Aşağıdaki özellikler `TouchBarLabel` örnekleri için uygundur:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

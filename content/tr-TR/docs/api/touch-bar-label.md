## Sınıf: DokunmatikÇubukEtiketi

> Dokunmatik çubukta yerel macOS uygulamaları için bir etiket oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `yeni DokunmatikÇubukEtiketi(seçenekler)` *Deneysel*

* `seçenekler` Nesnesi 
  * `label` Dize (opsiyonel) - Görüntülenecek metin.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` Dize (opsiyonel) - Metinin Hex rengi, örn `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarLabel` örnekleri için uygundur:

#### `touchBarLabel.label`

Etiketin geçerli metnini temsil eden bir `String`. Bu değeri değiştirmek dokunmatik çubuktaki etiketi hemen güncelleştirir.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

Etiketin geçerli rengini değiştiren bir `String` hex kodu. Bu değeri değiştirmek dokunmatik çubuktaki etiketi hemen güncelleştirir.
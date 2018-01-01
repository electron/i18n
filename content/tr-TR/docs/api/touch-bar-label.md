## Sınıf: DokunmatikÇubukEtiketi

> Dokunmatik çubukta yerel macOS uygulamaları için bir etiket oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikÇubukEtiketi(seçenekler)` *Deneysel*

* `seçenekler` Nesne 
  * `label` Dize (opsiyonel) - Görüntülenecek metin.
  * `textColor` Dize (opsiyonel) - Metinin Hex rengi, örn `#ABCDEF`.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBarLabel` örnekleri için uygundur:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
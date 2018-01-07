## Sınıf: TouchBarKaydırıcı

> Dokunmatik çubukta yerel macOS uygulamaları için bir kaydırıcı oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` *Deneysel*

* `seçenekler` Nesne 
  * `label` Dize (İsteğe bağlı) - Görüntülenecek metin.
  * `value` Integer (isteğe bağlı) - Seçilen değer.
  * `minValue` Integer (isteğe bağlı) - Minimum değer.
  * `maxValue` Integer (isteğe bağlı) - Maksimum değer.
  * `change` Fonksiyon (isteğe bağlı) - Kaydırıcı değiştiğinde çağırılacak işlev. 
    * `newValue` Sayı - Kullanıcının kaydırıcıda seçtiği değer

### Örnek özellikleri

Aşağıdaki özelliklere sahip örneklerde `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
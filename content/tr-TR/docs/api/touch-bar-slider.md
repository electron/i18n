## Sınıf: TouchBarKaydırıcı

> Dokunmatik çubukta yerel macOS uygulamaları için bir kaydırıcı oluşturun

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `yeni DokunmatikYüzeyKaydırıcı(seçenekler)` *Deneysel*

* `seçenekler` Nesnesi 
  * `label` Dize (İsteğe bağlı) - Görüntülenecek metin.
  * `value` Integer (isteğe bağlı) - Seçilen değer.
  * `minValue` Integer (isteğe bağlı) - Minimum değer.
  * `maxValue` Integer (isteğe bağlı) - Maksimum değer.
  * `change` Fonksiyon (isteğe bağlı) - Kaydırıcı değiştiğinde çağırılacak işlev. 
    * `newValue` Number - The value that the user selected on the Slider.

### Örnek Özellikler

Aşağıdaki özelliklere sahip örneklerde `TouchBarSlider`:

#### `touchBarSlider.label`

Kaydırıcının geçerli metnini temsil eden bir `String`. Bu değeri değiştirmek dokunmatik bardaki kaydırıcıyı hemen günceller.

#### `touchBarSlider.value`

Kaydırıcının geçerli değerini temsil eden bir `Number`. Bu değeri değiştirmek dokunmatik bardaki kaydırıcıyı hemen günceller.

#### `touchBarSlider.minValue`

Kaydırıcının şu anki minimum değerini gösteren bir `Number`. Bu değeri değiştirmek doğrudan dokunmatik bardaki kaydırıcıyı günceller.

#### `touchBarSlider.maxValue`

Kaydırıcının şu anki maksimum değerini gösteren bir `Number`. Bu değeri değiştirmek doğrudan dokunmatik bardaki kaydırıcıyı günceller.
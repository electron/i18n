## Sınıf: TouchBarColorPicker

> MacOS uygulamaları için dokunmatik çubuk içinde bir renk seçici oluşturun

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Experimental*

* `seçenekler` Nesne 
  * `availableColors` String[] (isteğe bağlı) - Seçilecek olası renkler olarak görünecek altılı renk dizeleri dizisi.
  * `selectedColor` Dizge (isteğe bağlı) - Seçicide seçili altı renk, yani `#ABCDEF`.
  * `değiştir` Fonksiyon (isteğe bağlı) - Bir renk seçildiğinde aranacak fonksiyon. 
    * `color` String - The color that the user selected from the picker.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarColorPicker` örnekleri üzerinde mevcuttur:

#### `touchBarColorPicker.availableColors`

Renk seçicinin kullanılabilir renklerini gösteren bir `String[]` dizini. Bu değeri değiştirmek doğrudan dokunmatik çubuktaki renk seçiciyi günceller.

#### `touchBarColorPicker.selectedColor`

Renk seçicinin seçili rengini temsil eden `String` hex kod. Bu değeri değiştirmek dokunma çubuğundaki renk seçiciyi hemen günceller.
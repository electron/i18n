## Class: TouchBarColorPicker

> MacOS uygulamaları için dokunmatik çubuk içinde bir renk seçici oluşturun

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Experimental*

* `seçenekler` Nesne 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `değiştir` Fonksiyon (isteğe bağlı) - Bir renk seçildiğinde aranacak fonksiyon. 
    * `renk` Metin - Kullanıcının seçiciden seçtiği renk

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarColorPicker` örnekleri üzerinde mevcuttur:

#### `touchBarColorPicker.availableColors`

Renk seçicinin kullanılabilir renklerini gösteren bir `String[]` dizini. Bu değeri değiştirmek doğrudan dokunmatik çubuktaki renk seçiciyi günceller.

#### `touchBarColorPicker.selectedColor`

Renk seçicinin seçili rengini temsil eden `String` hex kod. Bu değeri değiştirmek dokunma çubuğundaki renk seçiciyi derhal günceller.
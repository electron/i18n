## Sınıf: TouchBarColorPicker

> MacOS uygulamaları için dokunmatik çubuk içinde bir renk seçici oluşturun

Süreç: [Ana](../glossary.md#main-process)

### `new TouchBarColorPicker(options)`

* `options` Object
  * `availableColors` String[] (isteğe bağlı) - Seçilecek olası renkler olarak görünecek altılı renk dizeleri dizisi.
  * `selectedColor` Dizge (isteğe bağlı) - Seçicide seçili altı renk, yani `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `renk` Metin - Kullanıcının seçiciden seçtiği renk.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarColorPicker` örnekleri üzerinde mevcuttur:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.

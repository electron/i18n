## Sınıf: TouchBarPopover

> Dokunmatik çubukta yerel macOS uygulamaları için bir popover oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarPopover(options)` *Experimental*

* `seçenekler` Nesne 
  * `label` Dizge (isteğe bağlı) - açılır düğme metni.
  * `icon` [NativeImage](native-image.md) (isteğe bağlı) - Açılır düğme simgesi.
  * `items` [TouchBar](touch-bar.md) (isteğe bağlı) - Açılır pencerede görüntülenecek öğeler.
  * `showCloseButton` Mantıksal (isteğe bağlı) - açılır pencerenin solundaki kapat düğmesini görüntülemek için `true`, göstermek için `false`. Varsayılan `true`'tür.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarPover` örnekleri için uygundur:

#### `touchBarPopover.label`

Popover'ın şu anki buton metinini gösteren bir `String`. Bu değeri değiştirmek doğrudan dokunmatik çubuktaki popover'ı günceller.

#### `touchBarPopover.icon`

A `NativeImage` popover'ın geçerli düğme simgesini temsil eder. Bu değeri değiştirdiğinizde, popover dokunmatik çubukta olur.
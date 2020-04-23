## Sınıf: TouchBarPopover

> Dokunmatik çubukta yerel macOS uygulamaları için bir popover oluşturun

İşlem: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarPopover(options)` _Experimental_

* `options` Object
  * `label` Dizge (isteğe bağlı) - açılır düğme metni.
  * `icon` [NativeImage](native-image.md) (isteğe bağlı) - Açılır düğme simgesi.
  * `items` [TouchBar](touch-bar.md) (isteğe bağlı) - Açılır pencerede görüntülenecek öğeler.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Varsayılan `true`'dur.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBarPover` örnekleri için uygundur:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.

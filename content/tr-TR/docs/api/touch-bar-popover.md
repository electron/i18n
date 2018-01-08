## Class: TouchBarPopover

> Dokunmatik çubukta yerel macOS uygulamaları için bir popover oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarPopover(options)` *Experimental*

* `ayarlar` Nesne 
  * `label` String (optional) - Popover button text.
  * `icon` [NativeImage](native-image.md) (optional) - Popover button icon.
  * `items` [TouchBar](touch-bar.md) (optional) - Items to display in the popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarPover` örnekleri için uygundur:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
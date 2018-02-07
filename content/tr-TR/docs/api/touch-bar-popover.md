## Sınıf: TouchBarPopover

> Dokunmatik çubukta yerel macOS uygulamaları için bir popover oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarPopover(options)` *Experimental*

* `seçenekler` Nesne 
  * `label` String (optional) - Popover button text.
  * `icon` [NativeImage](native-image.md) (optional) - Popover button icon.
  * `items` [TouchBar](touch-bar.md) (optional) - Items to display in the popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBarPover` örnekleri için uygundur:

#### `touchBarPopover.label`

Popover'ın şu anki buton metinini gösteren bir `String`. Bu değeri değiştirmek doğrudan dokunmatik çubuktaki popover'ı günceller.

#### `touchBarPopover.icon`

A `NativeImage` popover'ın geçerli düğme simgesini temsil eder. Bu değeri değiştirdiğinizde, popover dokunmatik çubukta olur.
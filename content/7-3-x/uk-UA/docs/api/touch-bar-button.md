## Клас: TouchBarButton

> Створює кнопку на Touch Bar для нативних macOS додатків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Експериментальний_

* `options` Object
  * `label` String (необов'язково) - Текст кнопки.
  * `backgroundColor` String (необов'язково) - Колір тла кнопки, тобто `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (необов'язково) - Може бути `left`, `right` або `overlay`.
  * `click` Function (необов'язково) - Функція для виклику, коли кнопка натискається.

### Властивості Екземпляра

Наступні властивості доступні в екземплярах `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

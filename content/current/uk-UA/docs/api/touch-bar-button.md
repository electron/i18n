## Клас: TouchBarButton

> Створює кнопку на Touch Bar для нативних macOS додатків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Експериментальний_

* `options` Object
  * `label` String (необов'язково) - Текст кнопки.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (необов'язково) - Колір тла кнопки, тобто `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (необов'язково) - Може бути `left`, `right` або `overlay`. Defaults to `overlay`.
  * `click` Function (необов'язково) - Функція для виклику, коли кнопка натискається.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Властивості Екземпляра

Наступні властивості доступні в екземплярах `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

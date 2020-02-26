## Класс: TouchBarLabel

> Создает метку на тач-панели, для найтивного macOS-приложения

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *Экспериментально*

* `options` Object 
  * `label` String (optional) - Text to display.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Свойства экземпляра

Для экземпляров `TouchBarLabel` доступны следующие свойства:

#### `touchBarLabel.label`

Строка (`String`), представляющая текущий текст метки. Изменение этого значения немедленно обновляет метку на тач-панели.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
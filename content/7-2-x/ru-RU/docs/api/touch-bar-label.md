## Класс: TouchBarLabel

> Создает метку на тач-панели, для найтивного macOS-приложения

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _Экспериментально_

* `options` Object
  * `label` String (optional) - Text to display.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### Instance Properties

Для экземпляров `TouchBarLabel` доступны следующие свойства:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

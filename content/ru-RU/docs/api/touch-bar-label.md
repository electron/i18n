## Класс: TouchBarLabel

> Создает метку на тач-панели, для найтивного macOS-приложения

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *Экспериментально*

* `options` Object 
  * `label` String (optional) - Text to display.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### Свойства экземпляра

Для экземпляров `TouchBarLabel` доступны следующие свойства:

#### `touchBarLabel.label`

Строка (`String`), представляющая текущий текст метки. Изменение этого значения немедленно обновляет метку на тач-панели.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
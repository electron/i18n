## Клас: TouchBarLabel

> Створює напис в панелі дотику для нативних macOS застосунків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _Експериментальний_

* `options` Object
  * `label` String (опціонально) - Текст для відображення.
  * `textColor` String (опціонально) - Шістнадцятковий код кольору, наприклад `#ABCDEF`.

### Властивості Екземпляра

Наступні властивості доступні в екземплярах `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

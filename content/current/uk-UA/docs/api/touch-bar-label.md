## Клас: TouchBarLabel

> Створює напис в панелі дотику для нативних macOS застосунків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *Експериментальний*

* `options` Об'єкт 
  * `label` String (опціонально) - Текст для відображення.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (опціонально) - Шістнадцятковий код кольору, наприклад `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Властивості Екземпляра

Наступні властивості доступні в екземплярах `TouchBarLabel`:

#### `touchBarLabel.label`

`String` представляє поточний текст напису. Зміна цього значення миттєво змінює напис в панель дотику.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

`String` представляє поточний колір напису в шістнадцятковому вигляді. Зміна цього значення миттєво змінює напис в панель дотику.
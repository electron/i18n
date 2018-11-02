## Клас: TouchBarLabel

> Створює напис в панелі дотику для нативних macOS застосунків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *Експериментальний*

* `options` Об'єкт 
  * `label` String (опціонально) - Текст для відображення.
  * `textColor` String (опціонально) - Шістнадцятковий код кольору, наприклад `#ABCDEF`.

### Властивості Екземпляра

Наступні властивості доступні в екземплярах `TouchBarLabel`:

#### `touchBarLabel.label`

`String` представляє поточний текст напису. Зміна цього значення миттєво змінює напис в панель дотику.

#### `touchBarLabel.textColor`

`String` представляє поточний колір напису в шістнадцятковому вигляді. Зміна цього значення миттєво змінює напис в панель дотику.
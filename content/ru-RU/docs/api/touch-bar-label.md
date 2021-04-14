## Класс: TouchBarLabel

> Создает метку на тач-панели, для найтивного macOS-приложения

Процесс: [Основной](../glossary.md#main-process)

### `новый TouchBarLabel (варианты)`

* `options` Object
  * `label` строка (необязательно) - Текст для отображения.
  * `accessibilityLabel` String (по желанию) - Краткое описание кнопки для использования на screenreaders как VoiceOver.
  * `textColor` строка (по желанию) - Hex цвет текста, т.е. `#ABCDEF`.

При определении `accessibilityLabel`убедитесь, что вы рассмотрели macOS [передовой практики](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Свойства экземпляра

Для экземпляров `TouchBarLabel` доступны следующие свойства:

#### `touchBarLabel.label`

В `String` , представляющий текущий текст метки. Изменение этого значения немедленно обновляет этикетку в сенсорной панели.

#### `touchBarLabel.accessibilityLabel`

`String` , представляющий описание этикетки для чтения считывателем экрана.

#### `touchBarLabel.textColor`

В `String` шестиугольный код, представляющий текущий цвет текста метки. Изменение этого значения немедленно обновляет этикетку в сенсорной панели.

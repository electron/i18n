## Класс: TouchBarButton

> Создайте кнопку в сенсорной панели для родных приложений macOS

Процесс: [Основной](../glossary.md#main-process)

### `новый TouchBarButton (варианты)`

* `options` Object
  * `label` Строка (по желанию) - Текст кнопки.
  * `accessibilityLabel` String (по желанию) - Краткое описание кнопки для использования на screenreaders как VoiceOver.
  * `backgroundColor` String (по желанию) - Цвет фона кнопки в шестиугольном формате, т.е. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | Строка (необязательно) - значок кнопки.
  * `iconPosition` String (необязательный) - Позиция иконки, может иметь значения `left`, `right` или `overlay`. По умолчанию `overlay`.
  * `click` функция (необязательно) - Функция вызова при нажатии кнопки.
  * `enabled` Boolean (по желанию) - находится ли кнопка в включенном состоянии.  По умолчанию - `true`.

При определении `accessibilityLabel`убедитесь, что вы рассмотрели macOS [передовой практики](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Свойства экземпляра

Следующие свойства доступны на экземплярах `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

`String` , представляющий описание кнопки для чтения с помощью чтения на экране. Будет читаться только с помощью чтения с экрана, если этикетка не установлена.

#### `touchBarButton.label`

Строка (`String`) представляющая текущий текст кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.backgroundColor`

Строка (`String`) представляющая текущий цвет кнопки в шестнадцатиричном формате. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.icon`

`NativeImage,` представляющее текущую иконку кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.iconPosition`

A `String` - может быть `left`, `right` или `overlay`.  По умолчанию `overlay`.

#### `touchBarButton.enabled`

На `Boolean` , представляющая, находится ли кнопка в включенной состоянии.

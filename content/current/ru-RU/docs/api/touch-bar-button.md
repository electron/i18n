## Класс: TouchBarButton

> Создает кнопку в сенсорной панели для нативных приложений macOS

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)`

* `options` Object
  * `label` String (необязаельный) - Текст кнопки.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (необязательный) - Цвет фона кнопки в шестнадцатиричном представлении, т.е. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (необязательный) - Позиция иконки, может иметь значения `left`, `right` или `overlay`. Defaults to `overlay`.
  * `click` Function (необязательный) - Функция которая будет вызвана при нажатии на кнопку.
  * `enabled` Boolean (optional) - Whether the button is in an enabled state.  По умолчанию - `true`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Instance Properties

Для экземпляров `TouchBarButton` доступны следующие свойства:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

Строка (`String`) представляющая текущий текст кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.backgroundColor`

Строка (`String`) представляющая текущий цвет кнопки в шестнадцатиричном формате. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.icon`

`NativeImage,` представляющее текущую иконку кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.iconPosition`

A `String` - Can be `left`, `right` or `overlay`.  Defaults to `overlay`.

#### `touchBarButton.enabled`

A `Boolean` representing whether the button is in an enabled state.

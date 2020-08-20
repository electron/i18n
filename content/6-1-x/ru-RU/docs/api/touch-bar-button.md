## Класс: TouchBarButton

> Создает кнопку в сенсорной панели для нативных приложений macOS

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _ Экспериментально_

* `options` Object
  * `label` String (необязаельный) - Текст кнопки.
  * `backgroundColor` String (необязательный) - Цвет фона кнопки в шестнадцатиричном представлении, т.е. `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (необязательный) - Иконка.
  * `iconPosition` String (необязательный) - Позиция иконки, может иметь значения `left`, `right` или `overlay`.
  * `click` Function (необязательный) - Функция которая будет вызвана при нажатии на кнопку.

### Instance Properties

Для экземпляров `TouchBarButton` доступны следующие свойства:

#### `touchBarButton.label`

Строка (`String`) представляющая текущий текст кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.backgroundColor`

Строка (`String`) представляющая текущий цвет кнопки в шестнадцатиричном формате. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

#### `touchBarButton.icon`

`NativeImage,` представляющее текущую иконку кнопки. Изменение этого значения немедленно обновляет кнопку в сенсорной панели.

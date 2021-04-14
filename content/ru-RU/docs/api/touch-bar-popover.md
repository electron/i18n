## Класс: TouchBarПоповер

> Создание popover в сенсорной панели для родных приложений macOS

Процесс: [Основной](../glossary.md#main-process)

### `новый TouchBarPopover (варианты)`

* `options` Object
  * `label` Строка (необязательно) - текст кнопки Popover.
  * `icon` [NativeImage](native-image.md) (по желанию) - значок кнопки Popover.
  * `items` [TouchBar](touch-bar.md) - Элементы для отображения в popover.
  * `showCloseButton` Boolean (необязательно) - `true` для отображения кнопки закрытия слева от popover, `false` не показывать его. По умолчанию - `true`.

### Свойства экземпляра

Следующие свойства доступны на экземплярах `TouchBarPopover`:

#### `touchBarPopover.label`

`String` , представляющий текущий текст кнопки popover. Изменение этого значения немедленно обновляет popover в сенсорной панели.

#### `touchBarPopover.icon`

На `NativeImage` , представляющий значок кнопки popover. Изменение этого значения немедленно обновляет popover в сенсорной панели.

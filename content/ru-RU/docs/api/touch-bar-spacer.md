## Class: TouchBarSpacer

> Создает разделитель между двумя элементами в сенсорной панели для нативных приложений macOS

Процесс: [Основной](../glossary.md#main-process)

### `новый TouchBarSpacer (варианты)`

* `options` Object
  * `size` строка (необязательно) - Размер спейсера, возможные значения:
    * `small` - Небольшое пространство между элементами. Карты для `NSTouchBarItemIdentifierFixedSpaceSmall`. Это по умолчанию.
    * `large` - Большое пространство между элементами. Карты для `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Занимает всё доступное пространство. Карты для `NSTouchBarItemIdentifierFlexibleSpace`.

### Свойства экземпляра

Следующие свойства доступны на экземплярах `TouchBarSpacer`:

#### `touchBarSpacer.size`

`String` , представляющий размер спейсера.  Может быть `small`, `large` или `flexible`.

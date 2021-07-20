## Class: TouchBarSpacer

> Создает разделитель между двумя элементами в сенсорной панели для нативных приложений macOS

Процесс: [Основной](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Небольшое пространство между элементами. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Большое пространство между элементами. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Занимает всё доступное пространство. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Свойства экземпляра

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.

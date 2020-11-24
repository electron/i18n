## Клас: TouchBarSpacer

> Створює відступ між елементами в панелі дотику для нативних macOS застосунків

Процес: [Main](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Малий відступ між елементами. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Великий відступ між елементами. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Зайняти весь доступний простір. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Властивості Екземпляра

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.

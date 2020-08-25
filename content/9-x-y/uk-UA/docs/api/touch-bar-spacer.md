## Клас: TouchBarSpacer

> Створює відступ між елементами в панелі дотику для нативних macOS застосунків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _Експериментальний_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Малий відступ між елементами. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Великий відступ між елементами. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Зайняти весь доступний простір. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

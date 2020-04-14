## Клас: TouchBarSpacer

> Створює відступ між елементами в панелі дотику для нативних macOS застосунків

Процес: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *Експериментальний*

* `options` Об'єкт 
  * `size` String (опціонально) - розмір відступу, можливі варіанти: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
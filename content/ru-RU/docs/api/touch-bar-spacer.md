## Class: TouchBarSpacer

> Создает разделитель между двумя элементами в сенсорной панели для нативных приложений macOS

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` * Экспериментально*

* `options` Object 
  * `size` String (опционально) - Размер разделителя, возможные значения: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
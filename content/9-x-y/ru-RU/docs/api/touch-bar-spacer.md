## Class: TouchBarSpacer

> Создает разделитель между двумя элементами в сенсорной панели для нативных приложений macOS

Процесс: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _ Экспериментально_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Небольшое пространство между элементами. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Большое пространство между элементами. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Занимает всё доступное пространство. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

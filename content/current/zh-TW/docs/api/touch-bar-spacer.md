## Class: TouchBarSpacer

> Create a spacer between two items in the touch bar for native macOS applications

處理序: [主處理序](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _試驗中_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

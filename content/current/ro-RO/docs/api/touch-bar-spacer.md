## Class: TouchBarSpacer

> Create a spacer between two items in the touch bar for native macOS applications

Proces-ul: [Main](../tutorial/application-architecture.md#main-and-renderer-processes) - Principal</0>

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

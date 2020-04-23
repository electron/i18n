## Class: TouchBarSpacer

> Create a spacer between two items in the touch bar for native macOS applications

Processo: <3>Main</7><9>

### `new TouchBarSpacer(options)` _Experimental_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

## Class: TouchBarPopover

> Create a popover in the touch bar for native macOS applications

處理序: [主處理序](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarPopover(options)` *試驗中*

* `options` Object 
  * `label` String (optional) - Popover button text.
  * `icon` [NativeImage](native-image.md) (optional) - Popover button icon.
  * `items` [TouchBar](touch-bar.md) (optional) - Items to display in the popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### 物件屬性

The following properties are available on instances of `TouchBarPopover`:

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
## 類別: TouchBarLabel

> Create a label in the touch bar for native macOS applications

處理序: [主處理序](../tutorial/quick-start.md#main-process)

### `new TouchBarLabel(options)` *Experimental*

* `options` Object 
  * `label` String (optional) - Text to display.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### Instance Properties

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
## Class: TouchBarLabel

> Create a label in the touch bar for native macOS applications

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `new TouchBarLabel(options)` *Experimental*

* `options` Bagay 
  * `label` String (optional) - Text to display.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### Humahalimbawa sa bahagi nito

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
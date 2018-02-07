## Klase: TouchBarColorPicker

> Lumikha nang tagapili ng kulay sa touch bar sa likas na macOS na mga aplikasyon

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarColorPicker(options)` *Experimental*

* `mga pagpipilian` Bagay 
  * `availableColors` String[] (optional) - Pagkakasunod-sunod ng mga linya ng kulay para ipakitang bilang posibleng kulay na mapili.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected. 
    * `color` String - The color that the user selected from the picker

### Humahalimbawa sa bahagi nito

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
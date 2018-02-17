## Klase: TouchBarColorPicker

> Lumikha nang tagapili ng kulay sa touch bar sa likas na macOS na mga aplikasyon

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarColorPicker(options)` *Experimental*

* `options` Bagay 
  * `availableColors` String[] (optional) - Pagkakasunod-sunod ng mga linya ng kulay para ipakitang bilang posibleng kulay na mapili.
  * `selectedColor` String (optional) - Ang napiling kulay sa tagapili, i.e `#ABCDEF`.
  * `baguhin` Function (optional) - tungkuling taga tawag kung merong kulay na mapili. 
    * `color` String - Ang kulay na napili ng gumagamit sa pilian

### Humahalimbawa sa bahagi nito

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
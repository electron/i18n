## Klase: TouchBarColorPicker

> Lumikha nang tagapili ng kulay sa touch bar sa likas na macOS na mga aplikasyon

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarColorPicker(options)` _Experimental_

* `options` Object
  * `availableColors` String[] (optional) - Pagkakasunod-sunod ng mga linya ng kulay para ipakitang bilang posibleng kulay na mapili.
  * `selectedColor` String (optional) - Ang napiling kulay sa tagapili, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `color` String - Ang kulay na napili ng gumagamit sa pilian.

### Katangian ng pagkakataon

Ang mga sumusunod na katangian ay magagamit sa mga pagkakataon ng `TouchBarColorPicker`:

#### `touchBarColorPicker.mamagamitnamgaKulay`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.napilingKulay`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.

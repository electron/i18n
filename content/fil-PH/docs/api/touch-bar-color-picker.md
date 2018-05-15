## Klase: TouchBarColorPicker

> Lumikha nang tagapili ng kulay sa touch bar sa likas na macOS na mga aplikasyon

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarColorPicker(options)` *Experimental*

* `pagpipilian` Bagay 
  * `availableColors` String[] (optional) - Pagkakasunod-sunod ng mga linya ng kulay para ipakitang bilang posibleng kulay na mapili.
  * `selectedColor` String (optional) - Ang napiling kulay sa tagapili, i.e `#ABCDEF`.
  * `baguhin` Function (optional) - tungkuling taga tawag kung merong kulay na mapili. 
    * `color` String - The color that the user selected from the picker.

### Instance Properties

Ang mga sumusunod na katangian ay magagamit sa mga pagkakataon ng `TouchBarColorPicker`:

#### `touchBarColorPicker.mamagamitnamgaKulay`

Isang `String`array na kumakatawan sa pagpipilian ng kulay na magagamit sa kasalukuyang pwedeng mapili. Kung babaguhin ang halaga nito ay agad mauupdate ang color picker na nasa touch bar.

#### `touchBarColorPicker.napilingKulay`

Isang `String` hex code na kumakatawan sa kulay sa pagpipilian ng mga kulay na kasalukuyang napili. Kung babaguhin ang halaga nito ay agad mauupdate ang color picker na nasa touch bar.
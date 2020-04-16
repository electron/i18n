## Klase: TouchBarScrubber

> Lumilikha ng isang "scrubber" (isang scrollable na tagapili)

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarScrubber(options)` _Experimental_

* `options` Object
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Isang hanay ng mga aytem na ilalagay sa scrubber na ito.
  * `select` Function - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` na Integer - Ang index ng aytem na pinili ng tagagamit.
  * `highlight` Function - Called when the user taps any item.
    * `highlightedIndex` na Integer - Ang index ng aytem na ginalaw ng user.
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle` String - Selected overlay item style. Defaults to `null`.
  * `showArrowButtons` na Boolean - Nakadefault sa `false`.
  * `mode` na String - Naka-default sa `free`.
  * `continuous` na Boolean - Nakadefault sa `true`.

### Katangian ng pagkakataon

Ang sumusunod na mga katangian ay makikita sa mga instance ng `TouchBarScrubber`:

#### `touchBarScrubber.items`

Ang isang hanay ng `ScrubberItem[]` na kumakatawan sa mga aytem sa scrubber na ito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Ang pag-update sa mga malalalim na katangian sa loob ng hanay na ito ay **hindi nag-a-update sa touch bar**.

#### `touchBarScrubber.selectedStyle`

Ang isang `String` na kumakatawan sa istilo na dapat meron ang napiling mga aytem sa scrubber. Ang agad na pagaupdate ng value na ito ay nagupdate sa control na nasa touch bar. Posibleng halaga:

* `background` -nagma-map sa `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Nagma-map sa `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Sa aktwal, ang null, at hindi ang isang string, ang nagtatanggal sa lahat ng mga istilo.

#### `touchBarScrubber.overlayStyle`

Ang isang `String` na kumakatawan sa istilo na dapat meron ang napiling mga aytem sa scrubber. Ang istilong ito ay naka-overlay sa itaas ng aytem ng scrubber sa halip na ilagay ito sa likod nito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Posibleng mga halaga:

* `background` -nagma-map sa `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Nagma-map sa `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Sa aktwal, ang null, at hindi ang isang string, ang nagtatanggal sa lahat ng mga istilo.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Posibleng halaga:

* `fixed` - Nagma-map sa `NSScrubberModeFixed`.
* `free` - Nagma-map sa `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar.

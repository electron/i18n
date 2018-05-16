## Klase: TouchBarScrubber

> Lumilikha ng isang "scrubber" (isang scrollable na tagapili)

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Bagay 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - An array of items to place in this scrubber.
  * `select` Function - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - The index of the item the user selected.
  * `highlight` Function - Called when the user taps any item. 
    * `highlightedIndex` Integer - The index of the item the user touched.
  * `selectedStyle` na String - Napiling istilo ng aytem. Naka-default sa `null`.
  * `overlayStyle` na String - Piling istilo ng overlay na aytem. Naka-default sa `null`.
  * `showArrowButtons` na Boolean - Nakadefault sa `false`.
  * `mode` na String - Naka-default sa `free`.
  * `continuous` na Boolean - Nakadefault sa `true`.

### Mga Katangian ng Instance

Ang sumusunod na mga katangian ay makikita sa mga instance ng `TouchBarScrubber`:

#### `touchBarScrubber.items`

Ang isang hanay ng `ScrubberItem[]` na kumakatawan sa mga aytem sa scrubber na ito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Ang pag-update sa mga malalalim na katangian sa loob ng hanay na ito ay **hindi nag-a-update sa touch bar**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

Ang isang `String` na kumakatawan sa istilo na dapat meron ang napiling mga aytem sa scrubber. Ang istilong ito ay naka-overlay sa itaas ng aytem ng scrubber sa halip na ilagay ito sa likod nito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Posibleng mga halaga:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

Ang isang `Boolean` na kumakatawan sa kung alin sa kaliwa/kanang mga arrow na pangpili ang ipapakita sa scrubber na ito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar.

#### `touchBarScrubber.mode`

Isang `String` na kumakatawan sa mode ng scrubber na ito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar:

* `fixed` - Maps to `NSScrubberModeFixed`.
* `free` - Maps to `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Ang isang `Boolean` na kumakatawan sa kung ang scrubber ba ay tuloy-tuloy o hindi. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar.
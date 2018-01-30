## Klase: TouchBarScrubber

> Lumilikha ng isang "scrubber" (isang scrollable na tagapili)

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Bagay 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Isang hanay ng mga aytem na ilalagay sa scrubber na ito
  * `select` Function - Itinatawag kapag ang tagagamit ay pumindot sa isang aytem na hinding panghuling napindot 
    * `selectedIndex` na Integer - Ang index ng aytem na pinili ng tagagamit
  * `highlight` Function - Itinatawag kapag ang tagagamit ay pumipindot sa kahit anong aytem 
    * `highlightedIndex` na Integer - Ang index ng aytem na ginalaw ng user
  * `selectedStyle` na String - Napiling istilo ng aytem. Naka-default sa `null`.
  * `overlayStyle` na String - Piling istilo ng overlay na aytem. Naka-default sa `null`.
  * `showArrowButtons` na Boolean - Nakadefault sa `false`.
  * `mode` na String - Naka-default sa `free`.
  * `continuous` na Boolean - Nakadefault sa `true`.

### Mga Katangian ng Instance

Ang sumusunod na mga katangian ay makikita sa mga instance ng `TouchBarScrubber`:

#### `touchBarScrubber.items`

A `ScrubberItem[]` array representing the items in this scrubber. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.overlayStyle`

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Maps to `NSScrubberModeFixed`
* `free` - Maps to `NSScrubberModeFree`

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.
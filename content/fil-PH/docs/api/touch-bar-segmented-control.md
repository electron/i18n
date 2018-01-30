## Class: TouchBarSegmentedControl

> Gumawa ng segmented control(isang button group) na kung saan ang isang button ay mayroong napiling kalagyan

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `bagong TouchBarSegmentedControl(options)` *Experimental*

* `mga opsyon` Object 
  * `segmentStyle` String-(opsyonal) Ang istilo ng mga segment: 
    * `awtomatiko` -Default. Ang anyo ng segmented control ay awtomatikong natutokoy batay sa uri ng window kung saan ang control ay nakadisplay at nakaposisyon sa loob ng window.
    * `bilugan` -Ang control ay naipapakita gamit ang mabilog na istilo.
    * `textured-rounded` - The control is displayed using the textured rounded style.
    * `round-rect` - The control is displayed using the round rect style.
    * `textured-square` - The control is displayed using the textured square style.
    * `capsule` - The control is displayed using the capsule style
    * `small-square` - The control is displayed using the small square style.
    * `separated` - The segments in the control are displayed very close to each other but not touching.
  * `mode` String - (optional) The selection mode of the control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Humahalimbawa sa bahagi nito

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.
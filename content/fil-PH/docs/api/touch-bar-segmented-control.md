## Class: TouchBarSegmentedControl

> Gumawa ng segmented control(isang button group) na kung saan ang isang button ay mayroong napiling kalagyan

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `bagong TouchBarSegmentedControl(options)` *Experimental*

* `mga opsyon` Object 
  * `segmentStyle` String-(opsyonal) Ang istilo ng mga segment: 
    * `awtomatiko` -Default. Ang anyo ng segmented control ay awtomatikong natutokoy batay sa uri ng window kung saan ang control ay nakadisplay at nakaposisyon sa loob ng window.
    * `rounded` -Ang control ay naipapakita gamit ang mabilog na istilo.
    * `textured-rounded` -Ang control ay naipapakita gamit ang textured rounded style.
    * `round-rect`Ang control ay naipapakita gamit ang round rect style.
    * `textured-square` - Ang control ay naipapakita gamit ang textured square style.
    * `capsule` - Ang control ay naipapakita gamit ang capsule style
    * `small-square` -Ang contol ay naipapakita gamit ang small square style.
    * `separated` - Ang mga segment sa control ay naka-display malapit sa isat'isa ngunit hindi hawakan.
  * `mode` String - (opsyonal) Ang pagpili ng mode ng control: 
    * `single` - Default. Isang item ang napili sa isang pagkakataon, ang pagpili ng isang deselects sa dating napiling item.
    * `multiple` -Multiple items ay maaring mapili nang paisa-isa.
    * `buttons` -Gumawa ng mga segment act bilang mga button, bawat segment ay pinindot at inilabas pero hindi kailanman minarkahan bilang aktibo.
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
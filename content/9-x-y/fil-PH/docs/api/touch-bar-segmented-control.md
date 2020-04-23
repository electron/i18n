## Class: TouchBarSegmentedControl

> Gumawa ng segmented control(isang button group) na kung saan ang isang button ay mayroong napiling kalagyan

Proseso: [Pangunahing](../tutorial/application-architecture.md#main-and-renderer-processes)

### `bagong TouchBarSegmentedControl(options)` _Experimental_

* `options` Object
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` -Ang control ay naipapakita gamit ang mabilog na istilo. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` -Ang control ay naipapakita gamit ang textured rounded style. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect`Ang control ay naipapakita gamit ang round rect style. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - Ang control ay naipapakita gamit ang textured square style. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - Ang control ay naipapakita gamit ang capsule style. Maps to `NSSegmentStyleCapsule`.
    * `small-square` -Ang contol ay naipapakita gamit ang small square style. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - Ang mga segment sa control ay naka-display malapit sa isat'isa ngunit hindi hawakan. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` -Multiple items ay maaring mapili nang paisa-isa. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` -Gumawa ng mga segment act bilang mga button, bawat segment ay pinindot at inilabas pero hindi kailanman minarkahan bilang aktibo. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md)Isang array ng mga segment na dapat ilagay sa control nito.
  * `selectedIndex` Integer (opsyonal) - Ang index ng kasalukuyang selected segment, ay awtomatikong iaupdate sa pakikipag ugnayan ng user. When the mode is `multiple` it will be the last selected item.
  * `change` Function (optional) - Called when the user selects a new segment.
    * `selectedIndex` Integer - Ang index ng segment sa user na napili.
    * `isSelected` Boolean -Anuman ang bunga ng resulta ng user selection ng segment ay pinili o hindi.

### Katangian ng pagkakataon

Ang mga sumusunod na properties ay maaring gamitin sa mga pagkakataon ng`TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Isang `SegmentedControlSegment[]`array ang kumakatawan sa mga segment sa mga kontrol na ito. Ang agad na pagaupdate ng value na ito ay nagupdate sa control na nasa touch bar. Ang pag-update sa mga malalalim na katangian sa loob ng hanay na ito ay **hindi nag-a-update sa touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

Isang`Integer`ang kumakatawan sa kasalukuyang selected segment. Ang agad na pagbabago ng value ay ina-update ang control sa touch bar. Ang pakikipag-ugnayan ng user sa touch bar ay awtomatikong i-update ang value nito.

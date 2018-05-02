## Class: TouchBarSegmentedControl

> Gumawa ng segmented control(isang button group) na kung saan ang isang button ay mayroong napiling kalagyan

Proseso: [Pangunahin](../tutorial/quick-start.md#main-process)

### `bagong TouchBarSegmentedControl(options)` *Experimental*

* `pagpipilian` Bagay 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `awtomatiko` -Default. Ang anyo ng segmented control ay awtomatikong natutokoy batay sa uri ng window kung saan ang control ay nakadisplay at nakaposisyon sa loob ng window.
    * `rounded` -Ang control ay naipapakita gamit ang mabilog na istilo.
    * `textured-rounded` -Ang control ay naipapakita gamit ang textured rounded style.
    * `round-rect`Ang control ay naipapakita gamit ang round rect style.
    * `textured-square` - Ang control ay naipapakita gamit ang textured square style.
    * `capsule` - Ang control ay naipapakita gamit ang capsule style.
    * `small-square` -Ang contol ay naipapakita gamit ang small square style.
    * `separated` - Ang mga segment sa control ay naka-display malapit sa isat'isa ngunit hindi hawakan.
  * `mode` String (optional) - The selection mode of the control: 
    * `single` - Default. Isang item ang napili sa isang pagkakataon, ang pagpili ng isang deselects sa dating napiling item.
    * `multiple` -Multiple items ay maaring mapili nang paisa-isa.
    * `buttons` -Gumawa ng mga segment act bilang mga button, bawat segment ay pinindot at inilabas pero hindi kailanman minarkahan bilang aktibo.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md)Isang array ng mga segment na dapat ilagay sa control nito.
  * `selectedIndex` Integer (opsyonal) - Ang index ng kasalukuyang selected segment, ay awtomatikong iaupdate sa pakikipag ugnayan ng user. Kapag ang mode ay maramihan ito ay magiging huling napiling item.
  * `pagbabago` Function-ito ay tinatawag kapag ang user ay pumili ng isang bagong segment. 
    * `selectedIndex` Integer - Ang index ng segment sa user na napili.
    * `isSelected` Boolean -Anuman ang bunga ng resulta ng user selection ng segment ay pinili o hindi.

### Katangian ng pagkakataon

Ang mga sumusunod na properties ay maaring gamitin sa mga pagkakataon ng`TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Isang `SegmentedControlSegment[]`array ang kumakatawan sa mga segment sa mga kontrol na ito. Ang pag-update sa halagang ito ay madaliang ina-update ang kontrol sa touch bar. Ang pag-update sa mga malalalim na katangian sa loob ng hanay na ito ay **hindi nag-a-update sa touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

Isang`Integer`ang kumakatawan sa kasalukuyang selected segment. Ang agad na pagbabago ng value ay ina-update ang control sa touch bar. Ang pakikipag-ugnayan ng user sa touch bar ay awtomatikong i-update ang value nito.
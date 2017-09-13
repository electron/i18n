## Class: TouchBarSegmentedControl

> Create a segmented control (a button group) where one button has a selected state

Process: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` _Experimental_

* `options` Object
  * `segmentStyle` String - (optional) Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is
      automatically determined based on the type of window in which the control
      is displayed and the position within the window.
    * `rounded` - The control is displayed using the rounded style.
    * `textured-rounded` - The control is displayed using the textured rounded
      style.
    * `round-rect` - The control is displayed using the round rect style.
    * `textured-square` - The control is displayed using the textured square
      style.
    * `capsule` - The control is displayed using the capsule style
    * `small-square` - The control is displayed using the small square style.
    * `separated` - The segments in the control are displayed very close to each
      other but not touching.
  * `mode` String - (optional) The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction.  When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Instance Properties

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style.  Updating this value immediately updates the control
in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control.  Updating this value immediately
updates the control in the touch bar.  Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment.  Changing this value immediately updates the control
in the touch bar.  User interaction with the touch bar will update this value automatically.

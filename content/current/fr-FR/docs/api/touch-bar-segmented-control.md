## Classe : TouchBarSegmentedControl

> Créer un contrôle segmenté (un groupe de bouton) où un seul bouton a un état sélectionné

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` _Experimental_

* `options` Object
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - The control is displayed using the rounded style. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - The control is displayed using the textured rounded style. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - The control is displayed using the round rect style. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - The control is displayed using the textured square style. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - The control is displayed using the capsule style. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - The control is displayed using the small square style. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - The segments in the control are displayed very close to each other but not touching. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Multiple items can be selected at a time. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un tableau de segments à placer dans ce contrôle.
  * `selectedIndex` Integer (facultatif) - L'index du segment actuellement sélectionné, mis automatiquement à jour avec une interaction utilisateur. When the mode is `multiple` it will be the last selected item.
  * `change` Function (optional) - Called when the user selects a new segment.
    * `selectedIndex` Integer - L'index du segment que l'utilisateur a sélectionné.
    * `isSelected` Boolean - Si après la selection de l'utilisateur, le segment est selectionné ou non.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSegmentedControl` :

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Un tableau de `SegmentedControlSegment[]`, qui représente les segments dans ce contrôle. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

Un `Integer` qui représente le segment sélectionné. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Une interaction utilisateur avec la touch bar mettra à jour cette valeur automatiquement.

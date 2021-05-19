## Classe : TouchBarSegmentedControl

> Créer un contrôle segmenté (un groupe de bouton) où un seul bouton a un état sélectionné

Processus : [Main](../glossary.md#main-process)

### `new TouchBarSegmentedControl(options)`

* Objet `options`
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatique` - Par défaut. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - Le contrôle est affiché en utilisant le style arrondi. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - Le contrôle est affiché en utilisant le style arrondi texturé. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - Le contrôle est affiché en utilisant le style arrondi rect. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - Le contrôle est affiché en utilisant le style carré texturé. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - Le contrôle s’affiche selon le style capsule. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - Le contrôle est affiché en utilisant le style petit carré. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - Les segments du contrôle sont affichés très proches entre eux, mais ne se touche pas. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Plusieurs éléments peuvent être sélectionnés simultanément. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Transforme les segments en boutons, chaque segment peut être pressé et relâché, mais jamais être marqué comme actif. Maps to `NSSegmentSwitchTrackingMomentary`.
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

Un tableau de `SegmentedControlSegment[]`, qui représente les segments dans ce contrôle. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

Un `Integer` qui représente le segment sélectionné. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Une interaction utilisateur avec la touch bar mettra à jour cette valeur automatiquement.

#### `touchBarSegmentedControl.mode`

A `String` representing the current selection mode of the control.  Can be `single`, `multiple` or `buttons`.

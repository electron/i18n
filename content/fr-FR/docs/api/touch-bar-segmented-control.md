## Classe : TouchBarSegmentedControl

> Créer un contrôle segmenté (un groupe de bouton) où un seul bouton a un état sélectionné

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `options` Object 
  * `segmentStyle` String - (facultatif) Style des segments : 
    * `automatic` - Par défaut. L’apparence du contrôle segmenté est déterminé automatiquement selon le type de fenêtre dans lequel le contrôle est affiché et la position dans la fenêtre.
    * `rounded` - Le contrôle est affiché en utilisant le style arrondi.
    * `textured-rounded` - Le contrôle est affiché en utilisant le style arrondi texturé.
    * `round-rect` - Le contrôle est affiché en utilisant le style arrondi rect.
    * `textured-square` - Le contrôle est affiché en utilisant le style carré texturé.
    * `capsule` - Le contrôle s’affiche selon le style capsule
    * `small-square` - Le contrôle est affiché en utilisant le style petit carré.
    * `separated` - Les segments du contrôle sont affichés très proches entre eux, mais ne se touche pas.
  * `mode` String - (optional) The selection mode of the control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSegmentedControl` :

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.
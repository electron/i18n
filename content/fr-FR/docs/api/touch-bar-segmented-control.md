## Classe : TouchBarSegmentedControl

> Créer un contrôle segmenté (un groupe de bouton) où un seul bouton a un état sélectionné

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `options` Objet 
  * `segmentStyle` String - (optional) Style of the segments: 
    * `automatic` - Par défaut. L’apparence du contrôle segmenté est déterminé automatiquement selon le type de fenêtre dans lequel le contrôle est affiché et la position dans la fenêtre.
    * `rounded` - Le contrôle est affiché en utilisant le style arrondi.
    * `textured-rounded` - Le contrôle est affiché en utilisant le style arrondi texturé.
    * `round-rect` - Le contrôle est affiché en utilisant le style arrondi rect.
    * `textured-square` - Le contrôle est affiché en utilisant le style carré texturé.
    * `capsule` - The control is displayed using the capsule style
    * `small-square` - Le contrôle est affiché en utilisant le style petit carré.
    * `separated` - Les segments du contrôle sont affichés très proches entre eux, mais ne se touche pas.
  * `mode` String - (optional) The selection mode of the control: 
    * `single` - Par défaut. Un élément sélectionné à la fois, en sélectionner un va désélectionner l'élément précédemment sélectionné.
    * `multiple` - Plusieurs éléments peuvent être sélectionnés simultanément.
    * `buttons` - Transforme les segments en boutons, chaque segment peut être pressé et relâché, mais jamais être marqué comme actif.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un tableau de segments à placer dans ce contrôle.
  * `selectedIndex` Integer (facultatif) - L'index du segment actuellement sélectionné, mis automatiquement à jour avec une interaction utilisateur. Lorsque le mode est multiple, cela sera le dernier élément sélectionné.
  * `change` Function - Called when the user selects a new segment 
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
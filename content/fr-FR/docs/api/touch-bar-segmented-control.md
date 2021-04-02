## Classe : TouchBarSegmentedControl

> Créer un contrôle segmenté (un groupe de bouton) où un seul bouton a un état sélectionné

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarSegmentedControl (options)`

* `options` objet
  * `segmentStyle` String (facultatif) - Style des segments:
    * `automatique` - Par défaut. L’apparence de la commande segmentée est automatiquement déterminée en fonction du type de fenêtre dans laquelle le de commande est affiché et de la position à l’intérieur de la fenêtre. Cartes à `NSSegmentStyleAutomatic`.
    * `rounded` - Le contrôle est affiché en utilisant le style arrondi. Cartes à `NSSegmentStyleRounded`.
    * `textured-rounded` - Le contrôle est affiché en utilisant le style arrondi texturé. Cartes à `NSSegmentStyleTexturedRounded`.
    * `round-rect` - Le contrôle est affiché en utilisant le style arrondi rect. Cartes à `NSSegmentStyleRoundRect`.
    * `textured-square` - Le contrôle est affiché en utilisant le style carré texturé. Cartes à `NSSegmentStyleTexturedSquare`.
    * `capsule` - Le contrôle s’affiche selon le style capsule. Cartes à `NSSegmentStyleCapsule`.
    * `small-square` - Le contrôle est affiché en utilisant le style petit carré. Cartes à `NSSegmentStyleSmallSquare`.
    * `separated` - Les segments du contrôle sont affichés très proches entre eux, mais ne se touche pas. Cartes à `NSSegmentStyleSeparated`.
  * `mode` String (facultatif) - Le mode de sélection du contrôle:
    * `single` - Par défaut. Un élément sélectionné à la fois, en sélectionnant l’un deselects l’élément précédemment sélectionné. Cartes à `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Plusieurs éléments peuvent être sélectionnés simultanément. Cartes à `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Transforme les segments en boutons, chaque segment peut être pressé et relâché, mais jamais être marqué comme actif. Cartes à `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un tableau de segments à placer dans ce contrôle.
  * `selectedIndex` Integer (facultatif) - L'index du segment actuellement sélectionné, mis automatiquement à jour avec une interaction utilisateur. Lorsque le mode est `multiple` ce sera le dernier élément sélectionné.
  * `change` (facultatif) - Appelé lorsque l’utilisateur sélectionne un nouveau segment.
    * `selectedIndex` Integer - L'index du segment que l'utilisateur a sélectionné.
    * `isSelected` Boolean - Si après la selection de l'utilisateur, le segment est selectionné ou non.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSegmentedControl` :

#### `touchBarSegmentedControl.segmentStyle`

Un `String` représentant le style de segment actuel des contrôles. La mise à jour de cette valeur met immédiatement à jour contrôle dans la barre tactile.

#### `touchBarSegmentedControl.segments`

Un tableau de `SegmentedControlSegment[]`, qui représente les segments dans ce contrôle. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarSegmentedControl.selectedIndex`

Un `Integer` qui représente le segment sélectionné. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Une interaction utilisateur avec la touch bar mettra à jour cette valeur automatiquement.

#### `touchBarSegmentedControl.mode`

Un `String` représentant le mode de sélection actuel du contrôle.  Peut être `single`, `multiple` ou `buttons`.

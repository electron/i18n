## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Object 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber
  * `select` Function - Called when the user taps an item that was not the last tapped item 
    * `selectedIndex` Integer - The index of the item the user selected
  * `highlight` Function - Called when the user taps any item 
    * `highlightedIndex` Integer - The index of the item the user touched
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle` String - Selected overlay item style. Defaults to `null`.
  * `showArrowButtons` Boolean - `false` par défaut.
  * `mode` String - `free` par défaut.
  * `continuous` Boolean - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarSegmentedControl.items`

A `ScrubberItem[]` array representing the items in this scrubber. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarSegmentedControl.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actuellement null, aucune chaîne de caractère. Supprime tous les styles.

#### `touchBarSegmentedControl.overlayStyle`

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actuellement null, aucune chaîne de caractère. Supprime tous les styles.

#### `touchBarSegmentedControl.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Mappé à `NSScrubberModeFixed`
* `free` - Mappé à `NSScrubberModeFree`

#### `touchBarSegmentedControl.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.
## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Object 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber
  * `select` Function - Appelée lorsque l'utilisateur clique sur un élément qui n'était par le dernier élément cliqué 
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné
  * `highlight` Function - Appelée lorsque l'utilisateur clique sur un élément quelconque 
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné
  * `selectedStyle` String - Le style de l'élément sélectionné. `null` par défaut.
  * `overlayStyle` String - Le style de l'élément superposé. `null` par défaut.
  * `showArrowButtons` Boolean - `false` par défaut.
  * `mode` String - `free` par défaut.
  * `continuous` Boolean - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarSegmentedControl.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarSegmentedControl.selectedStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actuellement null, aucune chaîne de caractère. Supprime tous les styles.

#### `touchBarSegmentedControl.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

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
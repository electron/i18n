## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarScrubber(options)` _Experimental_

* `options` Object
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber.
  * `select` Function - Called when the user taps an item that was not the last tapped item.
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `highlight` Function - Called when the user taps any item.
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle` String - Selected overlay item style. Defaults to `null`.
  * `showArrowButtons` Boolean - `false` par défaut.
  * `mode` String - `free` par défaut.
  * `continuous` Boolean - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarScrubber.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarScrubber.selectedStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actuellement nulle, pas de chaîne de caractères, supprime tous les styles.

#### `touchBarScrubber.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actuellement nulle, pas de chaîne de caractères, supprime tous les styles.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `fixed` - Mappé à `NSScrubberModeFixed`.
* `free` - Mappé à `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.

## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Objet 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber.
  * `select` Function - Appelée lorsque l'utilisateur clique sur un élément qui n'était par le dernier élément cliqué. 
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `highlight` Function - Appelée lorsque l'utilisateur clique sur un élément quelconque. 
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `selectedStyle` String - Le style de l'élément sélectionné. `null` par défaut.
  * `overlayStyle` String - Le style de l'élément superposé. `null` par défaut.
  * `showArrowButtons` Boolean - `false` par défaut.
  * `mode` String - `free` par défaut.
  * `continuous` Boolean - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarScrubber.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

Un `Boolean` si l'on affiche les flèches de sélection à droite et à gauche dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.

#### `touchBarScrubber.mode`

Un `String` représentant le mode de ce scrubber. Changer cette valeur immédiatement met à jour dans la touch bar. Valeurs possible :

* `fixed` - Mappé à `NSScrubberModeFixed`.
* `free` - Mappé à `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Boolean` représentant si ce scrubber est permanent ou non. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.
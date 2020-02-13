## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Objet 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber.
  * `select` Function (optionnel) - Appelée lorsque l'utilisateur clique sur un élément qui n'était par le dernier élément cliqué. 
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `highlight` Function (optionnel) - Appelée lorsque l'utilisateur clique sur un élément quelconque. 
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `selectedStyle` String (optional) - Selected item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `overlayStyle` String (optional) - Selected overlay item style. Can be `background`, `outline` or `none`. Defaults to `none`.
  * `showArrowButtons` Boolean (optionnel) - `false` par défaut.
  * `mode` String (optional) - Can be `fixed` or `free`. The default is `free`.
  * `continuous` Boolean (optionnel) - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarScrubber.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarScrubber.selectedStyle`

Une `String` représentant le style que l'item sélectionné dans le scrubber devrait avoir. Mettre à jour cette valeur met à jour immédiatement le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Removes all styles.

#### `touchBarScrubber.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Removes all styles.

#### `touchBarScrubber.showArrowButtons`

Un `Boolean` si l'on affiche les flèches de sélection à droite et à gauche dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.

#### `touchBarScrubber.mode`

Un `String` représentant le mode de ce scrubber. Changer cette valeur immédiatement met à jour dans la touch bar. Valeurs possible :

* `fixed` - Mappé à `NSScrubberModeFixed`.
* `free` - Mappé à `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Boolean` représentant si ce scrubber est permanent ou non. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.
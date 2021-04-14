## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarScrubber (options)`

* `options` objet
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber.
  * `select` (facultatif) - Appelé lorsque l’utilisateur tape sur un élément qui n’était pas le dernier élément tapé.
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `highlight` (facultatif) - Appelé lorsque l’utilisateur tape sur n’importe quel élément.
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `selectedStyle` String (facultatif) - Style d’article sélectionné. Peut être `background`, `outline` ou `none`. Par défaut à `none`.
  * `overlayStyle` String (facultatif) - Style d’élément de superposition sélectionné. Peut être `background`, `outline` ou `none`. Par défaut à `none`.
  * `showArrowButtons` Boolean (optionnel) - `false` par défaut.
  * `mode` String (facultatif) - Peut être `fixed` ou `free`. La valeur par défaut `free`.
  * `continuous` Boolean (optionnel) - `true` par défaut.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarScrubber.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarScrubber.selectedStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Supprime tous les styles.

#### `touchBarScrubber.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Supprime tous les styles.

#### `touchBarScrubber.showArrowButtons`

Un `Boolean` représentant s’il y a lieu de montrer les flèches de sélection gauche/droite dans cet épurateur. La mise à jour de la mise à jour immédiate du contrôle dans la barre tactile.

#### `touchBarScrubber.mode`

Un `String` représentant le mode de cet épurateur. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `fixed` - Mappé à `NSScrubberModeFixed`.
* `free` - Mappé à `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Boolean` représentant si cet épurateur est continu ou non. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.

## Classe : TouchBarScrubber

> Créer un scrubber (un sélecteur de défilement)

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarScrubber(options)` *Experimental*

* `options` Objet 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - Un tableau d'éléments à placer dans ce scrubber.
  * `select` Function (optional) - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `highlight` Function (optional) - Called when the user taps any item. 
    * `highlightedIndex` Integer - L'index de l'élément que l'utilisateur a sélectionné.
  * `selectedStyle` String (optional) - Selected item style. Defaults to `null`.
  * `overlayStyle` String (optional) - Selected overlay item style. Defaults to `null`.
  * `showArrowButtons` Boolean (optional) - Defaults to `false`.
  * `mode` String (optional) - Defaults to `free`.
  * `continuous` Boolean (optional) - Defaults to `true`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarScrubber` :

#### `touchBarScrubber.items`

Un tableau de `ScrubberItem[]`représentant les éléments dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Changer une propriété dans le tableau **ne met pas à jour la touch bar**.

#### `touchBarScrubber.selectedStyle`

Une `String` représentant le style que l'item sélectionné dans le scrubber devrait avoir. Mettre à jour cette valeur met à jour immédiatement le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actuellement nulle, pas de chaîne de caractères, supprime tous les styles.

#### `touchBarScrubber.overlayStyle`

Un `String` représentant le style des éléments sélectionnés dans le scrubber. Ce style est superposé sur le dessus de l'élément scrubber au lieu d'être placé derrière. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar. Valeurs possibles :

* `background` - Mappé à `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mappé à `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actuellement nulle, pas de chaîne de caractères, supprime tous les styles.

#### `touchBarScrubber.showArrowButtons`

Un `Boolean` si l'on affiche les flèches de sélection à droite et à gauche dans ce scrubber. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.

#### `touchBarScrubber.mode`

Un `String` représentant le mode de ce scrubber. Changer cette valeur immédiatement met à jour dans la touch bar. Valeurs possible :

* `fixed` - Mappé à `NSScrubberModeFixed`.
* `free` - Mappé à `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Boolean` représentant si ce scrubber est permanent ou non. Changer cette valeur immédiatement met à jour le contrôle dans la touch bar.
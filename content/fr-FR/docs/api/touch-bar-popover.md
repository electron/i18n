## Classe : TouchBarPopover

> Créer un popover dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarPopover (options)`

* `options` objet
  * `label` String (facultatif) - Texte du bouton popover.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton popover.
  * `items` [TouchBar](touch-bar.md) - Éléments à afficher dans le popover.
  * `showCloseButton` Boolean (facultatif) - `true` pour afficher un bouton proche à gauche du popover, `false` de ne pas le montrer. La valeur par défaut est `true`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarPopover` :

#### `touchBarPopover.label`

Un `String` représentant le texte actuel du bouton du popover. Changer cette valeur met immédiatement à jour popover dans la barre tactile.

#### `touchBarPopover.icon`

Un `NativeImage` représentant l’icône de bouton actuelle du popover. Changer cette valeur met immédiatement à jour popover dans la barre tactile.

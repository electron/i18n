## Classe : TouchBarPopover

> Créer un popover dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarPopover(options)` *Experimental*

* `options` Objet 
  * `label` String (facultatif) - Texte du bouton popover.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton popover.
  * `items` [TouchBar](touch-bar.md) (facultatif) - Elements à afficher dans le popover.
  * `showCloseButton` Boolean (facultatif) - `true` pour afficher un bouton fermer sur la gauche du popover, `false` pour ne pas l'afficher. Par defaut `true`.

### Instance Properties

Les propriétés suivantes sont disponibles pour les instances de `TouchBarPopover` :

#### `touchBarPopover.label`

Un `String` représentant le texte du bouton du popover actuel. Changer cette valeur met à jour immédiatement le popover dans la touch bar.

#### `touchBarPopover.icon`

Une `NativeImage` représentant l'icône du bouton du popover actuel. Changer cette valeur met à jour immédiatement le popover dans la touch bar.
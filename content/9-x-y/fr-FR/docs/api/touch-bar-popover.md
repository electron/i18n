## Classe : TouchBarPopover

> Créer un popover dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarPopover(options)` _Experimental_

* `options` Object
  * `label` String (facultatif) - Texte du bouton popover.
  * `icon` [NativeImage](native-image.md) (facultatif) - Icône du bouton popover.
  * `items` [TouchBar](touch-bar.md) - Items to display in the popover.
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. La valeur par défaut est `true`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarPopover` :

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.

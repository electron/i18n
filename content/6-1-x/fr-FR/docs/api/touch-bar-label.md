## Classe : TouchBarLabel

> Créer un label dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _Experimental_

* `options` Object
  * `label` String (facultatif) - Texte à afficher.
  * `textColor` String (facultatif) - Couleur hexadécimal du texte, c.-à-d. `#ABCDEF`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarLabel` :

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

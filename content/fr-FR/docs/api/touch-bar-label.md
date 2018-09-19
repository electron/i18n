## Classe : TouchBarLabel

> Créer un label dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarLabel(options)` *Experimental*

* `options` Objet 
  * `label` String (facultatif) - Texte à afficher.
  * `textColor` String (facultatif) - Couleur hexadécimal du texte, c.-à-d. `#ABCDEF`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarLabel` :

#### `touchBarLabel.label`

Un `String` représentant le texte du label actuel. Changer cette valeur met à jour immédiatement le label dans la touch bar.

#### `touchBarLabel.textColor`

Un `String` représentant la couleur du texte du label actuel. Changer cette valeur met à jour immédiatement le label dans la touch bar.
## Classe : TouchBarColorPicker

> Créer un sélecteur de couleur dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarColorPicker (options)`

* `options` objet
  * `availableColors` String[] (facultatif) - Tableau de chaîne de caractères de couleurs en hexadécimal pouvant être choisi.
  * `selectedColor` String (facultatif) - La couleur en hexadécimal selectionné dans le sélecteur, c.-à-d. `#ABCDEF`.
  * `change` fonction (facultatif) - Fonction d’appel lorsqu’une couleur est sélectionnée.
    * `color` String - La couleur que l'utilisateur a sélectionnée dans le sélecteur.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarColorPicker` :

#### `touchBarColorPicker.availableColors`

Un `String[]` représentant les couleurs disponibles du cueilleur de couleurs à sélectionner. Modification immédiate de cette valeur met à jour le cueilleur de couleurs dans la barre tactile.

#### `touchBarColorPicker.selectedColor`

Un `String` code hex représentant la couleur actuellement sélectionnée par le cueilleur de couleurs. Modification immédiate de cette valeur met à jour le cueilleur de couleurs dans la barre tactile.

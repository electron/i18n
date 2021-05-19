## Classe : TouchBarColorPicker

> Créer un sélecteur de couleur dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarColorPicker(options)`

* Objet `options`
  * `availableColors` String[] (facultatif) - Tableau de chaîne de caractères de couleurs en hexadécimal pouvant être choisi.
  * `selectedColor` String (facultatif) - La couleur en hexadécimal selectionné dans le sélecteur, c.-à-d. `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `color` String - La couleur que l'utilisateur a sélectionnée dans le sélecteur.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarColorPicker` :

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.

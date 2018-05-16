## Classe : TouchBarColorPicker

> Créer un sélecteur de couleur dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Experimental*

* `options` Objet 
  * `availableColors` String[] (facultatif) - Tableau de chaîne de caractères de couleurs en hexadécimal pouvant être choisi.
  * `selectedColor` String (facultatif) - La couleur en hexadécimal selectionné dans le sélecteur, c.-à-d. `#ABCDEF`.
  * `change` Function (facultatif) - Fonction à appeler lorsque qu'une couleur est sélectionnée. 
    * `color` String - The color that the user selected from the picker.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarColorPicker` :

#### `touchBarColorPicker.availableColors`

Un tableau de `String[]` représentant les couleurs disponible du sélecteur de couleur. Changer cette valeur met à jour immédiatement le sélecteur de couleur dans la touch bar.

#### `touchBarColorPicker.selectedColor`

Un `String` contenant un code hexadécimal représentant la couleur sélectionné dans le sélecteur de couleur. Changer cette valeur met à jour immédiatement le sélecteur de couleur dans la touch bar.
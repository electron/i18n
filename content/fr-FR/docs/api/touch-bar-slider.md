## Classe : TouchBarSlider

> Créer un curseur dans la touch bar pour les applications native macOS

Processus : [Principal](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *Experimental*

* `options` Objet 
  * `label` Chaîne de caractères (facultatif) - Texte du label.
  * `value` Entier (facultatif) - Valeur sélectionnée.
  * `minValue` Entier (facultatif) - Valeur minimale.
  * `maxValue` Entier (facultatif) - Valeur maximale.
  * `change` Fonction (facultatif) - Fonction à appeler lorsque que le curseur est modifié. 
    * `newValue` Nombre - La valeur que l'utilisateur a sélectionnée sur le curseur

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSlider` :

#### `touchBarSlider.label`

Une `Chaîne de caractères` représentant le texte du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.value`

Un `Nombre` représentant la valeur du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.minValue`

Un `Nombre` représentant la valeur minimale du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.maxValue`

Un `Nombre` représentant la valeur maximale du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.
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

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
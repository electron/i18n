## Classe : TouchBarSlider

> Créer un curseur dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarSlider(options)`

* Objet `options`
  * `label` String (facultatif) - Texte du label.
  * `value` Integer (facultatif) - Valeur sélectionnée.
  * `minValue` Integer (facultatif) - Valeur minimale.
  * `maxValue` Integer (facultatif) - Valeur maximale.
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Number - La valeur que l'utilisateur a sélectionnée sur le curseur.

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

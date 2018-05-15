## Classe : TouchBarSlider

> Créer un curseur dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *Experimental*

* `options` Objet 
  * `label` String (facultatif) - Texte du label.
  * `value` Integer (facultatif) - Valeur sélectionnée.
  * `minValue` Integer (facultatif) - Valeur minimale.
  * `maxValue` Integer (facultatif) - Valeur maximale.
  * `change` Function (facultatif) - Fonction à appeler lorsque que le curseur est modifié. 
    * `newValue` Number - La valeur que l'utilisateur a sélectionnée sur le curseur.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSlider` :

#### `touchBarSlider.label`

Un `String` représentant le texte du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.value`

Un `Number` représentant la valeur du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.minValue`

Un `Number` représentant la valeur minimale du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.

#### `touchBarSlider.maxValue`

Un `Number` représentant la valeur maximale du curseur actuel. Changer cette valeur met à jour immédiatement le curseur dans la touch bar.
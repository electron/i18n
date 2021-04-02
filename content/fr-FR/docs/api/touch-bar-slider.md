## Classe : TouchBarSlider

> Créer un curseur dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarSlider (options)`

* `options` objet
  * `label` String (facultatif) - Texte du label.
  * `value` Integer (facultatif) - Valeur sélectionnée.
  * `minValue` Integer (facultatif) - Valeur minimale.
  * `maxValue` Integer (facultatif) - Valeur maximale.
  * `change` fonction (facultatif) - Fonction d’appel lorsque le curseur est modifié.
    * `newValue` Number - La valeur que l'utilisateur a sélectionnée sur le curseur.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSlider` :

#### `touchBarSlider.label`

Un `String` représentant le texte actuel du curseur. La modification de cette valeur met immédiatement à jour le curseur dans la barre tactile.

#### `touchBarSlider.value`

Un `Number` représentant la valeur actuelle du curseur. La modification de cette valeur met immédiatement à jour le curseur dans la barre tactile.

#### `touchBarSlider.minValue`

Un `Number` représentant la valeur minimale actuelle du curseur. La modification de cette valeur met immédiatement à jour curseur de la barre tactile.

#### `touchBarSlider.maxValue`

Un `Number` représentant la valeur maximale actuelle du curseur. La modification de cette valeur met immédiatement à jour curseur de la barre tactile.

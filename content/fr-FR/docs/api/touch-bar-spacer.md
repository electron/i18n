## Classe : TouchBarSpacer

> Créer un espacement entre deux éléments dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `nouveau TouchBarSpacer (options)`

* `options` objet
  * `size` String (facultatif) - Taille de l’espaceur, les valeurs possibles sont:
    * `small` - petit espacement entre les éléments. Cartes à `NSTouchBarItemIdentifierFixedSpaceSmall`. C’est la valeur par défaut.
    * `large` - grand espacement entre les éléments. Cartes à `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Prend tout l'espace disponible. Cartes à `NSTouchBarItemIdentifierFlexibleSpace`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles sur les instances de `TouchBarSpacer`:

#### `touchBarSpacer.size TouchBarSpacer.size TouchBarSpacer.size touchBar`

Un `String` représentant la taille de l’espaceur.  Peut être `small`, `large` ou `flexible`.

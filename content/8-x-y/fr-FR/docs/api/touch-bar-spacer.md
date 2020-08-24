## Classe : TouchBarSpacer

> Créer un espacement entre deux éléments dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _Experimental_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - petit espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - grand espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Prend tout l'espace disponible. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

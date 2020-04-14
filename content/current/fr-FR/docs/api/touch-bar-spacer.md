## Classe : TouchBarSpacer

> Créer un espacement entre deux éléments dans la touch bar pour les applications native macOS

Processus : [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *Experimental*

* `options` Objet 
  * `size` String (facultatif) - Taille d'espacement, les valeurs possibles sont : 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
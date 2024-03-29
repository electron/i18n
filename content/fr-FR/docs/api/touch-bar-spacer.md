## Classe : TouchBarSpacer

> Créer un espacement entre deux éléments dans la touch bar pour les applications native macOS

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### `new TouchBarSpacer(options)`

* Objet `options`
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - petit espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - grand espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Prend tout l'espace disponible. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBarSpacer` :

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.

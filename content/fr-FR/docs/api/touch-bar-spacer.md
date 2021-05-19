## Classe : TouchBarSpacer

> Créer un espacement entre deux éléments dans la touch bar pour les applications native macOS

Processus : [Main](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* Objet `options`
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - petit espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - grand espacement entre les éléments. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Prend tout l'espace disponible. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

### Propriétés d'instance

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.

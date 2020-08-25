## Classe: TouchBarSpacer

> Crea uno spaziatore tra due elementi nella barra touch per applicazioni macOS native

Processo: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Piccolo spazio tra elementi. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Grande spazio tra elementi. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Occupa tutto lo spazio disponibile. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

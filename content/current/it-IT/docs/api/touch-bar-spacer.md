## Classe: TouchBarSpacer

> Crea uno spaziatore tra due elementi nella barra touch per applicazioni macOS native

Processo: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *Experimental*

* `options` Oggetto 
  * `size` Stringa (opzionale) - Dimensione dello spaziatore, i possibili valori sono: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
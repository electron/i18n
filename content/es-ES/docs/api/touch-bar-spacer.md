## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` *Experimental*

* `opciones` Objeto 
  * `tamaño` Cadena (opcional) - Tamaño del espaciador. Los valores posibles son: 
    * `small` - Small space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Large space between items. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Take up all available space. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
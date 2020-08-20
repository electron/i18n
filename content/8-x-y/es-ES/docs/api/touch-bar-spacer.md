## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _Experimental_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Espacio pequeño entre los elementos. Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * `large` - Espacio grande entre los elementos. Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupa todo el espacio disponible. Maps to `NSTouchBarItemIdentifierFlexibleSpace`.

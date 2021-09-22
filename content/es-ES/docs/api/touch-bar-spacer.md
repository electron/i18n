## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Espacio pequeño entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceSmall`. Este es el valor predeterminado.
    * `large` - Espacio grande entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupa todo el espacio disponible. Mapea a `NSTouchBarItemIdentifierFlexibleSpace`.

### Propiedades de la instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Puede ser `small`, `large` o `flexible`.

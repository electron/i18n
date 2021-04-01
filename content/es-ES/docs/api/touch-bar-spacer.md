## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarSpacer(options)`

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Espacio pequeño entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceSmall`. Este es el valor predeterminado.
    * `large` - Espacio grande entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupa todo el espacio disponible. Mapea a `NSTouchBarItemIdentifierFlexibleSpace`.

### Propiedades de Instancia

The following properties are available on instances of `TouchBarSpacer`:

#### `touchBarSpacer.size`

A `String` representing the size of the spacer.  Can be `small`, `large` or `flexible`.

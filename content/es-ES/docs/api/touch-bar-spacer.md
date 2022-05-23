## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)<br /> _Esta clase no está exportada desde el módulo `'electron'`. Sólo está disponible como un valor de retorno de otros métodos en la API de Electron._

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

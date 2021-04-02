## Clase: TouchBarSpacer

> Crea un espaciador entre dos elementos en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `nuevo TouchBarSpacer (opciones)`

* `options` Object
  * `size` String (opcional)-tamaño del espaciador, los valores posibles son:
    * `small` - Espacio pequeño entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceSmall`. Este es el valor predeterminado.
    * `large` - Espacio grande entre los elementos. Mapea a `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * `flexible` - Ocupa todo el espacio disponible. Mapea a `NSTouchBarItemIdentifierFlexibleSpace`.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSpacer`:

#### `touchBarSpacer. Size`

Una `String` que representa el tamaño del espaciador.  Puede ser `small`, `large` o `flexible`.

## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo botón en la barra tactil(opciones)` _Experimental_

* `options` Object
  * `Etiqueta` cadena (opcional) - Texto del fondo.
  * `Color del fondo` Cadena (opcional) - Color del fondo en formato hex, ejemplo: `#ABCDEF`.
  * `icono` [imagen nativa](native-image.md) (opcional) - ícono en el fondo.
  * `posición del ícono` Cadena (opcional) - Puede ser `izquierda`, `derecha` o `superpuesto`.
  * `click` Función (opcional) - Función a llamar cuando se hace click en el fondo.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `nuevo botón en la barra tactil(opciones)` *Experimental*

* `options` Object 
  * `etiqueta` Cadena (optional) - botón del fondo.
  * `backgroundColor` String (optional) - Button background color in hex format, i.e `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`.
  * `click` Function (optional) - Function to call when the button is clicked.

### Propiedades de Instancia

The following properties are available on instances of `TouchBarButton`:

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
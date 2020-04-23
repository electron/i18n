## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo botón en la barra tactil(opciones)` _Experimental_

* `options` Object
  * `Etiqueta` cadena (opcional) - Texto del fondo.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `Color del fondo` Cadena (opcional) - Color del fondo en formato hex, ejemplo: `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `posición del ícono` Cadena (opcional) - Puede ser `izquierda`, `derecha` o `superpuesto`. Defaults to `overlay`.
  * `click` Función (opcional) - Función a llamar cuando se hace click en el fondo.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propiedades de Instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

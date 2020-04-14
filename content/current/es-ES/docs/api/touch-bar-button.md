## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo botón en la barra tactil(opciones)` *Experimental*

* `opciones` Object 
  * `Etiqueta` cadena (opcional) - Texto del fondo.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `Color del fondo` Cadena (opcional) - Color del fondo en formato hex, ejemplo: `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (optional) - Button icon.
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Función (opcional) - Función a llamar cuando se hace click en el fondo.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propiedades de Instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

Una `String` que representa el texto actual del botón. Cambiar este valor actualiza el botón en la barra táctil.

#### `touchBarButton.backgroundColor`

Un código hex `String` que representa el color de fondo actual del botón. Cambiar este valor actualiza inmediatamente el botón en la barra táctil.

#### `touchBarButton.icon`

Un `NativeImage` que representa el icono actual del botón. Cambiar este valor actualiza inmediatamente el botón en la barra táctil.
## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarButton(options)`

* `options` Object
  * `Etiqueta` cadena (opcional) - Texto del fondo.
  * `accessibilityLabel` String (opcional) - Una breve descripción del botón para su uso por lectores de pantalla como VoiceOver.
  * `Color del fondo` Cadena (opcional) - Color del fondo en formato hex, ejemplo: `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (opcional) - Icono del botón.
  * `posición del ícono` Cadena (opcional) - Puede ser `izquierda`, `derecha` o `superpuesto`. Defaults to `overlay`.
  * `click` Función (opcional) - Función a llamar cuando se hace click en el fondo.
  * `enabled` Boolean (optional) - Whether the button is in an enabled state.  Por defecto es `true`.

Al definir `accessibilityLabel`, asegúrese de que ha considerado las [mejores prácticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) de macOS.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarButton`:

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

Un `NativeImage` que representa el icono del botón actual. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.iconPosition`

A `String` - Can be `left`, `right` or `overlay`.  Defaults to `overlay`.

#### `touchBarButton.enabled`

A `Boolean` representing whether the button is in an enabled state.

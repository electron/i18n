## Clase: TouchBarLabel

> Crea una etiqueta en la barra táctil para aplicaciones nativas a macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `Nueva etiqueta en la barra táctil(opciones)` *Experimental*

* `opciones` Object 
  * `etiqueta` Cadena (opcional) - texto a mostrar.
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `Color del texto` cadena (opcional) - color del texto en hex, ejemplo `#ABCDEF`.

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `etiqueta de barra táctil`:

#### `touchBarLabel.label`

Una `cadena` representando la etiqueta actual del texto. Cambiar este valor actualizará inmediatamente la etiqueta en la barra táctil.

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

Una `Cadena` de código hex representando la etiqueta del color del texto actual. Cambiar este valor actualizará inmediatamente la etiqueta en la barra de táctil.
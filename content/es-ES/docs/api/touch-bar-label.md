## Clase: TouchBarLabel

> Crea una etiqueta en la barra táctil para aplicaciones nativas a macOS

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* `options` Object
  * `etiqueta` Cadena (opcional) - texto a mostrar.
  * `accessibilityLabel` String (opcional) - Una breve descripción del botón para su uso por lectores de pantalla como VoiceOver.
  * `Color del texto` cadena (opcional) - color del texto en hex, ejemplo `#ABCDEF`.

Al definir `accessibilityLabel`, asegúrese de que ha considerado las [mejores prácticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) de macOS.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `etiqueta de barra táctil`:

#### `touchBarLabel.label`

Un `String` que representa el texto actual de la etiqueta. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.accessibilityLabel`

Un `String` que representa la descripción de la etiqueta a ser leído por un lector de pantalla.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

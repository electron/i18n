## Clase: TouchBarButton

> Crea un botón en la barra táctil para aplicaciones macOS nativas

Proceso: [Main](../glossary.md#main-process)

### `nuevo TouchBarButton (opciones)`

* `options` Object
  * `Etiqueta` cadena (opcional) - Texto del fondo.
  * `accessibilityLabel` String (opcional) - Una breve descripción del botón para su uso por lectores de pantalla como VoiceOver.
  * `Color del fondo` Cadena (opcional) - Color del fondo en formato hex, ejemplo: `#ABCDEF`.
  * `icon` [NativeImage](native-image.md) | String (opcional) - Icono del botón.
  * `posición del ícono` Cadena (opcional) - Puede ser `izquierda`, `derecha` o `superpuesto`. El valor predeterminado es `overlay`.
  * `click` Función (opcional) - Función a llamar cuando se hace click en el fondo.
  * `enabled` Boolean (opcional)-si el botón está en un estado habilitado.  Por defecto es `true`.

Al definir `accessibilityLabel`, asegúrese de que ha considerado las [mejores prácticas](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) de macOS.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en las instancias de `TouchBarButton`:

#### `touchBarButton. accessibilityLabel`

Una `String` que representa la descripción del botón que leerá un lector de pantalla. Los lectores de pantalla solo los leerán si no se establece ninguna etiqueta.

#### `touchBarButton.label`

Una `String` que representa el texto actual del botón. Si cambias este valor de inmediato, se actualiza el botón en Touch bar.

#### `touchBarButton.backgroundColor`

Un `String` código hexadecimal que representa el color de fondo actual del botón. Si cambias este valor de inmediato, se actualiza el botón en la Touch bar.

#### `touchBarButton.icon`

Un `NativeImage` que representa el icono del botón actual. Si cambias este valor de inmediato, se actualiza el botón en Touch bar.

#### `touchBarButton. iconPosition`

Una `String` -puede ser `left`, `right` o `overlay`.  El valor predeterminado es `overlay`.

#### `touchBarButton. Enabled`

Una `Boolean` que representa si el botón está en un estado habilitado.

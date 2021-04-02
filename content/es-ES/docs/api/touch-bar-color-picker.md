## Clase: Seleccionador de color de la barra táctil

> Crea un seleccionador de color en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `nuevo TouchBarColorPicker (opciones)`

* `options` Object
  * `Colores disponibles` Cadena[] (opcional) - arreglo de códigos hexadecimales de los colores a aparecer como colores posibles a seleccionar.
  * `Color seleccionado` Cadena (opcional) - El código de color hexadecimal en el seleccionador, ejemplo `#ABCDEF`.
  * Función de `change` (opcional)-función a la que se llama cuando se selecciona un color.
    * `color` Cadena - El color que el usuario seleccionó de entre las opciones.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Seleccionador de color de la barra táctil`:

#### `touchBarColorPicker.availableColors`

Un `String[]` array que representa los colores disponibles del selector de color para seleccionar. Si cambias este valor de inmediato actualiza el selector de color en la Touch bar.

#### `touchBarColorPicker.selectedColor`

Un `String` código hexadecimal que representa el color seleccionado actualmente en el selector de color. Si cambias este valor de inmediato actualiza el selector de color en la Touch bar.

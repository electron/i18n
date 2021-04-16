## Clase: Seleccionador de color de la barra táctil

> Crea un seleccionador de color en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarColorPicker(options)`

* `options` Object
  * `Colores disponibles` Cadena[] (opcional) - arreglo de códigos hexadecimales de los colores a aparecer como colores posibles a seleccionar.
  * `Color seleccionado` Cadena (opcional) - El código de color hexadecimal en el seleccionador, ejemplo `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `color` Cadena - El color que el usuario seleccionó de entre las opciones.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Seleccionador de color de la barra táctil`:

#### `touchBarColorPicker.availableColors`

Un `String[]` array que representa los colores disponibles del selector de color para seleccionar. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.

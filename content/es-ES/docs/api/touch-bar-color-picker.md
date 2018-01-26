## Clase: Seleccionador de color de la barra táctil

> Crea un seleccionador de color en la barra táctil para aplicaciones nativas de macOS

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `Nuevo seleccionador de color de la barra táctil(opciones)` *Experimental*

* `options` Object 
  * `Colores disponibles` Cadena[] (opcional) - arreglo de códigos hexadecimales de los colores a aparecer como colores posibles a seleccionar.
  * `Color seleccionado` Cadena (opcional) - El código de color hexadecimal en el seleccionador, ejemplo `#ABCDEF`.
  * `cambiar` Funcion (opcional) - Función a llamar cuando el color está seleccionado. 
    * `color` String - The color that the user selected from the picker

### Propiedades de Instancia

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
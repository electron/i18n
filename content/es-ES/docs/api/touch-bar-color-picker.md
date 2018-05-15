## Clase: Seleccionador de color de la barra táctil

> Crea un seleccionador de color en la barra táctil para aplicaciones nativas de macOS

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `Nuevo seleccionador de color de la barra táctil(opciones)` *Experimental*

* `opciones` Object 
  * `Colores disponibles` Cadena[] (opcional) - arreglo de códigos hexadecimales de los colores a aparecer como colores posibles a seleccionar.
  * `Color seleccionado` Cadena (opcional) - El código de color hexadecimal en el seleccionador, ejemplo `#ABCDEF`.
  * `cambiar` Funcion (opcional) - Función a llamar cuando el color está seleccionado. 
    * `color` String - The color that the user selected from the picker.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `Seleccionador de color de la barra táctil`:

#### `touchBarColorPicker.availableColors`

Un arreglo de `Cadena[]` representando los colores disponibles para seleccionar. Cambiar este valor actualizará inmediatamente el seleccionador de colores en la barra táctil.

#### `touchBarColorPicker.selectedColor`

Una `cadena` de código hexadecimal representando el color seleccionado actualmente. Cambiar este valor actualizará inmediatamente el seleccionador de color de la barra táctil.
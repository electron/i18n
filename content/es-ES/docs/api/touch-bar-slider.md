## Clase: TouchBarSlider

> Crea un control deslizante en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *Experimental*

* `options` Objeto 
  * `label` Cadena (opcional) - Texto de etiqueta.
  * `value` Entero (opcional) - Valor seleccionado.
  * `minValue` Entero (opcional) - Valor mínimo.
  * `maxValue` Entero (opcional) - Valor máximo.
  * `change` Función (opcional) - Función para llamar cuando se cambie el control deslizante. 
    * `newValue` Número - El valor que el usuario seleccionó en el control deslizante

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias de `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
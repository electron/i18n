## Clase: TouchBarSlider

> Crea un control deslizante en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo TouchBarSlider(options)` _Experimental_

* `options` Object
  * `label` String (opcional) - Texto de etiqueta.
  * `value` Integer (opcional) - Valor seleccionado.
  * `minValue` Integer (opcional) - Valor mínimo.
  * `maxValue` Integer (opcional) - Valor máximo.
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Number - El valor que el usuario seleccionó en el control deslizante.

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

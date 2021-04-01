## Clase: TouchBarSlider

> Crea un control deslizante en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarSlider(options)`

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

Un `String` que representa el texto actual del deslizador. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

Un `Number` que representa el valor actual del deslizador. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

Un `Number` que representa el valor mínimo actual del deslizador. Cambiar este valor inmediatamente actualiza el deslizador en el touch bar.

#### `touchBarSlider.maxValue`

Un `Number` que representa el valor máximo actual del deslizador. Cambiar este valor inmediatamente actualiza el deslizador en el touch bar.

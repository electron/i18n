## Clase: TouchBarSlider

> Crea un control deslizante en la barra táctil para aplicaciones nativas de macOS

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `nuevo TouchBarSlider(options)` *Experimental*

* `opciones` Object 
  * `label` String (opcional) - Texto de etiqueta.
  * `value` Integer (opcional) - Valor seleccionado.
  * `minValue` Integer (opcional) - Valor mínimo.
  * `maxValue` Integer (opcional) - Valor máximo.
  * `change` Función (opcional) - Function para llamar cuando se cambie el control deslizante. 
    * `newValue` Number - The value that the user selected on the Slider.

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias de `TouchBarSlider`:

#### `touchBarSlider.label`

Un `String` que representa el texto actual del control deslizante. Cambiar este valor actualiza inmediatamente el control deslizante en la barra táctil.

#### `touchBarSlider.value`

Un `Number` que representa el valor actual del control deslizante. Cambiar este valor actualiza inmediatamente el control deslizante en la barra táctil.

#### `touchBarSlider.minValue`

Un `Number` que representa el valor mínimo actual del control deslizante. Cambiar este valor actualiza inmediatamente el control deslizante en la barra táctil.

#### `touchBarSlider.maxValue`

Un `Number` que representa el valor máximo actual del control deslizante. Cambiar este valor actualiza inmediatamente el control deslizante en la barra táctil.
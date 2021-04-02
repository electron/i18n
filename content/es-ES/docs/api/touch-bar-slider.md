## Clase: TouchBarSlider

> Crea un control deslizante en la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `nuevo TouchBarSlider (opciones)`

* `options` Object
  * `label` String (opcional) - Texto de etiqueta.
  * `value` Integer (opcional) - Valor seleccionado.
  * `minValue` Integer (opcional) - Valor mínimo.
  * `maxValue` Integer (opcional) - Valor máximo.
  * `change` function (opcional)-función a la que se llama cuando se cambia el control deslizante.
    * `newValue` Number - El valor que el usuario seleccionó en el control deslizante.

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias de `TouchBarSlider`:

#### `touchBarSlider.label`

Un `String` que representa el texto actual del deslizador. Si cambias este valor de inmediato, se actualiza el deslizador en la Touch bar.

#### `touchBarSlider.value`

Un `Number` que representa el valor actual del deslizador. Si cambias este valor de inmediato, se actualiza el deslizador en la Touch bar.

#### `touchBarSlider.minValue`

Un `Number` que representa el valor mínimo actual del deslizador. Cambiar este valor inmediatamente actualiza el deslizador en el touch bar.

#### `touchBarSlider.maxValue`

Un `Number` que representa el valor máximo actual del deslizador. Cambiar este valor inmediatamente actualiza el deslizador en el touch bar.

## Clase: TouchBarScrubber

> Crear un depurador (un selector de desplazamiento)

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarScrubber(options)`

* `options` Object
  * `elementos` [elemento a depurar[]](structures/scrubber-item.md) - Un arreglo de elementos a depurar.
  * `select` Function (optional) - Called when the user taps an item that was not the last tapped item.
    * `seleccionar índice` Entero - El índice del elemento que el usuario seleccionó.
  * `highlight` Function (optional) - Called when the user taps any item.
    * `índice destacado` Entero - El índice del elemento que el usuario tocó.
  * `selectedStyle` String (opcional) - Estilo de elemento seleccionado. Puede ser `background`, `outline` o `none`. Por defecto es `none`.
  * `overlayStyle` String (opcional) - Estilo de elemento de superposición seleccionado. Puede ser `background`, `outline` o `none`. Por defecto es `none`.
  * `showArrowButtons` Boolean (opcional) - Por defecto a `false`.
  * `mode` String (opcional) - Puede ser `fixed` o `free`. Por defecto es `free`.
  * `continuous` Boolean (opcional) - Por defecto a `true`.

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias del `depurador de barra tactil`:

#### `touchBarScrubber.items`

Un array de `ScrubberItem[]` representando los elementos en este depurador. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarScrubber.selectedStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Posibles valores:

* `background` - Mapa a `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Elimina todos los estilos.

#### `touchBarScrubber.overlayStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. Este estilo es cubierto en la parte superior del elemento depurador en vez de posicionarse detrás de él. Actualizar este valor inmediatamente actualiza el control en la barra de herramientas. Posibles valores:

* `background` - Mapa a `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `none` - Elimina todos los estilos.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Actualizar este valor inmediatamente actualiza el control en el touch bar.

#### `touchBarScrubber.mode`

Un `String` que representa el modo de este depurador. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Posibles valores:

* `fijo` - Mapa a `NSScrubberModeFixed`.
* `libre` - Mapa a `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Boolean` que representa si este depurador es continuo o no. Actualizar este valor actualiza inmediatamente el control en la barra táctil.

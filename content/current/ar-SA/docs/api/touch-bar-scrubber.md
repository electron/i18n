## Clase: TouchBarScrubber

> Crear un depurador (un selector de desplazamiento)

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `Nuevo depurador de la barra táctil(opciones)` _Experimental_

* `options` Object
  * `elementos` [elemento a depurar[]](structures/scrubber-item.md) - Un arreglo de elementos a depurar.
  * `select` Function - Called when the user taps an item that was not the last tapped item.
    * `seleccionar índice` Entero - El índice del elemento que el usuario seleccionó.
  * `highlight` Function - Called when the user taps any item.
    * `índice destacado` Entero - El índice del elemento que el usuario tocó.
  * `selectedStyle` String - Selected item style. Defaults to `null`.
  * `overlayStyle` String - Selected overlay item style. Defaults to `null`.
  * `Mostrar botones de flechas` Booleano - Por defecto es `falso`.
  * `modo` Cadena - Por defecto es `libre`.
  * `continuo` Booleano - Por defecto es `verdad`.

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias del `depurador de barra tactil`:

#### `touchBarScrubber.items`

Un array de `ScrubberItem[]` representando los elementos en este depurador. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarScrubber.selectedStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Posibles valores:

* `background` - Mapa a `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actualiza nulo, no una cadena, remueve todos los estilos.

#### `touchBarScrubber.overlayStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. Este estilo es cubierto en la parte superior del elemento depurador en vez de posicionarse detrás de él. Actualizar este valor inmediatamente actualiza el control en la barra de herramientas. Posibles valores:

* `background` - Mapa a `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actualiza nulo, no una cadena, remueve todos los estilos.

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Posibles valores:

* `fijo` - Mapa a `NSScrubberModeFixed`.
* `libre` - Mapa a `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Actualiza este valor inmediatamente actualiza el control de la barra táctil.

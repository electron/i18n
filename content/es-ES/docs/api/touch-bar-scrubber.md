## Clase: depurador de la barra tactil

> Crear un depurador (un selector de desplazamiento)

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `Nuevo depurador de la barra táctil(opciones)` *Experimental*

* `options` Object 
  * `elementos` [elemento a depurar[]](structures/scrubber-item.md) - Un arreglo de elementos a depurar
  * `seleccionar` Función - llamado cuando el usuario toca un elemento que no era el último elemento tocado 
    * `seleccionar índice` Entero - El índice del elemento que el usuario seleccionó
  * `destacado` Función - llamado cuando el usuario toca cualquier elemento 
    * `índice destacado` Entero - El índice del elemento que el usuario tocó
  * `Seleccionar estilo` Cadena - Estilo del elemento seleccionado. Por defecto `nulo`.
  * `cubrir estilo` Cadena - Selecciona el estilo cubierto del elemento. Por defecto es `nulo`.
  * `Mostrar botones de flechas` Booleano - Por defecto es `falso`.
  * `modo` Cadena - Por defecto es `libre`.
  * `continuo` Booleano - Por defecto es `verdad`.

### Propiedades de Instancia

Las siguientes propiedades está disponibles en instancias del `depurador de barra tactil`:

#### `touchBarScrubber.items`

Un arreglo de`Elemento a depurar[]` representando los elementos en este depurador. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarScrubber.selectedStyle`

Una `Cadena` representando el estilo que deben tener los elementos en el depurador. Actulizar este valor inmediatamente actualiza el control en la barra táctil. Valores positivos:

* `fondo` - mapas a `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `fuera de linea` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `nulo` - Actualiza nulo, no una cadena, remueve todos los estilos

#### `touchBarScrubber.overlayStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. Posibles valores:

* `fondo` - mapas a `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `fuera de linea` - Mapa a `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `nulo` - Actualiza nulo, no una cadena, remueve todos los estilos

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Maps to `NSScrubberModeFixed`
* `free` - Maps to `NSScrubberModeFree`

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.
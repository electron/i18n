## Clase: depurador de la barra tactil

> Crear un depurador (un selector de desplazamiento)

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `Nuevo depurador de la barra táctil(opciones)` *Experimental*

* `opciones` Object 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - An array of items to place in this scrubber.
  * `seleccionar` Function - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - The index of the item the user selected.
  * `destacado` Function - Called when the user taps any item. 
    * `highlightedIndex` Integer - The index of the item the user touched.
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

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

Una `Cadena` que representa el estilo que deben tener los elementos seleccionados por el depurador. Este estilo es cubierto en la parte superior del elemento depurador en vez de posicionarse detrás de él. Actualizar este valor inmediatamente actualiza el control en la barra de herramientas. Posibles valores:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

Un `Booleano` representando si se muestran las flechas izquierda / derecha en el depurador. Actualizar este valor actualizará inmediatamente el control en la barra táctil.

#### `touchBarScrubber.mode`

Una `Cadena` representando el modo de este depurador. Actualizar este valor actualizará inmediatamente el control de la barra táctil. Valores posibles:

* `fixed` - Maps to `NSScrubberModeFixed`.
* `free` - Maps to `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

Un `Booleano` representando si este depurador es continuo o no. Actualizar este valor actualizará inmediatamente el control en la barra táctil.
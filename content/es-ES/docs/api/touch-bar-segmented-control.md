## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `nuevo TouchBarSegmentedControl(options)` *Experimental*

* `options` Object 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `automatic` - Por defecto. La apariencia del control segmentados se determina basado en el tipo de ventana en la cual el control se muestra y en la posición dentro de la ventana.
    * `rounded` - El control se muestra utilizando el estilo redondeado.
    * `textured-rounded` - El control se muestra utilizando el estilo de textura redondeado.
    * `round-rect` - Los controles se muestran utilizando el estilo rectángulo redondeado.
    * `textured-square` - El control se muestra utilizando el estilo de textura cuadrado.
    * `capsule` - The control is displayed using the capsule style.
    * `small-square` - El control se muestra utilizando el estilo de cuadrado pequeño.
    * `separated` - Los segmentos en el control se muestran muy cerca del otro pero sin llegar a tocarse.
  * `mode` String (optional) - The selection mode of the control: 
    * `single` - Por defecto. Uno de los elementos seleccionados a la vez. Al seleccionar uno se anula la selección del elemento previamente seleccionado.
    * `multiple` - Elementos múltiples pueden ser seleccionados a la vez.
    * `buttons` - Hace que los segmentos actúen como botones. Cada segmento puede ser presionado y liberado pero nunca ser marcado como activo.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un arreglo de elementos para colocar en este control.
  * `selectedIndex` Integer (opcional) - El índice del segmento actual seleccionado, se actualizará automáticamente con la interacción del usuario. Cuando el modo es múltiple, será el ultimo elemento seleccionado.
  * `change` Function - Called when the user selects a new segment. 
    * `selectedIndex` Integer - El índice del elemento seleccionado por el usuario.
    * `isSelected` Boolean - Si el elemento es seleccionado o no como resultado de la selección del usuario.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Un arreglo `SegmentedControlSegment[]` que representa los segmentos en este control. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Mientras se actualicen las propiedades profundas dentro de este arreglo **no se actualiza la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

Un `entero` que representa el segmento seleccionado actual. Cambiar este valor actualiza inmediatamente el control en la barra táctil. La interacción del usuario con la barra táctil actualizará este valor automáticamente.
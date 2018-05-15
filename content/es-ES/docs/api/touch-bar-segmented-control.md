## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [Main](../tutorial/quick-start.md#main-process)

### `nuevo TouchBarSegmentedControl(options)` *Experimental*

* `opciones` Object 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `automatic` - Por defecto. La apariencia del control segmentados se determina basado en el tipo de ventana en la cual el control se muestra y en la posición dentro de la ventana.
    * `rounded` - El control se muestra utilizando el estilo redondeado.
    * `textured-rounded` - El control se muestra utilizando el estilo de textura redondeado.
    * `round-rect` - Los controles se muestran utilizando el estilo rectángulo redondeado.
    * `textured-square` - El control se muestra utilizando el estilo de textura cuadrado.
    * `capsule` - El control se muestra utilizando el estilo de cápsula.
    * `small-square` - El control se muestra utilizando el estilo de cuadrado pequeño.
    * `separated` - Los segmentos en el control se muestran muy cerca del otro pero sin llegar a tocarse.
  * `mode` String (optional) - The selection mode of the control: 
    * `single` - Por defecto. Uno de los elementos seleccionados a la vez. Al seleccionar uno se anula la selección del elemento previamente seleccionado.
    * `multiple` - Elementos múltiples pueden ser seleccionados a la vez.
    * `buttons` - Hace que los segmentos actúen como botones. Cada segmento puede ser presionado y liberado pero nunca ser marcado como activo.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un arreglo de elementos para colocar en este control.
  * `selectedIndex` Integer (opcional) - El índice del segmento actual seleccionado, se actualizará automáticamente con la interacción del usuario. Cuando el modo es múltiple, será el ultimo elemento seleccionado.
  * `cambiar` Function - Es llamado cuando el usuario selecciona un nuevo segmento. 
    * `selectedIndex` Integer - El índice del elemento seleccionado por el usuario.
    * `isSelected` Boolean - Si el elemento es seleccionado o no como resultado de la selección del usuario.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Un arreglo `SegmentedControlSegment[]` que representa los segmentos en este control. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

Un `entero` que representa el segmento seleccionado actual. Cambiar este valor actualiza inmediatamente el control en la barra táctil. La interacción del usuario con la barra táctil actualizará este valor automáticamente.
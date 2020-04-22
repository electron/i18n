## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo TouchBarSegmentedControl(options)` _Experimental_

* `options` Object
  * `segmentStyle` String (optional) - Style of the segments:
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - El control se muestra utilizando el estilo redondeado. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - El control se muestra utilizando el estilo de textura redondeado. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - Los controles se muestran utilizando el estilo rectángulo redondeado. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - El control se muestra utilizando el estilo de textura cuadrado. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - El control se muestra utilizando el estilo de cápsula. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - El control se muestra utilizando el estilo de cuadrado pequeño. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - Los segmentos en el control se muestran muy cerca del otro pero sin llegar a tocarse. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (optional) - The selection mode of the control:
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Elementos múltiples pueden ser seleccionados a la vez. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Hace que los segmentos actúen como botones. Cada segmento puede ser presionado y liberado pero nunca ser marcado como activo. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un arreglo de elementos para colocar en este control.
  * `selectedIndex` Integer (opcional) - El índice del segmento actual seleccionado, se actualizará automáticamente con la interacción del usuario. When the mode is `multiple` it will be the last selected item.
  * `change` Function (optional) - Called when the user selects a new segment.
    * `selectedIndex` Integer - El índice del elemento seleccionado por el usuario.
    * `isSelected` Boolean - Si el elemento es seleccionado o no como resultado de la selección del usuario.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

Un arreglo `SegmentedControlSegment[]` que representa los segmentos en este control. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

Un `entero` que representa el segmento seleccionado actual. Cambiar este valor actualiza inmediatamente el control en la barra táctil. La interacción del usuario con la barra táctil actualizará este valor automáticamente.

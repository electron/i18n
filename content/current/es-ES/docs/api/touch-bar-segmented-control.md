## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `nuevo TouchBarSegmentedControl(options)` *Experimental*

* `opciones` Object 
  * `segmentStyle` String (opcional) - Estilo de los segmentos: 
    * `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window. Maps to `NSSegmentStyleAutomatic`.
    * `rounded` - The control is displayed using the rounded style. Maps to `NSSegmentStyleRounded`.
    * `textured-rounded` - The control is displayed using the textured rounded style. Maps to `NSSegmentStyleTexturedRounded`.
    * `round-rect` - The control is displayed using the round rect style. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - The control is displayed using the textured square style. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - The control is displayed using the capsule style. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - The control is displayed using the small square style. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - The segments in the control are displayed very close to each other but not touching. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (opcional) - El modo de selección del control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Multiple items can be selected at a time. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un arreglo de elementos para colocar en este control.
  * `selectedIndex` Integer (opcional) - El índice del segmento actual seleccionado, se actualizará automáticamente con la interacción del usuario. When the mode is `multiple` it will be the last selected item.
  * `cambiar` Function (optional) - Called when the user selects a new segment. 
    * `selectedIndex` Integer - El índice del elemento seleccionado por el usuario.
    * `isSelected` Boolean - Si el elemento es seleccionado o no como resultado de la selección del usuario.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

Una `String` que representa el estilo actual de segmento de los controles. Actualizar este valor actualiza inmediatamente el control en la barra táctil.

#### `touchBarSegmentedControl.segments`

Un arreglo `SegmentedControlSegment[]` que representa los segmentos en este control. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

Un `entero` que representa el segmento seleccionado actual. Cambiar este valor actualiza inmediatamente el control en la barra táctil. La interacción del usuario con la barra táctil actualizará este valor automáticamente.
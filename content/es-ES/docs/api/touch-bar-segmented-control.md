## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [Main](../glossary.md#main-process)

### `new TouchBarSegmentedControl(options)`

* `options` Object
  * `segmentStyle` String (opcional) - Estilo de los segmentos:
    * `automatic` - Predeterminado. La apariencia del control segmentado es determinada de forma automática basados en el tipo de ventana en el cual el control es mostrado y la posición dentro de la ventana. Se mapea a `NSSegmentStyleAutomatic`.
    * `rounded` - El control se muestra utilizando el estilo redondeado. Mapea a `NSSegmentStyleRounded`.
    * `textured-rounded` - El control se muestra utilizando el estilo de textura redondeado. Mapea a `NSSegmentStyleTexturedRounded`.
    * `round-rect` - Los controles se muestran utilizando el estilo rectángulo redondeado. Mapea a `NSSegmentStyleRoundRect`.
    * `textured-square` - El control se muestra utilizando el estilo de textura cuadrado. Mapea a `NSSegmentStyleTexturedSquare`.
    * `capsule` - El control se muestra utilizando el estilo de cápsula. Mapea a `NSSegmentStyleCapsule`.
    * `small-square` - El control se muestra utilizando el estilo de cuadrado pequeño. Mapea a `NSSegmentStyleSmallSquare`.
    * `separated` - Los segmentos en el control se muestran muy cerca del otro pero sin llegar a tocarse. Mapea a `NSSegmentStyleSeparated`.
  * `mode` String (opcional) - El modo de selección del control:
    * `single` - Predeterminado. Un elemento seleccionado a la vez, seleccionando uno deselecciona el elemento seleccionado anteriormente. Mapea a `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Elementos múltiples pueden ser seleccionados a la vez. Mapea a `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Hace que los segmentos actúen como botones. Cada segmento puede ser presionado y liberado pero nunca ser marcado como activo. Mapea a `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - Un arreglo de elementos para colocar en este control.
  * `selectedIndex` Integer (opcional) - El índice del segmento actual seleccionado, se actualizará automáticamente con la interacción del usuario. Cuando el modo es `multiple` será el último elemento seleccionado.
  * `change` Function (optional) - Called when the user selects a new segment.
    * `selectedIndex` Integer - El índice del elemento seleccionado por el usuario.
    * `isSelected` Boolean - Si el elemento es seleccionado o no como resultado de la selección del usuario.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

Un `String` que representa el estilo del segmento actual de los controles. Actualizar este valor inmediatamente actualiza el control en la barra de herramientas.

#### `touchBarSegmentedControl.segments`

Un arreglo `SegmentedControlSegment[]` que representa los segmentos en este control. Actualizar este valor actualiza inmediatamente el control en la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

Un `entero` que representa el segmento seleccionado actual. Cambiar este valor actualiza inmediatamente el control en la barra táctil. La interacción del usuario con la barra táctil actualizará este valor automáticamente.

#### `touchBarSegmentedControl.mode`

A `String` representing the current selection mode of the control.  Can be `single`, `multiple` or `buttons`.

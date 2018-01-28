## Clase: TouchBarSegmentedControl

> Crea un control segmentado (un conjunto de botones) donde un botón tiene un estado seleccionado

Proceso: [principal](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *Experimental*

* `options` Object 
  * `segmentStyle` Cadena - (opcional) Estilo de los segmentos: 
    * `automatic` - Por defecto. La apariencia del control segmentados se determina basado en el tipo de ventana en la cual el control se muestra y en la posición dentro de la ventana.
    * `rounded` - El control se muestra utilizando el estilo redondeado.
    * `textured-rounded` - El control se muestra utilizando el estilo de textura redondeado.
    * `round-rect` - Los controles se muestran utilizando el estilo rectángulo redondeado.
    * `textured-square` - The control is displayed using the textured square style.
    * `capsule` - The control is displayed using the capsule style
    * `small-square` - The control is displayed using the small square style.
    * `separated` - The segments in the control are displayed very close to each other but not touching.
  * `mode` String - (optional) The selection mode of the control: 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
    * `multiple` - Multiple items can be selected at a time.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `cambiar` Function - Called when the user selects a new segment 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### Propiedades de Instancia

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. Actualiza este valor inmediatamente actualiza el control de la barra táctil. Mientras se actualicen propiedades profundas en este arreglo **no actualice la barra táctil**.

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.
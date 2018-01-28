## Clase: TouchBar

> Crea los diseños de la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `options` Object 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (optional)

Crea una nueva barra táctil con los elementos especificados. Utilice `BrowserWindow.setTouchBar` para añadir la `TouchBar` a la ventana.

**Nota:** Actualmente la API TouchBar es experimental y puede cambiar o ser eliminada en las futuras versiones de Electron.

**Consejo:** Si no tienes una MacBook con barra táctil, se puede utilizar[Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) para probar el uso de la barra táctil en la aplicación.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBar`:

#### `touchBar.escapeItem`

El `TouchBarButton` que reemplazará el botón "esc" en la barra táctil cuando se configure. Establecer a `null` restaura el botón "esc" por defecto. Cambiar este valor actualiza inmediatamente el elemento escape en la barra táctil.

## Ejemplos

Below is an example of a simple slot machine touch bar game with a button and some labels.

```javascript
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '
```

### Running the above example

To run the example above, you'll need to (assuming you've got a terminal open in the dirtectory you want to run the example):

1. Save the above file to your computer as `touchbar.js`
2. Install Electron via `npm install electron`
3. Run the example inside Electron: `./node_modules/.bin/electron touchbar.js`

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).
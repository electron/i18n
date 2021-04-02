## Clase: TouchBar

> Crea los diseños de la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../glossary.md#main-process)

### `nueva TouchBar (opciones)`

* `options` Object
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (opcional)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (opcional)

Crea una nueva barra táctil con los elementos especificados. Use `BrowserWindow.setTouchBar` para agregar la `TouchBar` a una ventana.

**Nota:** La API TouchBar API actualmente es experimental y puede cambiar o ser eliminada en futuras versiones de Electron.

**Consejo:** Si no tienes una MacBook con barra táctil, se puede utilizar[Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) para probar el uso de la barra táctil en la aplicación.

### Propiedades estáticas

#### `TouchBarButton`

Un [`typeof TouchBarButton`](./touch-bar-button.md) referencia a la clase `TouchBarButton`.

#### `TouchBarColorPicker`

Un [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) referencia a la clase `TouchBarColorPicker`.

#### `TouchBarGroup`

Un [`typeof TouchBarGroup`](./touch-bar-group.md) referencia a la clase `TouchBarGroup`.

#### `TouchBarLabel`

Un [`typeof TouchBarLabel`](./touch-bar-label.md) referencia a la clase `TouchBarLabel`.

#### `TouchBarPopover`

Un [`typeof TouchBarPopover`](./touch-bar-popover.md) referencia a la clase `TouchBarPopover`.

#### `TouchBarScrubber`

Un [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) referencia a la clase `TouchBarScrubber`.

#### `TouchBarSegmentedControl`

Un [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) referencia a la clase `TouchBarSegmentedControl`.

#### `TouchBarSlider`

Un [`typeof TouchBarSlider`](./touch-bar-slider.md) referencia a la clase `TouchBarSlider`.

#### `TouchBarSpacer`

Un [`typeof TouchBarSpacer`](./touch-bar-spacer.md) referencia a la clase `TouchBarSpacer`.

#### `TouchBarOtherItemsProxy`

Un [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) referencia a la clase `TouchBarOtherItemsProxy`.

### Propiedades de Instancia

Las siguientes propiedades están disponibles en instancias de `TouchBar`:

#### `touchBar.escapeItem`

Un `TouchBarItem` que reemplazará el botón "esc" en la barra táctil cuando se configure. Establecer a `null` restaura el botón "esc" por defecto. Cambiar este valor actualiza inmediatamente el elemento escape en la barra táctil.

## Ejemplos

A continuación hay un ejemplo de un juego simple de máquina tragaperras con un botón y algunas etiquetas.

```javascript
const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignore clicks if already spinning
    if (spinning) {
      return
    }

    spinning = true
    result.label = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 seconds
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now() - startTime) >= spinLength) {
        finishSpin ()
      } else {
        ////ralentizar un poco en cada giro
        tiempo de espera * = 1,1
        setTimeout (spinReels, timeout)
      }
    }

    spinReels ()
  }
})

const getRandomValue = () => {
  const Values = [' 🍒 ', ' 💎 ', ' 7️ ⃣ ', ' 🍊 ', ' 🔔 ', ' ⭐ ', ' 🍇 ', ' 🍀 ']
  valores devueltos [Math. Floor (Math. RANDOM () * Values. length)]
}

const updateReels = () => {
  reel1. Label = getRandomValue ()
  reel2. Label = getRandomValue ()
  reel3. Label = getRandomValue ()
}

const finishSpin = () => {
  const uniqueValues = New set ([reel1. Label, reel2. Label, reel3. label]). Size
  if (uniqueValues = = = 1) {
    //los 3 valores son los mismos
    resultado. Label = ' 💰 Jackpot! '
    result. textColor = ' #FDFF00 '
  } else if (uniqueValues = = = 2) {
    //2 valores son el mismo
    resultado. Label = ' 😍 Winner! '
    result. textColor = ' #FDFF00 '
  } else {
    //no hay valores que sean el mismo
    resultado. Label = ' 🙁 spin again '
    result. textColor = null
  }
  Spinning = false
}

const touchBar = New TouchBar ({
  items: [
    spin,
    New TouchBarSpacer ({ size: 'large' }),
    reel1,
    nuevo TouchBarSpacer ({ size: 'small' }),
    reel2,
    nuevo TouchBarSpacer ({ size: 'small' }),
    reel3,
    nuevo TouchBarSpacer ({ size: 'large' }),
    result
  ]
})

permitir que Window

app. whenReady (). then (() => {
  Window = New BrowserWindow ({
    Frame : false,
    titleBarStyle: ' Hiddenrecuadro ',
    ancho: 200,
    height: 200,
    backgroundColor: ' #000 '
  })
  Window. loadURL (' about: Blank ')
  Window. setTouchBar (touchBar)
})
```

### Ejecutar el ejemplo anterior

Para ejecutar el ejemplo anterior, se necesita (asumiendo que la terminal está abierta en el directorio en donde se desea ejecutar el ejemplo):

1. Guardar el archivo anterior en la computadora como `touchbar.js`
2. Instalar Electron a través de `npm install electron`
3. Ejecutar el ejemplo dentro de Electron: `./node_modules/.bin/electron touchbar.js`

Entonces aparecerá una nueva ventana de Electron y la aplicación se ejecutará en la barra táctil (o en el emulador de la barra táctil).

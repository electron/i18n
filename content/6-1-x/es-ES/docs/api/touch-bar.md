## Clase: TouchBar

> Crea los diseños de la barra táctil para aplicaciones nativas de macOS

Proceso: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBar(options)` _Experimental_

* `options` Object
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (opcional)

Crea una nueva barra táctil con los elementos especificados. Use `BrowserWindow.setTouchBar` para agregar la `TouchBar` a una ventana.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

**Tip:** If you don't have a MacBook with Touch Bar, you can use [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) to test Touch Bar usage in your app.

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

// Etquita de spin result
const result = new TouchBarLabel()

// Botón spin
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignorar los clics si ya está girando
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
        finishSpin()
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  return values[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
  if (uniqueValues === 1) {
    // Todo los 3 valores son el mismo
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 valores son el mismo
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // No hay valores iguales
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar({
  items: [
    spin,
    new TouchBarSpacer({ size: 'large' }),
    reel1,
    new TouchBarSpacer({ size: 'small' }),
    reel2,
    new TouchBarSpacer({ size: 'small' }),
    reel3,
    new TouchBarSpacer({ size: 'large' }),
    result
  ]
})

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

### Ejecutar el ejemplo anterior

Para ejecutar el ejemplo anterior, se necesita (asumiendo que la terminal está abierta en el directorio en donde se desea ejecutar el ejemplo):

1. Guardar el archivo anterior en la computadora como `touchbar.js`
2. Instalar Electron a través de `npm install electron`
3. Ejecutar el ejemplo dentro de Electron: `./node_modules/.bin/electron touchbar.js`

Entonces aparecerá una nueva ventana de Electron y la aplicación se ejecutará en la barra táctil (o en el emulador de la barra táctil).

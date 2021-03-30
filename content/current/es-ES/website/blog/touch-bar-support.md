---
title: Soporte de barra táctil
author: kevinsawicki
date: '08-03-2017'
---

La versión beta de Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) contiene soporte inicial para la macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

La nueva API de barra táctil te permite añadir botones, etiquetas, pozos, selectores de color , deslizadores y espaciadores. Estos elementos se pueden actualizar dinámicamente y también emitir eventos cuando se interactuan.

Esta es la primera versión de esta API por lo que evolucionará en las próximas versiones de Electron Por favor, revisa las notas de la versión para más actualizaciones y abre [problemas](https://github.com/electron/electron/issues) para cualquier problema o falta funcionalidad.

Puede instalar esta versión a través de `npm install electron@beta` y aprender más sobre ella en la [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) y [Navegador Ventana](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) documentos de Electron.

Grandes gracias a [@MarshallOfSound](https://github.com/MarshallOfSound) por contribuir a Electron. :tada:

## Ejemplo de barra táctil

![Pulsar barra Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

A continuación se muestra un ejemplo de cómo crear un juego simple de máquina tragaperras en la barra táctil. Demuestra cómo crear una barra táctil, diseñar los artículos, asociarla con una ventana de , manejar el botón haga clic en eventos, y actualice las etiquetas dinámicamente.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  fondo Color: '#7851A9',
  click: () => {
    // Ignorar clics si ya está girando
    if (girando) {
      return
    }

    girando = true
    resultados. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 segundos
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      if ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Ralentiza un poco en cada giro
        timeout *= 1. setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  valores devueltos [Matemáticas. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Todos los 3 valores son los mismos
    resultados. abel = '💰 ¡Jackpot!'
    resultados.
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    extColor = '#FDF00'
  } else {
    // Ningún valor es el mismo
    resultado. abel = ': tly_frowning_face: Deslizar en'
    resultados. extColor = nulo
  }
  giro = false
}

const touchBar = new TouchBar([
  giro,
  new TouchBarSpacer({size: 'large'}),
  roel1,
  new TouchBarSpacer({size: 'small'}),
  rodillo2,
  nuevo TouchBarSpacer({size: 'small'}),
  rodillos 3,
  new TouchBarSpacer({size: 'large'}),
  resultado
])

let window

app. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    ancho: 200,
    altura: 200,
    fondo Color: '#000'
  })
  ventana. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


---
title: Touchbar-Unterstützung
author: kevinsawicki
date: '2017-03-08'
---

The Electron [1.6.3][] beta release contains initial support for the macOS [Touch Bar][].

---

Mit der neuen Touch Bar API können Sie Buttons, Labels, Popovers, Farbe Picker, Schieberegler und Abstände hinzufügen. Diese Elemente können dynamisch aktualisiert werden und emittiert Ereignisse, wenn sie interagiert werden.

Dies ist die erste Version dieser API, daher wird sie sich in den nächsten einigen Electron-Versionen weiterentwickeln. Bitte sehen Sie sich die Versionshinweise für weitere Updates an und öffnen Sie [Probleme](https://github.com/electron/electron/issues) für Probleme oder fehlende Funktionalität.

You can install this version via `npm install electron@beta` and learn more about it in the [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) and [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Vielen Dank an [@MarshallOfSound](https://github.com/MarshallOfSound) für den Beitrag zu Electron. :tada:

## Touchbar-Beispiel

![Berührungsleiste Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Unten ist ein Beispiel für die Schaffung eines einfachen Slotmaschinenspiels in der Touchbar. Es zeigt, wie man eine Berührungsleiste erzeugt, die Elemente stilisiert und mit einem Fenster assoziiert, Knopf bearbeiten Klicken Sie Ereignisse, und aktualisieren Sie die Labels dynamisch.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

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
    // All 3 values are the same
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // No values are the same
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar([
  spin,
  new TouchBarSpacer({size: 'large'}),
  reel1,
  new TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  new TouchBarSpacer({size: 'large'}),
  result
])

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

[1.6.3]: https://github.com/electron/electron/releases/tag/v1.6.3
[Touch Bar]: https://developer.apple.com/macos/touch-bar


---
title: Supporto Touch Bar
author: kevinsawicki
date: '2017-03-08'
---

La versione beta di Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) contiene il supporto iniziale per macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

La nuova API Touch Bar consente di aggiungere pulsanti, etichette, popover, selezioni di colore , cursori e distanziatori. Questi elementi possono essere aggiornati dinamicamente e emettono anche eventi quando sono interagiti.

Questa è la prima versione di questa API quindi si evolverà nelle prossime versioni di Electron. Si prega di controllare le note di rilascio per ulteriori aggiornamenti e aprire [problemi](https://github.com/electron/electron/issues) per eventuali problemi o funzionalità mancanti.

È possibile installare questa versione tramite `npm install electron@beta` e saperne di più su di essa nelle [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) e [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Documenti di Electron.

Un grande ringraziamento a [@MarshallOfSound](https://github.com/MarshallOfSound) per aver contribuito questo a Electron. Evento:

## Esempio Di Touch Bar

![Touch Bar Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Di seguito è riportato un esempio di creazione di un semplice gioco di slot machine nel touch bar. Dimostra come creare una barra di tocco, stile degli elementi, associarli a una finestra , gestire il pulsante fare clic sugli eventi e aggiornare le etichette dinamicamente.

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
  sfondoColore: '#7851A9',
  click: () => {
    // Ignora clic se giÃ filando
    se (filatura) {
      return
    }

    filatura = vero
    risultato. abel = ''

    let timeout = 10
    const spinLunghezza = 4 * 1000 // 4 secondi
    const startTime = data. ow()

    const spinReels = () => {
      updateReels()

      if ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow down a bit on each spin
        timeout *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  valori restituiti[Matematica. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Tutti i 3 valori sono gli stessi
    risultati. abel = '💰 Jackpot!'
    risultato. extColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    resultate. abel = '😍 Vincitore!'
    risultato. extColor = '#FDFF00'
  } else {
    // Nessun valore è lo stesso
    risultato. abel = '🙁 Spin again'
    risultato. extColor = null
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
  nuovo TouchBarSpacer({size: 'large'}),
  risultato
])

let window

app. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titoloBarStile: 'hidden-inset',
    larghezza: 200,
    altezza: 200,
    backgroundColore: '#000'
  })
  finestra. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


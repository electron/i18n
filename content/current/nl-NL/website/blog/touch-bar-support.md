---
title: Touch Bar ondersteuning
author: kevinsawicki
date: '2017-03-08'
---

De Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) beta release bevat de eerste ondersteuning voor macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

Met de nieuwe Touch Bar API kunt u knoppen, labels, popovers, kleuren kiezers, schuifregelaars en spatiebalken toevoegen. Deze elementen kunnen dynamisch worden bijgewerkt en ook gebeurtenissen uitstoten wanneer ze in interactie zijn.

Dit is de eerste versie van deze API zodat het zal evolueren in de volgende Electron releases. Bekijk de release-notities voor verdere updates en open [problemen](https://github.com/electron/electron/issues) voor problemen of ontbrekende functionaliteit.

Je kunt deze versie installeren via `npm install electron@beta` en meer leren in de [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) en [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Grote dank aan [@MarshallOfSound](https://github.com/MarshallOfSound) voor het bijdragen van dit aan Electron. :tada:

## Touch Bar voorbeeld

![Raak balk Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Hieronder is een voorbeeld van het maken van een simpel slot machine spel in de touchbar. Het laat zien hoe je een aanraakbalk maakt, de voorwerpen stijgt, het associeert met een venster, handvat de knop op gebeurtenissen en werk de labels dynamisch bij.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let draaiing = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  achtergrondkleur: '#7851A9',
  klik: () => {
    // Negeren van kliks als het al draaiend is
    if (spinning) {
      return
    }

    spinning = true
    resultaat. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 seconden
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      if (Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Trap een beetje op elke spin
        timeout *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const waarden = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  retourwaarden [wiskunde. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Alle 3 waarden zijn hetzelfde
    resultaat. abel = '💰 Jackpot!'
    resultaat. extColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values zijn hetzelfde
    resultaat. abel = '😍 Winner!'
    resultaat. extColor = '#FDFF00'
  } else {
    // Geen waarden zijn dezelfde
    resultaten. abel = '🙁 Spin Again'
    resultaat. extColor = null
  }
  draaiingen = vals
}

const touchbar = new TouchBar([
  spin,
  nieuwe TouchBarSpacer({size: 'large'}),
  reel1,
  nieuwe TouchBarSpacer({size: 'small'}),
  reel2,
  nieuwe TouchBarSpacer({size: 'small'}),
  reel3,
  nieuwe TouchBarSpacer({size: 'large'}),
  resultaat
])

laat venster

app. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    breedte: 200,
    hoogte: 200,
    achtergrondkleur: '#000'
  })
  venster. oadURL('about:blank')
  venster.setTouchBar(touchBar)
})
```


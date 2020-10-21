---
title: Atingeți suportul barei
author: kevinsawicki
date: '2017-03-08'
---

Versiunea Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) beta conține suport inițial pentru bara de atingere macOS [](https://developer.apple.com/macos/touch-bar).

---

The new Touch Bar API allows you to add buttons, labels, popovers, color pickers, sliders, and spacers. Aceste elemente pot fi actualizate dinamic și emit, de asemenea, evenimente atunci când sunt interacționate.

Aceasta este prima versiune a acestui API așa că va evolua peste următoarele versiuni Electron. Vă rugăm să verificați notele de lansare pentru actualizări suplimentare și să deschideți [probleme](https://github.com/electron/electron/issues) pentru orice probleme sau funcționalitate lipsă.

Puteți instala această versiune prin intermediul `npm instalați electron@beta` și să aflați mai multe despre ea în [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) și [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Documente Electron.

Mulţumiri mari pentru [@MarshallOfSound](https://github.com/MarshallOfSound) pentru contribuţia la Electron. :tada:

## Exemplu bară de atingere

![Atingeți Gif din bară](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Dedesubt este un exemplu de creare a unui joc simplu de masinarie slot in bara de atingere. Aceasta demonstrează cum să creezi o bară de atingere, să stilizezi elementele, să îl asociezi cu o fereastră, să dai click pe evenimente și să actualizezi etichetele în mod dinamic.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let roting = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Se învârte eticheta de rezultat
const rezultat = new TouchBarLabel()

// / Buton rotire
const învârte = noul TouchBarton({
  etichetă: '🎰 Spin',
  Culoare fundal: '#7851A9',
  clic: () => {
    // Ignore click-uri dacă se învârte deja
    dacă (se rotește) {
      return
    }

    rotire = adevărat
    . abel = ''

    let timeout = 10
    const lungime spinLlength = 4 * 1000 // 4 secunde
    const start Time = Data. ow()

    const spinReels = () => {
      updateReels()

      dacă ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow un pic la fiecare rotire
        timeout *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  valori const = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  valori returnate[Matema. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if the uniqueValues === 1) {
    // All 3 values are same
    result. abel = '💰 Jackpot!'
    rezultat. extColor = '#FDFF00'
  } altfel dacă (valori unique=== 2) {
    // / 2 valori sunt aceleași
    . abel = '😍 Rezultatul câştigătorului!'
    . extColor = '#FDFF00'
  } altfel {
    // Nici o valoare nu este acelaşi rezultat
    . abel = '🙁 Învârtire din nou'
    rezultat. extColor = null
  }
  rotire = false
}

const touchBar = new TouchBar([
  rotire,
  noi TouchBarSpacer({size: 'large'}),
  reel1,
  TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  noi TouchBarSpacer({size: 'large'}),
  rezultat
])

let fereastra

app. nce('ready', () => {
  fereastră = new BrowserWindow({
    cadru: false,
    titleBarStyle: 'hidden-inset',
    lățime: 200,
    înălțime: 200,
    culoare fundal: '#000'
  })
  fereastră. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


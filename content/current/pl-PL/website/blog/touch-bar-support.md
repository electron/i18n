---
title: Obsługa paska dotykowego
author: kevinsawicki
date: '2017-03-08'
---

Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) beta zawiera wstępne wsparcie dla macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

Nowe API Touch Bar pozwala na dodawanie przycisków, etykiet, wyskakujących okienek, kolorów selektorów, suwaków i spacerów. Elementy te mogą być dynamicznie aktualizowane i również emitują zdarzenia gdy są ze sobą połączone.

To jest pierwsze wydanie tego API, więc będzie ewoluować w ciągu następnych kilku wydań Electrona. Sprawdź informacje o wydaniu w celu uzyskania dalszych aktualizacji i otwarcia [problemów](https://github.com/electron/electron/issues) na jakiekolwiek problemy lub brak funkcjonalności.

Możesz zainstalować tę wersję za pomocą `npm install electron@beta` i dowiedzieć się więcej o niej w [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) i [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Dokumentacja Electrona.

Bardzo dziękuję [@MarshallOfSound](https://github.com/MarshallOfSound) za wkład w Electron. :tada:

## Przykład paska dotykowego

![Pasek dotykowy](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Poniżej znajduje się przykład stworzenia prostej gry maszynowej w pasku dotykowym. Pokazuje jak utworzyć pasek dotykowy, stylizować przedmioty, powiązać go z oknem , przycisk obsługi wydarzeń i aktualizacja etykiet dynamicznie.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel label
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result result result label = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  Kolor tła: '#7851A9',
  kliknięcie: () => {
    // Ignoruj kliknięcia, jeśli już się obraca
    jeśli (przędzenie) {
      return
    }

    przędzenie = wynik
    . abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 sekundy
    const start Time = Date. ow()

    const spinReels = () => {
      updateReels()

      jeśli ((Data. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Zwolnij trochę na każdym spin
        limit czasu *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  wartości zwracane [Math. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. etykieta, etykieta2, etykieta3.). ize
  jeśli (uniqueValues === 1) {
    // Wszystkie 3 wartości są takie same
    wynik. abel = '💰 Jackpot!'
    wynik. extColor = '#FDFF00'
  } else jeśli (uniqueValues === 2) {
    // 2 wartości są takie same
    wyników. abel = '😍 zwycięzca!' wynik
    . extColor = '#FDFF00'
  } else {
    // Brak wartości są takie same
    wyniki. abel = '🙁 Spin Again'
    wyniki. extColor = null
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

app. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    szerokość: 200,
    wysokość: 200,
    Kolor tła: '#000'
  })
  okno oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


---
title: Podpora dotykového panelu
author: kevinsawicki
date: '2017-03-08'
---

Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) verze beta obsahuje počáteční podporu pro macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

Nové API dotykové lišty umožňuje přidávat tlačítka, štítky, vyskakovače, barvu vypínače, posuvníky a mezery. Tyto prvky mohou být dynamicky aktualizovány a vypouštějí také události při jejich vzájemném působení.

Toto je první vydání tohoto API, takže se bude vyvíjet během dalších verzí. Prosím podívejte se na poznámky k vydání pro další aktualizace a otevřete [problémy](https://github.com/electron/electron/issues) pro případné problémy nebo chybějící funkce.

Tuto verzi můžete nainstalovat přes `npm instalovat electron@beta` a se o ní dozvědět více na [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) a [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Velké díky [@MarshallOfSound](https://github.com/MarshallOfSound) za přispění k Electronu. :tada:

## Příklad dotykové lišty

![Dotyková lišta Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Níže je příklad vytvoření jednoduchého automatického hra v dotykové liště. Ukazuje, jak vytvořit dotykovou lištu, stylovat položky, přiřadit ji k oknu , stiskněte tlačítko a dynamicky aktualizujte popisky.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel label
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  barva pozadí: '#7851A9',
  klikněte: () => {
    // Ignorovat kliknutí, pokud se již otočí
    , pokud (otočí) {
      return
    }

    otáčení = true
    výsledek. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 sekundy
    const startTime = datum. ow()

    const spinReels = () => {
      updateReels()

      if ((Datum. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Slow down a bit na každé spin
        timeout *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  návratové hodnoty[Math. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

finishSpin = () => {
  const uniqueValues = nová Set([reel1. abel, reel2.štítek, reel3.štítky]). velikost
  , pokud (uniqueValues === 1) {
    // Všechny 3 hodnoty jsou stejné
    výsledek. abel = '💰 jackpot!'
    výsledek. extColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 Hodnoty jsou stejné
    výsledek. abel = '😍 Winner!'
    výsledek. extColor = '#FDFF00'
  } else {
    // No values are the same
    result. abel = '🙁 Spin Again'
    výsledek. extColor = null
  }
  otáčení = nepravý
}

shodná dotyková lišta = nový TouchBar([
  spin,
  nový TouchBarSpacer({size: 'large'}),
  reel1,
  nový TouchBarSpacer({size: 'small'}),
  reel2,
  nový TouchBarSpacer({size: 'small'}),
  reel3,
  nový TouchBarSpacer({size: 'large'}),
  výsledek
])

let okno

aplikace. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    šířka: 200,
    výška: 200,
    Barva pozadí: '#000'
  })
  okno. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


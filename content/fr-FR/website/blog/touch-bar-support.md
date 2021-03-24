---
title: Support de la barre tactile
author: kevinsawicki
date: '2017-03-08'
---

La version bêta d'Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) contient la prise en charge initiale de la [Touch Bar de macOS](https://developer.apple.com/macos/touch-bar).

---

La nouvelle API Touch Bar vous permet d'ajouter des boutons, des étiquettes, des popovers, des sélecteurs de couleur, des curseurs et des espaces. Ces éléments peuvent être mis à jour dynamiquement et émettent également des événements quand ils sont interactifs.

Il s'agit de la première version de cette API, donc elle évoluera dans les prochaines versions d'Electron. Veuillez consulter les notes de version pour plus de mises à jour et ouvrir [problèmes](https://github.com/electron/electron/issues) pour tout problème ou fonctionnalité manquante.

Vous pouvez installer cette version via `npm install electron@beta` et en apprendre plus sur elle dans la [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) et [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) documentation d'Electron.

Un grand merci à [@MarshallOfSound](https://github.com/MarshallOfSound) pour sa contribution à Electron. :tada:

## Exemple de barre tactile

![Barre tactile Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Voici un exemple de création d'un jeu de machine à sous simple dans la barre de contact. Il montre comment créer une barre tactile, styliser les éléments, l'associer à une fenêtre , gérez les événements des clics sur le bouton, et mettez à jour les étiquettes dynamiquement.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Spin result = new TouchBarel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  couleur de fond : '#7851A9',
  click: () => {
    // Ignorer les clics si déjà en tournant
    if (spinning) {
      return
    }

    spinning = true
    résultat. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 secondes
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      if (Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Ralentit un peu à chaque spin
        timeout *= 1. setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  valeurs const = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  valeurs de retour[Math. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. label, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Toutes les 3 valeurs sont le même
    résultat. abel = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    extColor = null
  }
  spinning = false
}

const touchBar = new TouchBar([
  spin,
  nouvelles TouchBarSpacer({size: 'large'}),
  reel1,
  nouvelles TouchBarSpacer({size: 'small'}),
  reel2,
  nouveaux TouchBarSpacer({size: 'small'}),
  reel3,
  nouveaux TouchBarSpacer({size: 'large'}),
  résultat
])

let window

app. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    largeur: 200,
    hauteur: 200,
    backgroundColor: '#000'
  })
  fenêtre. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```


## Classe : TouchBar

> Créer une disposition TouchBar pour les applications natives macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `options` Object 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (facultatif)

Créer une nouvelle touch bar avec les éléments spécifiés. `BrowserWindow.setTouchBar` permet d'ajouter la `TouchBar` à une fenêtre.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

**Astuce :** Si vous n’avez pas un MacBook avec Touch Bar, vous pouvez utiliser [Touch Bar simulator](https://github.com/sindresorhus/touch-bar-simulator) pour tester la Touch Bar dans votre application.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBar` :

#### `touchBar.escapeItem`

Le `TouchBarButton` remplacera le bouton "esc" sur la touch bar lorsqu’il sera défini. Le définir à `null` restaurera le bouton "esc". Changer cette valeur immédiatement met à jour le bouton "esc" dans la touch bar.

## Exemples

Voici un exemple d’un jeu de machine à sous dans la touch bar avec un bouton et quelques labels.

```javascript
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarLabel, TouchBarButton, TouchBarSpacer} = TouchBar

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
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

### Exécution de l’exemple ci-dessus

Pour exécuter l’exemple ci-dessus, vous devrez (en supposant que vous avez un terminal ouvert dans le répertoire où vous souhaitez exécuter l’exemple) :

1. Enregistrez le fichier ci-dessus sur votre ordinateur comme `touchbar.js`
2. Installez Electron via `npm install electron`
3. Exécutez l’exemple avec Electron : `./node_modules/.bin/electron touchbar.js`

Vous devriez alors voir une nouvelle fenêtre Electron et l’application en cours d’exécution dans votre touch bar (ou touch bar emulator).
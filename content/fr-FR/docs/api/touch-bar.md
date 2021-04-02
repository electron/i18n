## Classe : TouchBar

> Créer une disposition TouchBar pour les applications natives macOS

Processus : [Main](../glossary.md#main-process)

### `nouvelle TouchBar (options)`

* `options` objet
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (facultatif)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (facultatif)

Crée une nouvelle barre tactile avec les éléments spécifiés. Utilisez `BrowserWindow.setTouchBar` pour ajouter le `TouchBar` à une fenêtre.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

**Astuce :** Si vous n’avez pas un MacBook avec Touch Bar, vous pouvez utiliser [Touch Bar simulator](https://github.com/sindresorhus/touch-bar-simulator) pour tester la Touch Bar dans votre application.

### Propriétés statiques

#### `TouchBarButton`

Une [`typeof TouchBarButton`](./touch-bar-button.md) référence à la `TouchBarButton` classe.

#### `TouchBarColorPicker`

Une [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) référence à la `TouchBarColorPicker` classe.

#### `TouchBarGroup`

Une [`typeof TouchBarGroup`](./touch-bar-group.md) référence à la `TouchBarGroup` classe.

#### `TouchBarLabel`

Une [`typeof TouchBarLabel`](./touch-bar-label.md) référence à la `TouchBarLabel` classe.

#### `TouchBarPopover`

Une [`typeof TouchBarPopover`](./touch-bar-popover.md) référence à la `TouchBarPopover` classe.

#### `TouchBarScrubber`

Une [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) référence à la `TouchBarScrubber` classe.

#### `TouchBarSegmentedControl`

Une [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) référence à la `TouchBarSegmentedControl` classe.

#### `TouchBarSlider`

Une [`typeof TouchBarSlider`](./touch-bar-slider.md) référence à la `TouchBarSlider` classe.

#### `TouchBarSpacer`

Une [`typeof TouchBarSpacer`](./touch-bar-spacer.md) référence à la `TouchBarSpacer` classe.

#### `TouchBarOtherItemsProxy`

Une [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) référence à la `TouchBarOtherItemsProxy` classe.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBar` :

#### `touchBar.escapeItem`

Un `TouchBarItem` qui remplacera le bouton « esc » sur la barre tactile lorsqu’il est réglé. Le définir à `null` restaurera le bouton "esc". Changer cette valeur immédiatement met à jour le bouton "esc" dans la touch bar.

## Exemples

Voici un exemple d’un jeu de machine à sous dans la touch bar avec un bouton et quelques labels.

```javascript
const { app, BrowserWindow, TouchBar } = require ('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = nouveau TouchBarLabel()

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  cliquez sur: () => {
    // Ignorer les clics si déjà tourner
    si (filature) {
      return
    }

    filature = true
    result.label = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 secondes
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      if ((Date.now)) - startTime) >= spinLength) {
        finishSpin()
      } autre {
        // Ralentissez un peu sur chaque tour
        délai d’attente *= 1,1
        setTimeout (spinReels, délai d’attente)
      }
    }

    spinReels ()
  }
})

const getRandomValue = () => {
  valeurs const = ['🍒', '💎', '7️', '🍊', '🔔', '⭐', '🍇', '🍀']
  return values[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue ()
}

const finishSpin = () => {
  const uniqueValues = new Set ([reel1.label, reel2.label, reel3.label]).size
  if (uniqueValues === 1) {
    // Les 3 valeurs sont les mêmes
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } autre si (valeurs uniques === 2) {
    // 2 valeurs sont les mêmes
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // Aucune valeur n’est la même
    result.label = '🙁 Spin Again'
    result.textColor = null
  }
  spinning = false
}

const touchBar = new TouchBar ({
  items: [
    spin,
    nouveau TouchBarSpacer ({ size: 'large' }),
    reel1,
    nouveau TouchBarSpacer ({ size: 'small' }),
    reel2,
    nouveau TouchBarSpacer ({ size: 'small' }),
    reel3,
    nouveau TouchBarSpacer ({ size: 'large' }),
    résultat
  ]
})

laisser la fenêtre

app.whenReady ().then()=> { fenêtre
  = nouveau BrowserWindow ({ cadre
    : faux,
    titleBarStyle: 'hiddenInset', largeur
    : 200,
    hauteur: 200,
    backgroundColor: '#000'
  })
  window.loadURL ('about:blank')
  window.setTouchBar (touchBar)
})
```

### Exécution de l’exemple ci-dessus

Pour exécuter l’exemple ci-dessus, vous devrez (en supposant que vous avez un terminal ouvert dans le répertoire où vous souhaitez exécuter l’exemple) :

1. Enregistrez le fichier ci-dessus sur votre ordinateur comme `touchbar.js`
2. Installez Electron via `npm install electron`
3. Exécutez l’exemple avec Electron : `./node_modules/.bin/electron touchbar.js`

Vous devriez alors voir une nouvelle fenêtre Electron et l’application en cours d’exécution dans votre touch bar (ou touch bar emulator).

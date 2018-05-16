## Classe : TouchBar

> Créer une disposition TouchBar pour les applications natives macOS

Processus : [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `options` Objet 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (optional)

Créer une nouvelle touch bar avec les éléments spécifiés. `BrowserWindow.setTouchBar` permet d'ajouter la `TouchBar` à une fenêtre.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

**Astuce :** Si vous n’avez pas un MacBook avec Touch Bar, vous pouvez utiliser [Touch Bar simulator](https://github.com/sindresorhus/touch-bar-simulator) pour tester la Touch Bar dans votre application.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBar` :

#### `touchBar.escapeItem`

The `TouchBarButton` that will replace the "esc" button on the touch bar when set. Le définir à `null` restaurera le bouton "esc". Changer cette valeur immédiatement met à jour le bouton "esc" dans la touch bar.

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
  label: '
```

### Exécution de l’exemple ci-dessus

To run the example above, you'll need to (assuming you've got a terminal open in the dirtectory you want to run the example):

1. Enregistrez le fichier ci-dessus sur votre ordinateur comme `touchbar.js`
2. Installez Electron via `npm install electron`
3. Exécutez l’exemple avec Electron : `./node_modules/.bin/electron touchbar.js`

Vous devriez alors voir une nouvelle fenêtre Electron et l’application en cours d’exécution dans votre touch bar (ou touch bar emulator).
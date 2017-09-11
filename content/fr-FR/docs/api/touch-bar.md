## Classe : TouchBar

> Créer une disposition TouchBar pour les applications natives macOS

Processus : [Principal](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `options` - Objet 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (facultatif)

Créer une nouvelle touch bar avec les éléments spécifiés. `BrowserWindow.setTouchBar` permet d'ajouter la `TouchBar` à une fenêtre.

**Remarque :** L’API TouchBar est actuellement expérimentale et peut changer ou être supprimée dans les futures mises à jour d'Electron.

**Astuce :** Si vous n’avez pas un MacBook avec Touch Bar, vous pouvez utiliser [Touch Bar simulator](https://github.com/sindresorhus/touch-bar-simulator) pour tester la Touch Bar dans votre application.

### Propriétés d'instance

Les propriétés suivantes sont disponibles pour les instances de `TouchBar` :

#### `touchBar.escapeItem`

The `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## Exemples

Below is an example of a simple slot machine touch bar game with a button and some labels.

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

### Running the above example

To run the example above, you'll need to (assuming you've got a terminal open in the dirtectory you want to run the example):

1. Save the above file to your computer as `touchbar.js`
2. Install Electron via `npm install electron`
3. Run the example inside Electron: `./node_modules/.bin/electron touchbar.js`

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).
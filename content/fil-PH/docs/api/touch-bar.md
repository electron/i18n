## Klase : TouchBar

> Gumawa ng TouchBar layout para sa native macOS na aplikasyon.

Proseso: [Main](../tutorial/quick-start.md#main-process)

### `bagong TouchBar(pagpipilian)`*Experimental*

* `mga pagpipilian` Bagay 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (opsyonal) 

Gumawa ng bagong touch bar kasama ang mga tinukoy na aytem. Gamitin ang `BrowserWindow.setTouchBar` para idagdag `TouchBar` sa isang window. 

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

**Tip:** Kung wala kang MacBook na may Touch Bar, pwede kang gumamit ng [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) upang subukan ang paggamit ng Bar ng Touch sa inyong app.

### Humahalimbawa sa bahagi nito

Ang mga sumusunod na katangian ay magagamit sa mga pagkakataon ng `TouchBar`: 

#### `touchBar.escapeItem
 `

Ang `TouchBarButton` na papalitan ng "esc" button sa touch bar ng set. Setting na`null` nagbabalik ng default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## Examples

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
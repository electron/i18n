## Klase : TouchBar

> Gumawa ng TouchBar layout para sa native macOS na aplikasyon.

Proseso: [Pangunahing](../tutorial/quick-start.md#main-process)

### `bagong TouchBar(pagpipilian)`*Experimental*

* `pagpipilian` Bagay 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (optional)

Gumawa ng bagong touch bar kasama ang mga tinukoy na aytem. Gamitin ang `BrowserWindow.setTouchBar` para idagdag `TouchBar` sa isang window. 

**Note:** Ang TouchBar API ay kasalukuyang eksperimental at maaring mabago o pwedeng tangalin sa panghinaharap na pag-release ng Electron. 

**Tip:** Kung wala kang MacBook na may Touch Bar, pwede kang gumamit ng [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) upang subukan ang paggamit ng Bar ng Touch sa inyong app.

### Katangian ng pagkakataon

Ang mga sumusunod na katangian ay magagamit sa mga pagkakataon ng `TouchBar`: 

#### `touchBar.escapeItem
 `

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting na`null` nagbabalik ng default "esc" button. Ang pagbabago ng value ay kaagad na nag nag-aapdeyt sa escape item sa touch bar.

## Mga Halimbawa

Sa ibaba ay halimbawa ng simpleng laro ng slot machine touch bar kasama ang button na may mga pangalan.

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

### Pinapatakbo ang mga halimbawa sa taas.

Upang mapagana ang halimbawa sa itaas, kailangan mong (ipalagay na nabuksan mo ang terminal sa lokasyon ng directory kung saan mo gustong mapagana ang halimbawa):

1. I-save ang itaas na file sa iyong kompyuter bilang `touchbar.js`
2. Mag instala ng Electron sa pamamagitan ng `npm mag instala ng electron`
3. Patakbohin ang mga halimbawa sa loob ng Electron: `./node_modules/.bin/electron touchbar.js`

Makakakita ka ng bagong Electron window at ang aplikasyon na tumatakbo sa iyong touch bar (o touch bar emulator).
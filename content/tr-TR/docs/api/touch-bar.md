## Sınıf: TouchBar

> Yerel macOS uygulamaları için TouchBar düzenlemeleri oluşturun

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBar(options)` *Experimental*

* `seçenekler` Nesne 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (optional)

Belirli öğelerle yeni bir dokunmatik çubuk oluşturun. Bir pencereye `TouchBar` eklemek için `BrowserWindow.setTouchBar` kullanmalısınız.

**Not:** TouchBar API şu anda deneyseldir ve gelecekteki Electron sürümlerinde değişebilir veya kaldırılabilir.

**İpucu:** Eğer MacBook'unuzda Touch Bar yoksa, uygulamanızda Touch Bar kullanımını test etmek için [Touch Bar Simülatör](https://github.com/sindresorhus/touch-bar-simulator)'ünü kullanabilirsiniz.

### Örnek özellikleri

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBar.escapeItem`

`TouchBarButton` ayarlandığında, touch bar üzerindeki "esc" düğmesinin yerini alır. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## Örnekler

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

Ardından yeni bir Electron penceresi ve uygulamanızın dokunmatik çubuğunuzda (veya dokunmatik çubuklu emülatörünüzde) çalıştığını görmeniz gerekir.
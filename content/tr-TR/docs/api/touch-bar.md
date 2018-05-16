## Sınıf: TouchBar

> Yerel macOS uygulamaları için TouchBar düzenlemeleri oluşturun

İşlem: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBar(seçenekler)` *Experimental*

* `seçenekler` Nesnesi 
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[]
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (optional)

Belirli öğelerle yeni bir dokunmatik çubuk oluşturun. Bir pencereye `TouchBar` eklemek için `BrowserWindow.setTouchBar` kullanmalısınız.

**Not:** TouchBar API'si şu anda deneyseldir ve ileriki Electron sürümlerinde değişebilir veya silinebilir.

**İpucu:** Eğer MacBook'unuzda Touch Bar yoksa, uygulamanızda Touch Bar kullanımını test etmek için [Touch Bar Simülatör](https://github.com/sindresorhus/touch-bar-simulator)'ünü kullanabilirsiniz.

### Örnek Özellikler

Aşağıdaki özellikler `TouchBar` örneklerinde mevcuttur:

#### `touchBar.escapeItem`

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. `null` olarak ayarlamak varsayılan "esc" düğmesini geri yükler. Bu değeri değiştirmek, touch bar üzerindeki öğeyi hemen günceller.

## Örnekler

Aşağıda düğme ve bazı etiketler içeren basit bir slot makinesi touch bar oyunu örnek olarak verilmiştir.

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

### Yukarıdaki örneğin çalıştırılması

To run the example above, you'll need to (assuming you've got a terminal open in the directory you want to run the example):

1. Yukarıdaki dosyayı `touchbar.js` olarak bilgisayarınıza kaydedin
2. `npm install electron` aracılığıyla Electron'u yükleyin
3. Örneği Electron'da çalıştırın: `./node_modules/.bin/electron touchbar.js`

Ardından yeni bir Electron penceresi ve uygulamanızın dokunmatik çubuğunuzda (veya dokunmatik çubuklu emülatörünüzde) çalıştığını görmeniz gerekir.
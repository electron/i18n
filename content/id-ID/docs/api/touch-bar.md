## Kelas: SentuhBar

> Buatlah TouchBar layout untuk aplikasi asli macOS

Proses: [utama](../tutorial/quick-start.md#main-process)

### `baru TouchBar(options)` *Experimental*

* `pilihan` Benda 
  * `item` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) []
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (optional)

Buatlah bar sentuhan baru dengan item tertentu. Gunakan `BrowserWindow.setTouchBar` untuk menambahkan `TouchBar` ke jendela.

**Catatan:** TouchBar API saat ini masih bersifat eksperimental dan mungkin akan berubah atau dihapus saat rilis elektron di masa depan.

**Tip:** Jika Anda tidak memiliki sebuah MacBook dengan bar sentuhan, Anda dapat menggunakan [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) untuk menguji penggunaan bar sentuhan dalam aplikasi Anda.

### Contoh properti

Berikut cara yang tersedia pada contoh-contoh dari `TouchBar`:

#### `touchBar.escapeItem`

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. Atur ke `null` untuk mengembalikan default "esc" tombol. Mengubah nilai segera update item keluar di bar sentuhan.

## Contoh

Berikut adalah contoh sederhana bar sentuhan pada mesin slot permainan dengan tombol dan beberapa label.

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

### Menjalankan contoh di atas

To run the example above, you'll need to (assuming you've got a terminal open in the directory you want to run the example):

1. Simpan file di atas ke komputer Anda sebagai `touchbar.js`
2. Instal elektron melalui `npm menginstal elektron`
3. Jalankan contoh di dalam elektron: `./node_modules/.bin/electron touchbar.js`

Anda harus melihat jendela baru elektron dan aplikasi yang berjalan di bar sentuhan Anda (atau bar sentuhan emulator).
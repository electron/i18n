## Class: ng BrowserView

> Lumikha at kontrolin ang mga nakikita.

Proseso:[Pangunahi](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Ito ay katulad ng isang batang window, maliban na ito ay naka-posisyon kaugnay sa kanyang angking window. Ito ay sinadya na maging isang alternatibo ng mga tag ng `webview`.

### Halimbawa

```javascript
// Sa mga pangunahing proseso.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` _Experimental_

* `options` Object (optional)
  * `webPreferences` Bagay (opsyonal) - Tingnan ang [BrowserWindow](browser-window.md).

### Katangian ng pagkakataon

Mga bagay na ginawa na may `new BrowserView`ay may mga sumusunod na katangian:

#### `view.webContents` _Experimental_

Ang isang [`WebContents`](web-contents.md) na bagay na pag-aari ng tanawin na ito.

### Mga Halimbawa ng Sistematikong Paraan

Mga bagay na ginawa na may `new BrowserView` ay may mga sumusunod na mga pamamaraan ng pagkakataon:

#### `view.setAutoResize(options)` _Experimental_

* `options` Object
  * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.

#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Binabago ang laki at inililipat ang view mula sa ibinibigay na hangganan na may kaugnayan sa window.

#### `view.getBounds()` _Experimental_

Nagbabalik[`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.

#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.

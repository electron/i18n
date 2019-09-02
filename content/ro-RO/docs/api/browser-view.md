## Class-Clasa: BrowserView- VizualizareaBrowseru-ului

> Crează și controlează vizualizările.

Proces-ul: [Main](../glossary.md#main-process) - Principal</0>

O `BroswerView- VizualizareABrowser-ului` poate fi folosită la încorporarea de conținut web adițional în [`BrowserWindow-FereastraBrowser-ului`](browser-window.md). Acționează ca o fereastră copil, cu excepția că este relativ poziționată lângă propia sa fereastră. A fost creat ca o alternativă la eticheta `wedview-vizualizareweb`.

## Exemplu

```javascript
// În procesul principal-main.
const { BrowserView, BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.on('closed', () => {
  win = null
})
let view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### ` noua BrowserView-VizualizareABrowser-ului([options])`*Experimentează *

* `opțiuni` Object -Obiect (opțional) 
  * `webPreferences-PreferințeWeb`Object(opțional) - Vezi [BrowserWindow](browser-window.md).

### Metode Statice

#### `BrowserView.getAllViews()`

Întoarce `BrowserView[]` - O mulțime a tuturor FerestrelorBrowser-ului.

#### `BrowserView.fromWebContents(ConținutulWeb)`

* `webContents` [WebContents](web-contents.md)

Întoarce `BrowserView | null` - BrowserView care deține `webContents` sau `null` dacă conținutul nu e deținut de un BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Întoarce `BroswerView` - Priveliștea cu date `id`.

### Propietățile inițiale

Crearea obiectelor cu `new BrowserView` au următoarele propiețăti:

#### `view.webContents` *Experimental*

Obiectul `WebContents<//0> deținut de această priveliște.</p>

<h4><code>view.id` *Experimental*</h4> 

`Integer` reprezintă ID-ul unic a acestei priveliști.

### Metode de Instanță

Obiectele create cu `new BrowserView` au următoarele metode de instanță:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Experimental*

* `opțiuni` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean - If `true`, the view's x position and width will grow and shrink proportionly with the window. `false` by default.
  * `vertical` Boolean - If `true`, the view's y position and height will grow and shrink proportinaly with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
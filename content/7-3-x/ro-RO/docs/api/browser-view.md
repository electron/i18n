## Class-Clasa: BrowserView- VizualizareaBrowseru-ului

> Crează și controlează vizualizările.

Proces-ul: [Main](../glossary.md#main-process) - Principal</0>

O `BroswerView- VizualizareABrowser-ului` poate fi folosită la încorporarea de conținut web adițional în [`BrowserWindow-FereastraBrowser-ului`](browser-window.md). Acționează ca o fereastră copil, cu excepția că este relativ poziționată lângă propia sa fereastră. A fost creat ca o alternativă la eticheta `wedview-vizualizareweb`.

### Exemplu

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

### ` noua BrowserView-VizualizareABrowser-ului([options])`_Experimentează _

* `options` Object (optional)
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

#### `view.webContents` _Experimental_

Obiectul

`WebContents<//0> deținut de această priveliște.</p>

<h4 spaces-before="0"><code>view.id` _Experimental_</h4> 

`Integer` reprezintă ID-ul unic a acestei priveliști.



### Metode de Instanță

Obiectele create cu `new BrowserView` au următoarele metode de instanță:



#### `view.destroy()`

Forțează închiderea priveliștei, evenimentele `unload` și `beforeunload` nu vor fi emise pentru pagina web. După terminarea priveliștei, cheamă this function cu scopul de a elibera din memorie și alte resurse cât mai repede posibil.



#### `view.isDestroyed()`

Întoarce valoare `Booleană ` - Dacă priveliștea este distrusă.



#### `view.setAutoResize(options)` _Experimental_

* `options` Object 
    * `width` Boolean (optional) - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean (optional) - If `true`, the view's height will grow and shrink together with the window. `false` by default.
  * `horizontal` Boolean (optional) - If `true`, the view's x position and width will grow and shrink proportionally with the window. `false` by default.
  * `vertical` Boolean (optional) - If `true`, the view's y position and height will grow and shrink proportionally with the window. `false` by default.



#### `view.setBounds(bounds)` _Experimental_

* `bounds` [Rectangle](structures/rectangle.md)

Redimensionează și mută vederea în limitele furnizate în raport cu fereastra.



#### `view.getBounds()` _Experimental_

Returns [`Rectangle`](structures/rectangle.md)

The `bounds` of this BrowserView instance as `Object`.



#### `view.setBackgroundColor(color)` _Experimental_

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.

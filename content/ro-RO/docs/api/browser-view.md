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

Forțează închiderea priveliștei, evenimentele `unload` și `beforeunload` nu vor fi emise pentru pagina web. După terminarea priveliștei, cheamă this function cu scopul de a elibera din memorie și alte resurse cât mai repede posibil.

#### `view.isDestroyed()`

Întoarce valoare `Booleană ` - Dacă priveliștea este distrusă.

#### `view.setAutoResize(options)` *Experimental*

* `opțiuni` Obiect 
  * `width-lățime` Boolean - Dacă `true-adevărat`, lățimea priveliștei va crește și se contractă împreună cu fereastra. `false-fals` din fabrică.
  * `height-înălțime` Boolean - Dacă `true-adevărat`, înălțimea priveliștii va crește și se va contracta împreună cu fereastra. `false-fals` din fabrică.
  * `horizontal-orizontal` Boolean - Dacă `true-adevărat`, poziția x a priveliștii și lățimea vor crește și contracta proporțional cu fereastra.`false-fals` din fabrică.
  * `vertical` Boolean - Dacă `true-adevărat`, poziția y și înălțimea priveliștii vor crește și contracta proporțional cu fereastra. `false-fals<0> din fabrică.</li>
</ul></li>
</ul>

<h4><code>view.setBounds(bounds)` *Experimental*</h4> 
    * `bounds` [Rectangle](structures/rectangle.md)
    
    Redimensionează și mută vederea în limitele furnizate în raport cu fereastra.
    
    #### `view.setBackgroundColor(color)` *Experimental*
    
    * `color` String - Șir - Culoare în formatele `#aarrggbb` sau `#argb`. Canalul alpha este opțional.
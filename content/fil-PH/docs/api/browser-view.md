## Class: ng BrowserView

> Lumikha at kontrolin ang mga nakikita.

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.

Proseso:[Pangunahi](../glossary.md#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](browser-window.md). Ito ay katulad ng isang batang window, maliban na ito ay naka-posisyon kaugnay sa kanyang angking window. Ito ay sinadya na maging isang alternatibo ng mga tag ng `webview`.

## Mga halimbawa

```javascript
// Ang pangunahing pag-proseso.
const {BrowserView, BrowserWindow} = kailangan('electron')

hayaang manalo = bagong BrowserWindow({width: 800, height: 600})
win.on('closed', () => {
  manalo = null
})

hayaang makita = bagong BrowserView({
  webPreferences: {
    nodeIntegration: false
  }
})
win.setBrowserView(tingnan)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
```

### `new BrowserView([options])` *Experimental*

* `pagpipilian` Bagay (opsyonal) 
  * `webPreferences` Bagay (opsyonal) - Tingnan ang [BrowserWindow](browser-window.md).

### Mga istatikong pamamaraan

#### `BrowserView.getAllViews()`

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### `BrowserView.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### `BrowserView.fromId(id)`

* `id` Integer

Nagbabalik ang `BrowserView` - Ang pagtanaw sa ibinigay na mga `id`.

### Mga Katangian ng Instansya

Mga bagay na ginawa na may `new BrowserView`ay may mga sumusunod na katangian:

#### `view.webContents` *Experimental*

Ang isang [`WebContents`](web-contents.md) na bagay na pag-aari ng tanawin na ito.

#### `view.id` *Experimental*

Ang isang `integer` kumakatawan sa natatanging ID ng tanawin.

### Instance Methods

Mga bagay na ginawa na may `new BrowserView` ay may mga sumusunod na mga pamamaraan ng pagkakataon:

#### `view.destroy()`

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### `view.isDestroyed()`

Returns `Boolean` - Whether the view is destroyed.

#### `view.setAutoResize(options)` *Experimental*

* `options` Bagay 
  * `width` Boolean - Kung ang `true`, ang lapad ng view ay lalaki at liliit kasabay ng window. `false` sa pamamagitan ng default.
  * `height` Boolean - Kung ang `true`, ang taas ng view ay lalaki at liliit kasabay ng window. `false` sa pamamagitan ng default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Binabago ang laki at inililipat ang view mula sa ibinibigay na hangganan na may kaugnayan sa window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Ang kulay sa form ng `#aarrggbb` o sa `#argb`. Ang channel ng alpha ay opsyonal.
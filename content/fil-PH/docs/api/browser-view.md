## Class: ng BrowserView

> Lumikha at kontrolin ang mga nakikita.

**Note:** Ang BrowserView API ay kasalukuyang eksperimental at maaaring mabago o matanggal sa hinaharap na pag-release ng Electron.

Ang proseso: [Main](../glossary.md#main-process)

Ang isang `BrowserView` ay maaaring magamit para i-embed ang karagdagang nilalaman ng web patungo sa isang `BrowserWindow`. Ito ay katulad ng isang batang window, maliban na ito ay naka-posisyon kaugnay sa kanyang angking window. Ito ay sinadya na maging isang alternatibo ng mga tag ng `webview`.

## Halimbawa

```javascript
// Sa mga pangunahing proseso.
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
view.webContents.loadURL('https://electron.atom.io')
```

### `new BrowserView([options])` *Experimental*

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `webPreferences` Bagay (opsyonal) - Tingnan ang [BrowserWindow](browser-window.md).

### Mga statik na pamamaraan

#### `BrowserView.fromId(id)`

* `id` Integer

Nagbabalik ang `BrowserView` - Ang pagtanaw sa ibinigay na mga `id`.

### Humahalimbawa sa bahagi nito

Mga bagay na ginawa na may `new BrowserView`ay may mga sumusunod na katangian:

#### `view.webContents` *Experimental*

Ang isang [`WebContents`](web-contents.md) na bagay na pag-aari ng tanawin na ito.

#### `view.id` *Experimental*

Ang isang `integer` kumakatawan sa natatanging ID ng tanawin.

### Mga pamamaraan ng pagkakataon

Mga bagay na ginawa na may `new BrowserView` ay may mga sumusunod na mga pamamaraan ng pagkakataon:

#### `view.setAutoResize(options)` *Experimental*

* `mga pagpipilian` Bagay 
  * `width` Boolean - Kung ang `true`, ang lapad ng view ay lalaki at liliit kasabay ng window. `false` sa pamamagitan ng default.
  * `height` Boolean - Kung ang `true`, ang taas ng view ay lalaki at liliit kasabay ng window. `false` sa pamamagitan ng default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Binabago ang laki at inililipat ang view mula sa ibinibigay na hangganan na may kaugnayan sa window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Ang kulay sa form ng `#aarrggbb` o sa `#argb`. Ang channel ng alpha ay opsyonal.
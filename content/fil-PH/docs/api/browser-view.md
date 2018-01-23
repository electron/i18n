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

A `Integer` representing the unique ID of the view.

### Instance Methods

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `mga pagpipilian` Bagay 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.
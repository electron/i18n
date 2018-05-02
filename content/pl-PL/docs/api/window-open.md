# Funkcja `window.open`

> Otwiera nowe okno i ładuje adres URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

Nowo utworzony obiekt `BrowserWindow` domyślnie dziedziczy opcje okna nadrzędnego. Aby zastąpić dziedziczone opcje, można je ustawić za pomocą `funkcji` typu String.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (optional)
* `features` String (optional)

Zwraca [`BrowserWindowProxy`](browser-window-proxy.md) - tworzy nowe okno i zwraca wystąpienie klasy `BrowserWindowProxy`.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options.

**Uwagi:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Wysyła komunikat do okna nadrzędnego określonego pochodzenia lub `*` w przypadku braku preferencji pochodzenia.

### Using Chrome's `window.open()` implementation

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Natywne wywołanie funkcji `window.open()` pozwala na synchroniczny dostęp do otwartych okien, dzięki temu jest to wygodny wybór, jeśli potrzebujesz otworzyć okno dialogowe lub okno Ustawień aplikacji.

Tę opcję można również ustawić poprzez tag `<webview>`:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// główny proces
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
  }
})
```

```javascript
// proces renderowania (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
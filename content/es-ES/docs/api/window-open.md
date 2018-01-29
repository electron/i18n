# `window.open` Función

> Abre una nueva ventana y carga una dirección URL.

When `window.open` is called to create a new window in a web page, a new instance of `BrowserWindow` will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

El proxy tiene implementada una limitada funcionalidad estándar para ser compatible con páginas web tradicionales. Para un control total de la nueva ventana deberías crear un `BrowserWindow` directamente.

La recien creada `BrowserWindow` heredará las opciones de la ventana principal por defecto. Para anular las opciones heredadas, puede configurarlas en la cadena `features`. cuerda.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (opcional)
* `features` String (opcional)

Devuelve [`BrowserWindowProxy`](browser-window-proxy.md) - Crea una nueva ventana y devuelve una instancia de la clase`BrowserWindowProxy`.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options.

**Notas:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript siempre estará deshabilitado en la `window` abierta si está deshabilitado en la ventana principal.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Using Chrome's `window.open()` implementation

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// proceso principal
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // abre una ventana modal
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
// proceso renderizador(mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
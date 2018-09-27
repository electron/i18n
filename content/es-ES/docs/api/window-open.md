# `window.open` Función

> Abre una nueva ventana y carga una dirección URL.

Cuando `window.open` es llamado para crear una nueva ventana en una página web, una nueva instancia de [`BrowserWindow`](browser-window.md) se creará para el `url` y se devolverá un proxy a `window.open` para dejar que la página tenga un control limitado sobre el.

El proxy tiene implementada una limitada funcionalidad estándar para ser compatible con páginas web tradicionales. Para un control total de la nueva ventana deberías crear un `BrowserWindow` directamente.

La recien creada `BrowserWindow` heredará las opciones de la ventana principal por defecto. Para anular las opciones heredadas, puede configurarlas en la cadena `features`. cuerda.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (opcional)
* `features` String (opcional)

Devuelve [`BrowserWindowProxy`](browser-window-proxy.md) - Crea una nueva ventana y devuelve una instancia de la clase`BrowserWindowProxy`.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Por ejemplo:

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* La integración de nodo siempre estará deshabilitada en la `window` abierta si está deshabilitada en la ventana principal.
* El aislamiento de contexto siempre estará habilitado en la `window` abierta si está habilitado en la ventana principal.
* JavaScript siempre estará deshabilitado en la `window` abierta si está deshabilitado en la ventana principal.
* Las características no estándares predeterminadas (que no son manejadas por Chromium o Electron) en `features` serán pasadas a cualquier manejador de evento registrado `new-window` de `webContent` en el argumento `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Utilizar la implementación `window.open()` de Chrome

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// main process
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
// renderer process (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
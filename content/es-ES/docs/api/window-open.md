# Abrir ventanas desde el renderer

There are several ways to control how windows are created from trusted or untrusted content within a renderer. Windows can be created from the renderer in two ways:

* clicking on links or submitting forms adorned with `target=_blank`
* JavaScript calling `window.open()`

Para contenido del mismo origen, la nueva ventana es creada dentro del mismo proceso, permitiendo al padres acceder a la ventana hija derectamente. Esto puede ser muy útil para las sub ventanas de la aplicación que actúan como paneles de preferencia o similares, ya que el padre puede renderizar directamente a la sub ventana, como si fuera un `div` en el padre. Este es el mismo comportamiento que en el navegador.

Cuando `nativeWindowOpen` se establece a false, `window.open` en cambio resulta en la creación de una [`BrowserWindowProxy`](browser-window-proxy.md), un envoltorio ligero alrededor de `BrowserWindow`.

Electron pairs this native Chrome `Window` with a BrowserWindow under the hood. You can take advantage of all the customization available when creating a BrowserWindow in the main process by using `webContents.setWindowOpenHandler()` for renderer-created windows.

BrowserWindow constructor options are set by, in increasing precedence order: parsed options from the `features` string from `window.open()`, security-related webPreferences inherited from the parent, and options given by [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Note that `webContents.setWindowOpenHandler` has final say and full privilege because it is invoked in the main process.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (opcional)
* `features` String (opcional)

Returns [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` is a comma-separated key-value list, following the standard format of the browser. Electron will parse `BrowserWindowConstructorOptions` out of this list where possible, for convenience. For full control and better ergonomics, consider using `webContents.setWindowOpenHandler` to customize the BrowserWindow creation.

A subset of `WebPreferences` can be set directly, unnested, from the features string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, and `webviewTag`.

Por ejemplo:

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**Notas:**

* La integración de nodo siempre estará deshabilitada en la `window` abierta si está deshabilitada en la ventana principal.
* El aislamiento de contexto siempre estará habilitado en la `window` abierta si está habilitado en la ventana principal.
* JavaScript siempre estará deshabilitado en la `window` abierta si está deshabilitado en la ventana principal.
* Las características no estándares (que no son manejadas por Chromium o Electron) dadas en `features` serán pasadas a cualquier manejador de evento registrado `did-create-window` de `webContents` en el argumento `options`.
* `frameName` follows the specification of `windowName` located in the [native documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters).

To customize or cancel the creation of the window, you can optionally set an override handler with `webContents.setWindowOpenHandler()` from the main process. Devolver `{ action: 'deny' }` cancela la ventana. Devolver `{action: 'allow', overrideBrowserWindowOptions: { ... } }` permitará abrir la ventana y configurar el `BrowserWindowConstructorOptions` que se usará al crear la ventana. Tenga en cuenta que esto es más poderoso que pasar opciones a través de la cadena de características, ya que el renderizador tiene privilegios más limitados para decidir las preferencias de seguridad que el proceso principal.

### Ejemplo de `Window` nativo

```javascript
// main.js
const mainWindow = new BrowserWindow()

// En este ejemplo, solo ventanas con la url `about:blank` serán creadas.
// All other urls will be blocked.
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url === 'about:blank') {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        frame: false,
        fullscreenable: false,
        backgroundColor: 'black',
        webPreferences: {
          preload: 'my-child-window-preload-script.js'
        }
      }
    }
  }
  return { action: 'deny' }
})
```

```javascript
// renderer process (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```

### Ejemplo de `BrowserWindowProxy`

```javascript

// main.js
const mainWindow = new BrowserWindow({
  webPreferences: { nativeWindowOpen: false }
})

mainWindow.webContents.setWindowOpenHandler(({ url }) => {
  if (url.startsWith('https://github.com/')) {
    return { action: 'allow' }
  }
  return { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // Por ejemplo...
  childWindow.webContents.on('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
// renderer.js
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```

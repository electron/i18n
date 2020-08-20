# Función `window.open`

> Abre una nueva ventana y carga una dirección URL.

Cuando `window.open` es llamado para crear una nueva ventana en una página web, una nueva instancia de [`BrowserWindow`](browser-window.md) se creará para el `url` y se devolverá un proxy a `window.open` para dejar que la página tenga un control limitado sobre el.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (opcional)
* `features` String (opcional)

Devuelve [`BrowserWindowProxy`](browser-window-proxy.md) - Crea una nueva ventana y devuelve una instancia de la clase`BrowserWindowProxy`.

La cadena `features` sigue el formato del navegador estándar, pero cada característica tiene que ser un campo de las opciones de `BrowserWindow`. Estas son las características que puedes establecer a través de `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Por ejemplo:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notas:**

* La integración de nodo siempre estará deshabilitada en la `window` abierta si está deshabilitada en la ventana principal.
* El aislamiento de contexto siempre estará habilitado en la `window` abierta si está habilitado en la ventana principal.
* JavaScript siempre estará deshabilitado en la `window` abierta si está deshabilitado en la ventana principal.
* Las características no estándares predeterminadas (que no son manejadas por Chromium o Electron) en `features` serán pasadas a cualquier manejador de evento registrado `new-window` de `webContent` en el argumento `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Envía un mensaje a la ventana principal con el origen especificado o `*` sin origen de preferencia.

### Utilizar la implementación `window.open()` de Chrome

Si se quiere utilizar la implementación `window.open()` incorporada de Chrome, configura `nativeWindowOpen` a `true` en el objeto de opciones `webPreferences`.

El `window.open()` nativo permite el acceso sincrónico a las ventanas abiertas, por lo tanto es una opción conveniente si se necesita abrir el cuadro de diálogo o una ventana de preferencias.

Esta opcion también puede ser configuradas en `<webview>`etiquetas:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

La creación de la `BrowserWindow`es personalizable a través del evento `new-window` de `WebContents`.

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

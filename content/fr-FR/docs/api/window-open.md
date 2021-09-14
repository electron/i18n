# Opening windows from the renderer

There are several ways to control how windows are created from trusted or untrusted content within a renderer. Windows can be created from the renderer in two ways:

* clicking on links or submitting forms adorned with `target=_blank`
* JavaScript calling `window.open()`

In non-sandboxed renderers, or when `nativeWindowOpen` is false (the default), this results in the creation of a [`BrowserWindowProxy`](browser-window-proxy.md), a light wrapper around `BrowserWindow`.

However, when the `sandbox` (or directly, `nativeWindowOpen`) option is set, a `Window` instance is created, as you'd expect in the browser. For same-origin content, the new window is created within the same process, enabling the parent to access the child window directly. This can be very useful for app sub-windows that act as preference panels, or similar, as the parent can render to the sub-window directly, as if it were a `div` in the parent.

Electron pairs this native Chrome `Window` with a BrowserWindow under the hood. You can take advantage of all the customization available when creating a BrowserWindow in the main process by using `webContents.setWindowOpenHandler()` for renderer-created windows.

Les options du constructeur BrowserWindow sont définies par ordre croissant de priorité : avec d'abord les options héritées du parent puis les options analysées à partir de la chaîne `features` de `window.open()` puis les webPreferences héritées du parent et liées à la sécurité et enfin les options données par [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Note that `webContents.setWindowOpenHandler` has final say and full privilege because it is invoked in the main process.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (facultatif)
* `features` String (facultatif)

Returns [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` is a comma-separated key-value list, following the standard format of the browser. Electron will parse `BrowserWindowConstructorOptions` out of this list where possible, for convenience. For full control and better ergonomics, consider using `webContents.setWindowOpenHandler` to customize the BrowserWindow creation.

A subset of `WebPreferences` can be set directly, unnested, from the features string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, and `webviewTag`.

Par exemple :

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**Remarque :**

* L'intégration de Node sera toujours désactivée dans le nouveau `window` si elle est désactivée sur la fenêtre parent.
* L'isolation du context sera toujours activée dans le nouveau `window` si elle est activée sur la fenêtre parent.
* JavaScript sera toujours désactivé dans le nouveau `window` si il est désactivé sur la fenêtre parent.
* Les fonctionnalités non standards (non gérées par Chromium ou Electron) renseignées dans `features` seront transmises à tout gestionnaire de l'événement `did-create-window` enregistré de `webContents` dans le paramètre `options`.
* `frameName` suit la spécification de `windowName` située dans la [documentation native](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters).

To customize or cancel the creation of the window, you can optionally set an override handler with `webContents.setWindowOpenHandler()` from the main process. Returning `false` cancels the window, while returning an object sets the `BrowserWindowConstructorOptions` used when creating the window. Note that this is more powerful than passing options through the feature string, as the renderer has more limited privileges in deciding security preferences than the main process.

### `BrowserWindowProxy` example

```javascript

main.js
const Fenetreprincipale = nouvelleFenetreNavigation ()

mainWindow.webContents.setGestionnairedeFenetreOuverte (({ url }) => {
  si (url.commencePar('https://github.com/')) {
    retour { action: 'allow' }
  }
  retour { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // Par exemple...
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

### Native `Window` example

```javascript
// main.js
const mainWindow = new BrowserWindow({
  webPreferences: {
    nativeWindowOpen: true
  }
})

// In this example, only windows with the `about:blank` url will be created.
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

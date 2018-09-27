# `window.open` Function

> Ouvre une nouvelle fenêtre et charge une URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

Le proxy implémente des fonctionnalités standard limitées pour être compatible avec des pages web traditionnelles. Pour un contrôle complet de la nouvelle fenêtre, vous devez créer directement un `BrowserWindow`.

Le nouveau `BrowserWindow` héritera des options de la fenêtre parent par défaut. Pour écraser ces options, vous pouvez les définir dans la chaîne de caractère `features`.

### `window.open(url[, frameName][, features])`

* `url` Chaîne de caractères
* `frameName` String (facultatif)
* `features` String (facultatif)

Retourne [`BrowserWindowProxy`](browser-window-proxy.md) - Créer une nouvelle fenêtre et retourne une instance de la classe `BrowserWindowProxy`.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Par exemple :

```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* L'intégration de Node sera toujours désactivée dans le nouveau `window` si elle est désactivée sur la fenêtre parent.
* L'isolation du context sera toujours activée dans le nouveau `window` si elle est activée sur la fenêtre parent.
* JavaScript sera toujours désactivé dans le nouveau `window` si il est désactivé sur la fenêtre parent.
* Les fonctionnalités non standards (qui ne sont pas gérés par Chromium ou Electron) renseignées dans `features` seront transmit à tous les événements `new-window` enregistrés de `webContent` dans le paramètre `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` Chaîne de caractères
* `targetOrigin` Chaîne de caractères

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### Utiliser l'implémentation `window.open()` de Chrome

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
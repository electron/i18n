# `window.open` Function

> Ouvre une nouvelle fenêtre et charge une URL.

Lorsque `window.open` est appelée pour créer une nouvelle fenêtre dans une page web, une nouvelle instance de `BrowserWindow` sera créée pour l' `url` et un proxy est retourné à `window.open` pour que la page aie un contrôle limité sur elle.

Le proxy implémente des fonctionnalités standard limitées pour être compatible avec des pages web traditionnelles. Pour un contrôle complet de la nouvelle fenêtre, vous devez créer directement un `BrowserWindow`.

Le nouveau `BrowserWindow` héritera des options de la fenêtre parent par défaut. Pour écraser ces options, vous pouvez les définir dans la chaîne de caractère `features`.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (facultatif)
* `features` String (facultatif)

Retourne [`BrowserWindowProxy`](browser-window-proxy.md) - Créer une nouvelle fenêtre et retourne une instance de la classe `BrowserWindowProxy`.

La chaîne de caractère `features` suit le format du standard navigateur, mais chaque fonctionnalité doit être un champ d'options appartenant à `BrowserWindow`.

**Remarque :**

* L'intégration de Node sera toujours désactivée dans le nouveau `window` si elle est désactivée sur la fenêtre parent.
* L'isolation du context sera toujours activée dans le nouveau `window` si elle est activée sur la fenêtre parent.
* JavaScript sera toujours désactivé dans le nouveau `window` si il est désactivé sur la fenêtre parent.
* Les fonctionnalités non standards (qui ne sont pas gérés par Chromium ou Electron) renseignées dans `features` seront transmit à tous les événements `new-window` enregistrés de `webContent` dans le paramètre `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Envoie un message à la fenêtre parent avec l'origine spécifié ou `*` pour aucune préférence d'origine.

### Utiliser l'implémentation `window.open()` de Chrome

Si vous souhaitez utiliser l'implémentation `window.open()` intégrée de Chrome, définissez `nativeWindowOpen` à `true` dans l'objet d'options `webPreferences`.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

Cette option peut également être définie sur des tags `<webview>` comme ceci :

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

La création du `BrowserWindow` est personnalisable via un événement `new-window` de `WebContents`.

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
    // Ouvre la fenêtre comme fenêtre modale
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
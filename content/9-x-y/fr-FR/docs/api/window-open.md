# `window.open` Function

> Ouvre une nouvelle fenêtre et charge une URL.

Lorsque `window.open` est appelé pour créer une nouvelle fenêtre dans une page web, une nouvelle instance de `Browser Window` est créée pour l'`url` , un proxy est alors retourné à <0>window.open</0> pour que la page ai un contrôle limité sur ce dernier.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (facultatif)
* `features` String (facultatif)

Retourne [`BrowserWindowProxy`](browser-window-proxy.md) - Créer une nouvelle fenêtre et retourne une instance de la classe `BrowserWindowProxy`.

La chaîne de caractère `features` suit le format du standard navigateur, mais chaque fonctionnalité doit être un champ d'options appartenant à `BrowserWindow`. Ce sont les fonctionnalités que peuvent être définies via la chaîne de caractère `features` : `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Par exemple :
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Remarque :**

* L'intégration de Node sera toujours désactivée dans le nouveau `window` si elle est désactivée sur la fenêtre parent.
* L'isolation du context sera toujours activée dans le nouveau `window` si elle est activée sur la fenêtre parent.
* JavaScript sera toujours désactivé dans le nouveau `window` si il est désactivé sur la fenêtre parent.
* Les fonctionnalités non standards (qui ne sont pas gérés par Chromium ou Electron) renseignées dans `features` seront transmit à tous les événements `new-window` enregistrés de `webContent` dans le paramètre `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` Chaîne de caractères
* `targetOrigin` String

Envoie un message à la fenêtre parent avec l'origine spécifié ou `*` pour aucune préférence d'origine.

### Utiliser l'implémentation `window.open()` de Chrome

Si vous souhaitez utiliser l'implémentation `window.open()` intégrée de Chrome, définissez `nativeWindowOpen` à `true` dans l'objet d'options `webPreferences`.

Le `window.open()` natif permet un accès synchrone aux fenêtres ouvertes, c'est donc un choix judicieux si vous avez besoin d'ouvrir une boîte de dialogue ou une fenêtre de préférences.

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

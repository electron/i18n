# Raccourcis clavier

## Vue d'ensemble

Cette fonctionnalité vous permet de configurer les raccourcis clavier locaux et globaux de votre application Electron.

## Exemple

### Raccourcis Locaux

Les raccourcis clavier locaux ne sont déclenchés que lorsque l'application a le focus. To configure a local keyboard shortcut, you need to specify an [`accelerator`][] property when creating a [MenuItem][] within the [Menu][] module.

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Electron',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
    click: () => { console.log('Electron rocks!') }
  }]
}))

Menu.setApplicationMenu(menu)
```

> REMARQUE : Dans le code ci-dessus, vous pouvez voir que l'accélérateur diffère selon le système d'exploitation de l'utilisateur . Pour MacOS, c'est `Alt+Cmd+I`, alors que pour Linux et Windows, c'est `Alt+Shift+I`.

Après avoir lancé l'application Electron, vous devriez voir le menu de l'application avec le raccourci local que vous venez de définir:

![Menu avec un raccourci local](../images/local-shortcut.png)

Si vous cliquez sur `Aide` ou appuyez sur l'accélérateur défini, puis ouvrez le terminal depuis lequel vous avez exécuté votre application Electron, vous verrez le message qui a été généré après avoir déclenché l'événement `click` : "Electron rocks!".

### Raccourcis globaux

Pour configurer un raccourci clavier global, vous devez utiliser le module [globalShortcut][] pour détecter les événements du clavier même si l'application n'a pas le focus.

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
}).then(createWindow)
```

> NOTE: Dans le code ci-dessus, la combinaison `CommandOrControl` utilise `Command` sur macOS et `Control` sur Windows/Linux.

Après avoir lancé l'application Electron, si vous appuyez sur la combinaison de touches définie puis que vous ouvrez le terminal depuis lequel vous avez exécuté votre application Electron, vous verrez Electron loves global shortcuts!

### Raccourcis dans un BrowserWindow

#### Utilisation des API web

Si vous voulez gérer les raccourcis clavier dans une [BrowserWindow][], vous pouvez écouter les `keyup` et `keydown` [DOM events][dom-events] dans le processus de rendu en utilisant l'API [addEventListener()][addEventListener-api].

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/web-apis|focus=renderer.js'
function handleKeyPress(event) {
  // Vous pouvez mettre ici du code de gestion des touches.
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`You pressed ${event.key}`);
}

window.addEventListener('keyup', handleKeyPress, true);
```

> Note: le troisième paramètre `true` signifie que l'écouteur recevra toujours les actions des touches avant les autres écouteurs d'événement afin qu'ils ne puissent pas appeler eux-même `stopPropagation()`.

#### Interception des événements dans le processus principal

L’événement [`before-input-event`](../api/web-contents.md#event-before-input-event) est émis avant d’envoyer les événements `keydown` et `keyup` dans la page. Il peut être utilisé pour intercepter et gérer des raccourcis personnalisés qui ne sont pas visibles dans le menu.

Commençons avec une application fonctionnelle issue du [Quick Start Guide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 })

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
})
```

Après avoir lancé l'application Electron, si vous ouvrez le terminal depuis lequel vous avez exécuté votre application Electron et appuyez sur la combinaison de touches `Ctrl+I` , vous allez voir que cette combinaison de touches a été interceptée avec succès.

#### Utilisation de bibliothèques tierces

Si vous ne voulez pas analyser manuellement les raccourcis, il existe des bibliothèque qui font de la détection avancée comme par exemple [mousetrap][]. Voici des exemples d’utilisation de `mousetrap` s'exécutant dans le processus Renderer :

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

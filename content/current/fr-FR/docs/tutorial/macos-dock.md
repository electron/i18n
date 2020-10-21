# dock MacOS

## Vue d'ensemble

Electron a des APIs pour configurer l'icône de l'application dans le macOS Dock. Une API macOS seule existe pour créer un menu de dock personnalisé, mais Electron utilise également l'icône de l'application dock comme point d'entrée pour les fonctionnalités multi-plateformes telles que [les documents récents](./recent-documents.md) et [la progression de l'application](./progress-bar.md).

Le dock personnalisé est généralement utilisé pour ajouter des raccourcis aux tâches pour lesquelles l'utilisateur ne voudrait pas ouvrir toute la fenêtre de l'application.

__Menu du Dock de Terminal.app :__

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Pour configurer votre menu de dock personnalisé, vous devez utiliser l'API [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) , qui n'est disponible que sur macOS.

## Example

Commencer avec une application fonctionnelle à partir du [Guide de démarrage rapide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'Nouvelle fenêtre',
    cliquez sur () { console. og('Nouvelle fenêtre') }
  }, {
    label: 'Nouvelle fenêtre avec les paramètres',
    sous-menu : [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

appli. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Après avoir lancé l'application Electron, faites un clic droit sur l'icône de l'application. Vous devriez voir le menu personnalisé que vous venez de définir:

![Menu du dock macOS](../images/macos-dock-menu.png)

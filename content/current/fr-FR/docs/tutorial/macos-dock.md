# dock MacOS

Electron a des APIs pour configurer l'icône de l'application dans le macOS Dock. Une API macOS-only existe et permet de créer des menu personnalisés dans le dock, mais Electron utilise aussi l'îcone de l'application dans le dock pour implémenter des fonctionnalités multiplateformes comme les [documents récents](./recent-documents.md) et la [ barre de progression](./progress-bar.md).

Le dock personnalisé est généralement utilisé pour ajouter des raccourcis aux tâches pour lesquelles l'utilisateur ne voudrait pas ouvrir toute la fenêtre de l'application.

__Menu du Dock de Terminal.app :__

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Pour définir votre menu du dock personnalisé, vous pouvez utiliser l'API `app.dock.setMenu`, qui n’est disponible que sur macOS :

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app.dock.setMenu(dockMenu)
```

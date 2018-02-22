# MacOS Dock

Electron has APIs to configure the app's icon in the macOS Dock. A macOS-only API exists to create a [a custom dock menu](#custom-dock-menu-mac-os), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Menu du Dock de Terminal.app :**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

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
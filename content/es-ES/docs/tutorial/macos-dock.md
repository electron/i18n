# MacOS Dock

Electron has APIs to configure the app's icon in the macOS Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Menu de Dock de Terminal.app:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Para configurar su menú de base personalizado, puede usar la API `app.dock.setMenu`, que sólo está disponible en macOS:

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
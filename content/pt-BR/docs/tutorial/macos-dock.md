# Dock do MacOS

Electron possui API's para configurar ícones de aplicativos no dock do macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

O dock customizado é frequentemente usado para adicionar atalhos para tarefas as quais o usuário não irá querer abrir totalmente a janela do aplicativo para acessá-la.

**Menu do Dock do Terminal.app:**

![Menu do Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Para definir o seu menu do dock customizado, você pode usar a API `app.dock.setMenu`, a qual está disponível apenas para o macOS:

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
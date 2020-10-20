# dock macOS

## Overview

Electron ha delle API per configuare l'icona dell'app nel dock macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

Il dock personalizzato è comunemente usato per aggiungere shortcut ai compiti che l'utente non vuole aprire, dovendo prima aprire l'intera finestra app.

__Menu dock di Terminal.app:__

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you need to use the [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, which is only available on macOS.

## Esempio

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

app.whenReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

After launching the Electron application, right click the application icon. You should see the custom menu you just defined:

![macOS dock menu](../images/macos-dock-menu.png)

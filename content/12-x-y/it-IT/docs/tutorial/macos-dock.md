# dock macOS

## Overview

Electron ha delle API per configuare l'icona dell'app nel dock macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Il dock personalizzato è comunemente usato per aggiungere shortcut ai compiti che l'utente non vuole aprire, dovendo prima aprire l'intera finestra app.

__Menu dock di Terminal.app:__

![Menu Dock][3]

Per impostare il menu dock personalizzato, è necessario utilizzare l'API [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) , disponibile solo su macOS.

## Esempio

Iniziando con un'applicazione funzionante dalla [Guida rapida](quick-start.md), aggiorna il file `main.js` con le righe seguenti:

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

Dopo aver lanciato l'applicazione Electron, fare clic con il tasto destro sull'icona dell'applicazione. Dovresti vedere il menu personalizzato che hai appena definito:

![menu dock macOS](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

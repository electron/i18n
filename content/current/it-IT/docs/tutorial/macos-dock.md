# dock macOS

## Overview

Electron ha delle API per configuare l'icona dell'app nel dock macOS. Esiste un'API di solo macOS per creare un menu di aggancio personalizzato, ma Electron utilizza anche l'icona dell'app dock come punto di entrata per funzioni cross-platform come [documenti recenti](./recent-documents.md) e [progresso dell'applicazione](./progress-bar.md).

Il dock personalizzato è comunemente usato per aggiungere shortcut ai compiti che l'utente non vuole aprire, dovendo prima aprire l'intera finestra app.

__Menu dock di Terminal.app:__

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Per impostare il menu dock personalizzato, è necessario utilizzare l'API [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) , disponibile solo su macOS.

## Esempio

Iniziando con un'applicazione funzionante dalla [Guida rapida](quick-start.md), aggiorna il file `main.js` con le righe seguenti:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'New Window',
    click () { console. og('New Window') }
  }, {
    label: 'New Window with Settings',
    sottomenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Dopo aver lanciato l'applicazione Electron, fare clic con il tasto destro sull'icona dell'applicazione. Dovresti vedere il menu personalizzato che hai appena definito:

![menu dock macOS](../images/macos-dock-menu.png)

# macOS Dock

## Overview

Electron heeft API's om het app pictogram in de macOS Dock te configureren. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Het aangepaste dock wordt vaak gebruikt om snelkoppelingen toe te voegen aan taken waarvoor de gebruiker niet het hele app-venster wil openen.

__Dock-menu van Terminal.app:__

![Dock Menu][3]

Om je eigen dock menu in te stellen, moet je gebruik maken van [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, die alleen beschikbaar is in macOS.

## Voorbeeld

Vanaf een werkende toepassing van de [Snelstartgids](quick-start.md), update het `main.js` bestand met de volgende regels:

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

Na het starten van de Electron applicatie, klik met de rechtermuisknop op het toepassingspictogram. Je zou het aangepaste menu dat je zojuist hebt gedefinieerd:

![macOS dock menu](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

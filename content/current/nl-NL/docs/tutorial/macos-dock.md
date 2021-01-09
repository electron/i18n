# macOS Dock

## Overview

Electron heeft API's om het app pictogram in de macOS Dock te configureren. Een macOS-alleen- API bestaat om een aangepast dock menu te maken, maar Electron gebruikt ook het app dock pictogram als het invoerpunt voor cross-platform functies zoals [recente documenten](./recent-documents.md) en [applicatievoortgang](./progress-bar.md).

Het aangepaste dock wordt vaak gebruikt om snelkoppelingen toe te voegen aan taken waarvoor de gebruiker niet het hele app-venster wil openen.

__Dock-menu van Terminal.app:__

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Om je eigen dock menu in te stellen, moet je gebruik maken van [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, die alleen beschikbaar is in macOS.

## Voorbeeld

Vanaf een werkende toepassing van de [Snelstartgids](quick-start.md), update het `main.js` bestand met de volgende regels:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'Nieuw Window',
    klik () { console. og('Nieuw Window') }
  }, {
    label: 'Nieuw venster met instellingen',
    submenu: [
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

Na het starten van de Electron applicatie, klik met de rechtermuisknop op het toepassingspictogram. Je zou het aangepaste menu dat je zojuist hebt gedefinieerd:

![macOS dock menu](../images/macos-dock-menu.png)

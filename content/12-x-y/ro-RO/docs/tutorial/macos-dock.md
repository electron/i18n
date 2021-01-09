# Dock macOS

## Overview

Electron are API-uri pentru a configura pictograma aplicației în Docul macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Dock-ul personalizat este folosit în mod obișnuit pentru a adăuga comenzi rapide la sarcini pentru care utilizatorul nu ar dori să deschidă întreaga fereastră.

__Meniu de andocare din Terminal.app:__

![Meniu andocare][3]

Pentru a seta meniul de andocare personalizat, trebuie să utilizaţi [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, care este disponibil numai pe macOS.

## Exemplu

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), actualizați fișierul `main.js` cu următoarele linii:

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

După lansarea aplicației Electron, click dreapta pe pictograma aplicației. Ar trebui să vezi meniul personalizat pe care tocmai l-ai definit:

![meniu de andocare macOS](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

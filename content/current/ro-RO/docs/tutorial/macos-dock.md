# Dock macOS

## Overview

Electron are API-uri pentru a configura pictograma aplicației în Docul macOS. Un macOS-only Există pentru a crea un meniu de andocare personalizat, dar Electron utilizează, de asemenea, pictograma de andocare a aplicației ca punct de intrare pentru caracteristici cross-platform ca [documente recente](./recent-documents.md) și [progresul aplicației](./progress-bar.md).

Dock-ul personalizat este folosit în mod obișnuit pentru a adăuga comenzi rapide la sarcini pentru care utilizatorul nu ar dori să deschidă întreaga fereastră.

__Meniu de andocare din Terminal.app:__

![Meniu andocare](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Pentru a seta meniul de andocare personalizat, trebuie să utilizaţi [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, care este disponibil numai pe macOS.

## Exemplu

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), actualizați fișierul `main.js` cu următoarele linii:

```javascript
const { app, Menu } = require('electron')

const dockMenu = Meniu. uildFromTemplate([
  {
    label: 'New Window',
    click () { consolă. og('Noua fereastră') }
  }, {
    eticheta: 'Fereastră nouă cu Setări',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

aplicație. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

După lansarea aplicației Electron, click dreapta pe pictograma aplicației. Ar trebui să vezi meniul personalizat pe care tocmai l-ai definit:

![meniu de andocare macOS](../images/macos-dock-menu.png)

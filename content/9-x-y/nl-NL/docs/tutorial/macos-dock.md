# macOS Dock

Electron heeft API's om het app pictogram in de macOS Dock te configureren. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Het aangepaste dock wordt vaak gebruikt om snelkoppelingen toe te voegen aan taken waarvoor de gebruiker niet het hele app-venster wil openen.

__Dock-menu van Terminal.app:__

![Dock Menu][3]

Om het aangepaste dock menu in te stellen, kunt u de `app.dock.setMenu` API gebruiken, die alleen beschikbaar is op macOS:

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

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

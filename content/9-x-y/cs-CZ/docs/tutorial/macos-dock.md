# makOS dok

Electron má API ke konfiguraci ikony aplikace v doku macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Vlastní dok se běžně používá k přidávání zástupců k úkolům, pro které by uživatel nechtěl otevřít celé okno aplikace.

__Nabídka Docku Terminal.app:__

![Nabídka doku][3]

Chcete-li nastavit vlastní dok menu, můžete použít `app.dock.setMenu` API, která je dostupná pouze na macOS:

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

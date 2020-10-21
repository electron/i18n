# MacOS Dock

Electron are API-uri pentru a configura pictograma aplicației în Docul macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Dock-ul personalizat este folosit în mod obișnuit pentru a adăuga comenzi rapide la sarcini pentru care utilizatorul nu ar dori să deschidă întreaga fereastră.

__Meniu de andocare din Terminal.app:__

![Meniu andocare][3]

Pentru a seta meniul de andocare personalizat, puteţi utiliza `app.dock.setMenu` API, care este disponibil numai pe macOS:

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

# MacOS Dock

Electron hat APIs zum Konfigurieren des App-Symbols im MacOS-Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Das benutzerdefinierte Dock wird häufig verwendet, um Verknüpfungen zu Aufgaben hinzuzufügen, für die der Benutzer nicht das gesamte App-Fenster öffnen möchte.

__Dock Menu der Terminal.app:__

![Dock-Menü][3]

Um Ihr eigenes Dock Menu festzulegen, können Sie die `app.dock.setMenu` API nutzen. Diese ist nur unter macOS verfügbar:

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

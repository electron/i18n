# dock MacOS

Elektron posiada API, aby skonfigurować ikonę aplikacji w Docku MacOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Niestandardowy dock jest powszechnie używany do dodawania skrótów do zadań, dla których użytkownik nie chce otworzyć całego okna aplikacji.

__Menu stacji dokującej Terminal.app:__

![Menu doku][3]

Aby ustawić własne menu doc, możesz użyć API `app.dock.setMenu` , które jest dostępne tylko na macOS:

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

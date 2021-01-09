# dock MacOS

## Przegląd

Elektron posiada API, aby skonfigurować ikonę aplikacji w Docku MacOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Niestandardowy dock jest powszechnie używany do dodawania skrótów do zadań, dla których użytkownik nie chce otworzyć całego okna aplikacji.

__Menu stacji dokującej Terminal.app:__

![Menu doku][3]

Aby ustawić własne menu doc, musisz użyć [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, które jest dostępne tylko na macOS.

## Przykład

Zaczynając od działającej aplikacji z [Szybki Start Przewodnik](quick-start.md), zaktualizuj `main.js` plik następującymi liniami:

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

Po uruchomieniu aplikacji Electron, kliknij prawym przyciskiem myszy na ikonę aplikacji. Powinieneś zobaczyć menu niestandardowe, które właśnie zdefiniowałeś:

![menu doku macOS](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

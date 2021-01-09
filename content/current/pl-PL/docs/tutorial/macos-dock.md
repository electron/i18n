# dock MacOS

## Przegląd

Elektron posiada API, aby skonfigurować ikonę aplikacji w Docku MacOS. Tylko macOS- API istnieje do stworzenia niestandardowego menu doku, ale Electron używa również ikony docka aplikacji jako punktu wejścia dla funkcji międzyplatformowych, takich jak [najnowsze dokumenty](./recent-documents.md) i [postęp aplikacji](./progress-bar.md).

Niestandardowy dock jest powszechnie używany do dodawania skrótów do zadań, dla których użytkownik nie chce otworzyć całego okna aplikacji.

__Menu stacji dokującej Terminal.app:__

![Menu doku](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Aby ustawić własne menu doc, musisz użyć [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, które jest dostępne tylko na macOS.

## Przykład

Zaczynając od działającej aplikacji z [Szybki Start Przewodnik](quick-start.md), zaktualizuj `main.js` plik następującymi liniami:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'New Window',
    click () { console. og('New Window') }
  }, {
    etykieta: 'Nowe okno z ustawieniami',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

aplikacja. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Po uruchomieniu aplikacji Electron, kliknij prawym przyciskiem myszy na ikonę aplikacji. Powinieneś zobaczyć menu niestandardowe, które właśnie zdefiniowałeś:

![menu doku macOS](../images/macos-dock-menu.png)

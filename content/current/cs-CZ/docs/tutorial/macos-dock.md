# makOS dok

## Přehled

Electron má API ke konfiguraci ikony aplikace v doku macOS. Existuje pouze macOS API pro vytvoření vlastní nabídky doku, ale Electron používá také ikonu doku aplikace jako vstupní bod pro funkce na různých platformách, jako je [nedávné dokumenty](./recent-documents.md) a [postup aplikace](./progress-bar.md).

Vlastní dok se běžně používá k přidávání zástupců k úkolům, pro které by uživatel nechtěl otevřít celé okno aplikace.

__Nabídka Docku Terminal.app:__

![Nabídka doku](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Chcete-li nastavit vlastní dok menu, musíte použít [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, , které je dostupné pouze na macOS.

## Ukázka

Začíná funkční aplikací z [Rychlé spuštění průvodce](quick-start.md), aktualizujte soubor `main.js` o následující řádky:

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'New Window',
    click () { console. og('New Window') }
  }, {
    štítek: 'New Window with Settings',
    submenu: [
      { label: 'Basic' }
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

aplikace. henReady().then() => {
  app.dock.setMenu(dockMenu)
})
```

Po spuštění Electron aplikace klikněte pravým tlačítkem myši na ikonu aplikace. Měli byste vidět vlastní nabídku, kterou jste právě definovali:

![macOS dok menu](../images/macos-dock-menu.png)

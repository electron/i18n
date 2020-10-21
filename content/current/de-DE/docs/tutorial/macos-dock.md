# macOS Dock

## Übersicht

Electron hat APIs zum Konfigurieren des App-Symbols im MacOS-Dock. Eine nur macOS- API existiert um ein benutzerdefiniertes Dock-Menü zu erstellen, aber Electron verwendet auch das Symbol für App-Dock als Einstiegspunkt für plattformübergreifende Funktionen wie [letzte Dokumente](./recent-documents.md) und [Anwendungsfortschritt](./progress-bar.md).

Das benutzerdefinierte Dock wird häufig verwendet, um Verknüpfungen zu Aufgaben hinzuzufügen, für die der Benutzer nicht das gesamte App-Fenster öffnen möchte.

__Dock Menu der Terminal.app:__

![Dock-Menü](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Um Ihr benutzerdefiniertes Dock-Menü festzulegen, müssen Sie das [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, verwenden, das nur auf macOS verfügbar ist.

## Beispiel

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menü. uildFromTemplate([
  {
    label: 'New Window',
    click () { console. og('Neues Window') }
  }, {
    label: 'Neues Fenster mit Einstellungen',
    Untermenü: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

App. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Nachdem Sie die Electron-Anwendung gestartet haben, klicken Sie mit der rechten Maustaste auf das Symbol der Anwendung. Sie sollten das benutzerdefinierte Menü sehen, das Sie gerade definiert haben:

![macOS-Dock-Menü](../images/macos-dock-menu.png)

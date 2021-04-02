# macOS Dock

## Übersicht

Electron hat APIs zum Konfigurieren des App-Symbols im MacOS-Dock. Eine macOS- -API vorhanden, um ein benutzerdefiniertes Dockmenü zu erstellen, aber Electron verwendet auch das App-Dock- -Symbol als Einstiegspunkt für plattformübergreifende Funktionen wie [aktuelle Dokumente][recent-documents] und [Anwendungsfortschritt][progress-bar].

Das benutzerdefinierte Dock wird häufig verwendet, um Verknüpfungen zu Aufgaben hinzuzufügen, für die der Benutzer nicht das gesamte App-Fenster öffnen möchte.

__Dock Menu der Terminal.app:__

![Dock-Menü][3]

Um Ihr benutzerdefiniertes Dock-Menü festzulegen, müssen Sie das [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, verwenden, das nur auf macOS verfügbar ist.

## Beispiel

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu.buildFromTemplate([
  '
    label: 'New Window',
    click () 'console.log('New Window') '
  ', '
    label: 'New Window with Settings',
    untermenü: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  ',
  ' Label: 'New Command'' •
])

app.whenReady().then()=>
  app.dock.setMenu(dockMenu)
)
```

Nachdem Sie die Electron-Anwendung gestartet haben, klicken Sie mit der rechten Maustaste auf das Symbol der Anwendung. Sie sollten das benutzerdefinierte Menü sehen, das Sie gerade definiert haben:

![macOS-Dock-Menü](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

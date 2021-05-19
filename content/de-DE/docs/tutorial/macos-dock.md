# Configuring the macOS Dock

Electron hat APIs zum Konfigurieren des App-Symbols im MacOS-Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Das benutzerdefinierte Dock wird häufig verwendet, um Verknüpfungen zu Aufgaben hinzuzufügen, für die der Benutzer nicht das gesamte App-Fenster öffnen möchte.

__Dock Menu der Terminal.app:__

![Dock-Menü][3]

Um Ihr benutzerdefiniertes Dock-Menü festzulegen, müssen Sie das [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, verwenden, das nur auf macOS verfügbar ist.

## Beispiel

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, BrowserWindow, Menu } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

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
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }
}).then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

```

Nachdem Sie die Electron-Anwendung gestartet haben, klicken Sie mit der rechten Maustaste auf das Symbol der Anwendung. Sie sollten das benutzerdefinierte Menü sehen, das Sie gerade definiert haben:

![macOS-Dock-Menü](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

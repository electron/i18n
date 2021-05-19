# Configuring the macOS Dock

Electron a des APIs pour configurer l'icône de l'application dans le macOS Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Le dock personnalisé est généralement utilisé pour ajouter des raccourcis aux tâches pour lesquelles l'utilisateur ne voudrait pas ouvrir toute la fenêtre de l'application.

__Menu du Dock de Terminal.app :__

![Menu Dock][3]

Pour configurer votre menu de dock personnalisé, vous devez utiliser l'API [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) , qui n'est disponible que sur macOS.

## Exemple

Commencer avec une application fonctionnelle à partir du [Guide de démarrage rapide](quick-start.md), mettez à jour le fichier `main.js` avec les lignes suivantes :

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

Après avoir lancé l'application Electron, faites un clic droit sur l'icône de l'application. Vous devriez voir le menu personnalisé que vous venez de définir:

![Menu du dock macOS](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

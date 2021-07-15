# Configuring the macOS Dock

Electron tiene APIs para configurar el icono de la aplicación en el Dock de macOS. Solo existe una API macOS para crear menú de dock personalizado, pero Electron además usa el icono de app dock como el punto de entrada para características multiplataforma como [recent documents][recent-documents] y [application progress][progress-bar].

La base de acoplamiento personalizada se utiliza habitualmente para añadir accesos directos a las tareas para las que el usuario no desea abrir toda la ventana de la aplicación.

__Menú Dock de Terminal.app:__

![Menu Dock][3]

To set your custom dock menu, you need to use the [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, which is only available on macOS.

## Ejemplo

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

After launching the Electron application, right click the application icon. You should see the custom menu you just defined:

![macOS dock menu](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

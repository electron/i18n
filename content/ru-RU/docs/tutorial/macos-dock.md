# Configuring the macOS Dock

У Electron есть API для настройки иконки приложения в macOS Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Пользовательская панель обычно используется для добавления ярлыков к задачам, для которых пользователь не хочет открыть окно всего приложения.

__Dock меню из Terminal.app:__

![Меню док-станции][3]

Чтобы настроить меню док-станции, вам нужно использовать [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, который доступен только в macOS.

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), обновите файл `main.js` с следующими строками:

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

После запуска приложения Electron щелкните правой кнопкой мыши на значке приложения. Вы должны увидеть пользовательское меню, которое вы только что определили:

![macOS док-меню](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

# Configuring the macOS Dock

Electron possui API's para configurar ícones de aplicativos no dock do macOS. A macOS-only API exists to create a custom dock menu, but Electron also uses the app dock icon as the entry point for cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

O dock customizado é frequentemente usado para adicionar atalhos para tarefas as quais o usuário não irá querer abrir totalmente a janela do aplicativo para acessá-la.

__Menu do Dock do Terminal.app:__

![Menu do Dock][3]

Para definir seu menu personalizado do dock, você precisa usar o [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, que só está disponível no macOS.

## Exemplo

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), atualize o `main.js` arquivo com as seguintes linhas:

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

Após iniciar o aplicativo Electron, clique com o botão direito no ícone do aplicativo. Você deve ver o menu personalizado que você acabou de definir:

![Menu dock do macOS](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

# dock do MacOS

## Visão Geral

Electron possui API's para configurar ícones de aplicativos no dock do macOS. Uma API somente macOS existe para criar um menu personalizado no Dock, mas o Electron também usa o ícone do dock do aplicativo como o ponto de entrada para recursos de multi-plataforma, como [documentos recentes](./recent-documents.md) e [progresso do aplicativo](./progress-bar.md).

O dock customizado é frequentemente usado para adicionar atalhos para tarefas as quais o usuário não irá querer abrir totalmente a janela do aplicativo para acessá-la.

__Menu do Dock do Terminal.app:__

![Menu do Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Para definir seu menu personalizado do dock, você precisa usar o [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, que só está disponível no macOS.

## Exemplo

Começando com um aplicativo de trabalho do [Guia de início rápido](quick-start.md), atualize o `main.js` arquivo com as seguintes linhas:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Menu. uildFromTemplate([
  {
    label: 'Nova Janela',
    click () { console. og('Nova janela') }
  }, {
    rótulo: 'Nova janela com configurações',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

aplicativo. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Após iniciar o aplicativo Electron, clique com o botão direito no ícone do aplicativo. Você deve ver o menu personalizado que você acabou de definir:

![Menu dock do macOS](../images/macos-dock-menu.png)

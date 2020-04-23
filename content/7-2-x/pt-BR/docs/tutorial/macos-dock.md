# Dock do MacOS

Electron possui API's para configurar ícones de aplicativos no dock do macOS. Uma API designada para o macOS existe para criar um menu customizado do dock, mas o Electron também usa o ícone de aplicativo para implementar recursos entre as plataformas assim como [documentos recentes](./recent-documents.md) e [progresso da aplicação](./progress-bar.md).

O dock customizado é frequentemente usado para adicionar atalhos para tarefas as quais o usuário não irá querer abrir totalmente a janela do aplicativo para acessá-la.

__Menu do Dock do Terminal.app:__

![Menu do Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Para definir o seu menu do dock customizado, você pode usar a API `app.dock.setMenu`, a qual está disponível apenas para o macOS:

```javascript
const { app, Menu } = require('electron')

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

app.dock.setMenu(dockMenu)
```

# Dock macOS

Electron ha delle API per configuare l'icona dell'app nel dock macOS. Una API solo per macOS esiste per creare un [dock menu personalizzato](#custom-dock-menu-mac-os), ma Electron usa anche l'icona del dock dell'app per implementare funzioni nella piattaforma come [documenti recenti](./recent-documents.md) e [progresso applicazione](./progress-bar.md).

Il dock personalizzato è comunemente usato per aggiungere shortcut ai compiti che l'utente non vuole aprire, dovendo prima aprire l'intera finestra app.

**Menu dock di Terminal.app:**

![Menu Dock](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Per impostare il tuo menu dock personalizzato, puoi udare l'API `app.dock.impostaMenu`, disponibile solo su macOS:

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
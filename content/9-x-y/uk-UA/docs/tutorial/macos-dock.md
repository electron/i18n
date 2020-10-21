# macOS Док

Electron має API для налаштування піктограми застосунка в macOS Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

Користувацький док зазвичай використовується для додавання ярликів до задач, в які користувач не зможе відкрити для цього весь додаток.

__Меню панелі Terminal.app:__

![Док-меню][3]

To set your custom dock menu, you can use the `app.dock.setMenu` API, which is only available on macOS:

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

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

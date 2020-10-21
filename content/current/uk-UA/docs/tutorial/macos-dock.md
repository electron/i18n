# macOS Док

## Огляд

Electron має API для налаштування піктограми застосунка в macOS Dock. macOS-only API існує для створення власного меню док-станції, але Electron також використовує піктограму app dock як точку запису для крос-платформених функцій, таких як [останні документи](./recent-documents.md) і [прогрес додатку](./progress-bar.md).

Користувацький док зазвичай використовується для додавання ярликів до задач, в які користувач не зможе відкрити для цього весь додаток.

__Меню панелі Terminal.app:__

![Док-меню](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you need to use the [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, which is only available on macOS.

## Приклад

Запуск робочого додатку з [короткого посібника](quick-start.md), оновити `main.js` файл наступними рядками:

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

app.whenReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

Після запуску програми Electron, клацніть правою кнопкою миші значок програми. Ви повинні побачити власне меню яке тільки що було визначено:

![меню dock macOS](../images/macos-dock-menu.png)

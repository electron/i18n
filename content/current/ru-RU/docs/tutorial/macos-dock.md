# macOS Dock

## Обзор

У Electron есть API для настройки иконки приложения в macOS Dock. API macOS только существует для создания меню док-станции, но Electron также использует значок приложения dock в качестве входной точки для кросс-платформенных функций, таких как [последние документы](./recent-documents.md) и [прогресс приложения](./progress-bar.md).

Пользовательская панель обычно используется для добавления ярлыков к задачам, для которых пользователь не хочет открыть окно всего приложения.

__Dock меню из Terminal.app:__

![Меню док-станции](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

Чтобы настроить меню док-станции, вам нужно использовать [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, который доступен только в macOS.

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), обновите файл `main.js` с следующими строками:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } = require('electron')

const dockMenu = Меню. uildFromTemplate([
  {
    label: 'New Window',
    click () { console. og('Новое Window') }
  }, {
    метка: 'Новое окно с настройками',
    подменю: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

приложение. henReady().then(() => {
  app.dock.setMenu(dockMenu)
})
```

После запуска приложения Electron щелкните правой кнопкой мыши на значке приложения. Вы должны увидеть пользовательское меню, которое вы только что определили:

![macOS док-меню](../images/macos-dock-menu.png)

# macOS Dock

## Обзор

У Electron есть API для настройки иконки приложения в macOS Dock. MacOS-только API существует для создания пользовательского меню док-станции, но Electron также использует значок док-станции приложения в качестве точки входа для кросс-платформенной функции, такие как [последние документы][recent-documents] и [прогресс приложения][progress-bar].

Пользовательская панель обычно используется для добавления ярлыков к задачам, для которых пользователь не хочет открыть окно всего приложения.

__Dock меню из Terminal.app:__

![Меню док-станции][3]

Чтобы настроить меню док-станции, вам нужно использовать [`app.dock.setMenu`](../api/dock.md#docksetmenumenu-macos) API, который доступен только в macOS.

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), обновите файл `main.js` с следующими строками:

```javascript fiddle='docs/fiddles/features/macos-dock-menu'
const { app, Menu } и требуют ('электрон')

const dockMenu и Menu.buildFromTemplate (я

    этикетке: "Новое окно",
    нажмите кнопку () консоль.log («Новое окно»)
  , метка
    : «Новое окно с настройками»,
    submenu:
      { label: 'Basic' },
      { label: 'Pro' }

  ,
  » метка: «Новая команда...» -
)

app.whenReady ().,тогда (()) -> -
  app.dock.setMenu (dockMenu)
)
```

После запуска приложения Electron щелкните правой кнопкой мыши на значке приложения. Вы должны увидеть пользовательское меню, которое вы только что определили:

![macOS док-меню](../images/macos-dock-menu.png)

[3]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

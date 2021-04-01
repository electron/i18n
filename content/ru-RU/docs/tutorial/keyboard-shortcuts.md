# Горячие клавиши

## Обзор

Эта функция позволяет настроить локальные и глобальные сочетания клавиш для приложения Electron.

## Пример

### Локальные горячие клавиши

Локальные сочетания клавиш запускаются только тогда, когда приложение сфокусировано. Чтобы настроить локальный ярлык клавиатуры, необходимо указать свойство [`accelerator`][] при создании [MenuItem][] в [меню][] модуля.

Начиная с рабочего приложения от [Руководство по быстрому](quick-start.md), обновите `main.js` файл с следующими строками:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } - требуют ('электрон')

const меню - новое меню ()
menu.append (новый MenuItem):
  'Electron',
  submenu:
    роль: 'помощь', ускоритель
    : process.platform - 'darwin'? 'Alt'Cmd'I': 'Alt'Shift'I',
    щелчок: ()> консоль.log ('Electron rocks!') (
  ))
Menu.

setApplicationMenu (меню)
```

> ПРИМЕЧАНИЕ: В коде выше, вы можете видеть, что ускоритель отличается операционной системы пользователя. Для MacOS, это `Alt+Cmd+I`, в то время как Linux и Windows, это `Alt+Shift+I`.

После запуска приложения Electron, вы должны увидеть меню приложения вместе с локальным ярлыком вы только что определили:

![Меню с местным ярлыком](../images/local-shortcut.png)

Если вы нажмете `Help` или нажмете на определенный ускоритель, а затем откройте терминал , с которого вы запустили приложение Electron, вы увидите сообщение, которое было сгенерировано после запуска события `click` : "Electron rocks!".

### Глобальные сочетания клавиш

Чтобы настроить глобальный ярлык клавиатуры, необходимо использовать модуль [GlobalShortcut][] для обнаружения событий клавиатуры, даже если приложение не имеет клавиатуре.

Начиная с рабочего приложения от [Руководство по быстрому](quick-start.md), обновите `main.js` файл с следующими строками:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } - требуют ('электрон')

app.whenReady ().,после этого (()) -> -
  globalShortcut.register ('Alt'CommandOrControl'i', () -> -
    консоли.log ("Электрон любит глобальные ярлыки!")
  В)
й).,тогда (создайтеWindow)
```

> ПРИМЕЧАНИЕ: В коде выше, комбинация `CommandOrControl` использует `Command` на macOS и `Control` windows/Linux.

После запуска приложения Electron, если вы нажимаете на определенную комбинацию клавиш , то откройте терминал, с которого вы запустили приложение Electron, вы увидите, что Electron любит глобальные ярлыки!

### Горячие клавиши в BrowserWindow

#### Использование веб-API

Если вы хотите обрабатывать сочетания клавиш в [BrowserWindow][], вы можете прослушать события `keyup` и `keydown` [DOM][dom-events] внутри процесса рендерера с помощью [addEventListener () API][addEventListener-api].

```js
window.addEventListener('keyup', doSomething, true)
```

Обратите внимание на третий параметр `true` , что слушатель всегда будет получать клавиши перед другими слушателями, чтобы они не могли `stopPropagation()` на них.

#### Перехват событий в основном процессе

Событие [` before-input-event `](../api/web-contents.md#event-before-input-event) генерируется перед отправкой событий ` keydown ` и ` keyup ` на странице. Может быть использовано для захвата и управления ярлыками, которые не видны в меню.

##### Пример

Начиная с рабочего приложения от [Руководство по быстрому](quick-start.md), обновите `main.js` файл с следующими строками:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } требует ('электрон')

app.whenReady ().., то (())>
  const win - новый BrowserWindow (ширина: 800, высота: 600, webPreferences: { nodeIntegration: true } )

  win.loadFile ('индекс.html')
  win.webContents.on ('до ввода-события', (событие, входные данные) -> -
    если (входной.контроль && ввод.key.toLowerCase () - 'i') - консоль
      .log ('Pressed Control'I')
      event.preventDefault ()
    -
  )
)
```

После запуска приложения Electron, если вы откроете терминал, который вы запустили ваше приложение Electron от и нажмите комбинацию клавиш `Ctrl+I` , вы увидите, эта комбинация ключей была успешно перехвачена.

#### Использование сторонних библиотек

Если вы не хотите делать ручной анализ ярлыка, есть библиотеки, которые делают обнаружения ключей, таких как [мышеловка][]. Ниже приведены примеры использования `mousetrap` в процессе Renderer:

```js
Mousetrap.bind ('4', () -> - консоль.log ('4')
Mousetrap.bind ('?', () -> - консоль.log ("Показать ярлыки!") В)
Mousetrap.bind ('esc', () -> консоль.log ('escape'), 'keyup')

// комбинации
Mousetrap.bind ('команда-смена'k', () -> - консоль.log ('command shift k') -

// карта нескольких комбинаций к одному и тому же обратному вызову
Mousetrap.bind ('command'k', 'ctrl'k', ()> - консоль
  .log ("команда k или control k')

  // возвращение ложного, чтобы предотвратить поведение по умолчанию и остановить событие от восходящей
  возвращение ложных
q)

// Gmail стиль последовательности
Mousetrap.bind ('g i', () - консоль> .log (перейдите в почтовый ящик')
Mousetrap.bind ('a', () -> - консоль.log ('выбрать все')

// konami код!
Mousetrap.bind('Вверх вниз слева справа b enter', () => {
  console.log('konami code')
})
```

[меню]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[GlobalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[мышеловка]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

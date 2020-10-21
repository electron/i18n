# Гарячі Клавіші

> Налаштувати локальні і глобальні клавіші швидкого запуску

## Локальні ярлики

Ви можете використовувати [Меню](../api/menu.md) для налаштування комбінацій клавіш, які будуть викликатись , лише коли застосунок буде у фокусі. Для цього вкажіть параметр [`accelerator`] під час створення [MenuItem](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const меню = new Menu()

меню. ppend(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { консоль. og('time to print stuff') }
}))
```

Ви можете налаштувати різні комбінації клавіш на основі операційної системи користувача.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'

```

## Глобальні комбінації клавіш

Ви можете використовувати модуль [globalShortcut](../api/global-shortcut.md) для виявлення подій клавіатури, навіть якщо програма не має фокусу клавіатури.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X натиснуто')
  })
})
```

## Ярлики в вікні браузера

Якщо ви хочете запустити ярлики клавіатури для [BrowserWindow](../api/browser-window.md), ви можете використовувати `keyup` та `keydown` слухачів подій на віконному об'єкті в процесі рендерингу.

```js
window.addEventListener('keyup', doSomething, true)
```

Зверніть увагу на третій параметр `true` , це означає, що слухач завжди отримуватиме натискання клавіш перед іншими слухачами, щоб вони не могли мати `stopPropagation()` викликані на них.

The [`before-input-event`](../api/web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. Можна використовувати , щоб зловити і обробити користувацькі ярлики, які не відображаються в меню.

Якщо ви не бажаєте провести ручний ярлик - це бібліотеки, що створюють розширене виявлення ключів, наприклад [мишоловок](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => консоль. og('показати ярлики!') })
Mousetrap.bind('esc', () => консоль. og('escape') }, 'keyup')

// комбінація
Mousetrap.bind('command+shift+k', () => { консоль. og('command shift k') })

// вміщують декілька комбінацій на той самий зворотний
Мусетрап. ind(['command+k', 'ctrl+k'], () => {
  консоль. og('command k або control k')

  // повернути false для запобігання поведінці за замовчуванням і зупинити події від бульбашок
  повертати false
})

// gmail стилю послідовностей
Мусетрап. ind('g i', () => { console.log('go to inbox') })
Мусетрап. ind('* a', () => { console.log('select all') })

// код коннамі!
Mousetrap.bind('вгору вниз праворуч ліворуч ліворуч b a enter', () => {
  console.log('konami code')
})
```

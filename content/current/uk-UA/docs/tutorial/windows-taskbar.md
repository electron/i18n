# Панель завдань Windows

## Огляд

Electron має API для налаштування значка додатка на панелі задач Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## Список JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Це контекстне меню називається `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Додатки визначають завдання і на основі функцій програми і ключа очікується, що користувач зробить з ними. Завдання повинні бути без контексту, в , що програма не повинна виконуватись для їх роботи. Ці також повинні бути статистично найбільш поширеними діями, які міг би нормальний користувач виконувати у програмі, наприклад створення повідомлення електронної пошти або відкриття календаря в програмі пошти, створити новий документ в текстовому процесорі, запустіть програму в певному режимі або запустіть одну з її підкоманд. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Не використовуйте завдання для рекламних елементів, таких як оновлення або спеціальні пропозиції.
> 
> Настійно рекомендується зробити список завдань статичним. Він повинен залишатись і незалежно від стану або статусу програми. Незважаючи на те, що можливо змінювати список динамічно, ви повинні вважати, що це може заплутати користувача, який не очікує від цієї частини списку призначення до зміни.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Приклади

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Ця панель інструментів є звичним стандартною лінією керування. Він має максимум сім кнопок. ID кожної кнопки, зображення, підказки та стану встановлюються в структурі, яка потім передається на панель завдань. Додаток може показати, увімкнути, вимкнути або приховати кнопки з мініатюр панелі інструментів, як це необхідно поточного стану.
> 
> Наприклад, Windows Media Player може запропонувати стандартні транспортні засоби такі як гра, пауза, приглушення та зупинка.

![гравець](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Приклади

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win. etThumbarButtons([
  {
    tooltip: 'button1',
    іконка: шлях. oin(__dirname, 'button1.png'),
    натисніть () { консоль. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    піктограма: path.join(__dirname, 'button2. ng'),
    прапори: ['enabled', 'dismissonclick'],
    клацніть () { консоль. og('button2 натиснуто.') }
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Накладання іконок на панелі завдань

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Накладки іконок служать контекстним повідомленням про статус, і призначені для заперечення необхідності окремого значка статусу сповіщення для зв'язку з цією інформацією користувача. Наприклад, новий статус пошти в Microsoft Outlook, в даний час відображається в області сповіщень Тепер можна вказати через перекриття на кнопці з панелі завдань. Знову ж таки, ви маєте вирішити під час вашого циклу розробки який метод найкраще підходить для вашої програми. Накладення значків призначених для забезпечення важливого, давнього статусу або сповіщень, таких як мережевий статус, статус месенджеру або нова пошта. Користувач не повинен бути представлений постійно змінюючи накладання чи анімацію.

![Накладання на кнопку панелі завдань](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Приклад

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Прошити фрейм

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Зазвичай вікно прошито для інформування користувача, якому вікно вимагає уваги, але що на ньому зараз немає фокусу клавіатури.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Приклад

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

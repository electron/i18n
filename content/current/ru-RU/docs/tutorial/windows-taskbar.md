# Панель задач Windows

## Обзор

Electron имеет API для настройки значка приложения на панели задач Windows. Этот API поддерживает обе функции только для Windows, такие как [`JumpList`](#jumplist), [пользовательские миниатюры и панели инструментов](#thumbnail-toolbars), [наложение значков](#icon-overlays-in-taskbar), и так называемый эффект ["Flash Frame"](#flash-frame), так и кросс-платформенные функции, такие как [последние документы](./recent-documents.md) и [прогресс приложения](./progress-bar.md).

## JumpList

Windows позволяет приложениям определять пользовательское контекстное меню, которое появляется, когда пользователи щелкают правой кнопкой мыши значок приложения на панели задач. Это контекстное меню называется `JumpList`. Вы указываете пользовательские действия в категории `Задач` JumpList, как указано в [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Приложения определяют задачи, основанные как на функциях программы, так и на ключевых моментах, которые пользователь должен делать с ними. Задачи должны быть контекстно-свободными, в данном случае, приложению не потребуется запускать их для работы. Они также должны быть статистически наиболее распространенными действиями, которые обычный пользователь будет выполнять в приложении, например, составить сообщение электронной почты или открыть календарь в почтовой программе, создать новый документ в текстовом редакторе, запустить приложение в определенном режиме, или запустить одну из своих подкоманд. Приложение не должно загромождать меню с расширенными функциями, которые не требуются обычным пользователям или одноразовыми действиями, такими как регистрация. Не используйте задачи для рекламных материалов, таких как обновления или специальные предложения.
> 
> Настоятельно рекомендуется, чтобы список задач был статическим. Он должен оставаться неизменным независимо от состояния или статуса приложения. Хотя можно динамически изменять список, вы должны учитывать, что это может смутить пользователя, который не ожидает изменения этой части списка адресатов.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> ПРИМЕЧАНИЕ: Скриншот выше является примером общих задач  Internet Explorer

В отличие от меню dock в macOS, которое является реальным меню, пользовательские задачи в Windows работают как ярлыки приложений. Например, когда пользователь нажимает на задачу, программа будет выполняться с заданными аргументами.

Чтобы установить пользовательские задачи для своего приложения, вы можете использовать [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Примеры

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

> Эта панель инструментов является обычным управлением стандартной панелью инструментов. У него максимум из семи кнопок. Идентификатор каждой кнопки, изображение, подсказка и состояние определены в структуре, которая затем передается на панель задач. Приложение может показать, включить, отключить или скрыть кнопки из панели инструментов эскизов, как это требуется текущего состояния.
> 
> Например, Windows Media Player может предлагать стандартные средства управления мультимедиа транспортом , такие как воспроизведение, пауза, приглушение и остановка.

![игрок](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Примеры

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

победы. etThumbarButtons([
  {
    tooltip: 'button1',
    icon: путь. oin(__dirname, 'button1.png'),
    click () { console. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2. ng'),
    flags: ['enabled', 'dismissonclick'],
    click () { console. og('button2 клик.') }
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

### Наслоения значков в панели задач

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Наслоения иконок служат контекстуальным уведомлением о статусе, и предназначены для отказа от необходимости отдельной иконки статуса области уведомлений, чтобы сообщить пользователю эту информацию. Например, новый статус почты в Microsoft Outlook, в настоящее время отображается в области уведомлений, можно указывать через накладываемое изображение на кнопку панели задач. Опять же, вы должны решить в течение цикла разработки , какой метод лучше подходит для вашего приложения. Накладываемые иконки предназначены для предоставления важных, давно существующих статусов или уведомлений, таких как сетевой статус, статус сообщения или новая почта. Пользователь не должен быть с постоянно меняющимися наслоениями или анимацией.

![Наложение на кнопку панели задач](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Пример

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Флэш-кадр

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Пример

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

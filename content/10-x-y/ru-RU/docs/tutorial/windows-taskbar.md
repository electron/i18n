# Панель задач Windows

Electron имеет API для настройки значка приложения на панели задач Windows. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList

Windows позволяет приложениям определять настраиваемое контекстное меню, которое появляется, когда пользователи щелкают правой кнопкой мыши на значок приложения в панели задач. Это контекстное меню называется `JumpList`. Необходимо указать пользовательские действия в `Tasks` категории Jumplist, как указано в MSDN:

> Приложения определяют задачи, основанные как на функциях программы, так и на ключевых моментах, которые пользователь должен делать с ними. Задачи должны быть контекстно-свободными, в данном случае, приложению не потребуется запускать их для работы. Они также должны быть статистически наиболее распространенными действиями, которые обычный пользователь будет выполнять в приложении, например, составить сообщение электронной почты или открыть календарь в почтовой программе, создать новый документ в текстовом редакторе, запустить приложение в определенном режиме, или запустить одну из своих подкоманд. Приложение не должно загромождать меню с расширенными функциями, которые не требуются обычным пользователям или одноразовыми действиями, такими как регистрация. Не используйте задачи для рекламных материалов, таких как обновления или специальные предложения.
> 
> Настоятельно рекомендуется, чтобы список задач был статическим. Он должен оставаться неизменным независимо от состояния или статуса приложения. Хотя можно динамически изменять список, вы должны учитывать, что это может смутить пользователя, который не ожидает изменения этой части списка адресатов.

__Задачи Internet Explorer:__

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

В отличие от меню в macOS, которое является реальным меню, пользовательские задачи в Windows работают как ярлыки приложений, так что когда пользователь нажимает на задачу, программа будет выполняться с указанными аргументами.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

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

Чтобы очистить список задач, вызовите ` app.setUserTasks ` с пустым массивом:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Задачи пользователя будут отображаться даже после закрытия приложения, поэтому значок и путь программы, указанный для задачи, должен существовать до тех пор, пока приложение не будет удалено.


## Thumbnail Toolbars

В Windows можно добавить панель эскизов с требуемыми кнопками на панели задач окна приложения. Она предоставляет пользователям доступ к команда конкретного окна без восстановления или активации окна.

From MSDN, it's illustrated:

> This toolbar is the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

__Thumbnail toolbar of Windows Media Player:__

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

Чтобы очистить кнопки панели инструментов эскизов, просто вызовите `BrowserWindow.setThumbarButtons` с пустым массивом:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Icon Overlays in Taskbar

В Windows кнопка панели задач может использовать небольшое наложение для отображения состояния приложения, как указано в MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

__Overlay on taskbar button:__

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## Flash Frame

В Windows вы можете выделить кнопку на панели задач, чтобы привлечь внимание пользователя. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

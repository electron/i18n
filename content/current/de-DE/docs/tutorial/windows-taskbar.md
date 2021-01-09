# Windows Taskleiste

## Übersicht

Electron hat APIs, um das App-Symbol in der Windows Taskleiste zu konfigurieren. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Das Kontextmenü heißt `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

![JH](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

Um die nutzerspezifischen Aufgaben für Ihre Anwendung zu setzen, können Sie die [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API verwenden.

#### Beispiele

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

### Miniaturansicht-Symbolleisten

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Diese Symbolleiste ist die übliche Standardsteuerung. Es hat ein Maximum von auf sieben Tasten. Die Kennung jeder Schaltfläche, des Bildes, des Tooltips und des Zustands werden in einer Struktur definiert, die dann an die Taskleiste übergeben wird. Die Anwendung kann Schaltflächen in der Miniaturansicht anzeigen, aktivieren, deaktivieren oder ausblenden, wie dies für den aktuellen Status erforderlich ist.
> 
> Zum Beispiel bietet Windows Media Player standardmäßige Medienübertragungssteuerungen wie Abspielen, Pause, Stummschalten und Stoppen.

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Beispiele

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

gewinnen. etThumbarButtons([
  {
    tooltip: 'button1',
    icon: path. oin(__dirname, 'button1.png'),
    click () { console. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2. ng'),
    flags: ['enabled', 'dismissonclick'],
    click () { console. og('button2 clicked.') }
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

### Icon-Overlays in Taskleiste

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Icon-Overlays dienen als kontextabhängige Benachrichtigung über den Status und , um die Notwendigkeit eines separaten Statussymbols für den Benachrichtigungsbereich zu negieren, um diese Informationen mit dem Benutzer zu kommunizieren. Zum Beispiel der neue E-Mail-Status in Microsoft Outlook, der derzeit im Benachrichtigungsbereich angezeigt wird kann nun durch ein Overlay auf der Taskleiste-Taste angezeigt werden. Wiederum musst du während deines Entwicklungszyklus entscheiden, welche Methode für deine Anwendung am besten ist. Overlay-Symbole sollen wichtige, seit langem bestehende Status oder Benachrichtigungen wie den Netzwerkstatus oder den Messenger-Status oder neue Nachrichten liefern. Dem Benutzer sollte nicht mit ständig wechselnden Overlays oder Animationen präsentiert werden.

![Auf Taskleisten-Schaltfläche überlagern](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Beispiel

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Blitzrahmen

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Normalerweise wird ein Fenster blinkt, um den Benutzer darüber zu informieren, dass das Fenster Aufmerksamkeit benötigt, aber momentan nicht den Fokus auf die Tastatur hat.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Beispiel

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

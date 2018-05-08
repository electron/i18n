# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar-windows), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

**Internet Explorer 的工作:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

不像 macOS 的 Dock 選單真的是選單，Windows 的使用者工作比較像是捷徑，使用者點了工作後，程式會被以指定的參數執行。

要設定應用程式的使用者工作，可以使用 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: '建立新視窗'
  }
])
```

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

就算應用程式關閉了，使用者工作還是會繼續顯示。因此工作用到的圖示及應用程式路徑應該要一直存在，直到應用程式被移除。

## 縮圖工具列

你可以在 Windows 應用程式的工作列配置中加入包含指定按鈕的縮圖工具列。 讓使用者不用還原或啟動視窗就能執行特定的視窗指令。

在 MSDN 中說明如下:

> This toolbar is the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Windows Media Player 的縮圖工具列:**

![播放器](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

可以使用 [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) 設定你應用程式的縮圖工具列:

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

要清除縮圖工具列按鈕，只要在呼叫 `BrowserWindow.setThumbarButtons` 時帶入空陣列就行了:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

在 Windows 中，工作列按鈕上可以疊一個小圖示，顯示應用程式的狀態，引述 MSDN 的說明:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**工作列按鈕重疊:**

![工作列按鈕重疊](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

要設定視窗的圖示重疊，可以使用 [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Overlay 的說明')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

要讓 BrowserWindow 工作列按鈕閃爍，可以使用 [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

別忘了呼叫 `flashFrame(false)` 關掉閃爍功能。 上面的範例，當 focus 到視窗時就會觸發，不過你可能會想要在 timeout 或其他事件發生時停止閃爍。
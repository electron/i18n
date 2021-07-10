# Windows 任务栏

## 概览

Electron有API来配置Windows任务栏中的应用程序图标。 此API 支持windows 专用的功能有： [创建 `JumpList`](#jumplist), [自定义缩略图和工具栏](#thumbnail-toolbars), [图标覆盖](#icon-overlays-in-taskbar), 和 ["Flash Frame" 效果](#flash-frame), 和跨平台的功能 有：[最近打开的文档][recent-documents] 和 [应用程序进度][progress-bar].

## 弹出列表

Windows 允许应用程序自定义一个菜单栏，当用户右键单击任务栏中的应用图标可以看到该菜单栏。 该上下文菜单被成为 `弹出列表`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> 应用程序的“任务”列表的制定是基于程序的功能，用户能用它做一些快捷操作。 任务应当是与上下文无关的，因为它不需要程序运行就可以工作。 而且据统计，它们应该是用户在这个应用上使用最多的操作，例如: 撰写一封邮件或者在邮件程序里打开日历，word处理程序新建一个文档，以某一种模式启动应用程序，或者是启动应用程序的某些子命令。 一个应用程序不应当定义一些用户不需要的高级功能的或者只会使用一次的操作的菜单，以防止将菜单弄得杂乱无章，例如注册。 不要将“任务”功能用于广告操作，例如升级应用或者推广特价产品等等。
> 
> 强烈推荐“任务”列表内容是静态的。 不管什么情形，也不管应用程序是什么状态，它都应该是保持不变的。 尽管这个列表是动态可变的，你应该注意，那些没想过这个列表会变的用户会被这个行为搞糊涂。

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> 注：上面的屏幕截图是 IE 浏览器的任务栏示例

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### 示例

##### Set user tasks

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

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

> 注意：即使你的应用关闭，用户任务仍然会被显示，因此在你的应用被卸载之前，任务的图标和程序的路径必须是存在的。

### 缩略图工具栏

在 Windows，你可以在任务栏上添加一个按钮来当作应用的缩略图工具栏。 它为用户提供了一种访问特定窗口命令的方式, 而无需还原或激活该窗口。

As quoted from [MSDN][msdn-thumbnail]:

> 此工具栏只是常见的标准工具栏控件。 它最多拥有七个按钮。 每个按钮的 ID、图像、工具提示和状态都定义在结构中, 然后传递给任务栏。 应用程序可以根据其当前状态的要求, 显示、启用、禁用或隐藏缩略图工具栏中的按钮。
> 
> 例如, Windows 媒体播放机可能提供标准的媒体传输控制, 如播放、暂停、静音和停止。

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> 注：上面的屏幕截图是 Windows 媒体播放器的缩略图工具栏示例

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### 示例

##### 设置缩略图工具栏

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

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

##### Clear thumbnail toolbar

要清除缩略图工具栏按钮，您需要在 `main.js` 文件调用 `BrowserWindow.setThumbaritons` 函数设置为空数组。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### 任务栏中的图标叠加

在 Windows，任务栏按钮可以使用小型叠加层显示应用程序状态。

As quoted from [MSDN][msdn-icon-overlay]:

> 图标叠加作为状态的上下文通知, 旨在否定需要一个单独的通知区域状态图标来将该信息传达给用户。 例如, 当前在通知区域中显示的 Microsoft Outlook 中的新邮件状态现在可以通过任务栏按钮上的叠加来表示。 同样, 您必须在开发周期中决定哪个方法最适合您的应用程序。 叠加图标用于提供重要的、长期的状态或通知, 如网络状态、messenger 状态或新邮件。 不应向用户显示不断变化的叠加或动画。

![任务栏按钮的叠加](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> 注：上面的屏幕截图是任务栏按钮叠加的示例

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### 闪烁框

在Windows上，你可以突出显示任务栏按钮以获得用户的关注。 这与在 macOS 上 dock 弹跳图标相似。

As quoted from [MSDN][msdn-flash-frame]:

> 通常, 会闪现一个窗口, 通知用户该窗口需要注意, 但是该窗口当前没有键盘焦点。

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> 注意：别忘了调用 `win.flashFramework(false)` 来关闭闪烁。 在上面的示例中, 当窗口进入焦点时会调用它, 但您可能会使用超时或其他一些事件来禁用它。

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

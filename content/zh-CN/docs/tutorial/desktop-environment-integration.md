# 桌面环境集成

不同的操作系统为桌面应用集成到各自的桌面环境中提供了不同的特性支持。 例如，在 windows 系统下，应用程序可以将一些快捷方式放置在任务栏的跳转列表上，而在 Mac 上，应用程序可以把自定义菜单放在dock菜单上。

本章将会说明怎样使用 Electron APIs 把你的应用集成到桌面环境中。

## 通知

参考 [通知](notifications.md)

## 最近文档 (Windows & macOS)

Windows 和 macOS 分别通过打开跳转列表和dock菜单使应用程序能够快速的访问最近打开的文档列表。

**跳转列表**

![跳转列表最近的文件](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**应用 dock 菜单**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

若要增加一个文件到最近文件列表，你可以使用[app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

你也可以使用 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API 来清空最近文件列表。

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Windows 注意事项

为了在 Windows 上使用这个特性，你的应用需要被注册为这类文件的处理程序，否则，在你注册之前，文件是不会出现在跳转列表里的。 你可以在 [Application Registration](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx) 里找到所有关于注册事宜的说明。

当用户点击“跳转列表”上的一个文件时，系统会启动一个新的应用程序的实例 ，而文件的路径将作为一个命令行参数被传入这个实例。

### macOS 注意事项

从 "最近文档" 菜单中请求文件时, 将为其发出 ` app ` 模块的 ` open-file ` 事件。

## 自定义 Dock 菜单 (macOS)

macOS 可以让开发者定制自己的菜单，通常包含一些常用功能的快捷方式。

**Terminal.app 的 Dock 菜单:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

若要设置自定义的dock菜单, 可以使用 ` app.dock.setMenu ` API, 它仅在 macOS 上可用:

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)
```

## 用户任务 (Windows)

在 Windows 下，你可以在跳转列表中 `Tasks` 目录下指定自定义行为，引用 MSDN 的文档：

> 应用程序的tasks应该是基于程序的功能和用户能用它做一些的关键性事情来制定的。 任务应当是上下文无关的，因为它不需要程序运行就可以工作 而且他们应该是统计上用户在这个应用上最多的行为例如: 撰写一封邮件或者在邮件程序里打开日历，word处理程序新建一个文档，以某一种模式启动应用程序，或者是启动应用程序的某些子命令。 一个应用程序不应当把菜单用一些用户不需要的高级功能的或者只会使用一次的动作例如注册给弄得杂乱无章。 不要将tasks功能用于广告项目例如升级或者特价产品之类。
> 
> 强烈推荐task列表内容是静态的。 不管应用程序是什么状态或情形，它都应该是保持不变的。 尽管这个列表是动态可变的，你应该考虑到没想过这个列表会变的用户会被这个行为搞糊涂。

**Internet Explorer 的 任务:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

不同于 macOS 的dock菜单，Windows 上的用户任务表现得更像一个快捷方式，比如当用户点击一个任务，一个程序将会被传入特定的参数并且运行。

你可以使用 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API 来设置你的应用中的用户任务：

```javascript
const {app} = require('electron')
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

调用 `app.setUserTasks` 并传入空数组就可以清除你的任务列表：

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

当你的应用关闭时，用户任务仍然会被显示，因此在你的应用被卸载之前，任务的图标和程序的路径必须是存在的。

## 缩略图工具栏

在 Windows，你可以在任务栏上添加一个按钮来当作应用的缩略图工具栏。 它为用户提供了一种访问特定窗口命令的方式, 而无需还原或激活该窗口。

在 MSDN，它的说明如下：

> 此工具栏只是常见的标准工具栏控件。 它最多拥有七个按钮。 每个按钮的 ID、图像、工具提示和状态都定义在结构中, 然后传递给任务栏。 应用程序可以根据其当前状态的要求, 显示、启用、禁用或隐藏缩略图工具栏中的按钮。
> 
> 例如, Windows 媒体播放机可能提供标准的媒体传输控制, 如播放、暂停、静音和停止。

**Windows Media Player 的缩略图工具栏:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

你可以使用 [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) 来设置你的应用的缩略图工具栏。

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

调用 `BrowserWindow.setThumbarButtons` 并传入空数组即可清空缩略图工具栏：

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity 启动器快捷方式 (Linux)

在 Unity中,你可以通过改变 `.desktop` 文件来增加自定义运行器的快捷方式，详情看 [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher)。

**Audacious 的启动器快捷方式:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## 任务栏的进度条 (Windows, macOS, Unity)

在 Windows，进度条可以出现在一个任务栏按钮之上。这可以提供进度信息给用户而不需要用户切换应用窗口。

在 macOS，进度条将显示为 dock 图标的一部分。

Unity DE 也具有同样的特性，在运行器上显示进度条。

**任务栏按钮中的进度栏:**

![任务栏进度栏](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

若要设置窗口的进度栏, 可以使用 [ BrowserWindow. setProgressBar ](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## 任务栏 (窗口) 中的图标层叠

在 Windows，任务栏按钮可以使用小型叠加层显示应用程序 状态，引用 MSDN 的文档：

> 图标叠加作为状态的上下文通知, 旨在否定需要一个单独的通知区域状态图标来将该信息传达给用户。 例如, 当前在通知区域中显示的 Microsoft Outlook 中的新邮件状态现在可以通过任务栏按钮上的叠加来表示。 同样, 您必须在开发周期中决定哪个方法最适合您的应用程序。 叠加图标用于提供重要的、长期的状态或通知, 如网络状态、messenger 状态或新邮件。 不应向用户显示不断变化的叠加或动画。

**任务栏按钮的叠加:**

![任务栏按钮的叠加](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

要设置窗口的叠加层图标，可以使用 [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash框架 (Windows)

在 Windows，你可以突出显示任务栏按钮，以获得用户的关注。 这类似于在 macOS 上弹出 dock 图标。 在 MSDN，它如是说：

> 通常, 会闪现一个窗口, 通知用户该窗口需要注意, 但是该窗口当前没有键盘焦点。

要在 BrowserWindow 的任务栏按钮突出显示，可以使用 [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

不要忘记调用 `flashFrame` 方法参数为 `false` 来关闭突出显示。 在上面的示例中, 当窗口进入焦点时会调用它, 但您可能会使用超时或其他一些事件来禁用它。

## 展示文件窗口 (macOS)

在 macOS，一个窗口可以设置它展示的文件，文件的图标可以出现在标题栏，当用户 Command-Click 或者 Control-Click 标题栏，文件路径弹窗将会出现。

您还可以设置窗口的编辑状态，以便文件图标可以指示 该窗口中的文档是否已修改。

**文件展示弹出菜单:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

要设置展示文件窗口，可以使用 [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) 和 [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs：

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## 将文件拖出窗口

对于某些操作文件的应用程序， 将文件从 Electron 拖动到其他应用程序是很重要的能力。 要在 app 的实现此功能 ，你需要在 `ondragstart` 事件上调用 `webContents.startDrag(item)` API。

在网页端：

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

在主进程中:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
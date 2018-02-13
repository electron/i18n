# 桌面環境整合

不同的作業系統提供不同的功能特性，將桌面應用程式整合進桌面環境中。 例如在 Windows 上，應用程式可以在捷徑放在工作列的捷徑清單 (JumpList) 中，而在 Mac 上，應用程式可以 Dock 選單中置入加入自訂的選單。

這份導引文件，將介紹如何透過 Electron API 把應用程式整合進桌面環境中。

## 通知

參考[通知](notifications.md)

## 最近的文件 (Windows & macOS)

Windows 及 macOS 提供了捷徑清單或 Dock 選單功能，方便快速存取應用程式最近開啟過的文件。

**捷徑清單 (JumpList):**

![捷徑清單最近的檔案](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**應用程式 Dock 選單:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

要將檔案加到最近的文件清單中，可以使用 [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

你也可以使用 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API 清空最近的文件清單:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Windows 注意事項

要在 Windows 上使用這項功能，你的應用程式必須註冊為該檔案類型的處理常式 (Handler)。不然就算將檔案加入清單了，也不會出現在捷徑清單中。 你可以在[應用程式註冊](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx)中找到如何註冊應用程式的資訊。

當使用者點了捷徑清單的檔案後，系統會啟動你應用程式的新執行個體，並將該檔案的檔名路徑帶入命令列參數。

### macOS 注意事項

當檔案由最近的文件選單中被點擊，`app` 模組的 `open-file` 事件會被觸發。

## 自訂 Dock 選單 (macOS)

macOS 讓開發者可以自訂 Dock 選單，選單中通常會有常用功能的捷徑。

**Terminal.app 的 Dock 選單:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

透過 `app.dock.setMenu` API 就能自訂你的選單，這個 API 只適用於 macOS:

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('新視窗') }},
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

## 使用者工作 (Windows)

在 Windows 中你可以自訂捷徑清單中的「`工作`」類別，引述 MSDN 的說明:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

**Internet Explorer 的工作:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

不像 macOS 的 Dock 選單真的是選單，Windows 的使用者工作比較像是捷徑，使用者點了工作後，程式會被以指定的參數執行。

要設定應用程式的使用者工作，可以使用 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API:

```javascript
const {app} = require('electron')
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

要清除工作清單，只要在呼叫 `app.setUserTasks` 時帶入空陣列就行了:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

就算應用程式關閉了，使用者工作還是會繼續顯示。因此工作用到的圖示及應用程式路徑應該要一直存在，直到應用程式被移除。

## 縮圖工具列

你可以在 Windows 應用程式的工作列配置中加入包含指定按鈕的縮圖工具列。 讓使用者不用還原或啟動視窗就能執行特定的視窗指令。

在 MSDN 中說明如下:

> This toolbar is simply the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Windows Media Player 的縮圖工具列:**

![播放器](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

可以使用 [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) 設定你應用程式的縮圖工具列:

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
    click () { console.log('點了 button1。') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('點了 button2。') }
  }
])
```

要清除縮圖工具列按鈕，只要在呼叫 `BrowserWindow.setThumbarButtons` 時帶入空陣列就行了:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity 啟動器捷徑 (Linux)

在 Unity 中，你可以修改 `.desktop` 檔案，將自訂的內容加進啟動器，細節可參考[將捷徑加進啟動器](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher)。

**Audacious 的啟動器捷徑:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## 工作列進度顯示 (Windows, macOS, Unity)

在 Windows 中，工作列按鈕可用來顯示工作進度。這個功能讓使用者不用切回視窗就能看到進度資訊。

在 macOS 中，進度列會顯示為 Docker 圖示的一部分。

Unity DE 也有類似的功能，讓你指定啟動器中的進度列。

**工作列按鈕的進度列:**

![工作列進度列](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

要設定視窗的進度列，可以使用 [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## 工作列圖示重疊 (Windows)

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

## 閃爍框 (Windows)

在 Windows 中，你可以讓工作列按鈕變得更醒目，讓使用者注意到。這個功能很像是 macOS 的 Dock 跳動圖示。MSDN 參考文件中這樣說:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

要讓 BrowserWindow 工作列按鈕閃爍，可以使用 [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

別忘了呼叫 `flashFrame(false)` 關掉閃爍功能。 上面的範例，當 focus 到視窗時就會觸發，不過你可能會想要在 timeout 或其他事件發生時停止閃爍。

## 視窗的代表檔案 (macOS)

在 macOS 中，可以設定視窗的代表檔案，那個檔案的圖示就會顯示在標題列中，使用者按住 Command 或 Control 再點擊標題，就會顯示路徑 快顯選單。

你也可以設定視窗的編輯狀態，就可以由檔案圖示分辨出文件是否在這個視窗中修改過。

**代表檔案快顯選單:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

要設定視窗的代表檔案可以使用 [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) 及 [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## 將檔案拖出視窗

對於需要處理檔案的應用程式而言，能否將檔案由 Electron 拖放到其他應用程式很重要。 要在你的應用程式中實現這項功能，需要在 `ondragstart` 事件發生時呼叫 `webContents.startDrag(item)` API。

在網頁中:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

在主處理序中:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
# 데스크톱 환경 통합

애플리케이션 배포의 대상이 되는 서로 다른 운영체제 시스템의 환경에 맞춰 애플리케이션의 기능을 통합할 수 있습니다. 예를 들어 Windows에선 태스크바의 JumpList에 바로가기를 추가할 수 있고 Mac(macOS)에선 dock 메뉴에 커스텀 메뉴를 추가할 수 있습니다.

이 문서는 Electron API를 이용하여 각 운영체제 시스템의 기능을 활용하는 방법을 설명합니다.

## 알림

[Notifications](notifications.md) 을 보면

## 최근 문서 (Windows & macOS)

Windows와 macOS는 JumpList 또는 dock 메뉴를 통해 최근 문서 리스트에 쉽게 접근할 수 있습니다.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**dock menu 애플리케이션:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

파일을 최근 문서에 추가하려면 [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-os-x-windows) API를 사용할 수 있습니다:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

그리고 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-os-x-windows) API로 최근 문서 리스트를 비울 수 있습니다:

```javascript
onst {app} = require('electron')
app.clearRecentDocuments()
```

### Windows에서 주의할 점

이 기능을 Windows에서 사용할 땐 운영체제 시스템에 애플리케이션에서 사용하는 파일 확장자가 등록되어 있어야 합니다. 그렇지 않은 경우 파일을 JumpList에 추가해도 추가되지 않습니다. 애플리케이션 등록에 관련된 API의 모든 내용은 [Application Registration](http://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx)에서 찾아볼 수 있습니다.

유저가 JumpList에서 파일을 클릭할 경우 클릭된 파일의 경로가 커맨드 라인 인수로 추가되어 새로운 인스턴스의 애플리케이션이 실행됩니다.

### macOS에서 주의할 점

파일이 최근 문서 메뉴에서 요청될 경우 `app` 모듈의 `open-file` 이벤트가 호출됩니다.

## 커스텀 독 메뉴 (macOS)

macOS는 개발자가 dock에 커스텀 메뉴를 만들 수 있도록 허용하고 있습니다. 보통 애플리케이션의 특정 기능 바로가기를 만들 때 사용합니다:

**Terminal.app의 dock menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

커스텀 dock menu를 설정하려면 `app.dock.setMenu` API를 사용하면 됩니다. macOS에서만 사용 가능합니다:

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

## 사용자 작업 (Windows)

Windows에선 JumpList의 `Tasks` 카테고리에 원하는 작업을 설정할 수 있습니다. MSDN에선 해당 기능을 다음과 같이 설명하고 있습니다:

> 애플리케이션 작업은 프로그램의 기능 그리고 주요사양 두가지를 기반으로 유저의 행동을 예측하여 정의합니다. 행할 필요가 없는 애플리케이션 작업은 작동하지 않을 때 반드시 context-free를 유지해야 합니다. 업은 일반 사용자가 프로그램을 실행하거나 이메일 프로그램으로 이메일을 작성하거나 달력을 불러오고, 워드 프로세서로 새 문서를 작성, 특정 모드, 부속 명령으로 프로그램을 실행하는 등의 통계적, 일반적으로 가장 많이 사용되는 작업인지를 고려해야 합니다. 애플리케이션 작업은 일반 유저가 필요로 하지 않는 고급 기능을 조잡하게 채우거나 등록과 같은 일회성의 작업을 포함해선 안됩니다. 또한 작업에 특별 이벤트 또는 업그레이드 등의 홍보성 작업을 추가하면 안됩니다.
> 
> 작업 리스트는 가능한 한 정적으로 유지되는 것을 적극 권장합니다. 이것은 동일한 상태 또는 응용 프로그램의 상태에 관계없이 유지되어야 합니다. 작업 목록은 동적으로 변경할 수 있지만 몇몇 유저는 예상하지 못한 작업 목록 변경에 혼란을 일으킬 수 있다는 점을 고려해야 합니다.

**Internet Explorer의 작업:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

MacOS의 dock menu와는 달리 Windows의 사용자 작업은 애플리케이션 바로 가기처럼 작동합니다. 유저가 작업을 클릭할 때 설정한 인수와 함께 새로운 애플리케이션이 실행됩니다.

사용자 작업을 설정하려면 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API를 통해 구현할 수 있습니다:

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

작업 리스트를 비우려면 간단히 `app.setUserTasks` 메서드의 첫번째 인수에 빈 배열을 넣어 호출하면 됩니다:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

사용자 작업 리스트는 애플리케이션이 삭제되지 않는 한 종료되어도 태스크바에 보존됩니다. 이러한 이유로 반드시 프로그램 경로와 아이콘 경로를 지정해야 합니다.

## 미리보기 툴바

Windows에선 작업 표시줄의 애플리케이션 선택시 나오는 미리보기에 특정한 미리보기 툴바를 추가할 수 있습니다. 이 기능은 유저가 윈도우를 활성화 하지 않고 특정한 커맨드를 실행시킬 수 있도록 할 수 있습니다.

MSDN의 설명에 의하면:

> 이 툴바는 표준 툴바의 공통 컨트롤과 비슷한 역할을 합니다. 버튼은 최대 7개 까지 만들 수 있습니다. 각 버튼의 구조엔 ID, 이미지, 툴팁, 상태 등이 정의되어있습니다. 작업표시줄에 구조가 전달되면 애플리케이션이 상태에 따라 버튼을 숨기거나, 활성화하거나, 비활성화 할 수 있습니다.
> 
> 예를 들어, 윈도우 미디어 플레이어는(Wmp) 미디어 플레이어가 공통적으로 사용하는 재생, 일시정지, 음소거, 정지등의 컨트롤을 포함하고 있습니다.

**Windows Media Player의 미리보기 툴바:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

[BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) API를 통해 애플리케이션에 미리보기 툴바를 설정할 수 있습니다:

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

미리보기 툴바를 비우려면 간단히 `BrowserWindow.setThumbarButtons` API에 빈 배열을 전달하면 됩니다:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity 런처 숏컷 기능 (Linux)

Unity 환경에선 `.desktop` 파일을 수정함으로써 런처에 새로운 커스텀 엔트리를 추가할 수 있습니다. [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher) 가이드를 참고하세요.

**Audacious의 런처 숏컷:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## 작업 표시줄 안의 프로그레스 바 (Windows, macOS, Unity)

Windows에선 작업 표시줄의 애플리케이션 버튼에 프로그레스 바를 추가할 수 있습니다. 이 기능은 사용자가 애플리케이션의 창을 열지 않고도 애플리케이션의 작업의 상태 정보를 시각적으로 보여줄 수 있도록 해줍니다.

macOS에선 프로그레스바가 dock 아이콘의 일부에 표시됩니다.

또한 Unity DE도 런처에 프로그레스 바를 부착할 수 있습니다.

**작업 표시줄 버튼의 프로그레스 바:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

이 기능은 [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API를 사용하여 구현할 수 있습니다:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## 작업 표시줄의 아이콘 오버레이 (Windows)

Windows에선 작업 표시줄 버튼에 애플리케이션의 상태를 표시하는 작은 오버레이를 사용할 수 있습니다. MSDN에서 인용하자면:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Represented File of Window (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

In web page:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

In the main process:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
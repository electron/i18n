# Windows 작업 표시줄

## 개요

Electron에는 Windows 작업 표시 줄에 앱의 아이콘을 구성하는 API가 있습니다. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. 이 컨텍스트 메뉴를 `JumpList` 라고 합니다. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> 애플리케이션 작업은 프로그램의 기능 그리고 주요사양 두가지를 기반으로 유저의 행동을 예측하여 정의합니다. 행할 필요가 없는 애플리케이션 작업은 작동하지 않을 때 반드시 context-free를 유지해야 합니다. 업은 일반 사용자가 프로그램을 실행하거나 이메일 프로그램으로 이메일을 작성하거나 달력을 불러오고, 워드 프로세서로 새 문서를 작성, 특정 모드, 부속 명령으로 프로그램을 실행하는 등의 통계적, 일반적으로 가장 많이 사용되는 작업인지를 고려해야 합니다. 애플리케이션 작업은 일반 유저가 필요로 하지 않는 고급 기능을 조잡하게 채우거나 등록과 같은 일회성의 작업을 포함해선 안됩니다. 또한 작업에 특별 이벤트 또는 업그레이드 등의 홍보성 작업을 추가하면 안됩니다.
> 
> 작업 리스트는 가능한 한 정적으로 유지되는 것을 적극 권장합니다. 이것은 동일한 상태 또는 응용 프로그램의 상태에 관계없이 유지되어야 합니다. 작업 목록은 동적으로 변경할 수 있지만 몇몇 유저는 예상하지 못한 작업 목록 변경에 혼란을 일으킬 수 있다는 점을 고려해야 합니다.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

사용자 작업을 설정하려면 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API를 통해 구현할 수 있습니다.

#### 예시

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

### 미리보기 툴바

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> 이 툴바는 표준 툴바의 공통 컨트롤과 비슷한 역할을 합니다. 버튼은 최대 7개 까지 만들 수 있습니다. 각 버튼의 구조엔 ID, 이미지, 툴팁, 상태 등이 정의되어있습니다. 작업표시줄에 구조가 전달되면 애플리케이션이 상태에 따라 버튼을 숨기거나, 활성화하거나, 비활성화 할 수 있습니다.
> 
> 예를 들어, 윈도우 미디어 플레이어는(Wmp) 미디어 플레이어가 공통적으로 사용하는 재생, 일시정지, 음소거, 정지등의 컨트롤을 포함하고 있습니다.

![사용자
](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### 예시

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### 작업 표시줄에서 아이콘 오버레이

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> 아이콘 오버레이는 상태에 대한 상황 별 알림으로 사용되며 사용자에게 해당 정보를 전달하기 위해 별도의 알림 영역 상태 아이콘이 필요하지 않습니다. 예를 들어 현재 알림 영역에 표시된 Microsoft Outlook의 새 메일 상태를 이제 작업 표시 줄 단추에 오버레이를 통해 표시 할 수 있습니다. 다시 말하지만, 개발 사이클 중에 애플리케이션에 가장 적합한 방법을 결정해야합니다. 오버레이 아이콘은 네트워크 상태, 메신저 상태 또는 새 메일과 같은 중요하고 오래된 상태 또는 알림을 제공하기위한 것입니다. 사용자에게 끊임없이 변화하는 오버레이 또는 애니메이션이 제공되어서는 안됩니다.

![작업 표시줄 버튼 위의 오버레이](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Example

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### 깜빡이는 창

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> 일반적으로 사용자에게 주의가 필요하지만 현재 키보드 포커스가 없음을 알리기 위해 깜박입니다.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Example

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar-windows), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> 애플리케이션 작업은 프로그램의 기능 그리고 주요사양 두가지를 기반으로 유저의 행동을 예측하여 정의합니다. 행할 필요가 없는 애플리케이션 작업은 작동하지 않을 때 반드시 context-free를 유지해야 합니다. 업은 일반 사용자가 프로그램을 실행하거나 이메일 프로그램으로 이메일을 작성하거나 달력을 불러오고, 워드 프로세서로 새 문서를 작성, 특정 모드, 부속 명령으로 프로그램을 실행하는 등의 통계적, 일반적으로 가장 많이 사용되는 작업인지를 고려해야 합니다. 애플리케이션 작업은 일반 유저가 필요로 하지 않는 고급 기능을 조잡하게 채우거나 등록과 같은 일회성의 작업을 포함해선 안됩니다. 또한 작업에 특별 이벤트 또는 업그레이드 등의 홍보성 작업을 추가하면 안됩니다.
> 
> 작업 리스트는 가능한 한 정적으로 유지되는 것을 적극 권장합니다. 이것은 동일한 상태 또는 응용 프로그램의 상태에 관계없이 유지되어야 합니다. 작업 목록은 동적으로 변경할 수 있지만 몇몇 유저는 예상하지 못한 작업 목록 변경에 혼란을 일으킬 수 있다는 점을 고려해야 합니다.

**Internet Explorer의 작업:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

MacOS의 dock menu와는 달리 Windows의 사용자 작업은 애플리케이션 바로 가기처럼 작동합니다. 유저가 작업을 클릭할 때 설정한 인수와 함께 새로운 애플리케이션이 실행됩니다.

사용자 작업을 설정하려면 [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API를 통해 구현할 수 있습니다:

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

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

사용자 작업 리스트는 애플리케이션이 삭제되지 않는 한 종료되어도 태스크바에 보존됩니다. 이러한 이유로 반드시 프로그램 경로와 아이콘 경로를 지정해야 합니다.

## 미리보기 툴바

Windows에선 작업 표시줄의 애플리케이션 선택시 나오는 미리보기에 특정한 미리보기 툴바를 추가할 수 있습니다. 이 기능은 유저가 윈도우를 활성화 하지 않고 특정한 커맨드를 실행시킬 수 있도록 할 수 있습니다.

MSDN의 설명에 의하면:

> This toolbar is the familiar standard toolbar common control. 버튼은 최대 7개 까지 만들 수 있습니다. 각 버튼의 구조엔 ID, 이미지, 툴팁, 상태 등이 정의되어있습니다. 작업표시줄에 구조가 전달되면 애플리케이션이 상태에 따라 버튼을 숨기거나, 활성화하거나, 비활성화 할 수 있습니다.
> 
> 예를 들어, 윈도우 미디어 플레이어는(Wmp) 미디어 플레이어가 공통적으로 사용하는 재생, 일시정지, 음소거, 정지등의 컨트롤을 포함하고 있습니다.

**Windows Media Player의 미리보기 툴바:**

![사용자
](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

[BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) API를 통해 애플리케이션에 미리보기 툴바를 설정할 수 있습니다:

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

미리보기 툴바를 비우려면 간단히 `BrowserWindow.setThumbarButtons` API에 빈 배열을 전달하면 됩니다:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

Windows에선 작업 표시줄 버튼에 애플리케이션의 상태를 표시하는 작은 오버레이를 사용할 수 있습니다. MSDN에서 인용하자면(영문):

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![작업 표시줄 버튼 위의 오버레이](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

윈도우에 오버레이 아이콘을 설정하려면 [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API를 사용할 수 있습니다:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

the keyboard focus. BrowserWindow 작업표시줄 버튼을 깜빡이려면, [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API 를 사용하면됩니다:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

`flashFrame` 메소드를 `false` 인자로 호출하여 깜빡임을 중단시키는 것을 잊지마세요. 위의 예제에서, 윈도우가 포커스되었을 때 호출합니다. 그러나 타임아웃 또는 다른 이벤트에서 비활성화할 수 있습니다.
# Windows のタスクバー

## 概要

Electron には Windows のタスクバー中のアプリアイコンを設定するための API があります。 This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## ジャンプ リスト

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. このコンテキストメニューは `ジャンプ リスト` と呼ばれます。 You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> アプリケーションは、プログラムの機能と、ユーザがそれらを使用することが期待されるべきことの両方に基づいてタスクを定義します。 タスクを実行するためにアプリケーションを実行する必要がないという点で、タスクはコンテキストフリーである必要があります。 それらは、電子メールのメッセージを作成したり、メールプログラムでカレンダーを開いたり、ワープロで新しい文書を作成したり、特定のモードでアプリケーションを起動したりするなど、通常のユーザーがアプリケーションで実行する統計的に最も一般的なアクション、またはそのサブコマンドの1つでもあります。 アプリケーションは、標準ユーザが必要としない高度な機能や、登録などの1回限りの操作でメニューを乱雑にするべきではありません。 アップグレードや特別オファーなどのプロモーションの道具にタスクを使用しないでください。
> 
> タスクリストは静的にすることを強く推奨します。 これはアプリケーションの状態や状態に関係なく、同じままにするべきです。 リストを動的に変更することは可能ですが、宛先リストのその部分が変更されることを期待していないユーザを混乱させる可能性があることを考慮する必要があります。

![Internet Explorer](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### サンプル

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

### サムネイルツールバー

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN][msdn-thumbnail]:

> このツールバーは、おなじみの標準ツールバー共通コントロールです。 最大で7つのボタンを持てます。 各ボタンのID、画像、ツールチップ、および状態は構造体で定義され、その構造体はタスクバーに渡されます。 アプリケーションは、現在の状態に応じてサムネイルツールバーからボタンを表示、有効化、無効化、または非表示にさせることができます。
> 
> たとえば、Windows Media Player では、再生、一時停止、ミュート、停止などの標準のメディア送りコントロールを提供できます。

![Windows Media Player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### サンプル

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

### タスクバー内のアイコンオーバーレイ

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN][msdn-icon-overlay]:

> アイコンオーバーレイは状況のコンテキスト通知として機能し、その情報をユーザーに伝達するための別の通知領域ステータスアイコンの必要性を否定することを目的としています。 たとえば、現在通知領域に表示されている Microsoft Outlook の新着メールステータスは、タスクバーボタンの上にオーバーレイ表示されるようになりました。 繰り返しますが、開発サイクルの中でどの方法があなたのアプリケーションに最適であるかを決める必要があります。 オーバーレイアイコンは、ネットワークステータス、メッセンジャーステータス、新着メールなど、重要な長期にわたるステータスや通知を提供することを目的としています。 ユーザには、絶えず変化するオーバーレイやアニメーションを表示してはいけません。

![タスクバーボタン上のオーバーレイ](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### サンプル

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### 枠の点滅

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN][msdn-flash-frame]:

> 通常、ウィンドウは注意が必要でも現在キーボードフォーカスがないことをユーザーに知らせるために点滅します。

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### サンプル

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

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

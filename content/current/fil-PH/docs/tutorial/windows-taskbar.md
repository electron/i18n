# Windows Taskbar

## Overview

Electron has APIs to configure the app's icon in the Windows taskbar. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Ang mga aplikasyon ay naglalarawan sa mga gawain depende sa mga katangian ng programa at ng pangunahing mga bagay na gagawin ng mga tagagamit sa kanila. Ang mga gawain ay dapat walang konteksto, sa ganyan, hindi na kailangan ng aplikasyon na nakatakbo para lang gumana sila. Sila dapat ay ang pinakakaraniwang gawaing pang-istatistika na ginagawa ng normal na tagagamit sa isang aplikasyon, tulad ng paglikha ng isang mensahe sa email o pagbukas ng kalendaryo sa mail program, paggawa ng bagong dokumento sa isang word processor, maglunsad ng aplikasyon sa isang pamamaraan, o paglunsad ng isa sa kanyang mga subcommand. Hindi dapat ginugulo ng isang aplikasyon ang menu ng makabagong mga katangian na hindi kinakailangan ng karaniwang tagagamit o isang beses lang na mga aksyon tulad ng pagrerehistro. Wag gamitin ang mga gawain para sa pagtataguyod ng mga aytem katulad ng mga upgrade o natatanging mga alok.
> 
> Inirerekomenda na ang dapat nakatigil lang ang listahan ng mga gawain. Dapat hindi ito nagbabago ano man ang estado ng aplikasyon. Pwede mang baguhin ang listahan sa dinamikong paraan, dapat isaalang-alang na pwedeng makalilito ito sa mga tagagamit na hindi inaasahan ang pagbabago sa parte ng listahan ng destinasyon.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

Upang itakda ang ang mga gawain ng tagagamit para sa iyong aplikasyon, pwede mong gamitin ang [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) na API.

#### Mga Halimbawa

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

### Mga Thumbnail Toolbar

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> This toolbar is the familiar standard toolbar common control. Mayroon itong hindi lalagpas sa pitong pipindutin. Ang bawat ID ng pipindutin, imahe, tooltip, at estado ay inilarawan sa isang balangkas, na ipinapasa sa taskbar. Ang aplikasyon ay nakapagpakita, nagpapagana, nagpapatigil, o nagtatago ng mga pipindutin mula sa thumbnail toolbar na itinutugon ng kanyang kasalukuyang estado.
> 
> Halimbawa, ang Windows Media Player ay possibleng magbibigay ng istandard na kontrol sa paglilipat ng media, katulad ng play, pause, mute at stop.

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Mga Halimbawa

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

### Icon Overlays in Taskbar

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Ang mga icon overlay ay nagsisilbi bilang kontestwal na paalala ng katayuan, at para tanggalin ang pangangailangan sa naiibang icon na pang-estado ng lugar ng paalala upang mailahad ang impormasyon sa gumagamit. Halimbawa, ang isang bagong estado ng mail sa Microsoft Outlook, na kasalukuyang ipinapakita sa lugar ng paalala, ay pwede nang ilagay sa pamamagitan ng isang overlay sa pipindutin sa taskbar. Gaya ng dati, kailangan magdesisyon ka na habang nagbubuo ka pa sa kung anong pamamaraan ang nababagay sa iyong aplikasyon. Ang mga overlay icon ay para sa paghahatid ng mahalaga at matagal nang katayuan o mga paalala, katulad ng estado ng network, estado ng messenger, o bagong mail. Ang tagagamit ay hindi dapat pinapakitaan ng pabago-bagong mga overlay o animation.

![Ang Overlay sa Taskbar na pipindutin](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Mga halimbawa

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Karaniwang ipinalalabas ang isang window upang ipaalam sa gumagamit na ang window ay nangangailangan ng atensyon pero hindi pa ito nakapansin sa keyboard.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Mga halimbawa

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

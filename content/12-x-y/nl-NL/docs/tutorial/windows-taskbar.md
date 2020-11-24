# Windows taakbalk

## Overview

Electron heeft API's om het app pictogram in de Windows taakbalk te configureren. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpLijst

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Dat contextmenu wordt `JumpList` genoemd. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> Toepassingen definiëren taken gebaseerd op zowel de functies van het programma als de sleutel dingen die een gebruiker moet doen met hen. Taken moeten contextvrij zijn, in dat de applicatie niet hoeft te worden uitgevoerd om ze te laten werken. Ze moeten ook de statistisch meest voorkomende acties zijn die een normale gebruiker zou uitvoeren in een applicatie, zoals het opstellen van een e-mail bericht of het openen van de kalender in een e-mail programma, een nieuw document maken in een woord processor, start een applicatie in een bepaalde modus, of start een van zijn subopdrachten. Een app zou het menu niet moeten plakken met geavanceerde functies die standaard gebruikers niet nodig hebben of eenmalige acties zoals registratie. Gebruik geen taken voor promotie-items zoals upgrades of speciale aanbiedingen.
> 
> Het is sterk aan te bevelen dat de takenlijst statisch is. Het moet gelijk blijven aan ongeacht de status of status van de aanvraag. Hoewel het mogelijk is om de lijst dynamisch te variëren, je zou moeten overwegen dat dit de gebruiker kan verwarren die niet verwacht dat deel van de doellijst verandert.

![IJs](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### Voorbeelden

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

### Thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN][msdn-thumbnail]:

> Deze toolbar is de bekende standaard standaard werkbalk. Het heeft een maximaal zeven knoppen. ID, afbeelding, tooltip en staat van elke knop worden gedefinieerd in een structuur, die vervolgens wordt doorgegeven aan de taakbalk. De applicatie kan knoppen tonen, uitschakelen of verbergen van de thumbnail werkbalk zoals vereist door de huidige status.
> 
> Windows Media Player kan bijvoorbeeld standaard media transport bediening aanbieden zoals afspelen, pauzeren, dempen en stoppen.

![speler](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Voorbeelden

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

### Pictogram Overlays in de taakbalk

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN][msdn-icon-overlay]:

> Pictogram overlays dienen als een contextuele melding van status, en zijn bedoeld om de noodzaak te ontzeggen van een apart statuspictogram voor meldingengebied om die informatie aan de gebruiker te communiceren. Bijvoorbeeld, de nieuwe mailstatus in Microsoft Outlook, momenteel weergegeven in het notificatiegebied, kan nu worden aangegeven via een overlay op de taakbalk. Nogmaals, je moet tijdens de ontwikkelcyclus beslissen welke methode het beste is voor je toepassing. Overlay pictogrammen zijn bedoeld om belangrijke, oude status of meldingen zoals netwerkstatus, berichtgever status of nieuwe mail te leveren. De gebruiker moet niet worden gepresenteerd met voortdurend veranderende overlays of animaties.

![Overlay op taakbalk knop](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### Voorbeeld

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN][msdn-flash-frame]:

> Meestal wordt een venster geflasht om de gebruiker te informeren dat het venster aandacht vereist, maar dat het momenteel niet het toetsenbord focus heeft.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### Voorbeeld

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

# Panel úkolů Windows

## Přehled

Electron má API pro konfiguraci ikony aplikace v panelu úkolů Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Toto kontextové menu se nazývá `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Aplikace definují úkoly založené jak na funkcích programu, tak na klíčových věcech, které má uživatel s nimi dělat. Úkoly by měly být bez kontextu, v , že aplikace nemusí být spuštěna, aby fungovala. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. aplikace by neměla zatěžovat menu s pokročilými funkcemi, které standardní uživatelé nebudou potřebovat nebo jednorázové akce, jako je registrace. Nepoužívejte úkoly pro propagační předměty, jako jsou vylepšení nebo speciální nabídky.
> 
> Důrazně se doporučuje, aby byl seznam úkolů statický. Měla by zůstat stejná bez ohledu na stav nebo stav žádosti. I když je možné seznam dynamicky změnit, měli byste zvážit, že by to mohlo zmást uživatele, který neočekává změnu části cílového seznamu .

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Examples

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

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> Tento panel nástrojů je známým běžným ovládáním standardního panelu nástrojů. Má maximálně sedm tlačítek. ID každého tlačítka, obrázek, popisek nástrojů a stav jsou definovány ve struktuře, která je poté předána do panelu úkolů. Aplikace může zobrazit, povolit, zakázat nebo skrýt tlačítka na náhledové liště podle potřeby podle aktuálního stavu .
> 
> Windows Media Player může například nabízet standardní mediální dopravní prvky , jako je přehrávání, pozastavení, ztlumit a zastavit.

![hráč](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Examples

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
cesta k pohodě = require('cesta')

const win = nový BrowserWindow()

vyhraje. etThumbarButtons([
  {
    tooltip: 'button1',
    ikona: cesta. oin(__dirname, 'button1.png'),
    klikněte () { console. og('button1 kliknutí') }
  }, {
    tooltip: 'button2',
    ikona: path.join(__dirname, 'button2. ng'),
    příznaků: ['enabled', 'dismissonclick'],
    click () { console. og('button2 kliknut.') }
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

### Ikona překrytí v hlavním panelu

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Překrytí ikony slouží jako kontextové oznámení o stavu a jsou určeny k popření potřeby samostatné ikony stavu oznamovací oblasti sdělit tyto informace uživateli. Například nový stav e-mailu ve společnosti Microsoft Outlook, který se v současné době zobrazuje v oblasti oznámení, nyní lze indikovat pomocí překrytí na tlačítku hlavního panelu. Opět musíte během svého vývojového cyklu rozhodnout, která metoda je nejlepší pro vaši aplikaci. Ikony potahů jsou určeny k poskytování důležitého, dlouhodobého stavu nebo oznámení, jako je stav sítě, stav messenger nebo nový e-mail. Uživatel by neměl být prezentován s neustále se měnícími potahy nebo animacemi.

![Překrytí tlačítkem na hlavní liště](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Ukázka

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Blesk

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Obvykle je okno nainstalováno tak, aby uživatel informoval, že okno vyžaduje pozornost, ale že v současné době nemá zaměření na klávesnici.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Ukázka

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

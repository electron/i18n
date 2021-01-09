# Bară de activități Windows

## Overview

Electron are API-uri pentru a configura pictograma aplicației în bara de activități Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpListă

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Acea meniu de context se numește `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Aplicațiile definesc sarcinile în funcție de caracteristicile programului și de cheia lucruri pe care un utilizator le poate face cu ele. Sarcinile ar trebui să fie fără context, în că aplicația nu trebuie să ruleze pentru ca ei să funcționeze. Ei ar trebui, de asemenea, să fie cele mai comune acțiuni din punct de vedere statistic pe care un utilizator normal le-ar realiza într-o aplicație, cum ar fi compune un mesaj de e-mail sau deschide calendarul într-un program de e-mail, creează un document nou într-un procesor de cuvinte lansează o aplicație într-un anumit mod, sau lansează una dintre sub-comenzile sale. O aplicație nu ar trebui să ascundă meniul cu caracteristici avansate pe care utilizatorii standard nu vor avea nevoie sau acțiuni o singură dată, cum ar fi înregistrarea. Nu folosi sarcini pentru elemente promoționale cum ar fi upgrade-uri sau oferte speciale.
> 
> Se recomandă cu tărie ca lista de sarcini să fie statică. Ar trebui să rămână la fel indiferent de starea sau starea aplicației. Deşi este posibil să variezi lista în mod dinamic, ar trebui să considerați că acest lucru ar putea să confunde utilizatorul care nu se așteaptă ca acea parte din lista de destinații să se modifice modifice.

![NR](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

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

> Această bară de instrumente este controlul comun standard al barei de instrumente. Are maxim şapte butoane. ID-ul fiecărui buton, imaginea, setarea și starea sunt definite într-o structură, care este apoi transmisă la bara de taskar. Aplicația poate afișa, activa, dezactiva, sau ascunde butoanele din bara de instrumente miniatură după cum este necesar starea sa curentă.
> 
> De exemplu, Windows Media Player poate oferi comenzi standard de transport media cum ar fi joacă, pauză, sunet şi oprire.

![jucător](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Examples

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
cale de const = require('path')

const win = new BrowserWindow()

câștigă. etThumbarButtons([
  {
    tooltip: 'button1',
    icon: cale. oin(__dirname, 'button1.png'),
    click () { consolă. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2. ng'),
    steaguri: ['enabled', 'dismissonclick'],
    click () { consolă. og('button2 clic.') }
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

### Suprapuneri pictograme în bara de activități

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Suprapunerile pictogramelor servesc ca o notificare contextuală a stării și sunt destinate să nege necesitatea unei pictograme separate de stare a zonei de notificare pentru a comunica acea informație utilizatorului. De exemplu, noua adresă de mail în Microsoft Outlook, afișată în prezent în zona de notificare, acum poate fi indicat printr-o suprapunere pe bara de sarcini. Din nou, trebuie să decideți în timpul ciclului de dezvoltare care metodă este cea mai bună pentru aplicația ta. Pictogramele suprapuse sunt destinate să furnizeze o stare importantă, de lungă durată sau notificări, cum ar fi starea rețelei, starea mesagerului sau mesaje noi. Utilizatorul nu ar trebui să fie prezentat cu suprapuneri sau animații care se schimbă constant.

![Suprapunere pe butonul din bara de activități](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Exemplu

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Cadru Flash

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> De obicei, o fereastră este instalată pentru a informa utilizatorul că fereastra necesită atenție, dar că nu are în prezent focalizarea tastaturii.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Exemplu

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

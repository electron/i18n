# Barra Delle Applicazioni Windows

## Overview

Electron dispone di API per configurare l'icona dell'app nella barra delle applicazioni di Windows. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## JumpList

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. Quel menu contestuale è chiamato `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Le applicazioni definiscono le attività in base sia alle caratteristiche del programma che alle cose che un utente dovrebbe fare con loro. Le attività dovrebbero essere prive di contesto, in che l'applicazione non ha bisogno di essere in esecuzione per il loro lavoro. Essi dovrebbero anche essere le azioni statisticamente più comuni che un utente normale dovrebbe eseguire in un'applicazione, come comporre un messaggio di posta elettronica o aprire il calendario in un programma di posta, creare un nuovo documento in un word processor, avviare un'applicazione in una determinata modalità, o lanciare uno dei suoi sottocomandi. Un'applicazione non dovrebbe ingombrare il menu con funzionalità avanzate che gli utenti standard non avranno bisogno o azioni una tantum come la registrazione. Non utilizzare attività per articoli promozionali come aggiornamenti o offerte speciali.
> 
> Si raccomanda vivamente che l'elenco dei compiti sia statico. Dovrebbe rimanere lo stesso indipendentemente dallo stato o dallo stato della domanda. Mentre è possibile variare la lista dinamicamente, si dovrebbe considerare che questo potrebbe confondere l'utente che non si aspetta che quella parte della lista di destinazione cambiare.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Esempi

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

> Questa barra degli strumenti è il controllo comune della barra degli strumenti standard. Ha un massimo di di sette pulsanti. L'ID, l'immagine, il suggerimento degli strumenti e lo stato di ogni pulsante sono definiti in una struttura, che viene poi passata alla barra delle applicazioni. L'applicazione può mostrare, abilitare, disabilitare o nascondere i pulsanti dalla barra delle miniature come richiesto dal suo stato corrente .
> 
> Ad esempio, Windows Media Player potrebbe offrire controlli standard per il trasporto multimediale come riproduzione, pausa, silenzio, e fermati.

![giocatore](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Esempi

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win. etThumbarButtons([
  {
    tooltip: 'button1',
    icona: path. oin(__dirname, 'button1.png'),
    click () { console. og('button1 clicked') }
  }, {
    tooltip: 'button2',
    icona: path.join(__dirname, 'button2. ng'),
    flags: ['enabled', 'dismissonclick'],
    clicca () { console. og('button2 cliccato.') }
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

### Sovrapposizioni icone nella barra delle applicazioni

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Le sovrapposizioni delle icone servono come notifica contestuale dello stato, e sono destinati a negare la necessità di un'icona di stato dell'area di notifica separata per comunicare tali informazioni all'utente. Per esempio, il nuovo stato della posta in Microsoft Outlook, attualmente mostrato nell'area di notifica, ora può essere indicato attraverso una sovrapposizione sul pulsante della barra delle applicazioni. Ancora una volta, è necessario decidere durante il ciclo di sviluppo quale metodo è migliore per la vostra applicazione. Le icone sovrapposte sono destinate a fornire uno stato importante o notifiche di lunga data, come lo stato della rete, lo stato del messaggero o la nuova posta. L'utente non dovrebbe essere presentato con sovrapposizioni o animazioni in continuo cambiamento.

![Sovrapponi al pulsante della barra delle applicazioni](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Esempio

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Frame Flash

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Tipicamente, una finestra viene flashata per informare l'utente che la finestra richiede attenzione, ma che attualmente non ha il fuoco della tastiera.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Esempio

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

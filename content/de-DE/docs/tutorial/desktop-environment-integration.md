# Integration der Desktop-Umgebung

Verschiedene Betriebssysteme bieten verschiedene Funktionen um Desktop-Anwendungen in ihre Desktop-Umgebungen einzubinden. Zum Beispiel können Applikationen unter Windows Verknüpfungen in der JumpList der Taskleiste und unter macOS ein individuelles Menu im Dock platzieren.

Diese Anleitung erklärt Ihnen, wie Sie Ihre Applikation mit Electron-APIs in diese Desktop-Umgebungen integrieren.

## Benachrichtigungen

[Benachrichtigungen](notifications.md) anzeigen

## Zuletzt verwendete Dokumente (Windows & macOS)

Windows und MacOS bieten einfachen Zugriff auf eine Liste der zuletzt verwendeten Dokumente, die von der Anwendung über die JumpList bzw. das Dock Menu geöffnet werden kann.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Dock Menu einer Anwendung:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

To add a file to recent documents, you can use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

And you can use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API to empty the recent documents list:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Bemerkungen zu Windows

Um diese Funktion unter Windows zu nutzen, muss die Anwendung als Handler für den Dateityp des Dokuments registriert sein, ansonsten wird die Datei nicht in der JumpList erscheinen, auch nachdem sie hinzugefügt wurde. You can find everything on registering your application in [Application Registration](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Sobald ein Nutzer auf eine Datei in der JumpList klickt, wird eine neue Instanz Ihrer Anwendung gestartet mit dem Pfad der Datei als Befehlszeilenargument.

### Bemerkungen zu macOS

Sobald eine Datei vom Menu der zuletzt hinzugefügten Dateien angefordert wird, so wird dafür das `open-file`-Event des `app`-Moduls ausgeworfen.

## Individuelles Dock Menu (macOS)

macOS ermöglicht dem Entwickler ein individuelles menu für das Dock festzulegen, welches normalerweise einige Verknüpfungen für häufig verwendete Funktionen der Anwendung bereitstellt:

**Dock Menu der Terminal.app:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Um Ihr eigenes Dock Menu festzulegen, können Sie die `app.dock.setMenu` API nutzen. Diese ist nur unter macOS verfügbar:

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

## Nutzerspezifische Aufgaben (Windows)

Unter Windows können Sie benutzerdefinierte Aktionen in der Kategorie `Tasks` der JumpList definieren. Zitat von MSDN:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

**Aufgaben beim Internet Explorer:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

Im Unterschied zum Dock Menu unter macOS, welches ein richtiges Menu ist, funktionieren die nutzerspezifischen Aufgaben im Bereich Tasks der JumpList wie Anwendungsverknüpfungen. Wenn der Nutzer eine Aufgabe anklickt, wird ein Programm mit bestimmten Argumenten ausgeführt.

Um die nutzerspezifischen Aufgaben für Ihre Anwendung zu setzen, können Sie die [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API verwenden:

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

Um die Liste der Aufgaben zu leeren, rufen Sie lediglich `app.setUserTasks` mit einem leeren Array auf:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

Die Aufgaben werden auch nachdem Ihre Anwendung geschlossen wurde zu sehen sein, so dass das Symbol und der Pfad der Anwendung bestehen bleiben sollten bis die App deinstalliert wird.

## Miniaturansicht-Symbolleisten

On Windows you can add a thumbnail toolbar with specified buttons in a taskbar layout of an application window. Es bietet den Nutzern eine Möglichkeit auf bestimmte Funktionen eines Fensters zuzugreifen ohne das Fenster zu aktivieren.

From MSDN, it's illustrated:

> This toolbar is simply the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Miniaturansicht-Symbolleiste von Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) to set thumbnail toolbar in your application:

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

Um die Miniaturansicht-Symbolleiste Knöpfe zu löschen, rufen sie `BrowserWindow.setThumbarButtons` mit einem lehren Feld als Parameter auf:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity Launcher Verknüpfungen (Linux)

In Unity, können sie selbst erstellte Einträge in den Launcher einfügen indem sie die `.desktop` Datei modifizieren, siehe [Shortcuts zu einem Launcher hinzufügen](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Launcher Shortcuts von Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Fortschrittsanzeige in der Taskleiste (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

On macOS the progress bar will be displayed as a part of the dock icon.

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**Progress bar in taskbar button:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

To set the progress bar for a Window, you can use the [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icon Overlays in Taskbar (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

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

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

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
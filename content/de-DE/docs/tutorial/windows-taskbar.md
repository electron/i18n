# Windows Taskleiste

## Übersicht

Electron hat APIs, um das App-Symbol in der Windows Taskleiste zu konfigurieren. Diese API- unterstützt sowohl Windows-Features wie [Erstellung eines `JumpList`](#jumplist), [benutzerdefinierte Miniaturansichten und Symbolleisten](#thumbnail-toolbars), [Symbol-Overlays](#icon-overlays-in-taskbar), als auch den so genannten ["Flash Frame"-Effekt](#flash-frame)sowie plattformübergreifende Features wie [neueren Dokumente][recent-documents] und [Anwendungsfortschritt][progress-bar].

## JumpList

Mit Windows können Apps ein benutzerdefiniertes Kontextmenü definieren, das angezeigt wird, wenn Benutzer mit der rechten Maustaste auf das Symbol der App in der Taskleiste klicken . Das Kontextmenü heißt `JumpList`. Sie geben benutzerdefinierte Aktionen in der `Tasks` Kategorie JumpList wie aus [MSDN-][msdn-jumplist]zitiert:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

![JH](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> HINWEIS: Der obige Screenshot ist ein Beispiel für allgemeine Aufgaben von Internet Explorer

Im Gegensatz zum Dock-Menü in macOS, das ein echtes Menü ist, funktionieren Benutzeraufgaben in Windows wie Anwendungsverknüpfungen. Wenn ein Benutzer beispielsweise auf eine Aufgabe klickt, wird das Programm mit angegebenen Argumenten ausgeführt.

Um Benutzeraufgaben für Ihre Anwendung festzulegen, können Sie [app.setUserTasks][setusertaskstasks] -API verwenden.

#### Beispiele

##### Festlegen von Benutzeraufgaben

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

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

##### Löschen der Aufgabenliste

Um Ihre Aufgabenliste zu löschen, müssen Sie `app.setUserTasks` mit einem leeren Array in der `main.js` -Datei aufrufen.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> HINWEIS: Die Benutzeraufgaben werden auch nach dem Schließen der Anwendung angezeigt, sodass das für eine Aufgabe angegebene Symbol und der Programmpfad vorhanden sein sollten, bis die Anwendung deinstalliert wird.

### Miniaturansicht-Symbolleisten

Unter Windows können Sie einer Taskleiste Layout eines Anwendungsfensters eine Miniaturansichtssymbolleiste mit angegebenen Schaltflächen hinzufügen. Es bietet Benutzern die Möglichkeit, auf den Befehl eines bestimmten Fensters zuzugreifen, ohne das Fenster wiederherzustellen oder zu aktivieren.

Wie aus [MSDN-][msdn-thumbnail]zitiert:

> Diese Symbolleiste ist die übliche Standardsteuerung. Es hat ein Maximum von auf sieben Tasten. Die Kennung jeder Schaltfläche, des Bildes, des Tooltips und des Zustands werden in einer Struktur definiert, die dann an die Taskleiste übergeben wird. Die Anwendung kann Schaltflächen in der Miniaturansicht anzeigen, aktivieren, deaktivieren oder ausblenden, wie dies für den aktuellen Status erforderlich ist.
> 
> Zum Beispiel bietet Windows Media Player standardmäßige Medienübertragungssteuerungen wie Abspielen, Pause, Stummschalten und Stoppen.

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> HINWEIS: Der obige Screenshot ist ein Beispiel für die Miniaturansichtssymbolleiste von Windows Media Player

Um die Miniaturansichtssymbolleiste in Ihrer Anwendung festzulegen, müssen Sie [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Beispiele

##### Festlegen der Miniaturansichtssymbolleiste

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  '
    tooltip: 'button1',
    -Symbol: path.join(__dirname, 'button1.png'),
    klicken () ,,.log('button1 angeklickt') ,
  ,
    QuickTip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    klicken (.log) -
  -
])
```

##### Klare Miniaturansichtssymbolleiste

Um Miniaturansichtssymbolleistenschaltflächen zu löschen, müssen Sie `BrowserWindow.setThumbarButtons` mit einem leeren Array in der `main.js` -Datei aufrufen.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Icon-Overlays in Taskleiste

Unter Windows kann eine Taskleistenschaltfläche ein kleines Overlay verwenden, um den Status Anwendung anzuzeigen.

Wie aus [MSDN-][msdn-icon-overlay]zitiert:

> Icon-Overlays dienen als kontextabhängige Benachrichtigung über den Status und , um die Notwendigkeit eines separaten Statussymbols für den Benachrichtigungsbereich zu negieren, um diese Informationen mit dem Benutzer zu kommunizieren. Zum Beispiel der neue E-Mail-Status in Microsoft Outlook, der derzeit im Benachrichtigungsbereich angezeigt wird kann nun durch ein Overlay auf der Taskleiste-Taste angezeigt werden. Wiederum musst du während deines Entwicklungszyklus entscheiden, welche Methode für deine Anwendung am besten ist. Overlay-Symbole sollen wichtige, seit langem bestehende Status oder Benachrichtigungen wie den Netzwerkstatus oder den Messenger-Status oder neue Nachrichten liefern. Dem Benutzer sollte nicht mit ständig wechselnden Overlays oder Animationen präsentiert werden.

![Auf Taskleisten-Schaltfläche überlagern](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> HINWEIS: Der Screenshot oben ist ein Beispiel für Overlay auf einer Taskleisten-Schaltfläche

Um das Overlay-Symbol für ein Fenster festzulegen, müssen Sie die [BrowserWindow.setOverlayIcon][setoverlayicon] -API verwenden.

#### Beispiel

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Blitzrahmen

Unter Windows können Sie die Taskleistenschaltfläche markieren, um die Aufmerksamkeit des Benutzers zu erhalten. Dies ähnelt dem Abprallen des Dock-Symbols in macOS.

Wie aus [MSDN-][msdn-flash-frame]zitiert:

> Normalerweise wird ein Fenster blinkt, um den Benutzer darüber zu informieren, dass das Fenster Aufmerksamkeit benötigt, aber momentan nicht den Fokus auf die Tastatur hat.

Um die BrowserWindow-Taskleisten-Schaltfläche zu blinken, müssen Sie die [BrowserWindow.flashFrame][flashframe] -API verwenden.

#### Beispiel

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> HINWEIS: Vergessen Sie nicht, `win.flashFrame(false)` anzurufen, um den Blitz auszuschalten. Im obigen Beispiel wird es aufgerufen, wenn das Fenster in den Fokus rückt, aber Sie können ein Timeout oder ein anderes Ereignis verwenden, um es zu deaktivieren.

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

# Windows Taskleiste

Electron hat APIs, um das App-Symbol in der Windows Taskleiste zu konfigurieren. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## JumpList

Windows erlaubt Apps ein benutzerdefiniertes Kontextmenü zu definieren, das angezeigt wird, wenn Benutzer mit der rechten Maustaste auf das App-Symbol in der Taskleiste klicken. Das Kontextmenü heißt `JumpList`. Sie geben benutzerdefinierte Aktionen in der Kategorie `Aufgaben` der Sprungliste, an, wie aus MSDN zitiert:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

__Aufgaben beim Internet Explorer:__

![JH](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

Im Unterschied zum Dock Menu unter macOS, welches ein richtiges Menu ist, funktionieren die nutzerspezifischen Aufgaben im Bereich Tasks der JumpList wie Anwendungsverknüpfungen. Wenn der Nutzer eine Aufgabe anklickt, wird ein Programm mit bestimmten Argumenten ausgeführt.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

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

Rufen Sie `app.setUserTasks` an, um Ihre Aufgabenliste zu bereinigen:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Die Aufgaben werden auch nachdem Ihre Anwendung geschlossen wurde zu sehen sein, so dass das Symbol und der Pfad der Anwendung bestehen bleiben sollten bis die App deinstalliert wird.


## Miniaturansicht-Symbolleisten

Unter Windows können Sie eine Miniaturansicht-Symbolleiste mit den angegebenen Schaltflächen in der Taskleiste des Anwendungsfensters hinzufügen. Es bietet den Nutzern eine Möglichkeit auf bestimmte Funktionen eines Fensters zuzugreifen ohne das Fenster zu aktivieren.

Von MSDN abgebildet:

> Diese Symbolleiste ist die übliche Standardsteuerung. Es hat ein Maximum von auf sieben Tasten. Die Kennung jeder Schaltfläche, des Bildes, des Tooltips und des Zustands werden in einer Struktur definiert, die dann an die Taskleiste übergeben wird. Die Anwendung kann Schaltflächen in der Miniaturansicht anzeigen, aktivieren, deaktivieren oder ausblenden, wie dies für den aktuellen Status erforderlich ist.
> 
> Zum Beispiel bietet Windows Media Player standardmäßige Medienübertragungssteuerungen wie Abspielen, Pause, Stummschalten und Stoppen.

__Miniaturansicht-Symbolleiste von Windows Media Player:__

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

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

Um die Miniaturansicht-Symbolleiste Knöpfe zu löschen, rufen sie `BrowserWindow.setThumbarButtons` mit einem lehren Feld als Parameter auf:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Icon-Overlays in Taskleiste

Unter Windows kann ein Taskleisten-Button ein kleines Overlay verwenden, um die Anwendung anzuzeigen, wie aus MSDN zitiert:

> Icon-Overlays dienen als kontextabhängige Benachrichtigung über den Status und , um die Notwendigkeit eines separaten Statussymbols für den Benachrichtigungsbereich zu negieren, um diese Informationen mit dem Benutzer zu kommunizieren. Zum Beispiel der neue E-Mail-Status in Microsoft Outlook, der derzeit im Benachrichtigungsbereich angezeigt wird kann nun durch ein Overlay auf der Taskleiste-Taste angezeigt werden. Wiederum musst du während deines Entwicklungszyklus entscheiden, welche Methode für deine Anwendung am besten ist. Overlay-Symbole sollen wichtige, seit langem bestehende Status oder Benachrichtigungen wie den Netzwerkstatus oder den Messenger-Status oder neue Nachrichten liefern. Dem Benutzer sollte nicht mit ständig wechselnden Overlays oder Animationen präsentiert werden.

__Overlay auf Taskleisten-Schaltfläche:__

![Auf Taskleisten-Schaltfläche überlagern](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## Blitzrahmen

Unter Windows können Sie die Taskleiste-Taste markieren, um die Aufmerksamkeit des Benutzers zu erhalten. Dies ähnelt dem Überspringen des Dock-Symbols auf macOS. Aus der MSDN-Referenzdokumentation:

> Normalerweise wird ein Fenster blinkt, um den Benutzer darüber zu informieren, dass das Fenster Aufmerksamkeit benötigt, aber momentan nicht den Fokus auf die Tastatur hat.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Vergessen Sie nicht die Methode `flashFrame` mit `false aufzurufen` um den Blitz auszuschalten. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md

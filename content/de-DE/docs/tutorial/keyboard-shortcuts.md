# Tastenkürzel

## Übersicht

Mit dieser Funktion können Sie lokale und globale Tastenkombinationen für Ihre Electron-Anwendung konfigurieren.

## Beispiel

### Lokale Verknüpfungen

Lokale Tastenkombinationen werden nur ausgelöst, wenn die Anwendung fokussiert ist. Zum Konfigurieren einer lokalen Tastenkombination müssen Sie beim Erstellen eines [MenuItem-][] im [Menü-][] -Modul eine [`accelerator`][] -Eigenschaft angeben.

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
const { Menu, MenuItem } = require('electron')

const menu = new menu()
menu.append(new MenuItem('
  label: 'Electron',
  untermit: ['
    rolle: 'help',
    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I': 'Alt+Shift+I',
    klicken: () => 'console.log('Elektronenfelsen!') 

)

Menu.setApplicationMenu(menü)
```

> HINWEIS: Im obigen Code können Sie sehen, dass sich der Beschleuniger je nach dem Betriebssystem des Benutzers unterscheidet. Für MacOS ist es `Alt+Cmd+I`, während für Linux und Windows, es `Alt+Shift+I`ist.

Nach dem Starten der Electron-Anwendung sollten Sie das Anwendungsmenü zusammen mit der lokalen Verknüpfung sehen, die Sie gerade definiert haben:

![Menü mit einer lokalen Verknüpfung](../images/local-shortcut.png)

Wenn Sie auf `Help` klicken oder den definierten Beschleuniger drücken und dann das Terminal öffnen, von dem aus Sie Ihre Electron-Anwendung ausgeführt haben, wird die Meldung angezeigt, die nach dem Auslösen des `click` -Ereignisses generiert wurde: "Elektronenfelsen!".

### Globale Verknüpfungen

Zum Konfigurieren einer globalen Tastenkombination müssen Sie das [globalShortcut][] -Modul verwenden, um Tastaturereignisse zu erkennen, auch wenn die Anwendung nicht über Tastaturfokus verfügt.

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
const { app, globalShortcut } = require('electron')

app.whenReady().then()=> '
  globalShortcut.register('Alt+CommandOrControl+I', () => '
    console.log('Electron loves global shortcuts!')
  ))
.).
```

> HINWEIS: Im obigen Code verwendet die `CommandOrControl` Kombination `Command` unter macOS und `Control` unter Windows/Linux.

Nachdem Sie die Electron-Anwendung gestartet haben, wenn Sie die definierte Taste Kombination drücken und dann das Terminal öffnen, von dem aus Sie Ihre Electron-Anwendung ausgeführt haben, Sie sehen, dass Electron globale Verknüpfungen liebt!

### Verknüpfungen innerhalb eines Browserfensters

#### Verwenden von Web-APIs

Wenn Sie Tastenkombinationen in einem [BrowserWindow][]verarbeiten möchten, können Sie die `keyup` - und `keydown` [DOM-Ereignisse][dom-events] innerhalb des -Renderer-Prozesses mithilfe der [addEventListener() API][addEventListener-api]abhören.

```js
window.addEventListener('keyup', doSomething, true)
```

Beachten Sie, dass der dritte Parameter `true` angibt, dass der Listener immer Tastendrücke vor anderen Listenern empfängt, damit sie nicht aufgerufen `stopPropagation()` haben können.

#### Abfangen von Ereignissen im Hauptprozess

Das [`vor dem Input-Event`](../api/web-contents.md#event-before-input-event) Ereignis wird vor dem Versenden von `Tastendruck` und `Tastendruck` Ereignisse auf der Seite abgesendet. Es kann verwendet werden, um benutzerdefinierte Verknüpfungen zu fangen und zu verwalten, die im Menü nicht sichtbar sind.

##### Beispiel

Beginnen Sie mit einer funktionierenden Anwendung aus der [Quick Start Guide](quick-start.md), aktualisieren Sie die `main.js` -Datei mit den folgenden Zeilen:

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
const { app, BrowserWindow } = require('electron')

app.whenReady().then()=>
  const win = new BrowserWindow(' breite: 800, Höhe: 600, webPreferences: { nodeIntegration: true }

  win.loadFile('index.html')
  win.webContents.on('before-input-event', (event, input) => '
    if (input.control && input.key.toLowerCase() === 'i') '

      console.log('Pressed Control+I')  event.prevent

  
    .
```

Nachdem Sie die Electron-Anwendung gestartet haben, werden Sie sehen, dass diese Tastenkombination erfolgreich abgefangen wurde, wenn Sie das Terminal öffnen, von dem aus Sie Ihrer Electron-Anwendung ausgeführt haben, und `Ctrl+I` Tastenkombination drücken.

#### Verwenden von Bibliotheken von Drittanbietern

Wenn Sie keine manuelle Verknüpfungsanalyse erstellen möchten, gibt es Bibliotheken, die erweiterte Tastenerkennung verwenden, z. B. [Mausefalle][]. Im Folgenden finden Sie Beispiele für die Verwendung der `mousetrap` , die im Renderer-Prozess ausgeführt werden:

```js
Mousetrap.bind('4', () => 'console.log('4')
Mousetrap.bind('?', () => 'console.log('Show shortcuts!') 
Mousetrap.bind('esc', () => 'console.log('escape') ', 'keyup')

/combinations
Mousetrap.bind('command+shift+k', () => 'console.log('command shift k')


/ () =>
  console.log('command k or control k')

  / false, um zu verhindern, dass das Standardverhalten sprudelt,
  das Ereignis zu verhindern,
das zu sprudeln,

/ / gmail style sequenzen
Mousetrap.bind('g i', () => 'console.log('go to in box')
Mousetrap.bind('* a', (

.log> )
Mousetrap.bind('oben links unten rechts rechts ein enter', () => {
  console.log('konami code')
})
```

[Menü-]: ../api/menu.md
[MenuItem-]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[Mausefalle]: https://github.com/ccampbell/mousetrap
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

## Klasse: Menü

> Erstellen Sie systemeigene Anwendungsmenüs und Kontextmenüs.

Prozess: [Main](../glossary.md#main-process)

### `new Menu()`

Neues Menü anlegen.

### Static Methods

Die `Menu` -Klasse verfügt über die folgenden statischen Methoden:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Legt `menu` als Anwendungsmenü unter macOS fest. Unter Windows und Linux wird die `menu` als oberstes Menü jedes Fensters festgelegt.

Auch unter Windows und Linux können Sie einen `&` im Elementnamen der obersten Ebene verwenden, um anzugeben, welcher Buchstabe einen generierten Beschleuniger erhalten soll. Wenn Sie z. B. `&File` für das Dateimenü verwenden, wird ein generierter `Alt-F` Beschleuniger, der das zugehörige Menü öffnet. Das angegebene Zeichen in der Schaltflächenbeschriftung erhält eine Unterstreichung. Das `&` Zeichen wird nicht auf der Schaltflächenbeschriftung angezeigt.

Durch das Übergeben `null` wird das Standardmenü unterdrückt. Unter Windows und Linux dies den zusätzlichen Effekt hat, die Menüleiste aus dem Fenster zu entfernen.

**Hinweis:** Das Standardmenü wird automatisch erstellt, wenn die App keines setzt. Sie enthält Standardelemente wie `File`, `Edit`, `View`, `Window` und `Help`.

#### `Menu.getApplicationMenu()`

Gibt `Menu | null` zurück : Das Anwendungsmenü, sofern festgelegt, oder `null`, wenn nicht festgelegt.

**Hinweis:** Die zurückgegebene `Menu` -Instanz unterstützt keine dynamische Addition oder Entfernung von Menüelementen. [Instance-Eigenschaften](#instance-properties) können weiterhin dynamisch geändert werden.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

Sendet die `action` an den Ersthelfer der Anwendung. Dies wird zum Emulieren des standardmäßigen macOS-Menüverhaltens verwendet. In der Regel verwenden Sie die [`role`](menu-item.md#roles) Eigenschaft eines [`MenuItem`](menu-item.md).

Weitere Informationen zu den systemeigenen Aktionen von macOS finden Sie im [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) .

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Returns `Menu`

Im Allgemeinen ist die `template` ein Array von `options` zum Erstellen eines [MenuItem](menu-item.md). Auf die Verwendung kann oben verwiesen werden.

Sie können auch andere Felder an das Element der `template` anfügen und sie werden zu Eigenschaften der erstellten Menüelemente.

### Instanz Methoden

Das `menu` Objekt hat die folgenden Instanz Methoden:

#### `menu.popup([options])`

* `options` Objekt (optional)
  * `window` [BrowserWindow](browser-window.md) (optional) - Default ist das fokussierte Fenster.
  * `x` Zahl (optional) - Standard ist die aktuelle Mauscursorposition. Muss deklariert werden, wenn `y` deklariert ist.
  * `y` Zahl (optional) - Standard ist die aktuelle Mauscursorposition. Muss deklariert werden, wenn `x` deklariert ist.
  * `positioningItem` Zahl (optional) _macOS_ - Der Index des Menüelements, das unter dem Mauszeiger an den angegebenen Koordinaten positioniert werden soll. Der Standard ist -1.
  * `callback` Funktion (optional) - Wird aufgerufen wenn das Menü geschlossen wird.

Öffnet dieses Menü als Kontextmenü im [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default ist das fokussierte Fenster.

Schließt das Kontext-Menü im `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Fügt dem Menü das `menuItem` hinzu.

#### `menu.getMenuItemById(id)`

* `id` String

Gibt `MenuItem | null` das Element mit dem angegebenen `id`zurück.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Füre das `menuItem` an der `pos` Position im Menü ein.

### Instanz Events

Objekte, die mit `new Menu` erstellt oder von `Menu.buildFromTemplate` zurückgegeben werden, senden die folgenden Ereignisse aus:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### Event: 'menu-will-show'

Rückgabewert:

* `event` Event

Emittiert, wenn `menu.popup()` aufgerufen wird.

#### Event: 'menu-will-close'

Rückgabewert:

* `event` Event

Emitiert wenn ein Popup manuell oder mit `menu.closePopup()` geschlossen wird.

### Instanz Eigenschaften

`menu` Objekte haben außerdem die folgenden Eigenschaften:

#### `menu.items`

Ein `MenuItem[]` Array, das die Elemente des Menüs enthält.

Jede `Menu` besteht aus mehreren [`MenuItem`](menu-item.md)s und jeder `MenuItem` kann ein Untermenü haben.

## Beispiele

Ein Beispiel für das Erstellen des Anwendungsmenüs mit der einfachen Vorlagen-API:

```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  / { role: 'appMenu' }
  ... (isMac ? app.name,
    Untermenü: app.name,  Untermenü: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  ] : []),
  / { role: 'fileMenu' }

    Label: 'Datei',
    Untermenü: [
      isMac ?
 { role: 'close' } : { role: 'quit' }
    ]
  ,
  / { role: 'editMenu' }

    Etikett  : 'Bearbeiten',
    Untermenü: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ... (isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },

          Label: 'Speech',
          Untermenü: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]

      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  ,
  /
    Etikett { role: 'viewMenu' }
  ,
    : '
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  ,
  / { role: 'windowMenu' }

    Label: 'Window',
    Untermenü: [
      { role: 'minimize' },
      { role: 'zoom' },
      ... (isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]


    -Rolle: 'help',
    Untermenü: [
      '
        Label: 'Learn more',
        klicken: async () => '
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        '
      '
    ]
  '
]

const menu = Menu.buildFromTemplate(
template)
```

### Renderprozess

Um Menüs zu erstellen, die vom Rendererprozess initiiert wurden, senden Sie die erforderlichen Informationen mithilfe von IPC an den Hauptprozess, und lassen Sie den Hauptprozess das Menü im Auftrag des Renderers anzeigen.

Im Folgenden finden Sie ein Beispiel für das Anzeigen eines Menüs, wenn der Benutzer mit der rechten Maustaste auf die Seite klickt:

```js
renderer
window.addEventListener('contextmenu', (e) => '
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
')

ipcRenderer.on('context-menu-command', (e, command) => '
  / ...
•)

/ Haupt
ipcMain.on('show-context-menu', (event) => -
  const-Vorlage = [
    -
      -Label: 'Menüelement 1',
      klicken Sie: () => 'event.sender.send('context-menu-command', 'menu-item-1') '
    ' ,
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents
))
```

## Hinweise zu Application Menüs in macOS

macOS hat einen völlig anderen Stil des Anwendungsmenüs als Windows und Linux. Hier sind einige Hinweise, wie Sie das Menü Ihrer App nativer gestalten können.

### Standardmenüs

Unter macOS gibt es viele systemdefinierte Standardmenüs, wie die [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) und `Windows` Menüs. Um Ihr Menü zu einem Standardmenü zu machen, sollten Sie die `role` Ihres Menüs auf eine der folgenden einstellen und Electron erkennt sie und macht sie zu Standardmenüs werden:

* `Fenster`
* `hilfe`
* `dienste`

### Standard-Menüelementaktionen

macOS hat Standardaktionen für einige Menüelemente bereitgestellt, z. B. `About xxx`, `Hide xxx`und `Hide Others`. Um die Aktion eines Menüelements auf eine Standardaktion festzulegen, sollten Sie das `role` Attribut des Menüelements festlegen.

### Name des Hauptmenüs

Unter macOS ist die Bezeichnung des ersten Elements des Anwendungsmenüs immer der Name Ihrer App, unabhängig davon, welche Bezeichnung Sie festlegen. Um es zu ändern, ändern Sie die `Info.plist` Datei Ihres App-Pakets. Weitere Informationen finden Sie unter [Informationen Eigenschaftenlistendateien][AboutInformationPropertyListFiles] .

## Festlegen des Menüs für bestimmtes Browserfenster (*Linux* *Windows*)

Die [`setMenu` Methode][setMenu] von Browserfenstern kann das Menü bestimmter Browserfenster festlegen.

## Menüelementposition

Sie können `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` und `id` verwenden, um zu steuern, wie das Element platziert wird, wenn sie ein Menü mit `Menu.buildFromTemplate`erstellen.

* `before` - Fügt dieses Element vor dem Element mit der angegebenen Bezeichnung ein. Wenn das , auf das verwiesen wird, nicht vorhanden ist, wird das Element am Ende Menüs eingefügt. Bedeutet auch, dass das betreffende Menüelement in derselben "Gruppe" wie das Element platziert werden sollte.
* `after` - Fügt dieses Element nach dem Artikel mit der angegebenen Bezeichnung ein. Wenn das , auf das verwiesen wird, nicht vorhanden ist, wird das Element am Ende Menüs eingefügt. Bedeutet auch, dass das betreffende Menüelement in derselben "Gruppe" wie das Element platziert werden sollte.
* `beforeGroupContaining` - Bietet eine Möglichkeit für ein einzelnes Kontextmenü, platzierung der enthaltenden Gruppe vor der enthaltenden Gruppe des Elements mit der angegebenen Bezeichnung zu deklarieren.
* `afterGroupContaining` - Bietet eine Möglichkeit für ein einzelnes Kontextmenü, platzierung der enthaltenden Gruppe nach der enthaltenden Gruppe des Elements mit der angegebenen Bezeichnung zu deklarieren.

Standardmäßig werden Elemente in der Reihenfolge eingefügt, in der sie in der Vorlage vorhanden sind, es sei denn, eines der angegebenen Positionierungsschlüsselwörter wird verwendet.

### Beispiele

Template:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menü:

```sh
- 1
- 2
- 3
- 4
```

Template:

```javascript
[
  { id: '1', label: 'Eins' },
  { type: 'separator' },
  { id: '3', label: 'Drei', beforeGroupContaining: ['1'] },
  { id: '4', label: 'Vier', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'Zwei' }
]
```

Menü:

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

Template:

```javascript
[
  { id: '1', label: 'Eins', after: ['3'] },
  { id: '2', label: 'Zwei', before: ['1'] },
  { id: '3', label: 'Drei' }
]
```

Menü:

```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows

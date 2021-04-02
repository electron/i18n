# Öffnen von Fenstern aus dem Renderer

Es gibt mehrere Möglichkeiten, um zu steuern, wie Fenster aus vertrauenswürdigem oder nicht vertrauenswürdigen Inhalt in einem Renderer erstellt werden. Windows kann über den Renderer auf zwei Arten erstellt werden:

- Klicken auf Links oder Senden von Formularen, die mit `target=_blank`
- JavaScript ruft `window.open()`auf

In nicht sandkastengebundenen Renderern oder wenn `nativeWindowOpen` falsch ist (Standard), führt dies zur Erstellung eines [`BrowserWindowProxy`](browser-window-proxy.md), eines Lichtwrappers um `BrowserWindow`.

Wenn jedoch die Option `sandbox` (oder direkt `nativeWindowOpen`) festgelegt ist, wird eine `Window` Instanz erstellt, wie Sie es im Browser erwarten würden. Bei Inhalten mit demselben Ursprung wird das neue Fenster innerhalb desselben Prozesses erstellt, sodass die übergeordnete n direkt auf das untergeordnete Fenster zugreifen kann. Dies kann für App-Unterfenster, die als Präferenzfelder oder ähnliches fungieren, sehr nützlich sein, da das übergeordnete Element direkt in das Unterfenster rendern kann, als wäre es ein `div` im übergeordneten Fenster.

Electron paart diese native Chrome- `Window` mit einem BrowserWindow unter der Haube. Sie können alle verfügbaren Anpassungen nutzen, wenn Sie ein BrowserWindow im Hauptprozess erstellen, indem Sie `webContents.setWindowOpenHandler()` für vom Renderer erstellte Fenster verwenden.

BrowserWindow-Konstruktoroptionen werden festgelegt durch, in zunehmender Rangfolge Reihenfolge: Optionen, die vom übergeordneten geerbt werden, analysierte Optionen, die von der `features` -Zeichenfolge aus `window.open()` , sicherheitsbezogene webPreferences vom übergeordneten systemverknüpften und von [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)angegebenen Optionen. Beachten Sie, dass `webContents.setWindowOpenHandler` über das letzte Mitspracherecht und die volle Berechtigung verfügt, da sie im Hauptprozess aufgerufen wird.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (optional)
* `features` String (optional)

Rücksendungen [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` ist eine durch Kommas getrennte Schlüsselwertliste, die dem Standardformat browser folgt. Electron analysiert `BrowserWindowConstructorOptions` aus dieser Liste, wo möglich, aus Bequemlichkeit. Für volle Kontrolle und bessere Ergonomie die Verwendung von `webContents.setWindowOpenHandler` in Betracht ziehen, um die BrowserWindow-Erstellung anzupassen.

Eine Teilmenge `WebPreferences` kann direkt, nicht einnistet, aus der Features-Zeichenfolge festgelegt werden: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`und `webviewTag`.

Ein Beispiel:

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**Hinweise:**

* Die Knotenintegration wird immer im geöffneten `window` deaktiviert, wenn sie im übergeordneten Fenster deaktiviert ist.
* Die Kontextisolation wird immer im geöffneten `window` aktiviert, wenn sie im übergeordneten Fenster aktiviert ist.
* JavaScript wird immer im geöffneten `window` deaktiviert, wenn es auf übergeordneten Fenster sausen deaktiviert ist.
* Nicht standardmäßige Features (die nicht von Chrom oder Electron behandelt werden), die in `features` angegeben sind, werden an alle registrierten `webContents` `did-create-window` Ereignishandlers im argument `additionalFeatures` übergeben.

Um die Erstellung des Fensters anzupassen oder abzubrechen, können Sie optional einen Überschreibungshandler mit `webContents.setWindowOpenHandler()` aus dem Hauptprozess festlegen. Das Zurückgeben `false` bricht das Fenster ab, während ein Objekt sätze die beim Erstellen des Fensters verwendeten `BrowserWindowConstructorOptions` zurückgegeben wird. Beachten Sie, dass dies leistungsfähiger ist als das Übergeben von Optionen über die Feature-Zeichenfolge, da der -Renderer über eingeschränktere Berechtigungen bei der Entscheidung über Sicherheitseinstellungen verfügt als der Hauptprozess.

### `BrowserWindowProxy` Beispiel

```javascript

main.js
const mainWindow = new BrowserWindow()

mainWindow.webContents.setWindowOpenHandler(({ url }) =>
  if (url.startsWith('https://github.com/')) '
    rückgabe { action: 'allow' }

  rückgabe { action: 'deny' }
')

mainWindow.webContents.on('did-create-window
  > ', (childWindow)
  childWindow.webContents('will-navigate', (e) => '
    e.preventDefault()
  )

```

```javascript
renderer.js
const windowProxy = window.open('https://github.com/', null, 'minimizable=false')
windowProxy.postMessage('hi', '*')
```

### Native `Window` Beispiel

```javascript
main.js
const mainWindow = new BrowserWindow('
  webPreferences: {
    nativeWindowOpen: true
  }
' )

/ In diesem Beispiel werden nur Fenster mit der URL 'about:blank' erstellt.
Alle anderen URLs werden blockiert.
mainWindow.webContents.setWindowOpenHandler(({ url }) =>
  wenn (URL === 'about:blank') -
    geben Sie einen
      Frame zurück: false,
      vollbildbar: false,
      backgroundColor: 'black',
      webPreferences: {
        preload: 'my-child-window-preload-script.js'
      }
    '
  '
  geben false
zurück.
```

```javascript
Rendererprozess (mainWindow)
const childWindow = window.open('', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```

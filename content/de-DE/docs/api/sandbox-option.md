# `sandbox` Option

> Erstellen Sie ein Browserfenster mit einem Sandkasten-Renderer. Wenn diese Option aktiviert ist, muss der Renderer über IPC mit dem Hauptprozess kommunizieren, um auf Knoten-APIs zugreifen zu können.

Eines der wichtigsten Sicherheitsmerkmale von Chromium ist, dass alle Blink-Rendering/JavaScript- Code in einer Sandbox ausgeführt wird. Diese Sandbox verwendet OS-spezifische Funktionen, um sicherzustellen, dass , die im Rendererprozess ausgenutzt werden, dem System nicht schaden kann.

Mit anderen Worten, wenn die Sandbox aktiviert ist, können die Renderer nur Änderungen am System vornehmen, indem sie Aufgaben über IPC an den Hauptprozess delegieren. [Hier finden Sie](https://www.chromium.org/developers/design-documents/sandbox) weitere Informationen über die Sandbox.

Da ein Hauptmerkmal in Electron die Möglichkeit ist, Node.js im Renderer-Prozess auszuführen (was die Entwicklung von Desktop-Anwendungen mit Web- -Technologien erleichtert), ist die Sandbox durch Elektronen deaktiviert. Dies liegt daran, dass meisten Node.js-APIs Systemzugriff erfordern. `require()` ist beispielsweise ohne Dateisystemberechtigungen, die in einer Sandkasten- -Umgebung nicht verfügbar sind, nicht möglich.

Normalerweise ist dies kein Problem für Desktopanwendungen, da der Code immer vertrauenswürdig ist, aber es macht Electron weniger sicher als Chromium für die Anzeige nicht vertrauenswürdigen Webinhalten. Für Anwendungen, die mehr Sicherheit erfordern, zwingt das `sandbox` -Flag Electron, einen klassischen Chromium-Renderer zu erstellen, der mit der Sandbox kompatibel ist.

Ein Sandkasten-Renderer verfügt nicht über eine Node.js-Umgebung, die ausgeführt wird, und stellt Node.js JavaScript-APIs für Clientcode verfügbar. Die einzige Ausnahme ist das Preload-Skript, das Zugriff auf eine Teilmenge der Electron-Renderer-API hat.

Ein weiterer Unterschied besteht darin, dass Sandkastenrenderer keine der standardmäßigen JavaScript-APIs ändern. Folglich funktionieren einige APIs wie `window.open` so, wie sie es in Chromium tun (d. h. sie geben keine [`BrowserWindowProxy`](browser-window-proxy.md)zurück).

## Beispiel

Um ein Sandkastenfenster zu erstellen, übergeben Sie `sandbox: true` an `webPreferences`:

```js
lassen Sie
app.whenReady().then() => -
  win = new BrowserWindow('
    webPreferences: {
      sandbox: true
    }
  ')
  win.loadURL('http://google.com')

```

Im obigen Code ist der [`BrowserWindow`](browser-window.md) , der erstellt wurde, Node.js deaktiviert und kann nur über IPC kommunizieren. Die Verwendung dieser Option verhindert, dass Electron eine Node.js Laufzeit im Renderer erstellt. Außerdem folgt in diesem neuen Fenster `window.open` dem systemeigenen Verhalten (standardmäßig erstellt Electron eine [`BrowserWindow`](browser-window.md) und gibt einen Proxy darüber über `window.open`zurück).

[`app.enableSandbox`](app.md#appenablesandbox) kann verwendet werden, um `sandbox: true` für alle `BrowserWindow` Instanzen zu erzwingen.

```js
lassen Sie
app.enableSandbox()
app.whenReady().then()=> -
  / / keine Notwendigkeit, 'sandbox: true' zu übergeben, da 'app.enableSandbox()' aufgerufen wurde.
  win = neue BrowserWindow()
  win.loadURL('http://google.com')
')
```

## Vorspannung

Eine App kann Anpassungen an Sandkasten-Renderern mithilfe eines Preload-Skripts vornehmen. Hier ist ein Beispiel:

```js
let win
app.whenReady().then() => -
  win = new BrowserWindow('
    webPreferences: '
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    '
  ')
  win.loadURL('http://google.com')

```

und Vorspannung.js:

```js
Diese Datei wird immer dann geladen, wenn ein Javascript-Kontext erstellt wird. Es wird in einem
/ privaten Bereich ausgeführt, der auf eine Teilmenge von Electron-Renderer-APIs zugreifen kann. Ohne
/ contextIsolation aktiviert, ist es möglich, versehentlich privilegierte
/ - globals wie ipcRenderer an Webinhalte zu übertragen.
const { ipcRenderer } = require('electron')

const defaultWindowOpen = window.open

window.open = funktion customWindowOpen (url, ... args) -
  ipcRenderer.send('report-window-open', location.origin, url, args)
  return defaultWindowOpen(url + '?from_electron=1', ... args)

```

Wichtige Dinge, die im Preload-Skript zu beachten sind:

- Auch wenn der Sandkasten-Renderer node.js ausgeführt hat, hat er immer noch Zugriff auf eine eingeschränkte knotenähnliche Umgebung: `Buffer`, `process`, `setImmediate`, `clearImmediate` und `require` sind verfügbar.
- Das Preload-Skript muss in einem einzigen Skript enthalten sein, aber es ist möglich, komplexen Preload-Code mit mehreren Modulen zusammengesetzt zu haben, indem ein Tool wie Webpack oder Browserify verwendet wird. Ein Beispiel für die Verwendung von Browserify ist unten.

Um ein Browser-Paket zu erstellen und es als Preload-Skript zu verwenden, sollten so etwas wie der folgenden verwendet werden:

```sh
  browserify preload/index.js
    -x -x-Elektronen
    --insert-global-vars=__filename,__dirname -o preload.js
```

Das `-x` -Flag sollte mit jedem erforderlichen Modul verwendet werden, das bereits in dem Preload-Bereich verfügbar gemacht wurde, und weist browserify an, die einschließende `require` -Funktion zu verwenden. `--insert-global-vars` stellt sicher, dass `process`, `Buffer` und `setImmediate` auch aus dem einschließenden Bereich entnommen werden (normalerweise browserify injiziert Code für diese).

Derzeit macht die im Vorspannbereich bereitgestellte `require` die folgenden Modulen verfügbar:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `webFrame`
- `ereignisse`
- `timers`
- `url`

Bei Bedarf können weitere Elektronen-APIs in der Sandbox verfügbar gemacht werden.

## Rendern nicht vertrauenswürdiger Inhalte

Das Rendern nicht vertrauenswürdiger Inhalte in Electron ist immer noch etwas Neuland, obwohl einige Apps Erfolg haben (z. B. Beaker Browser). Unser Ziel ist es, so nah wie möglich an Chrome in Bezug auf die Sicherheit von Sandkasteninhalten zu bekommen, aber letztendlich werden wir aufgrund einiger grundlegender Fragen immer im Rückstand sein:

1. Wir verfügen nicht über die dedizierten Ressourcen oder das Know-how, die Chromium auf die Sicherheit seines Produkts anwenden muss. Wir tun unser Bestes, um das zu nutzen, was wir haben , um alles, was wir können, von Chromium zu erben und schnell auf Sicherheitsprobleme zu reagieren, aber Electron kann nicht so sicher sein wie Chrom ohne die Ressourcen, die Chromium widmen kann.
2. Einige Sicherheitsfunktionen in Chrome (z. B. Safe Browsing und Certificate Transparency) erfordern eine zentrale Behörde und dedizierte Server, beide die den Zielen des Electron-Projekts zuwiderlaufen. Daher deaktivieren wir diese Funktionen in Electron, auf Kosten der damit verbundenen Sicherheit, die sie sonst bringen würden.
3. Es gibt nur ein Chromium, während es viele Tausende von Apps gibt, die auf Electron gebaut wurden, die sich alle etwas anders verhalten. Die Berücksichtigung dieser Unterschiede kann einen riesigen Platz für die Möglichkeit ergeben und es schwierig machen, die Sicherheit der Plattform in ungewöhnlichen Anwendungsfällen zu .
4. Wir können Sicherheitsupdates nicht direkt an Benutzer übertragen, daher verlassen wir uns darauf, dass App-Anbieter , die Ihrer App zugrunde liegende Version von Electron zu aktualisieren, damit Sicherheitsupdates Benutzer erreichen.

Hier sind einige Dinge, die Sie beachten sollten, bevor Sie nicht vertrauenswürdige Inhalte rendern:

- Ein Preload-Skript kann versehentlich privilegierte APIs an nicht vertrauenswürdigen Code übertragen, , es sei denn, [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) ist ebenfalls aktiviert.
- Ein Fehler im V8-Modul kann böswilligem Code den Zugriff auf den Renderer Preload-APIs ermöglichen, wodurch der vollständige Zugriff auf das System über das `remote` -Modul ermöglicht wird. Daher wird dringend empfohlen, das `remote` Modul</a>
deaktivieren. Wenn eine Deaktivierung nicht möglich ist, sollten Sie das `remote` Modul [](../tutorial/security.md#16-filter-the-remote-module)filtern.</p></li> 
  
  - Während wir unser Bestes tun, um Chromium-Sicherheitskorrekturen auf ältere -Versionen von Electron zu verankern, geben wir keine Garantie dafür ab, dass jede Korrektur backportiert wird. Ihre beste Chance, sicher zu bleiben, ist auf der neuesten stabilen Version von Electron zu sein.</ul>

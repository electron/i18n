# BrowserWindow

> Erstellung und Steuerung von Browserfenstern.

Prozess: [Main](../glossary.md#main-process)

```javascript
// Im Hauptprozess.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

/ * Load a remote URL
win.loadURL('https://github.com')

/ / Oder laden Sie eine lokale HTML-Datei
win.loadURL('file://${__dirname}/app/index.html')
```

## Rahmenloses Fenster

Um ein transparentes Fenster, ein Fenster ohne chrome oder ein Fenster in einer beliebigen Form zu erzeugen, können sie die [Frameless Window](frameless-window.md) API verwenden.

## Fenster elegant anzeigen

Beim direkten Laden einer Seite im Fenster können Benutzer das Laden der Seite inkrementell sehen, was für eine systemeigene App keine gute Erfahrung darstellt. Damit die Fensteranzeige ohne visuellen Blitz , gibt es zwei Lösungen für unterschiedliche Situationen.

## Verwenden des `ready-to-show` Ereignisses

Das `ready-to-show` Ereignis wird während des Ladens der Seite ausgelöst, falls das Fenster noch nicht angezeigt wurde nachdem der Rendererprozess die Seite erstmalig gerendert hat. Wenn das Fenster nach diesem Ereignis gezeigt wird, gibt es keinen bemerkbaren Seitenaufbau:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ show: false })
win.once('ready-to-show', () => '
  win.show()
')
```

Für gewöhnlich wird dieses Ereignis nach dem `did-finish-load` Ereignis ausgelöst. Bei Seiten mit vielen Remoteressourcen kann es aber passieren dass das Event vor dem `did-finish-load` Ereignis ausgelöst wird.

Bitte beachten Sie, dass die Verwendung dieses Ereignisses impliziert, dass der Renderer als "sichtbar" betrachtet wird und Farbe, obwohl `show` falsch ist.  Dieses Ereignis wird niemals ausgelöst, wenn Sie `paintWhenInitiallyHidden: false`

## Setzen der `backgroundColor`

Bei umfangreichen Apps könnte das `ready-to-show` Ereignis zu spät ausgelöst werden, sodass sich die App langsam anfühlt. In diesem Fall empfiehlt es sich, das Fenster sofort anzuzeigen und die `backgroundColor` auf einen Wert zu setzen der dem Hintergrund ihrer App ähnelt:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
win.loadURL('https://github.com')
```

Beachten Sie dass es sich auch bei Apps die das `ready-to-show` Ereignis verwenden empfiehlt die `backgroundColor` zu setzen, damit sich die App nativer anfühlt.

## Übergeordnete und untergeordnete Fenster

Mithilfe der `parent` Option können Sie untergeordnete Fenster erstellen:

```javascript
const { BrowserWindow } = require('electron')

const top = new BrowserWindow()
const child = new BrowserWindow({ parent: top })
child.show()
top.show()
```

Das `child` Fenster wird stets über dem `top` Fenster angezeigt.

## Modale Fenster

Ein modales Fenster ist ein untergeordnetes Fenster, das das übergeordnete Fenster sperrt. Um ein modales Fenster zu erzeugen müssen sie sowohl die `parent` als auch die `modal` Optionen setzen:

```javascript
const { BrowserWindow } = require('electron')

const child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => '
  child.show()
))
```

## Seiten Sichtbarkeit

Die [Page Visibility API][page-visibility-api] Funktioniert wie folgt:

* Auf allen Plattformen gibt der Sichtbarkeitszustand an ob das Fenster versteckt bzw. minimiert ist oder nicht.
* Zusätzlich wird unter macOS auch angegeben ob das Fenster verdeckt ist. Wenn das Fenster vollständig durch ein anderes Fenster verdeckt ist, ist der Sichtbarkeitszustand `hidden`. Auf den anderen Plattformen ist der Sichtbarkeitszustand nur `hidden`, wenn das Fenster minimiert oder explizit durch `win.hide()` verseckt wurde.
* Wenn ein `BrowserWindow` mit der Option `show: false` erzeugt wurde, ist der anfängliche Sichtbarkeitszustand `visible`, obwohl das Fenster eigentlich versteckt ist.
* Wenn `backgroundThrottling` deaktiviert ist, bleibt der Sichtbarkeitszustand `visible`, selbst wenn das Fenster minimiert, verdeckt oder versteckt wird.

Es wird empfohlen aufwendige Aufgaben zu pausieren wenn der Sichtbarkeitszustand `hidden` ist, um Energie zu sparen.

## Plattformhinweise

* Unter macOS werden modale Fenster als Blätter angezeigt, die an das übergeordnete Fenster angehängt sind.
* Wenn unter macOS übergeordnete Fenster bewegt werden, behalten untergeordnete Fenster ihre Position relativ zum übergeordneten Fenster bei. Unter Windows und Linux bewegen sich die untergeordneten Fenster nicht.
* Unter Linux wird der Typ von modalen Fenstern zu `dialog` geändert.
* Unter Linux wird das verstecken von modalen Fenstern von vielen Desktop Umgebungen nicht unterstützt.

## Klasse: BrowserWindow

> Erstellung und Steuerung von Browserfenstern.

Prozess: [Main](../glossary.md#main-process)

`BrowserWindow` ist ein [EventEmitter][event-emitter].

Es erzeugt ein neues `BrowserWindow` mit nativen Eigenschaften die durch `options` gesetzt wurden.

### `new BrowserWindow([options])`

* `options` Objekt (optional)
  * `width` Ganzzahl (optional) - Die Breite des Fensters in Pixel. Der Standardwert ist `800`.
  * `height` Ganzzahl (optional) - Die Höhe des Fensters in Pixel. Der Standardwert ist `600`.
  * `x` Ganzzahl (optional) - (**erforderlich** wenn y verwendet wird) Der linke Versatz des Fensters vom Bildschirm. Standardmäßig wird das Fenster zentriert.
  * `y` Ganzzahl (optional) - (**erforderlich** wenn x verwendet wird) Der obere Offset des Fensters vom Bildschirm. Standardmäßig wird das Fenster zentriert.
  * `useContentSize` Boolean (optional) - Die `width` und `height` Werte werden als Größe der angezeigten Webseite verwendet. D.h. die tatsächliche Größe des Fensters beinhaltet noch die Rahmengröße und ist deshalb etwas größer. Standard ist `false`.
  * `center` Boolean (optional) - Zeige das Fenster in der Mitte des Bildschirms.
  * `minWidth` Ganzzahl (optional) - Die minimale Breite des Fensters. Der Standardwert ist `0`.
  * `minHeight` Ganzzahl (optional) - Die Mindesthöhe des Fensters. Der Standardwert ist `0`.
  * `maxWidth` Ganzzahl (optional) - Die maximale Breite des Fensters. Der Standardwert ist kein Limit.
  * `maxHeight` Ganzzahl (optional) - Die maximale Höhe des Fensters. Der Standardwert ist kein Limit.
  * `resizable` Boolean (optional) - Gibt an, ob die Geänderte Geändertwerden. Standard ist `true`.
  * `movable` Boolean (optional) - Ob das Fenster beweglich ist. Dies ist nicht unter Linux implementiert. Standard ist `true`.
  * `minimizable` Boolean (optional) - Ob fenster minimierbar ist. Dies ist nicht unter Linux implementiert. Standard ist `true`.
  * `maximizable` Boolean (optional) - Ob das Fenster maximierbar ist. Dies ist nicht unter Linux implementiert. Standard ist `true`.
  * `closable` Boolean (optional) - Ob das Fenster verschließbar ist. Dies ist nicht unter Linux implementiert. Standard ist `true`.
  * `focusable` Boolean (optional) - Gibt an ob das Fenster fokussiert werden kann. Standard ist `true`. Unter Windows impliziert die Option `focusable: false` die Option `skipTaskbar: true`. Unter Linux sorgt `focusable: false` dafür dass das Fenster nicht mehr mit dem Fenstermanager interagiert, d.h. das Fenster bleibt in allen Arbeitsoberflächen ganz oben.
  * `alwaysOnTop` Boolean (optional) - Ob das Fenster immer über anderen Fenstern bleiben soll. Standard ist `false`.
  * `fullscreen` Boolean (optional) - Gibt an ob das Fenster im Vollbildmodus angezeigt werden soll. Wenn diese Option explizit auf `false` gesetzt wird, wird der Button für Vollbildmodus unter macOS versteckt oder deaktiviert. Standard ist `false`.
  * `fullscreenable` Boolean (optional) - Gibt an ob das Fenster in den Vollbildmodus versetzt werden kann. Unter macOS gibt diese Option auch an, ob der Maximieren/Zoom Button das Fenster in den Vollbildmodus versetzt oder maximiert. Standard ist `true`.
  * `simpleFullscreen` Boolean (optional) - Verwenden Sie Pre-Lion Vollbild unter macOS. Standard ist `false`.
  * `skipTaskbar` Boolean (optional) - Gibt an, ob das Fenster in der Taskleiste angezeigt werden soll. Der Standardwert ist `false`.
  * `kiosk` Boolean (optional) - Gibt an, ob sich das Fenster im Kioskmodus befindet. Standard ist `false`.
  * `title` String (optional) - Standardfenstertitel. Der Standardwert ist `"Electron"`. Wenn das HTML-Tag `<title>` in der HTML-Datei definiert ist, die von `loadURL()`geladen wird, wird diese Eigenschaft ignoriert.
  * `icon` ([NativeImage](native-image.md) | String) (optional) - Das Fenstericon. Es empfiehlt sich unter Windows ein `ICO` Icon zu verwenden um die besten visuellen Effekte zu erreichen. Das Icon der Executable wird verwendet wenn dieser Wert nicht definiert wird.
  * `show` Boolean (optional) - Gibt an, ob das Fenster beim Erstellen angezeigt werden soll. Standard ist `true`.
  * `paintWhenInitiallyHidden` Boolean (optional) - Gibt an, ob der Renderer aktiv sein soll, wenn `show` `false` und gerade erstellt wurde.  Damit `document.visibilityState` beim ersten Laden mit `show: false` korrekt funktioniert, sollten Sie dies auf `false`setzen.  Wenn Sie diese Einstellung auf `false` festlegen, wird das `ready-to-show` -Ereignis nicht ausgelöst.  Standard ist `true`.
  * `frame` Boolean (optional) - Geben Sie `false` an, um ein [Frameless Window](frameless-window.md)zu erstellen. Standard ist `true`.
  * `parent` BrowserWindow (optional) - Geben Sie das übergeordnete Fenster an. Der Standardwert ist `null`.
  * `modal` Boolean (optional) - Ob es sich um ein modales Fenster handelt. Dies funktioniert nur, wenn es sich bei dem Fenster um ein untergeordnetes Fenster handelt. Standard ist `false`.
  * `acceptFirstMouse` Boolean (optional) - Gibt an, ob die Webansicht ein einzelnes -Maus-Down-Ereignis akzeptiert, das gleichzeitig das Fenster aktiviert. Der Standardwert ist `false`.
  * `disableAutoHideCursor` Boolean (optional) - Ob der Cursor bei der Eingabe ausgeblendet werden soll. Standard ist `false`.
  * `autoHideMenuBar` Boolean (optional) - Blendet die Menüleiste automatisch aus, es sei denn, die `Alt` Taste wird gedrückt. Standard ist `false`.
  * `enableLargerThanScreen` Boolean (optional) - Aktivieren Sie die Größe des Fensters, die größer als der Bildschirm ist. Nur relevant für macOS, da andere Betriebssysteme standardmäßig fenster größer als Bildschirm ermöglichen. Standard ist `false`.
  * `backgroundColor` String (optional) - Die Hintergrundfarbe des Fensters als hexadezimaler Wert, wie `#66CD00` oder `#FFF` oder `#80FFFFFF` (alpha im #AARRGGBB Format wird unterstützt, wenn `transparent` auf `true`festgelegt ist). Der Standardwert ist `#FFF` (weiß).
  * `hasShadow` Boolean (optional) - Ob fenster einen Schatten haben soll. Standard ist `true`.
  * `opacity` Zahl (optional) - Legen Sie die anfängliche Deckkraft des Fensters zwischen 0,0 (vollständig transparent) und 1,0 (vollständig undurchsichtig) fest. Dies wird nur unter Windows und macOS implementiert.
  * `darkTheme` Boolean (optional) - Kräfte, die dunkles Design für das Fenster verwenden, funktioniert nur auf einigen GTK+3-Desktop-Umgebungen. Standard ist `false`.
  * `transparent` boolesch (optional) - Macht das Fenster [transparent](frameless-window.md#transparent-window). Standard ist `false`. Unter Windows funktioniert es nur, wenn das Fenster rahmenlos ist.
  * `type` String (optional) - Der Typ des Fensters, Standard ist normales Fenster. Mehr darüber finden Sie weiter unten.
  * `visualEffectState` String (optional) – Geben Sie an, wie die Darstellung des Materials den Fensteraktivitätsstatus unter macOS widerspiegeln soll. Muss mit der `vibrancy` -Eigenschaft verwendet werden. Mögliche Werte sind:
    * `followWindow` - Der Hintergrund sollte automatisch aktiv angezeigt werden, wenn das Fenster aktiv ist, und inaktiv, wenn dies nicht der Fall ist. Dies ist die Standardeinstellung.
    * `active` - Der Hintergrund sollte immer aktiv erscheinen.
    * `inactive` - Der Hintergrund sollte immer inaktiv erscheinen.
  * `titleBarStyle` String (optional) - Der Stil der Fenstertitelleiste. Der Standardwert ist `default`. Mögliche Werte sind:
    * `default` - Resultiert in der opaken, grauen Standardfenstertitelleiste von Mac.
    * `hidden` - Resultiert in einer versteckten Titelleiste und einem Fenster mit voller Inhaltsgröße. Das Fenster hat noch immer die standardmäßigen Steuerelemente ("Ampelleuchten") in der oberen linken Ecke.
    * `hiddenInset` - Resultiert in einer versteckten Titelleiste mit einem alternativem Aussehen, bei dem die Ampelleuchten Buttons vom Fensterrand etwas weiter nach innen gerückt wurden.
    * `customButtonsOnHover` boolesch (optional) - Zeichnen Sie benutzerdefinierte Nah-, und minimieren Sie Schaltflächen in macOS-Rahmenfenstern. Diese Schaltflächen werden nicht angezeigt, es sei denn, sie schweben oben links im Fenster. Diese benutzerdefinierten Schaltflächen verhindern Probleme mit Mausereignissen, die mit den Symbolleistenschaltflächen für das Standardfenster auftreten. **Beachte:** Diese Option ist experimentell.
  * `trafficLightPosition` [Point](structures/point.md) (optional) - Legen Sie eine benutzerdefinierte Position für die Ampeltasten fest. Kann nur verwendet werden, wenn `titleBarStyle` auf `hidden`
  * `fullscreenWindowTitle` Boolean (optional) - Zeigt den Titel in der Titelleiste im Vollbildmodus unter macOS für alle `titleBarStyle` Optionen an. Standard ist `false`.
  * `thickFrame` Boolean (optional) - Verwenden Sie `WS_THICKFRAME` Stil für rahmenlose Fenster auf Windows, die Standardfensterrahmen hinzufügt. Fensterschatten und Fensteranimationen werden entfernt wenn dieser Wert `false` ist. Standard ist `true`.
  * `vibrancy` String (optional) - Fügen Sie dem Fenster eine Art Vibranzeffekt hinzu, und das nur auf macOS. Kann `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud` `fullscreen-ui`,  , `tooltip`, `content`, `under-window`oder `under-page`sein.  Bitte beachten Sie, dass die Verwendung von `frame: false` in Kombination mit einem Vibranzwert erfordert, dass Sie auch eine nicht standardmäßige `titleBarStyle` verwenden. Beachten Sie auch, dass `appearance-based`, `light`, `dark`, `medium-light`und `ultra-dark` veraltet sind und in einer kommenden Version von macOS entfernt werden.
  * `zoomToPageWidth` Boolean (optional) - Steuert das Verhalten unter macOS, wenn Option auf die grüne Stopplight-Schaltfläche auf der Symbolleiste klicken oder indem Sie auf das Menüelement Fenster > Zoom klicken. Wenn `true`, wird das Fenster beim Zoomen auf die bevorzugte Breite der Webseite vergrößert, `false` veranlassen, auf die Breite des Bildschirms zu zoomen. Dies wirkt sich auch auf das Verhalten beim direkten Aufruf `maximize()` aus. Standard ist `false`.
  * `tabbingIdentifier` String (optional) - Reitergruppenname, erlaubt das öffnen des Fensters als nativen Reiter unter macOS 10.12+. Fenster mit dem selben Reitergruppennamen werden gruppiert. Dadurch wird auch eine systemeigene neue Registerkarte zur Registerkartenleiste Ihres Fensters hinzugefügt, und Ihr `app` und Fenster kann das `new-window-for-tab` -Ereignis empfangen.
  * `webPreferences` -Objekt (optional) - Einstellungen der Funktionen der Webseite.
    * `devTools` Boolean (optional) - Gibt an ob die Entwicklerwerkzeuge aktiviert sind. Falls dies auf `false` gesetzt ist, kann `BrowserWindow.webContents.openDevTools()` nicht verwendet werden um die Entwicklerwerkzeuge zu öffnen. Standard ist `true`.
    * `nodeIntegration` Boolean (optional) - Gibt an, ob die Knotenintegration aktiviert ist. Standard ist `false`.
    * `nodeIntegrationsInWorker` Boolean (optional) - Gibt an ob die Node Integration in Web Workern aktiviert ist. Standard ist `false`. Mehr dazu kann in [Multithreading](../tutorial/multithreading.md) gefunden werden.
    * `nodeIntegrationInSubFrames` Boolean (optional) - Experimentelle Option für , die die Unterstützung von Node.js in Subframes wie iframes und untergeordneten Fenstern aktivieren. Alle Ihre Vorspannungen werden für jedem iframe geladen, können Sie `process.isMainFrame` verwenden, um zu bestimmen, ob Sie im Hauptframe sind oder nicht.
    * `preload` String (optional) - Gibt ein Skript an das vor allen anderen Skripten geladen wird bevor andere Skripte der Seite ausgeführt werden. Dieses Skript hat immer Zugriff auf die Node APIs, unabhängig davon ob die Node Integration aktiviert ist oder nicht. Der Wert sollte der absolute Pfad zum Skript sein. Wenn die Node Integration ausgeschaltet ist, kann das Preload Skript globale Node Symbole in den Globalen Scope zurückbringen. Siehe [dieses Beispiel](process.md#event-loaded).
    * `sandbox` Boolean (optional) - Wenn gesetzt, wird der Renderer des Fensters in einer Sandbox ausgeführt, wodurch es kompatibel mit der Chromium Sandbox wird und die Node.js Integration deaktiviert wird. Dies ist nicht das gleiche wie `nodeIntegration`, da die APIs die dem Preload Skript zur Verfügung stehen stärker limitiert sind. Lesen sie [hier](sandbox-option.md) mehr über diese Option.
    * `enableRemoteModule` Boolean (optional) - Gibt an, ob das [`remote`](remote.md) -Modul aktiviert werden soll. Standard ist `false`.
    * `session` [Session](session.md#class-session) (optional) – Legt die Sitzung fest, die von der seite verwendet wird. Anstatt das Session-Objekt direkt zu übergeben, können Sie auch stattdessen die Option `partition` verwenden, die eine Partitionszeichenfolge akzeptiert. Wenn sowohl `session` als auch `partition` angegeben werden, wird `session` bevorzugt. Standard ist die Standardsitzung.
    * `partition` String (optional) - Legt die Sitzung fest, die von der Seite gemäß der Partitionszeichenfolge der -Sitzung verwendet wird. Wenn `partition` mit `persist:`beginnt, verwendet die eine persistente Sitzung, die für alle Seiten in der App mit dem gleichen `partition`verfügbar ist. Wenn kein `persist:` -Präfix vorhanden ist, verwendet die Seite eine In-Memory-Sitzung. Durch Zuweisen derselben `partition`können mehrere Seiten derselben Sitzung gemeinsam nutzen. Standard ist die Standardsitzung.
    * `affinity` String (optional) - Wenn angegeben, werden Webseiten mit demselben `affinity` im gleichen Rendererprozess ausgeführt. Beachten Sie, dass aufgrund der Wiederverwendung Renderer-Prozesses bestimmte `webPreferences` Optionen auch dann zwischen den Webseiten gemeinsam genutzt werden, wenn Sie für sie unterschiedliche Werte angegeben haben, einschließlich, aber nicht beschränkt auf `preload`, `sandbox` und `nodeIntegration`. Es wird also vorgeschlagen, genau die gleiche `webPreferences` für Webseiten mit dem gleichen `affinity`zu verwenden. _veraltete_
    * `zoomFactor` Zahl (optional) - Der Standardzoomfaktor der Seite stellt `3.0` `300%`dar. Der Standardwert ist `1.0`.
    * `javascript` Boolean (optional) - Aktiviert JavaScript-Unterstützung. Standard ist `true`.
    * `webSecurity` Boolean (optional) - Wenn `false`, deaktiviert es die Richtlinie mit demselben Ursprung (in der Regel mithilfe von Testwebsites von Personen) und setzt `allowRunningInsecureContent` auf `true` , wenn diese Optionen nicht vom Benutzer festgelegt wurden. Standard ist `true`.
    * `allowRunningInsecureContent` Boolean (optional) - Erlauben Sie einer https-Seite, JavaScript, CSS oder Plugins von http-URLs auszuführen. Standard ist `false`.
    * `images` Boolean (optional) - Aktiviert die Bildunterstützung. Standard ist `true`.
    * `textAreasAreResizable` Boolean (optional) - TextArea-Elemente in der Geänderten Datei ändern. Standard ist `true`.
    * `webgl` Boolean (optional) - Aktiviert WebGL-Unterstützung. Standard ist `true`.
    * `plugins` Boolean (optional) - Gibt an, ob Plugins aktiviert werden sollen. Standard ist `false`.
    * `experimentalFeatures` Boolean (optional) - Aktiviert die experimentellen Funktionen von Chromium. Standard ist `false`.
    * `scrollBounce` Boolean (optional) - Aktiviert scroll bounce (Gummibanding) Effekt auf macOS. Standard ist `false`.
    * `enableBlinkFeatures` String (optional) - Eine Liste von Feature-Zeichenfolgen, die durch `,`getrennt sind, wie `CSSVariables,KeyboardEventKey` zu aktivieren. Die vollständige Liste der unterstützten Feature- -Zeichenfolgen finden Sie in der Datei [RuntimeEnabledFeatures.json5][runtime-enabled-features] .
    * `disableBlinkFeatures` String (optional) - Eine Liste von Feature-Zeichenfolgen, die durch `,`getrennt sind, wie `CSSVariables,KeyboardEventKey` zu deaktivieren. Die vollständige Liste der unterstützten Feature-Zeichenfolgen finden Sie in der Datei [RuntimeEnabledFeatures.json5][runtime-enabled-features] .
    * `defaultFontFamily` -Objekt (optional) - Legt die Standardschriftart für die Schriftfamilie fest.
      * `standard` String (optional) - Standardwerte für `Times New Roman`.
      * `serif` String (optional) - Standardwerte für `Times New Roman`.
      * `sansSerif` String (optional) - Standardwerte für `Arial`.
      * `monospace` String (optional) - Standardwerte für `Courier New`.
      * `cursive` String (optional) - Standardwerte für `Script`.
      * `fantasy` String (optional) - Standardwerte für `Impact`.
    * `defaultFontSize` Ganzzahl (optional) - Standardwerte für `16`.
    * `defaultMonospaceFontSize` Ganzzahl (optional) - Standardwerte für `13`.
    * `minimumFontSize` Ganzzahl (optional) - Standardwerte für `0`.
    * `defaultEncoding` String (optional) - Standardwerte für `ISO-8859-1`.
    * `backgroundThrottling` Boolean (optional) - Ob Animationen und Timer drosseln sollen, wenn die Seite zum Hintergrund wird. Dies wirkt sich auch auf die [Seitensichtbarkeits-API](#page-visibility)aus. Standardmäßig `true`.
    * `offscreen` Boolean (optional) - Gibt an, ob das Offscreen-Rendering für den Browser -Fenster aktiviert werden soll. Standardmäßig `false`. Weitere Informationen finden Sie im [Offscreen-Rendering-Tutorial](../tutorial/offscreen-rendering.md) .
    * `contextIsolation` Boolean (optional) - Gibt an, ob Electron-APIs ausgeführt und das angegebene `preload` Skript in einem separaten JavaScript-Kontext werden soll. Standardmäßig `true`. Der Kontext, in dem das `preload` -Skript ausgeführt wird, hat nur Zugriff auf seine eigenen dedizierten `document` - und `window` -Globals sowie eigenen JavaScript-Integrierten (`Array`, `Object`, `JSON`usw.), , die alle für den geladenen Inhalt unsichtbar sind. Die Electron-API nur im `preload` -Skript und nicht auf der geladenen Seite verfügbar sein. Diese Option beim Laden potenziell nicht vertrauenswürdiger Remoteinhalte verwendet werden sollten, um sicherzustellen, der geladene Inhalt nicht mit dem `preload` -Skript und den verwendeten Electron-APIs manipuliert werden kann.  Diese Option verwendet die gleiche Technik, die von [Chrome Content Scripts][chrome-content-scripts]verwendet wird.  Sie können auf diesen Kontext in den Entwicklungstools zugreifen, indem Sie den Eintrag "Elektronenisolierter Kontext" Eintrag im Kombinationsfeld oben auf der Registerkarte Konsole auswählen.
    * `worldSafeExecuteJavaScript` Boolean (optional) - Wenn true, werden Werte, die von `webFrame.executeJavaScript` zurückgegeben werden, desinfiziert, um sicherzustellen, dass JS-Werte bei Verwendung von `contextIsolation`nicht sicher zwischen Welten kreuzen können. Standardmäßig `true`. _veraltete_
    * `nativeWindowOpen` Boolean (optional) - Gibt an, ob native `window.open()`verwendet werden soll. Standardmäßig `false`. In untergeordneten Fenstern ist die Integration immer deaktiviert, es sei denn, `nodeIntegrationInSubFrames` ist wahr. **Hinweis:** Diese Option ist derzeit experimentell.
    * `webviewTag` Boolean (optional) - Gibt an, ob das [`<webview>` -Tag](webview-tag.md)aktiviert werden soll. Standardmäßig `false`. **Hinweis:** Das für die `<webview>` konfigurierte `preload` -Skript bei der Ausführung aktiviert, sodass Sie sicherstellen sollten, dass Remote-/nicht vertrauenswürdige Inhalte nicht in der Lage sind, ein `<webview>` -Tag mit einem möglicherweise schädlichen `preload` -Skript zu erstellen. Sie können das `will-attach-webview` -Ereignis auf [webContents-](web-contents.md) verwenden, um das `preload` Skript zu entfernen und die ursprünglichen Einstellungen des `<webview>`zu überprüfen oder zu ändern.
    * `additionalArguments` String[] (optional) - Eine Liste von Zeichenfolgen, die im Rendererprozess dieser App `process.argv` angehängt werden.  Nützlich für die Weitergabe kleiner Datenbits an Skripts für Rendererprozesse.
    * `safeDialogs` Boolean (optional) - Gibt an, ob der Browserstil aufeinander folgenden Dialogschutz aktiviert werden soll. Standard ist `false`.
    * `safeDialogsMessage` String (optional) - Die Meldung, die angezeigt werden soll, wenn aufeinander folgenden Dialogschutz ausgelöst wird. Wenn nicht die Standard- Nachricht verwendet werden, beachten Sie, dass sich die Standardnachricht derzeit in Englisch befindet und nicht lokalisiert ist.
    * `disableDialogs` Boolean (optional) - Ob Dialoge deaktiviert vollständig. Überschreibt `safeDialogs`. Standard ist `false`.
    * `navigateOnDragDrop` Boolean (optional) - Ob das Ziehen und Ablegen einer Datei oder eines Links auf die Seite eine Navigation verursacht. Standard ist `false`.
    * `autoplayPolicy` String (optional) - Die Richtlinie für die automatische Wiedergabe, die auf Inhalt im Fenster angewendet werden soll, kann `no-user-gesture-required`, `user-gesture-required`, `document-user-activation-required`sein. Standardmäßig `no-user-gesture-required`.
    * `disableHtmlFullscreenWindowResize` Boolean (optional) - Ob verhindern soll, dass die Größe des Fensters beim Eingeben von HTML-Vollbild nmöglich wird. Standard ist `false`.
    * `accessibleTitle` String (optional) - Eine alternative Titelzeichenfolge, die nur für Eingabehilfen wie Bildschirmleseprogramme bereitgestellt wird. Diese Zeichenfolge ist nicht direkt für Benutzer sichtbar .
    * `spellcheck` Boolean (optional) - Gibt an, ob die integrierte Rechtschreibprüfung aktiviert werden soll. Standard ist `true`.
    * `enableWebSQL` Boolean (optional) - Gibt an, ob die [WebSQL api](https://www.w3.org/TR/webdatabase/)aktiviert werden soll. Standard ist `true`.
    * `v8CacheOptions` String (optional) - Erzwingt die v8-Code-Caching-Richtlinie, die von blink verwendet . Akzeptierte Werte sind
      * `none` - Deaktiviert die Codezwischenspeicherung
      * `code` - Heuristischecodezwischenspeicherung
      * `bypassHeatCheck` - Umgehungscode-Caching-Heuristik, aber mit verzögerter Kompilierung
      * `bypassHeatCheckAndEagerCompile` - Das Gleiche wie oben außer Kompilation ist eifrig. Die Standardrichtlinie ist `code`.
    * `enablePreferredSizeMode` Boolean (optional) - Gibt an, ob bevorzugten Größenmodus aktiviert werden soll. Die bevorzugte Größe ist die Mindestgröße, die erforderlich ist, um das Layout des Dokuments enthalten zu können– ohne dass ein Bildlauf erforderlich ist. Wenn Sie dies zu aktivieren, wird das `preferred-size-changed` Ereignis auf dem `WebContents` ausgegeben, wenn sich die bevorzugte Größe ändert. Standard ist `false`.

Bei der Einstellung der minimalen oder maximalen Fenstergröße mit `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`schränkt es nur die Benutzer ein. Es wird Sie nicht daran hindern, eine Größe zu übergeben, die keine Größenbeschränkungen an `setBounds`/`setSize` oder an den Konstruktor von `BrowserWindow`folgt.

Die möglichen Werte und Verhaltensweisen der `type` Option sind plattformabhängig. Mögliche Werte sind:

* Unter Linux sind mögliche Typen `desktop`, `dock`, `toolbar`, `splash`, `notification`.
* Unter macOS sind mögliche Typen `desktop`, `textured`.
  * Der Typ `textured` fügt das Erscheinungsbild des Metallgradienten (`NSTexturedBackgroundWindowMask`) hinzu.
  * Der `desktop` -Typ platziert das Fenster auf der Desktop-Hintergrundfensterebene (`kCGDesktopWindowLevel - 1`). Beachten Sie, dass das Desktopfenster keine Fokus-, Tastatur- oder Mausereignisse empfängt, Sie können jedoch `globalShortcut` verwenden, um Eingaben sparsam zu empfangen.
* Unter Windows ist der mögliche Typ `toolbar`.

### Instanz Events

Objekte, die mit `new BrowserWindow` erstellt wurden, senden die folgenden Ereignisse aus:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### Event: 'page-title-updated'

Rückgabewert:

* `event` Event
* `title` String
* `explicitSet` Boolean

Wenn das Dokument den Titel geändert hat, wird durch aufrufendes `event.preventDefault()` verhindert, dass sich der Titel des systemeigenen Fensters ändert. `explicitSet` ist falsch, wenn der Titel aus der Datei-URL synthetisiert wird.

#### Event: 'close'

Rückgabewert:

* `event` Event

Emittiert, wenn das Fenster geschlossen wird. Sie wird vor dem `beforeunload` und `unload` Ereignis des DOMs abgegeben. Wenn `event.preventDefault()` wird der Abschluss abgebrochen.

Normalerweise sollten Sie den `beforeunload` -Handler verwenden, um zu entscheiden, ob das Fenster geschlossen werden soll, das auch aufgerufen wird, wenn das Fenster neu geladen wird. In Electron würde die Rückgabe eines anderen Wertes als `undefined` den schließen. Ein Beispiel:

```javascript
window.onbeforeunload = (e) =>
  console.log('I want not want to be closed')

  / Im Gegensatz zu normalen Browsern, in denen ein Meldungsfeld an Benutzer aufgefordert wird, wird die Rückgabe
  / ein nicht-void-Wert den Schließen stillschweigend abbrechen.
  Es wird empfohlen, die Dialog-API zu verwenden, damit der Benutzer das Schließen der
  /-Anwendung bestätigen kann.
  e.returnValue = false / entspricht 'return false' entspricht aber nicht
.
```

_**Hinweis**: Es gibt einen feinen Unterschied zwischen den Verhaltensweisen von `window.onbeforeunload = handler` und `window.addEventListener('beforeunload', handler)`. Es wird empfohlen, die `event.returnValue` immer explizit festzulegen, anstatt nur einen Wert zurückzugeben, da erstere in Electron konsistenter arbeitet._

#### Event: 'closed'

Ausgegeben, wenn das Fenster geschlossen wird. Nachdem Sie dieses Ereignis erhalten haben, sollten Sie den Verweis auf das Fenster entfernen und nicht mehr verwenden.

#### Event: 'session-end' _Windows_

Ausgegeben wenn die Fenstersitzung aufgrund von erzwungenem Abschalten, einem Neustart oder durch Abmelden enden wird.

#### Event: 'unresponsive'

Ausgegeben wenn die Webseite nicht mehr antwortet.

#### Event: 'responsive'

Ausgegeben wenn eine Webseite, die zuvor nicht mehr antwortete, wieder antwortet.

#### Event: 'blur'

Ausgegeben wenn das Fenster den Fokus verliert.

#### Event: 'focus'

Ausgegeben wenn das Fenster den Fokus erhält.

#### Event: 'show'

Ausgegeben wenn das Fenster gezeigt wird.

#### Event: 'hide'

Ausgegeben wenn das Fenster versteckt wird.

#### Event: 'ready-to-show'

Gesendet, wenn die Webseite gerendert wurde (während nicht angezeigt) und das Fenster ohne einem visuellen Blitz angezeigt werden kann.

Bitte beachten Sie, dass die Verwendung dieses Ereignisses impliziert, dass der Renderer als "sichtbar" betrachtet wird und Farbe, obwohl `show` falsch ist.  Dieses Ereignis wird niemals ausgelöst, wenn Sie `paintWhenInitiallyHidden: false`

#### Event: 'maximize'

Emittiert, wenn das Fenster maximiert wird.

#### Event: 'unmaximize'

Wird angezeigt, wenn das Fenster aus einem maximierten Zustand beendet wird.

#### Event: 'minimize'

Emittiert, wenn das Fenster minimiert wird.

#### Event: 'restore'

Wird angezeigt, wenn das Fenster aus einem minimierten Zustand wiederhergestellt wird.

#### Event: 'will-resize' _macOS_ _Windows_

Rückgabewert:

* `event` Event
* `newBounds` [Rechteck](structures/rectangle.md) - Größe des Fensters wird geändert.

Emittiert, bevor die Größe des Fensters geändert wird. Wenn `event.preventDefault()` wird verhindert, dass die Größe des Fensters geändert wird.

Beachten Sie, dass dies nur angezeigt wird, wenn die Größe des Fensters manuell geändert wird. Wenn Sie die Größe des Fensters mit `setBounds`/`setSize` ändern, wird dieses Ereignis nicht angezeigt.

#### Event: 'resize'

Emittiert, nachdem die Größe des Fensters geändert wurde.

#### Ereignis: 'verkleinert' _macOS_ _Windows_

Einmal gesendet, wenn die Größe des Fensters geändert wurde.

Dies wird in der Regel angezeigt, wenn die Größe des Fensters manuell geändert wurde. Unter macOS wird das Ändern der Größe des Fensters mit `setBounds`/`setSize` und das Festlegen des `animate` -Parameters auf `true` dieses Ereignis ebenfalls ausgeben, sobald die Größenänderung abgeschlossen ist.

#### Ereignis: 'will-move' _macOS_ _Windows_

Rückgabewert:

* `event` Event
* `newBounds` [Rechteck](structures/rectangle.md) - Position, an die das Fenster verschoben wird.

Emittiert, bevor das Fenster verschoben wird. Unter Windows verhindert der Aufruf `event.preventDefault()` , dass das Fenster verschoben wird.

Beachten Sie, dass dies nur angezeigt wird, wenn die Größe des Fensters manuell geändert wird. Wenn Sie die Größe des Fensters mit `setBounds`/`setSize` ändern, wird dieses Ereignis nicht angezeigt.

#### Event: 'move'

Wird gesendet, wenn das Fenster an eine neue Position verschoben wird.

#### Ereignis: _macOS_ _Windows_'bewegt'

Einmal gesendet, wenn das Fenster an eine neue Position verschoben wird.

__Hinweis__: Unter macOS ist dieses Ereignis ein Alias von `move`.

#### Event: 'enter-full-screen'

Emittiert, wenn das Fenster in einen Vollbildzustand wechselt.

#### Event: 'leave-full-screen'

Wird angezeigt, wenn das Fenster einen Vollbildzustand verlässt.

#### Event: 'enter-html-full-screen'

Wird gesendet, wenn das Fenster in einen Vollbildstatus wechselt, der durch die HTML-API ausgelöst wird.

#### Event: 'leave-html-full-screen'

Wird angezeigt, wenn das Fenster einen Vollbildstatus verlässt, der durch die HTML-API ausgelöst wird.

#### Veranstaltung: 'Always-on-top-changed'

Rückgabewert:

* `event` Event
* `isAlwaysOnTop` Boolean

Ausgegeben, wenn das Fenster festgelegt oder nicht gesetzt wird, um immer über anderen Fenstern angezeigt zu werden.

#### Ereignis: 'app-command' _Windows_ _Linux_

Rückgabewert:

* `event` Event
* `command` String

Wird angezeigt, wenn ein [App-Befehl](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) aufgerufen wird. Diese beziehen sich in der Regel auf Tastatur-Medientasten oder Browser- Befehle, sowie die "Zurück"-Taste in einigen Mäusen unter Windows integriert.

Befehle werden klein sein, Unterstriche werden durch Bindestriche ersetzt, und das präfix `APPCOMMAND_` wird entfernt. E.g. `APPCOMMAND_BROWSER_BACKWARD` wird als `browser-backward`emittiert.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.on('app-command', (e, cmd) => '
  * Navigieren Sie das Fenster zurück , wenn der Benutzer die Maus zurück tastet
  wenn (cmd === 'browser-backward' && win.webContents.canGoBack()

  
    )
```

Die folgenden App-Befehle werden unter Linux explizit unterstützt:

* `Browser-Rückwärts`
* `Browser-Vorwärts`

#### Event: 'scroll-touch-begin' _macOS_

Emittiert, wenn die Laufradereignisphase begonnen hat.

#### Event: 'scroll-touch-end' _macOS_

Emittiert, wenn die Laufradereignisphase beendet wurde.

#### Event: 'scroll-touch-edge' _macOS_

Emittiert, wenn Scrollrad-Ereignisphase beim Erreichen der Kante des Elements abgelegt.

#### Event: 'swipe' _macOS_

Rückgabewert:

* `event` Event
* `direction` String

Emittiert auf 3-Finger-Wisch. Mögliche Richtungen sind `up`, `right`, `down`, `left`.

Die diesem Ereignis zugrunde liegende Methode ist so aufgebaut, dass ältere Trackpad-Wischvorgänge im macOS-Stil verarbeitet werden, , bei denen sich der Inhalt auf dem Bildschirm nicht mit dem Wischen bewegt. Die meisten macOS Trackpads sind nicht mehr so konfiguriert, dass diese Art von Wischen erlaubt ist, so dass die "Swipe between pages"-Voreinstellung in `System Preferences > Trackpad > More Gestures` auf "Wischen mit zwei oder drei Fingern" eingestellt werden muss.

#### Ereignis: 'rotate-gesture' _macOS_

Rückgabewert:

* `event` Event
* `rotation` Float

Emittiert auf Trackpad-Rotationsgeste. Kontinuierlich emittiert, bis die Rotationsgeste beendet ist. Der `rotation` Wert für jede Emission ist der Winkel in Grad gedreht seit der letzten Emission. Das letzte emittierte Ereignis bei einer Rotationsgeste hat immer Wert `0`. Die Drehwerte im Gegen-Uhr-Richtung sind positiv, während sie im Uhrzeigersinn negativ sind.

#### Event: 'sheet-begin' _macOS_

Emittiert, wenn das Fenster ein Blatt öffnet.

#### Event: 'sheet-end' _macOS_

Emittiert, wenn das Fenster ein Blatt geschlossen hat.

#### Event: 'new-window-for-tab' _macOS_

Emittiert, wenn auf die neue Registerkarte mit systemeigener Registerkarte geklickt wird.

#### Ereignis: 'system-context-menu' _Windows_

Rückgabewert:

* `event` Event
* `point` [Point](structures/point.md) - Der Bildschirm koordiniert das Kontextmenü wurde bei

Wenn das Systemkontextmenü im Fenster ausgelöst wird, wird dies wird normalerweise nur ausgelöst, wenn der Benutzer mit der rechten Maustaste auf den Nicht-Client-Bereich Des Fensters klickt.  Dies ist die Fenstertitelleiste oder ein bereich, den Sie als `-webkit-app-region: drag` in einem rahmenlosen Fenster deklariert haben.

Wenn `event.preventDefault()` wird verhindert, dass das Menü angezeigt wird.

### Static Methods

Die `BrowserWindow` Klasse hat folgende statische Methoden:

#### `BrowserWindow.getAllWindows()`

Gibt `BrowserWindow[]` zurück - Ein Array aller geöffneten Browser Fenster.

#### `BrowserWindow.getFocusedWindow()`

Gibt `BrowserWindow | null` zurück : Das Fenster, das in dieser Anwendung fokussiert ist, gibt andernfalls `null`zurück.

#### `BrowserWindow.fromWebContents(webContents)`

* `webContents` [WebContents](web-contents.md)

Gibt `BrowserWindow | null` zurück : Das Fenster, das das angegebene `webContents` oder `null` besitzt, wenn der Inhalt nicht im Besitz eines Fensters ist.

#### `BrowserWindow.fromBrowserView(browserView)`

* `browserView` [BrowserView](browser-view.md)

Gibt `BrowserWindow | null` zurück - Das Fenster, das das angegebene `browserView`besitzt. Wenn die angegebene Ansicht keinem Fenster zugeordnet ist, wird `null`zurückgegeben.

#### `BrowserWindow.fromId(id)`

* `id` Integer

Gibt `BrowserWindow | null` zurück - Das Fenster mit dem angegebenen `id`.

#### `BrowserWindow.addExtension(path)` _veraltete_

* `path` String

Fügt die Chrome-Erweiterung an `path`hinzu und gibt den Namen der Erweiterung zurück.

Die Methode wird auch nicht zurückgegeben, wenn das Manifest der Erweiterung fehlt oder unvollständig ist.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.loadExtension(path)`](session.md#sesloadextensionpath-options).

#### `BrowserWindow.removeExtension(name)` _veraltete_

* `name` String

Entfernen Sie eine Chrome-Erweiterung nach Namen.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.removeExtension(extension_id)`](session.md#sesremoveextensionextensionid).

#### `BrowserWindow.getExtensions()` _veraltete_

Gibt `Record<String, ExtensionInfo>` zurück : Die Schlüssel sind die Erweiterungsnamen, und jeder Wert ist ein Objekt, das `name` - und `version` Eigenschaften enthält.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.getAllExtensions()`](session.md#sesgetallextensions).

#### `BrowserWindow.addDevToolsExtension(path)` _veraltete_

* `path` String

Fügt die DevTools-Erweiterung an `path`hinzu und gibt den Namen der Erweiterung zurück.

Die Erweiterung wird gespeichert, so dass Sie diese API nur einmal aufrufen müssen, diese API ist nicht für die Programmierung. Wenn Sie versuchen, eine Erweiterung hinzuzufügen, die bereits geladen , wird diese Methode nicht zurückgegeben und stattdessen eine Warnung an der Konsole protokolliert.

Die Methode wird auch nicht zurückgegeben, wenn das Manifest der Erweiterung fehlt oder unvollständig ist.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.loadExtension(path)`](session.md#sesloadextensionpath-options).

#### `BrowserWindow.removeDevToolsExtension(name)` _veraltete_

* `name` String

Entfernen Sie eine DevTools-Erweiterung nach Namen.

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.removeExtension(extension_id)`](session.md#sesremoveextensionextensionid).

#### `BrowserWindow.getDevToolsExtensions()` _veraltete_

Gibt `Record<string, ExtensionInfo>` zurück : Die Schlüssel sind die Erweiterungsnamen, und jeder Wert ist ein Objekt, das `name` - und `version` Eigenschaften enthält.

Um zu überprüfen, ob eine DevTools-Erweiterung installiert ist, können Sie Folgendes ausführen:

```javascript
const { BrowserWindow } = require('electron')

const installed = 'devtron' in BrowserWindow.getDevToolsExtensions()
console.log(installed)
```

**Hinweis:** Diese API kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` -Moduls ausgesendet wird.

**Hinweis:** Diese Methode ist veraltet. Verwenden Sie stattdessen [`ses.getAllExtensions()`](session.md#sesgetallextensions).

### Instanz Eigenschaften

Objekte, die mit `new BrowserWindow` erstellt wurden, haben die folgenden Eigenschaften:

```javascript
const { BrowserWindow } = require('electron')
/ In diesem Beispiel ist 'win' unsere Instanz
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

#### `win.webContents` _Readonly_

Ein `WebContents` Objekt, das dieses Fenster besitzt. Alle webseitigen Ereignisse und Operationen werden über diese durchgeführt.

In der [`webContents` -Dokumentation finden Sie](web-contents.md) Methoden und Ereignisse.

#### `win.id` _Readonly_

Eine `Integer` Eigenschaft, die die eindeutige ID des Fensters darstellt. Jede ID ist unter allen `BrowserWindow` Instanzen der gesamten Electron-Anwendung eindeutig.

#### `win.autoHideMenuBar`

Eine `Boolean` Eigenschaft, die bestimmt, ob sich die Fenstermenüleiste automatisch ausblenden soll. Einmal gesetzt, wird die Menüleiste nur angezeigt, wenn Benutzer die Taste einer `Alt` drücken.

Wenn die Menüleiste bereits sichtbar ist, wird diese Eigenschaft nicht `true` sofort ausgeblendet.

#### `win.simpleFullScreen`

Eine `Boolean` Eigenschaft, die bestimmt, ob sich das Fenster im einfachen Vollbildmodus (vor dem Löwen) befindet.

#### `win.fullScreen`

Eine `Boolean` Eigenschaft, die bestimmt, ob sich das Fenster im Vollbildmodus befindet.

#### `win.visibleOnAllWorkspaces`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster in allen Arbeitsbereichen sichtbar ist.

**Hinweis:** gibt unter Windows immer false zurück.

#### `win.shadow`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster einen Schatten hat.

#### `win.menuBarVisible` _Windows_ _Linux-_

Eine `Boolean` Eigenschaft, die bestimmt, ob die Menüleiste sichtbar sein soll.

**Hinweis:** Wenn die Menüleiste automatisch ausgeblendet ist, können Benutzer die Menüleiste weiterhin aufrufen, indem Sie die Taste einer `Alt` drücken.

#### `win.kiosk`

Eine `Boolean` Eigenschaft, die bestimmt, ob sich das Fenster im Kioskmodus befindet.

#### `win.documentEdited` _macOS-_

Eine `Boolean` Eigenschaft, die angibt, ob das Dokument des Fensters bearbeitet wurde.

Das Symbol in der Titelleiste wird grau, wenn es auf `true`festgelegt wird.

#### `win.representedFilename` _macOS-_

Eine `String` Eigenschaft, die den Pfadnamen der Datei bestimmt, die das Fenster darstellt, und das Symbol der Datei wird in der Titelleiste des Fensters angezeigt.

#### `win.title`

Eine `String` Eigenschaft, die den Titel des systemeigenen Fensters bestimmt.

**Hinweis:** Der Titel der Webseite kann sich vom Titel des systemeigenen Fensters unterscheiden.

#### `win.minimizable`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster vom Benutzer manuell minimiert werden kann.

Unter Linux ist der Setter ein No-Op, obwohl der Getter `true`zurückgibt.

#### `win.maximizable`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster vom Benutzer manuell maximiert werden kann.

Unter Linux ist der Setter ein No-Op, obwohl der Getter `true`zurückgibt.

#### `win.fullScreenable`

Eine `Boolean` Eigenschaft, die bestimmt, ob die Schaltfläche "Fenster maximieren/Zoom" den Vollbildmodus wechselt oder das Fenster maximiert.

#### `win.resizable`

Eine `Boolean` Eigenschaft, die bestimmt, ob die Größe des Fensters vom Benutzer manuell geändert werden kann.

#### `win.closable`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster vom Benutzer manuell geschlossen werden kann.

Unter Linux ist der Setter ein No-Op, obwohl der Getter `true`zurückgibt.

#### `win.movable`

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster vom Benutzer verschoben werden kann.

Unter Linux ist der Setter ein No-Op, obwohl der Getter `true`zurückgibt.

#### `win.excludedFromShownWindowsMenu` _macOS-_

Eine `Boolean` Eigenschaft, die bestimmt, ob das Fenster aus dem Windows-Menü der Anwendung ausgeschlossen ist. `false` standardmäßig.

```js
const win = neues BrowserWindow({ height: 600, width: 600 })

const template = [
  {
    role: 'windowmenu'
  }
]

win.excludedFromShownWindowsMenu = true

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

#### `win.accessibleTitel`

Eine `String` Eigenschaft, die einen alternativen Titel definiert, der nur für Eingabehilfen wie Bildschirmleseprogramme bereitgestellt wird. Diese Zeichenfolge ist nicht direkt für Benutzer sichtbar .

### Instanz Methoden

Objekte, die mit `new BrowserWindow` erstellt wurden, verfügen über die folgenden Instanzmethoden:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

#### `win.destroy()`

Erzwingen Des Schließen des Fensters, des `unload` und `beforeunload` -Ereignisses wird für die Webseite nicht angezeigt, und `close` Ereignis wird auch nicht für dieses Fenster gesendet, aber es garantiert, dass die `closed` Ereignis ausgesendet wird.

#### `win.close()`

Versuchen Sie, das Fenster zu schließen. Dies hat den gleichen Effekt wie ein Benutzer, der manuell auf der Schaltfläche Schließen des Fensters klickt. Die Webseite kann den Abschluss jedoch abbrechen. Sehen Sie [Close-Ereignis](#event-close).

#### `win.focus()`

Konzentriert sich auf das Fenster.

#### `win.blur()`

Entfernt den Fokus aus dem Fenster.

#### `win.isFocused()`

Gibt `Boolean` zurück : Gibt an, ob das Fenster fokussiert ist.

#### `win.isDestroyed()`

Gibt `Boolean` zurück - Gibt an, ob das Fenster zerstört wurde.

#### `win.show()`

Zeigt das Fenster an und gibt den Fokus.

#### `win.showInactive()`

Zeigt das Fenster an, konzentriert sich jedoch nicht darauf.

#### `win.hide()`

Blendet das Fenster aus.

#### `win.isVisible()`

Gibt `Boolean` zurück : Gibt an, ob das Fenster für den Benutzer sichtbar ist.

#### `win.isModal()`

Gibt `Boolean` zurück : Gibt an, ob das aktuelle Fenster ein modales Fenster ist.

#### `win.maximize()`

Maximiert das Fenster. Dadurch wird auch das Fenster angezeigt (aber nicht fokussiert), wenn es nicht bereits angezeigt wird.

#### `win.unmaximize()`

Unmaximiert das Fenster.

#### `win.isMaximized()`

Gibt `Boolean` zurück : Gibt an, ob das Fenster maximiert ist.

#### `win.minimize()`

Minimiert das Fenster. Auf einigen Plattformen wird das minimierte Fenster in Dock angezeigt.

#### `win.restore()`

Stellt das Fenster aus dem minimierten Zustand in den vorherigen Zustand wieder her.

#### `win.isMinimized()`

Gibt `Boolean` zurück - Gibt an, ob das Fenster minimiert ist.

#### `win.setFullScreen(flag)`

* `flag` Boolean

Legt fest, ob sich das Fenster im Vollbildmodus befinden soll.

#### `win.isFullScreen()`

Gibt `Boolean` zurück - Gibt an, ob sich das Fenster im Vollbildmodus befindet.

#### `win.setSimpleFullScreen(flag)` _macOS_

* `flag` Boolean

Betritt oder verlässt den einfachen Vollbildmodus.

Der einfache Vollbildmodus emuliert das native Vollbildverhalten, das in MacOS-Versionen vor Lion (10.7) zu finden war.

#### `win.isSimpleFullScreen()` _macOS_

Gibt `Boolean` zurück - Gibt an, ob sich das Fenster im einfachen Vollbildmodus (vor dem Löwen) befindet.

#### `win.isNormal()`

Gibt `Boolean` zurück - Gibt an, ob sich das Fenster im Normalzustand befindet (nicht maximiert, nicht minimiert, nicht im Vollbildmodus).

#### `win.setAspectRatio(aspectRatio[, extraSize])`

* `aspectRatio` Float - Das Seitenverhältnis, das für einen Teil der Inhaltsansicht beibehalten werden soll.
* `extraSize` [Size](structures/size.md) (optional) _macOS_ - Die zusätzliche Größe, die bei Beibehaltung des Seitenverhältnisses nicht enthalten sein soll.

Dadurch wird ein Fenster ein Seitenverhältnis beibehalten. Die zusätzliche Größe ermöglicht es einem Entwicklern, Speicherplatz zu haben, der in Pixel angegeben ist und nicht in den -Verhältnis-Berechnungen enthalten ist. Diese API berücksichtigt bereits den Unterschied zwischen der Größe eines Fensters und seiner Inhaltsgröße.

Betrachten Sie ein normales Fenster mit einem HD-Videoplayer und zugehörigen Steuerelementen. Vielleicht gibt es 15 Pixel Steuerelemente am linken Rand, 25 Pixel Steuerelemente am rechten Rand und 50 Pixel Steuerelemente unterhalb des Players. Um ein 16:9-Seitenverhältnis (Standard-Seitenverhältnis für HD-@1920x1080) innerhalb Spielers selbst zu halten, würden wir diese Funktion mit Argumenten von 16/9 und
{ width: 40, height: 50 }nennen. Das zweite Argument spielt keine Sorge, wo sich die zusätzliche Breite und Höhe innerhalb der Inhaltsansicht befinden - nur, dass sie vorhanden sind. Summiert jede zusätzliche Breite und Höhenbereiche, die Sie in der gesamten Inhaltsansicht haben.

Das Seitenverhältnis wird nicht eingehalten, wenn die Größe des Fensters mit APIs wie `win.setSize`.

#### `win.setBackgroundColor(backgroundColor)`

* `backgroundColor` String - Die Hintergrundfarbe des Fensters als hexadezimaler Wert, wie `#66CD00` oder `#FFF` oder `#80FFFFFF` (alpha wird unterstützt, wenn `transparent` `true`ist). Der Standardwert ist `#FFF` (weiß).

Legt die Hintergrundfarbe des Fensters fest. Siehe [Einstellung `backgroundColor`](#setting-backgroundcolor).

#### `win.previewFile(path[, displayName])` _macOS_

* `path` String - Der absolute Pfad zur Datei, die mit QuickLook in der Vorschau angezeigt werden soll. Diese ist wichtig, da Quick Look den Dateinamen und die Dateierweiterung auf dem Pfad verwendet , um den Inhaltstyp der zu öffnenden Datei zu bestimmen.
* `displayName` String (optional) - Der Name der Datei, die in der Modalansicht Quick Look angezeigt werden soll. Dies ist rein visuell und hat keinen Einfluss auf den Inhalt Dateityp. Standardmäßig `path`.

Verwendet [Quick Look][quick-look] , um eine Datei in einem bestimmten Pfad in der Vorschau anzuzeigen.

#### `win.closeFilePreview()` _macOS_

Schließt das derzeit geöffnete [Quick Look][quick-look] -Bedienfeld.

#### `win.setBounds(bounds[, animate])`

* `bounds` <  Partielles[Rechteck](structures/rectangle.md)>
* `animate` Boolean (optional) _macOS_

Ändert die Größe und verschiebt das Fenster auf die angegebenen Grenzen. Alle Eigenschaften, die nicht angegeben werden, werden standardmäßig auf ihre aktuellen Werte zurückgeführt.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

/ setzen Sie alle Grenzen Eigenschaften
win.setBounds(' x: 440, y: 225, Breite: 800, Höhe: 600 ))

/ setzen Sie eine Single bounds-Eigenschaft
win.setBounds({ width: 100 })

/ x: 440, y: 225, Breite: 100, Höhe: 600
Konsole.log(win.getBounds))
```

#### `win.getBounds()`

Gibt [`Rectangle`](structures/rectangle.md) zurück - Der `bounds` des Fensters als `Object`.

#### `win.getBackgroundColor()`

Gibt `String` zurück : Ruft die Hintergrundfarbe des Fensters ab. Siehe [Einstellung `backgroundColor`](#setting-backgroundcolor).

#### `win.setContentBounds(bounds[, animate])`

* `bounds` [Rectangle](structures/rectangle.md) Boundings des Displays
* `animate` Boolean (optional) _macOS_

Ändert die Größe und verschiebt den Clientbereich des Fensters (z. B. die Webseite) in die angegebenen Grenzen.

#### `win.getContentBounds()`

Gibt [`Rectangle`](structures/rectangle.md) zurück - Die `bounds` des Clientbereichs des Fensters als `Object`.

#### `win.getNormalBounds()`

Gibt [`Rectangle`](structures/rectangle.md) zurück - Enthält die Fenstergrenzen des Normalzustands

**Hinweis:** unabhängig vom aktuellen Zustand des Fensters: maximiert, minimiert oder im Vollbildmodus, gibt diese Funktion immer die Position und Größe des Fensters im normalen Zustand zurück. Im normalen Zustand gibt getBounds und getNormalBounds die gleiche [`Rectangle`](structures/rectangle.md)zurück.

#### `win.setEnabled(enable)`

* `enable` Boolean

Deaktivieren oder aktivieren Sie das Fenster.

#### `win.isEnabled()`

Gibt `Boolean` zurück - ob das Fenster aktiviert ist.

#### `win.setSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

Ändert die Größe des Fensters auf `width` und `height`. Wenn `width` oder `height` unter festgelegten Mindestgrößeneinschränkungen liegen, wird das Fenster auf die Mindestgröße gerast.

#### `win.getSize()`

Gibt `Integer[]` zurück : Enthält die Breite und Höhe des Fensters.

#### `win.setContentSize(width, height[, animate])`

* `width` Integer
* `height` Integer
* `animate` Boolean (optional) _macOS_

Ändert die Größe des Clientbereichs des Fensters (z. B. der Webseite) in `width` und `height`.

#### `win.getContentSize()`

Gibt `Integer[]` zurück: Enthält die Breite und Höhe des Clientbereichs des Fensters.

#### `win.setMinimumSize(width, height)`

* `width` Integer
* `height` Integer

Legt die Mindestgröße des Fensters auf `width` fest und `height`.

#### `win.getMinimumSize()`

Gibt `Integer[]` zurück: Enthält die minimale Breite und Höhe des Fensters.

#### `win.setMaximumSize(width, height)`

* `width` Integer
* `height` Integer

Legt die maximale Größe des Fensters auf `width` fest und `height`.

#### `win.getMaximumSize()`

Gibt `Integer[]` zurück : Enthält die maximale Breite und Höhe des Fensters.

#### `win.setResizable(resizable)`

* `resizable` Boolean

Legt fest, ob die Größe des Fensters vom Benutzer manuell geändert werden kann.

#### `win.isResizable()`

Gibt `Boolean` zurück : Gibt die Größe des Fensters manuell vom Benutzer an.

#### `win.setMovable(movable)` _macOS_ _Windows_

* `movable` Boolean

Legt fest, ob das Fenster vom Benutzer verschoben werden kann. Unter Linux tut nichts.

#### `win.isMovable()` _macOS_ _Windows_

Gibt `Boolean` zurück : Gibt an, ob das Fenster vom Benutzer verschoben werden kann.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setMinimizable(minimizable)` _macOS_ _Windows_

* `minimizable` Boolean

Legt fest, ob das Fenster vom Benutzer manuell minimiert werden kann. Unter Linux tut nichts.

#### `win.isMinimizable()` _macOS_ _Windows_

Gibt `Boolean` zurück : Gibt an, ob das Fenster vom Benutzer manuell minimiert werden kann.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setMaximizable(maximizable)` _macOS_ _Windows_

* `maximizable` Boolean

Legt fest, ob das Fenster vom Benutzer manuell maximiert werden kann. Unter Linux tut nichts.

#### `win.isMaximizable()` _macOS_ _Windows_

Gibt `Boolean` zurück : Gibt an, ob das Fenster vom Benutzer manuell maximiert werden kann.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setFullScreenable(fullscreenable)`

* `fullscreenable` Boolean

Legt fest, ob die Schaltfläche "Fenster maximieren/Zoom" den Vollbildmodus wechselt oder das Fenster maximiert.

#### `win.isFullScreenable()`

Gibt `Boolean` zurück - Gibt an, ob die Schaltfläche "Fenster maximieren/Zoom" den Vollbildmodus wechselt oder das Fenster maximiert.

#### `win.setClosable(closable)` _macOS_ _Windows_

* `closable` Boolean

Legt fest, ob das Fenster vom Benutzer manuell geschlossen werden kann. Unter Linux tut nichts.

#### `win.isClosable()` _macOS_ _Windows_

Gibt `Boolean` zurück - Gibt an ob das Fenster durch den Nutzer manuell geschlossen werden kann.

Unter Linux wird immer `true` zurückgegeben.

#### `win.setAlwaysOnTop(flag[, level][, relativeLevel])`

* `flag` Boolean
* `level` String (optional) _macOS_ _Windows_ - Werte umfassen `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status` `pop-up-menu`, `screen-saver`, und "`dock`" (veraltet). Der Standardwert ist `floating` , wenn `flag` wahr ist. Der `level` wird auf `normal` zurückgesetzt, wenn das -Flag falsch ist. Beachten Sie, dass das Fenster von `floating` bis `status` unter dem Dock unter macOS und unter der Taskleiste unter Windows platziert wird. Von `pop-up-menu` bis zu einem höheren wird es über dem Dock unter macOS und über der Taskleiste unter Windows angezeigt. Weitere Informationen finden Sie in den [macOS-Dokumenten][window-levels] .
* `relativeLevel` Ganzzahl (optional) _macOS_ - Die Anzahl der Ebenen, die diesem Fenster relativ zum angegebenen `level`festgelegt werden sollen. Der Standardwert ist `0`. Beachten Sie, dass Apple davon abschreckt, Ebenen festzulegen, die höher als 1 über `screen-saver`.

Legt fest, ob das Fenster immer über anderen Fenstern angezeigt werden soll. Nachdem dies gesetzt hat, ist das Fenster immer noch ein normales Fenster, kein Toolboxfenster, auf das nicht fokussiert werden kann.

#### `win.isAlwaysOnTop()`

Gibt `Boolean` zurück : Gibt an, ob sich das Fenster immer über anderen Fenstern befindet.

#### `win.moveAbove(mediaSourceId)`

* `mediaSourceId` String - Fenster-ID im Format der DesktopCapturerSource-ID. Beispiel : "window:1869:0".

Verschiebt das Fenster über dem Quellfenster im Sinne von z-Order. Wenn die `mediaSourceId` kein Typfenster ist oder wenn das Fenster nicht vorhanden ist, löst diese Methode einen Fehler aus.

#### `win.moveTop()`

Verschiebt das Fenster nach oben(z-Order) unabhängig vom Fokus

#### `win.center()`

Verschiebt das Fenster in die Mitte des Bildschirms.

#### `win.setPosition(x, y[, animate])`

* `x` Integer
* `y` Integer
* `animate` Boolean (optional) _macOS_

Verschiebt das Fenster in `x` und `y`.

#### `win.getPosition()`

Gibt `Integer[]` zurück - Enthält die aktuelle Position des Fensters.

#### `win.setTitle(title)`

* `title` String

Ändert den Titel des systemeigenen Fensters in `title`.

#### `win.getTitle()`

Gibt `String` zurück - Der Titel des systemeigenen Fensters.

**Hinweis:** Der Titel der Webseite kann sich vom Titel des nativen -Fensters unterscheiden.

#### `win.setSheetOffset(offsetY[, offsetX])` _macOS-_

* `offsetY` Float
* `offsetX` Float (optional)

Ändert den Befestigungspunkt für Blätter unter macOS. Standardmäßig werden Blätter direkt unter dem Fensterrahmen angefügt, Sie können sie jedoch unter einer HTML-gerenderten Symbolleiste anzeigen. Ein Beispiel:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

const toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
win.setSheetOffset(toolbarRect.height)
```

#### `win.flashFrame(flag)`

* `flag` Boolean

Startet oder stoppt das Blinken des Fensters, um die Aufmerksamkeit des Benutzers auf sich zu ziehen.

#### `win.setSkipTaskbar(skip)`

* `skip` Boolean

Lässt das Fenster nicht in der Taskleiste angezeigt werden.

#### `win.setKiosk(flag)`

* `flag` Boolean

Betritt oder verlässt den Kioskmodus.

#### `win.isKiosk()`

Gibt `Boolean` zurück - Gibt an, ob sich das Fenster im Kioskmodus befindet.

#### `win.isTabletMode()` _Windows-_

Gibt `Boolean` zurück : Gibt an, ob sich das Fenster im Windows 10-Tabletmodus befindet.

Da Windows 10-Benutzer ihren PC [als Tablet-](https://support.microsoft.com/en-us/help/17210/windows-10-use-your-pc-like-a-tablet)verwenden können, können in diesem Modus Apps ihre Benutzeroberfläche für Tablets optimieren, z. B. vergrößern der Titelleiste und Das Ausblenden von Titelleistenschaltflächen.

Diese API gibt zurück, ob sich das Fenster im Tablet-Modus befindet und das `resize` -Ereignis verwendet werden kann, um Änderungen im Tablet-Modus zu hören.

#### `win.getMediaSourceId()`

Gibt `String` zurück - Fenster-ID im Format der DesktopCapturerSource-ID. Beispiel :window:1234:0".

Genauer gesagt ist das Format `window:id:other_id` , wo `id` auf Windows `HWND` wird, `CGWindowID` (`uint64_t`) auf macOS und `Window` (`unsigned long`) auf Linux. `other_id` wird verwendet, um Webinhalte (Tabs) zu identifizieren, so dass im gleichen Fenster der obersten Ebene.

#### `win.getNativeWindowHandle()`

Gibt `Buffer` zurück - Das plattformspezifische Handle des Fensters.

Der systemeigene Typ des Handles ist unter Windows `HWND` , `NSView*` unter macOS und `Window` (`unsigned long`) unter Linux.

#### `win.hookWindowMessage(message, callback)` _Windows_

* `message` Integer
* `callback` Function
  * `wParam` any - Die `wParam` , die der WndProc zur Verfügung gestellt werden
  * `lParam` any - Die `lParam` , die der WndProc zur Verfügung gestellt werden

Schließt eine Windows-Nachricht ein. Der `callback` wird aufgerufen, wenn die Nachricht im WndProc empfangen wird.

#### `win.isWindowMessageHooked(message)` _Windows_

* `message` Integer

Gibt `Boolean` zurück - `true` oder `false` , je nachdem, ob die Nachricht hooked ist.

#### `win.unhookWindowMessage(message)` _Windows_

* `message` Integer

Die Fensternachricht wird abgehängt.

#### `win.unhookAllWindowMessages()` _Windows_

Unhookt alle Fensternachrichten.

#### `win.setRepresentedFilename(filename)` _macOS_

* `filename` String

Legt den Pfadnamen der Datei fest, die das Fenster darstellt, und das Symbol der Datei wird in der Titelleiste des Fensters angezeigt.

#### `win.getRepresentedFilename()` _macOS_

Gibt `String` zurück - Der Pfadname der Datei, die das Fenster darstellt.

#### `win.setDocumentEdited(edited)` _macOS_

* `edited` Boolean

Gibt an, ob das Dokument des Fensters bearbeitet wurde, und das Symbol im Titel -Leiste wird grau, wenn auf `true`festgelegt wird.

#### `win.isDocumentEdited()` _macOS_

Gibt `Boolean` zurück : Gibt an, ob das Dokument des Fensters bearbeitet wurde.

#### `win.focusOnWebView()`

#### `win.blurWebView()`

#### `win.capturePage([rect])`

* `rect` [Rechteck](structures/rectangle.md) (optional) - Die zu erfassenden Grenzen

Gibt `Promise<NativeImage>` zurück - Löst mit einem [NativeImage](native-image.md)

Erfasst eine Momentaufnahme der Seite in `rect`. Wenn Sie `rect` auslassen, wird die gesamte sichtbare Seite erfasst. Wenn die Seite nicht sichtbar ist, ist `rect` möglicherweise leer.

#### `win.loadURL(url[, options])`

* `url` String
* `options` Objekt (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - Eine HTTP Referrer URL.
  * `userAgent` String (optional) – Ein Benutzer-Agent, der die Anforderung stammt.
  * `extraHeaders` String (optional) - Zusätzliche Header getrennt durch "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Basis-URL (mit Nachtrailing-Pfadtrennzeichen) für Dateien, die von der Daten-URL geladen werden sollen. Dies ist nur erforderlich, wenn die angegebene `url` eine Daten-URL ist und andere Dateien laden muss.

Gibt `Promise<void>` zurück - das Versprechen wird aufgelöst, wenn die Seite geladen hat (siehe [`did-finish-load`](web-contents.md#event-did-finish-load)), und lehnt ab, wenn die Seite nicht geladen werden kann (siehe [`did-fail-load`](web-contents.md#event-did-fail-load)).

Genauso wie [`webContents.loadURL(url[, options])`](web-contents.md#contentsloadurlurl-options).

Die `url` kann eine Entferntadresse sein (z.B. `http://`) oder einen Pfad zu einer lokalen HTML-Datei mit dem `file://` -Protokoll.

Um sicherzustellen, dass Datei-URLs ordnungsgemäß formatiert sind, wird empfohlen, die [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) -Methode von Node zu verwenden:

```javascript
const url = require('url').format('
  -Protokoll: 'datei',
  schräge Schrägstriche: true,
  pathname: require('path').join(__dirname, 'index.html')
')

win.loadURL(url)
```

Sie können eine URL mithilfe einer `POST` Anforderung mit URL-codierten Daten laden, indem Sie Folgendes :

```javascript
win.loadURL('http://localhost:8000/post', {
  postData: [{
    type: 'rawData',
    bytes: Buffer.from('hello=world')
  }],
  extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
})
```

#### `win.loadFile(filePath[, options])`

* `filePath` String
* `options` Objekt (optional)
  * `query` Record<String, String> (optional) - An `url.format()`übergeben.
  * `search` String (optional) - An `url.format()`übergeben.
  * `hash` String (optional) - An `url.format()`übergeben.

Gibt `Promise<void>` zurück - das Versprechen wird aufgelöst, wenn die Seite geladen hat (siehe [`did-finish-load`](web-contents.md#event-did-finish-load)), und lehnt ab, wenn die Seite nicht geladen werden kann (siehe [`did-fail-load`](web-contents.md#event-did-fail-load)).

Wie `webContents.loadFile`sollte `filePath` ein Pfad zu einer HTML- Datei relativ zum Stamm der Anwendung sein.  Weitere Informationen finden Sie in den `webContents` -Dokumenten.

#### `win.reload()`

Genauso wie `webContents.reload`.

#### `win.setMenu(menu)` _Linux_ _Windows_

* `menu` Menu | null

Legt die `menu` als Menüleiste des Fensters fest.

#### `win.removeMenu()` _Linux_ _Windows_

Entfernen Sie die Menüleiste des Fensters.

#### `win.setProgressBar(progress[, options])`

* `progress` Double
* `options` Objekt (optional)
  * `mode` String _Windows_ - Modus für die Fortschrittsleiste. Kann `none`, `normal`, `indeterminate`, `error` oder `paused`sein.

Legt den Fortschrittswert im Statusbalken fest. Gültiger Bereich ist [0, 1.0].

Entfernen Sie die Fortschrittsleiste, wenn der Fortschritt Ändern Sie in den < 0;  unbestimmten Modus, wenn der Fortschritt > 1.

Auf der Linux-Plattform, unterstützt nur Unity Desktop-Umgebung, müssen Sie angeben, der `*.desktop` Dateinamen `desktopName` Feld in `package.json`. Standardmäßig übernimmt `{app.name}.desktop`.

Unter Windows kann ein Modus übergeben werden. Akzeptierte Werte sind `none`, `normal`, `indeterminate`, `error`und `paused`. Wenn Sie `setProgressBar` ohne Modussatz aufrufen (aber mit einem Wert innerhalb des gültigen Bereichs), wird `normal` angenommen.

#### `win.setOverlayIcon(overlay, description)` _Windows_

* `overlay` [NativeImage](native-image.md) | null - das Symbol, das in der unteren rechten Ecke des Taskleistensymbols angezeigt werden soll. Wenn dieser Parameter `null`ist, wird die Überlagerung gelöscht.
* `description` String - eine Beschreibung, die für Barrierefreiheit Bildschirmleseprogramme bereitgestellt wird

Legt ein 16 x 16 Pixel-Overlay auf das aktuelle Taskleistensymbol fest, das normalerweise verwendet wird, um eine Art Anwendungsstatus zu vermitteln oder den Benutzer passiv zu benachrichtigen.

#### `win.setHasShadow(hasShadow)`

* `hasShadow` Boolean

Legt fest, ob das Fenster einen Schatten haben soll.

#### `win.hasShadow()`

Gibt `Boolean` zurück : Gibt an, ob das Fenster einen Schatten hat.

#### `win.setOpacity(opacity)` _Windows_ _macOS_

* `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Legt die Deckkraft des Fensters fest. Unter Linux, tut nichts. A-bound-Anzahl Werte werden auf den [0, 1] Bereich geklemmt.

#### `win.getOpacity()`

Gibt `Number` - zwischen 0,0 (vollständig transparent) und 1,0 (vollständig undurchsichtig) zurück. Auf Linux, gibt immer 1 zurück.

#### `win.setShape(rects)` _Windows_ _Linux_ _Experimental_

* `rects` [Rechteck[]](structures/rectangle.md) - Legt eine Form für das Fenster fest. Durch das Übergeben einer leeren Liste wird das Fenster auf rechteckig zurückgesetzt.

Das Festlegen eines Fenster-Shapes bestimmt den Bereich innerhalb des Fensters, in dem das System Zeichnung und Benutzerinteraktion zulässt. Außerhalb der angegebenen Region werden keine Pixel gezeichnet und keine Mausereignisse registriert. Mausereignisse außerhalb die Region wird nicht von diesem Fenster empfangen, sondern fällt auf was auch immer sich hinter dem Fenster befindet.

#### `win.setThumbarButtons(buttons)` _Windows_

* `buttons` [ThumbarButton[]](structures/thumbar-button.md)

Gibt `Boolean` zurück - Gibt an, ob die Schaltflächen erfolgreich hinzugefügt wurden

Fügen Sie dem Miniaturbild eine Miniaturansichtssymbolleiste mit einem angegebenen Satz von Schaltflächen hinzu, eines Fensters in einem Taskleisten-Schaltflächenlayout. Gibt ein `Boolean` -Objekt an, , ob die Miniaturansicht erfolgreich hinzugefügt wurde.

Die Anzahl der Schaltflächen in der Miniaturansichtssymbolleiste sollte aufgrund begrenzten Raums nicht größer als 7 sein. Nachdem Sie die Miniaturansichtssymbolleiste eingerichtet haben, kann die Symbolleiste aufgrund der Einschränkung der Plattform nicht entfernt werden. Sie können die API jedoch mit einem leeren Array aufrufen, um die Schaltflächen zu säubern.

Der `buttons` ist ein Array `Button` Objekte:

* `Button` -Objekt
  * ` Icon ` [ NativeImage ](native-image.md)-das Symbol zeigt in Thumbnail Leiste.
  * ` Klicken Sie auf ` Funktion
  * ` Tooltip ` String (optional)-der Text der Tooltip der Schaltfläche.
  * `flags` String[] (optional) - Kontrollieren Sie bestimmte Zustände und Verhaltensweisen des Buttons. Standardmäßig ist es `['enabled']`.

Die ` Flags ` ist ein Array, das folgende ` Zeichenfolge ` s enthalten kann:

* ` Enabled `-die Schaltfläche ist aktiv und für den Benutzer verfügbar.
* `disabled` - Der Button ist deaktiviert. Er ist vorhanden, zeigt aber visuell, dass er nicht auf Nutzeraktionen reagiert.
* ` dismissonclick `-wenn auf die Schaltfläche geklickt wird, wird das Thumbnail-Fenster geschlossen sofort.
* ` nobackground `-zeichnen Sie keinen Schaltflächenrahmen, sondern verwenden Sie nur das Bild.
* ` Hidden `-die Schaltfläche wird dem Benutzer nicht angezeigt.
* `noninteractive` - Der Button ist aktiviert aber nicht interaktiv. Es wird kein gedrückter Button angezeigt. Dieser Wert ist für Instanzen bestimmt, in denen der Button in einer Benachrichtigung verwendet wird.

#### `win.setThumbnailClip(region)` _Windows_

* `region` [Rechteck](structures/rectangle.md) - Bereich des Fensters

Legt fest, dass der Bereich des Fensters als Miniaturbild angezeigt wird, wenn den Mauszeiger über das Fenster in der Taskleiste. Sie können die Miniaturansicht zurücksetzen, um das gesamte Fenster sein, indem Sie einen leeren Bereich angeben: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### `win.setThumbnailToolTip(toolTip)` _Windows_

* `toolTip` String

Legt die QuickInfo fest, die angezeigt wird, wenn sie mit der Maus auf die Miniaturansicht des Fensters in der Taskleiste zeigt.

#### `win.setAppDetails(options)` _Windows_

* `options` -Objekt
  * `appId` String (optional) - [App-Benutzermodell-ID des Fensters](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). Es muss festgelegt werden, sonst haben die anderen Optionen keine Wirkung.
  * `appIconPath` String (optional) - [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx)des Fensters .
  * `appIconIndex` Ganzzahl (optional) - Index des Symbols in `appIconPath`. Ignoriert, wenn `appIconPath` nicht festgelegt ist. Der Standardwert ist `0`.
  * `relaunchCommand` String (optional) - [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx)des Fensters .
  * `relaunchDisplayName` String (optional) - [Relaunch-Anzeigename](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx)des Fensters .

Legt die Eigenschaften für die Taskleistenschaltfläche des Fensters fest.

**Hinweis:** `relaunchCommand` und `relaunchDisplayName` müssen immer zusammen gesetzt werden. Wenn eine dieser Eigenschaften nicht festgelegt ist, wird keines der beiden Eigenschaften verwendet.

#### `win.showDefinitionForSelection()` _macOS_

Genauso wie `webContents.showDefinitionForSelection()`.

#### `win.setIcon(icon)` _Windows_ _Linux_

* `icon` [NativeImage](native-image.md) | Schnur

Ändert das Fenstersymbol.

#### `win.setWindowButtonVisibility(visible)` _macOS_

* `visible` Boolean

Legt fest, ob die Ampeltasten des Fensters sichtbar sein sollen.

Dies kann nicht aufgerufen werden, wenn `titleBarStyle` auf `customButtonsOnHover`festgelegt ist.

#### `win.setAutoHideMenuBar(hide)`

* `hide` Boolean

Legt fest, ob sich die Fenstermenüleiste automatisch ausblenden soll. Sobald die Menüleiste eingestellt wurde, wird nur angezeigt, wenn Benutzer die Taste der `Alt` drücken.

Wenn die Menüleiste bereits sichtbar ist, wird `setAutoHideMenuBar(true)` nicht sofort ausgeblendet.

#### `win.isMenuBarAutoHide()`

Gibt `Boolean` zurück - Gibt an, ob sich die Menüleiste automatisch selbst ausblendet.

#### `win.setMenuBarVisibility(visible)` _Windows_ _Linux_

* `visible` Boolean

Legt fest, ob die Menüleiste sichtbar sein soll. Wenn die Menüleiste automatisch ausgeblendet ist, können Benutzer die Menüleiste weiterhin aufrufen, indem Sie die Taste einer `Alt` drücken.

#### `win.isMenuBarVisible()`

Gibt `Boolean` zurück - Gibt an, ob die Menüleiste sichtbar ist.

#### `win.setVisibleOnAllWorkspaces(visible[, options])`

* `visible` Boolean
* `options` Objekt (optional)
  * `visibleOnFullScreen` boolesch (optional) _macOS_ - Legt fest, ob fensterüber Vollbildfenster sichtbar sein soll

Legt fest, ob das Fenster in allen Arbeitsbereichen sichtbar sein soll.

**Hinweis:** Diese API bewirkt unter Windows nichts.

#### `win.isVisibleOnAllWorkspaces()`

Gibt `Boolean` zurück : Gibt an, ob das Fenster in allen Arbeitsbereichen sichtbar ist.

**Hinweis:** Diese API gibt immer false unter Windows zurück.

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` Boolean
* `options` Objekt (optional)
  * `forward` boolesch (optional) _macOS_ _Windows_ - Wenn true, verschiebt die Maus Nachrichten nach Chromium, wodurch Mausereignisse wie `mouseleave`aktiviert werden. Wird nur verwendet, wenn `ignore` wahr ist. Wenn `ignore` falsch ist, wird die Weiterleitung unabhängig von diesem Wert immer deaktiviert.

Lässt das Fenster alle Mausereignisse ignorieren.

Alle Mausereignisse, die in diesem Fenster aufgetreten sind, werden an das Fenster unter diesem Fenster übergeben, aber wenn dieses Fenster den Fokus hat, erhält es weiterhin Tastatur Ereignisse.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` Boolean

Verhindert, dass der Fensterinhalt von anderen Apps erfasst wird.

Unter macOS wird der freigabetyp des NSWindow auf NSWindowSharingNone festgelegt. Unter Windows ruft es SetWindowDisplayAffinity mit `WDA_EXCLUDEFROMCAPTURE`auf. Unter Windows 10 Version 2004 und oben wird das Fenster vollständig aus der Erfassung entfernt, ältere Windows-Versionen verhalten sich so, als ob `WDA_MONITOR` angewendet wird, indem ein schwarzes Fenster erfasst wird.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` Boolean

Ändert, ob das Fenster fokussiert werden kann.

Unter macOS wird der Fokus nicht aus dem Fenster entfernt.

#### `win.setParentWindow(eltern)`

* `parent` BrowserWindow | Null

Legt `parent` als übergeordnetes Fenster des aktuellen Fensters fest, wird aktuelle Fenster durch übergebenes `null` in ein Fenster der obersten Ebene verwandelt.

#### `win.getParentWindow()`

Gibt `BrowserWindow` zurück - Das übergeordnete Fenster.

#### `win.getChildWindows()`

Gibt `BrowserWindow[]` zurück - Alle untergeordneten Fenster.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` Boolean

Steuert, ob der Cursor bei der Eingabe ausgeblendet werden soll.

#### `win.selectPreviousTab()` _macOS_

Wählt die vorherige Registerkarte aus, wenn systemeigene Registerkarten aktiviert sind und weitere Registerkarten im Fenster vorhanden sind.

#### `win.selectNextTab()` _macOS_

Wählt die nächste Registerkarte aus, wenn systemeigene Registerkarten aktiviert sind und weitere Registerkarten im Fenster vorhanden sind.

#### `win.mergeAllWindows()` _macOS_

Führt alle Fenster in einem Fenster mit mehreren Registerkarten zusammen, wenn systemeigene Registerkarten aktiviert sind und es mehr als ein geöffnetes Fenster gibt.

#### `win.moveTabToNewWindow()` _macOS_

Verschiebt die aktuelle Registerkarte in ein neues Fenster, wenn systemeigene Registerkarten aktiviert sind und es mehr als eine Registerkarte im aktuellen Fenster gibt.

#### `win.toggleTabBar()` _macOS_

Schaltet die Sichtbarkeit der Registerkartenleiste um, wenn systemeigene Registerkarten aktiviert sind und es nur eine Registerkarte im aktuellen Fenster gibt.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Fügt ein Fenster als Registerkarte in diesem Fenster nach der Registerkarte für die Fensterinstanz hinzu.

#### `win.setVibrancy(type)` _macOS_

* `type` String | NULL - Kann `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`oder `under-page`sein. Weitere Informationen finden Sie der [macOS-Dokumentation][vibrancy-docs] .

Fügt dem Browserfenster einen Vibrancy-Effekt hinzu. Wenn Sie `null` oder eine leere Zeichenfolge übergeben, wird der Vibranzeffekt auf dem Fenster entfernt.

Beachten Sie, dass `appearance-based`, `light`, `dark`, `medium-light`und `ultra-dark` veraltet sind und in einer kommenden Version von macOS entfernt werden.

#### `win.setTrafficLightPosition(position)` _macOS_

* `position` [-Point-](structures/point.md)

Legen Sie eine benutzerdefinierte Position für die Ampeltasten fest. Kann nur mit `titleBarStyle` verwendet werden, der auf `hidden`eingestellt ist.

#### `win.getTrafficLightPosition()` _macOS_

Gibt `Point` zurück - Die aktuelle Position für die Ampeltasten. Kann nur mit `titleBarStyle` verwendet werden, der auf `hidden`gesetzt ist.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | Null

Legt das touchBar-Layout für das aktuelle Fenster fest. Wenn Sie `null` oder `undefined` angeben, wird die Touchleiste gecleart. Diese Methode wirkt sich nur aus, wenn das -Gerät über eine Touchleiste verfügt und unter macOS 10.12.1+ ausgeführt wird.

**Hinweis:** Die TouchBar-API ist derzeit experimentell und kann sich in zukünftigen Electron-Versionen ändern oder entfernt .

#### `win.setBrowserView(browserView)` _Experimentell_

* `browserView` [BrowserView](browser-view.md) | null - `browserView` an `win`anfügen. Wenn andere `BrowserView`angeschlossen sind, werden sie aus dieses Fensters entfernt.

#### `win.getBrowserView()` _Experimental_

Gibt `BrowserView | null` zurück - Der `BrowserView` , der mit `win`verbunden ist. Gibt `null` zurück, wenn keine zugeordnet ist. Löst einen Fehler aus, wenn mehrere `BrowserView`s angefügt sind.

#### `win.addBrowserView(browserView)` _Experimentell_

* `browserView` [BrowserView](browser-view.md)

Ersatz-API für setBrowserView unterstützt die Arbeit mit mehreren Browseransichten.

#### `win.removeBrowserView(browserView)` _Experimentell_

* `browserView` [BrowserView](browser-view.md)

#### `win.setTopBrowserView(browserView)` _Experimentelle_

* `browserView` [BrowserView](browser-view.md)

Erhöht `browserView` über andere `BrowserView`, die an `win`angefügt sind. Löst einen Fehler aus, wenn `browserView` nicht an `win`angefügt ist.

#### `win.getBrowserViews()` _Experimental_

Gibt `BrowserView[]` zurück - ein Array aller BrowserViews, die mit `addBrowserView` oder `setBrowserView`angefügt wurden.

**Hinweis:** Die BrowserView-API ist derzeit experimentell und kann sich in zukünftigen Electron-Versionen ändern oder entfernt werden.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[page-visibility-api]: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
[quick-look]: https://en.wikipedia.org/wiki/Quick_Look
[vibrancy-docs]: https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc
[window-levels]: https://developer.apple.com/documentation/appkit/nswindow/level
[chrome-content-scripts]: https://developer.chrome.com/extensions/content_scripts#execution-environment
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

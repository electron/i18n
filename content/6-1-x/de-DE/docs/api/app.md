# app

> Kontrolliere den Ereignisverlauf deiner Anwendung.

Prozess: [Haupt](../glossary.md#main-process)

Das folgende Beispiel zeigt, wie die Applikation beendet wird, wenn das letzte Fenster geschlossen wurde:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Events

Das `app` Objekt stellt folgende Event zur Verfügung:

### Event: 'will-finish-launching'

Wird ausgelöst wenn die Anwendung den grundlegenenden Start abgeschlossen hat. Unter Windows und Linux, hat das `will-finish-launching`-Ereignis das gleiche Verhalten wie das `ready`-Event; unter macOS, repräsentiert dieses Event die `applicationWillFinishLaunching`-Benachrichtung von `NSApplication`. In der Regel würden hier Listener für die Events `open-file` und `open-url` registriert und der Crash Reporter und Auto-Updater gestartet werden.

In den meisten Fällen, sollte man alles im `ready` Eventhandler machen.

### Event: 'ready'

Rückgabewert:

* `launchInfo` Objekt _macOS_

Wird nach der erfolgreichen Initialisierung von Electron ausgelöst. Wenn die Anwendung in macOS über die Mitteilungszentrale gestartet wurde, hält `launchInfo` die `userInfo` von der `NSUserNotification`, die benutzt wurde um die Anwendung zu starten. Du kannst `app.isReady()` aufrufen, um zu prüfen, ob dieses Event bereits ausgelöst wurde.

### Event: 'window-all-closed'

Wird gefeuert, wenn alle Fenster geschlossen wurden.

Wenn du keinen einzigen Listener für dieses Event nutzt und alle Fenster geschlossen sind, ist die standardmäßige Handhabung des Events das Beenden der App. Wenn du allerdings auf das Event hörst, hast du die Kontrolle darüber, ob die App beendet werden soll oder nicht. Wenn entweder der Nutzer durch Drücken von `Cmd + Q` oder der Entwickler durch einen Aufruf von `app.quit()` die App zum Beenden bewegt, wird Electron zuerst versuchen alle Fenster zu schließen und danach erst das `will-emit` auslösen. In einem solchen Fall wird das `window-all-closed` Event übrigens überhaupt nicht ausgelöst.

### Event: 'before-quit'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
</ul>

<p spaces-before="0">Ausgelöst, bevor sich die Fenster der Anwendung schließen.
Ein Aufruf von <code>event.preventDefault()` verhindert das Standardverhalten, welches die Anwendung schließt.</p>

**Wichtig**: Wenn das Beenden der App durch einen Aufruf von `autoUpdater.quitAndInstall()` initiiert wurde, wird das `before-quit` Event *nach* der Auslösung aller `close` Events für alle Fenster ausgelöst und diese werden geschlossen.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'before-quit'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
</ul>

<p spaces-before="0">Ausgelöst, wenn alle Fenster geschlossen sind und sich die Anwendung beenden wird.
Ein Aufruf von <code>event.preventDefault()` verhindert das Standardverhalten, welches die Anwendung schließt.</p>

Schau dir die Beschreibung/Dokumentation des `window-all-closed` Events an um die Unterschiede zwischen dem `will-quit` und dem `window-all-closed` Event zu verstehen.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'quit'

Kehrt zurück:

* `event` Event
* `exitCode` Integer

Wird ausgelöst wenn die App beendet wird.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'open-file' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>path` String

Wird ausgelöst wenn der Nutzer versucht eine Datei mit der App zu öffnen. The `open-file` Event wird auch ausgelöst wenn die App bereits offen ist und das Betriebssystem die App nochmal zum Öffnen einer Datei benutzen will. `open-file` wird auch ausgelöst wenn eine Datei auf das Dock-Icon der App gezogen wird (macOS) und die App noch nicht gestartet ist. Behandle das `open-file` Event so früh wie möglich in deiner App um diesen Fall zu berücksichtigen (Also definitiv bevor das `ready` Event ausgelöst wird).

Du musst `event.preventDefault()` aufrufen um dieses Event selbst zu nutzen.

In Windows musst du `process.argv` (im Main-Prozess) parsen, um den Dateipfad zu erhalten.

### Event: 'open-url' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code> URL </ 0>  Zeichenfolge</li>
</ul>

<p spaces-before="0">Wird ausgelöst wenn der Nutzer versucht, eine URL mit der App zu öffnen. Die <code>Info.plist` Date muss das URL Schema mittels des `CFBundleURLTypes` Keys definieren und der `NSPrincipalClass` Key muss den Wert `AtomApplication` haben.</p>

Du musst `event.preventDefault()` aufrufen um dieses Event selbst zu nutzen.

### Event: 'activate' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>hasVisibleWindows` Boolean

Wird ausgelöst wenn die App aktiviert wird. Eine ganze Menge an Aktionen können dieses Event auslösen. So zum Beispiel das Starten der App zum ersten mal als solches, eine Wiederbenutzung der App während sie bereits läuft oder einfach ein Klick auf das Dock oder Tastbar Icon der App.

### Event: 'continue-activity' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><p spaces-before="0"><code>type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).</p>
* `userInfo` Object - Enthält den app-spezifischen Zustand, der von einer Aktivität auf einem anderen Gerät gespeichert wurde.

Wird während [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ausgelöst, wenn eine Aktivität von einem anderen Gerät wieder aufgenommen werden soll. Du solltest `event.preventDefault()` aufrufen wenn du dieses Event verwenden willst.

Eine Benutzeraktivität kann nur in einer App fortgesetzt werden, die die gleiche Entwicklerteam-ID als die Quell-App der Aktivität hat und den Typ der Aktivität unterstützt. Unterstützte Aktivitätstypen sind spezifiziert in `Info.plist` unter dem `NSUserActivityTypes` Schlüssel.

### Event: 'will-continue-activity' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Wird während [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ausgelöst, bevor eine Aktivität von einem anderen Gerät wieder aufgenommen werden soll. Du solltest `event.preventDefault()` aufrufen wenn du dieses Event verwenden willst.

### Event: 'continue-activity-error' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><p spaces-before="0"><code>type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).</p>
* `error` String - Ein String mit der lokalisierten Beschreibung des Fehlers.

Wird während [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ausgelöst, wenn eine Aktivität von einem anderen Gerät nicht wieder aufgenommen werden kann.

### Ereignis: 'activity-was-continued' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><p spaces-before="0"><code>type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).</p>
* `userInfo` Objekt - Enthält app-spezifischen Zustand, der von der Aktivität gespeichert wird.

Wird während [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ausgelöst, wenn eine Aktivität von diesem Gerät auf einem anderen Gerät erfolgreich fortgesetzt wurde.

### Event: 'update-activity-state' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><p spaces-before="0"><code>type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).</p>
* `userInfo` Objekt - Enthält app-spezifischen Zustand, der von der Aktivität gespeichert wird.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise, the operation will fail and `continue-activity-error` will be called.

### Event: 'new-window-for-tab' _macOS_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
</ul>

<p spaces-before="0">Emitted when the user clicks the native macOS new tab button. The new
tab button is only visible if the current <code>BrowserWindow` has a `tabbingIdentifier`</p>

### Event: 'browser-window-blur'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>window` [BrowserWindow](browser-window.md)

Emitted when a [browserWindow](browser-window.md) gets blurred.

### Event: 'browser-window-focus'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>window` [BrowserWindow](browser-window.md)

Emittiert wenn ein [browserWindow](browser-window.md) in den Fokus kommt.

### Event: 'browser-window-created'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>window` [BrowserWindow](browser-window.md)

Emittiert wenn ein neues [browserWindow](browser-window.md) erstellt wird.

### Event: 'web-contents-created'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)

Emittiert wen ein neues [webContents](web-contents.md) erstellt wird.

### Event: 'certificate-error'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* ` URL </ 0>  Zeichenfolge</li>
<li><code>error` String - Der error code
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` Boolean - Gibt an ob das Zertifikat als vertrauenswürdig angesehen werden soll

Emittiert wenn die Verifizierung des `certificate` für die `url` fehlschlägt, um dem Zertifikat dennoch zu vertrauen müssen die das normale Verhalten abschalten mit `event.preventDefault()` und `callback(true)` aufrufen.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Event: 'select-client-certificate'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Certificate](structures/certificate.md) (optional)

Emittiert wenn ein Client Zertifikat angefordert wird.

Die `url` entspricht dem Navigationseintrag, der das Client-Zertifikat anfordert und `Callback` kann mit einem Eintrag aufgerufen werden, der aus der Liste gefiltert wird. Die Verwendung von `event.preventDefault()` verhindert, dass die App das erste Zertifikat aus dem Store verwendet.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Event: 'login'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `request` Object
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Wird ausgelöst wenn `webContents` grundlegende Authentifizierung durchführen will.

Standardmäßig werden alle Authentifizierungen abgebrochen. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>killed` Boolean

Emittiert wenn ein GPU Prozess crashed oder mit Gewalt beendet wird.

### Event: 'renderer-process-crashed'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### Event: 'accessibility-support-changed' _macOS_ _Windows_

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### Event: 'session-created'

Rückgabewert:

* `session` [Session](session.md)

Emittiert wenn Electron eine neue `Session` erstellt.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Event: 'second-instance'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>argv` String[] - An array of the second instance's command line arguments
* `workingDirectory` String - The second instance's working directory

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### Event: 'remote-require'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-global'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-builtin'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-current-window'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-current-web-contents'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-guest-web-contents'

Rückgabewert:

* ` Ereignis </ 0>  Ereignis</li>
<li><code>webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

## Methoden

Das `app` Objekt enthält die folgenden Methoden:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

### `app.quit()`

Versucht sämtliche Fenster zu schließen. Das `before-quit` Ereignis wird zuerst aufgerufen. Wurden alle Fenster erfolgreich geschlossen, wird das `will-quit` Ereignis aufgerufen und die Anwendung wird standardmäßig terminiert.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (optional)
  * `execPath` String (optional)

Relaunches the app when current instance exits.

By default, the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Gibt `Boolean` - `true` zurück, wenn Electron das Initialisieren beendet hat, ansonsten `false`.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

Blendet alle Anwendungsfenster aus ohne sie zu minimieren.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

You can request the following paths by the name:

* `home` Des Benutzers Home Verzeichnis.
* `appData` Per-user application data directory, which by default points to:
  * `%APPDATA%` in Windows
  * `$XDG_CONFIG_HOME` oder `~/.config` in Linux
  * `~/Library/Application Support` in macOS
* `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
* `temp` Temporäres Verzeichnis.
* `exe` Die aktuell ausführbare Datei.
* `module` Die `libchromiumcontent` Bibliothek.
* `desktop` Das Desktop Verzeichnis des aktuellen Benuters.
* `documents` Directory for a user's "My Documents".
* `downloads` "Downloads" Verzeichnis des aktuellen Benutzers.
* `music` Musik Verzeichnis des aktuellen Benutzers.
* `pictures` Bilder Verzeichnis des aktuellen Benutzers.
* `videos` Filme Verzeichnis des aktuellen Benutzers.
* `logs` Verzeichnis für die Logfiles deiner App.
* `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * ` Fehler </ 0> Fehler</li>
<li><code>icon` [NativeImage](native-image.md)

Ruft das zugeordnete Symbol eines Pfades ab.

On _Windows_, there are 2 kinds of icons:

* Icons welche den verschiedenen Dateiendungen zugeordnet sind, wie `.mp3`, `.png`, usw.
* Icons welche in der Datei selbst stecken, wie `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

**[Deprecated Soon](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Ruft das zugeordnete Symbol eines Pfades ab.

In _Windows_ gibt es zwei arten von Icons:

* Icons welche den verschiedenen Dateiendungen zugeordnet sind, wie `.mp3`, `.png`, usw.
* Icons welche in der Datei selbst stecken, wie `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` String

Überschreibt den Namen der aktuellen Anwendung.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Leere die zuletzt verwendete Dokumenten Liste.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - The name of your protocol, without `://`.
* `path` String (optional) _Windows_ - Defaults to `process.execPath`
* `args` String[] (optional) _Windows_ - Defaults to an empty array

Gibt `Boolean` zurück

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Array mit `Task` Objekten

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` Ein Array mit [`Task`](structures/task.md) Objekten.

Returns `Boolean` - Whether the call succeeded.

**Hinweis:** Wenn du die Jump List weiter anpassen möchtest, dann verwende statt dessen die `app.setJumpList(categories)`.

### `app.getJumpListSettings()` _Windows_

Gibt das `Object` zurück:

* `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) oder `null` - Array mit `JumpListCategory` Objekten.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - Nichts ist schief gelaufen.
* `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
* `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Hinweis:** Wenn ein `JumpListCategory` Objekt weder den `type` noch die `name` Eigenschaft gesetzt hat, wird sein `type` als `tasks` angenommen. Wenn die Eigenschaft `name` gesetzt ist, aber die Eigenschaft `type` weggelassen wird, dann wird angenommen, dass die Eigenschaft `type` `custom` ist.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Hier ist ein einfaches Beispiel, wie man eine eigene Jump List anlegt:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Gibt `Boolean` zurück

The return value of this method indicates whether or not this instance of your application successfully obtained the lock.  If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading.  It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.{app}.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Gibt `Boolean` zurück

This method returns whether or not this instance of your app is currently holding the single instance lock.  You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - Uniquely identifies the activity. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` _macOS_

Returns `String` - Typ der aktuell laufenden Aktivität.

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - Uniquely identifies the activity. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Uniquely identifies the activity. Maped auf [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` _Windows_

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - Pfad zur pkcs12 Datei.
  * `password` String - Passphrase des Zertifikats.
* `callback` Function
  * `result` Integer - Resultat des Imports.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Schaltet die Hardware Beschleunigung für die aktuelle App ab.

Diese Methode kann nur vor dem Start der App aufgerufen werden.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

Diese Methode kann nur vor dem Start der App aufgerufen werden.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:
```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```
Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` _Linux_

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Gibt das `Object` zurück:

* `openAtLogin` Boolean - `true` wenn die App definiert wurde, sich bei Login zu öffnen.
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. Ein Beispiel:

``` javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[Deprecated Soon](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (optional) - Der Name der App.
  * `applicationVersion` String (optional) - Die Version der App.
  * `copyright` String (optional) - Copyright Information.
  * `version` String (optional) - The app's build version number. _macOS_
  * `credits` String (optional) - Credit information. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

Set the about panel options. This will override the values defined in the app's `.plist` file on MacOS. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details. On Linux, values must be set in order to be shown; there are no defaults.

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** This will not affect `process.argv`. The intended usage of this function is to control Chromium's behavior.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - A command-line switch

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - A command-line switch

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

### `app.enableSandbox()` _Experimental_

Aktiviert den vollen Sandbox-Modus auf der App.

Diese Methode kann nur vor dem Start der App aufgerufen werden.

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Kann `critical` oder `informational` sein. Standard ist `informational`

Returns `Integer` an ID representing the request.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` _macOS_

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` _macOS_

Returns `String` - The badge string of the dock.

### `app.dock.hide()` _macOS_

Versteckt das dock icon.

### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Legt das App [Dock-Menü](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) fest.

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Setzt das `image` welches als Dock Icon verwendet werden soll.

## Eigenschaften

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

Eine `Boolean` Eigenschaft, die `true` zurückgegeben, wenn die App gepackt ist, ansonsten `false`. Für viele Apps kann diese Eigenschaft verwendet werden, um Entwicklungs- und Produktionsumgebungen zu unterscheiden.

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).

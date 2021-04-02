# app

> Kontrolliere den Ereignisverlauf deiner Anwendung.

Prozess: [Main](../glossary.md#main-process)

Das folgende Beispiel zeigt, wie die Applikation beendet wird, wenn das letzte Fenster geschlossen wurde:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## Ereignisse

Das `app` Objekt stellt folgende Event zur Verfügung:

### Event: 'will-finish-launching'

Wird ausgelöst wenn die Anwendung den grundlegenenden Start abgeschlossen hat. Unter Windows und Linux, hat das `will-finish-launching`-Ereignis das gleiche Verhalten wie das `ready`-Event; unter macOS, repräsentiert dieses Event die `applicationWillFinishLaunching`-Benachrichtung von `NSApplication`. In der Regel würden hier Listener für die Events `open-file` und `open-url` registriert und der Crash Reporter und Auto-Updater gestartet werden.

In den meisten Fällen, sollte man alles im `ready` Eventhandler machen.

### Event: 'ready'

Rückgabewert:

* `event` Event
* `launchInfo` Rekord<string, any> | [NotificationResponse](structures/notification-response.md) _macOS-_

Wird einmal ausgesendet, wenn Electron die Initialisierung beendet hat. Unter macOS enthält `launchInfo` die `userInfo` der `NSUserNotification` oder Informationen aus [`UNNotificationResponse`](structures/notification-response.md) , die zum Öffnen der -Anwendung verwendet wurde, wenn sie von Notification Center gestartet wurde. Sie können auch `app.isReady()` um zu prüfen, ob dieses Ereignis bereits ausgelöst wurde und `app.whenReady()` um ein Promise zu initialisieren, das ausgeführt wird, wenn Electron initialisiert wird.

### Event: 'window-all-closed'

Wird gefeuert, wenn alle Fenster geschlossen wurden.

Wenn du keinen einzigen Listener für dieses Event nutzt und alle Fenster geschlossen sind, ist die standardmäßige Handhabung des Events das Beenden der App. Wenn du allerdings auf das Event hörst, hast du die Kontrolle darüber, ob die App beendet werden soll oder nicht. Wenn entweder der Nutzer durch Drücken von `Cmd + Q` oder der Entwickler durch einen Aufruf von `app.quit()` die App zum Beenden bewegt, wird Electron zuerst versuchen alle Fenster zu schließen und danach erst das `will-emit` auslösen. In einem solchen Fall wird das `window-all-closed` Event übrigens überhaupt nicht ausgelöst.

### Event: 'before-quit'

Rückgabewert:

* `event` Event

Ausgelöst, bevor sich die Fenster der Anwendung schließen. Ein Aufruf von `event.preventDefault()` verhindert das Standardverhalten, welches die Anwendung schließt.

**Wichtig**: Wenn das Beenden der App durch einen Aufruf von `autoUpdater.quitAndInstall()` initiiert wurde, wird das `before-quit` Event *nach* der Auslösung aller `close` Events für alle Fenster ausgelöst und diese werden geschlossen.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'before-quit'

Rückgabewert:

* `event` Event

Ausgelöst, wenn alle Fenster geschlossen sind und sich die Anwendung beenden wird. Ein Aufruf von `event.preventDefault()` verhindert das Standardverhalten, welches die Anwendung schließt.

Schau dir die Beschreibung/Dokumentation des `window-all-closed` Events an um die Unterschiede zwischen dem `will-quit` und dem `window-all-closed` Event zu verstehen.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'quit'

Rückgabewert:

* `event` Event
* `exitCode` Integer

Wird ausgelöst wenn die App beendet wird.

**Hinweis:** Wenn die Anwendung unter Windows beendet wird, weil das System heruntergefahren oder neu gestartet wird oder der Benutzer sich abmeldet, wird dieses Event nicht ausgelöst.

### Event: 'open-file' _macOS_

Rückgabewert:

* `event` Event
* `path` String

Wird ausgelöst wenn der Nutzer versucht eine Datei mit der App zu öffnen. The `open-file` Event wird auch ausgelöst wenn die App bereits offen ist und das Betriebssystem die App nochmal zum Öffnen einer Datei benutzen will. `open-file` wird auch ausgelöst wenn eine Datei auf das Dock-Icon der App gezogen wird (macOS) und die App noch nicht gestartet ist. Behandle das `open-file` Event so früh wie möglich in deiner App um diesen Fall zu berücksichtigen (Also definitiv bevor das `ready` Event ausgelöst wird).

Du musst `event.preventDefault()` aufrufen um dieses Event selbst zu nutzen.

In Windows musst du `process.argv` (im Main-Prozess) parsen, um den Dateipfad zu erhalten.

### Event: 'open-url' _macOS_

Rückgabewert:

* `event` Event
* `url` String

Wird ausgelöst wenn der Nutzer versucht, eine URL mit der App zu öffnen. Die `Info.plist` Datei Ihrer Anwendung muss das URL-Schema innerhalb des `CFBundleURLTypes` Schlüssels definieren und `NSPrincipalClass` auf `AtomApplication`festlegen.

Du musst `event.preventDefault()` aufrufen um dieses Event selbst zu nutzen.

### Event: 'activate' _macOS_

Rückgabewert:

* `event` Event
* `hasVisibleWindows` Boolean

Wird ausgelöst wenn die App aktiviert wird. Eine ganze Menge an Aktionen können dieses Event auslösen. So zum Beispiel das Starten der App zum ersten mal als solches, eine Wiederbenutzung der App während sie bereits läuft oder einfach ein Klick auf das Dock oder Tastbar Icon der App.

### Veranstaltung: 'did-become-active' _macOS_

Rückgabewert:

* `event` Event

Emittiert, wenn mac-Anwendung aktiv wird. Der Unterschied zu `activate` Ereignis besteht darin, dass `did-become-active` jedes Mal, wenn die App aktiv wird, und nicht nur , wenn auf das Dock-Symbol geklickt oder die Anwendung neu gestartet wird,  ausgesendet wird.

### Event: 'continue-activity' _macOS_

Rückgabewert:

* `event` Event
* `type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`][activity-type].
* `userInfo` Object - Enthält den app-spezifischen Zustand, der von einer Aktivität auf einem anderen Gerät gespeichert wurde.

Wird während [Handoff][handoff] ausgelöst, wenn eine Aktivität von einem anderen Gerät wieder aufgenommen werden soll. Du solltest `event.preventDefault()` aufrufen wenn du dieses Event verwenden willst.

Eine Benutzeraktivität kann nur in einer App fortgesetzt werden, die die gleiche Entwicklerteam-ID als die Quell-App der Aktivität hat und den Typ der Aktivität unterstützt. Unterstützte Aktivitätstypen werden in den `Info.plist` der App unter dem `NSUserActivityTypes` -Schlüssel angegeben.

### Event: 'will-continue-activity' _macOS_

Rückgabewert:

* `event` Event
* `type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`][activity-type].

Wird während [Handoff][handoff] ausgelöst, bevor eine Aktivität von einem anderen Gerät wieder aufgenommen werden soll. Du solltest `event.preventDefault()` aufrufen wenn du dieses Event verwenden willst.

### Event: 'continue-activity-error' _macOS_

Rückgabewert:

* `event` Event
* `type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`][activity-type].
* `error` String - Ein String mit der lokalisierten Beschreibung des Fehlers.

Wird während [Handoff][handoff] ausgelöst, wenn eine Aktivität von einem anderen Gerät nicht wieder aufgenommen werden kann.

### Ereignis: 'activity-was-continued' _macOS_

Rückgabewert:

* `event` Event
* `type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Enthält app-spezifischen Zustand, der von der Aktivität gespeichert wird.

Wird während [Handoff][handoff] ausgelöst, wenn eine Aktivität von diesem Gerät auf einem anderen Gerät erfolgreich fortgesetzt wurde.

### Event: 'update-activity-state' _macOS_

Rückgabewert:

* `event` Event
* `type` String - Ein string zum identifizieren einer Aktivität. Maped auf [`NSUserActivity.activityType`][activity-type].
* `userInfo` unknown - Enthält app-spezifischen Zustand, der von der Aktivität gespeichert wird.

Wird ausgelöst wenn [Handoff][handoff] auf einem anderen Gerät fortgesetzt wird. Wenn Sie den zu übertragenden Status aktualisieren müssen, sollten Sie `event.preventDefault()` sofort aufrufen, ein neues `userInfo-Wörterbuch` erstellen und `app.updateCurrentActivity()` zeitnah aufrufen. Andernfalls schlägt der Vorgang fehl, und `continue-activity-error` wird aufgerufen.

### Event: 'new-window-for-tab' _macOS_

Rückgabewert:

* `event` Event

Emittiert, wenn der Benutzer auf die neue Registerkarte macOS mit systemeigenem MacOS klickt. Die neue -Registerkarte ist nur sichtbar, wenn die aktuelle `BrowserWindow` eine `tabbingIdentifier`

### Event: 'browser-window-blur'

Rückgabewert:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emittiert, wenn ein [BrowserWindow](browser-window.md) verschwommen wird.

### Event: 'browser-window-focus'

Rückgabewert:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emittiert wenn ein [browserWindow](browser-window.md) in den Fokus kommt.

### Event: 'browser-window-created'

Rückgabewert:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Emittiert wenn ein neues [browserWindow](browser-window.md) erstellt wird.

### Event: 'web-contents-created'

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emittiert wen ein neues [webContents](web-contents.md) erstellt wird.

### Event: 'certificate-error'

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - Der error code
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

* `event` Event
* `webContents` [WebContents](web-contents.md)
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

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `authenticationResponseDetails` -Objekt
  * `url` URL
* `authInfo` -Objekt
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (optional)
  * `password` String (optional)

Wird ausgelöst wenn `webContents` grundlegende Authentifizierung durchführen will.

Standardmäßig werden alle Authentifizierungen abgebrochen. Um dies zu überschreiben, sollten Sie das Standardverhalten bei `event.preventDefault()` verhindern und `callback(username, password)` mit den Anmeldeinformationen aufrufen.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

Wenn `callback` ohne Benutzernamen oder Kennwort aufgerufen wird, wird die Authentifizierungsanforderung abgebrochen, und der Authentifizierungsfehler wird an die -Seite zurückgegeben.

### Event: 'gpu-info-update'

Wird angezeigt, wenn ein GPU-Infoupdate vorhanden ist.

### Ereignis: 'gpu-process-crashed' _veraltete_

Rückgabewert:

* `event` Event
* `killed` Boolean

Emittiert, wenn der GPU-Prozess abstürzt oder abstürzt.

**deprecated:** Dieses Ereignis wird durch das ereignis- `child-process-gone` ersetzt das weitere Informationen darüber enthält, warum der untergeordnete Prozess verschwunden ist. Ist es nicht immer, wenn es abgestürzt ist. Der Boolesche Wert `killed` kann ersetzt werden durch Überprüfung von `reason === 'killed'`, wenn Sie zu diesem Ereignis wechseln.

### Ereignis: 'renderer-process-crashed' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emittiert, wenn der Rendererprozess von `webContents` abstürzt oder getötet wird.

**Deprecated:** Dieses Ereignis wird durch das `render-process-gone` -Ereignis ersetzt das weitere Informationen darüber enthält, warum der Renderprozess verschwunden ist. Ist es nicht immer, wenn es abgestürzt ist.  Der Boolesche Wert `killed` kann ersetzt werden durch Überprüfung von `reason === 'killed'`, wenn Sie zu diesem Ereignis wechseln.

### Ereignis: 'render-process-gone'

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `details` -Objekt
  * `reason` String - Der Grund, warum der Renderprozess vorgangslos ist.  Mögliche werte:
    * `clean-exit` - Prozess mit einem Exit-Code von Null beendet
    * `abnormal-exit` - Prozess mit einem Exit-Code ungleich Null beendet
    * `killed` - Prozess wurde ein SIGTERM gesendet oder auf andere Weise extern getötet
    * `crashed` - Prozess abgestürzt
    * `oom` - Prozess läuft nicht mehr auf
    * `launch-failed` - Prozess nie erfolgreich gestartet
    * `integrity-failure` - Fehler bei Windows-Codeintegritätsprüfungen
  * `exitCode` Ganzzahl - Der Exitcode des Prozesses, es sei denn, `reason` `launch-failed`ist, in diesem Fall ist `exitCode` ein plattformspezifischer Fehlerfehlercode.

Emittiert, wenn der Rendererprozess unerwartet verschwindet.  Dies ist normalerweise , weil es abgestürzt oder getötet wurde.

### Veranstaltung: 'Child-Process-gone'

Rückgabewert:

* `event` Event
* `details` -Objekt
  * `Typ` String - Prozess-Typ. Einer der folgenden Werte:
    * `Utility`
    * `Zygote`
    * `Sandbox helper`
    * `GPU`
    * `Pepper Plugin`
    * `Pepper Plugin Broker`
    * `Unknown`
  * `reason` String - Der Grund, warum der untergeordnete Prozess weg ist. Mögliche werte:
    * `clean-exit` - Prozess mit einem Exit-Code von Null beendet
    * `abnormal-exit` - Prozess mit einem Exit-Code ungleich Null beendet
    * `killed` - Prozess wurde ein SIGTERM gesendet oder auf andere Weise extern getötet
    * `crashed` - Prozess abgestürzt
    * `oom` - Prozess läuft nicht mehr auf
    * `launch-failed` - Prozess nie erfolgreich gestartet
    * `integrity-failure` - Fehler bei Windows-Codeintegritätsprüfungen
  * `exitCode` -Nummer - Der Exit-Code für den Prozess (z.B. Status von waitpid if on posix, von GetExitCodeProcess unter Windows).
  * `serviceName` String (optional) - Der nicht lokalisierte Name des Prozesses.
  * `name` String (optional) - Der Name des Prozesses. Beispiele für Dienstprogramme: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`usw.

Emittiert, wenn der untergeordnete Prozess unerwartet verschwindet. Dies ist normalerweise , weil es abgestürzt oder getötet wurde. Sie enthält keine Rendererprozesse.

### Event: 'accessibility-support-changed' _macOS_ _Windows_

Rückgabewert:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` , wenn die Unterstützung für die Barrierefreiheit von Chrome aktiviert ist, `false` andernfalls.

Emittiert, wenn sich die Barrierefreiheitsunterstützung von Chrome ändert. Dieses Ereignis wird ausgelöst, wenn unterstützende Technologien, z. B. Bildschirmleseprogramme, aktiviert oder deaktiviert werden. Weitere Details finden Sie in https://www.chromium.org/developers/design-documents/accessibility.

### Event: 'session-created'

Rückgabewert:

* `session` [Session](session.md)

Emittiert wenn Electron eine neue `Session` erstellt.

```javascript
const { app } = require('electron')

app.on('session-created', (session) =>
  console.log(session)
)
```

### Event: 'second-instance'

Rückgabewert:

* `event` Event
* `argv` String[] - Ein Array der Befehlszeilenargumente der zweiten Instanz
* `workingDirectory` String - Arbeitsverzeichnis der zweiten Instanz

Dieses Ereignis wird innerhalb der primären Instanz Ihrer Anwendung , wenn eine zweite Instanz ausgeführt wurde, und ruft `app.requestSingleInstanceLock()`auf.

`argv` ist ein Array der Befehlszeilenargumente der zweiten Instanz, und `workingDirectory` ist sein aktuelles Arbeitsverzeichnis. In der Regel reagieren Anwendungen darauf, indem sie ihr primäres Fenster fokussiert und nicht minimiert.

**Hinweis:** Wenn die zweite Instanz von einem anderen Benutzer als der ersten gestartet wird, enthält das `argv` -Array die Argumente nicht.

Dieses Ereignis wird garantiert nach dem `ready` Ereignis der `app` emittiert wird.

**Hinweis:** Zusätzliche Kommandozeilenargumente könnten von Chromium hinzugefügt werden, wie `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emittiert, wenn `desktopCapturer.getSources()` im Rendererprozess von `webContents`aufgerufen wird. Wenn `event.preventDefault()` ruft, werden leere Quellen zurückgegeben.

### Ereignis: 'Remote-require' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emittiert, wenn `remote.require()` im Rendererprozess von `webContents`aufgerufen wird. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Veranstaltung: 'remote-get-global' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emittiert, wenn `remote.getGlobal()` im Rendererprozess von `webContents`aufgerufen wird. Wenn `event.preventDefault()` aufgerufen wird, wird verhindert, dass die globale Zurückgegebenwerden. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-builtin' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emittiert, wenn `remote.getBuiltin()` im Rendererprozess von `webContents`aufgerufen wird. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Ereignis: 'remote-get-current-window' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emittiert, wenn `remote.getCurrentWindow()` im Rendererprozess von `webContents`aufgerufen wird. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

### Event: 'remote-get-current-web-contents' _veraltete_

Rückgabewert:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emittiert, wenn `remote.getCurrentWebContents()` im Rendererprozess von `webContents`aufgerufen wird. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

## Methoden

Das `app` Objekt enthält die folgenden Methoden:

**Hinweis:** Manche Methoden sind nur auf spezifischen Betriebssystemen verfügbar und sind dementsprechend gekennzeichnet.

### `app.quit()`

Versucht sämtliche Fenster zu schließen. Das `before-quit` Ereignis wird zuerst aufgerufen. Wurden alle Fenster erfolgreich geschlossen, wird das `will-quit` Ereignis aufgerufen und die Anwendung wird standardmäßig terminiert.

Diese Methode garantiert, dass alle `beforeunload` - und `unload` -Ereignishandler ordnungsgemäß ausgeführt werden. Es ist möglich, dass ein Fenster das Beenden abbricht, indem `false` im `beforeunload` -Ereignishandler zurückgibt.

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

Beendet sofort mit `exitCode`. `exitCode` ist standardmäßig 0.

Alle Fenster werden sofort geschlossen, ohne den Benutzer zu fragen, und die `before-quit` und `will-quit` Ereignisse werden nicht angezeigt.

### `app.relaunch([options])`

* `options` Objekt (optional)
  * `args` String[] (optional)
  * `execPath` String (optional)

Startet die App neu, wenn die aktuelle Instanz beendet wird.

Standardmäßig verwendet die neue Instanz dasselbe Arbeitsverzeichnis und dieselbe Befehlszeile Argumente mit der aktuellen Instanz. Wenn `args` angegeben ist, wird die `args` stattdessen als Befehlszeilenargumente übergeben. Wenn `execPath` angegeben ist, wird der `execPath` für den Neustart anstelle der aktuellen App ausgeführt.

Beachten Sie, dass diese Methode die App nicht beendet, wenn sie ausgeführt wird, Sie müssen `app.quit` oder `app.exit` aufrufen, nachdem Sie `app.relaunch` aufgerufen haben, um die App neu zu starten.

Wenn `app.relaunch` mehrmals aufgerufen wird, werden mehrere Instanzen gestartet, nachdem die aktuelle Instanz beendet wurde.

Ein Beispiel für das sofortige Neustarten der aktuellen Instanz und das Hinzufügen eines neuen Befehls -Zeilenarguments zur neuen Instanz:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Gibt `Boolean` - `true` zurück, wenn Electron das Initialisieren beendet hat, ansonsten `false`. Siehe auch `app.whenReady()`.

### `app.whenReady()`

Gibt `Promise<void>` zurück - erfüllt, wenn Electron initialisiert wird. Kann als bequeme Alternative zum Überprüfen `app.isReady()` und Abonnieren des `ready` -Ereignisses verwendet werden, wenn die App noch nicht bereit ist.

### `app.focus([options])`

* `options` Objekt (optional)
  * `steal` Boolean _macOS_ - Machen Sie den Empfänger zur aktiven App, auch wenn eine andere App derzeit aktiv .

Konzentriert sich unter Linux auf das erste sichtbare Fenster. Macht unter macOS die Anwendung die aktive App. Konzentriert sich unter Windows auf das erste Fenster der Anwendung.

Du solltest versuchen, die `steal` Option so selten wie möglich zu verwenden.

### `app.hide()` _macOS_

Blendet alle Anwendungsfenster aus ohne sie zu minimieren.

### `app.show()` _macOS_

Zeigt Anwendungsfenster an, nachdem sie ausgeblendet wurden. Konzentriert sich nicht automatisch sie.

### `app.setAppLogsPath([path])`

* `path` String (optional) - Ein benutzerdefinierter Pfad für Ihre Protokolle. Muss absolut sein.

Legt die Protokolle Ihrer App fest oder erstellt sie, die dann mit `app.getPath()` oder `app.setPath(pathName, newPath)`bearbeitet werden können.

Wenn Sie `app.setAppLogsPath()` ohne `path` Parameter aufrufen, wird dieses Verzeichnis auf _macOS-_und im `userData` -Verzeichnis auf _Linux-_ und _Windows-_auf `~/Library/Logs/YourAppName` gesetzt.

### `app.getAppPath()`

Gibt `String` zurück - Das aktuelle Anwendungsverzeichnis.

### `app.getPath(name)`

* `name` String - Sie können die folgenden Pfade anhand des Namens anfordern:
  * `home` Des Benutzers Home Verzeichnis.
  * `appData` Anwendungsdatenverzeichnis pro Benutzer, das standardmäßig auf:
    * `%APPDATA%` in Windows
    * `$XDG_CONFIG_HOME` oder `~/.config` in Linux
    * `~/Library/Application Support` in macOS
  * `userData` Das Verzeichnis zum Speichern der Konfigurationsdateien Ihrer App, standardmäßig das `appData` Verzeichnis ist, das an den Namen Ihrer App angehängt wird.
  * `Cache`
  * `temp` Temporäres Verzeichnis.
  * `exe` Die aktuell ausführbare Datei.
  * `module` Die `libchromiumcontent` Bibliothek.
  * `desktop` Das Desktop Verzeichnis des aktuellen Benuters.
  * `documents` Verzeichnis für die "Meine Dokumente" eines Benutzers.
  * `downloads` "Downloads" Verzeichnis des aktuellen Benutzers.
  * `music` Musik Verzeichnis des aktuellen Benutzers.
  * `pictures` Bilder Verzeichnis des aktuellen Benutzers.
  * `videos` Filme Verzeichnis des aktuellen Benutzers.
  * `recent` Verzeichnis für die letzten Dateien des Benutzers (nur Windows).
  * `logs` Verzeichnis für die Logfiles deiner App.
  * `crashDumps` Verzeichnis, in dem Absturzabbilder gespeichert werden.

Gibt `String` zurück : Ein Pfad zu einem speziellen Verzeichnis oder einer Datei, die `name`zugeordnet ist. Bei Fehler wird ein `Error` geworfen.

Wenn `app.getPath('logs')` aufgerufen wird, ohne dass zuerst `app.setAppLogsPath()` aufgerufen wird, wird ein Standardprotokollverzeichnis erstellt, das `app.setAppLogsPath()` ohne `path` Parameter aufruft.

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Objekt (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 in _Linux_, 32x32 in _Windows_, wird in _macOS_ nicht unterstützt.

Gibt `Promise<NativeImage>` zurück - erfüllt mit dem App-Symbol, das ein [NativeImage-](native-image.md)ist.

Ruft das zugeordnete Symbol eines Pfades ab.

In _Windows_ gibt es zwei arten von Icons:

* Icons welche den verschiedenen Dateiendungen zugeordnet sind, wie `.mp3`, `.png`, usw.
* Icons welche in der Datei selbst stecken, wie `.exe`, `.dll`, `.ico`.

Auf _Linux-_ und _macOS-_hängen Symbole von der Anwendung ab, die dem Datei-Mime-Typ zugeordnet ist.

### `app.setPath(name, path)`

* `name` String
* `path` String

Überschreibt die `path` in ein spezielles Verzeichnis oder eine Datei, die `name`zugeordnet ist. Wenn der Pfad ein Verzeichnis angibt, das nicht vorhanden ist, wird ein `Error` ausgelöst. In diesem Fall sollte das Verzeichnis mit `fs.mkdirSync` oder ähnlichem erstellt werden.

Sie können nur Pfade eines `name` außer Kraft setzen, die in `app.getPath`definiert sind.

Standardmäßig werden die Cookies und Caches der Webseiten unter dem Verzeichnis `userData` gespeichert. Wenn Sie diesen Speicherort ändern möchten, müssen Sie den `userData` Pfad überschreiben, bevor das `ready` Ereignis des `app` Moduls ausgesendet wird.

### `app.getVersion()`

Gibt `String` zurück - Die Version der geladenen Anwendung. Wenn in der `package.json` -Datei der Anwendung keine Version gefunden wird, wird die Version des aktuellen Pakets oder ausführbaren Datei zurückgegeben.

### `app.getName()`

Gibt `String` zurück : Der Name der aktuellen Anwendung, d. h. der Name in der `package.json` Datei der Anwendung.

Normalerweise ist das `name` Feld von `package.json` ein kurzer Kleinbuchstabenname, entsprechend der npm-Module-Spezifikation. In der Regel sollten Sie auch ein `productName` Feld angeben, das der vollständige großgeschriebene Name Ihrer Anwendung ist und das `name` von Electron bevorzugt wird.

### `app.setName(name)`

* `name` String

Überschreibt den Namen der aktuellen Anwendung.

**Hinweis:** Diese Funktion überschreibt den Namen, der intern von Electron verwendet wird; Sie hat keinen Einfluss auf den Namen, den das Betriebssystem verwendet.

### `app.getLocale()`

Gibt `String` zurück - Das aktuelle Anwendungsgebietsschema. Mögliche Rückgabewerte werden hier [](locales.md)dokumentiert.

Um das Gebietsschema festzulegen, sollten Sie beim App-Start einen Befehlszeilenschalter verwenden, der [hier](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md)zu finden ist.

**Hinweis:** Wenn Sie Ihre verpackte App verteilen, müssen Sie auch den Ordner `locales` versenden.

**Hinweis:** unter Windows müssen Sie es aufrufen, nachdem die `ready` Ereignisse ausgegeben werden.

### `app.getLocaleCountryCode()`

Gibt `String` zurück - Gebietsschema des Benutzerbetriebssystems mit zwei Buchstaben [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) Ländercode. Der Wert wird von systemeigenen OS-APIs übernommen.

**Hinweis:** Wenn der Gebietsschemacode nicht erkannt werden kann, gibt er eine leere Zeichenfolge zurück.

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

Fügt der Liste der letzten Dokumente `path` hinzu.

Diese Liste wird vom Betriebssystem verwaltet. Unter Windows können Sie die Liste über die Task- -Leiste und unter macOS über das Dockmenü aufrufen.

### `app.clearRecentDocuments()` _macOS_ _Windows_

Leere die zuletzt verwendete Dokumenten Liste.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Der Name Ihres Protokolls, ohne `://`. Wenn Sie beispielsweise , wenn Ihre App `electron://` Verknüpfungen verarbeiten soll, rufen Sie diese Methode mit `electron` als Parameter auf.
* `path` String (optional) _Windows_ - Der Pfad zur ausführbaren Electron-Datei. Standardwerte für `process.execPath`
* `args` String[] (optional) _Windows_ - Argumente, die an die ausführbare Datei übergeben werden. Standardwerte für ein leeres Array

Gibt `Boolean` zurück - Gibt an, ob der Aufruf erfolgreich war.

Legt die aktuelle ausführbare Datei als Standardhandler für ein Protokoll fest (auch URI Schema). Es ermöglicht Ihnen, Ihre App tiefer in das Betriebssystem zu integrieren. Nach der Registrierung werden alle Links mit `your-protocol://` mit dem aktuellen ausführbaren Datei geöffnet. Der gesamte Link, einschließlich des Protokolls, wird als Parameter an Ihre -Anwendung übergeben.

**Hinweis:** unter macOS können Sie nur Protokolle registrieren, die `info.plist`Ihrer App hinzugefügt wurden und zur Laufzeit nicht geändert werden können. Sie können die Datei jedoch während der Buildzeit über [Electron Forge][electron-forge]ändern, [Electron Packager][electron-packager]oder `info.plist` mit einem Text- -Editor bearbeiten. Weitere Informationen finden Sie in [][CFBundleURLTypes] der Apple-Dokumentation.

**Hinweis:** In einer Windows Store-Umgebung (wenn sie als `appx`verpackt ist), gibt diese API- `true` für alle Aufrufe zurück, aber der registrierungswichtige, den sie festlegt, ist anderer Anwendungen nicht verfügbar.  Um Ihre Windows Store-Anwendung als Standardprotokollhandler zu registrieren, müssen Sie das Protokoll in Ihrem Manifest</a>

deklarieren.</p> 

Die API verwendet die Windows-Registrierung und `LSSetDefaultHandlerForURLScheme` intern.



### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - Der Name Ihres Protokolls, ohne `://`.
* `path` String (optional) _Windows_ - Standardwerte für `process.execPath`
* `args` String[] (optional) _Windows_ - Standardwerte für ein leeres Array

Gibt `Boolean` zurück - Gibt an, ob der Aufruf erfolgreich war.

Diese Methode überprüft, ob die aktuelle ausführbare Datei als Standardhandler für ein Protokoll (auch URI-Schema) ist. Wenn dies der Zuspruch bereits der Falle ist, wird die App als Standardhandler entfernt.



### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - Der Name Ihres Protokolls, ohne `://`.
* `path` String (optional) _Windows_ - Standardwerte für `process.execPath`
* `args` String[] (optional) _Windows_ - Standardwerte für ein leeres Array

Gibt `Boolean` zurück : Gibt an, ob die aktuelle ausführbare Datei der Standardhandler für ein Protokoll (auch uri-Schema) ist.

**Hinweis:** unter macOS können Sie mit dieser Methode überprüfen, ob die App als Standardprotokollhandler für ein Protokoll registriert wurde. Sie können dies auch überprüfen , indem Sie `~/Library/Preferences/com.apple.LaunchServices.plist` auf dem macOS-Rechner überprüfen. Weitere Informationen finden Sie in [Dokumentation von Apple][LSCopyDefaultHandlerForURLScheme] .

Die API verwendet die Windows-Registrierung und `LSCopyDefaultHandlerForURLScheme` intern.



### `app.getApplicationNameForProtocol(url)`

* `url` String - eine URL mit dem zu überprüfenden Protokollnamen. Im Gegensatz zu den anderen Methoden in dieser Familie akzeptiert dies eine gesamte URL, einschließlich `://` mit einem Minimum (z. B. `https://`).

Gibt `String` zurück : Name der Anwendung, die das Protokoll verarbeitet, oder eine leere Zeichenfolge, wenn kein Handler vorhanden ist. Wenn beispielsweise Electron der Standard- -Handler der URL ist, kann dies unter Windows und Mac `Electron` werden. sich jedoch nicht auf das genaue Format verlassen, das nicht garantiert unverändert bleibt. Erwarten Sie ein anderes Format unter Linux, möglicherweise mit einem `.desktop` Suffix.

Diese Methode gibt den Anwendungsnamen des Standardhandlers für das Protokoll (auch URI-Schema) einer URL zurück.



### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - eine URL mit dem zu überprüfenden Protokollnamen. Im Gegensatz zu den anderen Methoden in dieser Familie akzeptiert dies eine gesamte URL, einschließlich `://` mit einem Minimum (z. B. `https://`).

Gibt `Promise<Object>` zurück - Auflösen mit einem Objekt, das Folgendes enthält:

* `icon` NativeImage - das Anzeigesymbol der App, die das Protokoll verarbeitet.
* `path` String - Installationspfad der App, die das Protokoll verarbeitet.
* `name` String - Anzeigename der App, die das Protokoll verarbeitet.

Diese Methode gibt ein Versprechen zurück, das den Anwendungsnamen, das Symbol und den Pfad des Standardhandlers für das Protokoll (auch URI-Schema) einer URL enthält.



### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - Array mit `Task` Objekten

Fügt der Kategorie [Tasks][tasks] Kategorie der Sprungliste unter Windows `tasks` hinzu.

`tasks` Ein Array mit [`Task`](structures/task.md) Objekten.

Gibt `Boolean` zurück - Gibt an, ob der Aufruf erfolgreich war.

**Hinweis:** Wenn du die Jump List weiter anpassen möchtest, dann verwende statt dessen die `app.setJumpList(categories)`.



### `app.getJumpListSettings()` _Windows_

Gibt das `Object` zurück:

* `minItems` Ganzzahl - Die Mindestanzahl von Elementen, die in der -Sprungliste angezeigt werden (eine ausführlichere Beschreibung dieses Werts finden Sie in der [MSDN-Dokumente][JumpListBeginListMSDN]).

* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - Array von `JumpListItem` -Objekten, die Elementen entsprechen, die der Benutzer explizit aus benutzerdefinierten Kategorien in der Jump List entfernt hat. Diese Elemente dürfen der Sprungliste im **nächsten** Aufruf von `app.setJumpList()`nicht erneut hinzugefügt werden, Windows zeigt keine benutzerdefinierte Kategorie an, die eines der entfernten Elemente enthält.



### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - Array von `JumpListCategory` Objekten.

Legt eine benutzerdefinierte Sprungliste für die Anwendung fest oder entfernt sie und gibt eine der folgenden Zeichenfolgen zurück:

* `ok` - Nichts ist schief gelaufen.
* `error` - Ein oder mehrere Fehler sind aufgetreten, ermöglichen die Laufzeitprotokollierung, um die wahrscheinliche Ursache herauszufinden.

* `invalidSeparatorError` - Es wurde versucht, einem benutzerdefinierte Randkategorie in der Sprungliste ein Trennzeichen hinzuzufügen. Trennzeichen sind nur in der Standard- `Tasks` -Kategorie zulässig.

* `fileTypeRegistrationError` - Es wurde versucht, einen Dateilink zum der Sprungliste für einen Dateityp hinzuzufügen, für den die App nicht registriert ist.

* `customCategoryAccessDeniedError` - Benutzerdefinierte Kategorien können aufgrund von Benutzerdatenschutz- oder Gruppenrichtlinieneinstellungen nicht zur Sprungliste hinzugefügt werden.

Wenn `categories` `null` wird die zuvor festgelegte benutzerdefinierte Sprungliste (falls vorhanden) durch die Standard-Sprungliste für die App (von Windows verwaltet) ersetzt.

**Anmerkung:** Wenn eine `JumpListCategory`Objekt nie den Typ ` nie den <code>Namen ` hat Die eingestellte Funktion von seinem Typ ` ist dann als <code>tasks`wahrgenommen. Wenn die Eigenschaft `name` gesetzt ist, aber die Eigenschaft `type` weggelassen wird, dann wird angenommen, dass die Eigenschaft `type` `custom` ist.

**Hinweis:** Benutzer können Elemente aus benutzerdefinierten Kategorien entfernen, und Windows lässt nicht ein entferntes Element wieder in eine benutzerdefinierte Kategorie hinzufügen, bis **nach dem nächsten erfolgreichen Aufruf an `app.setJumpList(categories)`** . Jeder Versuch , ein entferntes Element zuvor einer benutzerdefinierten Kategorie erneut hinzuzufügen, führt dazu, dass die gesamte benutzerdefinierte Kategorie aus der Sprungliste ausgelassen wird. Die Liste der entfernten Elemente kann mit `app.getJumpListSettings()`abgerufen werden.

Hier ist ein einfaches Beispiel, wie man eine eigene Jump List anlegt:



```javascript
const { app } = require('electron')

app.setJumpList([
  '
    typ: 'custom',
    Name: 'Letzte Projekte',
    Elemente: [
      'Datei', Pfad: 'C:'Projects'project1.proj' ',
      ' 'Datei', Pfad: 'C:'Projects'project2.proj
  
    '
  ' / hat einen Namen, so dass 'Typ'
    Name 'Tools' ist,
    Elemente: [
      ,
        Typ: 'task',
        Titel: 'Tool A',
        Programm: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A
        
      
      ' : 'task',
        Titel: 'Tool B',
        Programm: process.execPath,
        args: '--run-tool-b',
        -Symbol: process.execPath,
        iconIndex: 0,
        Beschreibung: 'Läuft Tool B'
      '
    ]
  ,
  { type: 'frequent' },
  ' / hat keinen Namen und kein Typ, so dass 'Typ'
    Elemente angenommen wird: [
      -
        Typ: 'Task',
        Titel: 'Neues Projekt',
        Programm: process.execPath,
        args: '--new-project: '--new-project: ''New-Project',

      -,
      { type: 'separator' },

        Typ: 'Task',
        Titel: 'Projekt wiederherstellen',
        Programm: process.execPath,
        args: '--recover-project',
        Beschreibung: 'Projekt wiederherstellen'
      '
    ]

])
```




### `app.requestSingleInstanceLock()`

Gibt `Boolean` zurück

Der Rückgabewert dieser Methode gibt an, ob diese Instanz Ihrer Anwendung die Sperre erfolgreich erhalten hat.  Wenn die Sperre nicht erhalten wurde, können Sie davon ausgehen, dass eine andere Instanz Ihrer Anwendung bereits mit der Sperre ausgeführt wird und sofort beendet wird.

Dh. Diese Methode gibt `true` zurück, wenn ihr Prozess die primäre Instanz Ihrer Anwendung ist und Ihre App weiterhin geladen werden soll.  Es gibt `false` zurück, wenn Ihr Prozess sofort beendet werden soll, da er seine Parameter an eine andere Instanz gesendet hat, die die Sperre bereits erworben hat.

Unter macOS erzwingt das System automatisch eine einzelne Instanz, wenn Benutzer versuchen, einer zweiten Instanz Ihrer App im Finder zu öffnen, und die `open-file` und `open-url` Ereignisse werden dafür ausgegeben. Wenn Benutzer Ihre App jedoch in der Befehlszeile starten, wird der Einzelinstanzmechanismus des Systems umgangen, und Sie müssen diese Methode verwenden, um eine einzelne Instanz sicherzustellen.

Ein Beispiel für die Aktivierung des Fensters der primären Instanz, wenn eine zweite Instanz gestartet wird:



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
  app.whenReady().then()=> -
    myWindow = createWindow()
  )
.
```




### `app.hasSingleInstanceLock()`

Gibt `Boolean` zurück

Diese Methode gibt zurück, ob diese Instanz Ihrer App derzeit die EinzelneInstanzsperre besitzt.  Sie können die Sperre mit `app.requestSingleInstanceLock()` anfordern und mit `app.releaseSingleInstanceLock()`



### `app.releaseSingleInstanceLock()`

Gibt alle Sperren frei, die von `requestSingleInstanceLock`erstellt wurden. Dadurch können mehrere Instanzen der Anwendung erneut nebeneinander ausgeführt werden.



### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS-_

* `type` String - Identifiziert die Aktivität eindeutig. Maped auf [`NSUserActivity.activityType`][activity-type].

* `userInfo` - App-spezifischer Zustand, der für die Verwendung durch ein anderes Gerät gespeichert werden soll.

* `webpageURL` String (optional) - Die Webseite, die in einen Browser geladen werden soll, wenn keine geeignete App auf dem Wiederaufnahmegerät installiert . Das Schema muss `http` oder `https`sein.

Erstellt eine `NSUserActivity` und legt sie als aktuelle Aktivität fest. Die Aktivität ist für [Handoff][handoff] auf ein anderes Gerät berechtigt.



### `app.getCurrentActivityType()` _macOS-_

Returns `String` - Typ der aktuell laufenden Aktivität.



### `app.invalidateCurrentActivity()` _macOS_

Ungültig macht die aktuelle [Handoff-][handoff] Benutzeraktivität.



### `app.resignCurrentActivity()` _macOS_

Markiert die aktuelle [Handoff-][handoff] Benutzeraktivität als inaktiv, ohne sie zu deaktivieren.



### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - Identifiziert die Aktivität eindeutig. Maped auf [`NSUserActivity.activityType`][activity-type].

* `userInfo` - App-spezifischer Zustand, der für die Verwendung durch ein anderes Gerät gespeichert werden soll.

Aktualisiert die aktuelle Aktivität, wenn ihr Typ `type`übereinstimmt, und die Einträge aus `userInfo` in das aktuelle `userInfo` -Wörterbuch zusammengeführt.



### `app.setAppUserModelId(id)` _Windows_

* `id` String

Ändert die [Anwendungsbenutzermodell-ID][app-user-model-id] in `id`.



### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - Kann 'normal', 'Zubehör' oder 'verboten' sein.

Legt die Aktivierungsrichtlinie für eine bestimmte App fest.

Aktivierungsrichtlinientypen:

* 'regular' - Die Anwendung ist eine gewöhnliche App, die im Dock angezeigt wird und möglicherweise über eine Benutzeroberfläche verfügt.
* 'Zubehör' - Die Anwendung wird nicht im Dock angezeigt und hat keine Menüleiste, aber sie kann programmgesteuert oder durch Klicken auf eines ihrer Fenster aktiviert werden.
* "verboten" - Die Anwendung wird nicht im Dock angezeigt und kann keine Fenster erstellen oder aktiviert werden.



### `app.importCertificate(options, callback)` _Linux-_

* `options` -Objekt 
    * `certificate` String - Pfad zur pkcs12 Datei.
  * `password` String - Passphrase des Zertifikats.
* `callback` Function 
    * `result` Integer - Resultat des Imports.

Importiert das Zertifikat im pkcs12-Format in den Plattformzertifikatspeicher. `callback` mit dem `result` des Importvorgangs aufgerufen wird, gibt der Wert `0` den Erfolg an, während jeder andere Wert einen Fehler gemäß Chromium [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h)angibt.



### `app.disableHardwareAcceleration()`

Schaltet die Hardware Beschleunigung für die aktuelle App ab.

Diese Methode kann nur vor dem Start der App aufgerufen werden.



### `app.disableDomainBlockingFor3DAPIs()`

Standardmäßig deaktiviert Chromium 3D-APIs (z. B. WebGL) bis zum Neustart auf Domänenbasis, wenn die GPU-Prozesse zu häufig abstürzen. Diese Funktion dieses Verhalten deaktiviert.

Diese Methode kann nur vor dem Start der App aufgerufen werden.



### `app.getAppMetrics()`

Gibt [`ProcessMetric[]`](structures/process-metric.md)zurück: Array von `ProcessMetric` Objekten, die speicher- und CPU-Auslastungsstatistiken aller prozesse entsprechen, die der App zugeordnet sind.



### `app.getGPUFeatureStatus()`

Gibt [`GPUFeatureStatus`](structures/gpu-feature-status.md) zurück - Der Grafikfeaturestatus von `chrome://gpu/`.

**Hinweis:** Diese Informationen können erst nach dem `gpu-info-update` Ereignis verwendet werden.



### `app.getGPUInfo(infoType)`

* `infoType` String - Kann `basic` oder `complete`werden.

Rückgaben `Promise<unknown>`

Für `infoType` gleich `complete`: Promise wird mit `Object` erfüllt, die alle GPU-Informationen enthalten, wie im GPUInfo-Objekt</a>Chrom. Dazu gehören die Versions- und Treiberinformationen, die auf `chrome://gpu` Seite angezeigt werden.</p> 

Für `infoType` gleich `basic`: Versprechen wird mit `Object` erfüllt, die weniger Attribute enthalten, als bei `complete`angefordert werden. Hier ist ein Beispiel für grundlegende Antworten:



```js
-
  auxAttributes:

     amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpgDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0
   ,
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModel
Name: '

```


Die Verwendung `basic` sollte bevorzugt werden, wenn nur grundlegende Informationen wie `vendorId` oder `driverId` benötigt werden.



### `app.setBadgeCount([count])` _Linux_ _macOS_

* `count` Ganzzahl (optional) - Wenn ein Wert angegeben wird, legen Sie das Badge auf den angegebenen Wert fest, andernfalls zeigen Sie unter macOS einen einfachen weißen Punkt an (z. B. unbekannte Anzahl von Benachrichtigungen). Unter Linux wird das Badge nicht angezeigt, wenn kein Wert angegeben wird.

Gibt `Boolean` zurück - Gibt an, ob der Aufruf erfolgreich war.

Legt das Zähler-Badge für die aktuelle App fest. Wenn Sie die Anzahl auf `0` festlegen, wird das -Badge ausgeblendet.

Unter macOS wird es auf dem Dock-Symbol angezeigt. Unter Linux funktioniert es nur für Unity Launcher.

**Hinweis:** Unity-Start-/abstartende Datei erfordert, dass eine `.desktop` -Datei vorhanden ist, weitere Informationen finden Sie unter [Desktop-Umgebungsintegration][unity-requirement].



### `app.getBadgeCount()` _Linux_ _macOS_

Gibt `Integer` zurück - Der aktuelle Wert, der im Zähler-Badge angezeigt wird.



### `app.isUnityRunning()` _Linux_

Gibt `Boolean` zurück : Gibt an, ob die aktuelle Desktopumgebung Unity-Start- und Zielstarter ist.



### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Objekt (optional) 
    * `path` String (optional) _Windows_ - Der ausführbare Pfad, mit dem verglichen werden soll. Standardmäßig `process.execPath`.
  * `args` String[] (optional) _Windows_ - Die Befehlszeilenargumente, mit denen verglichen werden sollen. Standardmäßig wird ein leeres Array verwendet.

Wenn Sie `app.setLoginItemSettings``path` - und `args` -Optionen angegeben haben, müssen Sie hier dieselben Argumente übergeben, damit `openAtLogin` richtig eingestellt werden können.

Gibt das `Object` zurück:

* `openAtLogin` Boolean - `true` wenn die App definiert wurde, sich bei Login zu öffnen.
* `openAsHidden` boolesch _macOS_ - `true` , wenn die App beim Login als ausgeblendet geöffnet ist. Diese Einstellung ist auf [MAS-Builds][mas-builds]nicht verfügbar.

* `wasOpenedAtLogin` boolesch _macOS_ - `true` wenn die App beim Login- automatisch geöffnet wurde. Diese Einstellung ist auf [MAS-Builds][mas-builds]nicht verfügbar.

* `wasOpenedAsHidden` boolescher _macOS_ - `true` , wenn die App als verstecktes Anmeldeelement Element geöffnet wurde. Dies weist darauf hin, dass die App beim Start keine Fenster öffnen sollte. Diese Einstellung ist auf [MAS-Builds][mas-builds]nicht verfügbar.

* `restoreState` boolesche _macOS_ - `true` , wenn die App als Anmeldeelement geöffnet wurde, das den Status der vorherigen Sitzung wiederherstellen sollte. Dies weist darauf hin, dass die -App die Fenster wiederherstellen soll, die beim letzten geöffnet wurden. Diese Einstellung ist auf [MAS-Builds][mas-builds]nicht verfügbar.

* `executableWillLaunchAtLogin` boolescher _Windows_ - `true` , wenn die App beim Anmelden geöffnet ist und der Ausführungsschlüssel nicht deaktiviert ist. Dies unterscheidet sich von `openAtLogin` da die option `args` ignoriert wird, ist diese Eigenschaft wahr, wenn die angegebene ausführbare Datei bei der Anmeldung mit **** -Argumenten gestartet wird.

* `launchItems` -Objekt[] _Windows-_ 
    * `name` String _Windows_ - Namenswert eines Registrierungseintrags.
  * `path` String _Windows_ - Die ausführbare Datei für eine App, die einem Registrierungseintrag entspricht.
  * `args` String[] _Windows_ - die Befehlszeilenargumente, die an die ausführbare Datei übergeben werden sollen.
  * `scope` String _Windows_ - eine von `user` oder `machine`. Gibt an, ob der Registrierungseintrag unter `HKEY_CURRENT USER` oder `HKEY_LOCAL_MACHINE`ist.
  * `enabled` Boolean _Windows_ - `true` , wenn der App-Registrierungsschlüssel startgenehmigt ist und daher in den Task-Manager- und Windows-Einstellungen als `enabled` angezeigt wird.



### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` -Objekt 
    * `openAtLogin` Boolean (optional) - `true` , um die App bei der Anmeldung zu öffnen, `false` , app als Anmeldeelement zu entfernen. Standardmäßig `false`.
  * `openAsHidden` boolesche (optional) _macOS_ - `true` , um die App als ausgeblendet zu öffnen. Standardmäßig `false`. Der Benutzer kann diese Einstellung über die Systemeinstellungen bearbeiten, sodass `app.getLoginItemSettings().wasOpenedAsHidden` überprüft werden sollte, wenn die App geöffnet wird, geöffnet wird, um den aktuellen Wert zu kennen. Diese Einstellung ist auf [MAS-Builds][mas-builds]nicht verfügbar.
  * `path` String (optional) _Windows_ - Die ausführbare Datei, die bei der Anmeldung gestartet werden soll. Standardmäßig `process.execPath`.
  * `args` String[] (optional) _Windows_ - Die Befehlszeilenargumente, die an ausführbar übergeben werden sollen. Standardmäßig wird ein leeres Array verwendet. Achten Sie darauf, Pfade in -Zitate zu wickeln.
  * `enabled` boolescher (optional) _Windows_ - `true` ändert den vom Start genehmigten Registrierungsschlüssel und `enable / disable` app im Task-Manager und in den Windows-Einstellungen. Standardmäßig `true`.
  * `name` String (optional) _Windows_ - Wertname, der in die Registrierung geschrieben werden soll. Standardmäßig wird AppUserModelId() der App verwendet. Legen Sie die Anmeldeelementeinstellungen der App fest.

Um mit der `autoUpdater` von Electron unter Windows zu arbeiten, die [Squirrel][Squirrel-Windows]verwendet, Sie den Startpfad auf Update.exe festlegen und Argumente übergeben möchten, die Ihren Anwendungsnamen angeben. Ein Beispiel:



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

Gibt `Boolean` zurück - `true` , wenn die Barrierefreiheitsunterstützung von Chrome aktiviert ist, `false` andernfalls. Diese API gibt `true` zurück, wenn die Verwendung von unterstützenden Technologien, wie Z. B. Bildschirmlesegeräten, erkannt wurde. Weitere Details finden Sie in https://www.chromium.org/developers/design-documents/accessibility.



### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` boolesch - Aktivieren oder Deaktivieren [Eingabehilfenstruktur](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) Rendering

Ermöglicht manuell die Unterstützung für Barrierefreiheit von Chrome, sodass Benutzer in den Anwendungseinstellungen den Eingabehilfen-Switch verfügbar gemacht werden können. Weitere Details finden Sie in [](https://www.chromium.org/developers/design-documents/accessibility) der Barrierefreiheitsdokumente von Chromium. Standardmäßig deaktiviert.

Diese API muss aufgerufen werden, nachdem das `ready` Ereignis ausgesendet wurde.

**Hinweis:** -Rendering-Eingabehilfenstruktur kann die Leistung Ihrer App erheblich beeinträchtigen. Sie sollte standardmäßig nicht aktiviert werden.



### `app.showAboutPanel()`

Zeigen Sie die App über Paneloptionen an. Diese Optionen können mit `app.setAboutPanelOptions(options)`überschrieben werden.



### `app.setAboutPanelOptions(options)`

* `options` -Objekt 
    * `applicationName` String (optional) - Der Name der App.
  * `applicationVersion` String (optional) - Die Version der App.
  * `copyright` String (optional) - Copyright Information.
  * `version` String (optional) _macOS_ - Die Buildversionsnummer der App.
  * `credits` String (optional) _macOS_ _Windows_ - Kreditinformationen.
  * `authors` String[] (optional) _Linux_ - Liste der App-Autoren.
  * `website` String (optional) _Linux_ - Die Website der App.
  * `iconPath` String (optional) _Linux_ _Windows_ - Pfad zum App-Symbol in einem JPEG- oder PNG-Dateiformat. Unter Linux wird das Seitenverhältnis als 64x64 Pixel angezeigt.

Legen Sie die Optionen für das Bedienfeld fest. Dadurch werden die in der `.plist` Datei der App unter macOS definierten Werte überschrieben. Weitere Informationen finden Sie in den [Apple-Dokumenten][about-panel-options] . Unter Linux müssen Werte gesetzt werden, um angezeigt zu werden. Es gibt keine Standardeinstellungen.

Wenn Sie `credits` nicht festlegen, diese aber dennoch in Ihrer App anlegen möchten, sucht AppKit nach einer Datei mit den Namen "Credits.html", "Credits.rtf" und "Credits.rtfd" in dieser Reihenfolge in dem Paket, das von der NSBundle-Klassenmethode main zurückgegeben wird. Die erste gefundene Datei wird verwendet, und wenn keine gefunden wird, bleibt der Infobereich leer. Weitere Informationen finden Sie in der Dokumentation zu Apple [](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) .



### `app.isEmojiPanelSupported()`

Gibt `Boolean` zurück - ob die aktuelle Betriebssystemversion native Emoji-Auswahlen zulässt oder nicht.



### `app.showEmojiPanel()` _macOS_ _Windows_

Zeigen Sie den nativen Emoji-Picker der Plattform.



### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

* `bookmarkData` String - Die base64-codierten Lesezeichendaten mit Sicherheitsbereich, die von den `dialog.showOpenDialog` - oder `dialog.showSaveDialog` -Methoden zurückgegeben werden.

Gibt `Function` zurück – Diese Funktion **muss** aufgerufen werden, sobald Sie den Zugriff auf die Datei mit Sicherheitsbereich abgeschlossen haben. Wenn Sie nicht daran denken, den Zugriff auf das Lesezeichen zu beenden, werden [Kernelressourcen](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) durchgesickert, und Ihre App verliert ihre Fähigkeit, vollständig außerhalb der Sandbox zu gelangen, bis Ihre App neu gestartet wird.



```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
/ / Sie können jetzt auf die Datei außerhalb der Sandbox zugreifen 🎉

/ Denken Sie daran, den Zugriff auf die Datei zu beenden, sobald Sie damit fertig sind.
stopAccessingSecurityScopedResource()
```


Starten Sie den Zugriff auf eine Ressource mit Sicherheitsbereich. Mit dieser Methode können Electron-Anwendungen, die für den Mac App Store verpackt sind, außerhalb ihrer Sandbox greifen, um auf vom Benutzer ausgewählte Dateien zuzugreifen. Eine Beschreibung der Funktionsweise dieses Systems finden Sie in [Dokumentation von Apple](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) .



### `app.enableSandbox()`

Aktiviert den vollen Sandbox-Modus auf der App. Dies bedeutet, dass alle Renderer sandkastenweise gestartet werden, unabhängig vom Wert des `sandbox` -Flags in WebPreferences.

Diese Methode kann nur vor dem Start der App aufgerufen werden.



### `app.isInApplicationsFolder()` _macOS_

Gibt `Boolean` zurück: Gibt an, ob die Anwendung derzeit aus dem Anwendungsordner Systems ausgeführt wird. Einsatz in Kombination mit `app.moveToApplicationsFolder()`



### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Objekt (optional) 
    * `conflictHandler` -Funktion<Boolean> (optional) - Ein Handler für potenzielle Konflikte beim Verschiebungsfehler. 
        * `conflictType` String - Der Typ des Verschiebungskonflikts, auf den der Handler gestoßen ist. kann `exists` oder `existsAndRunning`sein, wobei `exists` bedeutet, dass eine App mit demselben Namen im Anwendungsverzeichnis vorhanden ist und `existsAndRunning` bedeutet, dass sie vorhanden ist und dass sie derzeit ausgeführt wird.

Gibt `Boolean` zurück - Gibt an, ob der Umzug erfolgreich war. Bitte beachten Sie, dass Ihre Anwendung beendet und neu gestartet wird, wenn der Umzug erfolgreich ist.

Standardmäßig wird kein Bestätigungsdialogangezeigt angezeigt. Wenn Sie Benutzers erlauben möchten, den Vorgang zu bestätigen, können Sie dies mithilfe der [`dialog`](dialog.md) -API tun.

**HINWEIS:** Diese Methode löst Fehler aus, wenn etwas anderes als der Benutzer dazu führt, dass die Verschiebung fehlschlägt. Wenn der Benutzer z. B. das Autorisierungsdialogfeld abbricht, gibt diese -Methode false zurück. Wenn die Kopie nicht ausgeführt wird, löst diese Methode einen Fehler aus. Die Meldung im Fehler sollte informativ sein und Ihnen genau sagen, was schief gelaufen ist.

Wenn eine App mit demselben Namen wie die verschobene App im Verzeichnis "Anwendungen" vorhanden ist und _nicht_ ausgeführt wird, wird die vorhandene App gelöscht und die aktive App an ihre Stelle verschoben. Wenn __ ausgeführt wird, übernimmt die bereits vorhandene ausgeführte App den Fokus, und die zuvor aktive App wird selbst beendet. Dieses Verhalten kann geändert werden, indem der optionale Konflikthandler zur Verfügung gestellt wird, wobei der vom Handler zurückgegebene boolesche Konflikt bestimmt, ob der Verschiebungskonflikt mit dem Standardverhalten gelöst wird.  d. h. die Rückgabe `false` stellt sicher, dass keine weiteren Maßnahmen ergriffen werden, die Rückgabe `true` führt zum Standardverhalten und zur Fortsetzung der Methode.

Ein Beispiel:



```js
app.moveToApplicationsFolder('
  conflictHandler: (conflictType) =>
    if (conflictType === 'exists') '
      return dialog.showMessageBoxSync('
        typ: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'Eine App dieses Namens existiert bereits'

  
    
'
```


Wenn eine App bereits im Benutzerverzeichnis vorhanden ist, wenn der Benutzer "Weiter verschieben" wählt, wird die Funktion mit dem Standardverhalten fortgesetzt, und die vorhandene App wird gelöscht und die aktive App an ihre Stelle verschoben.



### `app.isSecureKeyboardEntryEnabled()` _macOS_

Gibt `Boolean` zurück – ob `Secure Keyboard Entry` aktiviert ist.

Standardmäßig gibt diese API `false`zurück.



### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - Aktivieren oder Deaktivieren `Secure Keyboard Entry`

Legen Sie fest, `Secure Keyboard Entry` in Ihrer Anwendung aktiviert ist.

Durch die Verwendung dieser API können wichtige Informationen wie Kennwort und andere vertrauliche Informationen daran gehindert werden, von anderen Prozessen abgefangen zu werden.

Weitere informationen finden Sie in [Dokumentation von Apple](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) .

**Hinweis:** `Secure Keyboard Entry` nur aktivieren, wenn es benötigt wird, und deaktivieren Sie es, wenn es nicht mehr benötigt wird.



## Eigenschaften



### `app.accessibilitySupportEnabled` _macOS_ _Windows_

Eine `Boolean` Eigenschaft, die `true` ist, wenn die Barrierefreiheitsunterstützung von Chrome aktiviert ist, `false` andernfalls. Diese Eigenschaft wird `true` , wenn die Verwendung von Hilfstechnologien, wie Z. B. Bildschirmlesegeräten, erkannt wurde. Wenn Sie diese Eigenschaft auf `true` manuell festlegen, wird die Barrierefreiheitsunterstützung von Chrome ermöglicht, sodass Entwickler den Eingabehilfenwechsel für Benutzer in Denanwendungseinstellungen verfügbar machen können.

Weitere Informationen finden Sie in [-Dokumentationen für Barrierefreiheitsdokumente](https://www.chromium.org/developers/design-documents/accessibility) . Standardmäßig deaktiviert.

Diese API muss aufgerufen werden, nachdem das `ready` Ereignis ausgesendet wurde.

**Hinweis:** -Rendering-Eingabehilfenstruktur kann die Leistung Ihrer App erheblich beeinträchtigen. Sie sollte standardmäßig nicht aktiviert werden.



### `app.applicationMenu`

Eine `Menu | null` Eigenschaft, die [`Menu`](menu.md) zurückgibt, wenn eine festgelegt wurde und andernfalls `null` . Benutzer können eine [Menü-](menu.md) übergeben, um diese Eigenschaft festzulegen.



### `app.badgeCount` _Linux_ _macOS_

Eine `Integer` Eigenschaft, die die Badge-Anzahl für die aktuelle App zurückgibt. Wenn Sie die Anzahl auf `0` festlegen, wird das Badge ausgeblendet.

Unter macOS wird das Festlegen dieser Einstellung mit einer beliebigen Ganzzahl von ungleich Null auf dem Dock-Symbol angezeigt. Unter Linux funktioniert diese Eigenschaft nur für Unity Launcher.

**Hinweis:** Unity-Start-/abstartende Datei erfordert, dass eine `.desktop` -Datei vorhanden ist, weitere Informationen finden Sie unter [Desktop-Umgebungsintegration][unity-requirement].

**Hinweis:** unter macOS müssen Sie sicherstellen, dass Ihre Anwendung über die Berechtigung verfügt, Benachrichtigungen anzuzeigen, damit diese Eigenschaft wirksam wird.



### `app.commandLine` _Readonly_

Ein [`CommandLine`](./command-line.md) -Objekt, mit dem Sie die von Chromium Befehlszeilenargumente lesen und bearbeiten können.



### `app.dock` _macOS_ _Readonly_

Ein [`Dock`](./dock.md) `| undefined` Objekt, mit dem Sie Aktionen für Ihr App-Symbol im Dock des Benutzers unter macOS ausführen können.



### `app.isPackaged` _Readonly_

Eine `Boolean` Eigenschaft, die `true` zurückgegeben, wenn die App gepackt ist, ansonsten `false`. Für viele Apps kann diese Eigenschaft verwendet werden, um Entwicklungs- und Produktionsumgebungen zu unterscheiden.



### `app.name`

Eine `String` Eigenschaft, die den Namen der aktuellen Anwendung angibt, d. h. den Namen in der `package.json` Datei der Anwendung.

Normalerweise ist das `name` Feld von `package.json` ein kurzer Kleinbuchstabenname, entsprechend der npm-Module-Spezifikation. In der Regel sollten Sie auch ein `productName` Feld angeben, das der vollständige großgeschriebene Name Ihrer Anwendung ist und das `name` von Electron bevorzugt wird.



### `app.userAgentFallback`

Ein `String` der die Benutzer-Agent-Zeichenfolge Electron als globales Fallback verwendet.

Dies ist der Benutzer-Agent, der verwendet wird, wenn kein Benutzer-Agent auf der Ebene `webContents` oder `session` festgelegt ist.  Es ist nützlich, um sicherzustellen, dass Ihr gesamtes -App über denselben Benutzer-Agent verfügt.  Legen Sie so früh wie möglich in der Initialisierung Ihrer App auf einen benutzerdefinierten Wert fest, um sicherzustellen, dass Ihr überschriebener Wert verwendet wird.



### `app.allowRendererProcessReuse`

Ein `Boolean` , der bei `true` die über Diebe deaktiviert, über die Electron verfügt, , um sicherzustellen, dass Rendererprozesse bei jeder Navigation neu gestartet werden.  Der aktuelle Standardwert für diese Eigenschaft ist `true`.

Es ist beabsichtigt, dass diese Außerkraftsetzungen standardmäßig deaktiviert werden und dann zu irgendwann in der Zukunft diese Eigenschaft entfernt wird.  Diese Eigenschaft wirkt sich , welche systemeigenen Module Sie im Rendererprozess verwenden können.  Weitere Informationen über die Richtung, in die Electron mit Renderer-Prozessneustarts und der Verwendung von nativen Modulen im Renderer-Prozess geht, finden Sie in diesem [Tracking-Problem](https://github.com/electron/electron/issues/18397).



### `app.runningUnderRosettaTranslation` _macOS_ _Readonly_

Eine `Boolean` , die, wenn `true` , angibt, dass die App derzeit unter der [Rosetta Translator Environment](https://en.wikipedia.org/wiki/Rosetta_(software))ausgeführt wird.

Mit dieser Eigenschaft können Sie Benutzer auffordern, die arm64-Version Ihrer Anwendung herunterzuladen, wenn sie die x64-Version unter Rosetta falsch ausführen.

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc

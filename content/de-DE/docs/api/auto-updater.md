# autoUpdater

> Aktivieren Sie Apps, um sich automatisch selbst zu aktualisieren.

Prozess: [Haupt](../glossary.md#main-process)

**Siehe auch: [Eine detaillierte Anleitung zur Implementierung von Updates in Ihrer Anwendung](../tutorial/updates.md).**

`autoUpdater` ist ein [EventEmitter][event-emitter].

## Plattform-Hinweise

Aktuell werden nur macOS und Windows unterstützt. Da es keinen eingebauten auto-updater auf den meisten Linux-Basierenden Betriebssystemen gibt, wird empfohlen, den eingebauten Pakete-Verwalter der Distribution zu verwenden, um die App zu updaten.

Außerdem gibt es auf jeder Plattform einige subtile Unterschiede:

### macOS

Unter MacOS basiert das `autoUpdater` Modul auf [ Squirrel.Mac][squirrel-mac], was bedeutet daß keine spezifische Konfiguration vonnöten ist. Für serverseitige Anforderungen können Sie [Serverunterstützung][server-support] lesen. Beachten Sie, dass [App-Transportsicherheit](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) für alle Anforderungen gilt, die im Rahmen des Aktualisierungsprozesses vorgenommen werden. Apps, die ATS deaktivieren müssen, können den Schlüssel `NSAllowsArbitraryLoads` zu ihrer App hinzufügen.

**Notiz**: Eine App muss zuerst signiert werden, um automatisch auf macOS updatet zu werden. Dies ist eine Voraussetzung von `Squirrel.Mac`.

### Windows

Unter Windows muss die App zuerst auf dem Gerät des Benutzers installiert werden, bevor `autoUpdater` genutzt werden kann. Deswegen wird empfohlen [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] oder [grunt-electron-installer][installer] zu verwenden, um einen Installer zu generieren.

Bei der Benutzung von [electron-winstaller][installer-lib] oder [electron-forge][electron-forge-lib] ist zu Beachten, dass die App nicht versucht, sich selbst zu update, wenn sie [zum Ersten mal ausgeführt wird](https://github.com/electron/windows-installer#handling-squirrel-events) (Weitere Informationen in diesem [issue](https://github.com/electron/electron/issues/7155)). Es wird auch empfohlen, [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) zu verwenden, um Desktop-Verknüpfungen für Ihre App zu erhalten.

Der Squirrel-Installer wird eine Desktop-Verknüpfung erstellen mit der [Application User Model ID][app-user-model-id] im Format `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, zum Beispiel: `com.squirrel.slack.Slack` oder `com.squirrel.code.Code`. Sie müssen dieselbe ID für Ihre App mit der `app.setAppUserModelId` API verwenden, da Windows sonst Ihre App nicht ordnungsgemäß in der Taskleiste anheften kann.

Im Gegensatz zu Squirrel.Mac kann Windows Updates auf S3 oder einem anderen statischen Dateihost hosten. Weitere Informationen können in der Dokumentation von [Squirrel.Windows][squirrel-windows] gefunden werden.

## Ereignisse

Das `autoUpdater` - Object gibt die folgenden Ereignisse aus:

### Event: 'error'

Kehrt zurück:

* `error` Fehler

Wird gesendet, wenn beim Aktualisieren ein Fehler auftritt.

### Ereignis : "Nach Updates suchen"

Wird gesendet, wenn geprüft wird, ob ein Update gestartet wurde.

### Ereignis : 'Update-verfügbar'

Wird ausgelöst, wenn ein Update verfügbar ist. Das Update wird automatisch heruntergeladen.

### Ereignis : "Update nicht verfügbar"

Wird gesendet, wenn kein Update verfügbar ist.

### Ereignis : 'Update-Download'

Kehrt zurück:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Wird gesendet, wenn ein Update heruntergeladen wurde.

Unter Windows ist nur `releaseName` verfügbar.

**Hinweis:** Es ist nicht unbedingt notwendig, dieses Ereignis zu behandeln. Ein fehlerfreie Heruntergeladenes Update wird automatisch übernommen, wenn die App das nächste mal gestartet wird.

### Ereignis: 'before-quit-for-update'

Dieses Event wird ausgelöst, wenn die Funktion `quitAndInstall()` aufgerufen wird.

Das `before-quit` Event wird erst ausgelöst nachdem alle Fenster geschlossen sind. Daher sollten Sie Aktionen, die Sie vor dem Beenden Ihrer Anwendung ausführen möchten, sowohl in diesem Event als auch im `before-quit` Event einbauen.

## Methoden

Das Objekt `autoUpdater` verfügt über die folgenden Methoden:

### `autoUpdater.setFeedURL(optionen)`

* `options` Objekt
  * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP-Anfrage-Header.
  * `serverType` String (optional) _macOS_ - Kann `json` oder `default` sein, siehe dazu [Squirrel.Mac][squirrel-mac] README für weitere informationen.

Setzt die `url` und initialisiert den automatischen Updater.

### `autoUpdater.getFeedURL()`

Gibt `String` - Die aktuelle URL des Aktualisierungsfeeds.

### `autoUpdater.checkForUpdates()`

Fragt den Server, ob es ein Update gibt. Es muss zuerst `setFeedURL` aufrufen werden, bevor diese API verwendet werden kann.

**Note:** If an update is available it will be downloaded automatically. Calling `autoUpdater.checkForUpdates()` twice will download the update two times.

### `autoUpdater.quitAndInstall()`

Startet die App neu und installiert damit das Update, sofern es heruntergeladen wurde. Diese Funktion sollte nur aufgerufen werden, nachdem `update-downloaded` ausgelöst wurde.

Unter der Haube schließt `autoUpdater.quitAndInstall()` zuerst alle Fenster und führt danach automatisch `app.quit()` aus.

**Hinweis.**: Es ist nicht unbedingt notwendig, diese Funktion auszulösen, denn ein fehlerfrei heruntergeladenes Update wird immer automatisch installiert, wenn die App das nächste mal startet.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter

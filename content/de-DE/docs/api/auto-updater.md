# automatischerUpdater

> Ermöglichen Sie es Apps, sich automatisch zu aktualisieren.

Prozess: [Haupt](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### macOS

Unter MacOS basiert das `autoUpdater` Modul auf [ Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), was bedeutet daß keine spezifische Konfiguration vonnöten ist. Für serverseitige Anforderungen können Sie [Serverunterstützung](https://github.com/Squirrel/Squirrel.Mac#server-support) lesen. Beachten Sie, dass  App-Transportsicherheit </ 0> (ATS) für alle Anforderungen gilt, die im Rahmen des Aktualisierungsprozesses vorgenommen werden. Apps, die ATS deaktivieren müssen, können den Schlüssel ` NSAllowsArbitraryLoads </ 0> zu ihrer App hinzufügen
 .</p>

<p><strong> Hinweis: </ 0> Ihre Anwendung muss für automatische Updates auf macOS signiert sein . Dies ist eine Voraussetzung von <code> Squirrel.Mac </ 1> .</p>

<h3>Windows</h3>

<p>Unter Windows müssen Sie Ihre App auf dem Computer eines Benutzers installieren, bevor Sie den <code> autoUpdater </ 0> verwenden können. Daher wird empfohlen, das
 <a href="https://github.com/electron/windows-installer"> Elektron-winstaller </ 1> , <a href="https://github.com/electron-userland/electron-forge"> Elektron zu verwenden -forge </ 2> oder das <a href="https://github.com/electron/grunt-electron-installer"> grunt-electron-installer </ 3> -Paket, um ein Windows- Installationsprogramm zu generieren .</p>

<p>Wenn Sie <a href="https://github.com/electron/windows-installer"> electron-winstaller </ 0> oder <a href="https://github.com/electron-userland/electron-forge"> electron-forge </ 1> verwenden , versuchen Sie nicht, Ihre App <a href="https://github.com/electron/windows-installer#handling-squirrel-events"> beim ersten Mal zu aktualisieren </ 2> (Siehe auch <3 > dieses Problem für weitere Informationen </ 3> ).
 Es wird auch empfohlen, <a href="https://github.com/mongodb-js/electron-squirrel-startup"> electron-squirrel-startup </ 0> zu verwenden, um Desktop-Verknüpfungen für Ihre App zu erhalten.</p>

<p>Das mit Squirrel erstellte Installationsprogramm erstellt ein Verknüpfungssymbol mit einer
 <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx"> Anwendungsbenutzermodell-ID </ 0> im Format
 <code> com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE </ 1> , Beispiele sind
 <code> com.squirrel .slack.Schwarz </ 1> und <code> com.squirrel.code.Code </ 1> . Sie müssen dieselbe ID für Ihre App mit der <code> app.setAppUserModelId </ 0>  API verwenden , da Windows sonst Ihre App nicht ordnungsgemäß in der Taskleiste anheften kann .</p>

<p>Im Gegensatz zu Squirrel.Mac kann Windows Updates auf S3 oder einem anderen statischen Dateihost hosten.
Sie können die Dokumente von <a href="https://github.com/Squirrel/Squirrel.Windows"> Squirrel.Windows </ 0> lesen , um mehr über die Funktionsweise von Squirrel.Windows zu erfahren.</p>

<h2>Veranstaltungen</h2>

<p>Das <code> autoUpdater </ 0> -Objekt gibt die folgenden Ereignisse aus:</p>

<h3>Ereignis : "Fehler</h3>

<p>Rückgabewert:</p>

<ul>
<li><code> Fehler </ 0> Fehler</li>
</ul>

<p>Wird gesendet, wenn beim Aktualisieren ein Fehler auftritt.</p>

<h3>Ereignis : "Nach Updates suchen"</h3>

<p>Wird gesendet, wenn geprüft wird, ob ein Update gestartet wurde.</p>

<h3>Ereignis : 'Update-verfügbar'</h3>

<p>Wird gesendet, wenn ein Update verfügbar ist. Das Update wird automatisch heruntergeladen.</p>

<h3>Ereignis : "Update nicht verfügbar"</h3>

<p>Wird gesendet, wenn kein Update verfügbar ist.</p>

<h3>Ereignis : 'Update-Download'</h3>

<p>Rückgabewert:</p>

<ul>
<li><code> Ereignis </ 0>  Ereignis</li>
<li><code> Release Notes </ 0>  String</li>
<li><code> releaseName </ 0>  String</li>
<li><code> releaseDate </ 0> Datum</li>
<li><code> updateURL </ 0>  String</li>
</ul>

<p>Wird gesendet, wenn ein Update heruntergeladen wurde.</p>

<p>Unter Windows ist nur <code> releaseName </ 0> verfügbar.</p>

<p><strong>Note:</strong> It is not strictly necessary to handle this event. A successfully 
downloaded update will still be applied the next time the application starts.</p>

<h3>Event: 'before-quit-for-update'</h3>

<p>This event is emitted after a user calls <code>quitAndInstall()`.</p> 

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Methoden

Das Objekt ` autoUpdater </ 0> verfügt über die folgenden Methoden:</p>

<h3><code>autoUpdater.setFeedURL(options)`</h3> 

* `optionen` Object 
  * ` URL </ 0>  Zeichenfolge</li>
<li><code>headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Setzt die ` URL </ 0> und initialisiert den automatischen Updater.</p>

<h3><code>autoUpdater.getFeedURL ()`</h3> 

Gibt ` String </ 0> zurück - Die aktuelle URL des Aktualisierungsfeeds.</p>

<h3><code>autoUpdater.checkForUpdates ()`</h3> 

Fragt den Server, ob es ein Update gibt. Sie müssen ` setFeedURL </ 0> aufrufen, bevor Sie diese API verwenden .</p>

<h3><code>autoUpdater.quitAndInstall()`</h3> 

Startet die App neu und installiert das Update nach dem Herunterladen. Es sollte nur aufgerufen werden, nachdem ` update-downloaded </ 0> ausgegeben wurde.</p>

<p>Under the hood calling <code>autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.
# autoUpdater

> Ermöglichen Sie es Apps, sich automatisch zu aktualisieren.

Prozess: [Haupt](../glossary.md#main-process)

**Siehe auch: [Eine detaillierte Anleitung zur Implementierung von Updates in Ihrer Anwendung](../tutorial/updates.md).**

## Plattform-Hinweise

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Außerdem gibt es auf jeder Plattform einige subtile Unterschiede:

### macOS

Unter MacOS basiert das `autoUpdater` Modul auf [ Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), was bedeutet daß keine spezifische Konfiguration vonnöten ist. Für serverseitige Anforderungen können Sie [Serverunterstützung](https://github.com/Squirrel/Squirrel.Mac#server-support) lesen. Beachten Sie, dass

 App-Transportsicherheit </ 0> (ATS) für alle Anforderungen gilt, die im Rahmen des Aktualisierungsprozesses vorgenommen werden. Apps, die ATS deaktivieren müssen, können den Schlüssel ` NSAllowsArbitraryLoads </ 0> zu ihrer App hinzufügen
 .</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> Your application must be signed for automatic updates on macOS.
This is a requirement of <code>Squirrel.Mac`.</p> 



### Windows

Unter Windows müssen Sie Ihre App auf dem Computer eines Benutzers installieren, bevor Sie den ` autoUpdater </ 0> verwenden können. Daher wird empfohlen, das
 <a href="https://github.com/electron/windows-installer"> Elektron-winstaller </ 1> , <a href="https://github.com/electron-userland/electron-forge"> Elektron zu verwenden -forge </ 2> oder das <a href="https://github.com/electron/grunt-electron-installer"> grunt-electron-installer </ 3> -Paket, um ein Windows- Installationsprogramm zu generieren .</p>

<p spaces-before="0">Wenn Sie <a href="https://github.com/electron/windows-installer"> electron-winstaller </ 0> oder <a href="https://github.com/electron-userland/electron-forge"> electron-forge </ 1> verwenden , versuchen Sie nicht, Ihre App <a href="https://github.com/electron/windows-installer#handling-squirrel-events"> beim ersten Mal zu aktualisieren </ 2> (Siehe auch <3 > dieses Problem für weitere Informationen </ 3> ).
 Es wird auch empfohlen, <a href="https://github.com/mongodb-js/electron-squirrel-startup"> electron-squirrel-startup </ 0> zu verwenden, um Desktop-Verknüpfungen für Ihre App zu erhalten.</p>

<p spaces-before="0">Das mit Squirrel erstellte Installationsprogramm erstellt ein Verknüpfungssymbol mit einer
 <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx"> Anwendungsbenutzermodell-ID </ 0> im Format
 <code> com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE </ 1> , Beispiele sind
 <code> com.squirrel .slack.Schwarz </ 1> und <code> com.squirrel.code.Code </ 1> . Sie müssen dieselbe ID für Ihre App mit der <code> app.setAppUserModelId </ 0>  API verwenden , da Windows sonst Ihre App nicht ordnungsgemäß in der Taskleiste anheften kann .</p>

<p spaces-before="0">Im Gegensatz zu Squirrel.Mac kann Windows Updates auf S3 oder einem anderen statischen Dateihost hosten.
Sie können die Dokumente von <a href="https://github.com/Squirrel/Squirrel.Windows"> Squirrel.Windows </ 0> lesen , um mehr über die Funktionsweise von Squirrel.Windows zu erfahren.</p>

<h2 spaces-before="0">Veranstaltungen</h2>

<p spaces-before="0">Das <code> autoUpdater </ 0> -Objekt gibt die folgenden Ereignisse aus:</p>

<h3 spaces-before="0">Ereignis : "Fehler</h3>

<p spaces-before="0">Rückgabewert:</p>

<ul>
<li><code> Fehler </ 0> Fehler</li>
</ul>

<p spaces-before="0">Wird gesendet, wenn beim Aktualisieren ein Fehler auftritt.</p>

<h3 spaces-before="0">Ereignis : "Nach Updates suchen"</h3>

<p spaces-before="0">Wird gesendet, wenn geprüft wird, ob ein Update gestartet wurde.</p>

<h3 spaces-before="0">Ereignis : 'Update-verfügbar'</h3>

<p spaces-before="0">Emitted when there is an available update. The update is downloaded
automatically.</p>

<h3 spaces-before="0">Ereignis : "Update nicht verfügbar"</h3>

<p spaces-before="0">Wird gesendet, wenn kein Update verfügbar ist.</p>

<h3 spaces-before="0">Ereignis : 'Update-Download'</h3>

<p spaces-before="0">Rückgabewert:</p>

<ul>
<li><code> Ereignis </ 0>  Ereignis</li>
<li><code> Release Notes </ 0>  String</li>
<li><code> releaseName </ 0>  String</li>
<li><code> releaseDate </ 0> Datum</li>
<li><code> updateURL </ 0>  String</li>
</ul>

<p spaces-before="0">Wird gesendet, wenn ein Update heruntergeladen wurde.</p>

<p spaces-before="0">Unter Windows ist nur <code> releaseName </ 0> verfügbar.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> It is not strictly necessary to handle this event. A successfully
downloaded update will still be applied the next time the application starts.</p>

<h3 spaces-before="0">Ereignis: 'before-quit-for-update'</h3>

<p spaces-before="0">This event is emitted after a user calls <code>quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.



## Methoden

Das Objekt ` autoUpdater </ 0> verfügt über die folgenden Methoden:</p>

<h3 spaces-before="0"><code>autoUpdater.setFeedURL(optionen)`</h3> 

* `options` Object 
    * ` URL </ 0>  Zeichenfolge</li>
<li><code>headers` Object (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Setzt die ` URL </ 0> und initialisiert den automatischen Updater.</p>

<h3 spaces-before="0"><code>autoUpdater.getFeedURL ()`</h3> 

Gibt ` String </ 0> zurück - Die aktuelle URL des Aktualisierungsfeeds.</p>

<h3 spaces-before="0"><code>autoUpdater.checkForUpdates ()`</h3> 

Asks the server whether there is an update. You must call `setFeedURL` before using this API.



### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

# crashReporter

> Bestätige Crash Reports zu einem Remote Server

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Im Folgenden finden Sie ein Beispiel für das Einrichten von Electron, um Absturzberichte automatisch an einen Remoteserver zu übermitteln:

```javascript
const { crashReporter } = require('electron')

crashReporter.start(' submitURL: 'https://your-domain.com/url-to-submit'
```

Zum einrichten eines Servers, zum aktzeptieren und verarbeiten von Crash Reports, können sie folgenden Projekte verwenden:

* [Socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Oder verwenden Sie eine gehostete Lösung von Drittanbietern:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Absturzberichte werden vorübergehend gespeichert, bevor sie in ein Verzeichnis hochgeladen werden, das unter dem Benutzerdatenverzeichnis der App liegt (unter Windows und Mac "Crashpad" genannt, oder "Crash Reports" unter Linux). Sie können dieses Verzeichnis überschreiben, indem Sie `app.setPath('crashDumps', '/path/to/crashes')` aufrufen, bevor Sie den Absturz Reporter starten.

Unter Windows und macOS verwendet Electron [-](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) , um Abstürze zu überwachen und zu melden. Unter Linux verwendet Electron [Breakpad-](https://chromium.googlesource.com/breakpad/breakpad/+/master/). Diese ist ein Implementierungsdetail, das von Chromium gesteuert wird, und es kann sich in Zukunft ändern. Insbesondere ist Crashpad neuer und wird wahrscheinlich irgendwann Breakpad auf allen Plattformen ersetzen.

### Hinweis zu untergeordneten Node-Prozessen unter Linux

Wenn Sie das Modul Node.js `child_process` verwenden und Abstürze von diesen Prozessen unter Linux melden möchten, müssen Sie einen zusätzlichen Schritt ausführen, um den Absturzreporter im untergeordneten Prozess richtig zu initialisieren . Dies ist auf Mac oder Windows nicht notwendig, da diese Plattformen Crashpad verwenden, das automatisch untergeordnete Prozesse überwacht .

Da `require('electron')` in untergeordneten Knotenprozessen nicht verfügbar ist, sind die folgenden APIs für das `process` -Objekt in untergeordneten Knotenprozessen verfügbar. Beachten Sie, dass unter Linux jeder untergeordnete Knotenprozess über eine eigene Instanz dem Breakpad-Absturzreporter verfügt. Dies ist unähnlich zu Renderer-Untergeordneten Prozessen, , die über einen "Stub"-Breakpad-Reporter verfügen, der Informationen an den Hauptprozess für die Berichterstattung zurückgibt.

#### `process.crashReporter.start(options)`

Siehe [`crashReporter.start()`](#crashreporterstartoptions).

#### `process.crashReporter.getParameters()`

Siehe [`crashReporter.getParameters()`](#crashreportergetparameters).

#### `process.crashReporter.addExtraParameter(Schlüssel, Wert)`

Siehe [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value).

#### `process.crashReporter.removeExtraParameter(Schlüssel)`

Siehe [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey).

## Methoden

Das `crashReporter` Modul verfügt über die folgenden Methoden:

### `crashReporter.start(Optionen)`

* `options` -Objekt
  * `submitURL` String - URL, an die Absturzberichte als POST gesendet werden.
  * `productName` String (optional) - Standardwerte für `app.name`.
  * `companyName` String (optional) _veraltete_ - Veralteter Alias für `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (optional) - Gibt an, ob Absturzberichte an den Server gesendet werden sollen. Wenn false, werden Absturzberichte gesammelt und im Verzeichnis Abstürze gespeichert, aber nicht hochgeladen. Standard ist `true`.
  * `ignoreSystemCrashHandler` Boolean (optional) - Wenn true, werden abstürzende im Hauptprozess generierte Abstürze nicht an den Systemabsturzhandler weitergeleitet. Standard ist `false`.
  * `rateLimit` boolesch (optional) _macOS_ _Windows_ - Wenn true, begrenzen Sie die Anzahl der hochgeladenen Abstürze auf 1/Stunde. Standard ist `false`.
  * `compress` Boolean (optional) - Wenn true, werden Absturzberichte komprimiert und mit `Content-Encoding: gzip`hochgeladen. Standard ist `true`.
  * `extra` Record<String, String> (optional) - Zusätzliche Zeichenfolgenschlüssel/-wert- Anmerkungen, die zusammen mit Absturzberichten gesendet werden, die im Hauptprozess generiert werden. Es werden nur Zeichenfolgenwerte unterstützt. Abstürze, die in untergeordneten Prozessen generiert werden, enthalten diese zusätzlichen Parameter, um Berichte abzustürzen, die aus untergeordneten Prozessen generiert werden, rufen [`addExtraParameter`](#crashreporteraddextraparameterkey-value) aus dem untergeordneten Prozess auf.
  * `globalExtra` Record<String, String> (optional) - Zusätzliche Zeichenfolgenschlüssel/-wert- Anmerkungen, die zusammen mit allen Absturzberichten gesendet werden, die in einem Prozess generiert werden. Diese Anmerkungen können nicht mehr geändert werden, nachdem der Absturzreporter gestartet wurde. Wenn ein Schlüssel sowohl in den globalen zusätzlichen Parametern als auch in den prozessspezifischen zusätzlichen Parametern vorhanden ist, hat der globale Schlüssel Vorrang. Standardmäßig sind `productName` und die App-Version sowie sowie die Electron-Version enthalten.

Diese Methode muss aufgerufen werden, bevor andere `crashReporter` -APIs verwendet werden. Sobald auf diese Weise initialisiert wurde, sammelt der Crashpad-Handler Abstürze aus allen anschließend erstellten Prozessen. Der Absturzreporter kann nach gestartet nicht mehr deaktiviert werden.

Diese Methode sollte so früh wie möglich beim App-Start aufgerufen werden, vorzugsweise vor `app.on('ready')`. Wenn der Absturzreporter zum Zeitpunkt der Erstellung eines Rendererprozesses nicht initialisiert wird, wird dieser Rendererprozess nicht vom Absturzreporter überwacht.

**Hinweis:** Sie können den Absturzreporter testen, indem Sie einen Absturz mit `process.crash()`generieren.

**Hinweis:** Wenn Sie nach dem ersten Anruf Ihres zusätzliche/aktualisierte `extra` -Parameter senden müssen `start` , können Sie `addExtraParameter`aufrufen.

**Hinweis:** Parameter, die in `extra`übergeben werden, `globalExtra` oder mit `addExtraParameter` festgelegt werden, haben Einschränkungen für die Länge der Schlüssel und Werte. Schlüsselnamen müssen höchstens 39 Byte lang sein, und Die Werte dürfen nicht länger als 127 Byte sein. Schlüssel mit Namen, die länger als das Maximum sind, werden stillschweigend ignoriert. Schlüsselwerte die länger als die maximale Länge sind, werden abgeschnitten.

**Hinweis:** Diese Methode ist nur im Hauptprozess verfügbar.

### `crashReporter.getLastCrashReport()`

Gibt [`CrashReport`](structures/crash-report.md) zurück - Das Datum und die ID des letzten Absturzberichts. Es werden nur hochgeladene Absturzberichte zurückgegeben. , selbst wenn ein Absturzbericht auf dem Datenträger vorhanden ist, wird er erst zurückgegeben, wenn er hochgeladen wird. Wenn keine hochgeladenen Berichte vorhanden sind, wird `null` zurückgegeben.

**Hinweis:** Diese Methode ist nur im Hauptprozess verfügbar.

### `crashReporter.getUploadedReports()`

Rücksendungen [`CrashReport[]`](structures/crash-report.md):

Gibt alle hochgeladenen Absturzberichte zurück. Jeder Bericht enthält das Datum und ID hochgeladen.

**Hinweis:** Diese Methode ist nur im Hauptprozess verfügbar.

### `crashReporter.getUploadToServer()`

Gibt `Boolean` zurück : Gibt an, ob Berichte an den Server gesendet werden sollen. Durch die `start` Methode oder `setUploadToServer`festlegen.

**Hinweis:** Diese Methode ist nur im Hauptprozess verfügbar.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Gibt an, ob Berichte an den Server gesendet werden sollen.

Dies würde normalerweise durch Benutzereinstellungen gesteuert werden. Dies hat keine Auswirkungen, wenn aufgerufen wird, bevor `start` aufgerufen wird.

**Hinweis:** Diese Methode ist nur im Hauptprozess verfügbar.

### `crashReporter.addExtraParameter(Schlüssel, Wert)`

* `key` String - Parameterschlüssel darf nicht länger als 39 Bytes sein.
* `value` String - Parameterwert darf nicht länger als 127 Byte sein.

Legen Sie einen zusätzlichen Parameter fest, der mit dem Absturzbericht gesendet werden soll. Die hier angegebenen Werte werden zusätzlich zu allen Werten gesendet, die beim Aufruf `start` über die Option `extra` festgelegt wurden.

Auf diese Weise hinzugefügte Parameter (oder über den parameter `extra` zu `crashReporter.start`) sind spezifisch für den aufrufenden Prozess. Das Hinzufügen zusätzlicher Parameter im Hauptprozess führt nicht dazu, dass diese Parameter zusammen mit Abstürzen von Renderern oder anderen untergeordneten Prozessen gesendet werden. Ebenso führt das Hinzufügen zusätzlicher Parameter in einem Rendererprozess nicht dazu, dass die Parameter mit Abstürzen gesendet werden, die in anderen Rendererprozessen oder im Hauptprozess auftreten.

**Hinweis:** Parameter haben Grenzen für die Länge der Schlüssel und Werte. Schlüssel Namen dürfen nicht länger als 39 Byte sein, und Werte dürfen nicht länger als 20320 Bytes sein. Schlüssel mit Namen, die länger als das Maximum sind, werden stillschweigend ignoriert. Wichtige Werte, die länger als die maximale Länge sind, werden abgeschnitten.

**Hinweis:** auf Linux-Werten, die länger als 127 Bytes sind, werden in mehrere Schlüssel mit einer Länge von jeweils 127 Bytes aufgeteilt.  z.B. `addExtraParameter('foo', 'a'.repeat(130))` führt zu zwei `foo__1` und `foo__2`, der erste enthält ersten 127 Bytes und der zweite die restlichen 3 Bytes.  Bei Ihrem Backend für Absturzberichte sollten Sie Schlüssel in diesem Format zusammenfügen.

### `crashReporter.removeExtraParameter(Schlüssel)`

* `key` String - Parameterschlüssel darf nicht länger als 39 Bytes sein.

Entfernen Sie einen zusätzlichen Parameter aus dem aktuellen Parametersatz. Zukünftige Abstürze diesen Parameter nicht enthalten.

### `crashReporter.getParameters()`

Gibt `Record<String, String>` zurück - Die aktuellen "Extra"-Parameter des Absturzreporters.

## Absturzbericht Nutzlast

Der Crashreporter sendet die folgenden Daten an die `submitURL` , ein `multipart/form-data` `POST`:

* `ver` String - Die Version von Electron.
* `platform` String - z.B. 'win32'.
* `process_type` String - z.B. 'Renderer'.
* `guid` String - z.B. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - Die Version in `package.json`.
* `_productName` String - Der Produktname im `crashReporter` `options` -Objekt.
* `prod` String - Name des zugrunde liegenden Produkts. In diesem Fall Electron.
* `_companyName` String - Der Firmenname im `crashReporter` `options` -Objekt.
* `upload_file_minidump` Datei - Der Absturzbericht im Format `minidump`.
* Alle Eigenschaften der Ebene 1 des `extra` -Objekts im `crashReporter` `options` -Objekt.

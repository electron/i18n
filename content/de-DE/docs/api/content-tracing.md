# contentTracing

> Sammeln Sie Ablaufverfolgungsdaten von Chromium, um Leistungsengpässe und langsame Vorgänge zu finden.

Prozess: [Main](../glossary.md#main-process)

Dieses Modul enthält keine Weboberfläche. Um aufgezeichnete Ablaufverfolgungen anzuzeigen, verwenden Sie [Trace Viewer][], die unter `chrome://tracing` in Chrome verfügbar sind.

**Hinweis:** Sie sollten dieses Modul erst verwenden, wenn das `ready` Ereignis der App Moduls ausgesendet wird.

```javascript
const { app, contentTracing } = require('electron')

app.whenReady().then()=> (
  async (async () =>
    warten auf contentTracing.startRecording('
      included_categories: ['*']
    ')
    console.log('Tracing started')
    warten auf neues Promise(resolve => setTimeout(resolve) 5000))
    const-Pfad = wait contentTracing.stopRecording()
    console.log('Tracing data recorded to ' + path)
  ')(
)
```

## Methoden

Das `contentTracing` Modul verfügt über die folgenden Methoden:

### `contentTracing.getCategories()`

Gibt `Promise<String[]>` zurück : Wird mit einem Array von Kategoriegruppen aufgelöst, sobald alle untergeordneten Prozesse die `getCategories` Anforderung bestätigt haben.

Abrufen einer Gruppe von Kategoriegruppen. Die Kategoriegruppen können sich ändern, wenn neue Codepfade erreicht werden. Siehe auch die [Liste der integrierten Kategorien](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

> **HINWEIS:** -Electron fügt eine nicht standardmäßige Ablaufverfolgungskategorie namens `"electron"`hinzu. Diese Kategorie kann verwendet werden, um elektronenspezifische Ablaufverfolgungsereignisse zu erfassen.

### `contentTracing.startRecording(Optionen)`

* `options` ([TraceConfig](structures/trace-config.md) | [TraceCategoriesUndOptions](structures/trace-categories-and-options.md))

Gibt `Promise<void>` zurück - aufgelöst, sobald alle untergeordneten Prozesse die `startRecording` -Anforderung bestätigt haben.

Starten Sie die Aufzeichnung für alle Prozesse.

Die Aufzeichnung beginnt sofort lokal und asynchron bei untergeordneten Prozessen sobald sie die EnableRecording-Anforderung erhalten.

Wenn eine Aufzeichnung bereits ausgeführt wird, wird das Versprechen sofort aufgelöst, da nur ein Ablaufverfolgungsvorgang gleichzeitig ausgeführt werden kann.

### `contentTracing.stopRecording([resultFilePath])`

* `resultFilePath` String (optional)

Gibt `Promise<String>` zurück : Wird mit einem Pfad zu einer Datei aufgelöst, die die verfolgten Daten enthält, nachdem alle untergeordneten Prozesse die `stopRecording` Anforderung bestätigt haben.

Beenden Sie die Aufzeichnung für alle Prozesse.

Untergeordnete Prozesse speichern in der Regel Ablaufverfolgungsdaten zwischenunden und senden Ablaufverfolgungsdaten nur selten an den Hauptprozess zurück. Dies trägt dazu bei, den Laufzeitaufwand der Ablaufverfolgung zu minimieren, da das Senden von Ablaufverfolgungsdaten über IPC ein kostspieliger Vorgang sein kann. Daher fordert Chromium , die Ablaufverfolgung zu beenden, alle untergeordneten Prozesse asynchron auf, alle ausstehenden Ablaufverfolgungsdaten zu löschen.

Ablaufverfolgungsdaten werden in `resultFilePath`geschrieben. Wenn `resultFilePath` leer ist oder nicht angegeben wird, werden Ablaufverfolgungsdaten in eine temporäre Datei geschrieben, und der Pfad wird im Versprechen zurückgegeben.

### `contentTracing.getTraceBufferUsage()`

Gibt `Promise<Object>` zurück - Wird mit einem Objekt aufgelöst, das die `value` und `percentage` der maximalen Verwendung des Ablaufverfolgungspuffers enthält.

* `value` -Zahl
* `percentage` -Zahl

Abrufen der maximalen Verwendung über Prozesse des Ablaufverfolgungspuffers als Prozentsatz des vollständigen Status.

[Trace Viewer]: https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md

# process

> Erweiterungen des Prozessobjekts.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Das `process` Objekt von Electron wird vom [Node.js `process` -Objekt](https://nodejs.org/api/process.html)erweitert. Es fügt die folgenden Ereignisse, Eigenschaften und Methoden hinzu:

## Sandbox

In Sandkasten-Renderern enthält das `process` -Objekt nur eine Teilmenge der APIs:

- `absturz()`
- `hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getBlinkMemoryInfo()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `getCPUUsage()`
- `getIOCounters()`
- `Argv`
- `execPath`
- `env`
- `Pid`
- `Arch`
- `plattform`
- `Sandbox`
- `type`
- `version`
- `Versionen`
- `Mas`
- `windowsStore`

## Ereignisse

### Ereignis: 'geladen'

Emittiert, wenn Electron sein internes Initialisierungsskript geladen hat und beginnt, die Webseite oder das Hauptskript zu laden.

Es kann vom Preload-Skript verwendet werden, um entfernte globale Knotensymbole wieder zu globalen Bereichs hinzuzufügen, wenn die Knotenintegration deaktiviert ist:

```javascript
preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => '
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
')
```

## Eigenschaften

### `process.defaultApp` _Readonly_

Ein `Boolean`. Wenn die App gestartet wird, indem sie als Parameter an die Standard-App übergeben wird, wird diese -Eigenschaft im Hauptprozess `true` , andernfalls wird sie `undefined`.

### `process.isMainFrame` _Readonly_

Eine `Boolean` `true` , wenn der aktuelle Rendererkontext der "Haupt"-Renderer Frame ist. Wenn Sie die ID des aktuellen Frames verwenden möchten, sollten Sie `webFrame.routingId`verwenden.

### `process.mas` _Readonly_

Ein `Boolean`. Für Mac App Store-Build ist diese Eigenschaft `true`, für andere Builds ist es `undefined`.

### `process.noAsar`

Ein `Boolean` , der die ASAR-Unterstützung in Ihrer Anwendung steuert. Wenn Sie dies auf `true` wird die Unterstützung für `asar` Archive in den integrierten Modulen von Node deaktiviert.

### `process.noDeprecation`

Eine `Boolean` , die steuert, ob Veraltungswarnungen in `stderr`gedruckt werden. Wenn Sie dies auf `true` setzen, werden Verfehlungen zum Schweigen gebracht. Diese Eigenschaft wird anstelle des `--no-deprecation` Befehlszeilenflags verwendet.

### `process.resourcesPath` _Readonly_

Ein `String` , der den Pfad zum Ressourcenverzeichnis darstellt.

### `process.sandboxed` _Readonly_

Ein `Boolean`. Wenn der Rendererprozess sandkastenweise ist, wird diese Eigenschaft `true`, andernfalls wird sie `undefined`.

### `process.throwDeprecation`

Ein `Boolean` , der steuert, ob Veraltungswarnungen als Ausnahmen ausgelöst werden. Wenn Sie diese Einstellung auf `true` werden Fehler für Veraltete angezeigt. Diese Eigenschaft anstelle des `--throw-deprecation` Befehlszeilenflags verwendet.

### `process.traceDeprecation`

Ein `Boolean` , der steuert, ob veraltete, auf `stderr` gedruckte veraltete veraltete, ihrer Stapelablaufverfolgung enthalten. Wenn Sie diese Einstellung auf `true` werden Stapelablaufverfolgungen für Veraltete gedruckt. Diese Eigenschaft ist anstelle des `--trace-deprecation` Befehlszeilenflags.

### `process.traceProcessWarnings`

Eine `Boolean` , die steuert, ob Prozesswarnungen, die auf `stderr` gedruckt werden, ihrer Stapelablaufverfolgung enthalten. Wenn Sie diese Einstellung auf `true` werden Stapelablaufverfolgungen für Prozesswarnungen (einschließlich veralteter Anforderungen) gedruckt. Diese Eigenschaft ist anstelle des `--trace-warnings` Befehls Zeilenflag.

### `process.type` _Readonly_

Ein `String` , der den Typ des aktuellen Prozesses darstellt, kann sein:

* `browser` - Der Hauptprozess
* `renderer` - Ein Rendererprozess
* `worker` - In einem Web-Worker

### `process.versions.chrome` _Readonly_

Ein `String` , der die Versionszeichenfolge von Chrome darstellt.

### `process.versions.electron` _Readonly_

Ein `String` , der Die Versionszeichenfolge von Electron darstellt.

### `process.windowsStore` _Readonly_

Ein `Boolean`. Wenn die App als Windows Store-App (appx) ausgeführt wird, ist diese Eigenschaft `true`, andernfalls ist sie `undefined`.

## Methoden

Das `process` -Objekt verfügt über die folgenden Methoden:

### `process.crash()`

Verursacht den Hauptthread des aktuellen Prozessabsturzes.

### `process.getCreationTime()`

Gibt `Number | null` zurück - Die Anzahl der Millisekunden seit der Epoche oder `null` , wenn die Informationen nicht verfügbar sind

Gibt die Erstellungszeit der Anwendung an. Die Zeit wird seit der Epoche als Anzahl von Millisekunden dargestellt. Es gibt null zurück, wenn die Prozesserstellungszeit nicht abrufe.

### `process.getCPUUsage()`

Rücksendungen [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` _Windows_ _Linux-_

Rücksendungen [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Gibt das `Object` zurück:

* `totalHeapSize` Ganzzahl
* `totalHeapSizeExecutable` Ganzzahl
* `totalPhysicalSize` Ganzzahl
* `totalAvailableSize` Ganzzahl
* `usedHeapSize` Ganzzahl
* `heapSizeLimit` Ganzzahl
* `mallocedMemory` Ganzzahl
* `peakMallocedMemory` Ganzzahl
* `doesZapGarbage` Boolean

Gibt ein Objekt mit V8-Heapstatistiken zurück. Beachten Sie, dass alle Statistiken in Kilobyte angegeben werden.

### `process.getBlinkMemoryInfo()`

Gibt das `Object` zurück:

* `allocated` Ganzzahl - Größe aller zugeordneten Objekte in Kilobytes.
* `marked` Ganzzahl - Größe aller markierten Objekte in Kilobytes.
* `total` Ganzzahl - Gesamt zugewiesener Speicherplatz in Kilobytes.

Gibt ein Objekt mit Blink-Speicherinformationen zurück. Es kann nützlich sein, um Rendering / DOM-bezogene Speicherprobleme zu debuggen. Beachten Sie, dass alle Werte in Kilobytes gemeldet werden.

### `process.getProcessMemoryInfo()`

Gibt `Promise<ProcessMemoryInfo>` zurück - Löst mit einem [ProcessMemoryInfo](structures/process-memory-info.md)

Gibt ein Objekt zurück, das Speichernutzungsstatistiken über den aktuellen Prozess enthält. Beachten Sie , dass alle Statistiken in Kilobytes gemeldet werden. Diese API sollte nach App bereit aufgerufen werden.

Chrom bietet keinen `residentSet` Wert für macOS. Dies liegt daran, dass macOS in-Memory-Komprimierung von Seiten, die vor kurzem nicht verwendet wurden. Als Ergebnis ist der Wert der festgelegten Größe nicht das, was man erwarten würde. `private` Speicher repräsentativer für die tatsächliche Vorkomprimierungsspeichernutzung des Prozesses unter macOS.

### `process.getSystemMemoryInfo()`

Gibt das `Object` zurück:

* `total` Ganzzahl - Die Gesamtmenge des physischen Speichers in Kilobytes, die dem -System zur Verfügung steht.
* `free` Ganzzahl - Die Gesamtmenge des Arbeitsspeichers, der nicht von Anwendungen oder Datenträgern Cache verwendet wird.
* `swapTotal` Integer _Windows_ _Linux_ - Die Gesamtmenge an Swap-Speicher in Kilobytes, die dem -System zur Verfügung steht.
* `swapFree` Integer _Windows_ _Linux_ - Die freie Menge an Swap-Speicher in Kilobytes, die dem -System zur Verfügung steht.

Gibt ein Objekt zurück, das Speichernutzungsstatistiken über das gesamte System enthält. Beachten Sie , dass alle Statistiken in Kilobytes gemeldet werden.

### `process.getSystemVersion()`

Gibt `String` zurück - Die Version des Hostbetriebssystems.

Beispiel:

```js
const version = process.getSystemVersion()
console.log(version)
/ / unter macOS -> '10.13.6'
/ / Unter Windows -> '10.0.17763'
/ Unter Linux -> '4.15.0-45-generic'
```

**Hinweis:** Es gibt die tatsächliche Betriebssystemversion anstelle der Kernel-Version auf macOS im Gegensatz zu `os.release()`zurück.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Pfad zur Ausgabedatei.

Gibt `Boolean` zurück: Gibt an, ob der Snapshot erfolgreich erstellt wurde.

Erstellt einen V8-Heap-Snapshot und speichert ihn in `filePath`.

### `process.hang()`

Bewirkt, dass der Hauptthread des aktuellen Prozesses hängen bleibt.

### `process.setFdLimit(maxDescriptors)` _macOS_ _Linux_

* `maxDescriptors` Ganzzahl

Legt die Softlimit-Weiche für den Dateideskriptor auf `maxDescriptors` oder das Betriebssystem- -Limit fest, je nach dem aktuellen Prozess niedriger ist.

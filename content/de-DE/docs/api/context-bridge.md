# contextBridge

> Erstellen einer sicheren, bidirektionalen, synchronen Brücke über isolierte Kontexte hinweg

Prozess: [Renderer](../glossary.md#renderer-process)

Ein Beispiel für das Aussetzen einer API für einen Renderer aus einem isolierten Preload-Skript finden Sie unten:

```javascript
Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  '
    doThing: () => ipcRenderer.send('do-a-thing')
  '
)
```

```javascript
Renderer (Main World)

window.electron.doThing()
```

## Glossar

### Hauptwelt

Die "Hauptwelt" ist der JavaScript-Kontext, in dem Ihr Hauptrenderercode ausgeführt wird. Standardmäßig führt die Seite, die Sie in Ihren Renderer laden, Code in dieser Welt aus.

### Isolierte Welt

Wenn `contextIsolation` in Ihrem `webPreferences`aktiviert ist, werden Ihre `preload` Skripte in einer "Isolierte Welt" ausgeführt.  Sie können mehr über die Kontextisolation und deren Auswirkungen in der [Sicherheitsdokumentation](../tutorial/security.md#3-enable-context-isolation-for-remote-content) Dokumente lesen.

## Methoden

Das `contextBridge` Modul verfügt über die folgenden Methoden:

### `contextBridge.exposeInMainWorld(apiKey, api)` _Experimentelle_

* `apiKey` String - Der Schlüssel, mit dem die API in `window` einfügt werden soll.  Auf die API kann auf `window[apiKey]`zugegriffen werden.
* `api` any - Ihre API, weitere Informationen darüber, was diese API sein kann und wie sie funktioniert, ist unten verfügbar.

## Beispiel

### API

Die `api` , die [`exposeInMainWorld`](#contextbridgeexposeinmainworldapikey-api-experimental) zur Verfügung gestellt werden, müssen ein `Function`, `String`, `Number` `Array`, `Boolean`oder ein Objekt sein, dessen Schlüssel Zeichenfolgen und Werte sind, ein `Function`, `String`, `Number`, `Array`, `Boolean`oder ein anderes verschachteltes Objekt, das die gleichen Bedingungen erfüllt.

`Function` Werte werden in den anderen Kontext eingefügt, und alle anderen Werte werden **** kopiert und</strong>**eingefroren. Alle Daten/Primitive, die der API gesendet werden, werden unveränderlich, und Aktualisierungen auf beiden Seiten der Brücke führen nicht zu einer Aktualisierung auf der anderen Seite.</p>

Ein Beispiel für eine komplexe API wird unten gezeigt:

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  '
    doThing: () => ipcRenderer.send('do-a-thing'),
    myPromises: [Promise.resolve(), Promise.reject(new Error('whoops')],
    anAsyncFunction: async () => 123,
    Daten:
      myFlags: ['a', 'c'],
      bootTime: 1234
    ',
    nestedAPI: '
      evenDeeper: '
        youCanDoThisAsMuchAsYouWant: '
          fn: () => ({
            returnData: 123
          })

  
    
      

```

### API-Funktionen

`Function` Werte, die Sie durch die `contextBridge` binden, werden über Electron angezeigt, um sicherzustellen, dass Kontexte isoliert bleiben.  Dies zu einigen wichtigsten Einschränkungen führt, die wir unten beschrieben haben.

#### Parameter / Fehler / Rückgabetypunterstützung

Da Parameter, Fehler und Rückgabewerte **kopiert werden** wenn sie über die Brücke gesendet werden, können nur bestimmte Typen verwendet werden. Wenn der Typ, den Sie verwenden möchten, auf hoher Ebene serialisiert und in dasselbe Objekt deserialisiert werden kann, funktioniert er.  Eine Tabelle der Typunterstützung wurde unten zur Vollständigkeit enthalten:

| Typ                                                                                                           | Komplexität | Parameterunterstützung | Return Value Support | Einschränkungen                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`                                                                                                      | Einfach     | ✅                      | ✅                    | N/A                                                                                                                                                                                                                                                                        |
| `Number`                                                                                                      | Einfach     | ✅                      | ✅                    | N/A                                                                                                                                                                                                                                                                        |
| `Boolean`                                                                                                     | Einfach     | ✅                      | ✅                    | N/A                                                                                                                                                                                                                                                                        |
| `Object`                                                                                                      | Komplex     | ✅                      | ✅                    | Schlüssel dürfen nur mit "Simple"-Typen in dieser Tabelle unterstützt werden.  Werte müssen in dieser Tabelle unterstützt werden.  Prototypmodifikationen werden verworfen.  Durch das Senden benutzerdefinierter Klassen werden Werte kopiert, jedoch nicht der Prototyp. |
| `Array`                                                                                                       | Komplex     | ✅                      | ✅                    | Dieselben Einschränkungen wie der `Object` -Typ                                                                                                                                                                                                                            |
| `Error`                                                                                                       | Komplex     | ✅                      | ✅                    | Fehler, die ausgelöst werden, werden ebenfalls kopiert, dies kann dazu führen, dass sich die Meldungs- und Stapelablaufverfolgung des Fehlers leicht ändert, da er in einem anderen Kontext ausgelöst wird.                                                                |
| `Versprechen`                                                                                                 | Komplex     | ✅                      | ✅                    | Versprechen werden nur dann proxiziert, wenn sie der Rückgabewert oder der exakte Parameter sind.  Versprechen, die in Arrays oder Objekten geschachtelt sind, werden gelöscht.                                                                                            |
| `Funktion`                                                                                                    | Komplex     | ✅                      | ✅                    | Prototypmodifikationen werden verworfen.  Das Senden von Klassen oder Konstruktoren funktioniert nicht.                                                                                                                                                                    |
| [Klonbare Typen](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) | Einfach     | ✅                      | ✅                    | Siehe verknüpftes Dokument zu klonbaren Typen                                                                                                                                                                                                                              |
| `Symbol`                                                                                                      | N/A         | ❌                      | ❌                    | Symbole können nicht über Kontexte hinweg kopiert werden, sodass sie gelöscht werden.                                                                                                                                                                                      |

Wenn der Typ, der Ihnen wichtig ist, nicht in der obigen Tabelle aufgeführt ist, wird er wahrscheinlich nicht unterstützt.

# webFrame

> Passen Sie das Rendering der aktuellen Webseite an.

Prozess: [Renderer](../glossary.md#renderer-process)

`webFrame` Export des Electron-Moduls ist eine Instanz der `WebFrame` -Klasse, die den oberen Rahmen des aktuellen `BrowserWindow`darstellt. Unterrahmen können mit bestimmten Eigenschaften und Methoden abgerufen werden (z. B. `webFrame.firstChild`).

Ein Beispiel zum zoomen der aktuellen Page auf 200%.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Methoden

Die `WebFrame` class hat die folgenden Methoden:

### `webFrame.setZoomFactor(factor)`

* `factor` Double - Zoom-Faktor; Der Standardwert ist 1.0.

Ändert den Zoomfaktor in den angegebenen Faktor. Zoom-Faktor ist Zoom Prozent geteilt durch 100, also 300% = 3,0.

Der Faktor muss größer als 0,0 sein.

### `webFrame.getZoomFactor()`

Gibt eine `Number` zurück - Der aktuelle Zoom Faktor.

### `webFrame.setZoomLevel(level)`

* `level` Number - Zoom level.

Ändert die Zoomstufe auf die angegebene Ebene. Die ursprüngliche Größe ist 0, und jedes -Inkrement über oder unter stellt ein Zoomum um 20 % größer oder kleiner auf standard Grenzwerte von 300 % bzw. 50 % der ursprünglichen Größe dar.

> **HINWEIS**: Die Zoomrichtlinie auf Chromium-Ebene ist gleich-Ursprung, was bedeutet, dass die Zoomstufe für eine bestimmte Domäne über alle Instanzen von Fenstern mit derselben Domäne weitergegeben wird. Durch die Differenzierung der Fenster-URLs funktioniert der Zoom pro Fenster.

### `webFrame.getZoomLevel()`

Returns `Number` - Das aktuelle Zoom Level.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Setzt das Maximum und Minimum pinch-to-zoom Level.

> **HINWEIS**: Der visuelle Zoom ist in Electron standardmäßig deaktiviert. Um es erneut zu aktivieren, rufen Sie:
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setSpellCheckProvider(Sprache, Anbieter)`

* `language` String
* `provider` -Objekt
  * `spellCheck` -Funktion
    * `words` String[]
    * `callback` Function
      * `misspeltWords` String[]

Legt einen Anbieter für die Rechtschreibprüfung in Eingabefeldern und Textbereichen fest.

Wenn Sie diese Methode verwenden möchten, müssen Sie die integrierte Rechtschreibprüfung deaktivieren, wenn Sie das Fenster erstellen .

```js
const mainWindow = neues BrowserWindow('
  webPreferences: {
    spellcheck: false
  }
)
```

Die `provider` muss ein Objekt sein, das über eine `spellCheck` Methode verfügt, die ein Array einzelner Wörter für die Rechtschreibprüfung akzeptiert. Die `spellCheck` -Funktion läuft asynchron und ruft die `callback` -Funktion mit einem Array von falsch geschriebenen Wörtern auf, wenn sie abgeschlossen sind.

Ein Beispiel für die Verwendung [Node-Spellchecker][spellchecker] als Anbieter:

```javascript
const { webFrame } = require('electron')
const spellChecker = require('spellchecker')
webFrame.setSpellCheckProvider('en-US', -
  spellCheck (Wörter, Rückruf) -
    setTimeout(() =>
      const-Rechtschreibprüfung = require('spellchecker')
      const misspelled = words.filter(x => spellchecker.isMisspelled(x))
      callback(misspelled)

  

```

### `webFrame.insertCSS(css)`

* `css` String - CSS-Quellcode.

Gibt `String` zurück - Ein Schlüssel für das eingefügte CSS, der später verwendet werden kann, um CSS über `webFrame.removeInsertedCSS(key)`zu entfernen.

Fügt CSS in die aktuelle Webseite ein und gibt einen eindeutigen Schlüssel für das eingefügte -Stylesheet zurück.

### `webFrame.removeInsertedCSS(Schlüssel)`

* `key` String

Entfernt das eingefügte CSS von der aktuellen Webseite. Das Stylesheet wird durch seinen Schlüssel identifiziert, der von `webFrame.insertCSS(css)`zurückgegeben wird.

### `webFrame.insertText(text)`

* `text` String

Füge `text` in das fokusierte Element ein.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Wird aufgerufen, nachdem das Skript ausgeführt wurde. Sofern frame angehalten wird (z. B. eine modale Warnung anzeigen), wird die Ausführung synchron und der Rückruf wird aufgerufen, bevor die Methode zurückgegeben wird. Aus Kompatibilität mit einer älteren Version dieser Methode ist der Fehlerparameter Sekunde.
  * `result` Any
  * ` Fehler </ 0> Fehler</li>
</ul></li>
</ul>

<p spaces-before="0">Gibt <code>Promise<any>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn die Ausführung ein abgelehntes Versprechen auslöst oder zu führt.</p>

Bewertet `code` in Der Seite.

Im Browserfenster können einige HTML-APIs wie `requestFullScreen` nur durch eine Geste des Benutzers aufgerufen werden. Wenn Sie `userGesture` auf `true` festlegen, wird diese Einschränkung entfernt.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - Die ID der Welt, in der die Javascript- ausgeführt werden soll, `0` die Standard-Hauptwelt (wo Inhalte ausgeführt werden), ist `999` die Welt, die von Electrons `contextIsolation` -Funktion verwendet wird. Akzeptiert Werte im Bereich 1..536870911.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Wird aufgerufen, nachdem das Skript ausgeführt wurde. Sofern frame angehalten wird (z. B. eine modale Warnung anzeigen), wird die Ausführung synchron und der Rückruf wird aufgerufen, bevor die Methode zurückgegeben wird.  Aus Kompatibilität mit einer älteren Version dieser Methode ist der Fehlerparameter Sekunde.
  * `result` Any
  * ` Fehler </ 0> Fehler</li>
</ul></li>
</ul>

<p spaces-before="0">Gibt <code>Promise<any>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn die Ausführung nicht gestartet werden konnte.</p>

Funktioniert wie `executeJavaScript` , sondern bewertet `scripts` in einem isolierten Kontext.

Beachten Sie, dass das zurückgegebene Versprechen nicht abgelehnt wird und die `result` `undefined`wird, wenn die Ausführung des Skripts fehlschlägt. Das liegt daran, dass Chromium keine , Fehler isolierter Welten in fremde Welten zu schicken.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - Die ID der Welt, in der das Javascript ausgeführt werden soll, `0` die Standardwelt ist, `999` die Welt ist, die von Electrons `contextIsolation` -Funktion verwendet wird. Chrome-Erweiterungen reservieren den ID-Bereich in `[1 << 20, 1 << 29)`. Sie können hier jede ganze Zahl angeben.
* `info` -Objekt
  * `securityOrigin` String (optional) - Sicherheitsursprung für die isolierte Welt.
  * `csp` String (optional) - Content Security Policy für die isolierte Welt.
  * `name` String (optional) - Name für isolierte Welt. Nützlich in Devtools.

Legen Sie den Sicherheitsursprung, die Inhaltssicherheitsrichtlinie und den Namen der isolierten Welt fest. Hinweis: Wenn die `csp` angegeben ist, muss auch die `securityOrigin` angegeben werden.

### `webFrame.getResourceUsage()`

Gibt das `Object` zurück:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Gibt ein Objekt zurück, das Verwendungsinformationen des internen Speichers von Blink Caches beschreibt.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

Dies generiert:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Versucht, Speicher freizugeben, der nicht mehr verwendet wird (wie Bilder aus einer vorherigen Navigation).

Beachten Sie, dass das blinde Aufrufen dieser Methode Electron wahrscheinlich langsamer macht, da es diese leeren Caches wieder auffüllen müssen, sollten Sie es nur aufrufen, wenn ein Ereignis in Ihrer App aufgetreten ist, das Sie denken lässt, dass Ihre Seite tatsächlich weniger Speicher verwendet (d. h. Sie haben von einer super schweren Seite zu einer meist leeren Seite navigiert, und beabsichtigen, dort zu bleiben).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - CSS selector für ein frame Element.

Gibt `WebFrame` zurück : Das Rahmenelement in `webFrame's` Dokument, das von `selector`ausgewählt wurde, wird `null` zurückgegeben, wenn `selector` keinen Rahmen oder auswählt, wenn sich der Rahmen nicht im aktuellen Rendererprozess befindet.

### `webFrame.findFrameByName(name)`

* `name` String

Gibt `WebFrame` zurück - Ein untergeordnetes Element von `webFrame` mit dem mitgelieferten `name`, `null` zurückgegeben wird, wenn es keinen solchen Frame gibt oder wenn sich der Frame nicht im aktuellen Rendererprozess befindet.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Ganzzahl - Ein `Integer` , der die eindeutige Frame-ID im aktuellen Rendererprozess darstellt. Routing-IDs können von `WebFrame` Instanzen abgerufen werden (`webFrame.routingId`) und werden auch von Frame- bestimmten `WebContents` Navigationsereignissen (z. B. `did-frame-navigate`)

Gibt `WebFrame` zurück - das hat die mitgelieferte `routingId`, `null` wenn nicht gefunden.

### `webFrame.isWordMisspelled(Wort)`

* `word` String - Das zu rechthabende Wort.

Gibt `Boolean` zurück - True, wenn das Wort gemäß dem eingebauten Rechtschreibprüfung falsch geschrieben wird, andernfalls false. Wenn kein Wörterbuch geladen wird, geben Sie immer false zurück.

### `webFrame.getWordVorschläge(Wort)`

* `word` String - Das falsch geschriebene Wort.

Gibt `String[]` zurück - Eine Liste der vorgeschlagenen Wörter für ein bestimmtes Wort. Wenn das Wort richtig geschrieben ist, ist das Ergebnis leer.

## Eigenschaften

### `webFrame.top` _Readonly_

Ein `WebFrame | null` , der den oberen Rahmen in der Rahmenhierarchie darstellt, zu dem `webFrame` gehört, wäre die Eigenschaft `null` , wenn sich der obere Frame nicht im aktuellen Rendererprozess befindet.

### `webFrame.opener` _Readonly_

Ein `WebFrame | null` , der den Rahmen darstellt, der `webFrame`geöffnet hat, wäre die Eigenschaft `null` wenn kein Öffner oder Öffner nicht im aktuellen Rendererprozess vorhanden ist.

### `webFrame.parent` _Readonly_

Ein `WebFrame | null` , der den übergeordneten Rahmen von `webFrame`darstellt, wäre die Eigenschaft `null` , wenn `webFrame` am Anfang oder im übergeordneten Objekt ist, nicht im aktuellen Rendererprozess.

### `webFrame.firstChild` _Readonly_

Ein `WebFrame | null` , der den ersten untergeordneten Rahmen von `webFrame`darstellt, wäre die Eigenschaft `null` , wenn `webFrame` keine untergeordneten Elemente hat oder wenn sich das erste untergeordnete Element nicht im aktuellen Rendererprozess befindet.

### `webFrame.nextSibling` _Readonly_

Ein `WebFrame | null` , der den nächsten gleichgeordneten Frame darstellt, wäre die Eigenschaft `null` , wenn `webFrame` der letzte Frame im übergeordneten Frame ist oder wenn sich das nächste gleichgeordnete Element nicht im aktuellen Rendererprozess befindet.

### `webFrame.routingId` _Readonly_

Ein `Integer` , der die eindeutige Frame-ID im aktuellen Rendererprozess darstellt. Verschiedene WebFrame-Instanzen, die auf denselben zugrunde liegenden Frame verweisen, haben dasselbe `routingId`.

[spellchecker]: https://github.com/atom/node-spellchecker

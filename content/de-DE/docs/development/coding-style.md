# Coding Style

Dies sind die Stilrichtlinien für die Codierung in Electron.

Sie können `npm run lint` ausführen, um alle Stilprobleme anzuzeigen, die von `cpplint` und `eslint`erkannt wurden.

## Allgemeiner Kodex

* Beenden Sie Dateien mit einer neuen Zeile.
* Platz erfordert in der folgenden Reihenfolge:
  * Integrierte Knotenmodule (z. B. `path`)
  * Eingebaute Elektronenmodule (z. B. `ipc`, `app`)
  * Lokale Module (mit relativen Pfaden)
* Platzieren Sie Klasseneigenschaften in der folgenden Reihenfolge:
  * Klassenmethoden und -eigenschaften (Methoden, die mit einem `@`beginnen)
  * Instanzmethoden und -eigenschaften
* Vermeiden Sie plattformabhängigen Code:
  * Verwenden Sie `path.join()` , um Dateinamen zu verketten.
  * Verwenden Sie `os.tmpdir()` anstelle `/tmp` , wenn Sie auf das temporäre Verzeichnis verweisen müssen.
* Verwenden eines einfachen `return` beim expliziten Zurückgeben am Ende einer Funktion.
  * Nicht `return null`, `return undefined`, `null` oder `undefined`

## C++ und Python

Für C++ und Python folgen wir Chromiums [Coding Style](https://www.chromium.org/developers/coding-style). Sie können [clang-Format](clang-format.md) verwenden, um den C++-Code automatisch zu formatieren. Es gibt auch ein Skript `script/cpplint.py` , um zu überprüfen, ob alle Dateien konform sind.

Die Python-Version, die wir jetzt verwenden, ist Python 2.7.

Der C++-Code verwendet viele Abstraktionen und Typen von Chromium, daher wird empfohlen, sie kennenzulernen. Ein guter Ausgangspunkt ist [Wichtige Abstraktionen und Datenstrukturen](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) Dokument. Das Dokument erwähnt einige spezielle Typen, Bereichstypen (die ihren Speicher automatisch freigeben, wenn sie den Gültigkeitsbereich erweitern), Protokollierungsmechanismen usw.

## Dokumentation

* Schreiben Sie [Bemerkung](https://github.com/remarkjs/remark) Markdownstil.

Sie können `npm run lint-docs` ausführen, um sicherzustellen, dass die Dokumentationsänderungen korrekt formatiert sind.

## JavaScript

* Schreiben Sie [Standard](https://www.npmjs.com/package/standard) JavaScript-Stil.
* Dateinamen sollten mit `-` statt mit `_`verkettet werden, z. B. `file-name.js` statt `file_name.js`, da in [github/atom](https://github.com/github/atom) Modulnamen in der Regel der `module-name` Form stehen. Diese Regel gilt nur für `.js` Dateien.
* Verwenden Sie ggf. neuere ES6/ES2015-Syntax
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) für Bedarfe und andere Konstanten.  Wenn es sich bei dem Wert um einen Primitiv handelt, verwenden Sie die Großbuchstabenbenennung (z. B. `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) zum Definieren von Variablen
  * [Arrow funktioniert](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) statt `function () { }`
  * [Template-Literale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) anstelle von String-Verkettung mit `+`

## Benennen von Dingen

Elektronen-APIs verwenden dasselbe Großschreibungsschema wie Node.js:

* Wenn das Modul selbst eine Klasse wie `BrowserWindow`ist, verwenden Sie `PascalCase`.
* Wenn es sich bei dem Modul um einen Satz von APIs wie `globalShortcut`handelt, verwenden Sie `camelCase`.
* Wenn die API eine Eigenschaft des Objekts ist und komplex genug ist, um sich in einem separaten Kapitel wie `win.webContents`zu befinden, verwenden Sie `mixedCase`.
* Verwenden Sie für andere ApIs, die nicht zum Modul gehörten, natürliche Titel wie `<webview> Tag` oder `Process Object`.

Beim Erstellen einer neuen API wird es vorgezogen, Getter und Setter anstelle einfunktionalen Stil von jQuery zu verwenden. Beispielsweise werden `.getText()` und `.setText(text)` `.text([text])`vorgezogen. Darüber gibt es eine [Diskussion](https://github.com/electron/electron/issues/46) .

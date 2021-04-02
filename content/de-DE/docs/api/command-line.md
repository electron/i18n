## Klasse: CommandLine

> Bearbeiten der Befehlszeilenargumente für Ihre App, die Chromium liest

Prozess: [Main](../glossary.md#main-process)

Das folgende Beispiel zeigt, wie Sie überprüfen, ob das `--disable-gpu` -Flag gesetzt ist.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

Weitere Informationen darüber, welche Arten von Flags und Switches Sie verwenden können, finden Sie [Befehlszeilenschalter](./command-line-switches.md) Dokument.

### Instanz Methoden

#### `commandLine.appendSwitch(switch[, wert])`

* `switch` String - Ein Befehlszeilenschalter, ohne `--`
* `value` String (optional) - Ein Wert für den angegebenen Schalter

Fügen Sie einen Schalter (mit optionalem `value`) an die Befehlszeile von Chromium an.

**Hinweis:** Dies wirkt sich nicht auf `process.argv`aus. Die beabsichtigte Verwendung dieser Funktion besteht darin, das Verhalten von Chromium zu kontrollieren.

#### `commandLine.appendArgument(Wert)`

* `value` String - Das Argument, das an die Befehlszeile angehängt werden soll

Fügen Sie ein Argument an die Befehlszeile von Chromium an. Das Argument wird korrekt zitiert. Switches gehen Argumenten unabhängig von der Anfügenreihenfolge voran.

Wenn Sie ein Argument wie `--switch=value`anfügen, sollten Sie stattdessen `appendSwitch('switch', 'value')` verwenden.

**Hinweis:** Dies wirkt sich nicht auf `process.argv`aus. Die beabsichtigte Verwendung dieser Funktion besteht darin, das Verhalten von Chromium zu kontrollieren.

#### `commandLine.hasSwitch(Schalter)`

* `switch` String - Ein Befehlszeilenschalter

Gibt `Boolean` zurück - Gibt an, ob der Befehlszeilenschalter vorhanden ist.

#### `commandLine.getSwitchValue(Schalter)`

* `switch` String - Ein Befehlszeilenschalter

Gibt `String` zurück - Der Befehlszeilenschalterwert.

**Hinweis:** Wenn der Schalter nicht vorhanden ist oder keinen Wert hat, gibt er eine leere Zeichenfolge zurück.

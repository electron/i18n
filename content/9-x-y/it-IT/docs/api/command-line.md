## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Processo: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Command Line Switches](./command-line-switches.md) document.

### Metodi Istanza

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `valore` Stringa (opziomale) - Un valore per l'interruttore dato

Aggiungi un interruttore (con `valore` opzionale) alla linea di comando di Chromium.

**Nota:** Non colpirà `processo.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `valore` Stringa - L'argomento da aggiungere alla linea di comando

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Nota:** Non colpirà `processo.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `interruttore` Stringa - Un interruttore della linea di comando

Returns `Boolean` - Whether the command-line switch is present.

#### `commandLine.getSwitchValue(switch)`

* `interruttore` Stringa - Un interruttore della linea di comando

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

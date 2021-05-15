## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Processus : [Main](../glossary.md#main-process)

L'exemple suivant montre comment vérifier si l'indicateur `--disable-gpu` est défini.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Command Line Switches](./command-line-switches.md) document.

### Méthodes d’instance

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** Ceci n'affecte pas `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - L'argument à ajouter à la ligne de commande

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** Ceci n'affecte pas `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - A command-line switch

Returns `Boolean` - Whether the command-line switch is present.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - A command-line switch

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

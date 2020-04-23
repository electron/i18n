## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Proceso: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Command Line Switches](./command-line-switches.md) document.

### Métodos de Instancia

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - Un interruptor de la linea de comandos, sin el líder `--`
* `value` Cadena (opcional) - Un valor para el cambio dado

Adjuntar un cambio (con `valor` opcional) al comando de de línea de Chromium.

**Nota:** Esto no afectará a `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `valor` Cadena - El argumento a adjuntar a la línea de comando

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

Si estas añadiendo un argumento como `--switch=value`, considere usar en su lugar `appendSwitch('switch', 'value')`.

**Nota:** Esto no afectará a `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `Boolean` - Si el interruptor de la línea de comando esta presente.

#### `commandLine.getSwitchValue(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `String` - El valor del interruptor de la linea de comando.

**Note:** Cando el interruptor no esta presento o no tiene un valor, revuelve una cadena vacía.

## Clase: CommandLine

> Manipula los argumentos de la línea de comandos para tu aplicación que Chromium lee

Proceso: [Main](../glossary.md#main-process)

El siguiente ejemplo muestra como comprobar si la bandera `--disable-gpu` está activada.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

Para más información sobre que tipos de banderas e interruptores puedes usar, revisa el documento [Command Line Switches](./command-line-switches.md).

### Métodos de Instancia

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - Un interruptor de la linea de comandos, sin el líder `--`
* `value` Cadena (opcional) - Un valor para el cambio dado

Adjuntar un cambio (con `valor` opcional) al comando de de línea de Chromium.

**Nota:** Esto no afectará a `process.argv`. El uso previsto de esta función is controlar el comportamiento de Chromium.

#### `commandLine.appendArgument(value)`

* `valor` Cadena - El argumento a adjuntar a la línea de comando

Agrega un argumento a la línea de comando de Chromium. El argumento será citado correctamente. Los interruptores precederán a los argumentos independientemente de orden agregado.

Si estas añadiendo un argumento como `--switch=value`, considere usar en su lugar `appendSwitch('switch', 'value')`.

**Nota:** Esto no afectará a `process.argv`. El uso previsto de esta función is controlar el comportamiento de Chromium.

#### `commandLine.hasSwitch(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `Boolean` - Si el interruptor de la línea de comando esta presente.

#### `commandLine.getSwitchValue(switch)`

* `switch` Cadena - Un cambio en la línea de comando

Devuelve `String` - El valor del interruptor de la linea de comando.

**Note:** Cando el interruptor no esta presento o no tiene un valor, revuelve una cadena vacía.

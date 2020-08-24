## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Процес: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### Методи Екземпляра

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - Перемикач командного рядка, без переходу `--`
* `value` String (опціонально) - Значення для перемикача

Додає перемикач (з опціональним `value`) до командного рядка Chromium.

**Примітка:** Це не впливає на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - Аргумент для додання до командного рядку

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

Якщо ви додаєте аргумент у вигляді `--switch=value`, розгляньте натомість використання `appendSwitch('switch', 'value')`.

**Примітка:** Це не впливає на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - Перемикач командного рядка

Повертає `Boolean` - Показує чи присутній перемикач командного рядка.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - Перемикач командного рядка

Повертає `String` - значення перемикача командного рядка.

**Примітка:** Якщо перемикач не присутній або не має значення, він поверне пусту стрічку.

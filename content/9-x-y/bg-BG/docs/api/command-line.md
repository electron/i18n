## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Процеса: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Command Line Switches](./command-line-switches.md) document.

### Инстантни методи

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (по избор) - Стойност за дадения превключвател

Добавете превключвател (с `value` по избор) към командния ред на Chromium.

**Забележка:** Това няма да повлияе на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - Аргументът, който ще бъде добавен в командния ред

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Забележка:** Това няма да повлияе на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - Превключвате от командния ред

Returns `Boolean` - Whether the command-line switch is present.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - Превключвате от командния ред

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

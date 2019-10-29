## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Proseso:[Pangunahi](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### Mga Halimbawa ng Sistematikong Paraan

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (opsyonal) - Ang halaga para sa ibinigay na swits

Ilapit ang swits (na may opsyonal `value`) sa linya ng command ng Chromium.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - Ang argumento ay ilakip sa linya ng command

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Note:** Ito ay hindi makaka-apekto sa `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - Ang swits ng command-line

Returns `Boolean` - Whether the command-line switch is present.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - Ang swits ng command-line

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

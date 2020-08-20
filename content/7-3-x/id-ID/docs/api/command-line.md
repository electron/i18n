## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

Proses: [Main](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
onst { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### Методы экземпляра

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (opsional) - Nilai untuk saklar yang diberikan

Tambahkan peralihan (dengan `nilai opsional`) ke baris perintah Chromium.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `nilai` String - argumen untuk menambahkan ke baris perintah

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

**Catatan:** Ini tidak akan mempengaruhi `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - Sakelar baris perintah

Returns `Boolean` - Whether the command-line switch is present.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - Sakelar baris perintah

Returns `String` - The command-line switch value.

**Note:** When the switch is not present or has no value, it returns empty string.

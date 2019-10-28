## Class: CommandLine

> Manipulate the command line arguments for your app that Chromium reads

进程：[主进程](../glossary.md#main-process)

The following example shows how to check if the `--disable-gpu` flag is set.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### 实例方法

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch, without the leading `--`
* `value` String (optional) - 给开关设置的值

通过可选的参数 `value` 给 Chromium 中添加一个命令行开关。

** 注意: **该方法不会影响 ` process. argv ` The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* ` value `String - 要追加到命令行的参数

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

If you're appending an argument like `--switch=value`, consider using `appendSwitch('switch', 'value')` instead.

** 注意: **该方法不会影响 ` process. argv ` The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - 命令行开关

返回`Boolean` - 命令行开关是否打开。

#### `commandLine.getSwitchValue(switch)`

* `switch` String - 命令行开关

返回 `String` - 命令行开关值。

**Note:** When the switch is not present or has no value, it returns empty string.

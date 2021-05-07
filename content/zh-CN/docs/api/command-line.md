## 类: CommandLine

> 操作Chromium读取的应用程序的命令行参数

进程：[主进程](../glossary.md#main-process)

下面的例子展示了如何检查`—disable-gpu`标志是否设置。

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

关于你可以使用哪些参数，请查阅[命令行参数](./command-line-switches.md)文档。

### 实例方法

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - 命令行开关，不包含前边的-- `--`
* `value` String (optional) - 给开关设置的值

通过可选的参数 `value` 给 Chromium 中添加一个命令行开关。

** 注意: **该方法不会影响 ` process. argv ` 该功能是为控制Chromium行为设计的。

#### `commandLine.appendArgument(value)`

* ` value `String - 要追加到命令行的参数

在Chromium的命令行中附加一个参数。 参数会被正确引用。 无论附加顺序如何，切换将在参数之前进行。

如果你正在追加一个参数，如`--switch=value`, 请考虑使用`appendSwitch('switch', 'value')`

** 注意: **该方法不会影响 ` process. argv ` 该功能是为控制Chromium行为设计的。

#### `commandLine.hasSwitch(switch)`

* `switch` String - 命令行开关

返回`Boolean` - 命令行开关是否打开。

#### `commandLine.getSwitchValue(switch)`

* `switch` String - 命令行开关

返回 `String` - 命令行开关值。

**注意：** 当开关不存在或没有值时，它返回空字符串。

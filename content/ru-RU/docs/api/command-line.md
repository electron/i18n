## Class: CommandLine

> Манипулирование аргументами командной строки для вашего приложения, которое читает Chromium

Процесс: [Главный](../glossary.md#main-process)

В следующем примере показано, как проверить, установлен ли флаг `--disable-gpu`.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

For more information on what kinds of flags and switches you can use, check out the [Chrome Command Line Switches](./chrome-command-line-switches.md) document.

### Методы экземпляра

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - переключатель командной строки, без ведущего `--`
* `value` String (опиционально) - значение для данного переключателя

Добавьте переключатель (с опциональным значением `value`) Chromium в командной строке.

**Примечание:** Это не повлияет на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.appendArgument(value)`

* `value` String - аргумент для добавления в командную строку

Append an argument to Chromium's command line. The argument will be quoted correctly. Switches will precede arguments regardless of appending order.

Если Вы добавляете аргумент, такой как `--switch=value`, вместо этого рассмотрите использование `appendSwitch('switch', 'value')`.

**Примечание:** Это не повлияет на `process.argv`. The intended usage of this function is to control Chromium's behavior.

#### `commandLine.hasSwitch(switch)`

* `switch` String - переключатель командной строки

Возвращает `Boolean` - есть или нет переключатель командной строки.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - переключатель командной строки

Возвращает `String` - значение переключателя командной строки.

**Примечание:** Когда переключатель не присутствует или не имеет значения, возвращает пустую строку.

## Class: CommandLine

> Манипулирование аргументами командной строки для вашего приложения, которое читает Chromium

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

В следующем примере показано, как проверить, установлен ли флаг `--disable-gpu`.

```javascript
const { app } = require('electron')
app.commandLine.hasSwitch('disable-gpu')
```

Для получения более подробной информации о том, какие флаги и переключатели можно использовать, смотрите [переключатели командной строки](./command-line-switches.md).

### Методы экземпляра

#### `commandLine.appendSwitch(switch[, value])`

* `switch` String - переключатель командной строки, без ведущего `--`
* `value` String (опиционально) - значение для данного переключателя

Добавьте переключатель (с опциональным значением `value`) Chromium в командной строке.

**Примечание:** Это не повлияет на `process.argv`. Предполагаемое использование этой функции — управлять поведением Chromium.

#### `commandLine.appendArgument(value)`

* `value` String - аргумент для добавления в командную строку

Добавляет аргумент в командную строку Chromium. Аргумент будет указан правильно. Переключатели будут предшествовать аргументам независимо от порядка добавления.

Если Вы добавляете аргумент, такой как `--switch=value`, вместо этого рассмотрите использование `appendSwitch('switch', 'value')`.

**Примечание:** Это не повлияет на `process.argv`. Предполагаемое использование этой функции — управлять поведением Chromium.

#### `commandLine.hasSwitch(switch)`

* `switch` String - переключатель командной строки

Возвращает `Boolean` - есть или нет переключатель командной строки.

#### `commandLine.getSwitchValue(switch)`

* `switch` String - переключатель командной строки

Возвращает `String` - значение переключателя командной строки.

**Примечание:** Когда переключатель не присутствует или не имеет значения, возвращает пустую строку.

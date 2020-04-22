# Упаковка приложений

Для смягчения [проблем](https://github.com/joyent/node/issues/6960), связанных с длинными именами путей в Windows, небольшого ускорения `require` и скрытия исходного кода вы можете упаковать ваше приложение в [asar](https://github.com/electron/asar) архив с минимальными изменениями в исходном коде.

Для большинства пользователей это просто, потому что это поддерживается "из коробки" [`electron-packager`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), и [`electron-builder`](https://github.com/electron-userland/electron-builder). Если же вы не используете ни один из этих инструментов, читайте дальше.

## Создание `asar` архивов

Архив [asar](https://github.com/electron/asar) это простой tar-подобный формат, который объединяет файлы в один общий файл. Electron может читать любые файлы из архива без распаковки всего архива.

Шаги по упаковке приложения в `asar`-архив:

### 1. Установка утилиты asar

```sh
$ npm install -g asar
```

### 2. Упаковка в `asar pack`

```sh
$ asar pack your-app app.asar
```

## Использование архива `asar`

In Electron there are two sets of APIs: Node APIs provided by Node.js and Web APIs provided by Chromium. Both APIs support reading files from `asar` archives.

### Node API

С помощью специальных патчей в Electron Node API, например, `fs.readFile` и `require` обрабатывают архивы `asar` как виртуальные каталоги, а файлы в нем - как обычные файлы в файловой системе.

Например, предположим что у нас есть архив `example.asar` лежащий в `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Прочитать файл в `asar`-архиве:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Получить список всех файлов в корне архива:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Использовать модуль из архива:

```javascript
require('/path/to/example.asar/dir/module.js')
```

Также вы можете открыть веб-страницу из `asar` архива с помощью `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

In a web page, files in an archive can be requested with the `file:` protocol. Like the Node API, `asar` archives are treated as directories.

Например, получение файла с помощью `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Обработка архивов `asar` в качестве нормального файла

В некоторых случаях вроде проверки контрольной суммы `asar` архива, нам может потребоваться получить `asar` архив как обычный файл. Для этих целей вы можете использовать встроенный модуль `original-fs`, который предоставляет оригинальный интерфейс `fs` без поддержки обработки `asar`:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Также вы можете установить переменную `process.noAsar` в `true` для отключения поддержки `asar` в модуле `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Ограничения Node API

Несмотря на наши усилия сделать архивы `asar` в Node API максимально похожими на каталоги, по прежнему существуют ограничения из-за низкоуровневой природы Node API.

### Архивы только для чтения

Архивы не могут быть модифицированы, поэтому все Node API, которые изменяют файлы, не будут работать с архивами `asar`.

### Рабочий каталог не может быть задан как каталог в архиве

Хотя `asar` архивы и рассматриваются как каталоги, фактически в файловой системе их нет, поэтому вы никогда не сможете установить рабочий каталог в `asar` архиве. Передача их в качестве опций `cwd` некоторых API также приведет к ошибкам.

### Дополнительная распаковка некоторых API

Большинство API-интерфейсов `fs` могут читать файл или получать информацию из архивов `asar` без распаковки, но для некоторых API, которые полагаются на передачу реального пути к базовым системным вызовам, Electron будет извлекать необходимый файл во временный файл и передавать путь временного файл для API, чтобы заставить их работать. Это добавляет немного оверхэдов для этих API.

Интерфейсы, которые требуют дополнительной распаковки:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - использует `require` на нативных модулях

### Поддельная информация из `fs.stat`

Объект `Stats`, возвращаемый `fs.stat` из `asar` архивов генерируется "с потолка", поскольку этих файлов нет в реальной файловой системе. Поэтому единственное, чему вы можете доверять в таком объекте `Stats` - размер файла и его тип.

### Выполнение бинарных файлов внутри архива `asar`

В Node APIs существуют интерфейсы, которые могут выполнять двоичные файлы, например `child_process.exec`, `child_process.spawn` и `child_process.execFile`, но только `execFile` способен выполнить бинарный файл из архива `asar`.

This is because `exec` and `spawn` accept `command` instead of `file` as input, and `command`s are executed under shell. Нет надежного способа определить использует ли команда файл в asar-архиве и даже если мы это сделаем, то нет уверенности, можем ли мы заменить путь в команде без побочных эффектов.

## Добавление файлов в архив `asar`

As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:

```sh
$ asar pack app app.asar --unpack *.node
```

После выполнения этой команды вы обнаружите, что вместе с файлом `app.asar` была создана папка `app.asar.unpacked`. Она содержит незапакованные файлы и должна распространяться вместе с архивом `app.asar`.


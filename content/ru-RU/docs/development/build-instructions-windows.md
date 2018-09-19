# Инструкции по сборке (Windows)

Следуйте рекомендациям ниже для сборки Electron под Windows.

## Требования

* Windows 10 / Server 2012 R2 или выше
* Visual Studio 2017 15.7.2 или выше - [скачать VS Community Edition бесплатно](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Средства отладки для Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx), если вы планируете создавать распространяемое приложение, так как `symstore.exe` используется для создания хранилища символов из `.pdb` файлов.

Если у вас нет установщика Windows, то [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) имеет версии Windows, которые вы можете использовать для сборки Electron.

Сборка Electron осуществляется исключительно через скрипты командной строки, и не может быть осуществлена в Visual Studio. Вы можете разрабатывать Electron в любом редакторе, но в будущем будет поддержка сборки в Visual Studio.

**Примечание:** Даже если Visual Studio не используется для сборки, он всё ещё **требуется**, потому что нам нужны средства сборки, которые он предоставляет.

## Сборка

See [Build Instructions: GN](build-instructions-gn.md)

## 32-битная сборка

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Все остальные инструкции по сборке идентичны.

## Проект Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Устранение проблем

### Команда xxxx не найдена

Если вы столкнулись с ошибкой по типу `Команда xxxx не найдена`, вы можете попробовать использовать `VS2015 Command Prompt` консоль для выполнения скриптов сборки.

### Fatal internal compiler error: C1001

Убедитесь, что у вас установлена последняя версия Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Попробуйте переустановить 32-х битный Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Создание директории по данному пути [должно исправить проблему](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Вы можете столкнуться с этой ошибкой, если вы используете Git Bash для сборки, вместо этого, вы должны использовать PowerShell или командную строку Visual Code.

### cannot create directory at '...': Filename too long

node.js имеет несколько [слишком длинных путей](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), и по стандарту, git на windows не обрабатывает длинные пути корректно (даже если windows их поддерживает). Это должно помочь:

```sh
$ git config --system core.longpaths true
```
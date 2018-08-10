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

## Получение кода

```powershell
$ git clone https://github.com/electron/electron.git
```

## Самонастройка

Скрипт bootstrap скачает все необходимые зависимые сборки и построит файлы проекта. Обратите внимание, что мы используем `ninja` для сборки Electron, поэтому проект в Visual Studio не создается.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Сборка

Построить обе Release и Debug цели:

```powershell
$ python script\build.py
```

Вы можете построить только Debug:

```powershell
$ python script\build.py -c D
```

Как только сборка завершена, вы можете найти `electron.exe` в папке `out\D` (для отладки) или в `out\R` (для релиза).

## 32bit Build

Для сборки 32-битного проекта, вам требуется указать `--target_arch=ia32` когда вы запускаете скрипт bootstrap:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Все остальные инструкции по сборке идентичны.

## Проект Visual Studio

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Очистка

Очистить файлы построения:

```powershell
$ npm run clean
```

Для очистки только `out` и `dist` каталогов:

```sh
$ npm run clean-build
```

**Примечание:** Обе команды очистки требуют запуска `bootstrap` снова перед построением.

## Тестирование

Смотрите [Build System Overview: Tests](build-system-overview.md#tests)

## Устранение проблем

### Command xxxx not found

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Make sure you have the latest Visual Studio update installed.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Попробуйте переустановить 32х битный Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```
# Инструкции по сборке (Windows)

Follow the guidelines below for building **Electron itself** on Windows, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Требования

* Windows 10 / Server 2012 R2 или выше
* Visual Studio 2017 15.7.2 or higher - [download VS 2019 Community Edition for free](https://www.visualstudio.com/vs/)
  * Смотрите [документацию по сборке Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) для получения более подробной информации о том, какие компоненты Visual Studio необходимы.
  * Если ваша Visual Studio установлена в каталог, отличающийся от стандартного, вам нужно установить несколько переменных среды, чтобы указать инструментам на путь установки.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, replacing `2019` and `Community` with your installed versions and replacing `DRIVE:` with the drive that Visual Studio is on. Обычно, это `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Обычно, это `C:`.
  * [Дополнения Python для Windows (pywin32)](https://pypi.org/project/pywin32/#files) также нужны для запуска процесса сборки.
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Различные версии SDK могут быть установлены бок о бок. Для установки SDK откройте установщик Visual Studio, выберите `Изменить` → `Индивидуальные компоненты`, прокрутите вниз и выберите соответствующий Windows SDK для установки. Другая опция заключается в том, чтобы посмотреть на [Windows SDK и архив эмулятора](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) и скачать отдельную версию SDK соответственно.
  * Также необходимо установить инструменты отладки SDK. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

Если у вас нет установщика Windows, то [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) имеет версии Windows, которые вы можете использовать для сборки Electron.

Сборка Electron осуществляется исключительно через скрипты командной строки, и не может быть осуществлена в Visual Studio. Вы можете разрабатывать Electron в любом редакторе, но в будущем будет поддержка сборки в Visual Studio.

**Примечание:** Даже если Visual Studio не используется для сборки, он всё ещё **требуется**, потому что нам нужны средства сборки, которые он предоставляет.

## Exclude source tree from Windows Security

Windows Security doesn't like one of the files in the Chromium source code (see https://crbug.com/441184), so it will constantly delete it, causing `gclient sync` issues. You can exclude the source tree from being monitored by Windows Security by [following these instructions](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26).

## Сборка

See [Build Instructions: GN](build-instructions-gn.md)

## 32-битная сборка

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Все остальные инструкции по сборке идентичны.

## Проект Visual Studio

Для генерации проекта в Visual Studio, вы можете передать параметр `--ide=vs2017` в `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
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

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

Убедитесь, что вы установили `pywin32` при помощи `pip install pywin32`.

### Строить сценарии повесить до Keypress

Эта ошибка является "функцией" командной строки Windows. It happens when clicking inside the prompt window with `QuickEdit` enabled and is intended to allow selecting and copying output text easily. Puisque chaque clic accidentel met en pause le processus de construction, vous pouvez désactiver cette fonctionnalité dans les propriétés de l'invite de commande.

[application-distribution]: ../tutorial/application-distribution.md

# Інструкція Збірки (Windows)

Дотримуйтесь рекомендацій нижче для збірки Electron під Windows.

## Системні вимоги

* Windows 10 / Server 2012 R2 або вище
* Visual Studio 2017 15.7.2 or higher - [download VS 2019 Community Edition for free](https://www.visualstudio.com/vs/)
  * Перегляньте [документацію по збірці Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) для отримання детальнішої інформації про те, які компоненти Visual Studio необхідні.
  * Якщо ваша Visual Studio встановлена в каталог, що відрізняється від стандартного, вам потрібно встановити кілька змінних середовища, щоб вказати інструментам на шлях встановлення.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, replacing `2019` and `Community` with your installed versions and replacing `DRIVE:` with the drive that Visual Studio is on. Often, this will be `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Often, this will be `C:`.
* [Python 2.7.10 або вище](http://www.python.org/download/releases/2.7/)
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). Для цього, переконайтеся, що в **PATH**, ваш локально встановлений Python знаходиться перед текою `depot_tools`. Прямо зараз `depot_tools` все ще поставляється з Python 2.7.6, що призведе до помилки команди `gclient` (див. https://crbug.com/868864).
  * [ Розширення Python для Windows (pywin32)](https://pypi.org/project/pywin32/#files) також необхідні для запуску процесу збірки.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

Збірка Electron здійснюється виключно через скрипти командного рядка, і не може бути здійснена в Visual Studio. You can develop Electron with any editor but support for building with Visual Studio will come in the future.

**Примітка:** Навіть якщо Visual Studio не використовується для збірки, вона все ще **вимагається**, тому що нам потрібні ланцюжки збірки, які він надає.

## Exclude source tree from Windows Security

Windows Security doesn't like one of the files in the Chromium source code (see https://crbug.com/441184), so it will constantly delete it, causing `gclient sync` issues. You can exclude the source tree from being monitored by Windows Security by [following these instructions](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26).

## Building

See [Build Instructions: GN](build-instructions-gn.md)

## 32bit Build

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Всі інші інструкції по збірці ідентичні.

## Проект Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
```

## Виправлення Неполадок

### Команда xxxx не знайдена

Якщо ви зіткнулися з помилкою на зразок `Команду xxxx не знайдено`, ви можете спробувати використовувати консоль `VS2015 Command Prompt` для виконання скриптів збірки.

### Fatal internal compiler error: C1001

Переконайтеся, що у вас встановлено останнє оновлення Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Спробуйте перевстановити 32-ух бітну Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Ви можете зіткнутися з цією помилкою, якщо ви використовуєте Git Bash для збірки, замість цього, ви повинні використовувати PowerShell або командний рядок VS2015.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). Це має виправити:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### Помилка імпорту: Немає модуля з назвою win32file

Переконайтеся, що ви встановили `pywin32`, використовуючи`pip install pywin32`.

### Build Scripts Hang Until Keypress

This bug is a "feature" of Windows' command prompt. It happens when clicking inside the prompt window with `QuickEdit` enabled and is intended to allow selecting and copying output text easily. Since each accidental click will pause the build process, you might want to disable this feature in the command prompt properties.

# Instrukcje Budowania (Windows)

Follow the guidelines below for building Electron on Windows.

## Wymagania

* Windows 10 / Server 2012 R2 lub wyżej
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

Building Electron is done entirely with command-line scripts and cannot be done with Visual Studio. Możesz rozwijać Electron z każdym edytorem, ale wsparcie dla budowy z Visual Studio powstanie w przyszłości.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Kompilowanie

See [Build Instructions: GN](build-instructions-gn.md)

## 32bit Build

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Inne kroki budowania są dokładnie takie same.

## Visual Studio project

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Rozwiązywanie problemów

### Komenda xxxx nie znaleziona

Jeśli wystąpił bład taki ajk `Komenda xxxx nie znaleziona`, możesz spróbować użyć kompilacji skryptów za pomocą konsoli `Wiersza polecenia VS2015`.

### Błąd krytyczny wewnętrznego kompilatora: C1001

Upewnij się, że masz zainstalowaną najnowszą aktualizację programu Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Ten błąd może wystąpić, jeśli używasz Git Bash do budynku, zamiast tego należy użyć środowiska PowerShell lub wiersz polecenia VS2015.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```
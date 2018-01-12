# Instrukcje Budowania (Windows)

Follow the guidelines below for building Electron on Windows.

## Wymagania

* Windows 7 / Server 2008 R2 or higher
* Visual Studio 2015 Update 3 - [download VS 2015 Community Edition for free](https://www.visualstudio.com/vs/older-downloads/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

Building Electron is done entirely with command-line scripts and cannot be done with Visual Studio. Możesz rozwijać Electron z każdym edytorem, ale wsparcie dla budowy z Visual Studio powstanie w przyszłości.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Dostawanie kodu

```powershell
$ git clone https://github.com/electron/electron.git
```

## Bootstrapping

The bootstrap script will download all necessary build dependencies and create the build project files. Notice that we're using `ninja` to build Electron so there is no Visual Studio project generated.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Kompilowanie

Build both Release and Debug targets:

```powershell
$ python script\build.py
```

Możesz również zbudować tylko cel debugowania:

```powershell
$ python script\build.py -c D
```

After building is done, you can find `electron.exe` under `out\D` (debug target) or under `out\R` (release target).

## 32bit Build

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Inne kroki budowania są dokładnie takie same.

## Visual Studio project

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Czyszczenie

Aby wyczyścić pliki kompilacji:

```powershell
$ npm działa bez problemu
```

Aby oczyścić tylko `z` i `dist`katalogów:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Testy

See [Build System Overview: Tests](build-system-overview.md#tests)

## Rozwiązywanie problemów

### Komenda xxxx nie znaleziona

Jeśli wystąpił bład taki ajk `Komenda xxxx nie znaleziona`, możesz spróbować użyć kompilacji skryptów za pomocą konsoli `Wiersza polecenia VS2015`.

### Błąd krytyczny wewnętrznego kompilatora: C1001

Upewnij się, że masz zainstalowaną najnowszą aktualizację programu Visual Studio.

### Potwierdzenie nie powiodło się: ((uchwyt))-> activecnt > = 0

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

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Simply making that directory [should fix the problem](http://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.
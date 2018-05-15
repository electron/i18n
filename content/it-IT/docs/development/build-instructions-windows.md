# Istruzioni per la compilazione (Windows)

Follow the guidelines below for building Electron on Windows.

## Prerequisiti

* Windows 7 / Server 2008 R2 or higher
* Visual Studio 2017 - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

La costruzione di Electron viene eseguita interamente con script da riga di comando e non può essere eseguita con Visual Studio. Puoi sviluppare Electron con qualsiasi editor, ma il supporto per la creazione con Visual Studio arriverà in futuro.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Ottenere i sorgenti

```powershell
$ git clone https://github.com/electron/electron.git
```

## Bootstrapping

Lo script di bootstrap scaricherà tutte le dipendenze necessarie alla compilazione e creerà tutti i file di progetto. Notice that we're using `ninja` to build Electron so there is no Visual Studio project generated.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Building

Build both Release and Debug targets:

```powershell
$ python script\build.py
```

Puoi anche creare solo il target di debug:

```powershell
$ python script\build.py -c D
```

After building is done, you can find `electron.exe` under `out\D` (debug target) or under `out\R` (release target).

## 32bit Build

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Le altre fasi di costruzione sono esattamente le stesse.

## Visual Studio project

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Cleaning

To clean the build files:

```powershell
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Tests

See [Build System Overview: Tests](build-system-overview.md#tests)

## Risoluzione dei problemi

### Command xxxx not found

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Assicurati di aver installato l'ultimo aggiornamento di Visual Studio.

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

Questo è causato da un bug quando si usano insieme Cygwin Python e il Node Win32. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.
# Istruzioni per la compilazione (Windows)

Follow the guidelines below for building Electron on Windows.

## Prerequisiti

* Windows 10 / Server 2012 R2 or higher
* Visual Studio 2017 15.7.2 or higher - [download VS 2019 Community Edition for free](https://www.visualstudio.com/vs/) 
  * See [the Chromium build documentation](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) for more details on which Visual Studio components are required.
  * If your Visual Studio is installed in a directory other than the default, you'll need to set a few environment variables to point the toolchains to your installation path. 
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community` (replace `2019` and `Community` with your installed versions)
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`
* [Python 2.7.10 or higher](http://www.python.org/download/releases/2.7/) 
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` file. 
  * Differenti versioni di SDK possono essere installate fianco a fianco. Per installare SDK, apri Visual Studio Installer, seleziona `Modifica` → `Componenti Individuali`, scendi e seleziona l'appropriato SDK Windows per installare. Un'altra opzione sarebbe di guardare al [Windows SDK ed emulatore archivio](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) e scaricare la versione standalone del SDK rispettivamente.
  * Gli Strumenti di Debug SDK devono anch'essi essere installati. Se l'SDK di Windows 10 era installato tramite il Visual Studio Installer, allora possono essere installati andando a: `Pannello di Controllo` → `Programmi` → `Programmi e Funzionalità` → Seleziona il "Kit di Sviluppo Software Windows" → `Cambia` → `Modifica` → Spunta "Strumenti di Debug per Windows" → `Modifica`. Oppure, puoi scaricare l'installatore SDK standalone ed usarlo per installare gli Strumenti di Debug.

Se al momento non hai un'installazione Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) ha versioni timebombed di Windows che puoi usare per costruire Electron.

La costruzione di Electron viene eseguita interamente con script da riga di comando e non può essere eseguita con Visual Studio. Puoi sviluppare Electron con qualsiasi editor, ma il supporto per la creazione con Visual Studio arriverà in futuro.

**Nota:** Anche se Visual Studio non è usato per costruire, è comunque **richiesto** perché ci servono le catene di costruzione che fornisce.

## Costruzione

Vedi [Istruzioni di Costruzione: GN](build-instructions-gn.md)

## Build 32bit

Per costruire l'obiettivo 32bit, devi passare `target_cpu = "x86"` come arg GN. Puoi costruire l'obiettivo 32bit accanto all'obiettivo 64bit usando una directory di output differente per GN, es. `out/Release-x86`, con differenti argomenti.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Le altre fasi di costruzione sono esattamente le stesse.

## Progetto Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Risoluzione dei problemi

### Command xxxx not found

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Assicurati di aver installato l'ultimo aggiornamento di Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

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

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### Errore di importazione: nessun modulo denominato win32file

Assicurati di aver installato `pywin32` con `pip install pywin32`.

### Build Scripts Hang Until Keypress

This bug is a "feature" of Windows' command prompt. It happens when clicking inside the prompt window with `QuickEdit` enabled and is intended to allow selecting and copying output text easily. Since each accidental click will pause the build process, you might want to disable this feature in the command prompt properties.
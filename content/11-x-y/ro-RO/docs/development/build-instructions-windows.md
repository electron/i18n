# Instrucțiuni de generare (Windows)

Urmați instrucțiunile de mai jos pentru a construi Electron pe Windows.

## Cerințe preliminare

* Windows 10 / Server 2012 R2 sau o versiune ulterioară
* Visual Studio 2017 15.7.2 or higher - [download VS 2019 Community Edition for free](https://www.visualstudio.com/vs/)
  * Vezi [documentaţia de construcţie Chromium](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) pentru mai multe detalii despre componentele Visual Studio care sunt necesare.
  * Dacă Visual Studio este instalat într-un alt director decât cel implicit, va trebui să setați câteva variabile de mediu pentru a indica înlănțuirea instrumentului către calea de instalare.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, înlocuirea `2019` și `comunitar` cu versiunile instalate și înlocuirea `DRIVE:` cu unitatea pe care este pornit Studioul vizual. Adesea, acesta va fi `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Adesea, acesta va fi `C:`.
* [Python 2.7.10 sau mai mare](http://www.python.org/download/releases/2.7/)
  * Contrar instrucțiunilor de configurare `depot_tools` conectate mai jos, veți avea nevoie de pentru a utiliza Python instalat local, cu cel puțin versiunea 2.7.10 (cu sprijin pentru TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Chiar acum `depot_tools` încă vine cu Python 2.7.6, ceea ce va face ca comanda `gclient` să eșueze (vezi https://crbug.com/868864).
  * [Extensiile Python pentru Windows (pywin32)](https://pypi.org/project/pywin32/#files) este, de asemenea, necesară pentru a executa procesul de compilare.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Diferite versiuni ale SDK pot fi instalate una lângă alta. Pentru a instala SDK, deschide Visual Studio Installer, selectaţi `Change` → `Individual Components`, defilează în jos şi selectează corespunzător Windows SDK pentru instalare. O altă opțiune ar fi să se uite la [Windows SDK și arhiva emulator](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) și pentru a descărca versiunea independentă a SDK, respectiv.
  * De asemenea, trebuie instalate instrumentele de depanare SDK. Dacă Windows 10 SDK a fost instalat prin programul de instalare Visual Studio, atunci acestea pot fi instalate accesând: `Panou de control` → `Programe` → `Programe și Caracteristici` → Selectați "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools for Windows" → `Change`. Sau puteți descărca instalatorul SDK și să-l folosiți pentru a instala instrumente de depanare.

Dacă nu aveți în prezent o instalare Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) are versiuni de Windows cu bombă temporală pe care le puteți utiliza pentru a construi Electron.

Construirea Electron se face în întregime cu script-uri de linie de comandă și nu se poate face cu Visual Studio. Puteți dezvolta Electron cu orice editor, dar suport pentru clădire cu Visual Studio va veni în viitor.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Building

See [Build Instructions: GN](build-instructions-gn.md)

## Construcție pe 32 de biți

Pentru a construi pentru ținta de 32 de biți, trebuie să treceți `target_cpu = "x86"` peste argumentul GN. Puteți construi ținta pe 32 de biți alături de ținta pe 64 de biți utilizând un director de ieșire diferit pentru GN, de exemplu. `out/Release-x86`, cu diferite argumente.

```powershell
$ gn gen out/releasease-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Celelalte trepte de construcție sunt exact la fel.

## Proiect Visual Studio

Pentru a genera un proiect Visual Studio, puteți trece parametrul `--ide=vs2017` la `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
```

## Depanare

### Comanda xxxx nu a fost găsită

Dacă ați întâlnit o eroare ca `Comanda xxxx nu a fost găsită`, puteți încerca să utilizați comanda `VS2015` pentru a executa scripturile de construcții.

### Eroare fatală internă de compilator: C1001

Asigurați-vă că aveți instalată cea mai recentă actualizare Visual Studio.

### LNK1181: nu se poate deschide fișierul de intrare 'kernel32.lib'

Încercați să reinstalați Node.js pe 32 de biți.

### Eroare: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Crearea acelui director [ar trebui să rezolve problema](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### eroare: "node-gyp is not recognized as an internal or external command"

Este posibil să primiți această eroare dacă utilizați Git Bash pentru construcție, ar trebui să utilizați În schimb, promptul de comandă PowerShell sau VS2015.

### nu se poate crea directorul la '...': numele fișierului este prea lung

node.js are câteva [căi de acces extrem de lungi](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish) și, în mod implicit, git pe Windows nu gestionează corect căile de acces lungi (chiar dacă Windows le acceptă). Aceasta ar trebui să o remedieze:

```sh
$ git config --system core.longpaths true
```

### eroare: utilizarea identificatorului nedeclarat 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

Make sure you have installed `pywin32` with `pip install pywin32`.

### Build Scripts Hang Until Keypress

This bug is a "feature" of Windows' command prompt. It happens when clicking inside the prompt window with `QuickEdit` enabled and is intended to allow selecting and copying output text easily. Since each accidental click will pause the build process, you might want to disable this feature in the command prompt properties.

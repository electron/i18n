# Instrucciones para compilación (Windows)

Siga las indicaciones a continuación para compilar Electron en Windows.

## Pre-requisitos

* Windows 10 / Server 2012 R2 o superior
* Visual Studio 2017 15.7.2 o posterior - [descargue de manera gratuita de VS 2017 Community Edition](https://www.visualstudio.com/vs/)
* [Python 2.7.10 o posterior](http://www.python.org/download/releases/2.7/) 
  * Contrariamente a las instrucciones de configuración de `depot_tools` enlazadas a continuación, necesitará usar su Python instalado localmente con al menos la versión 2.7.10 (con soporte para TLS 1.2). Para hacerlo, asegúrese de que en **PATH**, su Python instalado localmente viene antes de la carpeta `depot_tools`. Ahora mismo `depot_tools` todavía viene con Python 2.7.6, lo que causará que el comando `gclient` falle (ver https://crbug.com/868864).
  * También se necesita la [extensión de Python para Windows (pywin32)](https://pypi.org/project/pywin32/#files) para ejecutar el proceso de construcción.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Herramientas de depuración para Windows de Windows SDK 10.0.15063.468 si planea crear una distribución completa, pues `symstore.exe` se usa para crear un depósito de símbolo a partir de `.pdb` archivos. 
  * Diferentes versiones del SDK se pueden instalar juntas. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

Si actualmente no tiene una instalación de Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser generado con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para construir con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para construir, todavía se **requiere** debido a que necesitamos las herramientas que provee para construir.

## Compilando

Ver [Build Instructions: GN](build-instructions-gn.md)

## Arquitectura 32bit

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

El resto de los pasos son exactamente los mismos.

## Proyecto de Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Problemas

### Comand xxxx not found

Si encuentra un error como `Comand xxxx not found`, intente usar la `Consola de Comandos de VS2015` para ejecutar los scripts de compilacion.

### Fatal internal compiler error: C1001

Asegúrese de que tiene instalada la última versión de Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Intente reinstalar Node.js 32bit.

### Error: ENOENT, estatus 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Debe obtener este error si está usando Git Bash para la compilación, en cambio debería usar PowerShell o la ventana de comandos de VS2015.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). Esto debería arreglarlo:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### Error de importación: No existe un módulo llamado win32file

Asegúrese de haber instalado `pywin32` con `pip install pywin32`.
# Instrucciones para compilación (Windows)

Siga las indicaciones a continuación para compilar Electron en Windows.

## Pre-requisitos

* Windows 10 / Server 2012 R2 o superior
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Herramientas de depuración para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) Si piensa crear una distribución completa ya que `symstore.exe` es usado para la creación de biblioteca de símbolos basadas en archivos `.pdb`.

Si actualmente no tiene una instalación de Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser generado con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para construir con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para construir, todavía se **requiere** debido a que necesitamos las herramientas que provee para construir.

## Compilando

See [Build Instructions: GN](build-instructions-gn.md)

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
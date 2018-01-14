# Instrucciones para compilación (Windows)

Siga las indicaciones a continuación para construir Electron en Windows.

## Pre-requisitos

* Windows 7 / Servidor 2008 R2 o superior
* Visual Studio 2015 actualización 3 - [descargar VS 2015 edición de la comunidad gratis](https://www.visualstudio.com/vs/older-downloads/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Herramientas de depuración para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) Si planea crear una distribución completa considerando que `symstore.exe` es usado para la creación de la biblioteca de símbolos para lo archivos `.pdb`.

Si no tiene una instalación de Windows actualmente, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser hecho con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para la construcción con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para la construcción, todavía se **requiere** debido a que necesitamos la cadena de herramientas que este provee para construir.

## Obteniendo Código

```powershell
$ git clone https://github.com/electron/electron.git
```

## Bootstrapping

El script bootstrap descargará todas las dependencias es necesario compilar y crear la estructura de archivos de proyecto. Note que estamos usando `ninja` para construir Electron así que no hay ningún proyecto de Visual Studio generado.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Edificio

Compilar objetivos de Release y Debug:

```powershell
$ python script\build.py
```

También puede construir un objetivo de depuración:

```powershell
$ python script\build.py -c D
```

Después de que la construcción está hecha, usted puede encontrar `electron.exe` con el nombre `out\D` (objetivo de depuración) o como `out\R` (objetivo de lanzamiento).

## Estructuras en 32bit

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

The other building steps are exactly the same.

## Visual Studio project

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Limpieza

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

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)

## Problemas

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

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Simply making that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.
# Instrucciones para compilación (Windows)

Siga las indicaciones a continuación para compilar Electron en Windows.

## Pre-requisitos

* Windows 7 / Server 2008 R2 o superior
* Visual Studio 2017 - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Herramientas de depuración para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) Si piensa crear una distribución completa ya que `symstore.exe` es usado para la creación de biblioteca de símbolos basadas en archivos `.pdb`.

Si actualmente no tiene una instalación de Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser generado con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para construir con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para construir, todavía se **requiere** debido a que necesitamos las herramientas que provee para construir.

## Obteniendo el código

```powershell
$ git clone https://github.com/electron/electron.git
```

## Inicialización

El script bootstrap descargará todas las dependencias de compilacion necesarias y creará la estructura de archivos del proyecto. Fijese que estamos usando `ninja` para construir Electron así que no hay ningún proyecto de Visual Studio generado.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Compilando

Compilar ambas versiones Release y Debug:

```powershell
$ python script\build.py
```

También puede solo construir la version Debug:

```powershell
$ python script\build.py -c D
```

Después de que acabe la compilación, puede encontrar `electron.exe` en `out\D` (version debug) o en `out\R` (version release).

## Arquitectura 32bit

Para construir una versión de 32bit, necesita pasar `--target_arch=ia32` cuando ejecute el script bootstrap:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

El resto de los pasos son exactamente los mismos.

## Proyecto de Visual Studio

Para generar un proyecto Visual Studio, se puede pasar el argumento `--msvs`:

```powershell
$ python script\bootstrap.py --msvs
```

## Limpieza

Para limpiar los archivos construidos:

```powershell
$ npm run clean
```

Para limpiar solo los directorios `fuera` y `dist`:

```sh
$ npm run clean-build
```

**Nota:** Ambos comandos de limpieza requieren que se ejecute `bootstrap` antes de construir de nuevo.

## Verificación

Vea [Build System Overview: Tests](build-system-overview.md#tests)

## Solución de problemas

### Comand xxxx not found

Si encuentra un error como `Comand xxxx not found`, intente usar la `Consola de Comandos de VS2015` para ejecutar los scripts de compilacion.

### Fatal internal compiler error: C1001

Asegúrese de que tiene instalada la última versión de Visual Studio.

### Assertion failed: ((handle))->activecnt >= 0

Mientras compila con Cygwin, puede observar que falla `bootstrap.py` con el siguiente error:

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

Esto es causado por un error usando juntos Cygwin Python y Node Win32. La solución es usar Python Win32 para ejecutar el script bootstrap (Asumiendo que ha instalado python en `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Intente reinstalar Node.js 32bit.

### Error: ENOENT, estatus 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Debe obtener este error si está usando Git Bash para la compilación, en cambio debería usar PowerShell o la ventana de comandos de VS2015.
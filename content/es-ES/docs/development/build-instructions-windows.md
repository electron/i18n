# Instrucciones para compilación (Windows)

Siga las indicaciones a continuación para construir Electron en Windows.

## Pre-requisitos

* Windows 7 / Servidor 2008 R2 o superior
* Visual Studio 2015 actualización 3 - [descargar VS 2015 edición gratuita para la comunidad](https://www.visualstudio.com/vs/older-downloads/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Herramientas de depuración para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) Si piensa crear una distribución completa ya que `symstore.exe` es usado para la creación de biblioteca de símbolos basadas en archivos `.pdb`.

Si actualmente no tiene una instalación de Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser generado con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para construir con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para la construcción, todavía se **requiere** debido a que necesitamos la cadena de herramientas que este provee para construir.

## Obteniendo Código

```powershell
$ git clone https://github.com/electron/electron.git
```

## Inicialización

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

## Arquitectura 32bit

Para construir para el objetivo de 32bit, necessita pasar `--target_arch=ia32` cuando se corra el script de salida:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Los otros pasos de construcción son exactamente los mismos.

## Proyecto de Visual Studio

Para generar un proyecto Visual Studio, se puede pasar el parámetro `--msvs`:

```powershell
$ python script\bootstrap.py --msvs
```

## Limpieza

Para limpiar archivos construidos:

```powershell
$ npm run clean
```

Para limpiar solo los directorios `out` y `dist`:

```sh
$ npm run clean-build
```

**Nota:** Ambos comandos de limpieza requieren que se corra `bootstrap` de nuevo antes de la construcción.

## Pruebas

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)

## Problemas

### Comando xxxx no encontrado

Si encuentra un error como `Comando xxxx no encontrado`, intente usar la consola `Comando rápido VS2015` para ejecutar los scripts construidos.

### Error de compilamienta interno falta: C1001

Asegúrese que tiene la última versión de Visual Estudio instalada.

### Assertion failed: ((handle))->activecnt >= 0

Si mientras se crea con Cygwin, se puede observar el fallo de `bootstrap.py` con el siguiente error:

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

Esto es causado por un error usando Cygwin Python y el nodo Win32 juntos. La solución es usar el Win32 Python para ejecutar rápidamente el script (Asumiendo que ha instalado python como `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: No se puede abrir el archivo de entrada 'kernel32.lib'

Intente reinstalar 32bit Node.js.

### Error: ENOENT, estatus 'C:\Users\USERNAME\AppData\Roaming\npm'

Simplemente hacer ese directorio [ debería solucionar el problema](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp no es reconocido como un comando interno o externo

Debe obtener este error si está usando constructos Git Bash para la construcción, en vez debe usar PowerShell o el comando rápido VS2015.
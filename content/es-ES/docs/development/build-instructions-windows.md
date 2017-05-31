# Construir instrucciones (Windows)

Siga las pautas a continuación para la construcción de electrón en Windows.

## Requisitos previos

* Windows 7 / Server 2008 R2 o superior
* Visual Studio 2015 actualización 3 - [download VS 2015 Community Edition para free](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](http://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging herramientas para Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) si planea crear una distribución completa, puesto que `symstore.exe` se utiliza para la creación de una tienda de símbolo de `.pdb` archivos.

Si actualmente no tienes una instalación de Windows,[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene timebombed las versiones de Windows que puede utilizar para construir el electrón.

Electrón se hace enteramente con scripts de línea de comandos y no se puede hacer con Visual Studio. Puede desarrollar electrónica con cualquier editor pero apoyo a edificio con Visual Studio vendrá en el futuro.

**Note:** aunque no se utiliza Visual Studio para la construcción, todavía es **required** porque necesitamos el toolchains construcción proporciona.

## Obtener el código de

```powershell
$ git clone https://github.com/electron/electron.git
```

## De arranque

El script bootstrap descargará todas las dependencias es necesario construir y crear la estructura de archivos de proyecto. Aviso que estamos usando `ninja` para construir electrónica así que no hay ningún proyecto de Visual Studio generada.

```powershell
$ cd electrónica $ python script\bootstrap.py - v
```

## Edificio

Construir tanto soltar y depurar los objetivos:

```powershell
$ python script\build.py
```

También sólo puede construir el destino de depuración:

```powershell
$ python script\build.py - c D
```

Después de edificio, usted puede encontrar `electron.exe` bajo `out\D` (destino de depuración) o `out\R` (versión blanco).

## Build de 32 bits

Para construir para el destino de 32 bits, necesita pasar `--target_arch = ia32` cuando se ejecuta el script bootstrap:

```powershell
$ python script\bootstrap.py - v--target_arch = ia32
```

Los demás pasos de construcción son exactamente iguales.

## Proyecto de Visual Studio

Para generar un proyecto de Visual Studio, puede pasar el `--parámetro msvs`:

```powershell
$ python script\bootstrap.py--msvs
```

## Limpieza

Para limpiar los archivos de la compilación:

```powershell
$ MNP correr limpio
```

Limpiar sólo los directorios `out` y `dist`:

```bash
$ MNP ejecutar limpieza y construcción
```

**Note:** que ambos comandos limpiamos requieren corriente `bootstrap` antes de edificio.

## Pruebas de

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)

## Problemas

### Xxxx de comando no encontrado

Si usted encuentra un error como xxxx de `Command no found`, puedes probar a utilizar la consola de comando Prompt</code> `VS2015 para ejecutar los scripts de construcción.</p>

<h3>Error del compilador interno fatal: C1001</h3>

<p>Asegúrese de que tener la última actualización de Visual Studio instalada.</p>

<h3>Error de aserción: ((mango))-> activecnt > = 0</h3>

<p>Si edificio bajo Cygwin, puede ver <code>bootstrap.py` con el siguiente error:

    Afirmación no pudo: ((mango))->activecnt > = 0, archivo src\win\pipe.c, línea de rastreo 1430 (más reciente llamada última): File "script/bootstrap.py", línea 87, en <module> sys.exit(main()) archivo "script/bootstrap.py", línea 22, en update_node_modules('.') principal
      Archivo "script/bootstrap.py", línea 56, en update_node_modules ejecutar ([NPM, 'instalar']) archivo "/ home/zcbenz/codes/raven/script/lib/util.py", línea 118, en ejecutar elevar e subproceso. CalledProcessError: Comando '[' npm.cmd', 'instalar']' devuelve el estado de salida distinto de cero 3
    

Esto es causado por un error al usar el Cygwin Python y Win32 nodo juntos. La solución es usar el Python de Win32 para ejecutar el script bootstrap (suponiendo que ha instalado Python en `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: no se puede abrir archivo de entrada 'kernel32.lib'

Intente volver a instalar 32 bits Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Simplemente haciendo eso directorio [should fijar la problem](http://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### nodo-gyp no se reconoce como un comando interno o externo

Obtendrá este error si está utilizando Git Bash para edificio, usted debe usar PowerShell o VS2015 el símbolo del sistema en su lugar.
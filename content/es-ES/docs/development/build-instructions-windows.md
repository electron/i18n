# Instrucciones para compilación (Windows)

Follow the guidelines below for building **Electron itself** on Windows, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Prerequisitos

* Windows 10 / Server 2012 R2 o superior
* Visual Studio 2017 15.7.2 o posterior - [descargue de manera gratuita de VS 2019 Community Edition](https://www.visualstudio.com/vs/)
  * Vea [the Chromium build documentation](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) para mas detalles sobre cuales componentes de Visual Studio son requeridos.
  * Si tu Visual Studio está instalado en un directorio diferente que el predeterminado, necesitarás establecer unas pocas variables de entorno para apuntar las toolchains a tu ruta de instalación.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, sustituyendo `2019` y `Comunidad` por sus versiones instaladas y sustituyendo `DRIVE:` por la unidad en la que Visual Studio está activada. A menudo, esto será `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, reemplazar `DRIVE:` con la unidad en la que están los kits de Windows. A menudo, esto será `C:`.
  * También se necesita la [extensión de Python para Windows (pywin32)](https://pypi.org/project/pywin32/#files) para ejecutar el proceso de compilación.
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Diferentes versiones del SDK se pueden instalar juntas. Para instalar el SDK, abre Visual Studio Installer, selecciona `Cambiar` → `Componentes Individuales`, desplázate hacia abajo y selecciona el SDK apropiado para Windows para instalar. Otra opción sería mirar el [Windows SDK y el archivo emulador](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) y descargar la versión independiente del SDK respectivamente.
  * Las herramientas de depuración de SDK también deben ser instaladas.https://crowdin.com/translate/electron/13/en-es#246828 Si el SDK de Windows 10 fue instalado a través del instalador de Visual Studio, entonces se puede instalar yendo a: `Panel de Control` → `Programas ` → `Programas y Características` → Seleccione "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. O puede descargar el instalador independiente del SDK y usarlo para instalar el Debugging Tools.

Si actualmente no tiene una instalación de Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) tiene versiones temporales de Windows que usted puede usar para construir Electron.

Electron se construye casi completamente con script de comandos de linea y no puede ser generado con Visual Studio. Puede desarrollar Electron con cualquier editor pero el soporte para construir con Visual Studio vendrá en el futuro.

**Nota:** A pesar de que Visual Studio no es usado para construir, todavía se **requiere** debido a que necesitamos las herramientas que provee para construir.

## Excluir el árbol de origen de la seguridad de Windows

La seguridad de Windows no le gusta uno de los archivos en el código fuente de Chromium (consulta https://crbug.com/441184), por lo que lo eliminará constantemente, lo que provoca problemas de `gclient sync` . Puedes excluir el árbol de origen de ser supervisado por seguridad de Windows al [siguiendo estas instrucciones](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26).

## Compilando

Ver [Build Instructions: GN](build-instructions-gn.md)

## Arquitectura 32bit

Para construir para 32bit, usted necesita pasar `target_cpu = "x86"` como un argumento GN. Usted puede construir para 32bit junto con el target de 64bit usando diferentes carpetas de salida para GN, por ejemplo: `out/Release-x86` con diferentes argumentos.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

El resto de los pasos son exactamente los mismos.

## Proyecto de Visual Studio

Para generar un project de Visual Studio, puede pasar el parametro `--ide=vs2017` a `gn gen`:

```powershell
$ gn gen out/Testing --ide=vs2017
```

## Problemas

### Comand xxxx not found

Si encuentra un error como `Comand xxxx not found`, intente usar la `Consola de Comandos de VS2015` para ejecutar los scripts de compilacion.

### Fatal internal compiler error: C1001

Asegúrese de que tiene instalada la última versión de Visual Studio.

### LNK1181: cannot open input file 'kernel32.lib'

Intente reinstalar Node.js 32bit.

### Error: ENOENT, estatus 'C:\Users\USERNAME\AppData\Roaming\npm'

Creando ese directorio [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Debe obtener este error si está usando Git Bash para la compilación, en cambio debería usar PowerShell o la ventana de comandos de VS2015.

### no se puede crear el directorio en '...': Nombre demasiado largo

node.js tiene algunos [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), y por defecto git en windows no maneja correctamente los nombres de rutas largos(a pesar de que windows los soporta). Esto debería arreglarlo:

```sh
$ git config --system core.longpaths true
```

### error: uso del identificador no declarado 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### Error de importación: No existe un módulo llamado win32file

Asegúrese de haber instalado `pywin32` con `pip install pywin32`.

### Los scripts de compilacion se bloquean haste que se presione una tecla

Este error es una "característica" del intérprete de comandos de Windows. Ocurre cuando se pulsa dentro de la ventana prompt con `QuickEdit` habilitado y está destinado a permitir seleccionar y copiar el texto de la salida fácilmente. Dado que cada click accidental pausará el proceso de compilación, puede que quiera desactivar esta característica en la propiedades del símbolo del sistema.

[application-distribution]: ../tutorial/application-distribution.md

# Instrucciones de Compilación

Follow the guidelines below for building **Electron itself**, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Pre-requisitos de la Plataforma

Comprueba los pre-requisitos de tu plataforma para la compilación antes de avanzar

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Herramientas de construcción

las herramientas de construcción de [Electron](https://github.com/electron/build-tools) automatizar gran parte de la configuración para compilar electrones desde la fuente con diferentes configuraciones y objetivos de construcción. Si deseas configurar el entorno de forma manual, las instrucciones se enumeran a continuación.

## Pre-requisitos de GN

Necesitaras instalar [`depot_tools`][depot-tools], el conjunto de herramientas usadas para consumir Chromium y sus dependencias.

Ademas, en Windows, tendrás que asignar la variable de ambiente ` DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Para hacerlo, abre ` Panel de Control ` → ` Sistema y Seguridad ` → ` Sistema ` → ` Opciones de Configuración Avanzadas ` y agrega a tu sistema la variable de ambiente ` DEPOT_TOOLS_WIN_TOOLCHAIN` con el valor `0`.  Esto le indica a `depot_tools` que utilice tu version instalada de Visual Studio (por defecto, `depot_tools` intentará descargar una version interna de Google, a la cual solo empleados de Google tienen acceso).

### Configurar el cache de Git

Si planeas hacer checkout de Electron más de una vez (por ejemplo, para tener múltiples directorios paralelos verificados en diferentes ramas), el uso del cache git acelerará las llamadas posteriores a `gclient`. Para hacer esto, establezca una variable de entorno `GIT_CACHE_PATH`:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# This will use about 16G.
```

## Obteniendo el código

```sh
$ mkdir electron && cd electron
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

> En lugar de `https://github.com/electron/electron`, puedes usar tu propio fork aquí (algo como `https://github.com/<username>/electron`).

### Una nota al tirar/empujar

Si usted tiene la intención de `git pull` or `git push` desde el repositorio oficial `electron` en el futuro, ahora necesita actualizar las URLs de la carpeta origin correspondiente.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git checkout master
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` funciona verificando las dependencias en un archivo llamado `DEPS` dentro de la carpeta `src/electron` (tales como Chromium o Node.js). Ejecutar `gclient sync -f` asegura que todas las dependencias requeridas para compilar Electron coninciden con ese archivo.

Así que, para tirar, ejecutarías los siguientes comandos:

```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## Compilando

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

O en Windows (sin el argumento opcional):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

Esto generará un directorio de compilación `out/Testing` under `src/` con la configuración de compilación de pruebas. Usted puede reemplazar `Testing` con otro nombre, pero debería ser a subdirectorio de `out`. Además no deberías ejecutar `gn gen` de nuevo — si quieres cambiar los argumentos de compilación, puedes ejecutar `gn args out/Testing` para traer un editor.

Para ver la lista de opciones de configuraciones disponible, ejecute `gn args out/Testing --list`.

**Para generar la configuración de compilación de prueba de Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Para generar la configuración de lanzamiento (alias "non-component" o "static") de Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**Para compilar, corra `ninja` con el `electron` target:** Nota Bene: Esto también tomará un tiempo y probablemente calentará tu regazo.

Para la configuración de depuración:

```sh
$ ninja -C out/Testing electron
```

Para la configuración de la lanzamiento:

```sh
$ ninja -C out/Release electron
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

El ejecutable compilado estará en `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Testing/electron.exe
# or, on Linux
$ ./out/Testing/electron
```

### Embalaje

En linux, primero elimine la información de depuración y de símbolos:

```sh
electron/script/strip-binaries.py -d out/Release
```

Para empaquetar la aplicación compilada electron como un archivo zip distribuible:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Compilación cruzada

Para compilar una plataforma que no sea la misma que la que estás construyendo, establece los argumentos GN `target_cpu` y `target_os`. Por ejemplo, para compilar un objetivo x86 de un host x64, especificar `target_cpu = "x86"` en `gn args`.

```sh
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

No todas las combinaciones de origen y destino sea CPU/SO son compatibles con Chromium.

| Host        | Objetivo      | Estado                  |
| ----------- | ------------- | ----------------------- |
| Windows x64 | Windows arm64 | Experimental            |
| Windows x64 | Windows x86   | Automáticamente probado |
| Linux x64   | Linux x86     | Automáticamente probado |

Si prueba otras combinaciones y las encuentra para funcionar, por favor actualice este documento :)

See the GN reference for allowable values of [`target_os`][target_os values] and [`target_cpu`][target_cpu values].

#### Windows en Arm (experimental)

Para compilar de forma cruzada para Windows en Arm, [follow Chromium's guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) para obtener las dependencias necesarias, SDK y librerias, luego construir con `ELECTRON_BUILDING_WOA=1` en su entorno antes de ejecutar `gclient sync`.

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

O (si usa PowerShell):

```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Despues, corra `gn gen` como arriba con `target_cpu="arm64"`.

## Verificación

Para ejecutar las pruebas, primero deberás compilar los módulos de prueba en la misma versión de node.js en la que se creó el proceso de compilación. Para generar cabeceras de compilación para los módulos a compilar, ejecute lo siguiente en el directorio `src/`.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

Ahora puede ejecutar [run the tests](testing.md#unit-tests).

Si estás depurando algo, puede ser de gran ayuda pasarle algunas banderas adicionales a el binario de Electron:

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## Compartir la caché git entre varias máquinas

Es posible compartir este directorio con otras máquinas exportándolo como SMB share en Linux, pero solo un proceso/máquina puede usar la memoria caché a la vez. Los bloqueos creados por el script git-cache intentarán evitar esto, pero puede que no funcione perfectamente en una red.

En Windows, SMBv2 tiene un caché de directorio que causará problemas con el script del git cache, por lo que es necesario desactivarlo configurando la clave de registro

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

a cero. Para más información: https://stackoverflow.com/a/9935126

Esto puede establecerse rápidamente en powershell (ejecutado como administrador):

```powershell
New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Problemas

### gclient sync se queja sobre rebase

Si `gclient sync` es interrumpido el arbol de git puede quedar en mal estado, lo que conduce a un mensaje críptico cuando se ejecuta `gclient sync` en el futuro:

```plaintext
2> Conflict while rebasing this branch.
2> Fix the conflict and run gclient again.
2> See man git-rebase for details.
```

Si no hay conflictos de git o rebases en `src/electron`, puede necesitar abortar un `git am` en `src`:

```sh
$ cd ../
$ git am --abort
$ cd electron
$ gclient sync -f
```

### Se me está pidiendo un nombre de usuario/contraseña para chromium-internal.googlesource.com

Si ve un prompt para `Username for 'https://chrome-internal.googlesource.com':` cuando corre `gclient sync` en Windows, es probable que la variable de entorno `DEPOT_TOOLS_WIN_TOOLCHAIN` no esta establecida a 0. Abra `Control Panel` → `System and Security` → `System` → `Advanced system settings` y agregue un variable de sistema `DEPOT_TOOLS_WIN_TOOLCHAIN` con valor `0`.  Esto le indica a `depot_tools` que utilice tu version instalada de Visual Studio (por defecto, `depot_tools` intentará descargar una version interna de Google, a la cual solo empleados de Google tienen acceso).

[application-distribution]: ../tutorial/application-distribution.md

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values

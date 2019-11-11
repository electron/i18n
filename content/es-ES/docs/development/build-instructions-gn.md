# Instrucciones de Compilación

Siga los pasos que se mencionan abajo para compilar Electron.

## Pre-requisitos de la Plataforma

Comprueba los pre-requisitos de tu plataforma para la compilación antes de avanzar

- [macOS](build-instructions-macos.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## Pre-requisitos de GN

Necesitaras instalar [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), el conjunto de herramientas usadas para consumir Chromium y sus dependencias.

Ademas, en Windows, tendrás que asignar la variable de ambiente ` DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Para hacerlo, abre ` Panel de Control ` → ` Sistema y Seguridad ` → ` Sistema ` → ` Opciones de Configuración Avanzadas ` y agrega a tu sistema la variable de ambiente ` DEPOT_TOOLS_WIN_TOOLCHAIN` con el valor `0`. Esto le indica a `depot_tools` que utilice tu version instalada de Visual Studio (por defecto, `depot_tools` intentará descargar una version interna de Google, a la cual solo empleados de Google tienen acceso).

## Compilaciones cacheadas (paso opcional)

### GIT\_CACHE\_PATH

Si usted planea compilar Electron más de un vez, agregar in cache git aumentará las llamadas posteriores a `gclient`. Para hacer esto, establezca una variable de entorno: `GIT_CACHE_PATH`:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Esto usará alrededor de 16G.
```

### sccache

Miles de archivos deben ser compilados para construir Chromium y Electron. Puede evitar gran parte de la espera reutilizando la salida de construcción de Electron CI a través de [sccache](https://github.com/mozilla/sccache). Esto requiere pasos adicionales (listados abajo) y estas dos variables:

```sh
export SCCACHE_BUCKET="electronjs-sccache-ci"
export SCCACHE_TWO_TIER=true
```

## Obteniendo el código

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# Esto tomará unos momentos, puedes ir por un café.
```

> En lugar de `https://github.com/electron/electron`, puedes usar tu propio fork aquí (algo como `https://github.com/<username>/electron`).

#### Una nota al tirar/empujar

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
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

O en Windows (sin el argumento opcional):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

This will generate a build directory `out/Testing` under `src/` with the testing build configuration. You can replace `Testing` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Testing` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Testing --list`.

**For generating Testing build config of Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Para generar la configuración de lanzamiento (alias "non-component" o "static") de Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**Para compilar, corra `ninja` con el `electron` target:** Nota Bene: Esto también tomará un tiempo y probablemente calentará tu regazo.

For the testing configuration:

```sh
$ ninja -C out/Testing electron
```

Para la configuración de la lanzamiento:

```sh
$ ninja -C out/Release electron
```

Esto construirá todo lo que anteriormente era 'libcromiumcontent' (es decir, ` contenido / ` directorio de ` chromium` y sus dependencias, incl. WebKit y V8), así que llevará un tiempo.

Para acelerar las compilaciones posteriores, puedes usar [ sccache ](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Testing` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Testing`:

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

<table>
  
<tr><th>Host</th><th>Objetivo</th><th>Estado</th></tr>
  
  <tr>
    <td>
      Windows x64
    </td>
    
    <td>
      Windows arm64
    </td>
    
    <td>
      Experimental
    </td>
<tr><td>Windows x64</td><td>Windows x86</td><td>Automáticamente probado</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>Automáticamente probado</td></tr>
</table> 
    
    <p>
      Si prueba otras combinaciones y las encuentra para funcionar, por favor actualice este documento :)
    </p>
    
    <p>
      Ver la referencia GN para valores permitidos de <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values"><code>target_os</code></a> y <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values"><code>target_cpu</code></a>.
    </p>
    
    <h4>
      Windows en Arm (experimental)
    </h4>
    
    <p>
      Para compilar de forma cruzada para Windows en Arm, <a href="https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio">follow Chromium's guide</a> para obtener las dependencias necesarias, SDK y librerias, luego construir con <code>ELECTRON_BUILDING_WOA=1</code> en su entorno antes de ejecutar <code>gclient sync</code>.
    </p>
    
    <pre><code class="bat">estalecer ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      O (si usa PowerShell):
    </p>
    
    <pre><code class="powershell">$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      Despues, corra <code>gn gen</code> como arriba con <code>target_cpu="arm64"</code>.
    </p>
    
    <h2>
      Verificación
    </h2>
    
    <p>
      Para ejecutar las pruebas, primero deberás compilar los módulos de prueba en la misma versión de node.js en la que se creó el proceso de compilación. Para generar cabeceras de compilación para los módulos a compilar, ejecute lo siguiente en el directorio <code>src/</code>.
    </p>
    
    <pre><code class="sh">$ ninja -C out/Testing third_party/electron_node:headers
</code></pre>
    
    <p>
      You can now <a href="testing.md#unit-tests">run the tests</a>.
    </p>
    
    <p>
      Si estás depurando algo, puede ser de gran ayuda pasarle algunas banderas adicionales a el binario de Electron:
    </p>
    
    <pre><code class="sh">$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
</code></pre>
    
    <h2>
      Compartir la caché git entre varias máquinas
    </h2>
    
    <p>
      Es posible compartir este directorio con otras máquinas exportándolo como SMB share en Linux, pero solo un proceso/máquina puede usar la memoria caché a la vez. Los bloqueos creados por el script git-cache intentarán evitar esto, pero puede que no funcione perfectamente en una red.
    </p>
    
    <p>
      En Windows, SMBv2 tiene un caché de directorio que causará problemas con el script del git cache, por lo que es necesario desactivarlo configurando la clave de registro
    </p>
    
    <pre><code class="sh">HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
</code></pre>
    
    <p>
      a cero. Para más información: https://stackoverflow.com/a/9935126
    </p>
    
    <p>
      Esto puede establecerse rápidamente en powershell (ejecutado como administrador):
    </p>
    
    <pre><code class="powershell">New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
</code></pre>
    
    <h2>
      Problemas
    </h2>
    
    <h3>
      Bloqueos anticuados en la caché de git
    </h3>
    
    <p>
      Si <code>gclient sync</code> se interrumpe mientras se usa la caché git, dejará la caché bloqueada. Para eliminar el bloqueo, pase el argumento <code>--break_repo_locks</code> a <code>gclient sync</code>.
    </p>
    
    <h3>
      Se me está pidiendo un nombre de usuario/contraseña para chromium-internal.googlesource.com
    </h3>
    
    <p>
      Si ve un prompt para <code>Username for 'https://chrome-internal.googlesource.com':</code> cuando corre <code>gclient sync</code> en Windows, es probable que la variable de entorno <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> no esta establecida a 0. Abra <code>Control Panel</code> → <code>System and Security</code> → <code>System</code> → <code>Advanced system settings</code> y agregue un variable de sistema <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> con valor <code>0</code>. Esto le indica a <code>depot_tools</code> que utilice tu version instalada de Visual Studio (por defecto, <code>depot_tools</code> intentará descargar una version interna de Google, a la cual solo empleados de Google tienen acceso).
    </p>
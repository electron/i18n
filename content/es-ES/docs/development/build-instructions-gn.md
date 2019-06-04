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

## Cached builds (optional step)

### GIT\_CACHE\_PATH

If you plan on building Electron more than once, adding a git cache will speed up subsequent calls to `gclient`. To do this, set a `GIT_CACHE_PATH` environment variable:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Esto usará alrededor de 16G.
```

> **NOTE**: the git cache will set the `origin` of the `src/electron` repository to point to the local cache, instead of the upstream git repository. This is undesirable when running `git push`—you probably want to push to github, not your local cache. To fix this, from the `src/electron` directory, run:

```sh
$ git remote set-url origin https://github.com/electron/electron
```

### sccache

Miles de archivos deben ser compilados para construir Chromium y Electron. You can avoid much of the wait by reusing Electron CI's build output via [sccache](https://github.com/mozilla/sccache). This requires some optional steps (listed below) and these two environment variables:

```sh
export SCCACHE_BUCKET="electronjs-sccache"
export SCCACHE_TWO_TIER=true
```

## Obteniendo el código

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# Esto tomará unos momentos, puedes ir por un café.
```

> Instead of `https://github.com/electron/electron`, you can use your own fork here (something like `https://github.com/<username>/electron`).

#### A note on pulling/pushing

If you intend to `git pull` or `git push` from the official `electron` repository in the future, you now need to update the respective folder's origin URLs.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` funciona verificando las dependencias en un archivo llamado `DEPS` dentro de la carpeta `src/electron` (tales como Chromium o Node.js). Running `gclient sync -f` ensures that all dependencies required to build Electron match that file.

So, in order to pull, you'd run the following commands:

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
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

O en Windows (sin el argumento opcional):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\")"
```

Esto generará un directorio de construcción `out/Debug` bajo `src/` con configuración de depuración. You can replace `Debug` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Debug` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Debug --list`.

**For generating Debug (aka "component" or "shared") build config of Electron:**

```sh
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**To build, run `ninja` with the `electron` target:** Nota Bene: This will also take a while and probably heat up your lap.

Para la configuración de depuración:

```sh
$ ninja -C out/Debug electron
```

For the release configuration:

```sh
$ ninja -C out/Release electron
```

Esto construirá todo lo que anteriormente era 'libcromiumcontent' (es decir, ` contenido / ` directorio de ` chromium` y sus dependencias, incl. WebKit y V8), así que llevará un tiempo.

Para acelerar las compilaciones posteriores, puedes usar [ sccache ](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Debug` to bring up an editor and adding a line to the end of the file.

El ejecutable compilado estará en `./out/Default`:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Debug/electron.exe
# or, on Linux
$ ./out/Debug/electron
```

### Embalaje

On linux, first strip the debugging and symbol information:

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
$ gn gen out/Debug-x86 --args='... target_cpu = "x86"'
```

No todas las combinaciones de origen y destino sea CPU/SO son compatibles con Chromium.

<table>
  
<tr><th>Host</th><th>Target</th><th>Estado</th></tr>
  
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
<tr><td>Windows x64</td><td>Windows x86</td><td>Automatically tested</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>Automatically tested</td></tr>
</table> 
    
    <p>
      If you test other combinations and find them to work, please update this document :)
    </p>
    
    <p>
      Ver la referencia GN para valores permitidos de <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values"><code>target_os</code></a> y <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values"><code>target_cpu</code></a>.
    </p>
    
    <h4>
      Windows on Arm (experimental)
    </h4>
    
    <p>
      To cross-compile for Windows on Arm, <a href="https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio">follow Chromium's guide</a> to get the necessary dependencies, SDK and libraries, then build with <code>ELECTRON_BUILDING_WOA=1</code> in your environment before running <code>gclient sync</code>.
    </p>
    
    <pre><code class="bat">set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      Or (if using PowerShell):
    </p>
    
    <pre><code class="powershell">$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      Next, run <code>gn gen</code> as above with <code>target_cpu="arm64"</code>.
    </p>
    
    <h2>
      Verificación
    </h2>
    
    <p>
      Para ejecutar las pruebas, primero deberás compilar los módulos de prueba en la misma versión de node.js en la que se creó el proceso de compilación. To generate build headers for the modules to compile against, run the following under <code>src/</code> directory.
    </p>
    
    <pre><code class="sh">$ ninja -C out/Debug third_party/electron_node:headers
# Instalar los módulos de prueba con los encabezados generados
$ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)
</code></pre>
    
    <p>
      Luego, ejecuta Electron con <code>electron/spec</code> como el argumento:
    </p>
    
    <pre><code class="sh"># En Mac:
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
# En Windows:
$ ./out/Debug/electron.exe electron/spec
# En Linux:
$ ./out/Debug/electron electron/spec
</code></pre>
    
    <p>
      Si estás depurando algo, puede ser de gran ayuda pasarle algunas banderas adicionales a el binario de Electron:
    </p>
    
    <pre><code class="sh">$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
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
    
    <h2>
      Problemas
    </h2>
    
    <h3>
      Stale locks in the git cache
    </h3>
    
    <p>
      Si <code>gclient sync</code> se interrumpe mientras se usa la caché git, dejará la caché bloqueada. Para eliminar el bloqueo, pase el argumento <code>--break_repo_locks</code> a <code>gclient sync</code>.
    </p>
    
    <h3>
      Se me está pidiendo un nombre de usuario/contraseña para chromium-internal.googlesource.com
    </h3>
    
    <p>
      If you see a prompt for <code>Username for 'https://chrome-internal.googlesource.com':</code> when running <code>gclient sync</code> on Windows, it's probably because the <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> environment variable is not set to 0. Open <code>Control Panel</code> → <code>System and Security</code> → <code>System</code> → <code>Advanced system settings</code> and add a system variable <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> with value <code>0</code>. Esto le indica a <code>depot_tools</code> que utilice tu version instalada de Visual Studio (por defecto, <code>depot_tools</code> intentará descargar una version interna de Google, a la cual solo empleados de Google tienen acceso).
    </p>
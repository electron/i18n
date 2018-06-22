# Instrucciones de Compilación (Compilación experimental GN)

Siga las pautas a continuación para compilar Electron con el compilador GN experimental.

> **NOTA**: El sistema de compilación GN está en estado *experimental*, y actualmente solo funciona en macOS y Linux, en modo debug, tratándose como un compilador de componentes.

## Pre-requisitos

Ver las instrucciones de compilación de [ macOS ](build-instructions-osx.md#prerequisites) o [ Linux ](build-instructions-linux.md#prerequisites) según su plataforma. Además, necesitarás instalar [` depot_tools `](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), el conjunto de herramientas utilizado para enlazar Chromium y su dependencias.

## Obteniendo el código

```sh
$ mkdir electron-gn && cd electron-gn
$ cat > .gclient <<-GCLIENT
solutions = [
  {
    "url": "https://github.com/electron/electron",
    "managed": False,
    "name": "src/electron",
  },
]
GCLIENT
$ gclient sync --with_branch_heads --with_tags
# Esto podría tomar un rato, ve por un café.
```

## Compilando

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Default --args='root_extra_deps=["//electron"] is_electron_build=true is_component_build=true use_jumbo_build=true v8_promise_internal_field_count=1 v8_typed_array_max_size_in_heap=0'
```

Esto generará todos los archivos ninja necesarios para la compilación. No deberías tener que ejecutar ` gn gen ` nuevamente; si deseas cambiar los argumentos de compilación, puedes ejecutar ` gn
args out / Default ` para mostrar un editor.

To build, run `ninja` with the `electron:electron_app` target:

```sh
$ ninja -C out/Default electron:electron_app
# This will also take a while and probably heat up your lap.
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper="sccache"` by running `gn args out/Default` to bring up an editor.

The built executable will be under `./out/Default`:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# or, on Linux
$ ./out/Default/electron
```

## Verificación

To run the tests, you'll first need to build the test modules against the same version of node.js that was built as part of the build process.

```sh
$ (cd electron/spec && npm i --nodedir=../../third_party/electron_node)
```

Then, run Electron with `electron/spec` as the argument:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
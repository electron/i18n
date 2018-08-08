# Instrucciones de Compilación (Compilación experimental GN)

Siga las pautas a continuación para compilar Electron con el compilador GN experimental.

> **NOTE**: The GN build system is in *experimental* status, and currently only works on macOS, Linux and Windows.

## Pre-requisitos

Check the build prerequisites for your platform before proceeding

- [macOS](build-instructions-osx.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## Install `depot_tools`

You'll need to install [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), the toolset used for fetching Chromium and its dependencies.

Also, on windows open:

`Control Panel → System and Security → System → Advanced system settings`

and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to use a google-internal version).

## Obteniendo Código

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
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

This will generate a build directory `out/Default` under `src/` with debug build configuration. You can replace `Default` with another name, but it should be a subdirectory of `out`. Also, to know the list of available configuration options, run `gn args out/Default --list`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Default` to bring up an editor.

**For generating Debug/Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

**For generating Release/Non-Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/release.gn")'
```

**Para compilar, ejecute ` ninja ` con el enfoque` electron: electron_app `:**

```sh
$ ninja -C out/Default electron:electron_app
# Esto también llevará un tiempo y probablemente te calentará el regazo.
```

Esto construirá todo lo que anteriormente era 'libcromiumcontent' (es decir, ` contenido / ` directorio de ` chromium` y sus dependencias, incl. WebKit y V8), así que llevará un tiempo.

Para acelerar las compilaciones posteriores, puedes usar [ sccache ](https://github.com/mozilla/sccache). Agregue la GN arg ` cc_wrapper = "sccache" ` ejecutando ` gn args out / Default ` para mostrar un editor.

El ejecutable compilado estará en `./out/Default`:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# o, en Linux
$ ./out/Default/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` GN argument. For example, to compile a windows x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Default-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit has been tested in Electron. If you test other combinations and find them to work, please update this document :)

## Verificación

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Default electron/build/node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Default/gen/node_headers)
```

Luego, ejecuta Electron con `electron/spec` como el argumento:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
```

Si estás depurando algo, puede ser de gran ayuda pasarle algunas banderas adicionales a el binario de Electron:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
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

Para compilar, ejecute ` ninja ` con el enfoque` electron: electron_app `:

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

## Verificación

Para ejecutar las pruebas, primero deberás compilar los módulos de prueba en la misma versión de node.js en la que se creó el proceso de compilación.

```sh
$ (cd electron/spec && npm i --nodedir=../../third_party/electron_node)
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
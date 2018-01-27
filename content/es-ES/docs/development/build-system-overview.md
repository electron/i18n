# Compilación de sistemas

Electron uses [gyp](https://gyp.gsrc.io/) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gyp` and `.gypi` files.

## Archivos Gyp

Following `gyp` files contain the main rules for building Electron:

* `electron.gyp` defines how Electron itself is built.
* `common.gypi` adjusts the build configurations of Node to make it build together with Chromium.
* `brightray/brightray.gyp` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `brightray/brightray.gypi` includes general build configurations about building.

## Compilación de componentes

Dado que Chromium es un proyecto bastante grande, la etapa final de enlace puede tomar bastantes minutos, lo que dificulta el desarrollo. Para resolver esto, Chromium introdujo la "construcción de componentes", que construye cada componente como una biblioteca compartida separada, lo que hace que el enlace sea muy rápido pero sacrificando el tamaño del archivo y rendimiento.

En Electron tomamos un enfoque muy similar: para las compilaciones `Depurar`, el binario se vinculará a una versión de biblioteca compartida de los componentes de Chromium para lograr tiempo de enlace rápido; para las versiones <0 Lanzamiento</code>, el binario se vinculará a la versión estática de la biblioteca, para que podamos tener el mejor tamaño binario posible y el mejor rendimiento.

## Minimal Bootstrapping

All of Chromium's prebuilt binaries (`libchromiumcontent`) are downloaded when running the bootstrap script. De forma predeterminada, tanto las bibliotecas estáticas como las bibliotecas compartidas se descargarán y el tamaño final debería estar entre 800 Mb y 2 Gb, dependiendo de la plataforma.

By default, `libchromiumcontent` is downloaded from Amazon Web Services. If the `LIBCHROMIUMCONTENT_MIRROR` environment variable is set, the bootstrap script will download from it. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) is a mirror for `libchromiumcontent`. If you have trouble in accessing AWS, you can switch the download address to it via `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

If you only want to build Electron quickly for testing or development, you can download just the shared library versions by passing the `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Generación de proyectos en dos fases

Electron links with different sets of libraries in `Release` and `Debug` builds. `gyp`, however, doesn't support configuring different link settings for different configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Nombres de objetivo

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are just building Electron for rebranding you are not affected.

## Pruebas

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Just append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm test -- -R
```
# Compilación de sistemas

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Compilación de componentes

Dado que Chromium es un proyecto bastante grande, la etapa final de enlace puede tomar bastantes minutos, lo que dificulta el desarrollo. Para resolver esto, Chromium introdujo la "construcción de componentes", que construye cada componente como una biblioteca compartida separada, lo que hace que el enlace sea muy rápido pero sacrificando el tamaño del archivo y rendimiento.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Verificación

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

Pruebe sus cambios conforme al estilo de codificación del proyecto usando:

```sh
$ npm run lint
```

Pruebe la funcionalidad usando:

```sh
$ npm test
```

Cada vez que realice cambios en el código fuente de Electron, deberá volver a ejecutar la compilación antes de las pruebas:

```sh
$ npm run build && npm test
```

Puede hacer que la prueba en suite corra más rápido al aislar la prueba específica o bloquear su trabajo actual en la característica [prueba exclusiva](https://mochajs.org/#exclusive-tests) de Mocha. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... solo pruebas en este bloque será ejecutadas
})
```

Alternativamente, puede usar la opción de mocha `grep` de solo correr prueba que coincidan con un patrón regular de expresión:

```sh
$ npm test -- --grep child_process
```

Pruebas que incluyan módulos nativos (como por ejemplo `runas`) no pueden ser ejecutadas con el compilador de depuración (vea [#2558](https://github.com/electron/electron/issues/2558) para más detalles), pero estos trabajarán con el compilado lanzado.

Para ejecutar las pruebas con el lanzamiento compila el uso:

```sh
$ npm test -- -R
```
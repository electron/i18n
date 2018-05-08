# Compilación de sistemas

Electron usa [gyp](https://gyp.gsrc.io/) para la generación de proyectos y [ninja](https://ninja-build.org/) para su compilación. Las configuraciones del proyecto pueden ser encontradas en los archivos `.gyp` y `.gypi`.

## Archivos Gyp

Los siguientes archivos `gyp` contienen las reglas principales para compilar Electron:

* `electron.gyp` define cómo se construye Electron en sí mismo.
* `common.gypi` ajusta las configuraciones de compilación del nodo para hacer que se compile junto con Chromium.
* `brightray/brightray.gyp` define como `brightray` es compilado e incluye la configuración por defecto que está enlazada con Chromium.
* `brightray/brightray.gypi` incluye configuraciones generales de compilación.

## Compilación de componentes

Dado que Chromium es un proyecto bastante grande, la etapa final de enlace puede tomar bastantes minutos, lo que dificulta el desarrollo. Para resolver esto, Chromium introdujo la "construcción de componentes", que construye cada componente como una biblioteca compartida separada, lo que hace que el enlace sea muy rápido pero sacrificando el tamaño del archivo y rendimiento.

En Electron tomamos un enfoque muy similar: para las compilaciones `Depurar`, el binario se vinculará a una versión de biblioteca compartida de los componentes de Chromium para lograr tiempo de enlace rápido; para las versiones <0 Lanzamiento</code>, el binario se vinculará a la versión estática de la biblioteca, para que podamos tener el mejor tamaño binario posible y el mejor rendimiento.

## Arranque minimalista

Todos los precompilados binarios de Chromium (`libchromiumcontent`) son descargados cuando está corriendo el comando de arranque. De forma predeterminada, tanto las bibliotecas estáticas como las bibliotecas compartidas se descargarán y el tamaño final debería estar entre 800 Mb y 2 Gb, dependiendo de la plataforma.

Por defecto, `libchromiumcontent` es descargado desde los servicios web de Amazon. Si la variable de ambiente de `LIBCHROMIUMCONTENT_MIRROR` es configurada, el comando de arranque será descargado desde él. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) es un espejo de `libchromiumcontent`. Si tiene problemas accesando AWS, puede cambiar la dirección de enlace a `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

If you only want to build Electron quickly for testing or development, you can download the shared library versions by passing the `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Generación de proyectos en dos fases

Electron enlaza con diferentes conjuntos de bibliotecas en `Depuración` y `lanzamiento`. `gyp`, de una u otra manera, no soporta configurar diferentes enlaces para diferentes configuraciones.

Para trabajar alrededor de esto Electron usa una variable `gyp` `libchromiumcontent_component` para controlar cual enlace de configuración usar y solo genera un objetivo cuando esté corriendo `gyp`.

## Nombres de objetivo

A diferencia de la mayoría de los proyectos que utilizan `Lanzamiento` y `Depuración` como nombres destinos, Electron usa `R` y `D` en su lugar. Esto se debe a que `gyp` colapsa de manera aleatoria si hay solo una configuración de compilado definida en `lanzamiento` o `depuración`, y Electron solo tiene que generar un destino al mismo tiempo como se dijo arriba.

This only affects developers, if you are building Electron for rebranding you are not affected.

## Verificación

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
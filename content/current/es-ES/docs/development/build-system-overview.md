# Compilación de sistemas

Electron usa [gyp](https://gn.googlesource.com/gn) para la generación de proyectos y [ninja](https://ninja-build.org/) para su compilación. Las configuraciones del Proyecto puede ser encontradas en los archivos `.gn` y `.gni`.

## Archivos GN

Los siguientes archivos `gn` contienen las reglas principales para la construcción de Electron:

* `BUILD.gn` define como Electron mismo es construido e incluye la configuraciones predeterminadas para enlazar con Chromium.
* `build/args/{debug,release,all}.gn` contiene los argumentos por defecto para la construcción de Electron.

## Compilación de componentes

Dado que Chromium es un proyecto bastante grande, la etapa final de enlace puede tomar bastantes minutos, lo que dificulta el desarrollo. Para resolver esto, Chromium introdujo la "construcción de componentes", que construye cada componente como una biblioteca compartida separada, lo que hace que el enlace sea muy rápido pero sacrificando el tamaño del archivo y rendimiento.

Electron hereda esta opción de construcción de Chromium. En versiones `Debug` se enlazará al binario con una versión de biblioteca compartida de los componentes de Chromium para lograr un tiempo de enlace rápido; para versiones `Release`, el binario estará vinculado a las versiones estáticas de la biblioteca, de modo que podemos tener el mejor tamaño de binario posible y rendimiento.

## Verificación

**NB** _esta sección está desactualizada y contiene información que ya no es relevante para el GN-built electron._

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

Puede hacer que la prueba en suite corra más rápido al aislar la prueba específica o bloquear su trabajo actual en la característica [prueba exclusiva](https://mochajs.org/#exclusive-tests) de Mocha. Agregar `.only` a cualquier `describe` o `it` función llama:

```js
describe.only('some feature', () => {
  // ... only tests in this block will be run
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

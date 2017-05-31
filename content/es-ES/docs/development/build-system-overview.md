# Construir sistemas

Electrónica utiliza [gyp](https://gyp.gsrc.io/) para la generación de proyectos y[ninja](https://ninja-build.org/) para la construcción. Configuraciones de proyecto pueden encontrarse en los archivos `.gyp` y `.gypi`.

## Archivos de GYP

Después de `gyp` los archivos contienen las principales normas para la construcción de electrones:

* `electron.gyp` define cómo se construye el electrón sí mismo.
* `common.gypi` ajusta las configuraciones de compilación de nodo para construir junto con cromo.
* `vendor/brightray/brightray.gyp` define cómo `brightray` está construido e incluye las configuraciones predeterminadas para enlazar con el cromo.
* `vendor/brightray/brightray.gypi` incluye configuraciones de generación general sobre edificio.

## Construir componente

Puesto que el cromo es bastante un gran proyecto, la etapa final de la liga puede tomar unos cuantos minutos, que hace que sea difícil para el desarrollo. Para solucionar esto, cromo introdujo la "construcción del componente", que construye cada componente como una librería compartida independiente, que enlazan a rendimiento y tamaño de archivo muy rápido pero sacrificar.

En electrónica tomó un enfoque muy similar: para estructuras de `Debug`, el binario está ligado a una versión de la biblioteca compartida de los componentes de cromo para lograr tiempo enlace rápido; compilaciones de `Release`, el binario se vinculará a las versiones de biblioteca estática, para que podamos tener el mejor posible binario tamaño y rendimiento.

## Mínimo de arranque

Todos los binarios pre-compilados de cromo (`libchromiumcontent`) se descargan al ejecutar el script bootstrap. Por defecto se descargará las bibliotecas estáticas y las bibliotecas compartidas y el tamaño final debe estar entre 800MB y 2GB dependiendo de la plataforma.

De forma predeterminada, `libchromiumcontent` está bajado de Amazon Web Services. Si se establece la variable de entorno `LIBCHROMIUMCONTENT_MIRROR`, el script bootstrap descargará de él. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) es un espejo para `libchromiumcontent`. Si tiene problemas en el acceso a AWS, puede cambiar la dirección a ella via`export LIBCHROMIUMCONTENT_MIRROR = http://7xk3d2.dl1.z0.glb.clouddn.com/`

Si desea construir el electrón rápidamente para pruebas o desarrollo, puede descargar sólo las versiones de biblioteca compartida pasando el `--parámetro dev`:

```bash
$./script/bootstrap.py - dev $./script/build.py - c D
```

## Generación de dos fases del proyecto

Construye enlaces de electrónica con diferentes conjuntos de bibliotecas de `Release` y `Debug`. `gyp`, sin embargo, no soporta configuración de enlace diferentes para diferentes configuraciones.

Para evitar este electrón utiliza un `libchromiumcontent_component` variable de `gyp` al control que enlace configuración utilizar y sólo genera un objetivo cuando se ejecuta `gyp`.

## Nombres de destino

A diferencia de la mayoría de los proyectos que utilizan `Release` y `Debug` como nombres de destino, electrón utiliza `R` y `D` en su lugar. Esto es porque `gyp` se bloquea al azar si hay solamente un `Release` o `Debug` construir configuración definida y electrón sólo tiene que generar un objetivo a la vez como se indicó anteriormente.

Este sólo afecta a desarrolladores, si apenas están construyendo electrón para rebranding te no son afectados.

## Pruebas de

Prueba de que los cambios se ajustan al proyecto de codificación de estilo usando:

```bash
$ MNP ejecutar pelusa
```

Prueba de funcionalidad utilizando:

```bash
$ MNP test
```

Cada vez que realiza cambios en código de fuente de electrones, debe volver a ejecutar la construcción antes de las pruebas:

```bash
$ MNP ejecutar build && npm test
```

Usted puede hacer el paquete de pruebas correr más rápido al aislar la prueba específica o bloque que actualmente está trabajando con función de tests</a> deexclusive de Mocha. Añadir a`.only` a cualquier llamada de función `describe` o `it`:</p> 

```js
describe.Only ('algunos cuentan', function () {/ /... solo las pruebas en este bloque se ejecutará})
```

Como alternativa, puede utilizar opción de `grep` de mocha para sólo ejecutar pruebas de emparejar el patrón de expresión regular dada:

```sh
$ MNP test--child_process--grep
```

Pruebas que incluyen módulos nativos (por ejemplo, `runas`) no se puede ejecutar con el debug construir (véase [ #2558](https://github.com/electron/electron/issues/2558) para los detalles), pero se trabajará con la versión de lanzamiento.

Para ejecutar que las pruebas con el lanzamiento de construcción de uso:

```bash
$ MNP test---R
```
# Actualización de Node

## Discusión

Chromium y Node.js ambos dependen de V8 y Electron solo contiene un copia simple de V8, por tanto es importante asegurarse que el versión de V8 elegida es compatible con la versión de construccion de Node.js y Chromium.

La actualización del nodo es mucho más fácil que actualizar Chromium, así que se producen menos conflictos si se actualiza primero Chromium, luego elige la versión del Node principal cuya versión de V8 está más cercana a la que contiene Chromium.

Electron tiene su propio [Node fork](https://github.com/electron/node) con modificaciones para los detalles de construcción del V8 mencionados anteriormente y para exponer el API necesitado por Electron. Una vez que se elija la liberación del nodo ascendente, es colocado en una ramificación en la bifurcación del Nodo de Electron y cualquier parche del Nodo del Electron son colocados ahí.

Another factor is that the Node project patches its version of V8. As mentioned above, Electron builds everything with a single copy of V8, so Node's V8 patches must be ported to that copy.

Una vez que todas las dependencias de Electron están construyendo y usando la misma copia V8, el siguiente paso es arreglar cualquier problema de código de Electron causado por la actualización del Nodo.

[FIXME] Algo acerca de un depurador del Nodo que (e.g. deepak) usemos y necesitemos confirmar no rompa con la actualización del Nodo?

En resumidas cuentas, los principales pasos son:

1. Actualizar la bifurcación del Nodo de Electron a la versión deseada
2. Hacerle un backport a los parches V8 del Nodo a nuestra copia V8
3. Actualizar los archivos GN build, portando cambios de los archivos GYP de Node
4. Actualizar DEPS de Electron para usar la nueva versión de Node

## Actualizando la [bifurcación](https://github.com/electron/node) del Nodo del Electrón

1. Asegúrate que el `maestro` en `electron/nodo` ha actualizado las etiquetas de liberación de `nodejs/nodo`
2. Create a branch in https://github.com/electron/node: `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update
  - `vX.X.X` Debe usar una versión de Node compatible con nuestra actual versión de Chromium
3. Re-apply our commits from the previous version of Node we were using (`vY.Y.Y`) to `v.X.X.X`
  - Revise la etiqueta de liberación y selecciona el rango de encomendares que necesitamos para volver a aplicar
  - Escoger el rango de encomendares:
    1. Revisa los `vY.Y.Y` & `v.X.X.X`
    2. `escoge FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resuelve los conflictos de fusión en cada una de las filas encontradas, entonces:
    1. `git agrega <conflict-file>`
    2. `git elige --continuar`
    3. Repite hasta haber terminado


## Actualizando Parches [V8](https://github.com/electron/node/src/V8)

Nosotros necesitamos generar un archivo patch desde cada patch que Node aplica al V8.

```sh
$ cd third_party/electron_node
$ CURRENT_NODE_VERSION=vX.Y.Z
# Encuentre el último commit con el mensaje "deps: update V8 to <some version>"
# Este commit corresponde a Node reseteando V8 a su estado inicial en el versión indicada.
$ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
# Esto crea un archivo patch que contiene todos los cambios en deps/v8 desde 
# $LAST_V8_UPDATE encima de la versión actual de Node, formateado en una forma que 
# será aplicado limpiamente al repositorio V8 (Por ejemplo, con `deps/v8` desplazando del camino y excluyendo los directorios v8/gypfiles).
# los cuales no están presente en V8.
$ git format-patch \
    --relative=deps/v8 \
    $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
    deps/v8 \
    ':(exclude)deps/v8/gypfiles' \
    --stdout \
    > ../../electron/common/patches/v8/node_v8_patches.patch
```

Esta lista de parches probablemente incluya uno reivindique para hacer que la API V8 sea compatible con versiones anteriores con una versión anterior de V8. Desafortunadamente, estos parches casi siempre cambian la API V8 de una manera incompatible con Chromium.

Generalmente es más fácil actualizar Node para funcionar sin el parche de compatibilidad que actualizar Chromium para trabajar con el parche de compatibilidad, por lo que se recomienda revertir el parche de compatibilidad y corregir cualquier error que surja al compilar Node.

## Actualizar el archivo `DEPS` de Electron

Actualizar el archivo `DEPS` en la raíz de [electron/electron](https://github.com/electron/electron) para que apunte al hash de git de Node actualizado.

## Notas

- Los nodos mantiene su propia bifurcación de V8
  - Ellos le hacen backport a una pequeña cantidad de cosas, cuanto sean necesitadas
  - Documentación en Node acerca de como [they work with V8](https://nodejs.org/api/v8.html)
- Nosotros actualizamos el código de tal forma que sólo usamos una copia de V8 en todo Electron
  - P.ej.: Electron, Chromium y Node.js
- No rastreamos el stream ascendente debido a logística:
   - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
- Chromium es grande y requiere mucho tiempo para actualizar, así que normalmente elegimos la versión del Node basada en la cual de sus versiones tiene una versión de V8 que está más cerca de la versión en Chromium que estamos usando.
  - A veces tenemos que esperar la próxima versión periódica de Node porque sincronizará más estrechamente con la versión de V8 en el nuevo Chromium
 - Electron mantiene todos sus parches en el repositorio porque es más sencillo que mantener diferentes repositorios para parches por cada proyecto superior.
   - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
 - Construcción de Node:
   - Mantenemos nuestros propios archivos de compilación GN para Node.js para hacer más fácil asegurar que todos se construye con las mismas banderas de compilador. Esto quiere decir que cada vez que actualizamos Node.js necesitamos hacer una modesta cantidad de trabajo para sincronizar los archivos GN con los archivos GYP upstream.

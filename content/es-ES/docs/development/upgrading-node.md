# Actualización de Node

## Discusión

Chromium y Node.js ambos dependen de V8 y Electron solo contiene un copia simple de V8, por tanto es importante asegurarse que el versión de V8 elegida es compatible con la versión de construccion de Node.js y Chromium.

La actualización del nodo es mucho más fácil que actualizar Chromium, así que se producen menos conflictos si se actualiza primero Chromium, luego elige la versión del Node principal cuya versión de V8 está más cercana a la que contiene Chromium.

Electron tiene su propio [Node fork](https://github.com/electron/node) con modificaciones para los detalles de construcción del V8 mencionados anteriormente y para exponer el API necesitado por Electron. Una vez que se elija la liberación del nodo ascendente, es colocado en una ramificación en la bifurcación del Nodo de Electron y cualquier parche del Nodo del Electron son colocados ahí.

Otro factor es que el proyecto del Node arregla su versión V8. Como es mencionado anteriormente, Electron construye todo con una sola copia de V8, así que los parches V8 de Node deben ser presentados a esa copia.

Una vez que todas las dependencias de Electron están construyendo y usando la misma copia V8, el siguiente paso es arreglar cualquier problema de código de Electron causado por la actualización del Nodo.

[FIXME] Algo acerca de un depurador del Nodo que (e.g. deepak) usemos y necesitemos confirmar no rompa con la actualización del Nodo?

En resumidas cuentas, los principales pasos son:

1. Actualizar la bifurcación del Nodo de Electron a la versión deseada
2. Hacerle un backport a los parches V8 del Nodo a nuestra copia V8
3. Actualizar los archivos GN build, portando cambios de los archivos GYP de Node
4. Actualizar DEPS de Electron para usar la nueva versión de Node

## Actualizando la [bifurcación](https://github.com/electron/node) del Nodo del Electrón

1. Asegúrate que el `maestro` en `electron/nodo` ha actualizado las etiquetas de liberación de `nodejs/nodo`
2. Crea una ramificación en https://github.com/electron/node: `electron-node-vX.X.X` la base en la que está ramificando es la etiqueta para la actualización deseada 
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
# Find the last commit with the message "deps: update V8 to <some version>"
# This commit corresponds to Node resetting V8 to its pristine upstream
# state at the stated version.
$ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
# This creates a patch file containing all changes in deps/v8 from
# $LAST_V8_UPDATE up to the current Node version, formatted in a way that
# it will apply cleanly to the V8 repository (i.e. with `deps/v8`
# stripped off the path and excluding the v8/gypfiles directory, which
# isn't present in V8.
$ git format-patch \
    --relative=deps/v8 \
    $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
    deps/v8 \
    ':(exclude)deps/v8/gypfiles' \
    --stdout \
    > ../../electron/common/patches/v8/node_v8_patches.patch
```

This list of patches will probably include one that claims to make the V8 API backwards-compatible with a previous version of V8. Unfortunately, those patches almost always change the V8 API in a way that is incompatible with Chromium.

It's usually easier to update Node to work without the compatibility patch than to update Chromium to work with the compatibility patch, so it's recommended to revert the compatibility patch and fix any errors that arise when compiling Node.

## Actualiza el archivo `DEPS` de Electron

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

## Notas

- Los nodos mantiene su propia bifurcación de V8 
  - Ellos le hacen backport a una pequeña cantidad de cosas, cuanto sean necesitadas
  - Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of Electron 
  - P.ej.: Electron, Chromium y Node.js
- No rastreamos el stream ascendente debido a logística: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
- Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
  - Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
  - Building Node: 
    - We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.
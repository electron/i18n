# Actualización del nodo

## Discusión

Un problema para la actualización es construir todo Electrón solo con una copia de V8 para asegurar la compatibilidad. Esto es importante debido a que tanto el nodo ascendente y el [libchromiumcontent](upgrading-chromium.md) usan sus propias versiones de V8.

Actualizar el Nodo es mucho más fácil que actualizar el contenido de Libchromium, por lo que se producen menos problemas si se actualiza primero el contenido de Libchromium, y luego se elige la versión del Nodo ascendente cuyo V8 está más cerca de él.

Electron tiene su propio [Node fork](https://github.com/electron/node) con modificaciones para los detalles de construcción del V8 mencionados anteriormente y para exponer el API necesitado por Electron. Una vez que se elija la liberación del nodo ascendente, es colocado en una ramificación en la bifurcación del Nodo de Electron y cualquier parche del Nodo del Electron son colocados ahí.

Otro factor es que el proyecto del Nodo arregla su versión V8. Como es mencionado anteriormente, Electron construye todo con una sola copia de V8, así que los parches V8 de Nodo deben ser presentados a esa copia.

Una vez que todas las dependencias de Electron están construyendo y usando la misma copia V8, el siguiente paso es arreglar cualquier problema de código de Electron causado por la actualización del Nodo.

[FIXME] Algo acerca de un depurador del Nodo que (e.g. deepak) usemos y necesitemos confirmar no rompa con la actualización del Nodo?

En resumidas cuentas, los principales pasos son:

1. Actualizar la bifurcación del Nodo de Electron a la versión deseada
2. Hacerle un backport a los parches V8 del Nodo a nuestra copia V8
3. Actualiza Electron para usar la nueva versión de Nodo 
  - Actualiza los submódulos
  - Actualiza la configuración de construcción de Node.js

## Actualizando la [bifurcación](https://github.com/electron/node) del Nodo del Electrón

1. Asegúrate que el `maestro` en `electron/nodo` ha actualizado las etiquetas de liberación de `nodejs/nodo`
2. Crea una ramificación en https://github.com/electron/node: `electron-node-vX.X.X` la base en la que está ramificando es la etiqueta para la actualización deseada 
  - `vX.X.X` debe usar la versión de nodo compatible con nuestra versión actual de chromium
3. Volver a aplicar nuestros encomendares de la versión anterior del nodo que estábamos usando (`vY.Y.Y`) to `v.X.X.X` 
  - Revise la etiqueta de liberación y selecciona el rango de encomendares que necesitamos para volver a aplicar
  - Escoger el rango de encomendares: 
    1. Revisa los `vY.Y.Y` & `v.X.X.X`
    2. `escoge FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resuelve los conflictos de fusión en cada una de las filas encontradas, entonces: 
    1. `git agrega <conflict-file>`
    2. `git elige --continuar`
    3. Repite hasta haber terminado

## Actualizando Parches [V8](https://github.com/electron/node/src/V8)

We need to generate a patch file from each patch applied to V8.

1. Get a copy of Electron's libcc fork 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. Run `script/update` to get the latest libcc 
  - This will be time-consuming
3. Remove our copies of the old Node v8 patches 
  - (In libchromiumcontent repo) Read `patches/v8/README.md` to see which patchfiles were created during the last update
  - Remove those files from `patches/v8/`: 
    - `git rm` the patchfiles
    - edit `patches/v8/README.md`
    - commit these removals
4. Inspect Node [repo](https://github.com/electron/node) to see what patches upstream Node used with their v8 after bumping its version 
  - `git log --oneline deps/V8`
5. Create a checklist of the patches. This is useful for tracking your work and for having a quick reference of commit hashes to use in the `git diff-tree` step below.
6. Read `patches/v8/README.md` to see which patchfiles came from the previous version of V8 and therefore need to be removed. 
  - Delete each patchfile referenced in `patches/v8/README.md`
7. For each patch, do: 
  - (In node repo) `git diff-tree --patch HASH > ~/path_to_libchromiumcontent/patches/v8/xxx-patch_name.patch` 
    - `xxx` is an incremented three-digit number (to force patch order)
    - `patch_name` should loosely match the node commit messages, e.g. `030-cherry_pick_cc55747,patch` if the Node commit message was "cherry-pick cc55747"
  - (remainder of steps in libchromium repo) Manually edit the `.patch` file to match upstream V8's directory: 
    - If a diff section has no instances of `deps/V8`, remove it altogether. 
      - We don’t want those patches because we’re only patching V8.
    - Replace instances of `a/deps/v8/filename.ext` with `a/filename.ext` 
      - This is needed because upstream Node keeps its V8 files in a subdirectory
  - Ensure that local status is clean: `git status` to make sure there are no unstaged changes.
  - Confirm that the patch applies cleanly with `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch`
  - Create a new copy of the patch: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - This is needed because the first patch has Node commit checksums that we don't want
  - Confirm that checksums are the only difference between the two patches: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Replace the old patch with the new: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Add the patched code to the index *without* committing: 
    - `cd src/v8 && git add . && cd ../..`
    - We don't want to commit the changes (they're kept in the patchfiles) but need them locally so that they don't show up in subsequent diffs while we iterate through more patches
  - Add the patch file to the index: 
    - `git add a patches/v8/`
  - (Optionally) commit each patch file to ensure you can back up if you mess up a step: 
    - `git commit patches/v8/`
8. Update `patches/v8/README.md` with references to all new patches that have been added so that the next person will know which need to be removed.
9. Update Electron's submodule references: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule referefences for node and libc"
      electron$ git pso upgrade-to-chromium-62
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## Notas

- libcc and V8 are treated as a single unit
- Node maintains its own fork of V8 
  - They backport a small amount of things as needed
  - Documentation in node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of electron 
  - E.g electron, libcc, and node
- We don’t track upstream closely due to logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a node version bump in electron.
- libcc is large and time-consuming to update, so we typically choose the node version based on which of its releases has a version of V8 that’s closest to the version in libcc that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new libcc
  - Electron keeps all its patches in libcc because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, node, libcc, etc. patches are all kept in the same place
  - Building node: 
    - There’s a chance we need to change our build configuration to match the build flags that node wants in `node/common.gypi`
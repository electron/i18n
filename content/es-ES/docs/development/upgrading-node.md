# Actualización de Node

## Discusión

Un problema para la actualización es construir todo Electron solo con una copia de V8 para asegurar la compatibilidad. Esto es importante debido a que tanto el nodo ascendente y el [libchromiumcontent](upgrading-chromium.md) usan sus propias versiones de V8.

Actualizar el Nodo es mucho más fácil que actualizar el contenido de Libchromium, por lo que se producen menos problemas si se actualiza primero el contenido de Libchromium, y luego se elige la versión del Nodo ascendente cuyo V8 está más cerca de él.

Electron tiene su propio [Node fork](https://github.com/electron/node) con modificaciones para los detalles de construcción del V8 mencionados anteriormente y para exponer el API necesitado por Electron. Una vez que se elija la liberación del nodo ascendente, es colocado en una ramificación en la bifurcación del Nodo de Electron y cualquier parche del Nodo del Electron son colocados ahí.

Otro factor es que el proyecto del Node arregla su versión V8. Como es mencionado anteriormente, Electron construye todo con una sola copia de V8, así que los parches V8 de Node deben ser presentados a esa copia.

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

Necesitamos generar un archivo de parche para cada uno de los parches aplicados al V8.

1. Consigue una copia de la bifurcación libcc de Electron 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. Ejecute `script/actualización` para obtener el último libcc 
  - Esto te consumirá mucho tiempo
3. Remueve nuestras copias del viejo parche del Nodo V8 
  - (En el repo de libchromiumcontent) Lee `patches/v8/README.md`para ver cuáles archivos de parches fueron creados durante la última actualización
  - Remueve esos archivos de `parches/v8/`: 
    - `git rm` los parches de archivos
    - edita `patches/v8/README.md`
    - cometer estas eliminaciones
4. Inspecciona Nodo [repo](https://github.com/electron/node) para ver qué parches del Nodo ascendente usados con sus V8 luego de botar su versión 
  - `git log --oneline deps/V8`
5. Crea una lista de los parches. Esto es bastante útil para seguir tu trabajo y para tener una rápida referencia de realizar hashes que usar en el siguiente paso `git diff-tree`.
6. Lee `patches/v8/README.md` para ver cuáles archivos de parches de la anterior versión de V8 y, por lo tanto, necesitan ser removidos. 
  - Elimina cada archivo de parche de `patches/v8/README.md`
7. Para cada parche, realice: 
  - (En el repo del nodo) `git diff-tree --patch HASH > ~/path_to_libchromiumcontent/patches/v8/xxx-patch_name.patch` 
    - `xxx` es un número de tres dígitos incrementado (para forzar el orden del parche)
    - `patch_name`debería coincidir con los mensajes realizados del nodo, e.g. `030-cherry_pick_cc55747,patch` si los mensajes realizados del nodo eran "cherry-pick cc55747"
  - (recordatorio de los pasos en libchromium repo) Edita manualmente el `.parche` archivo para que coincida con el directorio V8 ascendente: 
    - Si una sección de diff no tiene instancias de `deps/V8`, elimínalo todo. 
      - No queremos esos parches porque solo estamos usando el parche V8.
    - Reemplaza instancias de `a/deps/v8/filename.ext` con `a/filename.ext` 
      - Esto es necesario porque el nodo ascendente mantiene sus archivos V8 en un subdirectorio
  - Asegura que el estatus local esté limpio: `git status` para asegurarse de que no haya cambios.
  - Confirma que el parche se aplique limpiamente con `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch`
  - Crea una nueva copia del parche: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - Esto es necesario debido a que el primer parche ha realizado sumas de comprobación en el Nodo que no queremos
  - Confirma que las sumas de comprobación son la única diferencia entre dos parches: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Reemplaza el viejo parce con el nuevo: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Agrega el código con el parche al índice *sin* realizar: 
    - `cd src/v8 && git add . && cd ../..`
    - No queremos realizar cambios (estos se mantienen en el archivo de los parches) pero se necesitan localmente para que no se aparezcan de manera subsecuente mientras que interactuamos a través de más parches
  - Agrega el archivo de parches al índice: 
    - `git agregar a patches/v8/`
  - (Opcionalmente) realiza cada archivo de parche para asegurar que puedes respaldar si te equivocas en algún paso: 
    - `git realizar patches/v8/`
8. Actualiza `patches/v8/README.md` con referencias a todos los nuevos parches que han sido agregados para que la siguiente persona sepa cuál debe ser eliminado.
9. Actualiza los submódulos de referencia de Electron: 
      h
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

- libcc y V8 son tratados como una unidad simple
- Los nodos mantiene su propia bifurcación de V8 
  - Ellos le hacen backport a una pequeña cantidad de cosas, cuanto sean necesitadas
  - La documentación en el nodo acerca de cómo [funcionan con V8](https://nodejs.org/api/v8.html)
- Actualizamos el código para que solo usemos una copia de V8 a través de electron 
  - E.g electron, libcc, y nodo
- No rastreamos el stream ascendente debido a logística: 
  - El Stream ascendente usa múltiples repos, por lo que fusionarse con un solo repo resultaría en una pérdida de historia. Así que solo actualizamos cuando estamos planeando botar una versión de nodo en electron.
- libcc es largo y consume mucho tiempo para actualizar, así que típicamente elegimos la versión del nodo basados en cuál de sus lanzamientos tiene una versión de V8 que esté más cerca en libcc que la que estamos usando. 
  - A veces tenemos que esperar para el siguiente lanzamiento periódico del nodo porque se sincronizará más acercadamente con la versión V8 en el nuevo libcc
  - Electron mantiene todos sus parches en libcc debido a que es más simple que mantener diferentes repos para parches por cada uno de los proyectos ascendentes. 
    - Crashpad, nodo, libcc, etc. parches se mantienen en el mismo lugar
  - Construyendo un nodo: 
    - Existe una probabilidad de que necesitemos cambiar la configuración para que coincida con las banderas de construcción que el nodo quiere en `node/common.gypi`
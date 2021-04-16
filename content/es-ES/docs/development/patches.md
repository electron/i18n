# Parches en Electron

Electron está construido sobre dos grandes proyectos principales: Chromium y Node.js. Cada uno de estos proyectos tienen también varias de sus propias dependencias. Hacemos todo lo posible para utilizar estas dependencias exactamente como están, pero a veces no podemos lograr nuestros objetivos sin parchear esas dependencias en upstream para que se ajusten a nuestros casos de uso.

## Justificación del parche

Cada parche en Electron es una carga de mantenimiento. Cuando el código original cambia, los parches pueden romperse, a veces incluso sin conflicto de parches o error de compilación. Es un esfuerzo continuo para mantener nuestro parche actualizado y efectivo. Así que nos esforzamos por mantener el número de parches como mínimo. Para ello, cada parche debe describir su razón de existencia en su mensaje de commit. Esa razón debe ser unas de las siguientes:

1. El parche es temporal, y está pensado para ser (o ha sido) confirmado a upstream o de lo contrario eventualmente eliminado. Incluye un enlace a un upstream PR o review de código si está disponible o a un procedimiento para verificar si el parche aún es necesario en una fecha posterior.
2. El parche permite que el código se compile en el entorno Electron, pero no se puede confirmar en upstream porque es específico de Electron (p.ej. parchear las referencias al `Profile` Chrome). Incluye razonamiento sobre por qué el cambio no se puede implementar sin un parche (por ejemplo, subclasificar o copiar el código).
3. El parche realiza cambios específicos de Electron en la funcionalidad que son fundamentalmente incompatibles con el upstream.

In general, all the upstream projects we work with are friendly folks and are often happy to accept refactorings that allow the code in question to be compatible with both Electron and the upstream project. (See e.g. [this](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) change in Chromium, which allowed us to remove a patch that did the same thing, or [this](https://github.com/nodejs/node/pull/22110) change in Node, which was a no-op for Node but fixed a bug in Electron.) **Deberíamos enfocarnos en los cambios siempre que podamos y evitar los parches de duración indefinida**.

## Sistema de parches

If you find yourself in the unfortunate position of having to make a change which can only be made through patching an upstream project, you'll need to know how to manage patches in Electron.

Todos los parches a los proyectos upstream en Electron están contenidos en el directorio `patches/`. Cada subdirectorio de `patches/` contiene varios archivos de parche, junto con un archivo `.patches` el cual lista el orden en el cual los parches deberían ser aplicados. Think of these files as making up a series of git commits that are applied on top of the upstream project after we check it out.

```text
patches
├── config.json   <-- this describes which patchset directory is applied to what project
├── chromium
│   ├── .patches
│   ├── accelerator.patch
│   ├── add_contentgpuclient_precreatemessageloop_callback.patch
│   ⋮
├── node
│   ├── .patches
│   ├── add_openssl_is_boringssl_guard_to_oaep_hash_check.patch
│   ├── build_add_gn_build_files.patch
│   ⋮
⋮

```

Para ayudar a manejar estos conjuntos de parches, proporcionamos dos herramientas: `git-import-patches` y `git-export-patches`. `git-import-patches` importa un conjunto de archivos de parche en un repositorio git aplicando cada parche en el orden correcto y creando un commit para cada parche. `git-export-patches` hace el reverso; exporta una serie de commits git en un repositorio a un conjunto de ficheros en un directorio y un arvhivo `.patches` adjunto.

> Nota al margen: la razón por la que usamos un archivo `.patches` para mantener el orden de los parches aplicados, en lugar de anteponer un número como `001-` a cada archivo, es porque reduce los conflictos relacionados al orden de parches. It prevents the situation where two PRs both add a patch at the end of the series with the same numbering and end up both getting merged resulting in a duplicate identifier, and it also reduces churn when a patch is added or deleted in the middle of the series.

### Uso

#### Agregar un nuevo parche

```bash
$ cd src/third_party/electron_node
$ vim some/code/file.cc
$ git commit
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

> **NOTA**: `git-export-patches` ignora cualquier archivo sin confirmar, así que debes crear un commit si quieres que tus cambios sean exportados. La línea de asunto del mensaje de confirmación se utilizará para derivar el nombre del archivo del parche, y el cuerpo del mensaje de confirmación debe incluir la razón de la existencia del parche.

La reexportación de parches ocasionalmente causará que cambien los shasums en parches no relacionados. Esto es generalmente inofensivo y puede ser ignorado (pero sigue adelante y agrega esos cambios a tu PR, esto evitará que aparezcan para otras personas).

#### Editar un parche existente

```bash
$ cd src/v8
$ vim some/code/file.cc
$ git log
# Find the commit sha of the patch you want to edit.
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA]^
$ ../electron/script/git-export-patches -o ../electron/patches/v8
```

#### Eliminar un parche

```bash
$ vim src/electron/patches/node/.patches
# Delete the line with the name of the patch you want to remove
$ cd src/third_party/electron_node
$ git reset --hard refs/patches/upstream-head
$ ../../electron/script/git-import-patches ../../electron/patches/node
$ ../../electron/script/git-export-patches -o ../../electron/patches/node
```

Tenga en cuenta que `git-import-patches` marcará el commit que fue `HEAD` cundo este haya corrido como `refs/patches/upstream-head`. Esto te permite hacer un seguimiento de que commits son parches de Electron (aquellos que vienen después de `refs/patches/upstream-head`) y cuales commits están en upstream (aquellos antes `refs/patches/upstream-head`).

#### Resolviendo conflictos

Cuando se actualiza una dependencia upstream, es posible que los parches fallen al aplicar limpiamente. A menudo, el conflicto puede ser resolvido automáticamente mediante git con un fusión de tres vías. Puedes indicar a `git-import-patches` que use el algoritmo de fusión de 3 vías pasando el argumento `-3`:

```bash
$ cd src/third_party/electron_node
# If the patch application failed midway through, you can reset it with:
$ git am --abort
# And then retry with 3-way merge:
$ ../../electron/script/git-import-patches -3 ../../electron/patches/node
```

Si `git-import-patches -3` encuentra un merge conflict que no puede resolver automáticamente, se pausará y te permitirá resolver el conflicto manualmente. Una vez que has resuelto el conflicto,`git add` los archivos resueltos y continua aplicando el resto de los parches ejecutando `git am --continue`.

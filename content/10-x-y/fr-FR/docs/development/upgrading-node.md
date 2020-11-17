# Mettre à jour Node

## Discussion

Chromium et Node. s dépendent tous les deux de V8, et Electron ne contient qu'une seule copie de V8, donc il est important de s'assurer que la version de V8 choisie est compatible avec les version de des builds de Node.js et Chromium.

La mise à jour de Node est beaucoup plus simple que celle de Chromium, afin de réduire les conflits il vaut mieux commencer en mettant à niveau Chromium en premier et de chercher la version de Node en remontant dont la version de V8 est la plus proche de celle que contient Chromium.

Electron a son propre [fork](https://github.com/electron/node) de Node avec des modifications liées aux détails de construction V8 mentionnés ci-dessus et pour exposer l'API requise par Electron. Une fois qu'une version amont de Node est choisie, elle est placée dans une branche du fork de Node d'Electron et tous les correctifs Node d'Electron Node y sont appliqués.

Un autre facteur est que le projet Node applique des corrections à sa version de V8. Comme mentionné ci-dessus, Electron génère tout avec une seule copie de V8, donc les correctifs V8 de Node doivent être portés sur cette copie.

Une fois que toutes les dépendances d’Electron se génère et utilise la même copie de V8, l’étape suivante consiste à résoudre tous les problèmes de code Electron causés par la mise à niveau de Node.

[FIXME] something about a Node debugger in Atom that we (e.g. deepak) use and need to confirm doesn't break with the Node upgrade?

En résumé, les principales étapes sont :

1. Mettre à jour le fork Node d'Electron vers la version souhaitée
2. Backporter les patches de Node V8 à notre copie de V8
3. Mettre à jour les fichiers de génération GN, en appliquant les modifications des fichiers GYP de Node
4. Mettez à jour le DEPS d'Electron afin d'utiliser la nouvelle version de Node

## Mise à jour du [fork](https://github.com/electron/node) Node d'Electron

1. Assurez-vous que `master` sur `electron/node` a les tags de publication de `nodejs/node` misent à jour
2. Create a branch in https://github.com/electron/node: `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update
  - `vX.X.X` Must use a version of Node compatible with our current version of Chromium
3. Réappliquer nos commits de la version précédente de Node que nous utilisions (`vY.Y.Y`) à `v.X.X.X`
  - Vérifiez la tag release et sélectionnez la plage de commits que nous devons réappliquer
  - Plage de commit cherry-pick :
    1. Checkout de `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Résoudre les conflits de fusionnement dans chaque fichier rencontré, puis:
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Répéter jusqu’à ce que ce soit terminé


## Updating [V8](https://github.com/electron/node/src/V8) Patches

We need to generate a patch file from each patch that Node applies to V8.

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

## Update Electron's `DEPS` file

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

## Remarques

- Node maintains its own fork of V8
  - They backport a small amount of things as needed
  - Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of Electron
  - E.g Electron, Chromium, and Node.js
- We don’t track upstream closely due to logistics:
   - Upstream utilise plusieurs repos et donc la fusion en un seul entraînerait une perte d'historique. Donc nous ne mettons à jour que lorsque nous planifions pour Electron un saut de version de Node.
- Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using.
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
 - Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project.
   - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
 - Building Node:
   - We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.

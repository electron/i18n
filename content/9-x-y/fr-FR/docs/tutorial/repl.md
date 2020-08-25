# REPL

Read-Eval-Print-Loop (REPL) est un environnement de programmation informatique simple et interactif qui prend une entrée utilisateur unique (c'est-à-dire des expressions uniques), les évalue et retourne le résultat à l’utilisateur.

Le module `repl` fournit une implémentation de REPL qui est accessibles via :

* En supposant que vous avez `electron` ou `electron-prebuilt` installé comme une dépendance local à votre projet :

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* En supposant que vous avez `electron` ou `electron-prebuild` installé en global :

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Remarque :** `electron --interactive` n’est pas disponible sous Windows.

Plus d’informations se trouvent dans les [docs de Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).

# REPL

Read-Eval-Print-Loop (REPL) est un environnement de programmation informatique simple et interactif qui prend une entrée utilisateur unique (c'est-à-dire des expressions uniques), les évalue et retourne le résultat à l’utilisateur.

Le module `repl` fournit une implémentation de REPL qui est accessibles via :

* En supposant que vous avez `electron` ou `electron-prebuilt` installé comme une dépendance local à votre projet :
    
    ```sh
./node_modules/.bin/electron --interactive
```

* Assuming you have `electron` or `electron-prebuilt` installed globally:
    
    ```sh
electron --interactive
```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` is not available on Windows.

More information can be found in the [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).
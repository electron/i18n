# REPL

Read-Eval-Print-Loop (REPL) is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates them, and returns the result to the user.

The `repl` module provides a REPL implementation that can be accessed using:

* Assuming you have `electron` or `electron-prebuilt` installed as a local project dependency:
    
    ```sh
./node_modules/.bin/electron --interactive
```

* Suponiendo que tiene `electron` o `electron-prebuilt` instalados globalmente:
    
    ```sh
electron --interactive
```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Nota:** `electron --interactive` no está disponible en Windows.

Puede encontrar más información en la [documentación REPL de Node.js](https://nodejs.org/dist/latest/docs/api/repl.html).
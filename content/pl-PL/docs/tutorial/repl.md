# REPL

Read-Eval-Print-Loop (REPL) is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates them, and returns the result to the user.

The `repl` module provides a REPL implementation that can be accessed using:

* Assuming you have `electron` or `electron-prebuilt` installed as a local project dependency:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* Assuming you have `electron` or `electron-prebuilt` installed globally:
    
    ```sh
    electron --interactive
    ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Uwaga:** `electron --interactive` nie jest dostępne na systemach Windows.

Więcej informacji można znaleźć ba [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).
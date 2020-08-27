# REPL

Eine Read-Eval-Print-Loop (REPL) ist eine einfache, interaktive Computer Programmier Umgebung, die einzelne Nutzereingaben entgegennimmt (sprich einzelne Ausdrücke), diese auswertet und anschließend dem Nutzer das Ergebnis anzeigt.

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

**Hinweis:** `electron --interactive` ist nicht verfügbar auf Windows.

Weitere Informationen findest du in der [Node.js REPL Dokumentation](https://nodejs.org/dist/latest/docs/api/repl.html).

# REPL

Read-Eval-Print-Loop (REPL) - это простая интерактивная среда компьютерного программирования, которая принимает однопользовательские входы (т.е. отдельные выражения), оценивает их и возвращает результат пользователю.

Модуль `repl` предоставляет реализацию REPL, к которой можно получить доступ, используя:

* Если у вас есть `electron` или `electron-prebuilt` установлен как локальный проект зависимость:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* Если у вас `electron` или `electron-prebuilt` установлен глобально:
    
    ```sh
    electron --interactive
    ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` is not available on Windows.

More information can be found in the [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).
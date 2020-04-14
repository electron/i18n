# REPL

Read Evaluate Print Loop (REPL) es un simple, ambiente de programación computacional interactiva que toma entradas de usuarios individuales (ej. expresiones individuales), las evalúan, y regresan los resultado del usuario.

El módulo `repl` proporciona una implementación REPL a la que se puede acceder usando:

* Si tiene `electron` o `electron-prebuilt` instalado como una dependencia local del proyecto:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* Si tiene `electron` o `electron-prebuilt` instalados globalmente:
    
    ```sh
    electron --interactive
    ```

Esto solo crea un REPL para el proceso principal. Puede usar la consola de las herramientas de desarrollador para hacer un REPL para los procesos renderizadores.

**Nota:** `electron --interactive` no está disponible en Windows.

Puede encontrar más información en la [documentación REPL de Node.js](https://nodejs.org/dist/latest/docs/api/repl.html).
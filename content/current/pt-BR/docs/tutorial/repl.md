# REPL

Read-Eval-Print-Loop (REPL) é um ambiente simples de programação de computador, interativo que leva entradas de usuário único (ou seja, simples expressões), avalia e retorna o resultado para o usuário.

O módulo `relp` fornece uma implementação de REPL que pode ser acessada usando:

* Supondo que você tenha o `electron` ou `electron-prebuilt` instalado como uma dependência do projeto local:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Supondo que você tenha o `electron` ou `electron-prebuilt` instalado globalmente:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Nota:** `electron --interactive` não está disponível no Windows.

Mais informações podem ser encontradas em [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).

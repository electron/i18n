# REPL

Read-Eval-Print-Loop (REPL) - to proste interaktywne środowisko programistyczne, które przyjmuje pojedyncze dane wejściowe od użytkownika (tj. pojedyncze wyrażenia), oceniaje i zwraca wynik użytkownikowi.

Moduł `repl` zapewnia implementację REPL, do której można uzyskać dostęp przy użyciu:

* Zakładając, że masz `elektron` lub `elektron-prebuild` zainstalowany jako lokalna zależność projektu:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```

* Zakładając, że masz `elektron` lub `elektron-prebuild` zainstalowany globalnie:

  ```sh
  electron --interactive
  ```

Tworzy to jedynie REPL dla głównego procesu. Możesz użyć zakładki Konsoli Narzędzi Dev aby uzyskać REPL dla procesów renderowania.

**Uwaga:** `electron --interactive` nie jest dostępne na systemach Windows.

Więcej informacji można znaleźć ba [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).

# REPL

Read-Eval-Print-Loop (REPL) este un mediu simplu, interactiv de programare care ia intrări individuale ale utilizatorului (i. . expresii unice), le evaluează și returnează rezultatul utilizatorului.

Modulul `repl` oferă o implementare REPL care poate fi accesată folosind:

* Presupunând că aveți `electron` sau `electron-preconstruit` instalat ca o dependență locală de proiect:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Presupunând că aveți `electron` sau `electron-preconstruit` instalat la nivel global:

  ```sh
  electron --interactive
  ```

Acest lucru creează doar un REPL pentru procesul principal. Puteţi utiliza fila Consola a Instrumentelor de dezvoltator pentru a obţine un REPL pentru procesele de redare.

**Notă:** `electronul --interactive` nu este disponibil pe Windows.

Mai multe informații pot fi găsite în documentele [Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).

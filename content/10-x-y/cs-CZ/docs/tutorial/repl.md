# ODEBRAT

Read-Eval-Print-Loop (REPL) je jednoduché, interaktivní počítačové programování prostředí, které přijímá jeden uživatel vstupy. . jediné výrazy), vyhodnotí a vrátí výsledek uživateli.

Modul `repl` poskytuje REPL implementaci, ke které lze přistupovat pomocí:

* Předpokládejme, že máte `Electron` nebo `elektron-prebuilt` nainstalovaný jako lokální závislost na projektu:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Předpokládejme, že máte `elektronický` nebo `elektron-prebuilt` nainstalovaný globálně:

  ```sh
  electron --interactive
  ```

To vytváří REPL pouze pro hlavní proces. Chcete-li získat REPL pro procesy vykreslování, můžete použít kartu Dev Tools.

**Poznámka:** `electron --interactive` není v systému Windows k dispozici.

Více informací naleznete v [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).

# REPL

Eine Read-Eval-Print-Loop (REPL) ist eine einfache, interaktive Computer Programmier Umgebung, die einzelne Nutzereingaben entgegennimmt (sprich einzelne Ausdrücke), diese auswertet und anschließend dem Nutzer das Ergebnis anzeigt.

Das `repl` Modul bietet eine REPL Implementierung, auf die zugegriffen werden kann:

* Angenommen, Sie haben `Elektron` oder `Elektron vorkompiliert` als lokale Projekt-Abhängigkeit installiert:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Angenommen, Sie haben `Elektron` oder `Elektron vorkonfiguriert` global installiert:

  ```sh
  electron --interactive
  ```

Dies erzeugt nur eine REPL für den Hauptprozess. Sie können die Konsole Registerkarte der Dev Tools verwenden, um eine REPL für die Renderer-Prozesse zu erhalten.

**Hinweis:** `electron --interactive` ist nicht verfügbar auf Windows.

Weitere Informationen findest du in der [Node.js REPL Dokumentation](https://nodejs.org/dist/latest/docs/api/repl.html).

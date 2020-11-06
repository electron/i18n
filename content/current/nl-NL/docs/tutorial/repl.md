# REPL

Lead-Eval-Print-Loop (REPL) is een eenvoudige, interactieve computer programmering omgeving die slechts gebruikersinputs neemt (i. . single expressions), evalueert deze en geeft het resultaat weer aan de gebruiker.

De `repl` module biedt een REPL implementatie die kan worden gebruikt met:

* Ervan uitgaande dat u `electron` of `elektron-prebuilt` hebt geïnstalleerd als een lokale projectafhankelijkheid:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```

* Ervan uitgaande dat u `electron` of `elektron-prebuilt` wereldwijd hebt geïnstalleerd:

  ```sh
  electron --interactive
  ```

Dit creëert alleen een REPL voor het hoofdproces. U kunt het Console tabblad van de Dev Tools gebruiken om een REPL te krijgen voor de renderer processen.

**Opmerking:** `electron --interactief,` is niet beschikbaar op Windows.

Meer informatie vindt u in de [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).

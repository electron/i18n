# Coding Style

Acestea sunt regulile de stil pentru codificare în Electron.

Puteți rula `npm run lint` pentru a afișa orice probleme de stil detectate de `cpplint` și `eslint`.

## Cod general

* Terminați fișierele cu o linie nouă.
* Locul necesită în următoarea ordine:
  * Construit în modulele Node (precum `calea`)
  * Construit în module Electron (cum ar fi `ipc`, `app`)
  * Module locale (folosind căi relative)
* Plasați proprietățile clasei în următoarea ordine:
  * Metode și proprietăți ale clasei (metode care încep cu `@`)
  * Metode și proprietăți de instanță
* Evitați codul dependent de platformă:
  * Folosiți `path.join()` pentru a concatena nume de fișiere.
  * Folosiți `os.tmpdir()` mai degrabă decât `/tmp` când aveți nevoie să faceți referire la directorul temporar.
* Using a plain `return` when returning explicitly at the end of a function.
  * Nu `returnează null`, `return undefined`, `null` sau `undefined`

## C++ și Piton

Pentru C++ și Python, vom urmări [stilul de codare a Chromium](https://www.chromium.org/developers/coding-style). Poți să folosești [clang-format](clang-format.md) pentru a formata automat codul C ++. Există de asemenea, un script, precum `script/cpplint.py` pentru a verifica dacă toate fișierele sunt conforme.

Versiunea Python pe care o folosim acum este Python 2.7.

Codul C ++ folosește o mulțime de abstracții și tipuri de Chromium, așa că este recomandat să vă familiarizați cu ei. Un loc bun de început este documentul Chromium de [Abstracții importante și Structuri de date](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures). Documentul menționează unele tipuri speciale, tipuri de scope-uri (care își eliberează automat memoria atunci când ies din scope), mecanisme de logging etc.

## Documentație

* Scrie [remarca](https://github.com/remarkjs/remark) al stilului markdown.

Puteți rula `npm run lint-docs` pentru a vă asigura că modificările documentației dvs. sunt formatat corect.

## JavaScript

* Scrie [standard](https://www.npmjs.com/package/standard) stil JavaScript.
* Numele de fișiere ar trebui să fie concatenate cu `-` în loc de `_`, de exemplu, `file-name.js`, mai degrabă decât `file_name.js`, deoarece în [github/atom](https://github.com/github/atom) github /atom sunt, de obicei, în formularul `nume-modul`. Această regulă se aplică doar fișierelor `.js`.
* Utilizați sintaxa ES6/ES2015 mai nouă, dacă este cazul
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) pentru necesități și alte constante.  Dacă valoarea este primitivă, utilizați numele cu majuscule (de ex. `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) pentru definirea variabilelor
  * [Funcții săgeată](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) în loc de `funcție () { }`
  * [Format Literații](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) în loc de text concatenare folosind `+`

## Denumirea obiectelor

API-urile Electron utilizează aceeași schemă de capitalizare ca și Node.js:

- Când modulul în sine este o clasă ca `BrowserWindow`, utilizaţi `PascalCase`.
- Atunci cand modulul este un set de API-uri, cum ar fi `globalShortcut`, utilizați `camelCase`.
- Când API-ul este o proprietate a obiectului, și este suficient de complex pentru a fi într-un capitol separat ca `win.webContents`, utilizați `mixedCase`.
- For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.

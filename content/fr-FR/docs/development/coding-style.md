# Style de Code

Ce sont les règles de style pour coder dans Electron.

Vous pouvez exécuter `npm run lint` pour montrer tous les problèmes de style détectés par `cpplint` et `eslint`.

## C++ et Python

Pour C++ et Python, nous suivons le [Style de codage](http://www.chromium.org/developers/coding-style) de Chromium. Vous pouvez utiliser [clang-format](clang-format.md) pour formatter le code C++ automatiquement. Il y a aussi un script `script/cpplint.py` pour vérifier si tous les fichiers sont conformes.

La version de Python que nous utilisons est Python 2.7.

Le code C++ utilise beaucoup d’abstractions et de types de Chromium, il est donc recommandé de se familiariser avec eux. Un bon endroit pour commencer est : [Abstractions Importantes et Structure des Données](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) de Chromium. Le document mentionne certains types spéciaux, les types de portée limitées (qui libère automatiquement leur mémoire en allant hors de portée), mécanismes de journalisation etc.

## JavaScript

* Écrire [standard](http://npm.im/standard) style JavaScript.
* Les noms des fichiers doivent être liés avec `–` au lieu de `_`, par exemple : `fichier-name.js` plutôt que `file_name.js`, parce que dans [github/atome](https://github.com/github/atom) les noms de modules sont généralement sous la forme `nom-du-module`. Cette règle s’applique uniquement aux fichiers `.js`.
* Utilisez la nouvelle syntaxe ES6/ES2015, le cas écheant 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) pour les exigences et d'autres constantes
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) pour définir des variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) au lieu de `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) au lieu de la concaténation de chaîne en utilisant `+`

## Nommer les choses

L'API Electron utilise le même système de capitalisation que Node.js :

* Lorsque le module lui-même est une classe comme `BrowserWindow`, utilisez `CamelCase`.
* Lorsque le module est un ensemble d’API, comme `globalShortcut`, utilisez `texteEncasseMelangée`.
* Lorsque l’API est une propriété d’objet comme `win.webContents`, utilisez `mixedCase`.
* Pour d’autres API non-module, utilisez des titres naturels, tels que `<webview>Tag` ou `Process Object`.

Lorsque vous créez une nouvelle API, il est préférable d’utiliser des getters et setters au lieu du style une-fonction de jQuery. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
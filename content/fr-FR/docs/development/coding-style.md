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
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Naming Things

Electron APIs uses the same capitalization scheme as Node.js:

* When the module itself is a class like `BrowserWindow`, use `CamelCase`.
* When the module is a set of APIs, like `globalShortcut`, use `mixedCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
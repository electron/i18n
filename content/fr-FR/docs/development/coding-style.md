# Style de Codage

Ce sont les règles de style pour coder dans Electron.

Vous pouvez exécuter `npm run lint` pour montrer tous les problèmes de style détectés par `cpplint` et `eslint`.

## General Code

* End files with a newline.
* Place requires in the following order: 
  * Built in Node Modules (such as `path`)
  * Built in Electron Modules (such as `ipc`, `app`)
  * Local Modules (using relative paths)
* Place class properties in the following order: 
  * Class methods and properties (methods starting with a `@`)
  * Instance methods and properties
* Avoid platform-dependent code: 
  * Use `path.join()` to concatenate filenames.
  * Use `os.tmpdir()` rather than `/tmp` when you need to reference the temporary directory.
* Using a plain `return` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null`, or `undefined`

## C++ et Python

Pour C++ et Python, nous suivons le [Style de codage](https://www.chromium.org/developers/coding-style) de Chromium. Vous pouvez utiliser [clang-format](clang-format.md) pour formatter le code C++ automatiquement. Il y a aussi un script `script/cpplint.py` pour vérifier si tous les fichiers sont conformes.

La version de Python que nous utilisons est Python 2.7.

Le code C++ utilise beaucoup d’abstractions et de types de Chromium, il est donc recommandé de se familiariser avec eux. Un bon endroit pour commencer est : [Abstractions Importantes et Structure des Données](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) de Chromium. Le document mentionne certains types spéciaux, les types de portée limitées (qui libère automatiquement leur mémoire en allant hors de portée), mécanismes de journalisation etc.

## Documentation

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Écrire [standard](https://npm.im/standard) style JavaScript.
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

Lorsque vous créez une nouvelle API, il est préférable d’utiliser des getters et setters au lieu du style une-fonction de jQuery. Par exemple, `.getText()` et `.setText(text)` sont préférés aux `.text([text])`. Il y a une [discussion](https://github.com/electron/electron/issues/46) là-dessus.
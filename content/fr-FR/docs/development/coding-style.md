# Style de Codage

Ce sont les règles de style pour coder dans Electron.

Vous pouvez exécuter `npm run lint` pour montrer tous les problèmes de style détectés par `cpplint` et `eslint`.

## Code général

* Terminer les fichiers avec une ligne vide.
* Le positionnement est exigé dans l'ordre suivant :
  * Modules Node embarqués (tel que `path`)
  * Modules Electron embarqués (tels que `ipc`, `app`)
  * Modules locaux (utilisant des chemins relatifs)
* Le positionnement des classes dans l'ordre suivant :
  * Méthodes et propriétés de la classe (méthodes commençant par un `@`)
  * Méthodes et propriétés d'instance
* Évitez le code dépendant de la plateforme :
  * Utilisez `path.join()` pour concaténer les noms de fichiers.
  * Utilisez `os.tmpdir()` au lieu de `/tmp` lorsque vous devez référencer le répertoire temporaire.
* Utilisation d’un `return` lorsqu’il revient explicitement à la fin d’une fonction.
  * Pas de `return null`, `return undefined`, `null` ou `undefined`

## C++ et Python

Pour C++ et Python, nous suivons le [Style de codage](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md) de Chromium. Vous pouvez utiliser [clang-format](clang-format.md) pour formatter le code C++ automatiquement. Il y a aussi un script `script/cpplint.py` pour vérifier si tous les fichiers sont conformes.

La version de Python que nous utilisons est Python 2.7.

Le code C++ utilise beaucoup d’abstractions et de types de Chromium, il est donc recommandé de se familiariser avec eux. Un bon endroit pour commencer est : [Abstractions Importantes et Structure des Données](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) de Chromium. Le document mentionne certains types spéciaux, les types de portée limitées (qui libère automatiquement leur mémoire en allant hors de portée), mécanismes de journalisation etc.

## Documentation

* Ecrivez les [remarques](https://github.com/remarkjs/remark) en markdown.

Vous pouvez exécuter `npm run lint-docs` pour vous assurer que vos modifications de documentation sont formatés correctement.

## JavaScript

* Écrire [standard](https://www.npmjs.com/package/standard) style JavaScript.
* Les noms des fichiers doivent être liés avec `–` au lieu de `_`, par exemple : `fichier-name.js` plutôt que `file_name.js`, parce que dans [github/atome](https://github.com/github/atom) les noms de modules sont généralement sous la forme `nom-du-module`. Cette règle s’applique uniquement aux fichiers `.js`.
* Utilisez la nouvelle syntaxe ES6/ES2015, le cas écheant
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) pour les exigences et d'autres constantes.  Si la valeur est une primitive, utilisez un nom en majuscules (par ex. `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) pour définir des variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) au lieu de `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) au lieu de la concaténation de chaîne en utilisant `+`

## Nommer les choses

L'API Electron utilise le même système de capitalisation que Node.js :

* Lorsque le module lui-même est une classe comme `BrowserWindow`, utilisez le `PascalCase`.
* Lorsque le module est un ensemble d’API, comme `globalShortcut`, utilisez le `camelCase`.
* Lorsque l’API est une propriété d’objet comme `win.webContents`, utilisez `mixedCase`.
* Pour d’autres API non-module, utilisez des titres naturels, tels que `<webview>Tag` ou `Process Object`.

Lorsque vous créez une nouvelle API, il est préférable d’utiliser des getters et setters au lieu du style une-fonction de jQuery. Par exemple, `.getText()` et `.setText(text)` sont préférés aux `.text([text])`. Il y a une [discussion](https://github.com/electron/electron/issues/46) là-dessus.

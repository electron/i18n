# Style de codage

Ce sont les règles de style pour le codage en électrons.

Vous pouvez exécuter `npm exécuter lint` pour montrer des problèmes de style détectés par `cpplint` et `eslint`.

## C++ et Python

Pour C++ et Python, nous suivons [Coding Style](http://www.chromium.org/developers/coding-style) de chrome. Vous pouvez utiliser[clang-format](clang-format.md) pour mettre en forme le code C++ automatiquement. Il y a aussi une `script/cpplint.py` de script pour vérifier si tous les fichiers sont conformes.

La version de Python que nous utilisons aujourd'hui est Python 2.7.

Le code C++ utilise beaucoup d’abstractions de chrome et de types, donc il est recommandé de se familiariser avec eux. Un bon endroit pour commencer est de chrome [Important Abstractions et données Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. Le document mentionne certains types spéciaux, les types de portée limitées (qui libère automatiquement leur mémoire en allant hors de portée), mécanismes de journalisation etc..

## JavaScript

* Écrire [standard](http://npm.im/standard) JavaScript style.
* Noms de fichiers doivent être concaténées avec `-` au lieu de `_`, p. ex. `file-name.js` plutôt que `file_name.js`, parce que dans le module[github/atom](https://github.com/github/atom), les noms sont généralement sous la forme `module-name`. Cette règle ne s’applique qu’aux fichiers de `.js`.
* Utilisez la syntaxe de ES6/ES2015 nouvelle cas échéant 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) pour exige et autres constantes
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) pour la définition des variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) au lieu de `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) au lieu de concaténation de chaîne à l’aide `+`

## Nommer les choses

Électron API utilise le même système de capitalisation comme Node.js :

* Lorsque le module lui-même est une classe telle que `BrowserWindow`, utilisez `CamelCase`.
* Lorsque le module est un ensemble d’API, comme `globalShortcut`, utilisez `mixedCase`.
* Lorsque l’API est une propriété d’objet, et c’est assez complexe pour être dans un autre chapitre comme `win.webContents`, utilisez `mixedCase`.
* D’autres API non-module, utilisez des titres naturels, tels que `<webview> Tag` ou `Process Object`.

Lorsque vous créez une nouvelle API, il est préférable d’utiliser des getters et setters au lieu de style d’une fonction de jQuery. Par exemple, `.getText ()` et `.setText (texte) ` sont préférés aux </code> .text ([text]). Il y a un<a href="https://github.com/electron/electron/issues/46">discussion</a> là-dessus.</p>
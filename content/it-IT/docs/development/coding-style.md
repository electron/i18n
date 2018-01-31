# Stile Codice

These are the style guidelines for coding in Electron.

You can run `npm run lint` to show any style issues detected by `cpplint` and `eslint`.

## C++ and Python

For C++ and Python, we follow Chromium's [Coding Style](https://www.chromium.org/developers/coding-style). You can use [clang-format](clang-format.md) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

La versione Python che stiamo usando ora è Python 2.7.

Il codice C ++ utilizza molte delle astrazioni e dei tipi di Chromium, quindi è così raccomandato di conoscerli. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. Il documento menziona alcuni tipi speciali, i tipi di ambito (che rilasciano automaticamente la loro memoria quando escono dal campo di applicazione), i meccanismi di registrazione, ecc.

## JavaScript

* Write [standard](https://npm.im/standard) JavaScript style.
* File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. This rule only applies to `.js` files.
* Use newer ES6/ES2015 syntax where appropriate 
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

Quando si crea una nuova API, è preferibile utilizzare le funzioni get e set invece dello stile di una funzione jQuery. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
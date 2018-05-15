# Stile Codice

These are the style guidelines for coding in Electron.

You can run `npm run lint` to show any style issues detected by `cpplint` and `eslint`.

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
  * Not `return null`, `return undefined`, `null` or `undefined`

## C++ and Python

For C++ and Python, we follow Chromium's [Coding Style](https://www.chromium.org/developers/coding-style). You can use [clang-format](clang-format.md) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

La versione Python che stiamo usando ora è Python 2.7.

Il codice C ++ utilizza molte delle astrazioni e dei tipi di Chromium, quindi è così raccomandato di conoscerli. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. Il documento menziona alcuni tipi speciali, i tipi di ambito (che rilasciano automaticamente la loro memoria quando escono dal campo di applicazione), i meccanismi di registrazione, ecc.

## Documentazione

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

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

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

Quando si crea una nuova API, è preferibile utilizzare le funzioni get e set invece dello stile di una funzione jQuery. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
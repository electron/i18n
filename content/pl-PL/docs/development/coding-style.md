# Styl Kodowania

To są wytyczne dotyczące stylów kodowania w Electron.

You can run `npm run lint` to show any style issues detected by `cpplint` and `eslint`.

## Ogólny kod

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

## C++ i Python

Dla C++ i Pythona, podążamy za [stylem kodowania Chromium](https://www.chromium.org/developers/coding-style). Możesz użyć [clang-format](clang-format.md) aby sformatować kod C++ automatycznie. Tu jest również skrypt `script/cpplint.py<0>aby sprawdzić czy wszystkie pliki odpowiadają.</p>

<p>Wersja Pythona której teraz używamy to Python 2.7.</p>

<p>Kod C++ używa mnóstwo abstrakcji i typów Chromium, więc zaleca się z nimi oswoić. Dobre miejsce do rozpoczęcia to dokument <a href="https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures">Ważne abstrakcje i struktury danych Chromium</a>. Dokument porusza niektóre specjalne typy, lub zakres typów (który automatycznie wypuszcza ich pamięć kiedy wychodzi z zakresu), mechanizmy logowania itd.</p>

<h2>Dokumentacja</h2>

<ul>
<li>Write <a href="https://github.com/remarkjs/remark">remark</a> markdown style</li>
</ul>

<p>You can run <code>npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Napisz[standardowym](https://npm.im/standard) stylem JavaScript.
* File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. This rule only applies to `.js` files.
* Use newer ES6/ES2015 syntax where appropriate 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Nazywanie rzeczy

Electron APIs uses the same capitalization scheme as Node.js:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. Istnieje [dyskusja](https://github.com/electron/electron/issues/46) na ten temat.
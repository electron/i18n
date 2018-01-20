# Istilo ng Code

Ang mga ito ay mga patnubay sa istilo ng paggawa ng code sa Electron.

Maaari mong paganahin ang `npm run lint` upang maipakita ang anumang istilo ng mga isyu na syang mahahanap gamit ang `cpplint` at `eslint`.

## C++ and Python

Para sa C++ at Python, tayo ay sumusunod sa [Coding Style](https://www.chromium.org/developers/coding-style) ng Chromium. Maaaring gamitin ang [clang-format](clang-format.md) upang kusang iayos ang code ng C++. Mayroon ding isang script na `script/cpplint.py` upang malaman kung ang lahat ng file ay nakasunod.

Ang Python 2.7 ay bagong bersyon na ating ginagamit ngayon.

Ang code ng C++ ay kadalasang gumagamit ng mga abstraction ng Chromium at mga uri nito, kaya naman pinapayuhan na kilalanin ang mga ito. Ang [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document ng Chromium ay syang magandang simulain. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

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

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
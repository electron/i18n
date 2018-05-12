# Paraan sa pagkukudigo

Ito ay mga patnubay sa mga istilo ng paggawa ng code sa Electron.

Maaari mong paganahin ang `npm run lint` upang maipakita ang anumang istilo ng mga isyu na syang mahahanap gamit ang `cpplint` at `eslint`.

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

Para sa C++ at Python, tayo ay sumusunod sa [Coding Style](https://www.chromium.org/developers/coding-style) ng Chromium. Maaaring gamitin ang [clang-format](clang-format.md) upang kusang iayos ang code ng C++. Mayroon ding isang script na `script/cpplint.py` upang malaman kung ang lahat ng file ay nakasunod.

Ang Python 2.7 ay bagong bersyon na ating ginagamit ngayon.

Ang code ng C++ ay kadalasang gumagamit ng mga abstraction ng Chromium at mga uri nito, kaya naman pinapayuhan na kilalanin ang mga ito. Ang [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document ng Chromium ay syang magandang simulain. Ang mga naisaad na natatanging mga uri ng document, ang mga uri ng nasaklaw ( na syang kusang naglalabas ng kanilang memory kung ito'y 'di sinasaklawan), mekanismo ng pagla-log, atbp.

## Documentation

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Isulat ang istilo ng JavaScript na [standard](https://npm.im/standard).
* Ang mga pangalan ng file ay dapat na nakadugtong sa `-` sa halip sa `_`, hal. ang paggamit ng `file-name.js` kaysa sa `file_name.js`, dahil ang mga pangalan ng [github/atom](https://github.com/github/atom) na modyul ay madalas na nasa anyo ng `module-name`. Ang patakaran na ito ay ginagamit lamang sa mga file na `.js`.
* Gumamit ng mas bagong ES6/ES2015 syntax kung saan ito'y naaangkop 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) para sa mga kinailangan at iba pang mga constant
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) upang matukoy ang mga variable
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) sa halip na `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) sa halip na magkakadugtong na string gamit ang `+`

## Pagbibigay ng Pangalan sa mga Bagay

Ang Electron APIs ay parehong gumagamit ng capitalization scheme bilang Node.js:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* Kapag ang API ay isang pag-aari ng object, at masyadong kumplikado upang maibukod ang bawat sangay tulad ng `win.webContents`, gumamit ng `mixedCase`.
* Para sa iba pang non-module ng APIs, gumamit ng likas na mga pamagat, tulad ng `<webview> Tag` o kaya naman ay `Process Object`.

Kapag gumagawa ng bagong API, mas mabuting gumamit ng getters at setters sa halip na istilo ng jQuery's one-function. Halimbawa, sa halip na gumamit ng `.getText()` at `.setText(text)` mas mabuting gamitin ang `.text([text])`. Mayroong [discussion](https://github.com/electron/electron/issues/46) tungkol dito.
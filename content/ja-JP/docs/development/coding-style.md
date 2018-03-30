# コーディングスタイル

これらは Electron のコーディングスタイルのガイドラインです。

`npm run lint` を実行すると、`cpplint` と `eslint` で検出されたスタイルの問題を表示できます。

## 一般的なコード

* ファイルを改行で終えてください。
* 以下の順番で require を配置してください。 
  * 組み込み Node モジュール (`path` など)
  * 組み込み Electron モジュール (`ipc`、`app` など)
  * ローカルモジュール (相対パスを使用したもの)
* 以下の順番でクラスのプロパティを配置してください。 
  * クラスメソッドとプロパティ (`@` で始まるメソッド)
  * インスタンスメソッドとプロパティ
* Avoid platform-dependent code: 
  * Use `path.join()` to concatenate filenames.
  * Use `os.tmpdir()` rather than `/tmp` when you need to reference the temporary directory.
* Using a plain `return` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null`, or `undefined`

## C++ および Python

For C++ and Python, we follow Chromium's [Coding Style](https://www.chromium.org/developers/coding-style). You can use [clang-format](clang-format.md) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

The Python version we are using now is Python 2.7.

The C++ code uses a lot of Chromium's abstractions and types, so it's recommended to get acquainted with them. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

## ドキュメント

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

## 命名

Electron APIs uses the same capitalization scheme as Node.js:

* When the module itself is a class like `BrowserWindow`, use `CamelCase`.
* When the module is a set of APIs, like `globalShortcut`, use `mixedCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
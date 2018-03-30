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
* プラットフォーム依存なコードは避けてください。 
  * `path.join()` を使用してファイル名を連結します。
  * 一時ディレクトリを参照する必要がある場合は、`/tmp` ではなく `os.tmpdir()` を使用してください。
* 関数の終わりで明示的に戻るときは、そのままの `return` を使用します。 
  * `return null`、`return undefined`、`null` や、`undefined` ではありません

## C++ と Python

C++ と Python の場合、Chromium の [コーディングスタイル](https://www.chromium.org/developers/coding-style) に従います。 C++ のコードを自動的にフォーマットするのに、[clang-format](clang-format.md) が使用できます。 また、`script/cpplint.py` というスクリプトがあり、すべてのファイルが適しているかどうかを確認します。

我たちの使用している現在の Python のバージョンは、Python 2.7 です。

C++ コードは多くの Chromium の抽象クラスと型を使用しているため、それらを知ることを推奨します。 始めるには、Chromiumの [重要な抽象クラスとデータ構造](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) ドキュメントが良いです。 このドキュメントでは、いくつかの特別な型、スコープ付きの型 (スコープ外に出たときに自動的にメモリを解放する) 、ロギングのメカニズムなどについて記述しています。

## ドキュメント

* [remark](https://github.com/remarkjs/remark) のマークダウン形式で記述します

`npm run lint-docs` を実行して、ドキュメントの変更が正しくフォーマットされていることを確認できます。

## JavaScript

* [standard](https://npm.im/standard) の JavaScript 形式で記述します。
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
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
* 関数の終わりから明示的に戻るときにただの `return` を使用します。
  * `return null`、`return undefined`、`null` や `undefined` ではありません

## C++ と Python

C++ と Python の場合、Chromium の [コーディングスタイル](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md) に従います。 C++ のコードを自動的にフォーマットするのに、[clang-format](clang-format.md) が使用できます。 また、`script/cpplint.py` というスクリプトがあり、すべてのファイルが適しているかどうかを確認します。

我たちの使用している現在の Python のバージョンは、Python 2.7 です。

C++ コードは多くの Chromium の抽象クラスと型を使用しているため、それらを知ることを推奨します。 始めるには、Chromiumの [重要な抽象クラスとデータ構造](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) ドキュメントが良いです。 このドキュメントでは、いくつかの特別な型、スコープ付きの型 (スコープ外に出たときに自動的にメモリを解放する) 、ロギングのメカニズムなどについて記述しています。

## ドキュメント

* [remark](https://github.com/remarkjs/remark) のマークダウン形式で記述します.

`npm run lint-docs` を実行して、ドキュメントの変更が正しくフォーマットされていることを確認できます。

## JavaScript

* [standard](https://www.npmjs.com/package/standard) の JavaScript 形式で記述します。
* ファイル名は、`_` の代わりに `-` で連結する必要があります。[github/atom](https://github.com/github/atom) モジュール名は通常は `module-name` の形式になるので、`file_name.js` ではなく、`file-name.js` としてください。 このルールは、`.js` ファイルにのみ適用されます。
* 必要に応じて、より新しい ES6/ES2015 構文を使用します
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) は require とその他の定数に.  値がプリミティブの場合、名前はすべて大文字にします (例 `const NUMBER_OF_RETRIES = 5`)。
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) は変数の定義に
  * [アロー関数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) で `function () { }` を代替する
  * [テンプレート文字列](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) で + を使用した文字列連結を代替する `+`

## 命名

Electron API では、Node.js と同じ大文字表記が使用されます。

* モジュール自体が `BrowserWindow` のようなクラスである場合は、`PascalCase` を使用します。
* モジュールが `globalShortcut` のような API のセットである場合は、`camelCase` を使用します。
* API がオブジェクトのプロパティで、`win.webContents` のような別の章に分けられるほど複雑な場合は、`mixedCase` を使用します。
* 他の非モジュール API の場合は、`<webview>タグ` や `プロセスオブジェクト` などの自然なタイトルを使用します。

新しい API を作成する場合は、jQuery の one 関数スタイルの代わりに getter と setter を使用することを推奨します。 例えば、`.text([text])` より、`.getText()` と `.setText(text)` を優先します。 こちらに、これついての [ディスカッション](https://github.com/electron/electron/issues/46) があります。

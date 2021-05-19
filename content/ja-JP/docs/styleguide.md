# Electron ドキュメントスタイルガイド

Electronのドキュメント（英語）を書くためのガイドラインです。

## ヘッディング

* 各ページは最上部に1つの`#`レベルのタイトルが必要です。
* Chapters in the same page must have `##`-level headings.
* Sub-chapters need to increase the number of `#` in the heading according to their nesting depth.
* The page's title must follow [APA title case][title-case].
* All chapters must follow [APA sentence case][sentence-case].

`Quick Start（クイックスタート）` を例にすると、以下のようになります。

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

ただし、 API リファレンスに関してはこのルールの例外があります。

## Markdown のルール

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* コードブロックでは `cmd` の代わりに `sh` を使用します (構文ハイライトのため)。
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* 2 階層以上にネストしたリストは使用できません (Markdown レンダラーのため)。
* すべての `js` と `javascript` コードブロックは、[standard-markdown](https://www.npmjs.com/package/standard-markdown) によって整形されます。
* For unordered lists, use asterisks instead of dashes.

## 使用する言葉

* 結果を説明するときは、「なるでしょう」より「なります」を使用します。
* 「プロセス上」より「プロセス内」が望ましいです。

## API リファレンス

以下のルールは、API のドキュメントにのみ適用されます。

### Title and description

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

```markdown
# session

> ブラウザーセッション、Cookie、キャッシュ、プロキシ設定などを管理します。
```

### モジュールメソッドとイベント

モジュールはクラスではありません。そのメソッドとイベントは `## Methods` と `## Events` の章の下に列挙しなければなりません。

`autoUpdater` を例にすると、以下のようになります。

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### クラス

* API のクラスやモジュールの一部の API クラスは `## Class: クラス名` の章の下に列挙しなければなりません。
* 1 ページに複数のクラスがあってもかまいません。
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events は `### Instance Events` の章の下に列挙しなければなりません。
* Instance Properties は `### Instance Properties` の章の下に列挙しなければなりません。
  * Instance Properties must start with "A [Property Type] ..."

`Session` と `Cookies` クラスを例にすると、以下のようにします。

```markdown
# session

## Methods

### session.fromPartition(partition)

## Static Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods and their arguments

メソッドの章はつぎの形式でなければなません。

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - 引数の説明。
* `optional` Integer (optional) - 他の引数の説明。

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

モジュールでは、`objectName` がモジュールの名前です。 クラスでは、クラスのインスタンスの名前にするべきで、モジュールの名前と同じではいけません。

例として、`session` モジュール下の `Session` クラスのメソッドは `ses` を `objectName` として使用しなければなりません。

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
必須[, 任意]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

`Function` 型引数の説明は、それがどのように呼ばれるのかを明確にし、それに渡される引数の型を列挙しなければなりません。

#### Platform-specific functionality

引数またはメソッドが特定のプラットフォーム固有のものである場合、そのプラットフォームはデータ型に続くスペース区切りのイタリック体リストを用いて示されます。 値は `macOS`、`Windows`、`Linux` にできます。

```markdown
* `animate` Boolean (任意) _macOS_ _Windows_ - ものをアニメーションします。
```

### イベント

イベントの章はつぎの形式でなければなません。

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

イベントの引数についてはメソッドと同じルールに従います。

### プロパティ

プロパティの章はつぎの形式でなければなません。

```markdown
### session.defaultSession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

[electron/i18n](https://github.com/electron/i18n#readme) を参照してください

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint

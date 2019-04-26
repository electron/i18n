# Electron ドキュメントガイド

Electronのドキュメント（英語）を書くためのガイドラインです。

## タイトル

* 各ページは最上部に1つの`#`レベルのタイトルが必要です。
* 同じページの章には、`##`レベルのタイトルが必要です。
* サブチャプターのタイトルは、ネストする深さに応じて `#` の数を増やす必要があります。
* ページのタイトルは全ての単語の頭文字を大文字にする（capitalizeする）必要があります。ただし、 of や and といった接続詞は例外です。
* 章のタイトルにおいては、最初の単語の頭文字だけを大文字にします。

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

* コードブロックでは `cmd` の代わりに `sh` を使用します (構文ハイライトのため)。
* 行は 80 列で折り返す必要があります。
* 2 階層以上にネストしたリストは使用できません (Markdown レンダラーのため)。
* すべての `js` と `javascript` コードブロックは、[standard-markdown](http://npm.im/standard-markdown) によって整形されます。

## 使用する言葉

* 結果を説明するときは、「なるでしょう」より「なります」を使用します。
* 「プロセス上」より「プロセス内」が望ましいです。

## API リファレンス

以下のルールは、API のドキュメントにのみ適用されます。

### ページのタイトル

各ページは `require('electron')` によって返される実際のオブジェクト名をタイトルに使用しなければなりません。`BrowserWindow` や `autoUpdater` や `session` のようにします。

ページタイトルの下は、`>` で始まる一行の説明でなければなりません。

`session` を例にすると、このようになります。

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
* Constructors は `###` 階層のタイトルで列挙されなければなりません。
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) は `### Static Methods` の章の下に列挙しなければなりません。
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) は `### Instance Methods` の章の下にリストアップしなければなりません。
* 戻り値があるすべてのメソッドを説明するときは、このように始めます。「戻り値 `[TYPE]` - 戻り値の説明」 
  * メソッドが `Object` を返す場合、その構造を記述します。コロンとそれに続く改行、そして関数の引数と同じスタイルでプロパティの順不同リストにします。
* Instance Events は `### Instance Events` の章の下に列挙しなければなりません。
* Instance Properties は `### Instance Properties` の章の下に列挙しなければなりません。 
  * Instance Properties は "A [プロパティの型] ..." で始まらなければなりません。

`Session` と `Cookies` クラスを例にすると、以下のようにします。

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

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

### メソッド

メソッドの章はつぎの形式でなければなません。

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### イベント

イベントの章はつぎの形式でなければなません。

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### プロパティ

プロパティの章はつぎの形式でなければなません。

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## ドキュメントの翻訳

[electron/i18n](https://github.com/electron/i18n#readme) を参照してください
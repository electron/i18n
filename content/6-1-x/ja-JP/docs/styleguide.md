# Electron ドキュメントガイド

Electronのドキュメント（英語）を書くためのガイドラインです。

## タイトル

* 各ページは最上部に1つの`#`レベルのタイトルが必要です。
* 同じページの章には、`##`レベルのタイトルが必要です。
* サブチャプターのタイトルは、ネストする深さに応じて  `#`  の数を増やす必要があります。
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
* すべての戻り値があるメソッドの説明は、"戻り値 `[TYPE]` - 戻り値の説明" というように書き始めます。
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

* `required` String - 引数の説明。
* `optional` Integer (optional) - 他の引数の説明。

...
```

タイトルが `###` 階層か `####` 階層かは、メソッドがモジュール内かクラス内かに依存しています。

モジュールでは、`objectName` がモジュールの名前です。 クラスでは、クラスのインスタンスの名前にするべきで、モジュールの名前と同じではいけません。

例として、`session` モジュール下の `Session` クラスのメソッドは `ses` を `objectName` として使用しなければなりません。

任意の引数は、引数とその後に別の引数が続く場合に必要なコンマを囲む角括弧 `[]` で示されます。

```sh
必須[, 任意]
```

メソッドの下は、それぞれの引数に関する詳細情報です。 引数の型は次のいずれかの一般的な型によって表記されます。

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Electron の [`WebContent`](api/web-contents.md) のようなカスタム型

引数またはメソッドが特定のプラットフォーム固有のものである場合、そのプラットフォームはデータ型に続くスペース区切りのイタリック体リストを用いて示されます。 値は `macOS`、`Windows`、`Linux` にできます。

```markdown
* `animate` Boolean (任意) _macOS_ _Windows_ - ものをアニメーションします。
```

`Array` 型引数は、その下の説明で含められる要素を規定する必要があります。

`Function` 型引数の説明は、それがどのように呼ばれるのかを明確にし、それに渡される引数の型を列挙しなければなりません。

### イベント

イベントの章はつぎの形式でなければなません。

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

タイトルが `###` 階層か `####` 階層かは、イベントがモジュール内かクラス内かに依存しています。

イベントの引数についてはメソッドと同じルールに従います。

### プロパティ

プロパティの章はつぎの形式でなければなません。

```markdown
### session.defaultSession

...
```

タイトルが `###` 階層か `####` 階層かは、プロパティがモジュール内かクラス内かに依存しています。

## ドキュメントの翻訳

[electron/i18n](https://github.com/electron/i18n#readme) を参照してください

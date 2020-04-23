---
title: Electron 0.37 の新機能
author: zeke
date: '2016-03-25'
---

Electron `0.37` が先日 [リリースされました](https://github.com/electron/electron/releases)。Chrome 47 から Chrome 49 へのメジャーアップグレードと、いくつかの新しいコア API が入っています。 この最新リリースでは、[Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) と [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html) に搭載されているすべての新機能が搭載されています。 これにより、CSS カスタムプロパティ、[ES6](http://www.ecma-international.org/ecma-262/6.0/) サポートの強化、`KeyboardEvent` の改善、`Promise` の改善、その他多くの新機能が Electron アプリで利用可能になります。

---

## 新機能

### CSS カスタムプロパティ

Sass や Less のようなプリプロセス言語を使用したことがある方は *変数* に慣れていると思いますが、これを用いてカラースキームやレイアウトなどの再利用可能な値を定義できます。 変数は、スタイルシートを DRY に保ちメンテナンス性を高めるのに役立ちます。

CSS カスタムプロパティは、再利用可能という点ではプリプロセスでの変数に似ていますが、**JavaScript で操作できる** という更に強力で柔軟性の高い独自性があります。 この小さいながらも強力な機能により、[ CSS ハードウェアアクセラレーション](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions) の恩恵を受けながら、ビジュアルインターフェイスに動的な変更を加えられ、フロントエンドコードとスタイルシートとの間でコードの重複を減らせます。

CSS カスタムプロパティの詳細は、[MDN の記事](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) や [Google Chrome のデモ](https://googlechrome.github.io/samples/css-custom-properties/) を参照してください。

#### CSS 変数の動作

シンプルな変数の例として、アプリ内での実行時の変更を見ていきましょう。

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

変数の値は直接 JavaScript で取得や変更ができます。

```js
// 変数の値 '#A5ECFA' を取得
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// 変数の値を 'orange' に変更
document.body.style.setProperty('--awesome-color', 'orange')
```

変数の値は、デベロッパー ツールの **Styles** セクションからも編集でき、素早いフィードバックと微調整ができます。

![Styles タブの CSS プロパティ](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` プロパティ

Chrome 48 では、新しい `code` プロパティが `KeyboardEvent` イベントで利用できるようになりました。これは、オペレーティングシステムのキーボードレイアウトとは独立した、押された物理キーです。

これにより、Electron アプリにカスタムキーボードショートカットを実装する際に、マシンや構成の違いに影響されずに正確で一貫性のあるキーボードショートカットを実装できるようになります。

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} was pressed.`)
})
```

[こちらのサンプル](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) で実際にどうなるのか確認できます。

### Promise 拒否イベント

Chrome 49 では、拒否された [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) が処理されなかった場合に通知される `window` のイベントを 2 つ追加しました。

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise was unhandled', event.promise, event.reason)
})

window.addEventListener('rejectionhandled', function (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

[こちらのサンプル](https://googlechrome.github.io/samples/promise-rejection-events/index.html) で実際にどうなるのか確認できます。

### V8 での ES2015 アップデート

現在、Electron に入っている V8 のバージョンでは、[ES2015 の 91%](https://kangax.github.io/compat-table/es6/#chrome49) を取り入れています。 ここでは、フラグやプリコンパイラ要らずですぐに使える面白い追加機能をいくつか紹介します。

#### デフォルト引数

```js
function multiply(x, y = 1) {
  return x * y
}

multiply(5) // 5
```

#### 分割代入

Chrome 49 で [分割代入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) が追加され、変数や関数パラメータの代入が非常に簡単になりました。

これにより、Electron の require はより簡潔でコンパクトな代入になりました。

##### ブラウザプロセスの Require

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### レンダラープロセスの Require

```js
const {dialog, Tray} = require('electron').remote
```

##### その他の例

```js
// 配列を分割して 2 つ目の要素を飛ばす
const [first, , last] = findAll()

// 関数の引数の分割
function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(`${displayName} is ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// オブジェクトの分割代入
let {name, avatar} = getUser()
```

## 新しい Electron API

以下にいくつかの新しい Electron API を示します。それぞれの新しい API は、[Electron リリース](https://github.com/electron/electron/releases) のリリースノートで確認できます。

#### `BrowserWindow` の `show` イベントと `hide` イベント

これらのイベントは、ウインドウが表示や非表示になったときにそれぞれ発生します。

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('show', function () { console.log('Window was shown') })
window.on('hide', function () { console.log('Window was hidden') })
```

#### `OS X` 向けに `app` の `platform-theme-changed`

このイベントは、システムの [ダークモード](https://discussions.apple.com/thread/6661740) テーマが切り替えられたときに発生します。

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme changed. In dark mode? ${app.isDarkMode()}`)
})
```

#### `OS X` 向けに `app.isDarkMode()`

このメソッドは、システムがダークモードの場合は `true` を返し、それ以外では `false` を返します。

#### `OS X` 向けに BrowserWindow の `scroll-touch-begin` イベントと `scroll-touch-end` イベント

これらのイベントは、スクロールホイールイベントフェイズの開始や終了でそれぞれ発生します。

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scroll-touch-begin', function () { console.log('Scroll touch started') })
window.on('scroll-touch-end', function () { console.log('Scroll touch ended') })
```


---
title: Electron でネイティブから JavaScript へ
author: codebytere
date: '2019-03-19'
---

C++ や Objective-C で記述された Electron の機能は、どのように JavaScript となってエンドユーザーが利用できるのでしょうか。

---

## 背景

[Electron](https://electronjs.org) は、開発者の参入障壁を取り下げることを主目的とした JavaScript プラットフォームで、プラットフォーム固有の実装を気にせずに堅牢なデスクトップアプリを構築できます。 ただし、Electron 自身の中核には、特定システムの言語で記述するようなプラットフォーム固有の機能も必要です。

実際には Electron がネイティブコードを扱うので、単一の JavaScript API に集中できます。

一体、どのように動作しているのでしょうか。 C++ や Objective-C で記述された Electron の機能は、どのように JavaScript となってエンドユーザーが利用できるのでしょうか。

この道筋を追いかけるために、[`app` モジュール](https://electronjs.org/docs/api/app) から始めましょう。

`lib/` ディレクトリ内の [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) ファイルを開くと、その上部に以下のようなコードの行があります。

```js
const binding = process.electronBinding('app')
```

この行は、開発者が使用している C++/Objective-C モジュールを JavaScript にバインドする Electron の仕組みをまさに表しています。 この関数は `ElectronBindings` クラスの、ヘッダーと [実装ファイル](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) によって作成されます。

## `process.electronBinding`

これらのファイルは Node.js の `process.binding` のように動作する `process.electronBinding` 関数を追加します。 `process.binding` は Node.js の [`require()`](https://nodejs.org/api/modules.html#modules_require_id) メソッドよりローレベルの実装です。ただし、他の JS で書かれたコードではなくネイティブコードを `require` することができます。 このカスタム `process.electronBinding` 関数は Electron からネイティブコードをロードする機能を与えます。

トップレベルの JavaScript モジュール (`app` など) がこのネイティブコードを require する場合、そのネイティブコードの状態はどのように決定および設定されるのでしょうか。 そのメソッドはどこまで JavaScript に公開されるのでしょうか。 プロパティではどうなのでしょうか。

## `native_mate`

現時点では、この疑問には `native_mate` が答えてくれます。これは、C++ と JavaScript の間で型をマーシャリングしやすくする Chromium の [`gin` ライブラリ](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) のフォークです。

`native_mate/native_mate` の中には、`object_template_builder` のヘッダーと実装ファイルがあります。 これにより、JavaScript 開発者が望むように適合する形式のネイティブコードでモジュールを形成します。

### `mate::ObjectTemplateBuilder`

すべての Electron モジュールを `object` として見ると、`object_template_builder` で構築する理由がわかりやすくなります。 このクラスは、C++ で記述された Google によるオープンソースで高性能の JavaScript および WebAssembly エンジン、V8 が公開するクラスの上に構築されます。 V8 は JavaScript (ECMAScript) の仕様を実装しているため、ネイティブ機能の実装を JavaScript の実装に直接関連付けることができます。 たとえば、[`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) は専用のコンストラクタ関数とプロトタイプなしで JavaScript オブジェクトを提供します。 `Object[.prototype]` を使用するため、JavaScript での [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) と等価です。

この動作確認は、アプリモジュールの実装ファイル [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc) を参照してください。 下部には以下のようなものがあります。

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

上記の行では、`.SetMethod` が `mate::ObjectTemplateBuilder` で呼び出されます。 `.SetMethod` を `ObjectTemplateBuilder` クラスの任意のインスタンスで呼び出し、以下の構文で JavaScript の [Object プロトタイプ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) にメソッドを設定できます。

```cpp
.SetMethod("method_name", &function_to_bind)
```

これは以下の JavaScript と等価です。

```js
function App{}
App.prototype.getGPUInfo = function () {
  // ここに実装
}
```

このクラスには以下のようなモジュールにプロパティをセットする関数も含まれます。

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

または

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

これらは、以下のような [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) による JavaScript 実装になります。

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

aND

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

これによって開発者が予期するようなプロトタイプとプロパティで形成された JavaScript オブジェクトを作成することができ、よりローレベルのシステムで実装された関数とプロパティでもよりはっきりと推論します!

特定のモジュールメソッドの実装場所に関する決定は、それ自体が複雑かつ多くの場合に置いて非決定的です。これについては今後の記事で補います。

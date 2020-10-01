---
title: 'Electron の舞台裏&#58; 弱参照'
author: zcbenz
date: '2016-09-20'
---

ガベージコレクションがある言語 JavaScript は、ユーザーがリソースを手動で管理しなくてよくなります。 しかし、Electron はこの環境をホストしているため、メモリリークとリソースリークの両方を避けようと非常に慎重にならざるをえません。

この記事では、弱参照の概念と、それが Electron のリソース管理でどのように使われているかを紹介します。

---

## 弱参照

JavaScript でオブジェクトを変数に代入するというのは、必ずオブジェクトへの参照を追加していることになります。 オブジェクトへの参照がある限り、そのオブジェクトはずっとメモリに保持されます。 オブジェクトへのすべての参照がなくなる、例えばオブジェクトを格納する変数がなくなると、JavaScript エンジンは次のガベージコレクションでそのメモリを回収します。

弱参照とは、ガベージコレクションされるかどうかに影響せずオブジェクトを取得できるようにする参照です。 オブジェクトがガベージコレクションされたときにその通知もされます。 これにより、JavaScript でリソース管理を可能にします。

Electron の `NativeImage` クラスを例に挙げると、`nativeImage.create()` APIを呼び出すたびに `NativeImage` インスタンスが返され、これに画像データが C++ 側で格納されます。 インスタンスの処理が終わり JavaScript エンジン (V8) がオブジェクトをガベージコレクトしたら、C++ のコードが呼び出されてメモリ内の画像データが解放されるので、ユーザが手動で管理する必要はありません。

別の例としては、[ウインドウ消失問題](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes) があります。これはウインドウへの参照がすべてなくなったときにガベージコレクトされる様子を、視覚的に観察できます。

## Electron での弱参照のテスト

生の JavaScript には弱参照を代入する方法がないので、弱参照を直接テストする方法はありません。 弱参照に関連する JavaScript の API だと [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) がありますが、これは弱参照のキーを作成するだけなので、オブジェクトがガベージコレクトされたかどうかは知ることができません。

v0.37.8 以前のバージョンの Electron では、内部の `v8Util.setDestructor` API を使用して弱参照をテストできました。以下のように、渡されたオブジェクトに弱参照を追加し、オブジェクトがガベージコレクションされたときにコールバックを呼び出すものです。

```javascript
// 以下のコードは Electron < v0.37.8 のみで動作します。
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util.setDestructor(object, function () {
  console.log('The object is garbage collected')
})

// オブジェクトへの参照を全て削除します。
object = undefined
// GC を手動で起動します。
gc()
// "The object is garbage collected" とコンソールに出力されます。
```

注意としては、内部の `gc` 関数を公開させるために、`--js-flags="--expose_gc"` コマンドスイッチで Electron を起動する必要があります。

この API は後のバージョンで削除されました。このため V8 では実際にはデストラクタで JavaScript コードを実行できず、これをしようとしても確率でクラッシュします。

## `remote` モジュールでの弱参照

C++ でネイティブリソースを管理する以外にも、Electron は JavaScript のリソースを管理するために弱参照が必要です。 例えば、Electron の `remote` モジュールはいわゆる [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) モジュールで、レンダラープロセスからメインプロセス内のオブジェクトを使用できるようにます。

`remote` モジュールの重要な課題の 1 つに、メモリリークを避けるというものがあります。 ユーザがレンダラープロセス内のリモートオブジェクトを取得する場合、`remote` モジュールは、レンダラープロセス内の参照がなくなるまでオブジェクトがメインプロセスに存在し続けるよう保証しなければなりません。 さらに、レンダラープロセスでリモートオブジェクトへの参照がなくなったときに、そのオブジェクトがガベージコレクションされるようにする必要があります。

例えば、適切な実装を行わないと、以下のコードはすぐにメモリリークを起こしてしまいます。

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

`remote` モジュールのリソース管理は単純です。 オブジェクトの要求ごとにメインプロセスへメッセージが送信されます。それに対して Electron はオブジェクトをマップに保存して ID を割り当て、レンダラープロセスにその ID を送り返します。 レンダラープロセスでは、`remote` モジュールが ID を受け取ってプロキシオブジェクトでラップし、プロキシオブジェクトがガベージコレクションされると、オブジェクト解放のメッセージをメインプロセスに送信します。

`remote.require` API を例にすると、簡略化した実装は以下のようになります。

```javascript
remote.require = function (name) {
  // モジュールのメタデータを返すようにメインプロセスに伝えます。
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // プロキシオブジェクトを作成します。
  const object = metaToValue(meta)
  // プロキシオブジェクトがガベージコレクションされたときに
  // オブジェクトの解放をメインプロセスに指示します。
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

メインプロセスでは以下のようにします。

```javascript
const map = {}
const id = 0

ipcMain.on('REQUIRE', function (event, name) {
  const object = require(name)
  // オブジェクトへの参照を追加します。
  map[++id] = object
  // オブジェクトをメタデータに変換します。
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```

## 弱参照の辞書配列

先述の単純な実装では、`remote` モジュールを呼び出すたびにメインプロセスが新しいリモートオブジェクトを返し、各リモートオブジェクトがメインプロセスのオブジェクトへの参照を表します。

デザイン自体は問題ないのですが、同じオブジェクトを受信するために複数回呼び出すと、複数のプロキシオブジェクトが作成され、複雑なオブジェクトの場合にメモリ使用量とガベージコレクションを圧迫するという問題があります。

以下のようなコードがあったとします。

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

まずプロキシオブジェクトを作成するためにメモリを多く使用し、そのガベージコレクションと IPC メッセージの送信に CPU(Central Processing Unit) を占有します。

明白な最適化としては、リモートオブジェクトのキャッシュがあります。すなわち、すでに同じ ID のリモートオブジェクトが存在する場合、新しいオブジェクトを作成するのではなく以前のリモートオブジェクトを返すようにします。

これは JavaScript コアの API ではできません。 通常の辞書配列を使ってオブジェクトをキャッシュすれば V8 によるオブジェクトのガベージコレクションを防げますが、[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) クラスではオブジェクトのみが弱参照のキーに使えます。

これを解決するために、値を弱参照として持つマップ型を追加しました。ID を持つオブジェクトのキャッシュに最適です。 これで、`remote.require` は以下のようになります。

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // モジュールのメタデータを返すようにメインプロセスに伝えます。
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // プロキシオブジェクトを作成します。
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

注意として、`remoteObjectCache` はオブジェクトを弱参照として保管するので、オブジェクトがガベージコレクトされたときでもキーの削除は不要です。

## ネイティブコード

Electron の弱参照の C++ コードに興味がある方は、以下のファイルを参照してください。

`setDestructor` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API:

* [`key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)


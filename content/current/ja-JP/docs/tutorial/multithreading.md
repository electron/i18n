# マルチスレッド

[Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers) により、JavaScript を OS レベルのスレッドで実行することが可能になります。

## マルチスレッド Node.js

Electron の Web Workers 内で Node.js の機能を使用するには、`webPreferences` の `nodeIntegrationInWorker` オプションを `true` に設定する必要があります。

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` は `nodeIntegration` とは独立して使用できますが、`サンドボックス` は `true` に設定してはなりません。

## 利用可能な API

Node.js の組み込みモジュールはすべて Web Workers でサポートされており、`asar` アーカイブは Node.js API で読み取ることができます。 しかし、Electron の組み込みモジュールは、マルチスレッド環境では使用できません。

## ネイティブ Node.js モジュール

任意のネイティブ Node.js モジュールを Web Workers に直接ロードできますが、そのようにしないことを強く推奨します。 既存のネイティブモジュールのほとんどはシングルスレッド環境を想定して作成されており、Web Workers でそれらを使用するとクラッシュやメモリ破壊につながります。

ネイティブ Node.js モジュールがスレッドセーフであっても、`process.dlopen` 関数はスレッドセーフではないため、Web Worker でロードするのは安全ではありません。

ネイティブモジュールを安全にロードする唯一の方法は、Web Workers の起動後にアプリがネイティブモジュールをロードしないようにすることです。

```javascript
process.dlopen = () => {
  throw new Error('ネイティブモジュールの読み込みは安全ではありません')
}
let worker = new Worker('script.js')
```

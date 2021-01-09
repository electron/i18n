# コンテキストの分離状態

## それは何ですか?

コンテキスト分離は、あなたの`プレロード` スクリプトと Electron の内部ロジックの両方が、 [`webContents`](../api/web-contents.md) でロードしたウェブサイトに対して別のコンテキストで実行されることを保証する機能です。  これは、ウェブサイトが Electron の内部にアクセスできないようにするためのセキュリティ目的や、プリロードスクリプトがアクセスできる強力な API を防ぐために重要です。

つまり、preload スクリプトがアクセスできる `window` オブジェクトは、ウェブサイトがアクセスできるオブジェクトとは実際には **異なる** オブジェクトであることを意味します。  例えば、もしあなたが `window.hello = 'wave'` とプリロードスクリプトで設定し、コンテキスト分離が有効だった場合、`window.hello` は、Web サイトがアクセスしようとすると未定義になります。

すべてのアプリケーションはコンテキスト分離を有効にし、Electron 12 からはデフォルトで有効になります。

## 有効にするにはどうすればいいですか?

Electron 12 からは、デフォルトで有効になります。 より低いバージョンの場合は、 `new BrowserWindow` を構築する際の `webPreferences`オプションのオプションです。

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## 移行

> 私は`window.X = apiObject</0> を使ってプリロードスクリプトから API を提供していました。今はどうすればいいですか?X = apiObject` は何ですか?

ロードされたウェブサイトに preload スクリプトから API を公開することは一般的なユースケースであり、Electron にはこれを簡単に行うための専用モジュールがあります。

**Before: コンテキストの分離を無効にする**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**After: コンテキスト分離が有効になっている**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI, {
  doAThing: () => {}
})
```

[`contextBridge`](../api/context-bridge.md) モジュールは、 **安全に** APIを、プリロードスクリプトが実行している分離されたコンテキストから、ウェブサイトが実行しているコンテキストに公開することができます。 APIは以前と同様に `window.myAPI` のウェブサイトからもアクセスできます。

上記の `contextBridge` ドキュメントを読んで、その制限を完全に理解する必要があります。  たとえば、カスタムプロトタイプやシンボルをブリッジに送信することはできません。

## セキュリティについての考慮事項

`contextIsolation` を有効にして、 `contextBridge` を使用するだけでは、すべてが安全であることを自動的に意味するわけではありません。  例えば、このコードは **unsafe** である。

```javascript
// ❌ 不正なコード
contextBridge.exposeInMainWorld('myAPI, {
  send: ipcRenderer.send
})
```

引数フィルタリングを行うことなく、強力なAPIを直接公開します。 これにより、任意のウェブサイトがあなたが可能にしたくない任意のIPCメッセージを送信できるようになります。 IPCベースのAPIを公開する正しい方法は、IPCメッセージごとに1つのメソッドを提供することです。

```javascript
// ✅ 良いコード
contextBridge.exposeInMainWorld('myAPI, {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

# コンテキストの分離

## これは何ですか?

コンテキスト分離は、あなたの`プレロード` スクリプトと Electron の内部ロジックの両方が、 [`webContents`](../api/web-contents.md) でロードしたウェブサイトに対して別のコンテキストで実行されることを保証する機能です。  これは、ウェブサイトが Electron の内部にアクセスできないようにするためのセキュリティを向上させ、プリロードスクリプトがアクセスできる強力な API を防ぐために重要です。

つまり、プリロードスクリプトがアクセスできる `window` オブジェクトは、ウェブサイトがアクセスできるオブジェクトとは実際には **異なる** オブジェクトであることを意味します。  例えば、もしあなたが `window.hello = 'wave'` とプリロードスクリプトで設定し、コンテキスト分離が有効だった場合、`window.hello` は、Web サイトがアクセスしようとすると未定義になります。

すべてのそれぞれのアプリケーションはコンテキスト分離を有効にすべきです。Electron 12 からはデフォルトで有効になっています。

## どうやって有効にするのですか？

Electron 12 からは、デフォルトで有効になります。 より古いバージョンの場合は、 `new BrowserWindow` を構築する際の `webPreferences`オプションで指定できます。

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## 移行

> 私は`window.X = apiObject` を使ってプリロードスクリプトから API を提供していました。今はどうすればいいですか?

プレロードスクリプトからロードされたウェブサイトに API を公開することは一般的なユースケースであり、Electron にはこれを簡単に行うための専用モジュールがあります。

**変更前: コンテキストの分離が無効**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**変更後: コンテキスト分離が有効**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

[`contextBridge`](../api/context-bridge.md) モジュールは、プリロードスクリプトが実行している分離されたコンテキストから、ウェブサイトが実行しているコンテキストにAPIを**安全に**公開することができます。 このAPIは以前と同様に `window.myAPI` のウェブサイトからもアクセスできます。

上記の `contextBridge` ドキュメントを読んで、その制限を完全に理解する必要があります。  例えば、カスタムプロトタイプやシンボルをブリッジに送信できません。

## セキュリティ上、考慮すべきこと

`contextIsolation` を有効にして、 `contextBridge` を使用するだけでは、すべてが安全であることにはなりません。  例えば、このコードは **安全ではありません** 。

```javascript
// ❌ 悪いコード
contextBridge.exposeInMainWorld('myAPI, {
  send: ipcRenderer.send
})
```

これは、引数のフィルタリングなどを行うことなく、強力なAPIを直接公開します。 これにより、任意のウェブサイトが、設計者の望んでいない任意のIPCメッセージを送信できるようになります。 IPC ベースの API を公開する正しい方法は、IPCメッセージごとに1つのメソッドを提供することです。

```javascript
// ✅ 良いコード
contextBridge.exposeInMainWorld('myAPI, {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```


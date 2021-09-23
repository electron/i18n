# コンテキストの分離

## これは何ですか?

コンテキスト分離は、あなたの`プレロード` スクリプトと Electron の内部ロジックの両方が、 [`webContents`](../api/web-contents.md) でロードしたウェブサイトに対して別のコンテキストで実行されることを保証する機能です。  これは、ウェブサイトが Electron の内部にアクセスできないようにするためのセキュリティを向上させ、プリロードスクリプトがアクセスできる強力な API を防ぐために重要です。

つまり、プリロードスクリプトがアクセスできる `window` オブジェクトは、ウェブサイトがアクセスできるオブジェクトとは実際には **異なる** オブジェクトであることを意味します。  例えば、コンテキストの分離が有効の場合、プリロードスクリプトで `window.hello = 'wave'` を設定してウェブサイトがこれにアクセスしようとしても、`window.hello` は undefined になります。

コンテキストの分離は Electron 12 からデフォルトで有効になっており、_すべてのアプリケーション_ で推奨されているセキュリティ設定です。

## 移行

> コンテキストが分離されていない状態で、`window.X = apiObject` を使ってプリロードスクリプトから API を提供していました。 どうすればよいですか？

### ビフォー: コンテキストの分離が無効のとき

プリロードスクリプトからレンダラープロセスで読み込まれたウェブサイトに API を公開することは、ごく一般的な使用例です。 コンテキストの分離を無効にすると、プリロードスクリプトは、共通のグローバルな `window` オブジェクトをレンダラーと共有することになります。 そして、任意のプロパティをプリロードスクリプトに添付できます。

```javascript title='preload.js'
// コンテキストの分離が無効のプリロード
window.myAPI = {
  doAThing: () => {}
}
```

`doAThing()` 関数は、レンダラープロセスで直接使用できます。

```javascript title='renderer.js'
// レンダラー内から公開された API を使用
window.myAPI.doAThing()
```

### アフター: コンテキストの分離が有効のとき

Electron には、これを楽に行うための専用モジュールがあります。 [`contextBridge`](.../api/context-bridge.md) モジュールは、プリロードスクリプトの分離したコンテキストから、ウェブサイトが実行されているコンテキストに API を **安全に** 公開するために使用できます。 このAPIは以前と同様に `window.myAPI` のウェブサイトからもアクセスできます。

```javascript title='preload.js'
// コンテキストの分離が有効のプリロード
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

```javascript title='renderer.js'
// レンダラー内から公開された API を使用
window.myAPI.doAThing()
```

上記の `contextBridge` ドキュメントを読んで、その制限を完全に理解してください。 例えば、カスタムプロトタイプやシンボルはブリッジで送信できません。

## セキュリティ上の考慮事項

`contextIsolation` を有効にして、 `contextBridge` を使用するだけでは、すべてが安全であることにはなりません。 例えば、以下のコードは **危険です**。

```javascript title='preload.js'
// ❌ 悪いコード
contextBridge.exposeInMainWorld('myAPI, {
  send: ipcRenderer.send
})
```

これは、引数のフィルタリングなどを行うことなく、強力なAPIを直接公開します。 これにより、任意のウェブサイトが、設計者の望んでいない任意の IPC メッセージを送信できるようになります。 IPC ベースの API を公開する正しい方法は、IPCメッセージごとに1つのメソッドを提供することです。

```javascript title='preload.js'
// ✅ 良いコード
contextBridge.exposeInMainWorld('myAPI, {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## TypeScript との連携

TypeScript で Electron アプリを構築している場合、コンテキストブリッジを介して公開される API に型を追加する必要があります。 [型宣言ファイル][] で型を拡張しないと、レンダラーの `window` オブジェクトは正しい型になりません。

例えば、以下の `preload.ts` スクリプトについて考えましょう。

```typescript title='preload.ts'
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

`renderer.d.ts` 型宣言ファイルを作成し、`Window` インターフェースをこのようにグローバルに拡張できます。

```typescript title='renderer.d.ts'
export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

そうすることで、レンダラープロセスでスクリプトを書く際に、TypeScript コンパイラがグローバルな `window` オブジェクトの `electronAPI` プロパティを知ることができます。

```typescript title='renderer.ts'
window.electronAPI.loadPreferences()
```

[型宣言ファイル]: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

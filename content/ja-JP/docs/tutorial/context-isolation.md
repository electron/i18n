# コンテキストの分離

## これは何ですか?

コンテキスト分離は、あなたの`プレロード` スクリプトと Electron の内部ロジックの両方が、 [`webContents`](../api/web-contents.md) でロードしたウェブサイトに対して別のコンテキストで実行されることを保証する機能です。  これは、ウェブサイトが Electron の内部にアクセスできないようにするためのセキュリティを向上させ、プリロードスクリプトがアクセスできる強力な API を防ぐために重要です。

つまり、プリロードスクリプトがアクセスできる `window` オブジェクトは、ウェブサイトがアクセスできるオブジェクトとは実際には **異なる** オブジェクトであることを意味します。  For example, if you set `window.hello = 'wave'` in your preload script and context isolation is enabled, `window.hello` will be undefined if the website tries to access it.

Context isolation has been enabled by default since Electron 12, and it is a recommended security setting for _all applications_.

## 移行

> Without context isolation, I used to provide APIs from my preload script using `window.X = apiObject`. Now what?

### Before: context isolation disabled

Exposing APIs from your preload script to a loaded website in the renderer process is a common use-case. With context isolation disabled, your preload script would share a common global `window` object with the renderer. You could then attach arbitrary properties to a preload script:

```javascript title='preload.js'
// preload with contextIsolation disabled
window.myAPI = {
  doAThing: () => {}
}
```

The `doAThing()` function could then be used directly in the renderer process:

```javascript title='renderer.js'
// use the exposed API in the renderer
window.myAPI.doAThing()
```

### After: context isolation enabled

There is a dedicated module in Electron to help you do this in a painless way. The [`contextBridge`](../api/context-bridge.md) module can be used to **safely** expose APIs from your preload script's isolated context to the context the website is running in. このAPIは以前と同様に `window.myAPI` のウェブサイトからもアクセスできます。

```javascript title='preload.js'
// preload with contextIsolation enabled
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

```javascript title='renderer.js'
// use the exposed API in the renderer
window.myAPI.doAThing()
```

Please read the `contextBridge` documentation linked above to fully understand its limitations. For instance, you can't send custom prototypes or symbols over the bridge.

## Security considerations

`contextIsolation` を有効にして、 `contextBridge` を使用するだけでは、すべてが安全であることにはなりません。 For instance, this code is **unsafe**.

```javascript title='preload.js'
// ❌ 悪いコード
contextBridge.exposeInMainWorld('myAPI, {
  send: ipcRenderer.send
})
```

これは、引数のフィルタリングなどを行うことなく、強力なAPIを直接公開します。 This would allow any website to send arbitrary IPC messages, which you do not want to be possible. IPC ベースの API を公開する正しい方法は、IPCメッセージごとに1つのメソッドを提供することです。

```javascript title='preload.js'
// ✅ 良いコード
contextBridge.exposeInMainWorld('myAPI, {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## Usage with TypeScript

If you're building your Electron app with TypeScript, you'll want to add types to your APIs exposed over the context bridge. The renderer's `window` object won't have the correct typings unless you extend the types with a [declaration file][].

For example, given this `preload.ts` script:

```typescript title='preload.ts'
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

You can create a `renderer.d.ts` declaration file and globally augment the `Window` interface:

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

Doing so will ensure that the TypeScript compiler will know about the `electronAPI` property on your global `window` object when writing scripts in your renderer process:

```typescript title='renderer.ts'
window.electronAPI.loadPreferences()
```

[declaration file]: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html

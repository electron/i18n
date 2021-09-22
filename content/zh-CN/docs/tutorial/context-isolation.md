# 上下文隔离

## 上下文隔离是什么？

上下文隔离功能将确保您的 `预加载`脚本 和 Electron的内部逻辑 运行在所加载的 [`webcontent`](../api/web-contents.md)网页 之外的另一个独立的上下文环境里。  这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。

这意味着，实际上，您的预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。  For example, if you set `window.hello = 'wave'` in your preload script and context isolation is enabled, `window.hello` will be undefined if the website tries to access it.

Context isolation has been enabled by default since Electron 12, and it is a recommended security setting for _all applications_.

## 迁移

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

There is a dedicated module in Electron to help you do this in a painless way. The [`contextBridge`](../api/context-bridge.md) module can be used to **safely** expose APIs from your preload script's isolated context to the context the website is running in. API 还可以像以前一样，从 `window.myAPI` 网站上访问。

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

单单开启和使用 `contextIsolation` 并不直接意味着您所做的一切都是安全的。 For instance, this code is **unsafe**.

```javascript title='preload.js'
// ❌ Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了一个没有任何参数过滤的高等级权限 API 。 This would allow any website to send arbitrary IPC messages, which you do not want to be possible. 相反，暴露进程间通信相关 API 的正确方法是为每一种通信消息提供一种实现方法。

```javascript title='preload.js'
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
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

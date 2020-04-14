# 多執行緒

有了 [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers)，就可以在作業系統層的執行緒裡執行 JavaScript。

## 多執行緒 Node.js

可以在 Electron 的 Web Workers 中使用 Node.js 功能，只要在 `webPreferences` 中將 `nodeIntegrationInWorker` 選項設為 `true` 即可。

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.

## 可用的 API

All built-in modules of Node.js are supported in Web Workers, and `asar` archives can still be read with Node.js APIs. However none of Electron's built-in modules can be used in a multi-threaded environment.

## 原生 Node.js 模組

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('載入原生模組並不安全')
}
let worker = new Worker('script.js')
```

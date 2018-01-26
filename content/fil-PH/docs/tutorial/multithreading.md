# Multithreading

Sa mga [ nagtra-trabaho ng Web](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), posibling magpatakbo ng JavaScript sa OS-level threads.

## Multi-threaded Node.js

Posibling gumamit ng mga tampok ng Node.js sa manggagawa ng Electron's Web, upang gawin ito ay ang `nodeIntegrationInWorker` na opsyon ay dapat na itakda sa `true` sa `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

Ang `nodeIntegrationInWorker` ay pwedeng gamitin ng nagsasarili sa `nodeIntegration`, pero `sandbox` ay dapat hindi itakda sa `true`.

## Magagamit na APIs

All built-in modules of Node.js are supported in Web Workers, and `asar` archives can still be read with Node.js APIs. However none of Electron's built-in modules can be used in a multi-threaded environment.

## Native Node.js modules

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```
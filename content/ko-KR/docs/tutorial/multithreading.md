# 멀티 쓰레딩

[Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers)를 사용하면 OS-레벨 스레드에서 JavaScript를 실행할 수 있습니다.

## 다중 쓰레드 Node.js

Electron 's Web Workers에서 Node.js 기능을 사용하여 위해서, `webPreferences`의 `nodeIntegrationInWorker`옵션을 true로 설정해야합니다.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker`는 `nodeIntegration`과 독립적으로 사용할 수 있지만, `sandbox`를 `true`로 설정하면 절대로 안됩니다.

## 이용 가능한 API들

Node.js의 모든 내장 모듈은 Web Workers에서 지원되며, `asar`아카이브는 여전히 Node.js API로 읽을 수 있습니다. However none of Electron's built-in modules can be used in a multi-threaded environment.

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
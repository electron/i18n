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

Node.js의 모든 내장 모듈은 Web Workers에서 지원되며, `asar`아카이브는 여전히 Node.js API로 읽을 수 있습니다. 하지만 Electron의 내장 모듈은 다중 스레드 환경에서 사용할 수 없습니다.

## Native Node.js modules

어떠한 native Node.js 모듈을 Web Workers에게 직접로드 할 수 있지만, 권장하지는 않습니다. 기존의 대부분의 네이티브 모듈은 단일 스레드 환경을 전제로 작성되었으며, Web Workers에서 사용하면 충돌 및 메모리 손상이 발생할 수 있습니다.

주의할 점은 native Node.js 모듈이 스레드로부터 안전하더라도 `process.dlopen` 함수는 스레드로부터 안전하지 않으므로 Web Worker에서로드하는 것이 여전히 안전하지 않습니다.

현재로써는 네이티브 모듈을 안전하게로드하는 유일한 방법은, Web Workers가 시작된 후에는 앱이 네이티브 모듈을 로드하지 않도록하는 것입니다.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```
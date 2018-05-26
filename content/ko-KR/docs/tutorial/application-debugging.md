# 응용 프로그램 디버깅

Electron 응용 프로그램이 원하는 방식으로 작동하지 않을 때마다, 디버깅 도구들은 코딩 오류, 성능 병목 현상 또는 최적화 지점을 찾는것을 도와줄 것이다.

## 렌더러 프로세스

개별 렌더러 프로세스를 디버깅 하는 가장 포괄적인 도구는 크롬 개발자 도구 집합입니다. It is available for all renderer processes, including instances of `BrowserWindow`, `BrowserView`, and `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Main Process 

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).
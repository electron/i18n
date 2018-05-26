# 응용 프로그램 디버깅

Electron 응용 프로그램이 원하는 방식으로 작동하지 않을 때마다, 디버깅 도구들은 코딩 오류, 성능 병목 현상 또는 최적화 지점을 찾는것을 도와줄 것입니다.

## 렌더러 프로세스

개별 렌더러 프로세스를 디버깅 하는 가장 포괄적인 도구는 크롬 개발자 도구 집합입니다. 그것은 `BrowserWindow`, `BrowserView` 및 `WebView`의 인스턴스를 포함 하여 모든 렌더러 프로세스에 사용할 수 있습니다. 당신은 `webContents`의 `openDevTools()` API를 호출 하여 프로그래밍적으로 그들을 열 수 있습니다.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google는 [excellent documentation for their developer tools](https://developer.chrome.com/devtools)를 제공합니다. 그것들과 익숙해지길 권장합니다 - 그것들은 보통 Electron 개발자 도구들중 가장 강력한것들 중 하나입니다.

## 메인 프로세스

개발자 도구를 열 수 없기 때문에, 주요 프로세스를 디버깅 하는 것은 조금 까다롭습니다. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

자세한 정보는 [Debugging the Main Process documentation](./debugging-main-process.md)를 확인하십시요.
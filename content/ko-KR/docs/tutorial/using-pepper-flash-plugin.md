# Pepper Flash 플러그인 사용하기

Electron는 Pepper Flash 플러그인을 지원합니다. Electron에서 Pepper Flash 플러그인을 사용하려면 수동으로 Pepper Flash 플러그인의 위치를 지정한 다음 응용 프로그램에서 활성화해야합니다.

## Flash 플러그인 복사본 준비

MacOS 및 Linux에서 Pepper Flash 플러그인의 세부 정보는 Chrome 브라우저에서 `chrome://plugins`을 탐색하여 찾을 수 있습니다. 그것의 위치와 버전은 Electron's Pepper Flash 지원에 필요합니다. 다른 위치로 복사 할 수도 있습니다.

## Add Electron Switch

Electron 명령 행에 `--ppapi-flash-path` 및 `--ppapi-flash-version`을 직접 추가하거나 app ready 이벤트 전에 `app.commandLine.appendSwitch` 메소드를 사용할 수 있습니다. 또한 `BrowserWindow`의 `플러그인` 옵션을 설정하십시오.

예시:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

플러그인을 직접 포함하는 대신 시스템 전체의 Pepper Flash 플러그인을 로드 할 수도 있습니다. 경로는 `app.getPath('pepperFlashSystemPlugin')`을 호출하여 받을 수 있습니다.

## Enable Flash Plugin in a `<webview>` Tag

`플러그인` 속성을 `<webview>` 태그에 추가하십시오.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## 문제 해결

Pepper Flash 플러그인이 로드되었는지는 devtools의 콘솔에서 `navigator.plugins`를 검사하여 확인할 수 있습니다 (플러그인의 경로가 정확한지는 알 수 없지만).

Pepper Flash 플러그인의 아키텍처는 Electron의 플러그인과 일치해야합니다. Windows에서 일반적인 오류는 64 비트 버전의 Electron에 대해 32 비트 버전의 Flash 플러그인을 사용하는 것입니다.

Windows에서 `--ppapi-flash-path`로 전달 된 경로는 경로 구분 기호로 ``을 사용해야하며 POSIX 스타일 경로를 사용하면 작동하지 않습니다.

RTMP를 사용하는 스트리밍 미디어와 같은 일부 작업의 경우 플레이어의 `.swf ` 파일에 더 넓은 사용 권한을 부여해야합니다. 이를 수행하는 한 가지 방법은 [nw-flash-trust](https://github.com/szwacz/nw-flash-trust)를 사용하는 것입니다.
# Pepper Flash 플러그인 사용하기

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Flash 플러그인 복사본 준비

맥OS와 리눅스에서 Pepper Flash 플러그인에 대한 자세한 내용은 Chrome 브라우저에서 `chrome://flash`에 접근하여 확인할 수 있습니다. 그것의 위치와 버전은 Electron's Pepper Flash 지원에 필요합니다. 다른 위치로 복사 할 수도 있습니다.

## Electron Switch 추가

Electron 명령 행에 `--ppapi-flash-path` 및 `--ppapi-flash-version`을 직접 추가하거나 app ready 이벤트 전에 `app.commandLine.appendSwitch` 메소드를 사용할 수 있습니다. 또한 `BrowserWindow`의 `플러그인` 옵션을 설정하십시오.

예시:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// main.js와 같은 디렉토리에 있다고 가정하여 flash 경로를 지정하세요.
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

// Optional: flash 버전 지정 (예, v17.0.0.169)
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
  // 추가 작업
})
```

플러그인을 직접 포함하는 대신 시스템 전체의 Pepper Flash 플러그인을 로드 할 수도 있습니다. 경로는 `app.getPath('pepperFlashSystemPlugin')`을 호출하여 받을 수 있습니다.

## `<webview>` 태그에서 Flash 플러그인 활성화

`플러그인` 속성을 `<webview>` 태그에 추가하십시오.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## 문제 해결

Pepper Flash 플러그인이 로드되었는지는 devtools의 콘솔에서 `navigator.plugins`를 검사하여 확인할 수 있습니다 (플러그인의 경로가 정확한지는 알 수 없지만).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

RTMP를 사용하는 스트리밍 미디어와 같은 일부 작업의 경우 플레이어의 `.swf ` 파일에 더 넓은 사용 권한을 부여해야합니다. 이를 수행하는 한 가지 방법은 [nw-flash-trust](https://github.com/szwacz/nw-flash-trust)를 사용하는 것입니다.

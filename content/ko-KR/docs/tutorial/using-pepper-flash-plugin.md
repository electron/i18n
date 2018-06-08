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

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## 문제 해결

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
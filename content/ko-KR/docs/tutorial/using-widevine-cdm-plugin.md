# Widevine CDM 플러그인 사용하기

Electron에서는 Chrome 브라우저와 함께 제공되는 Widevine CDM 플러그인을 사용할 수 있습니다.

## Getting the plugin

Electron 에는 라이선스 이유로 Widevine CDM 플러그인이 포함되어 있지 않습니다. 공식 Chrome 브라우저를 먼저 설치해야합니다. 공식 Chrome 버전과 사용하는 전자 빌드의 Chrome 버전이 일치해야합니다.

**Note:** Chrome 브라우저의 주요 버전은 Electron에서 사용하는 Chrome 버전과 동일해야합니다. 그렇지 않으면 `navigator.plugins`에로드 된 것으로 표시 되더라도 플러그인이 작동하지 않습니다.

### Windows & macOS

Chrome 브라우저에서 `chrome://components/`를 열고 `WidevineCdm`을 찾아서 최신 버전인지 확인한 다음 모든 플러그인 바이너리를 `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` 디렉토리에서 찾을 수 있습니다.

`APP_DATA`는 응용 프로그램 데이터를 저장하기위한 시스템의 위치이며, Windows에서는 `%LOCALAPPDATA%`이며 macOS에서는 `~/Library/Application Support `입니다. `VERSION`은 `1.4.8.866`과 같이 Widevine CDM 플러그인의 버전 문자열입니다. `PLATFORM` 은 `mac` 또는 `win`입니다. `ARCH` 는 `x86` 또는 `x64`입니다.

Windows에서 필요한 바이너리는 `widevinecdm.dll` 및 `widevinecdmadapter.dll`이며, macOS에서는`libwidevinecdm.dylib` 및 `widevinecdmadapter.plugin`입니다. 원하는 위치로 복사 할 수 있지만 함께 복사해야합니다.

### Linux

Linux에서 플러그인 바이너리는 Chrome 브라우저와 함께 제공되며 `/opt/google/chrome`에서 찾을 수 있습니다. 파일 이름은 `libwidevinecdm.so` 및 `libwidevinecdmadapter.so`입니다.

## Using the plugin

플러그인 파일을 얻은 후에는 `--widevine-cdm-path` 명령 행 스위치를 사용하여 `widevinecdmadapter` 경로를 Electron에 전달하고 `--widevine-cdm-version` 스위치를 사용하여 플러그인 버전을 전달하십시오.

**Note:** `widevinecdmadapter` 바이너리 만이 Electron로 전달되지만, `widevinecdm` 바이너리는 같이 두어야합니다.

`app` 모듈의 `ready` 이벤트가 발생하기 전에 명령 줄 스위치를 전달해야하며 이 플러그인을 사용하는 페이지에 플러그인을 활성화 해야합니다.

Example code:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  })
  win.show()
})
```

## Verifying the plugin

플러그인 작동 여부를 확인하려면 다음 방법을 사용할 수 있습니다.

* Devtools를 열고 `navigator.plugins`에 Widevine CDM 플러그인이 있는지 확인하십시오.
* Https://shaka-player-demo.appspot.com/을 열고 `Widevine`을 사용하는 매니페스트를 로드하십시오.
* http://www.dash-player.com/demo/drm-test-area/를 열어, 페이지에서 bitdash uses Widevine in your browser라고 적혀있는지 확인하고 비디오를 재생합니다.
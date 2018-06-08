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

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

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

To verify whether the plugin works, you can use following ways:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.
# Widevine CDM 플러그인 사용하기

Electron에서는 Chrome 브라우저와 함께 제공되는 Widevine CDM 플러그인을 사용할 수 있습니다.

## Getting the plugin

Electron 에는 라이선스 이유로 Widevine CDM 플러그인이 포함되어 있지 않습니다. 공식 Chrome 브라우저를 먼저 설치해야합니다. 공식 Chrome 버전과 사용하는 전자 빌드의 Chrome 버전이 일치해야합니다.

**Note:** The major version of Chrome browser has to be the same with the Chrome version used by Electron, otherwise the plugin will not work even though `navigator.plugins` would show it has been loaded.

### Windows & macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` is system's location for storing app data, on Windows it is `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM plugin's version string, like `1.4.8.866`. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

On Windows the required binaries are `widevinecdm.dll` and `widevinecdmadapter.dll`, on macOS they are `libwidevinecdm.dylib` and `widevinecdmadapter.plugin`. You can copy them to anywhere you like, but they have to be put together.

### Linux

On Linux the plugin binaries are shipped together with Chrome browser, you can find them under `/opt/google/chrome`, the filenames are `libwidevinecdm.so` and `libwidevinecdmadapter.so`.

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
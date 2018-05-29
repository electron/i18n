# 使用 Widevine CDM 外掛程式

你可以在 Electron 裡使用 Chrome 瀏覽器搭載的 Widevine CDM 用外掛程式。

## 取得外掛程式

Electron doesn't ship with the Widevine CDM plugin for license reasons, to get it, you need to install the official Chrome browser first, which should match the architecture and Chrome version of the Electron build you use.

**Note:** The major version of Chrome browser has to be the same with the Chrome version used by Electron, otherwise the plugin will not work even though `navigator.plugins` would show it has been loaded.

### Windows 及 macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` is system's location for storing app data, on Windows it is `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM plugin's version string, like `1.4.8.866`. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

On Windows the required binaries are `widevinecdm.dll` and `widevinecdmadapter.dll`, on macOS they are `libwidevinecdm.dylib` and `widevinecdmadapter.plugin`. You can copy them to anywhere you like, but they have to be put together.

### Linux

On Linux the plugin binaries are shipped together with Chrome browser, you can find them under `/opt/google/chrome`, the filenames are `libwidevinecdm.so` and `libwidevinecdmadapter.so`.

## 使用外掛程式

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

範例程式碼:

```javascript
const {app, BrowserWindow} = require('electron')

// 你必須在這裡傳入 `widevinecdmadapter` 的檔名:
// * macOS 上是 `widevinecdmadapter.plugin`，
// * Linux 上是 `libwidevinecdmadapter.so`，
// * Windows 上是 `widevinecdmadapter.dll`。
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// 可以在 Chrome 的 `chrome://plugins` 頁面裡找到外掛程式的版本。
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // 要啟用的「外掛程式」。
      plugins: true
    }
  })
  win.show()
})
```

## 驗證外掛程式

To verify whether the plugin works, you can use following ways:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.